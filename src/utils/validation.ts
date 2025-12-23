/**
 * Validation utilities
 * Re-exports from lib/validation.ts for convenience
 * Can be used by both client and server
 */

export {
  EMAIL_REGEX,
  PHONE_REGEX,
  VALIDATION_LIMITS,
  VALID_SIGNUP_MODES,
  MODE_LABELS,
  ERROR_MESSAGES,
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidMessage,
  isValidMode,
  type SignupMode,
  type ValidationError,
  type ValidationResult,
  type ContactFormData,
  type SignupFormData,
} from "../lib/validation";
