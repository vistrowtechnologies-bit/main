import type { TrendSignal } from "@/lib/blog-automation/trending";
import { digitalMarketingOverview } from "@/content/digital-marketing";
import { businessAutomationOverview } from "@/content/business-automation";
import { productsOverview } from "@/content/products";
import { industriesOverview } from "@/content/industries";

const MARKDOWN_LINK_TEST = /\[[^\]]+\]\([^)]+\)/;
const BULLET_DASH_TEST = /(^|\n)\s*[-*]\s+\S/;

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
  imageBrief: string;
  imageGenerationPrompt: string;
  imageAltSuggestion: string;
  sections: { heading?: string; paragraphs: string[]; points?: string[] }[];
};

// Pages the model is allowed to link to internally - keeps generated links real.
const internalLinkCards = [
  ...digitalMarketingOverview.cards,
  ...businessAutomationOverview.cards,
  ...productsOverview.cards,
  ...industriesOverview.cards,
];
export const VALID_INTERNAL_LINKS = new Set<string>([
  "/growth-audit",
  "/contact",
  "/services",
  "/blog",
  ...internalLinkCards.map((c) => c.href),
]);

const internalLinksReference = [
  ["/growth-audit", "Book a Growth Audit"],
  ["/contact", "Contact Vistrow"],
  ["/services", "All services"],
  ...internalLinkCards.map((c) => [c.href, c.label]),
]
  .map(([href, label]) => `- ${href} - ${label}`)
  .join("\n");

const responseSchema = {
  name: "vistrow_blog_posts",
  strict: true,
  schema: {
    type: "object",
    properties: {
      posts: {
        type: "array",
        minItems: 1,
        maxItems: 2,
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description:
                "Catchy, specific, click-worthy headline - not clickbait, but sharp enough that someone scrolling would stop on it. Use a concrete number, a strong verb, or a specific outcome where it fits naturally.",
            },
            excerpt: { type: "string", description: "80-320 characters, shown on the blog index." },
            category: { type: "string", enum: [...BLOG_CATEGORIES] },
            focusKeyword: { type: "string" },
            secondaryKeywords: { type: "array", maxItems: 6, items: { type: "string" } },
            metaTitle: {
              type: "string",
              description: "50-60 characters. Just as catchy as the title - this is what shows up in Google search results and decides whether people click.",
            },
            metaDescription: { type: "string", description: "140-160 characters, written to earn the click from a search results page." },
            readTime: { type: "string", description: "e.g. '6 min read'." },
            imageBrief: {
              type: "string",
              description:
                "1-2 sentences describing exactly what featured image to find or create for this post (subject, mood, setting) - written for a human to go source or generate the image from.",
            },
            imageGenerationPrompt: {
              type: "string",
              description:
                "A single, ready-to-paste prompt for an AI image generator (ChatGPT/DALL-E), covering subject, visual style, on-brand color palette, composition, and aspect ratio. See the IMAGE PROMPT FORMAT instructions.",
            },
            imageAltSuggestion: {
              type: "string",
              description: "A ready-to-use alt text for that featured image, under 125 characters, descriptive not keyword-stuffed.",
            },
            sections: {
              type: "array",
              minItems: 3,
              maxItems: 5,
              items: {
                type: "object",
                properties: {
                  heading: { type: "string", description: "Empty string only for the opening section." },
                  paragraphs: {
                    type: "array",
                    minItems: 1,
                    maxItems: 3,
                    items: {
                      type: "string",
                      description:
                        "Plain text, except where you place an inline link, written as Markdown: [anchor text](url). Use real internal paths from the reference list, or a stable external homepage.",
                    },
                  },
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
            "imageBrief",
            "imageGenerationPrompt",
            "imageAltSuggestion",
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
  count = 2,
}: {
  signals: TrendSignal[];
  existingTitles: string[];
  count?: number;
}): Promise<GeneratedPost[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const signalsText = signals
    .slice(0, 40)
    .map((s) => `- [${s.source}] ${s.title}`)
    .join("\n");

  const existingText = existingTitles.slice(0, 60).join("\n- ") || "(none yet)";
  const schema = { ...responseSchema, schema: { ...responseSchema.schema, properties: { posts: { ...responseSchema.schema.properties.posts, minItems: count, maxItems: count } } } };

  const systemPrompt = `You are a senior writer on Vistrow's own content team, not an outside copywriter. Vistrow is a digital marketing and business automation company (performance advertising, lead generation, website development, CRM, AI voice calling, conversion tracking, marketing automation) serving real estate, local businesses, B2B, startups/SaaS, agencies, and education.

Pick the ${count} most relevant and currently-trending topic(s) from the signals below - things that genuinely fit one of the 6 blog categories and would attract search traffic from people researching marketing, CRM, AI voice, or automation. Ignore anything off-topic (celebrity news, sports, politics, unrelated tech).

Do not repeat a topic close to an existing post title (listed below) - pick something genuinely new.

VOICE - write like an experienced practitioner talking to a peer, not like an AI summarising a topic:
- Vary sentence length on purpose - some short. Some longer, with a natural clause or two, the way someone actually talks.
- Have an actual point of view. Disagree gently with a common assumption somewhere if it's honest. Don't just list pros and cons.
- Use "you" and occasional first person plural ("we've seen...") - this is a company blog, not an encyclopedia entry.
- Open with a specific observation, a number, or a real scenario - never "In today's fast-paced digital world" or any variant of that.
- No em dashes. No generic marketing filler ("unlock", "leverage", "seamless", "game-changer"). Sentence case headings.
- Avoid a rigid template across sections (don't make every section "benefits then challenges then how-to" - let the structure follow the actual argument).

HEADLINES - the title and metaTitle are what decide whether anyone clicks. Make them sharp and specific: a concrete number, a surprising claim, a direct outcome, or a real tension ("X vs Y") - never generic ("A Guide to X", "Everything You Need to Know About X").

LINKING - this is mandatory, not optional. Every post MUST contain 2-4 actual Markdown links, written exactly as [anchor text](url) inside the paragraph text itself - not the page name mentioned in plain prose. "Vistrow Voice can help" is wrong. "[Vistrow Voice](/products/vistrow-voice) can help" is correct. A post with zero [text](url) links anywhere in its paragraphs is a failed post.
- Internal: only use paths from this exact list (never invent one):
${internalLinksReference}
- External: 0-2 links max, to a bare homepage only (e.g. https://www.salesforce.com, https://www.hubspot.com) - never a specific article URL you can't verify.
- Spread links across different sections. Don't link the same page twice. Make the anchor text the natural words already in the sentence, not "click here".

BULLET LISTS - never write a bullet list as dashes or a numbered list inside a paragraph string (no "- item one\n- item two" inside "paragraphs"). If a section needs a list, put each item as its own entry in that section's "points" array instead, and keep "paragraphs" as normal prose sentences only.

3-5 sections, first section has an empty heading (it's the intro, no linking needed there).

IMAGE PROMPT FORMAT - imageGenerationPrompt must be one paste-ready prompt for ChatGPT/DALL-E, following this exact structure (as flowing sentences, not labelled fields):
1. Subject and scene specific to this post's topic (concrete, not abstract - e.g. "a real estate agent reviewing property leads on a tablet" not "a business concept").
2. Visual style: "modern flat illustration with clean geometric shapes" (default) - use a photorealistic style instead only if the topic genuinely calls for it.
3. Color palette, always exactly this: "a color palette of carbon black (#0D0D0D), neon lime green (#C6FF00) as an accent, and white/light gray backgrounds."
4. Composition: wide landscape composition with room for the subject slightly off-center.
5. End the prompt with exactly: "16:9 aspect ratio, no text, no logos, no watermarks."

TRENDING SIGNALS (raw, unfiltered - use judgement):
${signalsText}

EXISTING POST TITLES (avoid duplicating):
- ${existingText}`;

  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Generate today's ${count} blog post(s) as JSON.` },
  ];

  for (let attempt = 1; attempt <= 2; attempt++) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages,
        response_format: { type: "json_schema", json_schema: schema },
        temperature: 0.7,
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
    const allHaveLinks = parsed.posts.every((post) =>
      post.sections.some((section) => MARKDOWN_LINK_TEST.test(section.paragraphs.join(" "))),
    );
    const noBakedLists = parsed.posts.every((post) =>
      post.sections.every((section) => !BULLET_DASH_TEST.test(section.paragraphs.join("\n"))),
    );

    if ((allHaveLinks && noBakedLists) || attempt === 2) return parsed.posts;

    const problems = [
      !allHaveLinks && "At least one post has zero [text](url) Markdown links in its paragraphs.",
      !noBakedLists && "At least one paragraph contains a bullet list written as dashes/lines instead of using the \"points\" array.",
    ]
      .filter(Boolean)
      .join(" ");

    messages.push(
      { role: "assistant", content: raw },
      {
        role: "user",
        content: `${problems} Rewrite ALL posts, keeping the same topics, fixing these issues: include 2-4 real [anchor text](url) links per post using exact Markdown syntax, and move any bulleted content out of "paragraphs" into that section's "points" array. Return the full JSON again.`,
      },
    );
  }

  throw new Error("unreachable");
}
