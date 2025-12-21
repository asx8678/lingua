import type { APIRoute } from "astro";
import { BRAND_NAME, CONTACT_EMAIL } from "../../config/site";
import { sendEmail, formatContactEmail } from "../../lib/email";
import { checkRateLimit, getClientIp } from "../../lib/rate-limit";

// Validation constants
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 100;
const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 5000;
// Require at least 2 characters in TLD for better validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Rate limit config
const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 3,
};

type ValidationResult =
  | { valid: true; data: { name: string; email: string; phone: string; message: string } }
  | { valid: false; error: string };

function validateFormData(formData: FormData): ValidationResult {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // Name validation
  if (name.length < MIN_NAME_LENGTH) {
    return { valid: false, error: `Imię musi mieć co najmniej ${MIN_NAME_LENGTH} znaki.` };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { valid: false, error: `Imię nie może przekraczać ${MAX_NAME_LENGTH} znaków.` };
  }

  // Email validation
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: "Podaj poprawny adres e-mail." };
  }

  // Message validation
  if (message.length < MIN_MESSAGE_LENGTH) {
    return { valid: false, error: `Wiadomość musi mieć co najmniej ${MIN_MESSAGE_LENGTH} znaków.` };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Wiadomość nie może przekraczać ${MAX_MESSAGE_LENGTH} znaków.` };
  }

  return { valid: true, data: { name, email, phone, message } };
}

export const POST: APIRoute = async ({ request, locals }) => {
  // Check if email is configured
  if (!CONTACT_EMAIL) {
    console.error("CONTACT_EMAIL not configured");
    return new Response(
      JSON.stringify({ success: false, error: "Formularz kontaktowy jest tymczasowo niedostępny." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const ip = getClientIp(request);

  // Rate limiting with KV (falls back to in-memory in dev)
  const runtime = locals.runtime as { env?: { RATE_LIMIT_KV?: KVNamespace; RESEND_API_KEY?: string } } | undefined;
  const kv = runtime?.env?.RATE_LIMIT_KV;
  const rateLimitResult = await checkRateLimit(kv, ip, RATE_LIMIT_CONFIG);

  if (!rateLimitResult.allowed) {
    const retryAfter = Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000);
    return new Response(
      JSON.stringify({ success: false, error: "Zbyt wiele prób. Spróbuj ponownie później." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
        },
      }
    );
  }

  // Parse form data with error handling
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Nieprawidłowe dane formularza." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Check honeypot
  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot) {
    // Silently accept but don't process (spam protection)
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validate form data
  const validation = validateFormData(formData);
  if (!validation.valid) {
    return new Response(
      JSON.stringify({ success: false, error: validation.error }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { name, email, phone, message } = validation.data;

  // Get Resend API key
  const resendApiKey = runtime?.env?.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;

  // If no API key, fall back to mailto redirect (for backward compatibility)
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured, falling back to mailto redirect");
    const subject = `Zapytanie z formularza — ${BRAND_NAME}`;
    const bodyLines = [
      `Imię i nazwisko: ${name}`,
      `E-mail: ${email}`,
      `Telefon: ${phone || "-"}`,
      "",
      "Wiadomość:",
      message,
    ];
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    return new Response(null, {
      status: 303,
      headers: { Location: mailto },
    });
  }

  // Send email via Resend
  const emailContent = formatContactEmail({
    name,
    email,
    phone,
    message,
    brandName: BRAND_NAME,
  });

  const fromEmail = import.meta.env.RESEND_FROM_EMAIL ?? "kontakt@lingualegionowo.pl";
  const emailResult = await sendEmail(
    {
      to: CONTACT_EMAIL,
      from: `${BRAND_NAME} <${fromEmail}>`,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      replyTo: email,
    },
    resendApiKey
  );

  if (!emailResult.success) {
    console.error("Email send failed:", emailResult.error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się telefonicznie.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, messageId: emailResult.messageId }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
