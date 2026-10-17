import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export type Feature = { icon?: LucideIcon; title: string; body: string };

export function FeatureCards({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  surface = false,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: Feature[];
  columns?: 2 | 3 | 4;
  surface?: boolean;
}) {
  // Never leave a lone card on the last row: 4 items fill one row of 4, 3 items one row of 3.
  if (columns === 3 && items.length === 4) columns = 4;
  if (columns === 4 && items.length === 3) columns = 3;
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : items.length === 3
          ? "md:grid-cols-3"
          : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section className={`py-section ${surface ? "bg-surface" : ""}`}>
      <div className="container-edge">
        {(title || eyebrow) && (
          <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-12" />
        )}
        <div className={`grid grid-cols-1 gap-gutter ${cols}`}>
          {items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06}>
              <div className="glass glass-hover h-full rounded-lg p-7">
                {item.icon && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-accent-tint">
                    <item.icon className="h-6 w-6 text-accent-ink" strokeWidth={1.75} />
                  </div>
                )}
                <h3 className={`${item.icon ? "mt-5" : ""} font-display text-lg font-bold text-ink`}>{item.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
