import type { APIRoute } from "astro";
import { BRAND_NAME, CONTACT_EMAIL } from "../../config/site";
import { sendSignupEmailSparkPost } from "../../lib/sparkpost";
import { checkRateLimit, getClientIp } from "../../lib/rate-limit";
import { validateSignupForm, RATE_LIMIT_CONFIG } from "../../lib/validation";
import { HONEYPOT_FIELD } from "../../lib/constants";

export const POST: APIRoute = async ({ request, locals }) => {
  // Check if email is configured
  if (!CONTACT_EMAIL) {
    console.error("CONTACT_EMAIL not configured");
    return new Response(
      JSON.stringify({ success: false, error: "Formularz jest tymczasowo niedostępny." }),
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
      JSON.stringify({ success: false, error: "Zbyt wiele prób. Spróbuj ponownie za 60 sekund." }),
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
  const validation = validateSignupForm(formData);
  if (!validation.valid) {
    return new Response(
      JSON.stringify({
        success: false,
        error: validation.error,
        fieldErrors: validation.fieldErrors,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const data = validation.data;

  // Get SparkPost credentials
  const sparkpostApiKey = runtime?.env?.SPARKPOST_API_KEY ?? import.meta.env.SPARKPOST_API_KEY;

  if (!sparkpostApiKey) {
    console.error("SparkPost API key not configured");
    return new Response(
      JSON.stringify({ success: false, error: "Formularz jest tymczasowo niedostępny." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // Send email via SparkPost
  const fromEmail =
    runtime?.env?.SPARKPOST_FROM_EMAIL ?? import.meta.env.SPARKPOST_FROM_EMAIL ?? CONTACT_EMAIL;

  const emailResult = await sendSignupEmailSparkPost(data, {
    toEmail: CONTACT_EMAIL,
    fromEmail,
    brandName: BRAND_NAME,
    apiKey: sparkpostApiKey,
  });

  if (!emailResult.success) {
    console.error("Email send failed:", emailResult.error);
    return new Response(
      JSON.stringify({
        success: false,
        error:
          "Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub skontaktuj się telefonicznie.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ success: true, messageId: emailResult.messageId }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
