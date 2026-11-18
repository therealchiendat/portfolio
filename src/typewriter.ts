import { tokenizeCss, type Token } from './highlight';
import { cssA, cssB, cssC, fullCss, resumeMd } from './introScript';

interface Options {
  codeEl: HTMLElement;      // <pre> the CSS is typed into (also its scroll box)
  mdEl: HTMLElement;        // <pre> that is the resume window (scroll box)
  mdSrc: HTMLElement;       // element inside it that receives the markdown text
  styleEl: HTMLStyleElement;
  reducedMotion: boolean;
  onRender(rendered: boolean): void;
  onDone(done: boolean): void;
}

// Per-character delays in ms.
const CODE_MS = 5;
const COMMENT_MS = 10;
const MD_MS = 12;

/**
 * Types text straight into the DOM (no React re-render per character) and
 * only touches the live <style> when a rule or comment is complete, so the
 * page restyles a few dozen times instead of thousands.
 */
export function runIntro(o: Options) {
  let cancelled = false;
  let css = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';

  const tokenNodes = (tokens: Token[]) =>
    tokens.map((t) => {
      if (!t.cls) return document.createTextNode(t.text);
      const s = document.createElement('span');
      s.className = t.cls;
      s.textContent = t.text;
      return s;
    });

  function reset() {
    o.codeEl.replaceChildren();
    o.mdSrc.replaceChildren();
    o.styleEl.textContent = '';
    css = '';
    o.onRender(false);
    o.onDone(false);
  }

  function finishAll() {
    cancelled = true;
    cursor.remove();
    o.codeEl.replaceChildren(...tokenNodes(tokenizeCss(fullCss)));
    o.mdSrc.textContent = resumeMd;
    o.styleEl.textContent = fullCss;
    o.codeEl.scrollTop = o.codeEl.scrollHeight;
    o.onRender(true);
    o.onDone(true);
  }

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  // Type tokens into `parent`, keeping the cursor last, one frame at a time.
  function type(parent: HTMLElement, scrollEl: HTMLElement, tokens: Token[], isCss: boolean) {
    return new Promise<void>((resolve) => {
      parent.appendChild(cursor);
      let ti = 0;
      let ci = 0;
      let node: Text | null = null;
      let nextAt = performance.now();

      const frame = (now: number) => {
        if (cancelled) return resolve();
        let budget = 12;
        let scrolled = false;
        while (now >= nextAt && ti < tokens.length && budget-- > 0) {
          const tok = tokens[ti];
          if (!node) {
            node = document.createTextNode('');
            if (tok.cls) {
              const span = document.createElement('span');
              span.className = tok.cls;
              span.appendChild(node);
              parent.insertBefore(span, cursor);
            } else {
              parent.insertBefore(node, cursor);
            }
          }
          const ch = tok.text[ci++];
          node.data += ch;
          if (isCss) {
            css += ch;
            if (ch === '}' || (ch === '/' && css.endsWith('*/'))) o.styleEl.textContent = css;
          }
          if (ch === '\n') scrolled = true;

          const inComment = tok.cls === 'tk-comment';
          let delay = !isCss ? MD_MS : inComment ? COMMENT_MS : CODE_MS;
          if (inComment && (ch === '.' || ch === '!')) delay += 110;
          if (ch === '\n') delay += inComment ? 40 : 10;
          nextAt += delay;

          if (ci >= tok.text.length) { ti++; ci = 0; node = null; }
        }
        if (scrolled) scrollEl.scrollTop = scrollEl.scrollHeight;
        if (ti >= tokens.length) {
          if (isCss) o.styleEl.textContent = css;
          return resolve();
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  }

  async function run() {
    reset();
    if (o.reducedMotion) return finishAll();
    await sleep(600);
    if (cancelled) return;
    await type(o.codeEl, o.codeEl, tokenizeCss(cssA), true);
    if (cancelled) return;
    await type(o.mdSrc, o.mdEl, [{ cls: null, text: resumeMd }], false);
    if (cancelled) return;
    await type(o.codeEl, o.codeEl, tokenizeCss(cssB), true);
    if (cancelled) return;
    o.onRender(true);
    o.mdEl.scrollTop = 0;
    await sleep(1400);
    if (cancelled) return;
    await type(o.codeEl, o.codeEl, tokenizeCss(cssC), true);
    if (cancelled) return;
    cursor.remove();
    o.onDone(true);
  }

  run();
  return {
    skip: finishAll,
    cancel() { cancelled = true; cursor.remove(); },
  };
}
