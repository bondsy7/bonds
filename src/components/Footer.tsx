"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    const t = useTranslations("footer");

    function SocialLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
        return (
            <Link
                href={href}
                target="_blank"
                className="group relative flex items-center justify-center p-2 text-slate-400 transition hover:text-blue-600"
                aria-label={label}
            >
                <Icon size={20} className="transition group-hover:-translate-y-1" />
            </Link>
        );
    }

    return (
        <footer className="mt-20 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                        Daniel Bonds
                    </span>
                    <p className="text-sm text-slate-500">{t("rights")}</p>
                </div>

                <div className="flex items-center gap-6">
                    <SocialLink href="https://github.com" icon={Github} label="GitHub" />
                    <SocialLink href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
                    <SocialLink href="https://twitter.com" icon={Twitter} label="Twitter" />
                </div>

                <div className="flex gap-6 text-sm text-slate-500 font-medium">
                    <Link href="#" className="hover:text-blue-600 transition">{t("imprint")}</Link>
                    <Link href="#" className="hover:text-blue-600 transition">{t("privacy")}</Link>
                </div>
            </div>
        </footer>
    );
}
