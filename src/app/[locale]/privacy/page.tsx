import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "privacy" });
    return {
        title: t("title")
    };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "privacy" });

    return (
        <div className="mx-auto max-w-4xl px-6 pt-32 pb-20">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl mb-12 uppercase italic">{t("title")}</h1>

                <div className="glass-panel p-8 md:p-12 space-y-12">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{t("section1.title")}</h2>
                        <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {t("section1.text")}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{t("section2.title")}</h2>
                        <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {t("section2.text")}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{t("section3.title")}</h2>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{t("section3.subtitle")}</h3>
                        <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {t("section3.text")}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{t("section4.title")}</h2>
                        <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {t("section4.text")}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{t("section5.title")}</h2>
                        <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {t("section5.text")}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{t("section6.title")}</h2>
                        <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {t("section6.text")}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{t("section7.title")}</h2>
                        <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {t("section7.text")}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
