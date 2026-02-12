import { getTranslations } from "next-intl/server";
import { Code2, Database, Layout, Terminal, Server, Zap, Palette } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "expertise" });
    return {
        title: t("title"),
        description: t("sub")
    };
}

export default async function Expertise({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "expertise" });

    const categories = [
        { key: 0, icon: <Layout className="text-blue-600" size={28} /> },
        { key: 1, icon: <Server className="text-emerald-600" size={28} /> },
        { key: 2, icon: <Zap className="text-purple-600" size={28} /> },
        { key: 3, icon: <Palette className="text-orange-600" size={28} /> }
    ];

    const messages = (await import(`../../../messages/${locale}.json`)).default;
    const skillsData = messages.expertise.skills;

    return (
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-20">
            <div className="mb-16 text-center animate-in slide-in-from-bottom-4 fade-in duration-700">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">{t("title")}</h1>
                <p className="mt-4 text-xl text-slate-500">{t("sub")}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {skillsData.map((cat: any, i: number) => (
                    <div key={i} className="glass-panel group rounded-3xl p-8 transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <h3 className="mb-6 flex items-center gap-4 text-2xl font-bold text-slate-900">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 shadow-sm ring-1 ring-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                                {categories[i]?.icon}
                            </div>
                            {cat.category}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {cat.items.map((item: string) => (
                                <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:border-blue-200 hover:text-blue-700">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
