import Link from "next/link";
import { projects } from "@/data/projects";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("title"),
    description: t("sub")
  };
}

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-20">
      <div className="mb-16 text-center animate-in slide-in-from-bottom-4 fade-in duration-700">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">{t("title")}</h1>
        <p className="mt-4 text-xl text-slate-500">{t("sub")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/${locale}/projects/${p.slug}`}
            className="glass-panel group flex flex-col overflow-hidden rounded-[2rem] p-2 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Image Placeholder */}
            <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-slate-100">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-sm transition-transform duration-700 group-hover:scale-105">
                {p.title} Preview
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
            </div>

            <div className="flex flex-1 flex-col p-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {p.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-slate-400 opacity-0 transition-all -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-slate-900">
                  {t("open")} <ArrowRight size={14} />
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {t(`details.${p.slug}.title`)}
              </h2>
              <p className="mt-3 mb-6 flex-1 text-slate-500 leading-relaxed">
                {t(`details.${p.slug}.description`)}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {p.stack.slice(0, 3).map(s => (
                  <span key={s} className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
