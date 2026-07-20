import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export type Step = { title: string; body: string };

export function Steps({
  eyebrow = "How it works",
  title = "A clear, repeatable process",
  steps,
  surface = false,
}: {
  eyebrow?: string;
  title?: string;
  steps: Step[];
  surface?: boolean;
}) {
  return (
    <section className={`py-section ${surface ? "bg-surface" : ""}`}>
      <div className="container-edge">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mb-14" />
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07}>
              <div className="relative h-full rounded-lg border border-line bg-card p-6">
                <span className="font-display text-4xl font-extrabold text-accent-strong/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
