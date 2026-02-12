import { getTranslations } from "next-intl/server";
import { SkillNetwork } from "@/components/playground/SkillNetwork";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "playground" });
    return {
        title: t("title"),
        description: t("sub")
    };
}

export default async function Playground({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "playground" });

    return (
        <div className="relative h-screen w-full overflow-hidden pt-20">
            <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center pt-10">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{t("title")}</h1>
                <p className="mt-4 text-xl text-slate-500">{t("sub")}</p>
            </div>

            <SkillNetwork />
        </div>
    );
}
