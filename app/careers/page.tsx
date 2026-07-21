import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Globe2, TrendingUp, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers at Vistrow Technologies",
  description:
    "Explore remote-first careers at Vistrow across performance marketing, business automation, AI voice, product design, and software engineering.",
  path: "/careers",
});

const perks = [
  { icon: Globe2, title: "Remote-first", body: "Work from where you do your best thinking." },
  { icon: TrendingUp, title: "Real ownership", body: "Meaningful problems and room to shape the solution." },
  { icon: Sparkles, title: "Modern stack", body: "Marketing, automation, and product built with current tools." },
  { icon: Heart, title: "Honest culture", body: "Straight talk, no fake urgency, high standards." },
];

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        eyebrow="Careers"
        title="Build the systems behind"
        highlight="growth"
        subtitle="We're a small, senior team building the marketing and technology systems that turn attention into revenue. If that sounds like your kind of work, we'd like to hear from you."
        primaryCta={{ label: "Introduce yourself", href: "/contact" }}
        secondaryCta={{ label: "About Vistrow", href: "/about" }}
      />

      <FeatureCards eyebrow="Why Vistrow" title="What it's like to work here" items={perks} columns={4} surface />

      <section className="py-section">
        <div className="container-edge">
          <SectionHeading eyebrow="Open roles" title="Current openings" align="center" className="mb-10" />
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-line bg-card p-10 text-center">
              <p className="font-display text-lg font-bold text-ink">No open roles right now</p>
              <p className="mx-auto mt-2 max-w-md font-sans text-muted">
                We hire ahead of need. If you&apos;re excellent at performance marketing,
                automation, or product engineering, send us your details and we&apos;ll keep you
                in mind.
              </p>
              <Link href="/contact" className="btn-primary mt-6">
                Send your details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
