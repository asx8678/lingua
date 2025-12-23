/**
 * Site Configuration
 * Re-exports from domain-specific config files for backwards compatibility
 */

// Re-export everything from domain-specific configs
export { SITE_URL, SITE_NAME, CONTACT, BUSINESS, BRAND_NAME, BRAND_TAGLINE, FULL_ADDRESS, ADDRESS_SHORT, BUSINESS_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, DATA_PROCESSORS } from "./business";

export { DEFAULT_TITLE, DEFAULT_DESCRIPTION, OG_IMAGE, OG_IMAGE_ALT, generateBreadcrumbSchema, generateFaqSchema, type BreadcrumbItem } from "./seo";

export { ANALYTICS_ID, ANALYTICS_ENABLED, EMAIL_PROVIDER_NAME, BOOKING_URL, NEXT_INTAKE_MONTH, SLOTS_LEFT, OTHER_LANG_PRICE_1ON1_FROM, OTHER_LANG_PRICE_GROUP_FROM, TEST_RESULT_WEBHOOK_URL, GOOGLE_REVIEWS, YEARS_IN_OPERATION, STORAGE_KEYS, TRACK_CATEGORIES, getEnrollmentMessage } from "./analytics";

export { PRIMARY_CTA, SECONDARY_CTA, SECONDARY_CTA_LANGUAGE, SECONDARY_CTA_MATH, getSecondaryCta, CTA_PRIMARY_LABEL, CTA_PRIMARY_LABEL_SHORT, CTA_PRIMARY_HREF, CTA_PRIMARY_TARGET, CTA_PRIMARY_REL, CTA_SECONDARY_LABEL, CTA_SECONDARY_HREF, type CtaVariant } from "./cta";

// Legacy exports (deprecated - use isEmpty from utils instead)
/** @deprecated Use optional chaining instead */
export const isTodo = (value: string | undefined | null) => !value;

// Teacher specialties mapping
export const TEACHER_SPECIALTIES: Record<string, string[]> = {
  "Kasia": ["Business English", "Egzaminy Cambridge"],
  "Ola": ["Konwersacje", "Hiszpański dla początkujących"],
  "Natalia": ["Hiszpański A1-B2", "Kultura Ameryki Łacińskiej"],
  "Janina": ["Rosyjski dla Polaków", "Tłumaczenia"],
  "Małgorzata": ["Niemiecki biznesowy", "Szwedzki"],
  "Marcin K.": ["Angielski akademicki", "Francuski A1-B1"],
};
