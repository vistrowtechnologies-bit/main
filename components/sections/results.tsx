import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/motion-primitives";

const stats = [
  {
    value: "Seconds",
    label: "Lead response target",
    body: "Automated routing and voice workflows can begin as soon as a qualified enquiry arrives.",
  },
  {
    value: "24/7",
    label: "Voice and workflow coverage",
    body: "Vistrow Voice and connected automations can handle nights, weekends, and volume spikes.",
  },
  {
    value: "End-to-end",
    label: "Operational visibility",
    body: "Connect campaign source, response, qualification, CRM stage, and outcome in one journey.",
  },
];

export function Results() {
  return (
    <section className="py-section">
      <div className="container-edge">
        <Reveal className="text-center">
          <span className="eyebrow">What the system is built for</span>
          <h2 className="mt-4 font-display text-h2 text-ink">Faster response. Cleaner operations. Better visibility.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-gutter md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} direction="scale">
              <TiltCard className="h-full">
              <div className="h-full rounded-lg border border-line bg-card p-8 text-center shadow-soft">
                <p className="font-display text-metric text-accent-strong">
                  {stat.value}
                </p>
                <p className="mt-3 font-sans text-sm font-bold text-ink">{stat.label}</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{stat.body}</p>
              </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
