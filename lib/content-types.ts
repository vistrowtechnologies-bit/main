import type { LucideIcon } from "lucide-react";
import type { Feature } from "@/components/sections/feature-cards";
import type { Step } from "@/components/sections/steps";
import type { Outcome } from "@/components/sections/outcomes";
import type { QA } from "@/components/sections/faq";

export type { Feature, Step, Outcome, QA };

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
};

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
  solution: { title: string; body: string; points: string[] };
  services: { label: string; href: string }[];
  process: Step[];
  faqs: QA[];
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
  intro?: { eyebrow?: string; title: string; body: string; points: string[] };
  process?: Step[];
  faqs?: QA[];
};

export type LegalContent = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

export type BlogSection = { heading?: string; paragraphs: string[]; points?: string[] };

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
