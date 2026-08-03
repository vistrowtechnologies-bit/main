import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ScrollParallax } from "@/components/ui/motion-primitives";

export function FinalCta() {
  return (
    <section className="px-5 pb-section sm:px-8">
      <div className="mx-auto max-w-container">
        <Reveal>
          <ScrollParallax distance={16}>
          <div className="glass relative overflow-hidden rounded-2xl border-2 border-accent/20 p-10 sm:p-14 lg:p-20">
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-[100px]" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display text-h2 text-ink">
                Find the gaps between your marketing and sales process.
              </h2>
              <p className="mt-5 font-sans text-lg leading-relaxed text-muted">
                A Growth Audit is a deep-dive into your funnel, spend, and tech stack. We
                map exactly where opportunities leak - and how to connect the system.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/growth-audit" className="btn-primary px-8 py-4 text-base">
                  Request a Growth Audit
                  <ArrowRight className="h-5 w-5" strokeWidth={2} />
                </Link>
                <Link href="/contact" className="btn-secondary px-8 py-4 text-base">
                  Talk to Vistrow
                </Link>
              </div>
            </div>
          </div>
          </ScrollParallax>
        </Reveal>
      </div>
    </section>
  );
}
