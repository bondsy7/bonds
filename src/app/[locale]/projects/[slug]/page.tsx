import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: `projects.details.${slug}` });
  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function ProjectDetail({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: `projects.details.${slug}` });
  const tCommon = await getTranslations({ locale, namespace: "projects" });

  // Highlights fetching (mock 3 items)
  const highlights = [0, 1, 2];

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <Link href={`/${locale}/projects`} className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition">
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> {tCommon("title")}
      </Link>

      <div className="animate-in slide-in-from-bottom-8 fade-in duration-700">
        <span className="block text-sm font-bold uppercase tracking-wider text-blue-600">
          {project.category}
        </span>

        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl">{t("title")}</h1>
        <p className="mt-8 text-2xl leading-relaxed text-slate-500 font-light">
          {t("description")}
        </p>

        {/* Stack */}
        <div className="mt-10 flex flex-wrap gap-2">
          {project.stack.map(s => (
            <span key={s} className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              {s}
            </span>
          ))}
        </div>

        {/* Image Placeholder */}
        <div className="mt-16 aspect-video w-full overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-200/50 relative">
          <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-lg">
            Project Detail Image Placeholder
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Highlights</h2>
          </div>
          {highlights.map(i => (
            <div key={i} className="glass-panel rounded-3xl p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-slate-900">Feature {i + 1}</h3>
              <p className="text-slate-500 leading-relaxed">{t(`highlights.${i}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
