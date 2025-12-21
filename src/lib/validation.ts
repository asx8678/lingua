/**
 * Shared validation utilities for form handling
 * Used by both client-side and server-side validation
 */

// Email validation - RFC 5322 compliant, requires proper domain structure
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Phone validation - allows international formats
export const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

// Validation constants
export const VALIDATION_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 }, // RFC 5321 limit
  phone: { min: 7, max: 20 },
  message: { min: 20, max: 5000 },
  level: { min: 2, max: 200 },
  availability: { max: 500 },
} as const;

// Valid signup modes
export const VALID_SIGNUP_MODES = ["stacjonarnie", "online", "inne"] as const;
export type SignupMode = (typeof VALID_SIGNUP_MODES)[number];

// Mode display labels
export const MODE_LABELS: Record<SignupMode, string> = {
  stacjonarnie: "Stacjonarnie (Legionowo)",
  online: "Online",
  inne: "Inne języki / matematyka",
};

// Rate limit configuration
export const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 3,
} as const;

// Validation error messages (Polish)
export const ERROR_MESSAGES = {
  nameRequired: `Imię musi mieć co najmniej ${VALIDATION_LIMITS.name.min} znaki.`,
  nameTooLong: `Imię nie może przekraczać ${VALIDATION_LIMITS.name.max} znaków.`,
  emailInvalid: "Podaj poprawny adres e-mail.",
  phoneInvalid: "Podaj poprawny numer telefonu.",
  messageRequired: `Wiadomość musi mieć co najmniej ${VALIDATION_LIMITS.message.min} znaków.`,
  messageTooLong: `Wiadomość nie może przekraczać ${VALIDATION_LIMITS.message.max} znaków.`,
  modeRequired: "Wybierz preferowany tryb zajęć.",
  levelRequired: "Podaj poziom lub cel nauki.",
  consentRequired: "Wymagana jest zgoda na kontakt.",
  formInvalid: "Nieprawidłowe dane formularza.",
  tooManyRequests: "Zbyt wiele prób. Spróbuj ponownie później.",
  tooManyRequestsWithTime: "Prosimy odczekać 60 sekund przed kolejną próbą wysłania formularza.",
  serviceUnavailable: "Formularz jest tymczasowo niedostępny.",
  sendFailed: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się telefonicznie.",
  connectionError: "Wystąpił błąd połączenia. Sprawdź internet i spróbuj ponownie.",
  genericError: "Wystąpił błąd. Spróbuj ponownie.",
} as const;

// Validation helper functions
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= VALIDATION_LIMITS.email.max;
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Phone is optional
  return PHONE_REGEX.test(phone);
}

export function isValidName(name: string): boolean {
  const len = name.trim().length;
  return len >= VALIDATION_LIMITS.name.min && len <= VALIDATION_LIMITS.name.max;
}

export function isValidMessage(
  message: string,
  minLength = VALIDATION_LIMITS.message.min
): boolean {
  const len = message.trim().length;
  return len >= minLength && len <= VALIDATION_LIMITS.message.max;
}

export function isValidMode(mode: string): mode is SignupMode {
  return VALID_SIGNUP_MODES.includes(mode as SignupMode);
}

// Generic validation result type
export type ValidationResult<T> = { valid: true; data: T } | { valid: false; error: string };

// Contact form data type
export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

// Signup form data type
export type SignupFormData = {
  name: string;
  email: string;
  phone: string;
  mode: SignupMode;
  level: string;
  availability: string;
  message: string;
};

// Validate contact form
export function validateContactForm(formData: FormData): ValidationResult<ContactFormData> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!isValidName(name)) {
    if (name.length < VALIDATION_LIMITS.name.min) {
      return { valid: false, error: ERROR_MESSAGES.nameRequired };
    }
    return { valid: false, error: ERROR_MESSAGES.nameTooLong };
  }

  if (!isValidEmail(email)) {
    return { valid: false, error: ERROR_MESSAGES.emailInvalid };
  }

  if (!isValidPhone(phone)) {
    return { valid: false, error: ERROR_MESSAGES.phoneInvalid };
  }

  if (message.length < VALIDATION_LIMITS.message.min) {
    return { valid: false, error: ERROR_MESSAGES.messageRequired };
  }

  if (message.length > VALIDATION_LIMITS.message.max) {
    return { valid: false, error: ERROR_MESSAGES.messageTooLong };
  }

  return { valid: true, data: { name, email, phone, message } };
}

// Validate signup form
export function validateSignupForm(formData: FormData): ValidationResult<SignupFormData> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const mode = String(formData.get("mode") ?? "").trim();
  const level = String(formData.get("level") ?? "").trim();
  const availability = String(formData.get("availability") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = formData.get("consent");

  if (!isValidName(name)) {
    if (name.length < VALIDATION_LIMITS.name.min) {
      return { valid: false, error: ERROR_MESSAGES.nameRequired };
    }
    return { valid: false, error: ERROR_MESSAGES.nameTooLong };
  }

  if (!isValidEmail(email)) {
    return { valid: false, error: ERROR_MESSAGES.emailInvalid };
  }

  if (!isValidPhone(phone)) {
    return { valid: false, error: ERROR_MESSAGES.phoneInvalid };
  }

  if (!isValidMode(mode)) {
    return { valid: false, error: ERROR_MESSAGES.modeRequired };
  }

  if (level.length < VALIDATION_LIMITS.level.min) {
    return { valid: false, error: ERROR_MESSAGES.levelRequired };
  }

  if (message.length > VALIDATION_LIMITS.message.max) {
    return { valid: false, error: ERROR_MESSAGES.messageTooLong };
  }

  if (!consent) {
    return { valid: false, error: ERROR_MESSAGES.consentRequired };
  }

  return { valid: true, data: { name, email, phone, mode, level, availability, message } };
}
