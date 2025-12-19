export const SITE_URL = "https://lingualegionowo.pl";

export const BRAND_NAME = "[TODO]";
export const BRAND_TAGLINE = "Angielski online bez dojazdów";

export const CONTACT_EMAIL = "[TODO]";
export const CONTACT_PHONE = "[TODO]";
export const BUSINESS_ADDRESS = "[TODO]";

export const OG_IMAGE = "[TODO]";

export const DEFAULT_TITLE = `${BRAND_NAME} — angielski online z lektorem`;
export const DEFAULT_DESCRIPTION =
  "Lekcje angielskiego online: 1:1 i mini-grupy, nacisk na mówienie, elastyczne godziny. Umów lekcję próbną.";

export const CTA_PRIMARY_LABEL = "Lekcja próbna";
export const CTA_PRIMARY_HREF = "/kontakt";
export const CTA_SECONDARY_LABEL = "Zapisz się";
export const CTA_SECONDARY_HREF = "/kontakt";

export const isTodo = (value: string | undefined | null) =>
  !value || value.includes("[TODO]");
