export const profile = {
  name: 'Chien Dat Nguyen Dinh',
  role: 'Software Engineer',
  headline: 'I build the platform and tooling that keep teams shipping.',
  email: 'hello@chiendat.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/therealchiendat' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/chiendat' },
  ],
};

// Company names only, on purpose: no titles, dates or details.
export const companies: string[] = ['N3XT', 'LifeRaft', 'Introhive', 'Teledyne Technologies'];

export interface Project {
  name: string;
  blurb: string;
  href: string;
  linkLabel: string;
}

// TODO: Skye's App Store URL (https://apps.apple.com/app/id…).
const SKYE_APP_STORE = 'https://skye.chiendat.com';

export const projects: Project[] = [
  {
    name: 'Skye',
    blurb: 'A weather app: one clean screen, a plain-English summary and a pixel companion.',
    href: SKYE_APP_STORE,
    linkLabel: 'App Store',
  },
  {
    name: 'S.K.Y.E.',
    blurb: "Skye's own forecast model, scored against weather stations around the world.",
    href: 'https://skye.chiendat.com/skye.html',
    linkLabel: 'How it works',
  },
];
