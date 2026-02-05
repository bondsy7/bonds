export type Locale = 'de' | 'en';

export const localeMeta: Record<Locale, { label: string; flag: string }> = {
  de: { label: 'Deutsch', flag: '🇩🇪' },
  en: { label: 'English', flag: '🇬🇧' }
};

export const nav = {
  de: [
    ['Start', '/'],
    ['Über mich', '/about'],
    ['Projekte', '/projects'],
    ['Expertise', '/expertise'],
    ['Playground', '/playground'],
    ['Hobbies', '/hobbies'],
    ['Kontakt', '/contact']
  ],
  en: [
    ['Home', '/'],
    ['About', '/about'],
    ['Projects', '/projects'],
    ['Expertise', '/expertise'],
    ['Playground', '/playground'],
    ['Hobbies', '/hobbies'],
    ['Contact', '/contact']
  ]
} as const;

export const heroCopy = {
  de: {
    eyebrow: 'Daniel Bonds · Innovation trifft Digitalisierung',
    title: 'Ich baue digitale Systeme, führe Teams und liefere AI-Produkte mit Wirkung.',
    body: 'Entwickler, Leiter, AI-Experte und Projektmanager. Ich denke in Architektur, Ergebnisse und Umsetzungsgeschwindigkeit.',
    ctaPrimary: 'Projekte ansehen',
    ctaSecondary: 'Lass uns sprechen',
    ctaTertiary: 'CV herunterladen'
  },
  en: {
    eyebrow: 'Daniel Bonds · Innovation meets digitization',
    title: 'I build digital systems, lead teams, and ship AI products with measurable impact.',
    body: 'Developer, leader, AI expert, and project manager. I think in architecture, outcomes, and delivery speed.',
    ctaPrimary: 'View projects',
    ctaSecondary: "Let’s talk",
    ctaTertiary: 'Download CV'
  }
} as const;

export const proofCards = [
  { metric: '40+', title: 'AI Automations', text: 'Agentic workflows, RAG and CRM-integrated pipelines.' },
  { metric: '18', title: 'Web Platforms', text: 'Scalable Next.js/NestJS products with strong performance.' },
  { metric: '12', title: 'Leadership Initiatives', text: 'Roadmaps, cross-functional delivery and stakeholder alignment.' },
  { metric: '99.9%', title: 'Delivery Reliability', text: 'Process quality, CI/CD discipline and structured execution.' }
];

export const projects = [
  {
    slug: 'ai-automation-fabric',
    category: 'AI',
    title: 'AI Automation Fabric',
    summary: 'Agent-driven automation platform for content, CRM, and customer operations.',
    challenge: 'Disconnected tools and manual bottlenecks slowed down growth teams.',
    approach: 'Built a modular orchestration layer with reusable AI agents and event routing.',
    outcome: 'Reduced repetitive workload and improved campaign throughput across teams.',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'LangChain', 'OpenAI']
  },
  {
    slug: 'cinematic-web-suite',
    category: 'Web',
    title: 'Cinematic Web Suite',
    summary: 'High-end web ecosystem with motion design and conversion-focused UX.',
    challenge: 'Legacy frontend lacked differentiation and user engagement.',
    approach: 'Rebuilt the frontend with modern architecture, animation system, and performance budgets.',
    outcome: 'Improved perceived product quality and significantly better user flow completion.',
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'Three.js']
  },
  {
    slug: 'visual-studio-pipeline',
    category: 'Visual',
    title: 'Visual Studio Pipeline',
    summary: 'Unified photo/video production pipeline with asset metadata and publishing flow.',
    challenge: 'Creative production was fragmented, slow and difficult to scale.',
    approach: 'Introduced a structured asset lifecycle from creation to distribution.',
    outcome: 'Faster turnaround for visual campaigns and consistent quality standards.',
    stack: ['Node.js', 'FFmpeg', 'Cloud Storage', 'Metadata APIs']
  },
  {
    slug: 'delivery-leadership-os',
    category: 'Leadership',
    title: 'Delivery Leadership OS',
    summary: 'Operating model for roadmap clarity, execution quality and team growth.',
    challenge: 'Projects moved fast but lacked governance and predictable shipping.',
    approach: 'Designed lightweight rituals, KPI dashboards and risk-driven planning.',
    outcome: 'Stronger delivery confidence and higher team autonomy.',
    stack: ['Agile Playbooks', 'Notion', 'Jira', 'Data Studio']
  }
] as const;
