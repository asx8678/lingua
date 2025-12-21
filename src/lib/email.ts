// Email service using Resend API
// Get your API key from https://resend.com

export type EmailPayload = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type EmailResult = {
  success: boolean;
  messageId?: string;
  error?: string;
};

/**
 * Send email using Resend API
 * Requires RESEND_API_KEY environment variable
 */
export async function sendEmail(
  payload: EmailPayload,
  apiKey: string
): Promise<EmailResult> {
  if (!apiKey) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: payload.from,
        to: [payload.to],
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
        reply_to: payload.replyTo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        (errorData as { message?: string }).message ||
        `HTTP ${response.status}: ${response.statusText}`;
      return { success: false, error: errorMessage };
    }

    const data = (await response.json()) as { id?: string };
    return { success: true, messageId: data.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}

/**
 * Format contact form data into email content
 */
export function formatContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  brandName: string;
}): { subject: string; text: string; html: string } {
  const subject = `Zapytanie z formularza — ${data.brandName}`;

  const text = [
    `Imię i nazwisko: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.phone || "-"}`,
    "",
    "Wiadomość:",
    data.message,
  ].join("\n");

  const html = `
    <h2>Nowe zapytanie z formularza kontaktowego</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Imię i nazwisko:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">E-mail:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone ? `<a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>` : "-"}</td>
      </tr>
    </table>
    <h3 style="margin-top: 24px;">Wiadomość:</h3>
    <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
  `.trim();

  return { subject, text, html };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
