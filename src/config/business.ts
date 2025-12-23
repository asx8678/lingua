/**
 * Business Configuration
 * Contact information, addresses, and business details
 */

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
    latitude: import.meta.env.PUBLIC_GEO_LAT ?? null,
    longitude: import.meta.env.PUBLIC_GEO_LNG ?? null,
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

// Data processors for privacy policy
export const DATA_PROCESSORS = [
  {
    name: "Cloudflare, Inc.",
    purpose: "hosting i CDN",
    location: "USA",
  },
];
