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
};

export type LegalContent = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};
