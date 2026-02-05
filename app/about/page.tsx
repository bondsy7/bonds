'use client';

import { PageTransition } from '@/components/PageTransition';
import { PageHeader } from '@/components/PageHeader';
import { useLocale } from '@/components/LocaleProvider';

export default function AboutPage() {
  const { locale } = useLocale();

  return (
    <PageTransition>
      <PageHeader
        title={locale === 'de' ? 'Über mich' : 'About me'}
        intro={
          locale === 'de'
            ? 'Ich verbinde Produktdenken, technische Exzellenz und Führung. Mein Fokus: klare Systeme, starke Teams und messbare Ergebnisse.'
            : 'I combine product thinking, technical excellence, and leadership. My focus: clear systems, strong teams, and measurable outcomes.'
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {['How I Build', 'Leadership Rhythm', 'Execution Quality'].map((item) => (
          <article key={item} className="card-glass">
            <h2 className="text-xl font-medium">{item}</h2>
            <p className="mt-2 text-sm text-white/70">Architecture-first thinking, transparent communication, and outcome-driven delivery.</p>
          </article>
        ))}
      </div>
    </PageTransition>
  );
}
