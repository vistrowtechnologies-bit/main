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

  return NextResponse.json({ ok: true });
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
