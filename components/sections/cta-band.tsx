import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { CtaLink } from "@/components/sections/page-hero";

export function CtaBand({
  title = "Find the gaps between your marketing and sales process.",
  subtitle = "A Growth Audit maps your funnel, spend, and tech stack - and shows exactly where opportunities leak.",
  primaryCta = { label: "Request a Growth Audit", href: "/growth-audit" },
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
                <CtaAction cta={primaryCta} primary />
                <CtaAction cta={secondaryCta} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CtaAction({ cta, primary = false }: { cta: CtaLink; primary?: boolean }) {
  const className = primary
    ? "btn-primary px-8 py-4 text-base"
    : "btn-secondary px-8 py-4 text-base";
  const content = (
    <>
      {cta.label}
      {primary &&
        (cta.external ? (
          <ExternalLink className="h-4 w-4" strokeWidth={2} />
        ) : (
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        ))}
    </>
  );

  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={className}>
      {content}
    </Link>
  );
}
