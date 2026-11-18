import Intro from './Intro';
import { education, experience, highlights, profile, projects, skills } from './content';

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <>
      <Intro />
      <header className="nav">
        <a className="brand" href="#top">CD</a>
        <nav aria-label="Primary">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <div className="hero">
          <p className="eyebrow">{profile.location}</p>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="headline">{profile.headline}</p>
          <p className="lead">{profile.summary}</p>
          <div className="cta">
            <a className="btn primary" href={`mailto:${profile.email}`}>Get in touch</a>
            {profile.links.map((l) => (
              <a key={l.href} className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>
          <ul className="stats">
            {highlights.map((h) => (
              <li key={h.label}>
                <strong>{h.value}</strong>
                <span>{h.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <Section id="experience" title="Experience">
          <ol className="timeline">
            {experience.map((job) => (
              <li key={`${job.company}-${job.period}`} className="job">
                <div className="job-meta">{job.period}</div>
                <div>
                  <h3>{job.title} <span>· {job.company}</span></h3>
                  {job.summary && <p className="muted">{job.summary}</p>}
                  <ul>
                    {job.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <ul className="chips">
                    {job.stack.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" title="Projects & open source">
          <div className="cards">
            {projects.map((p) => (
              <article key={p.name} className="card">
                <h3>{p.href ? <a href={p.href} target="_blank" rel="noreferrer">{p.name} ↗</a> : p.name}</h3>
                <p>{p.blurb}</p>
                <ul className="chips">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="skills">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <h3>{group}</h3>
                <ul className="chips">{items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="muted edu">
            {education.degree}, {education.school} ({education.period})
          </p>
        </Section>

        <Section id="contact" title="Contact">
          <p>
            Best reached at <a href={`mailto:${profile.email}`}>{profile.email}</a>, or on{' '}
            {profile.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && ' and '}
                <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              </span>
            ))}.
          </p>
        </Section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
