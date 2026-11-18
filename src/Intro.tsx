import { useEffect, useRef, useState } from 'react';
import { education, experience, profile, projects } from './content';
import { runIntro } from './typewriter';
import { createScrollGate } from './scrollGate';

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Intro() {
  const [rendered, setRendered] = useState(false);
  const [done, setDone] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);
  const mdRef = useRef<HTMLPreElement>(null);
  const srcRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const windowsRef = useRef<HTMLDivElement>(null);
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

  // Scroll threshold between the intro and the portfolio.
  useEffect(() => {
    if (reducedMotion || !stageRef.current || !backRef.current) return;
    return createScrollGate({ stage: stageRef.current, backEl: backRef.current });
  }, []);

  // Once the intro is finished, the windows tilt towards the mouse.
  useEffect(() => {
    const stage = stageRef.current;
    const windows = windowsRef.current;
    if (!done || !stage || !windows || reducedMotion) return;
    let raf = 0;
    const set = (x: number, y: number) => {
      windows.style.setProperty('--tilt-x', `${x.toFixed(2)}deg`);
      windows.style.setProperty('--tilt-y', `${y.toFixed(2)}deg`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        set(nx * 7, -ny * 5);
      });
    };
    const onLeave = () => set(0, 0);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
      set(0, 0);
    };
  }, [done]);

  return (
    <section className="stage" ref={stageRef} aria-label="Animated introduction">
      <style ref={styleRef} />
      <div className="stage-fx">
        <div id="title" aria-hidden="true">
          Front End&nbsp;<b id="sucks"><span>Sucks</span></b>
        </div>

        <div className="windows" ref={windowsRef} aria-hidden="true">
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
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <span className="track"><i /></span>
      </div>
      <div className="back-hint" ref={backRef} aria-hidden="true">
        <span>Keep scrolling up for the intro</span>
        <i />
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
