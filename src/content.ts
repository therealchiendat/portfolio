export const profile = {
  name: 'Chien Dat Nguyen Dinh',
  role: 'Senior Software Engineer',
  location: 'Fredericton, NB, Canada · Remote',
  headline: 'I build the platform and tooling that keep teams shipping.',
  summary:
    'Senior engineer focused on developer experience, CI/CD and release engineering, with a full-stack TypeScript background in regulated fintech and B2B SaaS. I have led teams, owned products end to end, and I like turning my own daily pain into tools other people use.',
  email: 'hello@chiendat.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/therealchiendat' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/chiendat' },
  ],
};

export const highlights = [
  { value: '2,400+', label: 'E2E merge-queue runs in 3 months' },
  { value: '37%', label: 'CI runner cost reduction' },
  { value: '30 min → 60 s', label: 'customer workflow time' },
  { value: '8+ yrs', label: 'shipping production software' },
];

export interface Job {
  period: string;
  title: string;
  company: string;
  summary?: string;
  bullets: string[];
  stack: string[];
}

export const experience: Job[] = [
  {
    period: '2025 – Now',
    title: 'Software Engineer',
    company: 'N3XT',
    summary:
      'Regulated blockchain-based bank providing instant, programmable USD payments for businesses. Employee #20.',
    bullets: [
      'Built the internal operations app and the customer app, front end and back end, in TypeScript, tRPC, zod, Node and React, with Jest unit and integration tests gating the merge queue.',
      'Led a two-person initiative (Torii) that put full end-to-end tests in the merge queue: 2,400+ runs in three months, 31-minute median gate, 37% lower CI runner cost.',
      'Proposed Bystander, a "dashcam" for CI failures that records git SHA, diff, error cause and rerun result so engineers and AI agents can triage faster, and won approval to build it. Prototypes show 4–10x faster AI triage.',
      'Own the B2B authentication integration (Stytch): SDK and session handling, SSO-bypass attestation for E2E tests, MFA and incident unblocking.',
      'Contributed to KYB/KYC onboarding, infrastructure consolidation with Terraform and zero-downtime cutover, and a 24/7 on-call rotation.',
    ],
    stack: ['TypeScript', 'React', 'Node', 'tRPC', 'GCP', 'Terraform', 'Cypress', 'GitHub Actions'],
  },
  {
    period: '2022 – 2025',
    title: 'Senior Software Engineer → Lead',
    company: 'LifeRaft',
    summary: 'Threat-intelligence and investigation software. Promoted to lead, running three teams.',
    bullets: [
      'Delivered the company’s latest product on time, cutting a customer investigation workflow from 30 minutes to 60 seconds.',
      'Led a team of five senior engineers on an LLM-based content moderation and summarization prototype that became a new product offering.',
      'Migrated AngularJS to React micro-frontends with Module Federation and built an integration library that saved about 30% of generated integration code.',
      'Designed platform crash handling using localStorage and Broadcast Channel, and led technical planning for the re-design of a heavily used feature.',
    ],
    stack: ['React', 'Module Federation', 'Elasticsearch', 'PHP/Laravel', 'Python', 'PWA', 'Docker'],
  },
  {
    period: '2021 – 2022',
    title: 'Software Engineer',
    company: 'Introhive',
    bullets: [
      'Consistently beat estimates and became the team’s representative for company-wide product demos.',
      'Wrote an automation script that cut authentication time by 50%.',
    ],
    stack: ['Angular', 'Ruby on Rails', 'TypeScript', 'SQL', 'Docker'],
  },
  {
    period: '2019 – 2021',
    title: 'Front End Developer',
    company: 'Teledyne Technologies',
    bullets: [
      'Built projects for other Teledyne companies, the Government of Canada and the Canadian Space Agency.',
      'Created the front-end component library and mentored interns on current React practices.',
    ],
    stack: ['Angular', 'React', 'Electron', 'Java', 'Python'],
  },
];

export interface Project {
  name: string;
  blurb: string;
  tags: string[];
  href?: string;
}

export const projects: Project[] = [
  {
    name: 'Skye',
    blurb:
      'A Dark Sky-style weather app with no subscription. Combines Environment Canada data with multiple forecast models, runs on all my devices, and has a Tamagotchi-style dino companion.',
    tags: ['Weather', 'Cross-platform', 'Built with Claude Code'],
    href: 'https://github.com/therealchiendat/skye',
  },
  {
    name: 'Openpilot',
    blurb: 'Open source contribution: improved Mazda vehicle parameters to lift driving automation from L1 to L2.',
    tags: ['Open source', 'Automotive'],
    href: 'https://github.com/commaai/openpilot',
  },
  {
    name: 'Maigret',
    blurb: 'Open source contribution: fixed false-positive username detection on Pinterest in the OSINT username search tool.',
    tags: ['Open source', 'Python'],
    href: 'https://github.com/soxoj/maigret',
  },
];

export const skills: Record<string, string[]> = {
  'Languages & Frontend': ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Angular', 'HTML/CSS', 'Python'],
  'Backend & Data': ['Node', 'tRPC', 'PHP/Laravel', 'Ruby on Rails', 'SQL', 'Elasticsearch'],
  'Platform & DevEx': ['GitHub Actions', 'Cypress', 'Jest', 'Docker', 'Kubernetes', 'Terraform', 'GCP', 'AWS'],
  'Agentic tooling': ['Multi-agent coordination', 'MCP', 'Best-of-N', 'LLM prototyping'],
};

export const education = {
  degree: 'Bachelor of Science in Engineering',
  school: 'University of New Brunswick',
  place: 'Fredericton, NB, Canada',
  period: '2013 – 2017',
};
