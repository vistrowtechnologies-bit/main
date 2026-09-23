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
  "Digital Marketing",
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
  useRealProductScreenshot: boolean;
  screenshotGuidance: string;
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
  ["/growth-audit", "Request a Growth Audit"],
  ["/contact", "Contact Vistrow"],
  ["/services", "All services"],
  ...internalLinkCards.map((c) => [c.href, c.label]),
]
  .map(([href, label]) => `- ${href} - ${label}`)
  .join("\n");

// Evergreen, high-commercial-intent topics that rank the products themselves
// (e.g. "best real estate CRM in India"), mixed in alongside real trend
// signals so the model can pick one instead of always chasing news.
// ArthaLeads is the current growth priority, so it gets a deliberately larger
// and more feature-specific pool than Vistrow Voice - grounded in the real
// product (arthaleads.com): unified lead inbox, AI lead scoring, WhatsApp
// auto-draft, QR code capture, telecaller workflow, booking/invoice engine,
// portal integrations (99acres, Housing.com, MagicBricks), duplicate
// prevention, and the admin intelligence dashboard.
const PRODUCT_SEED_TOPICS: TrendSignal[] = [
  { source: "product-seo", title: "Best real estate CRM software in India" },
  { source: "product-seo", title: "ArthaLeads vs traditional real estate CRM software: what actually changes" },
  { source: "product-seo", title: "Top lead management software for real estate developers in India" },
  { source: "product-seo", title: "How real estate brokers in India are automating lead follow-up with AI voice" },
  { source: "product-seo", title: "CRM software built for Indian real estate teams: what to look for" },
  { source: "product-seo", title: "How AI lead scoring helps real estate teams call the right lead first" },
  { source: "product-seo", title: "Why unified lead inbox software beats spreadsheets for property sales teams" },
  { source: "product-seo", title: "WhatsApp lead capture for real estate: turning chats into a real pipeline" },
  { source: "product-seo", title: "How QR code lead capture is changing real estate site visits and expos" },
  { source: "product-seo", title: "Telecaller workflow software: what real estate sales teams actually need" },
  { source: "product-seo", title: "Best CRM for real estate channel partners managing 99acres, Housing.com and MagicBricks leads" },
  { source: "product-seo", title: "How real estate developers can stop losing leads to duplicate calls" },
  { source: "product-seo", title: "Booking and invoice software for real estate brokers: what to look for" },
  { source: "product-seo", title: "Real estate CRM pricing in India: what Starter, Growth and Enterprise plans actually cover" },
  { source: "product-seo", title: "Best AI voice calling agent for Indian businesses" },
  { source: "product-seo", title: "Best multilingual AI voice assistant for Indian customer service" },
  { source: "product-seo", title: "AI voice agents vs call centres: cost and coverage compared for Indian SMBs" },
];

// Evergreen topics aimed at ranking Vistrow's own digital marketing SERVICE
// pages (not a product) - performance advertising, SEO, social, landing
// pages, website development, creative strategy, conversion tracking, and
// marketing automation. This pool exists because without it, the model
// defaults to CRM/AI-voice product topics almost every time, leaving these
// services with zero blog coverage despite being core revenue lines.
const SERVICE_SEED_TOPICS: TrendSignal[] = [
  { source: "service-seo", title: "Performance advertising ROI: what a healthy cost-per-lead actually looks like" },
  { source: "service-seo", title: "SEO for local businesses in India: where to start when organic traffic is flat" },
  { source: "service-seo", title: "Social media marketing for B2B: which platforms actually generate pipeline" },
  { source: "service-seo", title: "Landing page conversion rate benchmarks: what counts as good in 2026" },
  { source: "service-seo", title: "Website development for lead generation: what separates a fast site from a converting one" },
  { source: "service-seo", title: "Marketing automation workflows every growing business should have running" },
  { source: "service-seo", title: "Conversion tracking setup: why most businesses are flying blind on real ROI" },
  { source: "service-seo", title: "Creative strategy for paid ads: why the same three creatives stop working" },
  { source: "service-seo", title: "Performance advertising vs SEO: where to put your first marketing budget" },
  { source: "service-seo", title: "Google Ads vs Meta Ads for lead generation: how to choose for a local or B2B business" },
  { source: "service-seo", title: "Marketing automation for small teams: what to automate first" },
  { source: "service-seo", title: "Landing page vs full website for a paid campaign: which converts better" },
  { source: "service-seo", title: "SEO content strategy for service businesses: how to actually rank locally" },
  { source: "service-seo", title: "Digital marketing agency in Pune: what a connected marketing and CRM system looks like" },
  { source: "service-seo", title: "Conversion rate optimisation: the five checks before you blame your traffic" },
  { source: "service-seo", title: "Marketing attribution: why last-click reporting is lying to you about what's working" },
  { source: "service-seo", title: "Website speed and Core Web Vitals: how much they actually affect lead generation" },
];

const BRAND_PALETTES = `- Default (general Vistrow company post, not centred on a specific product): modern flat illustration with clean geometric shapes, a color palette of carbon black (#0D0D0D), neon lime green (#C6FF00) as an accent, and white/light gray backgrounds.
- Post centred on Vistrow Voice (AI voice calling product): soft-futurism flat illustration, no gradients, a color palette of Vistrow Violet (#9333EA) as primary, Signal Cyan (#0E7490) as a secondary accent, on a light neutral background (#F4F2F9) with dark text-toned details (#1A1523). Never depict a literal telephone handset, headset, or a generic "AI circuit brain" motif.
- Post centred on ArthaLeads (real estate CRM product): warm, premium flat illustration, a color palette of warm orange (#FF6B00, gradient #FEAB47 to #FD6007 used sparingly as a single accent only) on a warm beige background (#F0EDE8) with white card-like surfaces. Real-work-context imagery (a person at a desk, a dashboard glimpse) rather than abstract concepts or generic stock-photo clichés.
- Post centred on Digital Marketing services (performance advertising, SEO, social media, landing pages, website development, creative strategy, conversion tracking, marketing automation): energetic flat illustration, a color palette of carbon black (#0D0D0D) and neon lime green (#C6FF00) as the primary accent, with a secondary cool blue (#2563EB) used sparingly for a chart, screen, or data element, on a white or very light gray background. Show a concrete campaign/marketing artifact in the scene - an ad mockup, a browser window with a landing page, a bar chart trending up, a social feed - not an abstract "growth" metaphor like rockets or generic arrows.

Within whichever palette applies, never reuse the same scene setup as a previous post - vary the specific role of the person (marketer, founder, developer, analyst), the setting (office, home desk, coworking space, outdoors on a phone), the camera angle, and the specific prop or screen content described, so no two images read as the same template recolored.`;

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
            useRealProductScreenshot: {
              type: "boolean",
              description:
                "True only when this post is specifically ABOUT ArthaLeads or Vistrow Voice as a product (a review, comparison, feature walkthrough, or pricing post centred on it) - not merely mentioning it as one option among several. See REAL PRODUCT SCREENSHOTS below.",
            },
            screenshotGuidance: {
              type: "string",
              description:
                "When useRealProductScreenshot is true: name the exact real screen/feature to screenshot, drawn from the product facts below (e.g. 'the kanban lead pipeline with columns New, Contacted, Site Visit, Booked, Closed'). When false, an empty string.",
            },
            imageBrief: {
              type: "string",
              description:
                "1-2 sentences describing the real, specific artifact the featured image centres on (a named UI element, chart, or object - see the VISUAL REFERENCE BANK below), not a person at a screen - written for a human to go source or generate the image from.",
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
            "useRealProductScreenshot",
            "screenshotGuidance",
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

export type ExistingPost = { title: string; category?: string };

const STOPWORDS = new Set([
  "the", "a", "an", "for", "to", "of", "in", "on", "and", "or", "with", "what",
  "how", "why", "best", "top", "vs", "your", "you", "is", "are", "it", "this",
  "that", "actually", "real", "india", "indian",
]);

export function significantWords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w)),
  );
}

// A seed topic counts as "already covered" once a published title shares
// most of its meaningful words - this is what actually stops the model from
// re-serving the same evergreen idea reworded (e.g. "Marketing automation
// for small teams" -> "Marketing automation small teams: what to automate
// first"), which plain exact-title matching never caught.
export function overlapRatio(a: string, b: string): number {
  const wa = significantWords(a);
  const wb = significantWords(b);
  if (wa.size === 0 || wb.size === 0) return 0;
  let common = 0;
  for (const w of wa) if (wb.has(w)) common++;
  return common / Math.min(wa.size, wb.size);
}

function dropCoveredSeeds(seeds: TrendSignal[], existingTitles: string[]): TrendSignal[] {
  return seeds.filter((seed) => !existingTitles.some((title) => overlapRatio(seed.title, title) >= 0.6));
}

// Hard gate on the model's actual output, not just the seed list - catches a
// live signal (e.g. a Google Autocomplete suggestion) landing on a topic
// that's already been published, which the seed filter above can't see
// since it only filters the static PRODUCT_SEED_TOPICS/SERVICE_SEED_TOPICS.
function duplicateIssues(posts: GeneratedPost[], existingTitles: string[]): string[] {
  const issues: string[] = [];
  for (const post of posts) {
    const match = existingTitles.find((title) => overlapRatio(post.title, title) >= 0.6);
    if (match) {
      issues.push(
        `"${post.title}": this is too close to an already-published post ("${match}") - pick a genuinely different topic and focusKeyword, not a reworded version of the same idea.`,
      );
    }
  }
  for (let i = 0; i < posts.length; i++) {
    for (let j = i + 1; j < posts.length; j++) {
      if (overlapRatio(posts[i].title, posts[j].title) >= 0.6) {
        issues.push(`"${posts[i].title}" and "${posts[j].title}" are too similar to each other - make them genuinely different topics.`);
      }
    }
  }
  return issues;
}

export type CalendarTopic = {
  title: string;
  category: BlogCategory;
  focusKeyword: string;
  angle: string;
};

export async function generateDailyPosts({
  signals,
  existingPosts,
  count = 2,
  includeProductSeed = true,
  fixedTopics,
}: {
  signals: TrendSignal[];
  existingPosts: ExistingPost[];
  count?: number;
  // Set false to force picks from genuine trend signals only, excluding the
  // evergreen product-seo/service-seo seed topics - useful for manually
  // requesting a "trending news" post rather than a product/service-ranking one.
  includeProductSeed?: boolean;
  // When provided, the model writes the full post for these exact
  // pre-assigned topics instead of choosing its own - this is how the daily
  // cron consumes the 30-day content calendar so topics are decided once, in
  // one batch, instead of re-decided (and re-collided) every single day.
  fixedTopics?: CalendarTopic[];
}): Promise<GeneratedPost[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  count = fixedTopics?.length ?? count;

  const existingTitleList = existingPosts.map((p) => p.title);
  // Filter live signals too, not just the static seed pools - a Google
  // Autocomplete suggestion or Reddit thread can independently land on a
  // topic that's already been published, and offering it at all makes the
  // model gravitate back to it even after being told to pick something else.
  const freshSignals = dropCoveredSeeds(signals, existingTitleList);
  const freshSeeds = dropCoveredSeeds([...PRODUCT_SEED_TOPICS, ...SERVICE_SEED_TOPICS], existingTitleList);

  const signalsText = [...freshSignals.slice(0, 40), ...(includeProductSeed ? freshSeeds : [])]
    .map((s) => `- [${s.source}] ${s.title}${s.url ? ` - ${s.url}` : ""}`)
    .join("\n");

  const existingText = existingPosts.slice(0, 60).map((p) => p.title).join("\n- ") || "(none yet)";

  // Real category counts from the most recent posts - this is what actually
  // breaks the ArthaLeads/AI-voice repetition loop, by telling the model in
  // hard numbers which categories are starved instead of hoping it notices.
  const recentWindow = existingPosts.slice(0, 15);
  const categoryCounts = new Map<string, number>();
  for (const category of BLOG_CATEGORIES) categoryCounts.set(category, 0);
  for (const post of recentWindow) {
    if (post.category) categoryCounts.set(post.category, (categoryCounts.get(post.category) ?? 0) + 1);
  }
  const categoryCountsText = [...categoryCounts.entries()]
    .sort((a, b) => a[1] - b[1])
    .map(([category, count]) => `${category}: ${count}`)
    .join(", ");
  const starvedCategories = [...categoryCounts.entries()]
    .filter(([, count]) => count === 0)
    .map(([category]) => category);

  const schema = { ...responseSchema, schema: { ...responseSchema.schema, properties: { posts: { ...responseSchema.schema.properties.posts, minItems: count, maxItems: count } } } };

  const topicInstruction = fixedTopics
    ? `You have been assigned the exact ${fixedTopics.length} topic(s) below from Vistrow's pre-planned 30-day content calendar. Do not swap them for a different topic, category, or focusKeyword, and do not invent a new angle - that calendar was already checked against every existing post to guarantee it doesn't repeat anything, so deviating from it is what would reintroduce duplicates. Write the full post for each exactly as assigned, using the given angle as your opening hook or thesis:
${fixedTopics.map((t, i) => `${i + 1}. Title: "${t.title}" | Category: ${t.category} | focusKeyword: "${t.focusKeyword}" | Angle: ${t.angle}`).join("\n")}`
    : `Pick the ${count} most relevant topic(s) from the signals below - a mix of genuinely trending news and, where it fits, a [product-seo] evergreen topic (ranking ArthaLeads or Vistrow Voice) or a [service-seo] evergreen topic (ranking one of Vistrow's own digital marketing SERVICES - performance advertising, SEO, social media, landing pages, website development, creative strategy, conversion tracking, marketing automation). Everything you pick must genuinely fit one of the ${BLOG_CATEGORIES.length} blog categories and attract search traffic from people researching marketing, CRM, AI voice, or automation. Ignore anything off-topic (celebrity news, sports, politics, unrelated tech). Don't pick two [product-seo] topics for the same product on the same day, and don't pick two [service-seo] topics for the same specific service on the same day.

SIGNAL RELIABILITY - not all sources below are equally trustworthy for "will someone actually search this":
- [google-autocomplete] signals are real, currently-typed Google search queries - this is the strongest evidence of genuine search demand. When one of these fits a category you're targeting, prefer building your focusKeyword and angle around it over inventing one from scratch.
- [product-seo] and [service-seo] are evergreen topic ideas, not finished headlines. Use one as the SUBJECT to write about, but you MUST invent your own sharp, specific title, metaTitle, and focusKeyword angle - never reuse the seed topic's wording verbatim or as a light rewording (e.g. if the seed says "Marketing automation for small teams: what to automate first", do not publish "Marketing automation small teams: what to automate first" - find a genuinely different concrete angle, number, or tension within that subject instead).
- [reddit] and [hacker-news] reflect what people are discussing today, not necessarily what they search for later - treat them as a source of a real scenario, quote, or "why now" hook to open the post with, not as the literal topic or keyword unless the discussion clearly maps to a real search phrase.
- [google-news] is for genuine breaking developments worth reacting to quickly.

CATEGORY ROTATION - this is the single most important instruction, more important than any individual signal's relevance. Here is the real count of each category across the last ${recentWindow.length} published posts: ${categoryCountsText}.${starvedCategories.length ? ` The following categories have ZERO posts in that window and are being starved of coverage: ${starvedCategories.join(", ")} - today's picks MUST prioritize these unless there is truly no fitting signal or seed topic for them.` : ""} Never pick a category that already has 3 or more posts in that recent window unless every other option has been genuinely exhausted. Do not default to CRM & Automation or AI Voice out of habit - actively look for a Digital Marketing, Business Automation, Conversion Tracking, Lead Generation, or Strategy angle first when those are underrepresented above.`;

  const systemPrompt = `You are a senior writer on Vistrow's own content team, not an outside copywriter. Vistrow is a digital marketing and business automation company (performance advertising, lead generation, website development, CRM, AI voice calling, conversion tracking, marketing automation) serving real estate, local businesses, B2B, startups/SaaS, agencies, and education.

${topicInstruction}

ARTHALEADS PRODUCT FACTS - use these to write with real specificity instead of generic CRM language, whenever a post touches ArthaLeads: unified lead inbox pulling in Facebook Ads, Google Ads, WhatsApp, website forms, and portals (99acres, Housing.com, MagicBricks); AI lead scoring (0-100) that surfaces a "Hot Today" call list; AI-drafted personalised WhatsApp messages; a unique QR code per project for site hoardings/brochures/expo stalls; telecaller workflow with remarks, follow-up scheduling and call outcomes; automatic duplicate-lead detection across phone number formats; a Kanban lead pipeline (New, Contacted, Site Visit, Booked, Closed); booking-to-invoice conversion with auto GST calculation; an admin intelligence dashboard (stale-lead alerts, revenue forecast, agent clock-in status); role-based access for Admin/Manager/Agent; and Starter/Growth/Enterprise pricing tiers. Never invent a stat (like a specific customer count or uptime percentage) that isn't in this list - describe capabilities, not made-up numbers.

VISTROW VOICE PRODUCT FACTS - use these with the same real specificity whenever a post touches Vistrow Voice: inbound call handling that answers, qualifies, and routes or books the next step; outbound campaigns for reminders, follow-ups, and collections at scale; a website voice widget so visitors talk to the agent in-browser without sharing a phone number; conversation in 10 Indian languages including Hindi and Hinglish; low-latency, emotion-aware real-time conversation; a knowledge base grounded in uploaded PDFs/documents (retrieval-based, answers stay anchored to what's uploaded); a no-code agent builder for persona, prompts, voice, language, and business rules; CRM webhooks pushing leads, outcomes, and transcripts downstream; controlled escalation rules for when to route, book, or hand off to a human; and observable call history, analytics, and transcripts. Never invent a stat that isn't in this list.

REAL PRODUCT SCREENSHOTS vs AI ILLUSTRATIONS - set useRealProductScreenshot to true only when this post is specifically ABOUT ArthaLeads or Vistrow Voice as a product (a review, comparison, feature walkthrough, or pricing post centred on it), not merely mentioning the product as one option in passing. When true: write screenshotGuidance naming the exact real screen or feature to capture, drawn directly from the product facts above (e.g. "the kanban lead pipeline with columns New, Contacted, Site Visit, Booked, Closed" or "the no-code agent builder's persona and language configuration screen") - specific enough that someone can go open the real product and screenshot exactly that, not a vague "the dashboard". Still fill imageGenerationPrompt with a short fallback illustration prompt (following the IMAGE PROMPT FORMAT below) in case no screenshot is available, but screenshotGuidance is the primary instruction in that case. For every other post - general marketing, SEO, CRM, or AI-voice advice not centred on a specific Vistrow product - set useRealProductScreenshot to false, leave screenshotGuidance as an empty string, and rely on the full illustration prompt as usual.

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
- External: use 0-2 links. When a post depends on a supplied trending signal, cite the exact signal URL printed above. For evergreen product-led topics, link only to a stable primary-source homepage or official documentation URL you know is valid. Never invent a deep article URL.
- Spread links across different sections. Don't link the same page twice. Make the anchor text the natural words already in the sentence, not "click here".

BULLET LISTS - never write a bullet list as dashes or a numbered list inside a paragraph string (no "- item one\n- item two" inside "paragraphs"). If a section needs a list, put each item as its own entry in that section's "points" array instead, and keep "paragraphs" as normal prose sentences only.

4-6 sections, first section has an empty heading (it's the intro, no linking needed there). 2-4 paragraphs per section, each paragraph 2-4 sentences - this is not padding, it's what gets the body past the word-count requirement below.

SEO REQUIREMENTS - these are checked by an automated scorer with hard pass/fail rules, not style suggestions:
1. Pick focusKeyword FIRST: a HARD MAXIMUM of 4 words, a real phrase someone would actually search (e.g. "AI voice calling India" or "real estate CRM software"). Never copy a topic or headline verbatim as the keyword even if it's longer - extract the short core phrase from it instead (from a topic like "Best AI voice calling agent for Indian businesses", the keyword is "AI voice calling agent" or "AI voice calling India", NOT the full 8-word topic). Then make title, metaTitle, and metaDescription each literally contain that exact short phrase, word for word - not a rephrasing or synonym.
2. metaTitle must be 30-60 characters. metaDescription must be 120-160 characters - count the characters before finalizing, both are hard limits.
3. The article body (all paragraphs across all sections, combined) must be at least 320 words. Headings and "points" don't count toward this - the paragraphs alone must reach it.
4. The exact focusKeyword phrase MUST appear literally, word for word, at least once in the body paragraphs (not just in the title/meta fields) - zero mentions in the body always fails, this is never optional. Be sparing about how many more: for a 3-4 word keyword, exactly ONE mention total in the body is correct - do not add a second. For a 2-word keyword, 2-3 mentions total in the body is fine. The density formula is (mentions x keyword-word-count x 100 / total-body-words) and it must land between 0.5% and 2.5%.

IMAGE PROMPT FORMAT - imageGenerationPrompt must be one long, detailed, paste-ready prompt for ChatGPT/DALL-E that someone will actually run to generate the image, written as flowing sentences (not labelled fields), covering every point below in order:

1. Subject and scene - THIS IS THE PART THAT KEEPS COLLAPSING TO THE SAME IMAGE, SO READ CAREFULLY. Banned as the subject, in any phrasing: a person standing or sitting at a laptop/screen/dashboard in an office (with or without charts visible). That composition has been used for almost every recent post regardless of topic and must not be the default again. Instead, ground the scene in a REAL, SPECIFIC ARTIFACT belonging to the exact subject of this post - describe an actual interface, document, or physical object precisely enough that it reads as authentic, not a generic "tech concept": a table's visible row/column structure, a kanban board's column layout, a chart's shape and what its axes represent, a specific physical object (a printed ad proof, a QR code sign, a stack of business cards, a phone showing a chat thread) - see the VISUAL REFERENCE BANK below for the exact real details to draw from for this topic's category. A person can still appear, but only as a secondary element glancing at or holding the real artifact - the artifact itself is the subject, not the person.
2. CRITICAL - describe STRUCTURE, never literal words: image generators render any word, column header, axis label, or number you specify as garbled, broken text - this has actually happened and looks unprofessional. So describe the visual shape a label would occupy (a short blank pill, a rounded tag, a colored chip) instead of what it says, and describe data as bar length / dot position / line trend / color intensity instead of specific numbers. Wrong: "a table with columns labeled Campaign, Spend, and Conversions, showing 0.88 and 0.69". Right: "a table with three columns, each header shown as a short blank rounded tag, and a column of horizontal bars of varying length in place of numbers". This structural-only rule applies to every artifact in this prompt, not just tables. The same discipline applies to "blank" placeholder shapes generally: when a reference calls for a blank rectangle, thumbnail, or card, it must render as a plain flat color block only - never invent an icon, symbol, or picture to put inside it just because the surrounding description mentions variety or different designs.
3. Visual style: "modern flat vector illustration with clean geometric shapes and simple gradients" by default - switch to a photorealistic editorial-photo style only if the topic is genuinely better served by a real-feeling scene.
4. Color palette - choose ONE of these based on what the post is actually about, and use the wording given almost verbatim:
${BRAND_PALETTES}
5. Lighting and mood: describe it in one clause (e.g. "soft, even daylight, calm and focused mood" or "warm interior lighting, energetic and optimistic mood") - match the mood to the post's argument.
6. Composition: wide 16:9 landscape framing, the artifact placed slightly off-center with breathing room, no crowded detail.
7. End the prompt with exactly this sentence, unchanged: "16:9 aspect ratio. No text, no words, no letters, no numbers, no logos, no brand marks, no watermarks anywhere in the image - represent labels as blank shapes and data as bar length or position, never as legible characters."

VISUAL REFERENCE BANK - real, specific, recognizable STRUCTURES to build the scene from, by topic area (describe the shape and layout only, never the literal words on them - see rule 2 above; never invent a trademarked logo or exact brand color scheme either, describing the generic shape of the real thing the way any stock illustration of "a CRM" or "an ad dashboard" does, without reproducing an actual company's exact UI):
- Performance advertising / Google Ads / Meta Ads: a table with four columns of blank header tags and rows of horizontal bars of varying length; a funnel shape narrowing through three or four stages; a line trending down across a small grid; a split-screen of two ad platforms' distinct layouts (one card-based, one table-based) side by side, both with blank label tags.
- SEO / content: a ranking table with position markers (numbered dots or short bars, not legible numbers) and up/down triangle arrows; a backlink network shown as connected nodes; a search-results-page mockup with blank ranked listing bars (no real brand names or legible text); a content calendar grid of blank date cells.
- Social media marketing: a content calendar grid with blank post-thumbnail placeholders and small time-tag chips; a set of platform-shaped post cards (square, vertical, and landscape framing side by side) with engagement icons (heart, comment, share) but no real logos or counts; an audience growth line trending upward.
- Landing pages / website development / conversion tracking: a browser window mockup showing a landing page layout (a blank headline bar, a form of blank input rows, a solid-color CTA button) with a cursor mid-click; an A/B split of two page layouts side by side; a funnel narrowing through three stages; a speed gauge/meter needle.
- Marketing automation / creative strategy: a flowchart of connected blank boxes representing a workflow, linked by arrows; a grid of solid-color rectangles of varying flat colors (from the chosen palette only) laid out like a mood board - each rectangle a plain flat color block, never an icon, symbol, or picture inside it; a chat-bubble sequence with blank bubble shapes showing an automated message thread (generic app, no real logo).
- CRM & Automation / ArthaLeads: a kanban board with five columns of card stacks (blank header tags, increasing card count left to right); a lead-scoring gauge/dial beside a contact card silhouette; a unified inbox with message rows tagged by generic channel icons and blank subject bars; a QR code shape on a printed property hoarding.
- AI Voice / Vistrow Voice: a soundwave or waveform pattern mid-conversation; a call-log list of rows with a duration bar and a colored outcome dot per row; two chat bubbles side by side filled with abstract squiggle-line "script" shapes (never real words, never a real script/alphabet); never a literal phone handset, headset close-up, or a glowing circuit-board "AI brain" cliché.
- Business Automation / Lead Generation general: a pipeline/funnel diagram with three or four blank-tagged stages; a form with blank field-row rectangles and a solid CTA button; a stack of notification/alert cards with a colored dot per card; an arrow showing rows of a spreadsheet grid turning into stacked automation cards.
- Strategy / general company posts: a roadmap or timeline with circular milestone markers; a magnifying glass over a blank-row data table; a before/after split of a tangled arrow-diagram versus a clean connected one, shown as two contrasting diagrams rather than two people.

${fixedTopics ? "" : `TRENDING SIGNALS (raw, unfiltered - use judgement):\n${signalsText}\n\n`}EXISTING POST TITLES (avoid duplicating):
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
    const duplicateProblems = duplicateIssues(parsed.posts, existingTitleList);

    if ((allHaveLinks && noBakedLists && seoProblems.length === 0 && duplicateProblems.length === 0) || attempt === 3) return parsed.posts;

    const problems = [
      !allHaveLinks && "At least one post has zero [text](url) Markdown links in its paragraphs.",
      !noBakedLists && "At least one paragraph contains a bullet list written as dashes/lines instead of using the \"points\" array.",
      ...seoProblems,
      ...duplicateProblems,
    ]
      .filter(Boolean)
      .join(" ");

    const rewriteInstruction = duplicateProblems.length > 0
      ? `${problems} For any post flagged as a duplicate, pick a completely different topic and focusKeyword from the signals/seeds above - do not just reword the same idea. Fix every other issue listed too. Re-check character counts and word counts yourself before answering. Return the full JSON again.`
      : `${problems} Rewrite ALL posts, keeping the same topics, fixing every issue listed above exactly. Re-check character counts and word counts yourself before answering. Return the full JSON again.`;

    messages.push(
      { role: "assistant", content: raw },
      { role: "user", content: rewriteInstruction },
    );
  }

  throw new Error("unreachable");
}
