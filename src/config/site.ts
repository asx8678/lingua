export const SITE_URL = "https://lingualegionowo.pl";

export const BRAND_NAME = "Lingua Legionowo";
export const BRAND_TAGLINE = "Szkoła języków obcych i matematyki w Legionowie";

export const CONTACT_EMAIL = import.meta.env.PUBLIC_CONTACT_EMAIL ?? "";
export const CONTACT_PHONE = import.meta.env.PUBLIC_CONTACT_PHONE ?? "";
export const ADDRESS_SHORT = import.meta.env.PUBLIC_ADDRESS_SHORT ?? "Legionowo";
export const BUSINESS_ADDRESS = ADDRESS_SHORT;

export const OG_IMAGE = "/images/og-lingua.jpg";

// Alternate domains for redirects
export const ALTERNATE_DOMAINS = {
  angielskilegionowo: "angielskilegionowo.pl",
  angielskizdalnie: "angielskizdalnie.pl",
};

export const DEFAULT_TITLE = `${BRAND_NAME} — języki obce i matematyka w Legionowie`;
export const DEFAULT_DESCRIPTION =
  "Szkoła języków obcych i matematyki w Legionowie. Zajęcia stacjonarne i online dla wszystkich poziomów. Umów lekcję próbną.";

export const CTA_PRIMARY_LABEL = "Lekcja próbna";
export const CTA_PRIMARY_HREF = "/kontakt#formularz";
export const CTA_SECONDARY_LABEL = "Zapisz się";
export const CTA_SECONDARY_HREF = "/zapisy-2025-2026";

export const isTodo = (value: string | undefined | null) => !value;
