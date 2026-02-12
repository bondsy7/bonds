import { getTranslations } from "next-intl/server";
import { Mail, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "contact" });
    return {
        title: t("title"),
        description: t("sub")
    };
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "contact" });

    const formLabels = {
        name: t("form.name"),
        email: t("form.email"),
        message: t("form.message"),
        send: t("form.send")
    };

    return (
        <div className="mx-auto max-w-4xl px-6 pt-32 pb-20">
            <div className="mb-16 text-center animate-in slide-in-from-bottom-4 fade-in duration-700">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">{t("title")}</h1>
                <p className="mt-4 text-xl text-slate-500">{t("sub")}</p>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
                {/* Contact Info */}
                <div className="space-y-8 animate-in slide-in-from-left-8 fade-in duration-700 delay-100">
                    <div className="glass-panel rounded-3xl p-8 transition hover:shadow-lg">
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">{t("email")}</h3>
                        <a href={`mailto:${t("email")}`} className="text-2xl font-bold text-blue-600 hover:text-blue-700 hover:underline decoration-2 underline-offset-4">
                            {t("email")}
                        </a>
                    </div>

                    <div className="glass-panel rounded-3xl p-8 transition hover:shadow-lg">
                        <h3 className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">Socials</h3>
                        <div className="flex flex-col gap-4">
                            {["GitHub", "LinkedIn", "Twitter"].map((n) => (
                                <a key={n} href="#" className="flex items-center gap-3 text-slate-600 transition hover:text-blue-600 font-medium">
                                    {n} <ArrowRight size={16} className="text-slate-300 transition group-hover:text-blue-600" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="animate-in slide-in-from-right-8 fade-in duration-700 delay-100">
                    <ContactForm labels={formLabels} />
                </div>
            </div>
        </div>
    );
}
