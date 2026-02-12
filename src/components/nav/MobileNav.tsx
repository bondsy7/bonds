"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const routes = [
    { key: "home", href: "" },
    { key: "about", href: "/about" },
    { key: "projects", href: "/projects" },
    { key: "expertise", href: "/expertise" },
    { key: "playground", href: "/playground" },
    { key: "studio", href: "/ai-studio" },
    { key: "hobbies", href: "/hobbies" },
    { key: "contact", href: "/contact" }
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Open menu"
            >
                <Menu size={20} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs border-l border-slate-200 bg-white p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-slate-900">Menu</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="mt-8 flex flex-col gap-2">
                                {routes.map(r => {
                                    const href = `/${locale}${r.href}`;
                                    const active = pathname === href || (href !== `/${locale}` && pathname.startsWith(href));

                                    return (
                                        <Link
                                            key={r.key}
                                            href={href}
                                            onClick={() => setIsOpen(false)}
                                            className={[
                                                "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition",
                                                active ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                            ].join(" ")}
                                        >
                                            {t(r.key)}
                                            {active && <ArrowRight size={16} className="text-blue-600" />}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="mt-auto pt-8">
                                <p className="text-xs text-center text-slate-400">© 2024 Daniel Bonds</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
