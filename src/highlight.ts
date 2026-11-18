export interface Token {
  cls: string | null;
  text: string;
}

// Tiny CSS tokenizer. Classes (tk-*) are styled by the CSS the page types
// out itself, so the code stays uncoloured until the page "teaches" itself.
export function tokenizeCss(src: string): Token[] {
  const out: Token[] = [];
  const push = (cls: string | null, text: string) => {
    if (text) out.push({ cls, text });
  };
  let i = 0;
  let depth = 0;
  while (i < src.length) {
    const c = src[i];
    if (src.startsWith('/*', i)) {
      const end = src.indexOf('*/', i + 2);
      const j = end < 0 ? src.length : end + 2;
      push('tk-comment', src.slice(i, j));
      i = j;
    } else if (c === '{') { depth++; push(null, c); i++; }
    else if (c === '}') { depth = Math.max(0, depth - 1); push(null, c); i++; }
    else if (c === ';') { push(null, c); i++; }
    else {
      let j = i;
      while (j < src.length && !'{};'.includes(src[j]) && !src.startsWith('/*', j)) j++;
      const chunk = src.slice(i, j);
      if (depth === 0 || src[j] === '{') {
        const lead = chunk.match(/^\s*/)![0];
        push(null, lead);
        push('tk-selector', chunk.slice(lead.length));
      } else {
        const colon = chunk.indexOf(':');
        if (colon < 0) push('tk-key', chunk);
        else {
          push('tk-key', chunk.slice(0, colon));
          push(null, ':');
          push('tk-value', chunk.slice(colon + 1));
        }
      }
      i = j;
    }
  }
  return out;
}
