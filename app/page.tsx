'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { heroCopy, proofCards } from '@/data/content';
import { useLocale } from '@/components/LocaleProvider';

const HeroScene = dynamic(() => import('@/components/HeroScene').then((m) => m.HeroScene), { ssr: false });

export default function HomePage() {
  const { locale } = useLocale();
  const copy = heroCopy[locale];

  return (
    <PageTransition>
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 p-8 md:p-14">
        <HeroScene />
        <div className="relative z-10 max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.24em] text-white/70">{copy.eyebrow}</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">{copy.title}</h1>
          <p className="max-w-2xl text-lg text-white/75">{copy.body}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/projects" className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold">
              {copy.ctaPrimary}
            </Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-5 py-2.5 text-sm">
              {copy.ctaSecondary}
            </Link>
            <button className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/80">
              {copy.ctaTertiary}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {proofCards.map((card, i) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="card-glass hover:shadow-[0_0_60px_rgba(79,140,255,0.15)]"
          >
            <p className="text-3xl font-semibold text-accent">{card.metric}</p>
            <h2 className="mt-4 text-xl font-medium">{card.title}</h2>
            <p className="mt-2 text-sm text-white/70">{card.text}</p>
          </motion.article>
        ))}
      </section>
    </PageTransition>
  );
}
