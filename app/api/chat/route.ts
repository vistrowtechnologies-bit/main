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
      lead: {
        type: "object",
        description:
          "Fill only when the visitor has just given their name AND a phone or email in a serious enquiry. Otherwise leave every field as an empty string.",
        properties: {
          name: { type: "string" },
          phone: { type: "string" },
          email: { type: "string" },
          summary: { type: "string", description: "One sentence on what they need, for the team." },
        },
        required: ["name", "phone", "email", "summary"],
        additionalProperties: false,
      },
    },
    required: ["reply", "links", "lead"],
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

Never use an em dash (—) anywhere in the reply or lead summary. Use a comma, period, or "and" instead.

LEAD CAPTURE: If the visitor shows genuine buying intent - asking for pricing, a demo, a callback, wanting to start a Growth Audit, or similar - and you don't already have their name and a phone number or email from earlier in the conversation, naturally ask for their name and phone/email in your reply (one short, friendly ask, not a form). Do not ask again if they already gave it or declined. Once they reply with their name and a phone number or email in the same message or a following one, fill the "lead" field with that name, phone, email (whichever they gave, leave the other blank), and a one-sentence summary of what they're after. Otherwise leave all four lead fields as empty strings "".

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

  let body: { messages?: IncomingMessage[]; leadCaptured?: boolean };
  try {
    body = (await request.json()) as { messages?: IncomingMessage[]; leadCaptured?: boolean };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const alreadyCaptured = body.leadCaptured === true;
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

    const parsed = JSON.parse(raw) as { reply?: unknown; links?: unknown; lead?: unknown };
    const reply =
      typeof parsed.reply === "string" ? stripEmDash(parsed.reply.slice(0, 1200)) : "";
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

    let leadCaptured = false;
    const lead = parsed.lead as { name?: unknown; phone?: unknown; email?: unknown; summary?: unknown } | undefined;
    const name = clean(lead?.name);
    const phone = clean(lead?.phone);
    const email = clean(lead?.email);
    const summary = stripEmDash(clean(lead?.summary));

    if (!alreadyCaptured && name && (phone || email)) {
      try {
        await sendChatLead({ name, phone, email, summary, transcript: trimmedHistory });
        leadCaptured = true;
      } catch (error) {
        console.error("Chat lead email failed", error);
      }
    }

    return NextResponse.json({ reply, links, leadCaptured });
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

function stripEmDash(value: string) {
  return value.replace(/\s*—\s*/g, ", ").replace(/—/g, ",");
}

async function sendChatLead({
  name,
  phone,
  email,
  summary,
  transcript,
}: {
  name: string;
  phone: string;
  email: string;
  summary: string;
  transcript: { role: "user" | "assistant"; content: string }[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello@vistrow.com";
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return;

  const transcriptText = transcript
    .map((message) => `${message.role === "user" ? "Visitor" : "Artha"}: ${message.content}`)
    .join("\n");

  const details: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["What they need", summary],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const subject = `Chat lead via Artha - ${name}`;
  const text = `${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nConversation:\n${transcriptText}`;
  const html = renderChatLeadEmail({ subject, details, transcript });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text, html }),
  });

  if (!response.ok) {
    console.error("Resend chat-lead delivery failed", response.status, await response.text());
  }
}

function renderChatLeadEmail({
  subject,
  details,
  transcript,
}: {
  subject: string;
  details: [string, string][];
  transcript: { role: "user" | "assistant"; content: string }[];
}) {
  const detailsHtml = details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:0 0 14px;vertical-align:top;width:140px;">
            <span style="font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6B7280;">${escapeHtml(label)}</span>
          </td>
          <td style="padding:0 0 14px;vertical-align:top;">
            <span style="font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#0D0D0D;">${escapeHtml(value)}</span>
          </td>
        </tr>`,
    )
    .join("");

  const actions: string[] = [];
  const phone = details.find(([label]) => label === "Phone")?.[1];
  const email = details.find(([label]) => label === "Email")?.[1];
  if (phone) {
    actions.push(
      `<a href="tel:${encodeURIComponent(phone)}" style="display:inline-block;background:#C6FF00;color:#0D0D0D;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:11px 20px;border-radius:999px;margin:0 8px 0 0;">Call ${escapeHtml(phone)}</a>`,
    );
  }
  if (email) {
    actions.push(
      `<a href="mailto:${encodeURIComponent(email)}" style="display:inline-block;background:#F7F8FA;color:#0D0D0D;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:11px 20px;border-radius:999px;border:1px solid #E5E7EB;">Email ${escapeHtml(email)}</a>`,
    );
  }

  const transcriptHtml = transcript
    .map((message) => {
      const isVisitor = message.role === "user";
      return `
        <tr>
          <td style="padding:0 0 14px;">
            <p style="margin:0 0 3px;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${isVisitor ? "#0D0D0D" : "#4E6700"};">${isVisitor ? "Visitor" : "Artha"}</p>
            <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#1C1C1E;background:${isVisitor ? "#F7F8FA" : "#FFFFFF"};border:1px solid #E5E7EB;border-radius:10px;padding:10px 14px;">${escapeHtml(message.content)}</p>
          </td>
        </tr>`;
    })
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#F7F8FA;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#FFFFFF;border:1px solid #E5E7EB;border-radius:16px;overflow:hidden;">
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
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#4E6700;">New chat lead</p>
                <h1 style="margin:10px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:22px;font-weight:800;color:#0D0D0D;line-height:1.3;">${escapeHtml(subject)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FA;border-radius:12px;">
                  <tr>
                    <td style="padding:20px 22px 6px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${detailsHtml}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${
              actions.length
                ? `<tr><td style="padding:20px 40px 0;">${actions.join("")}</td></tr>`
                : ""
            }
            <tr>
              <td style="padding:28px 40px 8px;">
                <p style="margin:0 0 12px;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6B7280;">Conversation</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${transcriptHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px;background:#0D0D0D;">
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#A7ADB8;line-height:1.6;">Vistrow Technologies &middot; Captured automatically by Artha on vistrow.com</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character,
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
