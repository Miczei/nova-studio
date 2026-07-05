import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getAbout } from "@/i18n/about";
import { siloMetadata } from "@/lib/siloMeta";
import { buildAboutSchema } from "@/lib/schema";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

function toLocale(v: string): Locale {
  return (locales as readonly string[]).includes(v) ? (v as Locale) : defaultLocale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return siloMetadata(locale, getAbout(locale));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);
  const about = getAbout(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAboutSchema(locale, about)) }}
      />
      <AboutPage locale={locale} dict={dict} about={about} />
    </>
  );
}
