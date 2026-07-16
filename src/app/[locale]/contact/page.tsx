import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getContact } from "@/i18n/contact";
import { siloMetadata } from "@/lib/siloMeta";
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
  return siloMetadata(locale, getContact(locale));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);
  const content = getContact(locale);

  return <ContactPage locale={locale} dict={dict} content={content} />;
}
