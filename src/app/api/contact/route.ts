import { NextResponse } from "next/server";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  timestamp?: string;
};

/**
 * Receives the Contact page form submission, validates it, and forwards it
 * to GOOGLE_SHEETS_WEBHOOK_URL (a Make.com / Zapier / Apps Script webhook
 * that appends a row to a sheet). The webhook URL is a server-only env var
 * (never NEXT_PUBLIC_*) so it's never exposed to the client.
 *
 * If the env var isn't set yet, the submission is accepted (so the form
 * still works end-to-end for visitors) but only logged server-side — see
 * .env.example for where to paste the real URL once it exists.
 */
export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const payload = {
    firstName,
    lastName,
    email,
    message,
    timestamp: body.timestamp ?? new Date().toISOString(),
  };

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[contact] GOOGLE_SHEETS_WEBHOOK_URL is not set; submission not forwarded:", payload);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] Failed to forward submission to webhook:", err);
    return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
