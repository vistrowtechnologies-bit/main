import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/lib/sanity/write-client";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STUDIO_URL = "https://vistrow.sanity.studio";

// Same lightweight per-IP rate limit as /api/inquiries - resets per process,
// which is fine at this volume and needs no extra infrastructure.
const requestLog = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestLog.get(ip);
  if (!entry || now > entry.resetAt) {
    requestLog.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanList(value: unknown, maxLength: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, maxLength))
    .filter(Boolean)
    .slice(0, 20);
}

type ClientDiscoverySubmission = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  businessType?: string;
  socialPlatforms?: string[];
  socialActivity?: string;
  leadSource?: string;
  crmUsage?: string;
  crmName?: string;
  hasWebsite?: string;
  budgetRange?: string;
  teamSize?: string;
  biggestChallenge?: string;
  timeline?: string;
  _gotcha?: string;
};

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  let data: ClientDiscoverySubmission;
  try {
    data = (await request.json()) as ClientDiscoverySubmission;
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (data._gotcha) return NextResponse.json({ ok: true });

  const record = {
    name: clean(data.name, 100),
    email: clean(data.email, 160).toLowerCase(),
    company: clean(data.company, 140),
    phone: clean(data.phone, 60),
    businessType: clean(data.businessType, 80),
    socialPlatforms: cleanList(data.socialPlatforms, 40),
    socialActivity: clean(data.socialActivity, 120),
    leadSource: clean(data.leadSource, 80),
    crmUsage: clean(data.crmUsage, 80),
    crmName: clean(data.crmName, 80),
    hasWebsite: clean(data.hasWebsite, 80),
    budgetRange: clean(data.budgetRange, 60),
    teamSize: clean(data.teamSize, 60),
    biggestChallenge: clean(data.biggestChallenge, 120),
    timeline: clean(data.timeline, 60),
  };

  if (!record.name || !emailRe.test(record.email) || !record.company) {
    return NextResponse.json({ error: "Please provide your name, a valid email, and your company." }, { status: 400 });
  }
  if (!record.businessType || !record.socialActivity || !record.leadSource || !record.crmUsage || !record.hasWebsite || !record.budgetRange || !record.teamSize || !record.biggestChallenge || !record.timeline) {
    return NextResponse.json({ error: "Please answer every question before submitting." }, { status: 400 });
  }

  try {
    const writeClient = getSanityWriteClient();
    const docId = randomUUID();
    await writeClient.create({
      _id: docId,
      _type: "clientDiscoveryResponse",
      ...record,
      status: "new",
      submittedAt: new Date().toISOString(),
    });
    await notifyTeam(record, docId);
  } catch (error) {
    console.error("Client discovery submission failed", error);
    return NextResponse.json({ error: "We couldn't save your response. Please email hello@vistrow.com." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

// Reuses the same Resend config as the contact form and the content
// calendar's refill notice - never throws, since a notification failure
// must not undo the already-saved Sanity record.
async function notifyTeam(record: Record<string, string | string[]>, docId: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "hello@vistrow.com";
  if (!apiKey || !from) return;

  const rows = Object.entries(record)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
    .join("\n");
  const studioUrl = `${STUDIO_URL}/structure/clientDiscoveryResponse;${encodeURIComponent(docId)}`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New client discovery response - ${record.company}`,
        text: `${rows}\n\nView in Sanity: ${studioUrl}`,
      }),
    });
  } catch (error) {
    console.error("Client discovery notification email failed", error);
  }
}
