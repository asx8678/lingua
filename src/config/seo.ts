/**
 * SEO Configuration
 * Central place for all SEO-related settings
 */

import { SITE_URL, BRAND_NAME } from "./site";

export const DEFAULT_TITLE = `${BRAND_NAME} — języki obce i matematyka w Legionowie`;
export const DEFAULT_DESCRIPTION =
  "Szkoła języków obcych i matematyki w Legionowie. Zajęcia stacjonarne i online dla wszystkich poziomów. Umów bezpłatną diagnozę i plan nauki.";

export const OG_IMAGE = "/images/og-lingua.png";
export const OG_IMAGE_ALT = "Lingua Legionowo - Szkoła języków obcych i matematyki";

export type BreadcrumbItem = {
  name: string;
  url?: string;
};

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? new URL(item.url, SITE_URL).toString() : undefined,
    })),
  };
}

export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
