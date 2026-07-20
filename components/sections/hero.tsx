import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroDashboard } from "@/components/sections/hero-dashboard";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:radial-gradient(rgb(var(--muted)/0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="container-edge grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="max-w-2xl animate-rise-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-tint/40 px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-strong" />
            <span className="font-sans text-xs font-semibold text-accent-strong">
              Marketing + systems, connected
            </span>
          </div>

          <h1 className="mt-6 font-display text-hero-lg text-ink">
            Digital marketing that connects directly to{" "}
            <span className="relative whitespace-nowrap text-accent-strong">
              business growth
              <span className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-accent/50" />
            </span>
            .
          </h1>

          <p className="mt-6 max-w-[620px] font-sans text-lg leading-[1.65] text-muted">
            Vistrow combines performance marketing, landing pages, CRM, AI voice,
            automation, and conversion tracking to help businesses generate more
            opportunities—and manage them more effectively.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/growth-audit" className="btn-primary px-8 py-4 text-base">
              Book a Growth Audit
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </Link>
            <Link href="/digital-marketing" className="btn-secondary px-8 py-4 text-base">
              Explore Services
            </Link>
          </div>
        </div>

        <div className="relative lg:pl-4">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
