import { Reveal } from "@/components/ui/reveal";

const stats = [
  {
    value: "3.1×",
    label: "Average ROI increase",
    body: "Across active growth partners within the first six months of a connected system.",
  },
  {
    value: "12s",
    label: "Median response time",
    body: "Automated response to new leads in seconds—when intent is highest.",
  },
  {
    value: "40M+",
    label: "Attributed revenue",
    body: "Tracked through integrated CRM workflows across client campaigns.",
  },
];

export function Results() {
  return (
    <section className="py-section">
      <div className="container-edge">
        <Reveal className="text-center">
          <span className="eyebrow">Proof</span>
          <h2 className="mt-4 font-display text-h2 text-ink">Real numbers. Verified growth.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-gutter md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="h-full rounded-lg border border-line bg-card p-8 text-center shadow-soft">
                <p className="font-display text-metric text-accent-strong">{stat.value}</p>
                <p className="mt-3 font-sans text-sm font-bold text-ink">{stat.label}</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{stat.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center font-sans text-xs text-muted">
          Illustrative figures shown for layout. Replace with verified client results.
        </p>
      </div>
    </section>
  );
}
