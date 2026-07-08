import type { Metadata } from "next";
import { SITE_URL } from "./site";
import type { Locale } from "@/i18n/config";

/** Minimal shape needed to build metadata (PageContent + AboutContent both fit). */
type MetaSource = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

/** Per-page metadata: title, description, keywords, canonical + hreflang. */
export function siloMetadata(locale: Locale, page: MetaSource): Metadata {
  const path = `/${locale}/${page.slug}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/${page.slug}`,
        pl: `/pl/${page.slug}`,
        "x-default": `/en/${page.slug}`,
      },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: path,
      siteName: "Couders",
      type: "website",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}
