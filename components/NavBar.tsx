'use client';

import Link from 'next/link';
import { nav } from '@/data/content';
import { useLocale } from './LocaleProvider';
import { LanguageSwitcher } from './LanguageSwitcher';

export function NavBar() {
  const { locale } = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-white/90">
          DANIEL BONDS
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-white/70 md:flex">
          {nav[locale].map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
