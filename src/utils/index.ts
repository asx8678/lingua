/**
 * Utility functions
 * Shared helpers used throughout the application
 */

/**
 * Check if a value is empty/undefined/null
 * @deprecated Use optional chaining and nullish coalescing instead
 */
export const isEmpty = (value: string | undefined | null): boolean => !value;

/**
 * Format a date for display in Polish locale
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    ...options,
  });
}

/**
 * Format a date as relative time (e.g., "2 miesiące temu")
 */
export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "dzisiaj";
  if (diffDays === 1) return "wczoraj";
  if (diffDays < 7) return `${diffDays} dni temu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tyg. temu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} mies. temu`;
  return `${Math.floor(diffDays / 365)} lat temu`;
}

/**
 * Format a list with Polish conjunctions
 */
export function formatList(items: string[], type: "conjunction" | "disjunction" = "conjunction"): string {
  return new Intl.ListFormat("pl", { style: "long", type }).format(items);
}

/**
 * Generate a slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text: string, maxLength: number, suffix = "..."): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length).trim() + suffix;
}

/**
 * Validate meta description length (100-160 chars recommended)
 */
export function isValidMetaDescriptionLength(description: string): boolean {
  const len = description.length;
  return len >= 100 && len <= 160;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
