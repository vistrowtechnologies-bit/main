import type { TrendSignal } from "@/lib/blog-automation/trending";

export const BLOG_CATEGORIES = [
  "AI Voice",
  "Business Automation",
  "Conversion Tracking",
  "CRM & Automation",
  "Lead Generation",
  "Strategy",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type GeneratedPost = {
  title: string;
  excerpt: string;
  category: BlogCategory;
  focusKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  readTime: string;
  sections: { heading?: string; paragraphs: string[]; points?: string[] }[];
};

const responseSchema = {
  name: "vistrow_blog_posts",
  strict: true,
  schema: {
    type: "object",
    properties: {
      posts: {
        type: "array",
        minItems: 2,
        maxItems: 2,
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            excerpt: { type: "string", description: "80-320 characters, shown on the blog index." },
            category: { type: "string", enum: [...BLOG_CATEGORIES] },
            focusKeyword: { type: "string" },
            secondaryKeywords: { type: "array", maxItems: 6, items: { type: "string" } },
            metaTitle: { type: "string", description: "50-60 characters." },
            metaDescription: { type: "string", description: "140-160 characters." },
            readTime: { type: "string", description: "e.g. '6 min read'." },
            sections: {
              type: "array",
              minItems: 3,
              maxItems: 5,
              items: {
                type: "object",
                properties: {
                  heading: { type: "string", description: "Empty string only for the opening section." },
                  paragraphs: { type: "array", minItems: 1, maxItems: 3, items: { type: "string" } },
                  points: { type: "array", maxItems: 6, items: { type: "string" } },
                },
                required: ["heading", "paragraphs", "points"],
                additionalProperties: false,
              },
            },
          },
          required: [
            "title",
            "excerpt",
            "category",
            "focusKeyword",
            "secondaryKeywords",
            "metaTitle",
            "metaDescription",
            "readTime",
            "sections",
          ],
          additionalProperties: false,
        },
      },
    },
    required: ["posts"],
    additionalProperties: false,
  },
} as const;

export async function generateDailyPosts({
  signals,
  existingTitles,
}: {
  signals: TrendSignal[];
  existingTitles: string[];
}): Promise<GeneratedPost[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const signalsText = signals
    .slice(0, 40)
    .map((s) => `- [${s.source}] ${s.title}`)
    .join("\n");

  const existingText = existingTitles.slice(0, 60).join("\n- ") || "(none yet)";

  const systemPrompt = `You are Vistrow's editorial strategist. Vistrow is a digital marketing and business automation company (performance advertising, lead generation, website development, CRM, AI voice calling, conversion tracking, marketing automation) serving real estate, local businesses, B2B, startups/SaaS, agencies, and education.

Pick the 2 MOST relevant and currently-trending topics from the signals below that a) genuinely fit one of the 6 blog categories, and b) would attract search traffic from people researching marketing, CRM, AI voice, or automation topics. Ignore signals that are off-topic (celebrity news, sports, politics, unrelated tech).

Do not repeat a topic that's close to an existing post title (listed below) - pick something genuinely new.

Write each as a full, practical, non-fluffy blog post in Vistrow's voice: direct, specific, no generic marketing filler, no em dashes, sentence case headings, British/Indian-neutral English. 3-5 sections, first section has an empty heading (it's the intro). Include a short bulleted "points" list only where it adds real clarity (not every section needs one).

TRENDING SIGNALS (raw, unfiltered - use judgement):
${signalsText}

EXISTING POST TITLES (avoid duplicating):
- ${existingText}`;

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
        { role: "user", content: "Generate today's 2 blog posts as JSON." },
      ],
      response_format: { type: "json_schema", json_schema: responseSchema },
      temperature: 0.6,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const raw = data?.choices?.[0]?.message?.content;
  if (typeof raw !== "string") throw new Error("OpenAI returned no content");

  const parsed = JSON.parse(raw) as { posts: GeneratedPost[] };
  return parsed.posts;
}
