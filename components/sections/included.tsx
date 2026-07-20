import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/** Two-column checklist, e.g. "What's included". */
export function Included({
  eyebrow = "What's included",
  title,
  description,
  items,
  surface = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  items: string[];
  surface?: boolean;
}) {
  return (
    <section className={`py-section ${surface ? "bg-surface" : ""}`}>
      <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <Reveal>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-line pb-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" strokeWidth={2} />
                <span className="font-sans text-[15px] text-ink-2">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
