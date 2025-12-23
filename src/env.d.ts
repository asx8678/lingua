/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
  interface Locals {
    runtime?: CloudflareRuntime;
    cspNonce?: string;
  }
}

/**
 * Type definitions for environment variables
 */
interface ImportMetaEnv {
  // Contact information
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_CONTACT_PHONE?: string;
  readonly PUBLIC_CONTACT_CITY?: string;
  readonly PUBLIC_CONTACT_ADDRESS?: string;
  readonly PUBLIC_POSTAL_CODE?: string;

  // Legacy aliases for contact info
  readonly PUBLIC_CITY?: string;
  readonly PUBLIC_STREET_ADDRESS?: string;

  // Business information
  readonly PUBLIC_LEGAL_ENTITY_NAME?: string;
  readonly PUBLIC_OPENING_HOURS?: string;

  // Geolocation
  readonly PUBLIC_GEO_LAT?: string;
  readonly PUBLIC_GEO_LNG?: string;

  // Social media
  readonly PUBLIC_FACEBOOK_URL?: string;
  readonly PUBLIC_INSTAGRAM_URL?: string;
  readonly PUBLIC_YOUTUBE_URL?: string;

  // Analytics
  readonly PUBLIC_GA_ID?: string;

  // Email provider
  readonly PUBLIC_EMAIL_PROVIDER_NAME?: string;
  readonly SPARKPOST_API_KEY?: string;
  readonly SPARKPOST_FROM_EMAIL?: string;

  // Build info
  readonly BUILD_TIME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Cloudflare Workers runtime types
 */
interface CloudflareEnv {
  RATE_LIMIT_KV?: KVNamespace;
  SPARKPOST_API_KEY?: string;
  SPARKPOST_FROM_EMAIL?: string;
  SESSION?: KVNamespace;
}

interface CloudflareRuntime {
  env?: CloudflareEnv;
}

/**
 * API response types
 */
interface ApiSuccessResponse {
  success: true;
  messageId?: string;
}

interface ApiErrorResponse {
  success: false;
  error: string;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

/**
 * Email send result type
 */
interface EmailSendSuccess {
  success: true;
  messageId: string;
}

interface EmailSendError {
  success: false;
  error: string;
}

type EmailSendResult = EmailSendSuccess | EmailSendError;
