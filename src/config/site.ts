export const SITE_URL = "https://lingualegionowo.pl";
export const SITE_NAME = "Lingua Legionowo";

export const CONTACT = {
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "lingualegionowo@gmail.com",
  phone: import.meta.env.PUBLIC_CONTACT_PHONE ?? "+48 453 209 560",
  city: import.meta.env.PUBLIC_CONTACT_CITY ?? import.meta.env.PUBLIC_CITY ?? "Legionowo",
  address:
    import.meta.env.PUBLIC_CONTACT_ADDRESS ??
    import.meta.env.PUBLIC_STREET_ADDRESS ??
    "Mikołaja Kopernika 9/lok. 5",
  postalCode: import.meta.env.PUBLIC_POSTAL_CODE ?? "05-120",
};

export const BUSINESS = {
  businessName: SITE_NAME,
  legalEntityName: import.meta.env.PUBLIC_LEGAL_ENTITY_NAME ?? "",
  streetAddress: CONTACT.address,
  postalCode: CONTACT.postalCode,
  city: CONTACT.city,
  email: CONTACT.email,
  phone: CONTACT.phone,
  openingHours: import.meta.env.PUBLIC_OPENING_HOURS ?? "8:00–21:00",
  geo: {
    latitude: import.meta.env.PUBLIC_GEO_LAT ?? "",
    longitude: import.meta.env.PUBLIC_GEO_LNG ?? "",
  },
  social: {
    facebook: import.meta.env.PUBLIC_FACEBOOK_URL ?? "",
    instagram: import.meta.env.PUBLIC_INSTAGRAM_URL ?? "",
    youtube: import.meta.env.PUBLIC_YOUTUBE_URL ?? "",
  },
};

export const BRAND_NAME = BUSINESS.businessName;
export const BRAND_TAGLINE = "Szkoła języków obcych i matematyki w Legionowie";

const addressParts = [
  CONTACT.address,
  [CONTACT.postalCode, CONTACT.city].filter(Boolean).join(" ").trim(),
].filter(Boolean);

export const FULL_ADDRESS = addressParts.join(", ");
export const ADDRESS_SHORT = CONTACT.city;
export const BUSINESS_ADDRESS = FULL_ADDRESS || CONTACT.city;

export const CONTACT_EMAIL = CONTACT.email;
export const CONTACT_PHONE = CONTACT.phone;

export const ANALYTICS_ID = import.meta.env.PUBLIC_GA_ID ?? "G-FS7CKXXZ6J";
export const ANALYTICS_ENABLED = Boolean(ANALYTICS_ID);
export const EMAIL_PROVIDER_NAME =
  import.meta.env.PUBLIC_EMAIL_PROVIDER_NAME ?? "Dostawca poczty e-mail";

const parseNumericEnv = (value: string | undefined) => {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const BOOKING_URL = import.meta.env.PUBLIC_BOOKING_URL ?? "";
export const NEXT_INTAKE_MONTH = import.meta.env.PUBLIC_NEXT_INTAKE_MONTH ?? "";
export const SLOTS_LEFT = parseNumericEnv(import.meta.env.PUBLIC_SLOTS_LEFT);
export const OTHER_LANG_PRICE_1ON1_FROM = parseNumericEnv(
  import.meta.env.PUBLIC_OTHER_LANG_PRICE_1ON1_FROM
);
export const OTHER_LANG_PRICE_GROUP_FROM = parseNumericEnv(
  import.meta.env.PUBLIC_OTHER_LANG_PRICE_GROUP_FROM
);
export const TEST_RESULT_WEBHOOK_URL = import.meta.env.PUBLIC_TEST_RESULT_WEBHOOK_URL ?? "";

export const GOOGLE_REVIEWS = {
  url: import.meta.env.PUBLIC_GOOGLE_REVIEWS_URL ?? "",
  businessName: import.meta.env.PUBLIC_GOOGLE_BUSINESS_NAME ?? BRAND_NAME,
  rating: parseNumericEnv(import.meta.env.PUBLIC_GOOGLE_REVIEWS_RATING),
  count: parseNumericEnv(import.meta.env.PUBLIC_GOOGLE_REVIEWS_COUNT),
};

export const YEARS_IN_OPERATION = import.meta.env.PUBLIC_YEARS_IN_OPERATION ?? "";

export const OG_IMAGE = "/images/og-lingua.png";

// Alternate domains for redirects
export const ALTERNATE_DOMAINS = {
  angielskilegionowo: "angielskilegionowo.pl",
  angielskizdalnie: "angielskizdalnie.pl",
};

export const DEFAULT_TITLE = `${BRAND_NAME} — języki obce i matematyka w Legionowie`;
export const DEFAULT_DESCRIPTION =
  "Szkoła języków obcych i matematyki w Legionowie. Zajęcia stacjonarne i online dla wszystkich poziomów. Umów bezpłatną diagnozę i plan nauki.";

export const TEACHER_SPECIALTIES: Record<string, string[]> = {};

const isExternalUrl = (value: string) => value.startsWith("http://") || value.startsWith("https://");
const resolvedPrimaryHref = BOOKING_URL || "/kontakt#formularz";
const primaryIsExternal = Boolean(BOOKING_URL && isExternalUrl(BOOKING_URL));

export const PRIMARY_CTA = {
  label: "Umów bezpłatną diagnozę i plan nauki (15 min)",
  shortLabel: "Umów diagnozę",
  href: resolvedPrimaryHref,
  target: primaryIsExternal ? "_blank" : undefined,
  rel: primaryIsExternal ? "noopener noreferrer" : undefined,
};

export const SECONDARY_CTA = {
  label: "Sprawdź poziom angielskiego (5–10 min)",
  href: "/test",
};

export const SECONDARY_CTA_LANGUAGE = {
  label: "Umów krótką rozmowę poziomującą",
  href: resolvedPrimaryHref,
};

export const SECONDARY_CTA_MATH = {
  label: "Umów diagnozę z matematyki (10 min)",
  href: resolvedPrimaryHref,
};

export type CtaVariant = "english" | "language" | "math" | "general";

export const getSecondaryCta = (variant: CtaVariant) => {
  if (variant === "english") return SECONDARY_CTA;
  if (variant === "language") return SECONDARY_CTA_LANGUAGE;
  if (variant === "math") return SECONDARY_CTA_MATH;
  return null;
};

export const CTA_PRIMARY_LABEL = PRIMARY_CTA.label;
export const CTA_PRIMARY_LABEL_SHORT = PRIMARY_CTA.shortLabel;
export const CTA_PRIMARY_HREF = PRIMARY_CTA.href;
export const CTA_PRIMARY_TARGET = PRIMARY_CTA.target;
export const CTA_PRIMARY_REL = PRIMARY_CTA.rel;
export const CTA_SECONDARY_LABEL = SECONDARY_CTA.label;
export const CTA_SECONDARY_HREF = SECONDARY_CTA.href;

export const isTodo = (value: string | undefined | null) => !value;

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

export const DATA_PROCESSORS = [
  {
    name: "Cloudflare, Inc.",
    purpose: "hosting i CDN",
    location: "USA",
  },
  ...(EMAIL_PROVIDER_NAME
    ? [
        {
          name: EMAIL_PROVIDER_NAME,
          purpose: "obsługa poczty e-mail",
          location: "EU/USA",
        },
      ]
    : []),
  ...(ANALYTICS_ENABLED
    ? [
        {
          name: "Google LLC (Google Analytics)",
          purpose: "statystyka ruchu i analityka serwisu",
          location: "USA",
        },
      ]
    : []),
];

export const getEnrollmentMessage = () => {
  if (NEXT_INTAKE_MONTH && typeof SLOTS_LEFT === "number") {
    return `Zapisy na ${NEXT_INTAKE_MONTH} — zostało ${SLOTS_LEFT} miejsc.`;
  }
  if (NEXT_INTAKE_MONTH) {
    return `Zapisy na ${NEXT_INTAKE_MONTH} — liczba miejsc w grupach jest ograniczona.`;
  }
  return "Zapisy trwają — liczba miejsc w grupach jest ograniczona.";
};
