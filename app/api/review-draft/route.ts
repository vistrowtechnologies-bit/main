import { NextResponse } from "next/server";
import { getReviewBusiness } from "@/lib/review-businesses";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;
const requests = new Map<string, { count: number; resetAt: number }>();

function limited(ip: string) {
  const now = Date.now();
  const entry = requests.get(ip);
  if (!entry || entry.resetAt <= now) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Please wait a few minutes before trying again." }, { status: 429 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "The writing assistant is unavailable right now." }, { status: 503 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 4000) throw new Error("Request too large");
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Please check your answers and try again." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Please check your answers and try again." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const slug = typeof input.slug === "string" ? input.slug : "";
  const business = getReviewBusiness(slug);
  const service = typeof input.service === "string" ? input.service.trim().slice(0, 120) : "";
  const experience = typeof input.experience === "string" ? input.experience.trim().slice(0, 900) : "";
  const improvement = typeof input.improvement === "string" ? input.improvement.trim().slice(0, 500) : "";

  if (!business || experience.length < 20) {
    return NextResponse.json(
      { error: "Tell us a little more about your real experience first." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.35,
        max_tokens: 220,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "review_draft",
            strict: true,
            schema: {
              type: "object",
              properties: { draft: { type: "string" } },
              required: ["draft"],
              additionalProperties: false,
            },
          },
        },
        messages: [
          {
            role: "system",
            content: `Help a real customer express their own experience with ${business.name} as a Google review. Write in first person, 2-4 plain sentences. Use ONLY details the customer supplies. Preserve their sentiment, including criticism or uncertainty. Never invent outcomes, timelines, staff names, purchases, ratings, or claims. Never add a star rating, promotional call to action, or a request for others to buy. The customer will review and edit the draft before posting. Return JSON only.`,
          },
          {
            role: "user",
            content: JSON.stringify({ service, experience, improvement }),
          },
        ],
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) throw new Error(`OpenAI response ${response.status}`);
    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== "string") throw new Error("Missing draft");
    const parsed = JSON.parse(content) as { draft?: unknown };
    const draft = typeof parsed.draft === "string" ? parsed.draft.trim().slice(0, 1200) : "";
    if (!draft) throw new Error("Empty draft");

    return NextResponse.json({ draft }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Review draft request failed", error);
    return NextResponse.json(
      { error: "Could not create a draft right now. Please try again shortly." },
      { status: 502 },
    );
  }
}
