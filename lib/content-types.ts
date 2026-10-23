import type { LucideIcon } from "lucide-react";
import type { Feature } from "@/components/sections/feature-cards";
import type { Step } from "@/components/sections/steps";
import type { Outcome } from "@/components/sections/outcomes";
import type { QA } from "@/components/sections/faq";

export type { Feature, Step, Outcome, QA };

export type ShowcaseShot = { src: string; alt: string; caption: string; width: number; height: number; href?: string; /** "browser" wraps a raw app screen, "none" shows an image that already has its own device frame; otherwise a rounded card. */ frame?: "browser" | "none" };

export type ServiceContent = {
  slug: string;
  title: string;
  highlight?: string;
  eyebrow: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  problem: { title: string; body: string; points: string[] };
  outcomes: Outcome[];
  included: string[];
  features?: Feature[];
  steps: Step[];
  tools: string[];
  faqs: QA[];
  image?: { src: string; alt: string };
  /** Real screens or real client work for this service (never mockups): the first is shown large. */
  showcase?: { eyebrow: string; title: string; body: string; shots: ShowcaseShot[] };
  /** Real screen for the hero; defaults to the first showcase shot. */
  heroShot?: ShowcaseShot;
  /** H1 text when it should differ from the short title used in breadcrumbs and headings. */
  heroTitle?: string;
  costGuide?: CostGuide;
};

export type CostGuide = { title: string; body: string; factors: { label: string; body: string }[] };

export type IndustryContent = {
  slug: string;
  title: string;
  highlight?: string;
  eyebrow: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  challenges: Feature[];
  solution: { title: string; body: string; points: string[] };
  services: { label: string; href: string }[];
  workflow: Step[];
  faqs: QA[];
  image?: { src: string; alt: string };
};

export type LocationContent = {
  slug: string;
  title: string;
  area: string;
  nearby: string[];
  eyebrow: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  reasons: Feature[];
  localContext: { title: string; paragraphs: string[] };
  businessTypes: { label: string; body: string; href: string }[];
  visibility: { title: string; body: string; points: string[] };
  solution: { title: string; body: string; points: string[] };
  services: { label: string; href: string }[];
  process: Step[];
  faqs: QA[];
  hasOffice?: boolean;
  image?: { src: string; alt: string };
};

export type ProductContent = {
  slug: string;
  name: string;
  tagline: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  useCases: Feature[];
  features: Feature[];
  howItWorks: Step[];
  integrations: string[];
  security: Feature[];
  demoCta?: string;
  externalUrl?: string;
  externalLabel?: string;
  faqs?: QA[];
  /** Real product screens: the first is shown large, a portrait phone screen sits beside it. */
  screenshots?: { src: string; alt: string; title: string; body: string; width: number; height: number; /** Image already includes a device frame. */ bare?: boolean }[];
  /** A sample call shown as a transcript; must be labelled when it is a written script, not a recording. */
  demoCall?: {
    title: string;
    body: string;
    language: string;
    label: string;
    turns: { speaker: "agent" | "caller"; text: string }[];
    saved: { label: string; value: string }[];
    href?: string;
  };
  languages?: { title: string; body: string; items: { native: string; name: string }[] };
  plans?: { title: string; body: string; note: string; items: { name: string; summary: string; features: string[] }[] };
  preview?: {
    stats: { value: string; label: string }[];
    rows: { label: string; value: string }[];
  };
};

export type OverviewCard = {
  label: string;
  href: string;
  body: string;
  icon?: LucideIcon;
};

export type OverviewContent = {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  cards: OverviewCard[];
  cardsTitle?: string;
  intro?: { eyebrow?: string; title: string; body: string; points: string[]; image?: { src: string; alt: string } };
  process?: Step[];
  faqs?: QA[];
};

export type LegalContent = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[]; /** optional anchor, e.g. "data-deletion" */ id?: string }[];
};

export type BlogSectionImage = { url: string; alt?: string; caption?: string; width?: number; height?: number };
export type BlogSectionTable = { caption?: string; columns?: string[]; rows: string[][] };
export type BlogSectionStep = { title: string; body?: string };
export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  points?: string[];
  image?: BlogSectionImage;
  table?: BlogSectionTable;
  steps?: BlogSectionStep[];
};

export type BlogSeoImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  keyTakeaways?: string[];
  faqs?: { question: string; answer: string }[];
  category: string;
  author: string;
  date: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  breadcrumbTitle?: string;
  canonicalUrl?: string;
  schemaType?: "BlogPosting" | "Article" | "NewsArticle";
  dateModified?: string;
  featuredImage?: BlogSeoImage;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: BlogSeoImage;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: BlogSeoImage;
  twitterCard?: "summary" | "summary_large_image";
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  robotsNoArchive?: boolean;
  robotsNoImageIndex?: boolean;
  robotsNoSnippet?: boolean;
  robotsMaxSnippet?: number;
  robotsMaxVideoPreview?: number;
  robotsMaxImagePreview?: "none" | "standard" | "large";
  excludeFromSitemap?: boolean;
  redirectUrl?: string;
  redirectPermanent?: boolean;
  sections: BlogSection[];
};
