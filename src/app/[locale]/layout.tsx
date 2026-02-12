import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Noise } from "@/components/ui/Noise";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: {
      template: "%s | Daniel Bonds",
      default: "Daniel Bonds - Technical Leader & Engineer"
    },
    description: t("sub"),
    openGraph: {
      title: "Daniel Bonds - Technical Leader & Engineer",
      description: t("sub"),
      url: "https://danielbonds.dev",
      siteName: "Daniel Bonds Portfolio",
      locale: locale,
      type: "website"
    }
  };
}

import { ThemeProvider } from "@/context/ThemeContext";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${outfit.variable} ${jakarta.variable} transition-colors duration-500`}>
      <body suppressHydrationWarning className="min-h-screen bg-background font-body text-foreground transition-colors duration-500 selection:bg-blue-100 selection:text-blue-900">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <SmoothScroll />
            <CustomCursor />
            <Noise />
            <div className="flex min-h-screen flex-col blob-bg">
              <Navbar />
              <PageTransition>{children}</PageTransition>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
