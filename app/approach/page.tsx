import type { Metadata } from "next";
import { Search, Map, Wrench, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Steps } from "@/components/sections/steps";
import { FeatureCards } from "@/components/sections/feature-cards";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "How Vistrow works: audit, plan, build, improve—connecting marketing to the systems that convert.",
};

const principles = [
  { icon: Search, title: "Start with the gaps", body: "We audit before we act, so effort goes where it matters." },
  { icon: Map, title: "Design the system", body: "We plan marketing and the systems behind it together." },
  { icon: Wrench, title: "Build to connect", body: "Every piece wired into CRM, follow-up, and tracking." },
  { icon: TrendingUp, title: "Improve on evidence", body: "We optimise against pipeline and revenue, not guesswork." },
];

const steps = [
  { title: "Audit", body: "We map your funnel, spend, tools, and lead flow to find where opportunities leak." },
  { title: "Plan", body: "We prioritise the highest-impact fixes and design the connected system." },
  { title: "Build", body: "We implement marketing, CRM, automation, and tracking as one engine." },
  { title: "Improve", body: "We optimise continuously against pipeline and revenue outcomes." },
];

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Approach" }]}
        eyebrow="Our Approach"
        title="Audit. Plan. Build."
        highlight="Improve."
        subtitle="A simple, repeatable method for connecting marketing to conversion—so growth is engineered, measured, and improvable rather than left to chance."
        secondaryCta={{ label: "About Vistrow", href: "/about" }}
      />
      <Steps eyebrow="The method" title="How every engagement runs" steps={steps} />
      <FeatureCards eyebrow="Principles" title="What guides the work" items={principles} columns={4} surface />
      <CtaBand />
    </>
  );
}
