/**
 * Validation utility tests
 */

import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidMessage,
  isValidMode,
  VALIDATION_LIMITS,
  EMAIL_REGEX,
  PHONE_REGEX,
} from "../lib/validation";

describe("Email validation", () => {
  it("accepts valid email addresses", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name@domain.pl")).toBe(true);
    expect(isValidEmail("user+tag@example.org")).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("notanemail")).toBe(false);
    expect(isValidEmail("missing@domain")).toBe(false);
    expect(isValidEmail("@nodomain.com")).toBe(false);
    expect(isValidEmail("spaces in@email.com")).toBe(false);
  });

  it("rejects emails exceeding max length", () => {
    const longEmail = "a".repeat(250) + "@test.com";
    expect(isValidEmail(longEmail)).toBe(false);
  });
});

describe("Phone validation", () => {
  it("accepts valid phone numbers", () => {
    expect(isValidPhone("+48 123 456 789")).toBe(true);
    expect(isValidPhone("123456789")).toBe(true);
    expect(isValidPhone("+48-123-456-789")).toBe(true);
    expect(isValidPhone("(48) 123 456 789")).toBe(true);
  });

  it("allows empty phone (optional field)", () => {
    expect(isValidPhone("")).toBe(true);
  });

  it("rejects invalid phone numbers", () => {
    expect(isValidPhone("abc")).toBe(false);
    expect(isValidPhone("123")).toBe(false); // Too short
    expect(isValidPhone("a".repeat(25))).toBe(false); // Too long
  });
});

describe("Name validation", () => {
  it("accepts valid names", () => {
    expect(isValidName("Jan")).toBe(true);
    expect(isValidName("Anna Kowalska")).toBe(true);
    expect(isValidName("Jan Paweł II")).toBe(true);
  });

  it("rejects names that are too short", () => {
    expect(isValidName("")).toBe(false);
    expect(isValidName("A")).toBe(false);
    expect(isValidName(" ")).toBe(false);
  });

  it("rejects names that are too long", () => {
    const longName = "A".repeat(VALIDATION_LIMITS.name.max + 1);
    expect(isValidName(longName)).toBe(false);
  });
});

describe("Message validation", () => {
  it("accepts valid messages", () => {
    expect(isValidMessage("Hello, I would like to sign up.")).toBe(true);
    expect(isValidMessage("Short")).toBe(true);
  });

  it("rejects messages that are too short", () => {
    expect(isValidMessage("")).toBe(false);
    expect(isValidMessage("Hi")).toBe(false);
  });

  it("rejects messages that are too long", () => {
    const longMessage = "A".repeat(VALIDATION_LIMITS.message.max + 1);
    expect(isValidMessage(longMessage)).toBe(false);
  });

  it("uses default minimum length of 5", () => {
    expect(isValidMessage("Hello")).toBe(true);
    expect(isValidMessage("Hi")).toBe(false);
  });
});

describe("Mode validation", () => {
  it("accepts valid signup modes", () => {
    expect(isValidMode("stacjonarnie")).toBe(true);
    expect(isValidMode("online")).toBe(true);
    expect(isValidMode("inne")).toBe(true);
  });

  it("rejects invalid modes", () => {
    expect(isValidMode("")).toBe(false);
    expect(isValidMode("invalid")).toBe(false);
    expect(isValidMode("ONLINE")).toBe(false); // Case sensitive
  });
});

describe("Regex patterns", () => {
  it("EMAIL_REGEX matches expected patterns", () => {
    expect(EMAIL_REGEX.test("valid@email.com")).toBe(true);
    expect(EMAIL_REGEX.test("invalid")).toBe(false);
  });

  it("PHONE_REGEX matches expected patterns", () => {
    expect(PHONE_REGEX.test("+48 123 456 789")).toBe(true);
    expect(PHONE_REGEX.test("abc")).toBe(false);
  });
});
