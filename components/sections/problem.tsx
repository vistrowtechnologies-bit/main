import { Reveal } from "@/components/ui/reveal";

const gaps = [
  "Slow responses",
  "Disconnected CRM",
  "Missed follow-ups",
  "Poor lead visibility",
  "Weak tracking",
  "No link between marketing and revenue",
];

export function Problem() {
  return (
    <section className="relative overflow-hidden py-section">
      <div className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-[110px]" />
      <div className="container-edge text-center">
        <Reveal className="mx-auto max-w-4xl">
          <h2 className="font-display text-h2 text-ink">
            Running ads is easy.{" "}
            <span className="text-muted/50">Building a system that converts is harder.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-lg leading-relaxed text-muted">
            Marketing performs better when the system behind it is connected. We engineer
            the whole journey—from the first touchpoint to the closed deal.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {gaps.map((gap) => (
            <Reveal
              key={gap}
              direction="scale"
              delay={0.08 + gaps.indexOf(gap) * 0.055}
            >
              <span className="block rounded-full border border-line bg-card px-4 py-2 font-sans text-sm font-medium text-ink-2 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/50 hover:text-ink">
                {gap}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
