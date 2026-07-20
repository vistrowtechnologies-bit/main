import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export type Outcome = { stat: string; label: string; body?: string };

export function Outcomes({
  eyebrow = "Outcomes",
  title = "What good looks like",
  items,
}: {
  eyebrow?: string;
  title?: string;
  items: Outcome[];
}) {
  return (
    <section className="py-section">
      <div className="container-edge">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mb-12" />
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="h-full rounded-lg border border-line bg-card p-8 text-center shadow-soft">
                <p className="font-display text-metric text-accent-strong">{item.stat}</p>
                <p className="mt-3 font-sans text-sm font-bold text-ink">{item.label}</p>
                {item.body && (
                  <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{item.body}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Integration / tool chips. */
export function Chips({
  eyebrow = "Tools & integrations",
  title = "Fits your existing stack",
  items,
}: {
  eyebrow?: string;
  title?: string;
  items: string[];
}) {
  return (
    <section className="border-t border-line bg-surface py-section">
      <div className="container-edge text-center">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mb-10" />
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line bg-card px-4 py-2 font-sans text-sm font-medium text-ink-2"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
