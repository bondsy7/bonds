import { getTranslations } from "next-intl/server";
import { Gamepad2, Camera, Mountain } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "hobbies" });
    return {
        title: t("title"),
        description: t("sub")
    };
}

export default async function Hobbies({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "hobbies" });

    const icons = [
        <Camera key="photo" size={40} className="text-blue-600" />,
        <Mountain key="hike" size={40} className="text-emerald-600" />,
        <Gamepad2 key="game" size={40} className="text-purple-600" />
    ];

    const messages = (await import(`../../../messages/${locale}.json`)).default;
    const items = messages.hobbies.items;

    return (
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-20">
            <div className="mb-16 text-center animate-in slide-in-from-bottom-4 fade-in duration-700">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{t("title")}</h1>
                <p className="mt-4 text-xl text-slate-500">{t("sub")}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {items.map((item: any, i: number) => (
                    <div key={i} className="glass-panel group relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] p-10 text-center transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/5">
                        <div className="mb-8 rounded-full bg-slate-50 p-6 shadow-sm ring-1 ring-slate-100 transition-transform group-hover:scale-110 group-hover:bg-white group-hover:shadow-md">
                            {icons[i]}
                        </div>
                        <h3 className="mb-3 text-2xl font-bold text-slate-900">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
