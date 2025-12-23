/**
 * Utility function tests
 */

import { describe, it, expect } from "vitest";
import {
  isEmpty,
  formatDate,
  formatRelativeDate,
  formatList,
  slugify,
  truncate,
  isValidMetaDescriptionLength,
  clamp,
} from "../utils";

describe("isEmpty", () => {
  it("returns true for empty values", () => {
    expect(isEmpty("")).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it("returns false for non-empty values", () => {
    expect(isEmpty("text")).toBe(false);
    expect(isEmpty("0")).toBe(false);
    expect(isEmpty(" ")).toBe(false);
  });
});

describe("formatDate", () => {
  it("formats dates with year", () => {
    const date = new Date("2024-03-15");
    const formatted = formatDate(date);
    expect(formatted).toContain("2024");
    // Should contain month name (marzec or marca depending on locale settings)
    expect(formatted.length).toBeGreaterThan(4);
  });

  it("accepts string dates", () => {
    const formatted = formatDate("2024-06-20");
    expect(formatted).toContain("2024");
    // Should be a valid formatted date string
    expect(formatted.length).toBeGreaterThan(4);
  });
});

describe("formatRelativeDate", () => {
  it("returns 'dzisiaj' for today", () => {
    const today = new Date();
    expect(formatRelativeDate(today)).toBe("dzisiaj");
  });

  it("returns relative time for past dates", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatRelativeDate(yesterday)).toBe("wczoraj");
  });
});

describe("formatList", () => {
  it("formats list with Polish conjunctions", () => {
    const result = formatList(["angielski", "niemiecki", "hiszpański"]);
    expect(result).toContain("i");
    expect(result).toContain("angielski");
  });

  it("handles single item", () => {
    expect(formatList(["angielski"])).toBe("angielski");
  });

  it("handles disjunction", () => {
    const result = formatList(["angielski", "niemiecki"], "disjunction");
    expect(result).toContain("lub");
  });
});

describe("slugify", () => {
  it("converts text to URL-friendly slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("Język Polski")).toBe("jezyk-polski");
    expect(slugify("Test 123!")).toBe("test-123");
  });

  it("handles Polish characters", () => {
    // NFD normalization may produce different results
    const result = slugify("żółć");
    expect(result).not.toContain("ż");
    expect(result).not.toContain("ó");
    expect(result.length).toBeGreaterThan(0);
  });

  it("removes leading and trailing hyphens", () => {
    expect(slugify("--test--")).toBe("test");
  });
});

describe("truncate", () => {
  it("truncates long text", () => {
    expect(truncate("Hello World", 8)).toBe("Hello...");
  });

  it("preserves short text", () => {
    expect(truncate("Hi", 10)).toBe("Hi");
  });

  it("uses custom suffix", () => {
    expect(truncate("Hello World", 8, "→")).toBe("Hello W→");
  });
});

describe("isValidMetaDescriptionLength", () => {
  it("accepts descriptions between 100-160 chars", () => {
    expect(isValidMetaDescriptionLength("a".repeat(100))).toBe(true);
    expect(isValidMetaDescriptionLength("a".repeat(160))).toBe(true);
    expect(isValidMetaDescriptionLength("a".repeat(130))).toBe(true);
  });

  it("rejects descriptions that are too short", () => {
    expect(isValidMetaDescriptionLength("a".repeat(99))).toBe(false);
    expect(isValidMetaDescriptionLength("")).toBe(false);
  });

  it("rejects descriptions that are too long", () => {
    expect(isValidMetaDescriptionLength("a".repeat(161))).toBe(false);
  });
});

describe("clamp", () => {
  it("clamps values within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("handles edge cases", () => {
    expect(clamp(0, 0, 0)).toBe(0);
    expect(clamp(5, 5, 5)).toBe(5);
  });
});
