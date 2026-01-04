/**
 * Analytics Configuration
 * Google Analytics and tracking settings
 */

export const ANALYTICS_ID = import.meta.env.PUBLIC_GA_ID ?? "G-FS7CKXXZ6J";
export const ANALYTICS_ENABLED = Boolean(ANALYTICS_ID);

export const EMAIL_PROVIDER_NAME =
  import.meta.env.PUBLIC_EMAIL_PROVIDER_NAME ?? "Dostawca poczty e-mail";

export const BOOKING_URL = import.meta.env.PUBLIC_BOOKING_URL ?? "";
export const NEXT_INTAKE_MONTH = import.meta.env.PUBLIC_NEXT_INTAKE_MONTH ?? "";

const parseNumericEnv = (value: string | undefined) => {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

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
  businessName: import.meta.env.PUBLIC_GOOGLE_BUSINESS_NAME ?? "Lingua Legionowo",
  rating: parseNumericEnv(import.meta.env.PUBLIC_GOOGLE_REVIEWS_RATING),
  count: parseNumericEnv(import.meta.env.PUBLIC_GOOGLE_REVIEWS_COUNT),
};

export const YEARS_IN_OPERATION = import.meta.env.PUBLIC_YEARS_IN_OPERATION ?? "10";

// Storage keys for consent management
export const STORAGE_KEYS = {
  analyticsConsent: "lingua-analytics-consent",
  testProgress: "lingua-test-progress",
  formDraft: "lingua-form-draft",
} as const;

// Event tracking categories
export const TRACK_CATEGORIES = {
  conversion: "conversion",
  engagement: "engagement",
  navigation: "navigation",
} as const;

export const getEnrollmentMessage = () => {
  if (NEXT_INTAKE_MONTH && typeof SLOTS_LEFT === "number") {
    return `Zapisy na ${NEXT_INTAKE_MONTH} — zostało ${SLOTS_LEFT} miejsc.`;
  }
  if (NEXT_INTAKE_MONTH) {
    return `Zapisy na ${NEXT_INTAKE_MONTH} — liczba miejsc w grupach jest ograniczona.`;
  }
  return "Zapisy trwają — liczba miejsc w grupach jest ograniczona.";
};
