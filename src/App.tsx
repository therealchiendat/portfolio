import Intro from './Intro';
import { companies, profile, projects } from './content';

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
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <div className="hero">
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="headline">{profile.headline}</p>
          <div className="cta">
            <a className="btn primary" href={`mailto:${profile.email}`}>Get in touch</a>
            {profile.links.map((l) => (
              <a key={l.href} className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>
        </div>

        <Section id="experience" title="Experience">
          <ul className="chips">
            {companies.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </Section>

        <Section id="projects" title="Projects">
          <div className="cards">
            {projects.map((p) => (
              <article key={p.name} className="card">
                <h3><a href={p.href} target="_blank" rel="noreferrer">{p.name} ↗</a></h3>
                <p>{p.blurb}</p>
                <a href={p.href} target="_blank" rel="noreferrer">{p.linkLabel}</a>
              </article>
            ))}
          </div>
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
