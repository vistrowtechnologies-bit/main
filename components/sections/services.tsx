import Link from "next/link";
import { LineChart, Cog, ChevronRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedBar, TiltCard } from "@/components/ui/motion-primitives";

const smallCards = [
  {
    title: "Lead Generation",
    body: "High-intent pipeline from the channels your buyers actually use.",
  },
  {
    title: "CRM & Follow-Up",
    body: "Every lead captured, scored, and routed—no opportunity dropped.",
  },
  {
    title: "Conversion Tracking",
    body: "Executive-level reporting that shows where every rupee is working.",
  },
];

export function Services() {
  return (
    <section className="bg-surface py-section">
      <div className="container-edge">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-xl">
            <span className="eyebrow">Solutions ecosystem</span>
            <h2 className="mt-4 font-display text-h2 text-ink">
              From campaigns to CRM, follow-ups, and conversion
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <Link href="/digital-marketing" className="btn-ghost">
              Explore all services <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-gutter md:grid-cols-12">
          {/* Digital Marketing — large glass card */}
          <Reveal className="md:col-span-8">
            <TiltCard className="h-full">
            <div className="glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-lg p-8 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-accent shadow-soft">
                <LineChart className="h-7 w-7 text-accent-ink" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-display text-h3 text-ink">Digital Marketing</h3>
              <p className="mt-3 max-w-md font-sans text-base leading-relaxed text-muted">
                Data-driven performance marketing focused on ROI. We manage search,
                social, and display to maximise qualified lead volume and quality.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Omni-channel performance strategy",
                  "Real-time conversion tracking",
                  "Landing pages & A/B testing",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-accent-strong" strokeWidth={2} />
                    <span className="font-sans text-sm font-medium text-ink-2">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            </TiltCard>
          </Reveal>

          {/* Business Automation — inverse (carbon) card */}
          <Reveal delay={0.08} className="md:col-span-4">
            <TiltCard className="h-full">
            <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-inverse p-8 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-accent shadow-[0_0_28px_rgb(var(--accent)/0.24)]">
                <Cog className="h-7 w-7 text-accent-ink" strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-display text-h3 text-inverse-ink">
                Business Automation
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-inverse-ink-2">
                Automate what happens after a lead is generated—CRM, calls, and
                follow-up handled without adding headcount.
              </p>
              <div className="mt-auto space-y-3 pt-8">
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <AnimatedBar width="75%" className="h-full rounded-full bg-accent" />
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <AnimatedBar width="50%" delay={0.12} className="h-full rounded-full bg-accent/70" />
                </div>
              </div>
            </div>
            </TiltCard>
          </Reveal>

          {/* three small glass cards */}
          {smallCards.map((card, i) => (
            <Reveal key={card.title} delay={0.05 * i} className="md:col-span-4">
              <TiltCard className="h-full">
              <div className="glass glass-hover h-full rounded-lg p-7">
                <h4 className="font-display text-lg font-bold text-ink">{card.title}</h4>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
              </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
