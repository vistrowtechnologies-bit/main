"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

const storeKey = (slug: string) => `vistrow-playbook-${slug}`;
const load = (slug: string): number[] => {
  try {
    return JSON.parse(localStorage.getItem(storeKey(slug)) || "[]");
  } catch {
    return [];
  }
};
const save = (slug: string, v: number[]) => {
  try {
    localStorage.setItem(storeKey(slug), JSON.stringify(v));
  } catch {}
};

/** Tickable checklist: progress bar fills as items are ticked; remembered on this phone. */
export function ChecklistCard({ slug, title, items }: { slug: string; title: string; items: [string, string][] }) {
  const [done, setDone] = useState<number[]>([]);
  const reduce = useReducedMotion();
  useEffect(() => setDone(load(slug)), [slug]);
  const toggle = (i: number) =>
    setDone((cur) => {
      const next = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i];
      save(slug, next);
      return next;
    });
  const pct = Math.round((done.length / items.length) * 100);
  const all = done.length === items.length;
  return (
    <section className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="border-b border-line px-4 py-3.5 sm:px-6">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-lg font-bold tracking-[-0.02em] text-ink sm:text-xl">{title}</h2>
          <motion.span
            key={all ? "all" : "some"}
            initial={all && !reduce ? { scale: 0.6 } : false}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className={`shrink-0 rounded-full px-2.5 py-0.5 font-sans text-sm font-extrabold ${all ? "bg-accent text-accent-ink" : "text-accent-strong"}`}
          >
            {all ? "✓ " : ""}{done.length}/{items.length}
          </motion.span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 22 }}
          />
        </div>
      </div>
      <ul className="divide-y divide-line">
        {items.map(([t, d], i) => {
          const on = done.includes(i);
          return (
            <li key={t}>
              <button type="button" onClick={() => toggle(i)} className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition active:bg-accent-tint sm:px-6">
                <motion.span
                  animate={on ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${on ? "border-accent bg-accent text-accent-ink" : "border-muted/40"}`}
                >
                  {on && <Check className="h-4 w-4" strokeWidth={3} />}
                </motion.span>
                <span className={on ? "opacity-55" : ""}>
                  <b className={`block font-sans text-[15px] font-semibold text-ink ${on ? "line-through decoration-accent-strong/60" : ""}`}>{t}</b>
                  <small className="block font-sans text-sm leading-snug text-muted">{d}</small>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <AnimatePresence>
        {all && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden bg-accent"
          >
            {!reduce && <Confetti />}
            <div className="relative px-4 py-5 text-center sm:px-6">
              <motion.p
                initial={{ scale: 0.5, rotate: -8 }}
                animate={{ scale: [0.5, 1.25, 1], rotate: [-8, 6, 0] }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl"
                aria-hidden
              >
                🎉
              </motion.p>
              <p className="mt-1 font-display text-xl font-extrabold tracking-[-0.02em] text-accent-ink">Sab done! {items.length}/{items.length}</p>
              <p className="mt-1 font-sans text-sm font-semibold text-accent-ink/80">Screenshot lo aur @vistrow_technologies ko tag karo.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/** Live countdown to a chapter's unlock (its reel's posting slot, IST). */
export function UnlockCountdown({ release }: { release: string }) {
  const target = Date.parse(`${release}:00+05:30`);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null) return <span className="font-sans text-sm text-muted">…</span>;
  const s = Math.max(0, Math.floor((target - now) / 1000));
  const parts: [number, string][] = [[Math.floor(s / 86400), "din"], [Math.floor((s % 86400) / 3600), "ghante"], [Math.floor((s % 3600) / 60), "min"], [s % 60, "sec"]];
  return (
    <div className="flex justify-center gap-2">
      {parts.map(([v, l]) => (
        <span key={l} className="flex w-16 flex-col items-center rounded-md border border-line bg-surface py-2">
          <b className="font-display text-2xl font-extrabold tabular-nums text-ink">{String(v).padStart(2, "0")}</b>
          <small className="font-sans text-[11px] font-semibold uppercase tracking-wide text-muted">{l}</small>
        </span>
      ))}
    </div>
  );
}

/** Slow-moving lime glow behind the hero. */
export function HeroGlow() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
      animate={reduce ? undefined : { x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** One word at a time (old word leaves before the new one enters, so they never overlap). */
export function SwapWord({ words, interval = 2200, className = "" }: { words: string[]; interval?: number; className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [reduce, words.length, interval]);
  return (
    <span className={`inline-block ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="inline-block"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.28 }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** One-shot confetti burst (lime, ink and white bits flying out from the centre). */
function Confetti() {
  const bits = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2 + (i % 3) * 0.2;
    const d = 90 + (i % 5) * 28;
    return { x: Math.cos(a) * d, y: Math.sin(a) * d * 0.7 - 20, r: (i * 47) % 360, c: ["#0b0b0c", "#ffffff", "#5c7a00"][i % 3], w: i % 2 ? 6 : 9 };
  });
  return (
    <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-[2px]"
          style={{ width: b.w, height: b.w * 0.5, background: b.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.x, y: [0, b.y, b.y + 60], opacity: [1, 1, 0], rotate: b.r + 360 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.05 }}
        />
      ))}
    </span>
  );
}
