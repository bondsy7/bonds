import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ParticlesClientWrapper } from "@/components/three/ParticlesClientWrapper";
import { ArrowRight, Cpu, Globe, Palette, Users, Sparkles } from "lucide-react";
import { TypewriterHeading } from "@/components/ui/TypewriterHeading";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  // Just use homepage metadata
  return {
    title: t("headline"),
  };
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const icons = {
    ai: <Cpu size={24} className="text-blue-600" />,
    web: <Globe size={24} className="text-emerald-500" />,
    visual: <Palette size={24} className="text-purple-500" />,
    lead: <Users size={24} className="text-orange-500" />
  };

  return (
    <div className="flex flex-col pt-32 pb-20 relative">
      <ParticlesClientWrapper />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 text-center z-10">
        {/* Animated Background Elements - simulated via CSS in layout blob-bg, plus extra here */}

        <div className="relative z-10 max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600 shadow-sm">
            <Sparkles size={12} />
            {t("kicker")}
          </div>

          <TypewriterHeading
            text={t("headline")}
            className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-7xl lg:text-8xl"
          />

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-500 md:text-2xl">
            {t("sub")}
          </p>

          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Link
              href={`/${locale}/projects`}
              className="glow-blue inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-xl transition-transform hover:scale-105 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              {t("ctaProjects")}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-lg transition-transform hover:scale-105 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
            >
              {t("ctaContact")}
            </Link>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {(["ai", "web", "visual", "lead"] as const).map((key, i) => (
            <div
              key={key}
              className="glow-blue group glass-panel relative overflow-hidden rounded-[2rem] p-8 transition-all"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-6 inline-flex rounded-2xl bg-slate-50 p-4 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
                {icons[key]}
              </div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {t(`cards.${key}.label`)}
              </p>
              <h3 className="mb-4 text-xl font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
                {t(`cards.${key}.title`)}
              </h3>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {t(`cards.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro / About Teaser */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900">Engineering & Design</h2>
          <p className="mx-auto mt-8 max-w-2xl text-2xl font-light leading-relaxed text-slate-500">
            &quot;Good design is obvious. Great design is transparent.&quot; — Joe Sparano. <br />
            <span className="mt-4 block font-normal text-slate-900">Ich arbeite daran, Technologie unsichtbar zu machen.</span>
          </p>
          <Link href={`/${locale}/about`} className="group mt-10 inline-flex items-center gap-2 text-lg font-medium text-blue-600 hover:text-blue-700">
            Mehr über mich
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
