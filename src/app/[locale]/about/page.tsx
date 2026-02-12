import { getTranslations } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";

import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "about" });
    return {
        title: t("title"),
        description: t("sub")
    };
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "about" });
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    const timeline = messages.about.timeline;
    const values = messages.about.values.items;

    return (
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-20">
            <div className="grid gap-16 md:grid-cols-2">
                {/* Left Column: Text */}
                <div className="animate-in slide-in-from-left-8 fade-in duration-700">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{t("title")}</h1>
                    <p className="mt-4 text-xl text-slate-500">{t("sub")}</p>

                    <div className="mt-10 space-y-6 text-lg leading-relaxed text-slate-600">
                        <p>{t("intro")}</p>
                    </div>

                    <div className="mt-12">
                        <h2 className="mb-6 text-2xl font-bold text-slate-900">{t("values.title")}</h2>
                        <div className="space-y-6">
                            {values.map((v: any, i: number) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{v.title}</h3>
                                        <p className="text-sm text-slate-500">{v.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Visual & Timeline */}
                <div className="space-y-12 animate-in slide-in-from-right-8 fade-in duration-700 delay-200">
                    {/* Profile Image */}
                    <div className="glass-panel relative aspect-square w-full overflow-hidden rounded-3xl bg-slate-50">
                        <Image
                            src="/daniel_Bonds.png"
                            alt="Daniel Bonds"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Timeline */}
                    <div className="glass-panel rounded-3xl p-8">
                        <h3 className="mb-8 text-xl font-bold text-slate-900">Timeline</h3>
                        <div className="space-y-8 pl-2">
                            {timeline.map((item: any, i: number) => (
                                <div key={i} className="relative border-l-2 border-slate-100 pl-8 pb-2 last:pb-0">
                                    <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-blue-600 shadow-sm" />
                                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-blue-600">{item.year}</span>
                                    <h4 className="text-lg font-bold text-slate-900">{item.role}</h4>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
