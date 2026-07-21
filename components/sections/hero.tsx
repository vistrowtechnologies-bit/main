import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroDashboard } from "@/components/sections/hero-dashboard";
import { Reveal } from "@/components/ui/reveal";
import { RotatingWord, ScrollParallax } from "@/components/ui/motion-primitives";
import BlurText from "@/components/ui/blur-text";

const heroRotatingWords = ["business growth", "qualified leads", "real revenue", "closed deals"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:radial-gradient(rgb(var(--muted)/0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="container-edge grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="max-w-2xl">
          <Reveal direction="right" distance={18} duration={0.5}>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-tint/40 px-3 py-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent-strong" />
              <span className="font-sans text-xs font-semibold text-accent-strong">
                Marketing + systems, connected
              </span>
            </div>
          </Reveal>

          <h1 className="mt-6 font-display text-hero-lg text-ink">
            <BlurText
              as="span"
              text="Digital marketing that connects directly to"
              delay={72}
              stepDuration={0.32}
              direction="top"
            />{" "}
            <span className="whitespace-nowrap">
              <span className="relative isolate inline-block px-[0.08em] text-accent-ink">
                <span
                  aria-hidden
                  className="absolute -inset-x-[0.04em] inset-y-[0.08em] -z-10 rotate-[-0.8deg] rounded-[0.12em] bg-accent shadow-[0_0_28px_rgb(var(--accent)/0.22)]"
                />
                <RotatingWord words={heroRotatingWords} />
              </span>
              .
            </span>
          </h1>

          <Reveal delay={0.16} direction="right" distance={24}>
            <p className="mt-6 max-w-[620px] font-sans text-lg leading-[1.65] text-muted">
              Vistrow combines performance marketing, landing pages, CRM, AI voice,
              automation, and conversion tracking to help businesses generate more
              opportunities - and manage them more effectively.
            </p>
          </Reveal>

          <Reveal delay={0.24} direction="right" distance={18}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/growth-audit" className="btn-primary px-8 py-4 text-base">
                Book a Growth Audit
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </Link>
              <Link href="/services" className="btn-secondary px-8 py-4 text-base">
                Explore Services
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14} direction="left" distance={36} className="relative lg:pl-4">
          <ScrollParallax distance={28}>
            <HeroDashboard />
          </ScrollParallax>
        </Reveal>
      </div>
    </section>
  );
}
