import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "imprint" });
    return {
        title: t("title")
    };
}

export default async function ImprintPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "imprint" });

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
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{t("contact.title")}</h2>
                        <div className="text-slate-600 leading-relaxed space-y-2">
                            <p>{t("contact.phone")}</p>
                            <p>{t("contact.email")}</p>
                            <p>{t("contact.website")}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{t("editorial.title")}</h2>
                        <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {t("editorial.text")}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
