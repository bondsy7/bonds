"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { motion } from "framer-motion";

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

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glass-panel flex items-center gap-2 rounded-full px-6 py-3"
      >
        <Link href={`/${locale}`} className="mr-6 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          DB
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {routes.map(r => {
            const href = `/${locale}${r.href}`;
            const active = pathname === href || (href !== `/${locale}` && pathname.startsWith(href));
            return (
              <Link
                key={r.key}
                href={href}
                className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600"
              >
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-slate-100"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`relative z-10 ${active ? "text-slate-900" : "text-slate-500"}`}>
                  {t(r.key)}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-4 flex items-center gap-2 border-l border-slate-200 pl-4 dark:border-slate-800">
          <ThemeToggle />
          <LocaleSwitch />
          <MobileNav />
        </div>
      </motion.div>
    </header>
  );
}
