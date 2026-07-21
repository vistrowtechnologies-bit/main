import { NextResponse } from "next/server";
import { buildChatKnowledge, VALID_CHAT_LINKS } from "@/lib/chat-knowledge";

export const runtime = "nodejs";

const requestLog = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1000;

type IncomingMessage = { sender?: string; text?: string };

const responseSchema = {
  name: "artha_reply",
  strict: true,
  schema: {
    type: "object",
    properties: {
      reply: { type: "string", description: "Artha's conversational reply, 1-4 sentences." },
      links: {
        type: "array",
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
            href: { type: "string" },
          },
          required: ["label", "href"],
          additionalProperties: false,
        },
      },
    },
    required: ["reply", "links"],
    additionalProperties: false,
  },
} as const;

let cachedSystemPrompt: string | null = null;
function getSystemPrompt() {
  if (cachedSystemPrompt) return cachedSystemPrompt;
  cachedSystemPrompt = `You are Artha, the friendly automated guide on the Vistrow Technologies website (${"vistrow.com"}).

Answer visitor questions using ONLY the knowledge below. Be concise (1-4 sentences), warm, and specific - never generic marketing fluff. If something isn't covered by the knowledge, say you're not sure and suggest contacting the team instead of guessing.

Only ever link to hrefs that appear in the knowledge below - never invent a URL or path. Include 0-3 relevant links per reply, most relevant first. Prefer internal paths (starting with /) over external ones unless the visitor specifically wants to try a live product. Put links ONLY in the links array, never write out a raw URL or path inside the reply text itself - refer to pages by name in prose (e.g. "our SEO & Content service") since the link chips render separately below the message.

Never invent pricing, guarantees, timelines, or client names. Do not discuss topics unrelated to Vistrow, marketing, automation, or the services below - politely redirect.

KNOWLEDGE:
${buildChatKnowledge()}`;
  return cachedSystemPrompt;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat isn't configured yet. Please use the contact form instead." },
      { status: 503 },
    );
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = (await request.json()) as { messages?: IncomingMessage[] };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  const trimmedHistory = history
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.sender === "visitor" ? ("user" as const) : ("assistant" as const),
      content: clean(message.text),
    }))
    .filter((message) => message.content.length > 0);

  if (trimmedHistory.length === 0 || trimmedHistory[trimmedHistory.length - 1].role !== "user") {
    return NextResponse.json({ error: "No message to respond to." }, { status: 400 });
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
        messages: [{ role: "system", content: getSystemPrompt() }, ...trimmedHistory],
        response_format: { type: "json_schema", json_schema: responseSchema },
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI chat request failed", response.status, await response.text());
      return NextResponse.json(
        { error: "Artha is unavailable right now. Please use the contact form instead." },
        { status: 502 },
      );
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (typeof raw !== "string") {
      return NextResponse.json(
        { error: "Artha is unavailable right now. Please use the contact form instead." },
        { status: 502 },
      );
    }

    const parsed = JSON.parse(raw) as { reply?: unknown; links?: unknown };
    const reply = typeof parsed.reply === "string" ? parsed.reply.slice(0, 1200) : "";
    const links = Array.isArray(parsed.links)
      ? parsed.links
          .filter(
            (link): link is { label: string; href: string } =>
              !!link &&
              typeof link === "object" &&
              typeof (link as { label?: unknown }).label === "string" &&
              typeof (link as { href?: unknown }).href === "string" &&
              VALID_CHAT_LINKS.has((link as { href: string }).href),
          )
          .slice(0, 3)
      : [];

    if (!reply) {
      return NextResponse.json(
        { error: "Artha is unavailable right now. Please use the contact form instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply, links });
  } catch (error) {
    console.error("Chat request error", error);
    return NextResponse.json(
      { error: "Artha is unavailable right now. Please use the contact form instead." },
      { status: 502 },
    );
  }
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
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
