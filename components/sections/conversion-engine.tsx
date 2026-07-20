import { Magnet, Target, MessageSquare, ClipboardCheck, RefreshCw, BadgeDollarSign } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  { label: "Attract", desc: "Targeted acquisition", icon: Magnet },
  { label: "Capture", desc: "Optimised funnels", icon: Target },
  { label: "Respond", desc: "Instant outreach", icon: MessageSquare },
  { label: "Qualify", desc: "AI-driven sorting", icon: ClipboardCheck },
  { label: "Follow Up", desc: "Nurture sequences", icon: RefreshCw },
  { label: "Convert", desc: "Measured ROI", icon: BadgeDollarSign, active: true },
];

export function ConversionEngine() {
  return (
    <section className="overflow-hidden py-section">
      <div className="container-edge">
        <div className="text-center">
          <Reveal className="mx-auto max-w-2xl">
            <span className="eyebrow">The connected process</span>
            <h2 className="mt-4 font-display text-h2 text-ink">
              The Vistrow Conversion Engine
            </h2>
            <p className="mt-4 font-sans text-lg text-muted">
              One connected methodology from first click to closed deal.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-8 -z-10 hidden h-[2px] bg-line lg:block" />
          <ol className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, i) => (
              <Reveal key={step.label} delay={i * 0.06} className="flex flex-col items-center text-center">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 ${
                    step.active
                      ? "border-accent bg-accent shadow-[0_0_28px_rgb(var(--accent)/0.4)]"
                      : "border-line bg-card"
                  }`}
                >
                  <step.icon
                    className={step.active ? "text-accent-ink" : "text-accent-strong"}
                    height={24}
                    width={24}
                    strokeWidth={1.75}
                  />
                </div>
                <h3
                  className={`mt-4 font-sans text-sm font-bold ${
                    step.active ? "text-accent-strong" : "text-ink"
                  }`}
                >
                  {step.label}
                </h3>
                <p className="mt-1 font-sans text-xs text-muted">{step.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
