import { useEffect, useRef, useState } from 'react';
import { education, experience, profile, projects } from './content';
import { runIntro } from './typewriter';

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Intro() {
  const [rendered, setRendered] = useState(false);
  const [done, setDone] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);
  const mdRef = useRef<HTMLPreElement>(null);
  const srcRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement>(null);
  const ctl = useRef<ReturnType<typeof runIntro> | null>(null);

  useEffect(() => {
    ctl.current = runIntro({
      codeEl: codeRef.current!,
      mdEl: mdRef.current!,
      mdSrc: srcRef.current!,
      styleEl: styleRef.current!,
      reducedMotion,
      onRender: setRendered,
      onDone: setDone,
    });
    return () => ctl.current?.cancel();
  }, []);

  return (
    <section className="stage" aria-label="Animated introduction">
      <style ref={styleRef} />
      <div id="title" aria-hidden="true">
        Front End&nbsp;<b id="sucks"><span>Sucks</span></b>
      </div>

      <div className="windows" aria-hidden="true">
        <div id="resume-window-container">
          <pre id="resume-window" ref={mdRef}>
            <div id="md-src" ref={srcRef} hidden={rendered} />
            {rendered && <Rendered />}
          </pre>
        </div>
        <div id="code-window-container">
          <pre id="code-window" ref={codeRef} />
        </div>
      </div>

      <div className="stage-actions">
        {done
          ? <a className="btn" href="#top">See the full portfolio ↓</a>
          : <button className="btn" type="button" onClick={() => ctl.current?.skip()}>Skip animation</button>}
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
