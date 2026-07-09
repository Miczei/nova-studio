import { SITE_URL } from "./site";
import type { Locale } from "@/i18n/config";
import type { PageContent } from "@/i18n/pages";
import type { AboutContent } from "@/i18n/about";
import type { SolutionsContent } from "@/i18n/solutions";

/**
 * JSON-LD for a service silo page: a Service (what we offer) plus a
 * BreadcrumbList (crawlable position in the site). Rendered into the page as
 * an application/ld+json script.
 */
export function buildPageSchema(locale: Locale, page: PageContent) {
  const url = `${SITE_URL}/${locale}/${page.slug}`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.breadcrumb,
    serviceType: page.eyebrow,
    description: page.metaDescription,
    url,
    provider: {
      "@type": "Organization",
      name: "Couders",
      url: `${SITE_URL}/${locale}`,
    },
    areaServed: ["Europe", "North America", "Asia-Pacific"],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Couders",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.breadcrumb,
        item: url,
      },
    ],
  };

  return [service, breadcrumb];
}

/**
 * JSON-LD for the About page: an AboutPage, the Organization it describes (with
 * founding location for local relevance) and a BreadcrumbList.
 */
export function buildAboutSchema(locale: Locale, about: AboutContent) {
  const url = `${SITE_URL}/${locale}/${about.slug}`;

  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: about.metaTitle,
    description: about.metaDescription,
    url,
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Couders",
    url: `${SITE_URL}/${locale}`,
    description: about.metaDescription,
    foundingLocation: {
      "@type": "Place",
      name: "Kraków, Poland",
    },
    areaServed: ["Europe", "North America", "Asia-Pacific"],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Couders",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: about.breadcrumb,
        item: url,
      },
    ],
  };

  return [aboutPage, organization, breadcrumb];
}

/**
 * JSON-LD for the Solutions page: a Service (what we offer), an FAQPage built
 * from the same copy shown on the page (so schema and visible content never
 * drift apart) and a BreadcrumbList.
 */
export function buildSolutionsSchema(locale: Locale, solutions: SolutionsContent) {
  const url = `${SITE_URL}/${locale}/${solutions.slug}`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI & Automation Solutions",
    serviceType: "Workflow automation, web scraping, marketing automation",
    description: solutions.metaDescription,
    url,
    provider: {
      "@type": "Organization",
      name: "Couders",
      url: `${SITE_URL}/${locale}`,
    },
    areaServed: ["Europe", "North America", "Asia-Pacific"],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: solutions.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Couders",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: solutions.breadcrumb,
        item: url,
      },
    ],
  };

  return [service, faqPage, breadcrumb];
}
