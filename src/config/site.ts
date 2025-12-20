export const SITE_URL = "https://lingualegionowo.pl";

export const BRAND_NAME = "Lingua Legionowo";
export const BRAND_TAGLINE = "Szkoła języka angielskiego w Legionowie";

export const CONTACT_EMAIL = "lingualegionowo@gmail.com";
export const CONTACT_PHONE = "+48 453 209 560";
export const BUSINESS_ADDRESS = "Mikołaja Kopernika 9/lok. 5, 05-120 Legionowo";

export const OG_IMAGE = "/images/og-lingua.jpg";

// Alternate domains for redirects
export const ALTERNATE_DOMAINS = {
  angielskilegionowo: "angielskilegionowo.pl",
  angielskizdalnie: "angielskizdalnie.pl",
};

export const DEFAULT_TITLE = `${BRAND_NAME} — kursy angielskiego stacjonarnie i online`;
export const DEFAULT_DESCRIPTION =
  "Szkoła języka angielskiego w Legionowie. Lekcje stacjonarne z native speakerem, kursy grupowe i indywidualne. Oferujemy także zajęcia online. Umów lekcję próbną.";

export const CTA_PRIMARY_LABEL = "Lekcja próbna";
export const CTA_PRIMARY_HREF = "/kontakt";
export const CTA_SECONDARY_LABEL = "Zapisz się";
export const CTA_SECONDARY_HREF = "/kontakt";

export const isTodo = (value: string | undefined | null) =>
  !value || value.includes("[TODO]");
