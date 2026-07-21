import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requestLog = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

type Inquiry = {
  type?: "contact" | "growth-audit";
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  website?: string;
  industry?: string;
  channels?: string[];
  services?: string[];
  preferredContact?: string;
  consent?: boolean;
  _gotcha?: string;
};

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let data: Inquiry;
  try {
    data = (await request.json()) as Inquiry;
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (data._gotcha) return NextResponse.json({ ok: true });

  const name = clean(data.name, 100);
  const email = clean(data.email, 160).toLowerCase();
  const company = clean(data.company, 140);
  const message = clean(data.message, 4000);
  const type = data.type === "growth-audit" ? "growth-audit" : "contact";

  if (!name || !emailRe.test(email)) {
    return NextResponse.json(
      { error: "Please provide your name and a valid work email." },
      { status: 400 },
    );
  }
  if (type === "contact" && message.length < 10) {
    return NextResponse.json(
      { error: "Please tell us a little more about what you need." },
      { status: 400 },
    );
  }
  if (!data.consent) {
    return NextResponse.json(
      { error: "Please agree to be contacted before submitting." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello@vistrow.com";
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      {
        error:
          "Online form delivery is being configured. Please email hello@vistrow.com in the meantime.",
      },
      { status: 503 },
    );
  }

  const details = [
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Phone", clean(data.phone, 60)],
    ["Website", clean(data.website, 200)],
    ["Service", clean(data.service, 160)],
    ["Industry", clean(data.industry, 120)],
    ["Budget", clean(data.budget, 120)],
    ["Channels", cleanList(data.channels)],
    ["Services of interest", cleanList(data.services)],
    ["Preferred contact", clean(data.preferredContact, 80)],
    [type === "growth-audit" ? "Main challenge" : "Message", message],
  ].filter(([, value]) => value);

  const subject =
    type === "growth-audit"
      ? `Growth Audit request - ${company || name}`
      : `Website enquiry - ${company || name}`;
  const text = details.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.6">
      <h1 style="font-size:22px;margin:0 0 20px">${escapeHtml(subject)}</h1>
      ${details
        .map(
          ([label, value]) =>
            `<p style="margin:0 0 14px"><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
        )
        .join("")}
    </div>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
    });

    if (!response.ok) {
      console.error("Resend delivery failed", response.status, await response.text());
      return NextResponse.json(
        { error: "We couldn't send your message right now. Please email hello@vistrow.com." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Inquiry delivery error", error);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please email hello@vistrow.com." },
      { status: 502 },
    );
  }

  sendConfirmationEmail({ apiKey, from, replyTo: to, type, name, email, company }).catch((error) => {
    console.error("Confirmation email failed", error);
  });

  return NextResponse.json({ ok: true });
}

async function sendConfirmationEmail({
  apiKey,
  from,
  replyTo,
  type,
  name,
  email,
  company,
}: {
  apiKey: string;
  from: string;
  replyTo: string;
  type: "contact" | "growth-audit";
  name: string;
  email: string;
  company: string;
}) {
  const firstName = name.trim().split(/\s+/)[0] || name;
  const { subject, html, text } = renderConfirmationEmail({ type, firstName, company });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [email], reply_to: replyTo, subject, text, html }),
  });

  if (!response.ok) {
    console.error("Confirmation delivery failed", response.status, await response.text());
  }
}

function renderConfirmationEmail({
  type,
  firstName,
  company,
}: {
  type: "contact" | "growth-audit";
  firstName: string;
  company: string;
}) {
  const isAudit = type === "growth-audit";
  const subject = isAudit
    ? "Your Growth Audit request is confirmed"
    : "We've received your message";

  const introPlain = isAudit
    ? `Thanks ${firstName} — your Growth Audit request${company ? ` for ${company}` : ""} is in. We'll dig into your funnel, spend, and tech stack to find exactly where opportunities are leaking.`
    : `Thanks ${firstName} — we've got your message and someone from the team is already on it.`;
  const intro = escapeHtml(introPlain);

  const steps = isAudit
    ? [
        ["Funnel & spend review", "We map where your budget goes and where it leaks."],
        ["System gap analysis", "We find the disconnects between marketing, CRM, and follow-up."],
        ["Prioritised action plan", "You get the highest-impact fixes, in order."],
      ]
    : [
        ["We review the context", "Your enquiry is routed to the person closest to the problem you described."],
        ["You'll hear from us", "A reply within one business day, by email or your preferred channel."],
        ["We shape a plan", "Practical next steps for your specific goal — no generic pitch."],
      ];

  const stepsHtml = steps
    .map(
      ([title, body], i) => `
        <tr>
          <td style="padding:0 0 ${i === steps.length - 1 ? "0" : "18"}px;vertical-align:top;width:32px;">
            <div style="width:24px;height:24px;border-radius:999px;background:#C6FF00;color:#0D0D0D;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;line-height:24px;text-align:center;">${i + 1}</div>
          </td>
          <td style="padding:0 0 ${i === steps.length - 1 ? "0" : "18"}px 14px;vertical-align:top;">
            <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:#0D0D0D;line-height:1.4;">${escapeHtml(title)}</p>
            <p style="margin:4px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6B7280;line-height:1.6;">${escapeHtml(body)}</p>
          </td>
        </tr>`,
    )
    .join("");

  const stepsText = steps.map(([title, body], i) => `${i + 1}. ${title} — ${body}`).join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#F7F8FA;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;background:#FFFFFF;border:1px solid #E5E7EB;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="height:4px;background:#C6FF00;line-height:4px;font-size:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:32px 40px 0;">
                <img src="https://vistrow.com/logo-light.png" width="118" height="32" alt="Vistrow" style="display:block;height:32px;width:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:28px 40px 0;">
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#4E6700;">${isAudit ? "Growth Audit requested" : "Message received"}</p>
                <h1 style="margin:10px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:22px;font-weight:800;color:#0D0D0D;line-height:1.3;">${isAudit ? "We're on it." : "Thanks for reaching out."}</h1>
                <p style="margin:14px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#1C1C1E;line-height:1.7;">${intro}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 40px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FA;border-radius:12px;padding:22px;">
                  <tr>
                    <td style="padding:22px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${stepsHtml}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 40px 32px;">
                <a href="https://vistrow.com" style="display:inline-block;background:#C6FF00;color:#0D0D0D;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px;">Visit vistrow.com</a>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px;background:#0D0D0D;">
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#A7ADB8;line-height:1.6;">Vistrow Technologies · Remote-first · India and global<br />Replying to this email reaches our team directly.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `${isAudit ? "GROWTH AUDIT REQUESTED" : "MESSAGE RECEIVED"}\n\n${introPlain}\n\n${stepsText}\n\nVisit https://vistrow.com\n\n— Vistrow Technologies`;

  return { subject, html, text };
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanList(value: unknown) {
  return Array.isArray(value)
    ? value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 20)
        .join(", ")
    : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ] || character,
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = requestLog.get(ip);
  if (!current || current.resetAt <= now) {
    requestLog.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}
