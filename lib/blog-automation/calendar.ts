import { BLOG_CATEGORIES, overlapRatio, type BlogCategory, type ExistingPost } from "@/lib/blog-automation/generate";
import type { TrendSignal } from "@/lib/blog-automation/trending";

export type CalendarTopicDraft = {
  title: string;
  category: BlogCategory;
  focusKeyword: string;
  angle: string;
  sourceUrl: string;
};

const responseSchema = {
  name: "vistrow_content_calendar",
  strict: true,
  schema: {
    type: "object",
    properties: {
      topics: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Sharp, specific, click-worthy headline containing the exact focusKeyword phrase.",
            },
            category: { type: "string", enum: [...BLOG_CATEGORIES] },
            focusKeyword: {
              type: "string",
              description: "A real 2-4 word search phrase that appears literally, in the same word order, in title.",
            },
            angle: {
              type: "string",
              description: "1-2 sentences naming the specific tension, number, or scenario that makes this genuinely different from every other topic in the batch - the writer will use this as the opening hook.",
            },
            sourceUrl: { type: "string", description: "Exact official source URL for a current AI development; empty string for evergreen topics." },
          },
          required: ["title", "category", "focusKeyword", "angle", "sourceUrl"],
          additionalProperties: false,
        },
      },
    },
    required: ["topics"],
    additionalProperties: false,
  },
} as const;

// Generates one full month of pre-planned, mutually distinct topics in a
// single pass, so the daily cron can consume a fixed queue instead of
// re-deciding a topic every run - the re-deciding is what previously let the
// model converge back onto a near-identical title after enough days.
export async function generateContentCalendar({
  size = 30,
  existingPosts,
  reservedTitles = [],
  officialAiUpdates = [],
}: {
  size?: number;
  existingPosts: ExistingPost[];
  // Titles already queued in a still-pending calendar batch, so a fresh
  // batch (e.g. topping up a partially-consumed queue) can't re-collide with
  // entries that haven't been written yet either.
  reservedTitles?: string[];
  officialAiUpdates?: TrendSignal[];
}): Promise<CalendarTopicDraft[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const existingTitles = existingPosts.map((p) => p.title);
  const allAvoidTitles = [...existingTitles, ...reservedTitles];

  const recentWindow = existingPosts.slice(0, 30);
  const categoryCounts = new Map<string, number>();
  for (const category of BLOG_CATEGORIES) categoryCounts.set(category, 0);
  for (const post of recentWindow) {
    if (post.category) categoryCounts.set(post.category, (categoryCounts.get(post.category) ?? 0) + 1);
  }
  const categoryCountsText = [...categoryCounts.entries()]
    .sort((a, b) => a[1] - b[1])
    .map(([category, count]) => `${category}: ${count}`)
    .join(", ");

  const perCategory = Math.ceil(size / BLOG_CATEGORIES.length);
  const officialUpdatesText = officialAiUpdates.slice(0, 12)
    .map((signal) => `- ${signal.publishedAt}: ${signal.title} | ${signal.url} | ${signal.summary || ""}`)
    .join("\n");

  const systemPrompt = `You are planning Vistrow's content calendar - a company blog covering digital marketing, CRM, AI voice calling, business automation, and conversion tracking, for real estate, local businesses, B2B, startups/SaaS, agencies, and education.

Generate exactly ${size} distinct blog topics for the next ${Math.ceil(size / 2)} publishing days - two topics per day, never two topics on the same real-world subject. Every single topic must be genuinely different from every other one in this batch, not just superficially reworded.

CATEGORY SPREAD - roughly ${perCategory} topics per category across all ${BLOG_CATEGORIES.length} categories (${BLOG_CATEGORIES.join(", ")}), so no single category dominates the month. Recent published-post category counts (last ${recentWindow.length} posts): ${categoryCountsText}. Weight the starved categories slightly higher in this batch.

MIX - across the ${size} topics, blend:
- Evergreen product-ranking topics for ArthaLeads (real estate CRM) and Vistrow Voice (AI voice calling) - covering different features/angles each time (lead scoring, WhatsApp capture, telecaller workflow, pricing, multilingual calling, knowledge-base grounding, etc.), never the same feature twice.
- Evergreen service-ranking topics for Vistrow's own services (performance advertising, SEO, social media, landing pages, website development, creative strategy, conversion tracking, marketing automation).
- General strategy/how-to topics useful to the audience even when not selling a specific product.
- If the official AI updates below contain a development with a concrete implication for Vistrow's audience, include 2-4 timely analysis topics across the month. Use the dated official source, give the article a practical marketing, sales, or automation angle, and set sourceUrl to that exact URL. Do not write a generic model-release recap, invent capabilities, or treat a company announcement as independent proof of an outcome. If none is relevant, use evergreen topics instead.
Do not invent two topics that are really the same idea with a different headline (e.g. "real estate CRM pricing in India" and "how much does a real estate CRM cost in India" are the same topic - only one may appear).

OFFICIAL AI UPDATES (source title, date, URL, and publisher summary only; do not infer details beyond these):
${officialUpdatesText || "(no recent relevant official update fetched)"}

Each topic needs:
- A sharp, specific title containing the exact focusKeyword phrase (a real 2-4 word search phrase, never the full title). The exact words must appear consecutively and in the same order, ignoring case. Do not use possessives or extra words within the phrase.
- A category from the list above.
- A one-to-two sentence angle: the specific number, tension, comparison, or scenario that makes this topic's take genuinely distinct - this is what a writer will use as the opening hook, so make it concrete, not generic ("look at how X compares to Y for a business running 200 leads a month", not "explore the benefits of X").
- sourceUrl: the exact URL above for an official AI update topic; otherwise an empty string.

Keep AI news relevant to Vistrow's buyers. Skip platform-news and regional expansions that do not change how a marketer, sales team, or small business works. No vague "key benefits", "revolutionizing", "the future of", "essential for success", or unproven Vistrow-versus-competitor claims. Do not attribute numerical outcomes to Vistrow or to a news source unless the publisher summary above explicitly gives that number.

Never propose a topic close to one of these already-published or already-queued titles - pick something genuinely new for every single one:
- ${allAvoidTitles.slice(0, 150).join("\n- ") || "(none yet)"}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate the ${size}-topic content calendar as JSON.` },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          ...responseSchema,
          schema: { ...responseSchema.schema, properties: { topics: { ...responseSchema.schema.properties.topics, minItems: size, maxItems: size } } },
        },
      },
      temperature: 0.8,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const raw = data?.choices?.[0]?.message?.content;
  if (typeof raw !== "string") throw new Error("OpenAI returned no content");

  const parsed = JSON.parse(raw) as { topics: CalendarTopicDraft[] };

  // Drop (rather than retry the whole batch on) any topic that still
  // collides - a handful of dropped slots is a much cheaper fix than a full
  // regeneration, and the daily cron simply gets a slightly shorter queue.
  const seen: string[] = [];
  const clean: CalendarTopicDraft[] = [];
  const officialUrls = new Set(officialAiUpdates.map((signal) => signal.url).filter(Boolean));
  for (const topic of parsed.topics) {
    const title = topic.title.toLowerCase();
    const keyword = topic.focusKeyword.toLowerCase().trim();
    if (!keyword || !title.includes(keyword) || keyword.split(/\s+/).length > 4) continue;
    if (topic.sourceUrl && !officialUrls.has(topic.sourceUrl)) continue;
    const collidesExisting = allAvoidTitles.some((title) => overlapRatio(topic.title, title) >= 0.55);
    const collidesBatch = seen.some((title) => overlapRatio(topic.title, title) >= 0.55);
    if (collidesExisting || collidesBatch) continue;
    seen.push(topic.title);
    clean.push(topic);
  }

  return clean;
}
