import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MatrixRain from "@/components/MatrixRain";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

// Next.js's generated route types check generateStaticParams's return type
// against this page's params, which widens to `string`. Narrow it back to
// Locale here instead of typing params as Locale directly (that mismatch is
// what breaks `next build`'s typed-routes check).
function toLocale(value: string): Locale {
  return (locales as readonly string[]).includes(value)
    ? (value as Locale)
    : defaultLocale;
}

const inter = Inter({
  subsets: ["latin", "latin-ext"], // latin-ext covers Polish diacritics
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

// Statically generate /en and /pl; reject any other locale with a 404.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

// TODO: replace with the real production domain once chosen.
const SITE_URL = "https://nova-studio.example";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        pl: "/pl",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: "Couders",
      locale: locale === "pl" ? "pl_PL" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);

  return (
    <html lang={locale} className={`${inter.variable} ${display.variable}`}>
      <body>
        <MatrixRain />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
