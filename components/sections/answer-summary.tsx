import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type SummaryGroup = {
  label: string;
  items: string[];
};

export function AnswerSummary({
  question,
  answer,
  groups,
}: {
  question: string;
  answer: string;
  groups: SummaryGroup[];
}) {
  return (
    <section className="border-b border-line bg-surface py-section" aria-labelledby="answer-summary-title">
      <div className="container-edge">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Quick answer</span>
            <h2 id="answer-summary-title" className="mt-3 font-display text-h2 text-ink">
              {question}
            </h2>
            <p className="mt-5 font-sans text-lg leading-relaxed text-muted">{answer}</p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-gutter md:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.06}>
              <div className="h-full rounded-lg border border-line bg-card p-6">
                <h3 className="font-display text-base font-bold text-ink">{group.label}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-ink-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
