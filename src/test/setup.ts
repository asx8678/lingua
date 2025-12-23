/**
 * Vitest setup file
 * Global test configuration and utilities
 */

import { vi } from "vitest";

// Mock environment variables for tests
vi.stubEnv("PUBLIC_CONTACT_EMAIL", "test@example.com");
vi.stubEnv("PUBLIC_CONTACT_PHONE", "+48 123 456 789");
vi.stubEnv("PUBLIC_GA_ID", "G-TEST123");
