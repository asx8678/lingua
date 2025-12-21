export const SITE_URL = "https://lingualegionowo.pl";
export const SITE_NAME = "Lingua Legionowo";

export const CONTACT = {
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "",
  phone: import.meta.env.PUBLIC_CONTACT_PHONE ?? "",
  city: import.meta.env.PUBLIC_CONTACT_CITY ?? import.meta.env.PUBLIC_CITY ?? "Legionowo",
  address: import.meta.env.PUBLIC_CONTACT_ADDRESS ?? import.meta.env.PUBLIC_STREET_ADDRESS ?? "",
  postalCode: import.meta.env.PUBLIC_POSTAL_CODE ?? "",
};

export const BUSINESS = {
  businessName: SITE_NAME,
  legalEntityName: import.meta.env.PUBLIC_LEGAL_ENTITY_NAME ?? "",
  streetAddress: CONTACT.address,
  postalCode: CONTACT.postalCode,
  city: CONTACT.city,
  email: CONTACT.email,
  phone: CONTACT.phone,
  openingHours: import.meta.env.PUBLIC_OPENING_HOURS ?? "",
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
export const EMAIL_PROVIDER_NAME = import.meta.env.PUBLIC_EMAIL_PROVIDER_NAME ?? "Dostawca poczty e-mail";

export const OG_IMAGE = "/images/og-lingua.jpg";

// Alternate domains for redirects
export const ALTERNATE_DOMAINS = {
  angielskilegionowo: "angielskilegionowo.pl",
  angielskizdalnie: "angielskizdalnie.pl",
};

export const DEFAULT_TITLE = `${BRAND_NAME} — języki obce i matematyka w Legionowie`;
export const DEFAULT_DESCRIPTION =
  "Szkoła języków obcych i matematyki w Legionowie. Zajęcia stacjonarne i online dla wszystkich poziomów. Umów konsultację i diagnozę poziomu.";

export const PRIMARY_CTA = {
  label: "Umów konsultację",
  href: "/kontakt",
};

export const SECONDARY_CTA = {
  label: "Zapisz się",
  href: "/zapisy-2025-2026",
};

export const CTA_PRIMARY_LABEL = PRIMARY_CTA.label;
export const CTA_PRIMARY_HREF = PRIMARY_CTA.href;
export const CTA_SECONDARY_LABEL = SECONDARY_CTA.label;
export const CTA_SECONDARY_HREF = SECONDARY_CTA.href;

export const isTodo = (value: string | undefined | null) => !value;

export const DATA_PROCESSORS = [
  {
    name: "Cloudflare, Inc.",
    purpose: "hosting i CDN",
    location: "USA",
  },
  ...(EMAIL_PROVIDER_NAME
    ? [{
        name: EMAIL_PROVIDER_NAME,
        purpose: "obsługa poczty e-mail",
        location: "EU/USA",
      }]
    : []),
  ...(ANALYTICS_ENABLED
    ? [{
        name: "Google LLC (Google Analytics)",
        purpose: "statystyka ruchu i analityka serwisu",
        location: "USA",
      }]
    : []),
];
