import type { APIRoute } from "astro";
import { BRAND_NAME, CONTACT_EMAIL } from "../../config/site";
import { sendContactEmail } from "../../lib/mailchannels";
import { checkRateLimit, getClientIp } from "../../lib/rate-limit";
import { validateContactForm, RATE_LIMIT_CONFIG } from "../../lib/validation";
import { HONEYPOT_FIELD } from "../../lib/constants";

export const POST: APIRoute = async ({ request, locals }) => {
  // Check if email is configured
  if (!CONTACT_EMAIL) {
    console.error("CONTACT_EMAIL not configured");
    return new Response(
      JSON.stringify({
        success: false,
        error: "Formularz kontaktowy jest tymczasowo niedostępny.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const ip = getClientIp(request);

  // Rate limiting with KV (falls back to in-memory in dev)
  const runtime = locals.runtime as CloudflareRuntime | undefined;
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
  const honeypot = String(formData.get(HONEYPOT_FIELD) ?? "").trim();
  if (honeypot) {
    // Silently accept but don't process (spam protection)
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validate form data
  const validation = validateContactForm(formData);
  if (!validation.valid) {
    return new Response(JSON.stringify({ success: false, error: validation.error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, phone, message } = validation.data;

  // Get DKIM config from environment (optional but recommended)
  const dkimDomain = runtime?.env?.DKIM_DOMAIN ?? import.meta.env.DKIM_DOMAIN;
  const dkimSelector = runtime?.env?.DKIM_SELECTOR ?? import.meta.env.DKIM_SELECTOR ?? "mailchannels";
  const dkimPrivateKey = runtime?.env?.DKIM_PRIVATE_KEY ?? import.meta.env.DKIM_PRIVATE_KEY;

  // Send email via MailChannels
  const fromEmail = import.meta.env.MAIL_FROM ?? "noreply@lingualegionowo.pl";

  const emailResult = await sendContactEmail(
    { name, email, phone, message },
    {
      toEmail: CONTACT_EMAIL,
      fromEmail,
      brandName: BRAND_NAME,
      dkimDomain,
      dkimSelector,
      dkimPrivateKey,
    }
  );

  if (!emailResult.success) {
    console.error("Email send failed:", emailResult.error);
    return new Response(
      JSON.stringify({
        success: false,
        error:
          "Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się telefonicznie.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
