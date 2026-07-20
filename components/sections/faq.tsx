"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export type QA = { q: string; a: string };

export function Faq({ items, title = "Frequently asked questions" }: { items: QA[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-section">
      <div className="container-edge grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="FAQ" title={title} />
        <div className="divide-y divide-line border-y border-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg font-bold text-ink">{item.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-accent-strong transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-premium ${
                    isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl font-sans text-base leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
