import { BLOG_CATEGORIES, overlapRatio, type BlogCategory, type ExistingPost } from "@/lib/blog-automation/generate";

export type CalendarTopicDraft = {
  title: string;
  category: BlogCategory;
  focusKeyword: string;
  angle: string;
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
              description: "A real 2-4 word search phrase, never a full sentence or the title copied verbatim.",
            },
            angle: {
              type: "string",
              description: "1-2 sentences naming the specific tension, number, or scenario that makes this genuinely different from every other topic in the batch - the writer will use this as the opening hook.",
            },
          },
          required: ["title", "category", "focusKeyword", "angle"],
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
}: {
  size?: number;
  existingPosts: ExistingPost[];
  // Titles already queued in a still-pending calendar batch, so a fresh
  // batch (e.g. topping up a partially-consumed queue) can't re-collide with
  // entries that haven't been written yet either.
  reservedTitles?: string[];
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

  const systemPrompt = `You are planning Vistrow's content calendar - a company blog covering digital marketing, CRM, AI voice calling, business automation, and conversion tracking, for real estate, local businesses, B2B, startups/SaaS, agencies, and education.

Generate exactly ${size} distinct blog topics for the next ${size} publishing days - one topic per day, never two topics on the same real-world subject. This batch is the entire plan for the coming month, so every single topic must be genuinely different from every other one in this batch, not just superficially reworded.

CATEGORY SPREAD - roughly ${perCategory} topics per category across all ${BLOG_CATEGORIES.length} categories (${BLOG_CATEGORIES.join(", ")}), so no single category dominates the month. Recent published-post category counts (last ${recentWindow.length} posts): ${categoryCountsText}. Weight the starved categories slightly higher in this batch.

MIX - across the ${size} topics, blend:
- Evergreen product-ranking topics for ArthaLeads (real estate CRM) and Vistrow Voice (AI voice calling) - covering different features/angles each time (lead scoring, WhatsApp capture, telecaller workflow, pricing, multilingual calling, knowledge-base grounding, etc.), never the same feature twice.
- Evergreen service-ranking topics for Vistrow's own services (performance advertising, SEO, social media, landing pages, website development, creative strategy, conversion tracking, marketing automation).
- General strategy/how-to topics useful to the audience even when not selling a specific product.
Do not invent two topics that are really the same idea with a different headline (e.g. "real estate CRM pricing in India" and "how much does a real estate CRM cost in India" are the same topic - only one may appear).

Each topic needs:
- A sharp, specific title containing the exact focusKeyword phrase (a real 2-4 word search phrase, never the full title).
- A category from the list above.
- A one-to-two sentence angle: the specific number, tension, comparison, or scenario that makes this topic's take genuinely distinct - this is what a writer will use as the opening hook, so make it concrete, not generic ("look at how X compares to Y for a business running 200 leads a month", not "explore the benefits of X").

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
  for (const topic of parsed.topics) {
    const collidesExisting = allAvoidTitles.some((title) => overlapRatio(topic.title, title) >= 0.55);
    const collidesBatch = seen.some((title) => overlapRatio(topic.title, title) >= 0.55);
    if (collidesExisting || collidesBatch) continue;
    seen.push(topic.title);
    clean.push(topic);
  }

  return clean;
}
