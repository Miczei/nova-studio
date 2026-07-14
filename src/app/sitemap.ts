export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { locales } from "@/i18n/config";

const PATHS = ["", "about", "services/ai-engine", "services/security-data", "methodology"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const p of PATHS) {
    const suffix = p ? `/${p}` : "";
    for (const l of locales) {
      entries.push({
        url: `${SITE_URL}/${l}${suffix}`,
        lastModified: new Date(),
        changeFrequency: p ? "monthly" : "weekly",
        priority: p ? 0.8 : 1,
        alternates: {
          languages: Object.fromEntries(
            locales.map((x) => [x, `${SITE_URL}/${x}${suffix}`])
          ),
        },
      });
    }
  }
  return entries;
}
