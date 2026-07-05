import type { Metadata } from "next";
import SolutionsPage from "@/components/solutions/SolutionsPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getSolutions } from "@/i18n/solutions";
import { siloMetadata } from "@/lib/siloMeta";
import { buildSolutionsSchema } from "@/lib/schema";
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
  return siloMetadata(locale, getSolutions(locale));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);
  const solutions = getSolutions(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSolutionsSchema(locale, solutions)) }}
      />
      <SolutionsPage locale={locale} dict={dict} solutions={solutions} />
    </>
  );
}
