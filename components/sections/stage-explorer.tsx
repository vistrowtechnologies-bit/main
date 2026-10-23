"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BadgeDollarSign, ChevronDown, ClipboardCheck, Magnet, MessageSquare, RefreshCw, Target, type LucideIcon } from "lucide-react";

export type ExplorerStage = { key: string; label: string; desc: string };
export type StageService = { title: string; href: string };

const ICONS: Record<string, LucideIcon> = {
  attract: Magnet,
  capture: Target,
  respond: MessageSquare,
  qualify: ClipboardCheck,
  "follow-up": RefreshCw,
  convert: BadgeDollarSign,
};

// Interactive "where this fits" map: a connected six-stage track on desktop and a tappable timeline
// on phones. Every label, description and service link is rendered in the HTML for search engines.
export function StageExplorer({
  stages,
  highlight,
  note,
  services,
}: {
  stages: ExplorerStage[];
  highlight: string[];
  note?: string;
  services: Record<string, StageService[]>;
}) {
  const reduce = useReducedMotion();
  const first = stages.findIndex((stage) => highlight.includes(stage.key));
  const [active, setActive] = useState(first === -1 ? 0 : first);
  const [open, setOpen] = useState<number | null>(first === -1 ? 0 : first);
  const lit = (index: number) => highlight.includes(stages[index].key);
  const allLit = stages.every((_, index) => lit(index));

  const detail = (index: number) => {
    const stage = stages[index];
    const list = services[stage.key] ?? [];
    return (
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Stage {String(index + 1).padStart(2, "0")}</span>
          {lit(index) && !allLit && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 font-sans text-[11px] font-bold text-accent-ink">Where this page works</span>
          )}
        </div>
        <p className="mt-2 font-display text-h3 text-ink">{stage.label}</p>
        <p className="mt-2 max-w-2xl font-sans text-[15px] leading-relaxed text-muted">{stage.desc}.</p>
        {lit(index) && note && !allLit && <p className="mt-3 max-w-2xl font-sans text-[15px] leading-relaxed text-ink-2">{note}</p>}
        {list.length > 0 && (
          <div className="mt-5">
            <p className="font-sans text-xs font-semibold text-muted">Services at this stage</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {list.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-1 rounded-full border border-line bg-card px-3 py-1.5 font-sans text-[13px] font-semibold text-ink transition-colors hover:border-accent hover:bg-accent/10"
                  >
                    {service.title}
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Desktop and tablet: connected track + detail panel */}
      <div className="hidden md:block">
        <div className="relative">
          {/* the track behind the nodes */}
          <div aria-hidden className="absolute left-[8.33%] right-[8.33%] top-7 h-[3px] rounded-full bg-line" />
          <div aria-hidden className="absolute left-[8.33%] right-[8.33%] top-7 flex h-[3px]">
            {stages.slice(1).map((_, index) => (
              <span key={index} className={`h-full flex-1 ${lit(index) && lit(index + 1) ? "bg-accent" : ""}`} />
            ))}
          </div>
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute top-[25px] h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent))]"
              initial={{ left: "8.33%" }}
              animate={{ left: ["8.33%", "91.67%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          )}
          <ol role="tablist" aria-label="Growth system stages" className="relative grid grid-cols-6">
            {stages.map((stage, index) => {
              const Icon = ICONS[stage.key] ?? Magnet;
              const selected = active === index;
              return (
                <li key={stage.key} className="flex justify-center">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="stage-detail"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group flex flex-col items-center gap-3 rounded-xl px-2 pb-2 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        lit(index) ? "border-accent bg-accent text-accent-ink" : "border-line bg-card text-muted"
                      } ${selected ? "scale-110 shadow-[0_0_0_6px_rgb(var(--accent)/0.18)]" : "group-hover:scale-105"}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <span className={`font-display text-[15px] font-bold transition-colors ${selected ? "text-ink" : lit(index) ? "text-ink-2" : "text-muted"}`}>
                      {stage.label}
                    </span>
                    <span aria-hidden className={`h-1 w-6 rounded-full transition-colors ${selected ? "bg-accent" : "bg-transparent"}`} />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div id="stage-detail" role="tabpanel" className="mt-6 min-h-[188px] rounded-2xl border border-line bg-card p-6 shadow-soft lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {detail(active)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Phones: vertical timeline, tap to expand */}
      <ol className="relative md:hidden">
        <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-[2px] bg-line" />
        {stages.map((stage, index) => {
          const Icon = ICONS[stage.key] ?? Magnet;
          const expanded = open === index;
          return (
            <li key={stage.key} className="relative pb-3 last:pb-0">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex w-full items-center gap-4 text-left"
              >
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                    lit(index) ? "border-accent bg-accent text-accent-ink" : "border-line bg-card text-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="flex flex-1 items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3">
                  <span className={`font-display text-base font-bold ${lit(index) ? "text-ink" : "text-muted"}`}>{stage.label}</span>
                  <ChevronDown className={`h-4 w-4 text-muted transition-transform ${expanded ? "rotate-180" : ""}`} />
                </span>
              </button>
              <div className={`${expanded ? "block" : "hidden"} ml-14 mt-2 rounded-xl border border-line bg-card p-4`}>{detail(index)}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
