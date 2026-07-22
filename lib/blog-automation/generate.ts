import type { TrendSignal } from "@/lib/blog-automation/trending";
import { digitalMarketingOverview } from "@/content/digital-marketing";
import { businessAutomationOverview } from "@/content/business-automation";
import { productsOverview } from "@/content/products";
import { industriesOverview } from "@/content/industries";

const MARKDOWN_LINK_TEST = /\[[^\]]+\]\([^)]+\)/;
const BULLET_DASH_TEST = /(^|\n)\s*[-*]\s+\S/;

// Mirrors the exact scoring logic in studio/components/SeoAuditInput.tsx, so
// a post that passes here is guaranteed to score well in the Studio's own
// SEO checklist - not just "probably fine".
function bodyText(post: GeneratedPost) {
  return post.sections
    .flatMap((section) => section.paragraphs)
    .join(" ")
    .trim();
}

function seoIssues(post: GeneratedPost): string[] {
  const issues: string[] = [];
  const title = post.title.toLowerCase();
  const metaTitle = post.metaTitle.toLowerCase();
  const metaDescription = post.metaDescription.toLowerCase();
  const keyword = post.focusKeyword.toLowerCase().trim();
  const body = bodyText(post);
  const bodyLower = body.toLowerCase();
  const wordCount = body ? body.split(/\s+/).length : 0;
  const keywordWords = keyword ? keyword.split(/\s+/).length : 0;
  const keywordMentions = keyword ? bodyLower.split(keyword).length - 1 : 0;
  const keywordDensity = wordCount ? (keywordMentions * keywordWords * 100) / wordCount : 0;

  if (!keyword) issues.push(`"${post.title}": focusKeyword is empty.`);
  if (keywordWords > 4) issues.push(`"${post.title}": focusKeyword "${post.focusKeyword}" is ${keywordWords} words - it must be a short 2-4 word phrase, not a long headline copied verbatim. A long keyword makes the density math nearly impossible to pass.`);
  if (keyword && !title.includes(keyword)) issues.push(`"${post.title}": title does not contain the exact focusKeyword "${post.focusKeyword}".`);
  if (keyword && !metaTitle.includes(keyword)) issues.push(`"${post.title}": metaTitle does not contain the exact focusKeyword.`);
  if (keyword && !metaDescription.includes(keyword)) issues.push(`"${post.title}": metaDescription does not contain the exact focusKeyword.`);
  if (post.metaTitle.length < 30 || post.metaTitle.length > 60) issues.push(`"${post.title}": metaTitle is ${post.metaTitle.length} chars, needs 30-60.`);
  if (post.metaDescription.length < 120 || post.metaDescription.length > 160) issues.push(`"${post.title}": metaDescription is ${post.metaDescription.length} chars, needs 120-160.`);
  if (wordCount < 320) issues.push(`"${post.title}": body is only ${wordCount} words (from paragraphs only, not headings/points), needs at least 320.`);
  if (keyword && (keywordDensity < 0.5 || keywordDensity > 2.5) && wordCount > 0 && keywordWords > 0) {
    const minMentions = Math.max(1, Math.ceil((0.5 * wordCount) / (keywordWords * 100)));
    const maxMentions = Math.max(minMentions, Math.floor((2.5 * wordCount) / (keywordWords * 100)));
    issues.push(
      `"${post.title}": focusKeyword appears ${keywordMentions} time(s) in the body giving ${keywordDensity.toFixed(2)}% density, needs 0.5%-2.5%. For a body this length (${wordCount} words) and a ${keywordWords}-word keyword, that means exactly ${minMentions}-${maxMentions} literal mentions in the body paragraphs total - ${keywordMentions > maxMentions ? "remove some" : "add more"} to land in that range.`,
    );
  }

  return issues;
}

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

// Evergreen, high-commercial-intent topics that rank the products themselves
// (e.g. "best real estate CRM in India"), mixed in alongside real trend
// signals so the model can pick one instead of always chasing news.
const PRODUCT_SEED_TOPICS: TrendSignal[] = [
  { source: "product-seo", title: "Best real estate CRM software in India" },
  { source: "product-seo", title: "Best AI voice calling agent for Indian businesses" },
  { source: "product-seo", title: "ArthaLeads vs traditional real estate CRM software: what actually changes" },
  { source: "product-seo", title: "Top lead management software for real estate developers in India" },
  { source: "product-seo", title: "Best multilingual AI voice assistant for Indian customer service" },
  { source: "product-seo", title: "How real estate brokers in India are automating lead follow-up with AI voice" },
  { source: "product-seo", title: "CRM software built for Indian real estate teams: what to look for" },
  { source: "product-seo", title: "AI voice agents vs call centres: cost and coverage compared for Indian SMBs" },
];

const BRAND_PALETTES = `- Default (general Vistrow company post, not centred on a specific product): modern flat illustration with clean geometric shapes, a color palette of carbon black (#0D0D0D), neon lime green (#C6FF00) as an accent, and white/light gray backgrounds.
- Post centred on Vistrow Voice (AI voice calling product): soft-futurism flat illustration, no gradients, a color palette of Vistrow Violet (#9333EA) as primary, Signal Cyan (#0E7490) as a secondary accent, on a light neutral background (#F4F2F9) with dark text-toned details (#1A1523). Never depict a literal telephone handset, headset, or a generic "AI circuit brain" motif.
- Post centred on ArthaLeads (real estate CRM product): warm, premium flat illustration, a color palette of warm orange (#FF6B00, gradient #FEAB47 to #FD6007 used sparingly as a single accent only) on a warm beige background (#F0EDE8) with white card-like surfaces. Real-work-context imagery (a person at a desk, a dashboard glimpse) rather than abstract concepts or generic stock-photo clichés.`;

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
                "Catchy, specific, click-worthy headline that literally contains the exact focusKeyword phrase - not clickbait, but sharp enough that someone scrolling would stop on it. Use a concrete number, a strong verb, or a specific outcome where it fits naturally alongside the keyword.",
            },
            excerpt: { type: "string", description: "80-320 characters, shown on the blog index." },
            category: { type: "string", enum: [...BLOG_CATEGORIES] },
            focusKeyword: {
              type: "string",
              description:
                "Decide this FIRST, before writing anything else: a real, natural 2-4 word search phrase (not a sentence). Every other field is built around containing this exact phrase - see SEO REQUIREMENTS.",
            },
            secondaryKeywords: { type: "array", maxItems: 6, items: { type: "string" } },
            metaTitle: {
              type: "string",
              description: "30-60 characters (aim for 50-60) and must literally contain the exact focusKeyword phrase. Just as catchy as the title - this is what shows up in Google search results and decides whether people click.",
            },
            metaDescription: {
              type: "string",
              description: "MUST be 120-160 characters (count them) and must literally contain the exact focusKeyword phrase. Written to earn the click from a search results page.",
            },
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
              minItems: 4,
              maxItems: 6,
              items: {
                type: "object",
                properties: {
                  heading: { type: "string", description: "Empty string only for the opening section." },
                  paragraphs: {
                    type: "array",
                    minItems: 2,
                    maxItems: 4,
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

  const signalsText = [...signals.slice(0, 40), ...PRODUCT_SEED_TOPICS]
    .map((s) => `- [${s.source}] ${s.title}`)
    .join("\n");

  const existingText = existingTitles.slice(0, 60).join("\n- ") || "(none yet)";
  const schema = { ...responseSchema, schema: { ...responseSchema.schema, properties: { posts: { ...responseSchema.schema.properties.posts, minItems: count, maxItems: count } } } };

  const systemPrompt = `You are a senior writer on Vistrow's own content team, not an outside copywriter. Vistrow is a digital marketing and business automation company (performance advertising, lead generation, website development, CRM, AI voice calling, conversion tracking, marketing automation) serving real estate, local businesses, B2B, startups/SaaS, agencies, and education.

Pick the ${count} most relevant topic(s) from the signals below - a mix of genuinely trending news and, where it fits, a [product-seo] evergreen topic aimed at ranking for a specific product (ArthaLeads or Vistrow Voice) rather than reacting to news. Everything you pick must genuinely fit one of the 6 blog categories and attract search traffic from people researching marketing, CRM, AI voice, or automation. Ignore anything off-topic (celebrity news, sports, politics, unrelated tech). Don't pick two [product-seo] topics for the same product on the same day.

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

4-6 sections, first section has an empty heading (it's the intro, no linking needed there). 2-4 paragraphs per section, each paragraph 2-4 sentences - this is not padding, it's what gets the body past the word-count requirement below.

SEO REQUIREMENTS - these are checked by an automated scorer with hard pass/fail rules, not style suggestions:
1. Pick focusKeyword FIRST: a HARD MAXIMUM of 4 words, a real phrase someone would actually search (e.g. "AI voice calling India" or "real estate CRM software"). Never copy a topic or headline verbatim as the keyword even if it's longer - extract the short core phrase from it instead (from a topic like "Best AI voice calling agent for Indian businesses", the keyword is "AI voice calling agent" or "AI voice calling India", NOT the full 8-word topic). Then make title, metaTitle, and metaDescription each literally contain that exact short phrase, word for word - not a rephrasing or synonym.
2. metaTitle must be 30-60 characters. metaDescription must be 120-160 characters - count the characters before finalizing, both are hard limits.
3. The article body (all paragraphs across all sections, combined) must be at least 320 words. Headings and "points" don't count toward this - the paragraphs alone must reach it.
4. The exact focusKeyword phrase MUST appear literally, word for word, at least once in the body paragraphs (not just in the title/meta fields) - zero mentions in the body always fails, this is never optional. Be sparing about how many more: for a 3-4 word keyword, exactly ONE mention total in the body is correct - do not add a second. For a 2-word keyword, 2-3 mentions total in the body is fine. The density formula is (mentions x keyword-word-count x 100 / total-body-words) and it must land between 0.5% and 2.5%.

IMAGE PROMPT FORMAT - imageGenerationPrompt must be one long, detailed, paste-ready prompt for ChatGPT/DALL-E, written as flowing sentences (not labelled fields), covering every point below in order:
1. Subject and scene, concrete and specific to this exact post - name the person's role and what they're doing, and the setting (e.g. "a real estate broker in a bright open-plan office, mid-conversation on a headset while glancing at a tablet showing a property lead list" - never a vague "business concept" or "technology concept" image).
2. Visual style: "modern flat vector illustration with clean geometric shapes and simple gradients" by default - switch to a photorealistic editorial-photo style only if the topic is genuinely better served by a real-feeling scene.
3. Color palette - choose ONE of these based on what the post is actually about, and use the wording given almost verbatim:
${BRAND_PALETTES}
4. Lighting and mood: describe it in one clause (e.g. "soft, even daylight, calm and focused mood" or "warm interior lighting, energetic and optimistic mood") - match the mood to the post's argument.
5. Composition: wide 16:9 landscape framing, subject placed slightly off-center with breathing room, no crowded detail.
6. End the prompt with exactly this sentence, unchanged: "16:9 aspect ratio. No text, no words, no letters, no logos, no brand marks, no watermarks anywhere in the image."

TRENDING SIGNALS (raw, unfiltered - use judgement):
${signalsText}

EXISTING POST TITLES (avoid duplicating):
- ${existingText}`;

  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Generate today's ${count} blog post(s) as JSON.` },
  ];

  for (let attempt = 1; attempt <= 3; attempt++) {
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
    const seoProblems = parsed.posts.flatMap(seoIssues);

    if ((allHaveLinks && noBakedLists && seoProblems.length === 0) || attempt === 3) return parsed.posts;

    const problems = [
      !allHaveLinks && "At least one post has zero [text](url) Markdown links in its paragraphs.",
      !noBakedLists && "At least one paragraph contains a bullet list written as dashes/lines instead of using the \"points\" array.",
      ...seoProblems,
    ]
      .filter(Boolean)
      .join(" ");

    messages.push(
      { role: "assistant", content: raw },
      {
        role: "user",
        content: `${problems} Rewrite ALL posts, keeping the same topics, fixing every issue listed above exactly. Re-check character counts and word counts yourself before answering. Return the full JSON again.`,
      },
    );
  }

  throw new Error("unreachable");
}
