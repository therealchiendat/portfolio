import { useEffect, useRef, useState } from 'react';
import { education, experience, profile, projects } from './content';
import { highlightCss } from './highlight';
import { cssA, cssB, cssC, fullCss, resumeMd } from './introScript';

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Intro() {
  const [css, setCss] = useState(reduced ? fullCss : '');
  const [md, setMd] = useState(reduced ? resumeMd : '');
  const [rendered, setRendered] = useState(reduced);
  const [done, setDone] = useState(reduced);
  const codeRef = useRef<HTMLPreElement>(null);
  const mdRef = useRef<HTMLPreElement>(null);
  const skipRef = useRef(false);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    skipRef.current = false;
    setCss(''); setMd(''); setRendered(false); setDone(false);

    // Types `text` into a setter, a few characters at a time, with
    // small pauses after sentences and blank lines.
    async function type(text: string, set: (fn: (s: string) => string) => void) {
      let i = 0;
      while (i < text.length && !cancelled && !skipRef.current) {
        const n = 3;
        const piece = text.slice(i, i + n);
        i += n;
        set((s) => s + piece);
        await sleep(/\.\s|\n\n/.test(piece) ? 260 : 16);
      }
    }

    async function run() {
      await sleep(600);
      await type(cssA, setCss);
      await type(resumeMd, setMd);
      await type(cssB, setCss);
      if (cancelled || skipRef.current) return;
      setRendered(true);
      await sleep(1200);
      await type(cssC, setCss);
      if (cancelled) return;
      if (skipRef.current) { setCss(fullCss); setMd(resumeMd); setRendered(true); }
      setDone(true);
    }
    run();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => { codeRef.current?.scrollTo(0, codeRef.current.scrollHeight); }, [css]);
  useEffect(() => { mdRef.current?.scrollTo(0, rendered ? 0 : mdRef.current.scrollHeight); }, [md, rendered]);

  const skip = () => {
    skipRef.current = true;
    setCss(fullCss); setMd(resumeMd); setRendered(true); setDone(true);
  };

  return (
    <section className="stage" aria-label="Animated introduction">
      <style>{css}</style>
      <div id="title" aria-hidden="true">Front End&nbsp;<b id="sucks"><span>Sucks</span></b></div>

      <div className="windows" aria-hidden="true">
        <div id="resume-window-container">
          <pre id="resume-window" ref={mdRef}>
            {rendered ? <Rendered /> : md && md + '_'}
          </pre>
        </div>
        <div id="code-window-container">
          <pre id="code-window" ref={codeRef}>{css && <>{highlightCss(css)}{done ? '' : '_'}</>}</pre>
        </div>
      </div>

      <div className="stage-actions">
        {done
          ? <a className="btn" href="#top">See the full portfolio ↓</a>
          : <button className="btn" type="button" onClick={skip}>Skip animation</button>}
      </div>
    </section>
  );
}

function Rendered() {
  return (
    <div id="md" className="rendered">
      <h1>Dat's Resume</h1>
      <p>{profile.name}</p>
      <p>{profile.role}</p>
      <h2>Contact</h2>
      <ul>
        <li>{profile.email}</li>
        <li>github.com/therealchiendat</li>
        <li>linkedin.com/in/chiendat</li>
      </ul>
      <h2>Experience</h2>
      <ul>
        {experience.map((j) => <li key={j.company}>{j.company}: {j.title} ({j.period})</li>)}
      </ul>
      <h2>Projects</h2>
      <ul>{projects.map((p) => <li key={p.name}>{p.name}</li>)}</ul>
      <h2>Education</h2>
      <ul><li>{education.school}, {education.period}</li></ul>
    </div>
  );
}
