"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales } from "@/i18n/routing";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function toggleLocale() {
    const nextLocale = locale === "de" ? "en" : "de";

    // Improved routing logic for next-intl
    // Replace the first locale segment (e.g. /de/something -> /en/something)
    const segments = pathname.split("/");
    if (segments[1] === locale) {
      segments[1] = nextLocale;
    } else {
      // Fallback if structure is different
      segments.splice(1, 0, nextLocale);
    }

    router.push(segments.join("/"));
    router.refresh(); // Ensure full reload of locale-specific assets
  }

  return (
    <button
      onClick={toggleLocale}
      className="group relative flex h-5 w-8 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md active:scale-95"
      aria-label="Switch Language"
      title={locale === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
    >
      <div className="h-full w-full relative">
        <img
          src={locale === "de" ? "/Flag_of_Germany.svg" : "/Flag_of_the_United_States.svg"}
          alt={locale === "de" ? "Deutsch" : "English"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-[1px]">
        <span className="text-[9px] font-black text-white uppercase drop-shadow-md tracking-tighter">
          {locale === "de" ? "➔ EN" : "➔ DE"}
        </span>
      </div>
    </button>
  );
}
