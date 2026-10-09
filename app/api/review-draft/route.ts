import { NextResponse } from "next/server";
import { getReviewBusiness } from "@/lib/review-businesses";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;
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

  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!geminiKey && !openAiKey) {
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
  const rating = typeof input.rating === "number" && Number.isInteger(input.rating) && input.rating >= 1 && input.rating <= 5 ? input.rating : null;

  if (!business || experience.length < 20) {
    return NextResponse.json(
      { error: "Tell us a little more about your real experience first." },
      { status: 400 },
    );
  }

  const instruction = `Help a real customer put their own experience with ${business.name} into a Google review. Write in first person, 1-3 natural sentences. Use only facts and opinions the customer supplied. Keep their specific details and ordinary phrasing. If they actually used a named service or mentioned a location, you may include it once naturally; do not insert keywords or locations that they did not provide. A selected service category alone is not proof they bought that service. Preserve criticism, uncertainty, and mixed feelings. An optional rating can inform tone, but their written words take priority if they conflict. Do not invent a purchase, result, timeline, employee, or claim. Do not add generic praise, repeated phrases, marketing language, SEO keyword lists, emojis, a star rating, or a call to action. If their account is brief, make a brief close paraphrase rather than padding it. They must edit and post it themselves. Return a JSON object with one string field named draft.`;
  const answers = JSON.stringify({ service, experience, improvement, rating });

  try {
    let draft = "";
    if (geminiKey) {
      try {
        draft = await draftWithGemini(geminiKey, instruction, answers);
      } catch (error) {
        console.error("Gemini review draft failed", error);
        if (!openAiKey) throw error;
      }
    }
    if (!draft && openAiKey) draft = await draftWithOpenAi(openAiKey, instruction, answers);
    if (!draft) throw new Error("Empty review draft");

    return NextResponse.json({ draft }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Review draft request failed", error);
    return NextResponse.json(
      { error: "Could not create a draft right now. Please try again shortly." },
      { status: 502 },
    );
  }
}

async function draftWithGemini(apiKey: string, instruction: string, answers: string) {
  const model = process.env.GEMINI_REVIEW_MODEL || "gemini-3.5-flash-lite";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: instruction }] },
      contents: [{ role: "user", parts: [{ text: answers }] }],
      generationConfig: {
        temperature: 0.25,
        maxOutputTokens: 300,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: { draft: { type: "STRING" } },
          required: ["draft"],
        },
      },
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Gemini response ${response.status}`);
  const data = await response.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return parseDraft(content);
}

async function draftWithOpenAi(apiKey: string, instruction: string, answers: string) {
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
            content: instruction,
          },
          {
            role: "user",
            content: answers,
          },
        ],
      }),
      signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) throw new Error(`OpenAI response ${response.status}`);
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  return parseDraft(content);
}

function parseDraft(content: unknown) {
  if (typeof content !== "string") throw new Error("Missing review draft");
  const parsed = JSON.parse(content) as { draft?: unknown };
  const draft = typeof parsed.draft === "string" ? parsed.draft.trim().slice(0, 1200) : "";
  if (!draft) throw new Error("Empty review draft");
  return draft;
}
