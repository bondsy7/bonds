'use client';

import { PageTransition } from '@/components/PageTransition';
import { PageHeader } from '@/components/PageHeader';
import { useLocale } from '@/components/LocaleProvider';

const capabilities = [
  ['AI Systems', 'RAG, automation frameworks, intelligent workflows'],
  ['Architecture', 'Scalable web backends, event-driven services, APIs'],
  ['Delivery', 'Roadmaps, KPI systems, stakeholder alignment'],
  ['Visual Craft', 'Photography, cinematic UI, and storytelling through motion']
];

export default function ExpertisePage() {
  const { locale } = useLocale();

  return (
    <PageTransition>
      <PageHeader
        title={locale === 'de' ? 'Expertise' : 'Expertise'}
        intro={
          locale === 'de'
            ? 'Keine Skill-Liste, sondern ein Capability System: Was ich denke, wie ich liefere, was ich baue.'
            : 'Not a skill list but a capability system: how I think, how I deliver, and what I ship.'
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {capabilities.map(([title, desc]) => (
          <article key={title} className="card-glass">
            <h2 className="text-2xl font-medium">{title}</h2>
            <p className="mt-3 text-white/70">{desc}</p>
          </article>
        ))}
      </div>
    </PageTransition>
  );
}
