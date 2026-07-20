import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { CtaLink } from "@/components/sections/page-hero";

export function CtaBand({
  title = "Find the gaps between your marketing and sales process.",
  subtitle = "A Growth Audit maps your funnel, spend, and tech stack—and shows exactly where opportunities leak.",
  primaryCta = { label: "Book a Growth Audit", href: "/growth-audit" },
  secondaryCta = { label: "Talk to Vistrow", href: "/contact" },
}: {
  title?: string;
  subtitle?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
}) {
  return (
    <section className="px-5 pb-section sm:px-8">
      <div className="mx-auto max-w-container">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-2xl border-2 border-accent/20 p-10 sm:p-14 lg:p-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-[100px]" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display text-h2 text-ink">{title}</h2>
              <p className="mt-5 font-sans text-lg leading-relaxed text-muted">{subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={primaryCta.href} className="btn-primary px-8 py-4 text-base">
                  {primaryCta.label}
                  <ArrowRight className="h-5 w-5" strokeWidth={2} />
                </Link>
                <Link href={secondaryCta.href} className="btn-secondary px-8 py-4 text-base">
                  {secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
