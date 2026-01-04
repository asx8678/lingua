/**
 * SEO Configuration
 * Central place for all SEO-related settings
 */

import { SITE_URL, BRAND_NAME } from "./site";

export const DEFAULT_TITLE = `Szkoła językowa Legionowo | ${BRAND_NAME}`;
export const DEFAULT_DESCRIPTION =
  "Szkoła językowa w Legionowie – angielski, niemiecki, francuski i inne języki + matematyka. Zajęcia stacjonarne i online. Umów bezpłatną konsultację!";

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

export function generateCourseSchema(course: {
  name: string;
  description: string;
  provider?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "EducationalOrganization",
      name: course.provider || BRAND_NAME,
      url: SITE_URL,
    },
    ...(course.url && { url: new URL(course.url, SITE_URL).toString() }),
  };
}
