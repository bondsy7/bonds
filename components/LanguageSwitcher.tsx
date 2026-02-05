'use client';

import { localeMeta } from '@/data/content';
import { useLocale } from './LocaleProvider';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-xs backdrop-blur">
      {(Object.keys(localeMeta) as Array<keyof typeof localeMeta>).map((key) => (
        <button
          key={key}
          onClick={() => setLocale(key)}
          className={`rounded-full px-3 py-1 transition ${locale === key ? 'bg-accent text-white' : 'text-white/70 hover:text-white'}`}
        >
          <span className="mr-1">{localeMeta[key].flag}</span>
          {localeMeta[key].label}
        </button>
      ))}
    </div>
  );
}
