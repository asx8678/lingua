/**
 * CTA (Call-to-Action) Configuration
 * Centralized CTA labels and links
 */

import { BOOKING_URL } from "./analytics";

const isExternalUrl = (value: string) => value.startsWith("http://") || value.startsWith("https://");
const resolvedPrimaryHref = BOOKING_URL || "/kontakt#formularz";
const primaryIsExternal = Boolean(BOOKING_URL && isExternalUrl(BOOKING_URL));

export const PRIMARY_CTA = {
  label: "Napisz do nas",
  shortLabel: "Napisz do nas",
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

// Convenience exports for backwards compatibility
export const CTA_PRIMARY_LABEL = PRIMARY_CTA.label;
export const CTA_PRIMARY_LABEL_SHORT = PRIMARY_CTA.shortLabel;
export const CTA_PRIMARY_HREF = PRIMARY_CTA.href;
export const CTA_PRIMARY_TARGET = PRIMARY_CTA.target;
export const CTA_PRIMARY_REL = PRIMARY_CTA.rel;
export const CTA_SECONDARY_LABEL = SECONDARY_CTA.label;
export const CTA_SECONDARY_HREF = SECONDARY_CTA.href;
