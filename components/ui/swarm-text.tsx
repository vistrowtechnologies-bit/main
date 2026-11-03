"use client";

import { useEffect, useRef } from "react";

// Hero text built by agent cursors: a selection box is dragged around the headline, then the text is typed in with a
// caret, line by line; the subtitle is typed the same way and the buttons are popped in. It is an original effect in
// the spirit of multiplayer-cursor design tools. The text is already in the page HTML; this only controls when it
// becomes visible. Guard rails: tablet and desktop only, once per page per browser session, never with reduced motion
// or for crawlers (all decided by a tiny script in the page head, see app/layout.tsx), any click, key press or scroll
// ends it at once, and a CSS failsafe reveals everything after 1.5 s if this script has not started.

const AGENTS = [
  { name: "Voice", color: "#C6FF00", ink: "#0d0d0d" },
  { name: "WhatsApp", color: "#22C55E", ink: "#ffffff" },
  { name: "CRM", color: "#3B82F6", ink: "#ffffff" },
  { name: "Ads", color: "#F97316", ink: "#ffffff" },
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type Pt = { x: number; y: number };
type Line = { l: number; r: number; t: number; b: number };

function cursorEl(agent: (typeof AGENTS)[number]) {
  const el = document.createElement("div");
  el.style.cssText = "position:absolute;left:0;top:0;opacity:0;will-change:transform,opacity;z-index:30";
  el.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" style="display:block;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35))"><path d="M3 2v14l3.6-3.4 2.6 5.8 2.5-1.1-2.6-5.7H15L3 2z" fill="${agent.color}" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg><span style="position:absolute;left:14px;top:15px;white-space:nowrap;border-radius:999px;padding:2px 8px;font:600 11px/16px var(--font-inter),system-ui,sans-serif;background:${agent.color};color:${agent.ink};box-shadow:0 2px 6px rgba(0,0,0,.25)">${agent.name}</span>`;
  return el;
}

// Text lines of an element as horizontal extents, relative to the element. Heights come from the line-height, because
// the headline words carry entrance transforms that would distort measured heights; widths are unaffected.
function lineBands(el: HTMLElement): Line[] {
  const er = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const fontSize = parseFloat(cs.fontSize) || 16;
  const lh = parseFloat(cs.lineHeight) || fontSize * 1.25;
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = [...range.getClientRects()].filter((r) => r.width > 1 && r.height > 1);
  const lines: Line[] = [];
  let prevRight = -Infinity;
  for (const r of rects) {
    const l = r.left - er.left;
    const rr = r.right - er.left;
    if (lines.length === 0 || l < prevRight - fontSize * 2) lines.push({ l, r: rr, t: lines.length * lh, b: (lines.length + 1) * lh });
    else {
      const last = lines[lines.length - 1];
      last.l = Math.min(last.l, l);
      last.r = Math.max(last.r, rr);
    }
    prevRight = rr;
  }
  if (lines.length === 0) lines.push({ l: 0, r: er.width, t: 0, b: er.height });
  return lines;
}

function clipPath(lines: Line[], shown: number) {
  let cum = 0;
  let d = "";
  for (const line of lines) {
    const w = line.r - line.l;
    const visible = Math.min(w, Math.max(0, shown - cum));
    if (visible > 0) d += `M${line.l - 5} ${line.t - 4}H${line.l + visible + (visible >= w ? 6 : 0)}V${line.b + 6}H${line.l - 5}Z`;
    cum += w;
  }
  return `path("${d || "M0 0Z"}")`;
}

export function SwarmText() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const host = hostRef.current;
    if (!host || root.dataset.swarmText !== "1") return;
    const section = host.parentElement as HTMLElement;
    const pick = (kind: string) => section.querySelector<HTMLElement>(`[data-swarm-text="${kind}"]`);
    let stopped = false;
    const made: HTMLElement[] = [];
    const add = <T extends HTMLElement>(el: T) => {
      host.appendChild(el);
      made.push(el);
      return el;
    };

    const finish = () => {
      if (stopped && !root.dataset.swarmText) return;
      stopped = true;
      section.querySelectorAll<HTMLElement>("[data-swarm-text]").forEach((el) => {
        el.classList.add("swarm-in");
        el.style.clipPath = "";
      });
      made.forEach((el) => el.remove());
      delete root.dataset.swarmText;
      try {
        sessionStorage.setItem(`vistrow-swarm-text:${location.pathname}`, "1");
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new Event("swarm-text-done"));
      ["pointerdown", "keydown", "wheel", "touchstart"].forEach((type) => window.removeEventListener(type, finish));
    };
    ["pointerdown", "keydown", "wheel", "touchstart"].forEach((type) => window.addEventListener(type, finish, { passive: true }));

    const rectOf = (el: HTMLElement) => {
      const c = section.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { x: r.left - c.left, y: r.top - c.top, w: r.width, h: r.height };
    };

    const sw = section.getBoundingClientRect();
    const cursors = AGENTS.map((agent) => add(cursorEl(agent)));
    const home = (i: number): Pt => ({ x: sw.width + 30 + i * 12, y: -24 - i * 10 });
    const pos: Pt[] = AGENTS.map((_, i) => home(i));
    cursors.forEach((el, i) => (el.style.transform = `translate(${pos[i].x}px,${pos[i].y}px)`));
    const place = (i: number, p: Pt) => {
      pos[i] = p;
      cursors[i].style.transform = `translate(${p.x}px,${p.y}px)`;
    };
    const move = (i: number, to: Pt, ms: number) => {
      const from = pos[i];
      pos[i] = to;
      const a = cursors[i].animate([{ transform: `translate(${from.x}px,${from.y}px)` }, { transform: `translate(${to.x}px,${to.y}px)` }], {
        duration: ms,
        easing: EASE,
        fill: "forwards",
      });
      return a.finished.then(() => {
        a.commitStyles();
        a.cancel();
      });
    };

    // Selection box dragged around the element with a live size badge, as in a design tool.
    const dragBox = async (i: number, el: HTMLElement) => {
      const r = rectOf(el);
      cursors[i].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, fill: "forwards" });
      await move(i, { x: r.x, y: r.y }, 240);
      if (stopped) return;
      const box = add(document.createElement("div"));
      box.style.cssText = `position:absolute;left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;border:1.5px solid ${AGENTS[i].color};background:${AGENTS[i].color}14;border-radius:6px;transform-origin:0 0;z-index:20`;
      const badge = document.createElement("span");
      badge.textContent = `${Math.round(r.w)} × ${Math.round(r.h)}`;
      badge.style.cssText = `position:absolute;right:0;bottom:-24px;border-radius:4px;padding:1px 6px;font:600 10px/16px var(--font-inter),system-ui,sans-serif;background:${AGENTS[i].color};color:${AGENTS[i].ink}`;
      box.appendChild(badge);
      const grow = box.animate([{ transform: "scale(0,0)" }, { transform: "scale(1,1)" }], { duration: 230, easing: EASE, fill: "forwards" });
      await Promise.all([move(i, { x: r.x + r.w, y: r.y + r.h }, 230), grow.finished]);
      void box.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: "forwards" }).finished.then(() => box.remove());
    };

    // Typed in line by line, the caret and the cursor following the end of the text.
    const typeText = (i: number, el: HTMLElement, ms: number) =>
      new Promise<void>((resolve) => {
        const er = rectOf(el);
        const lines = lineBands(el);
        const total = lines.reduce((sum, line) => sum + (line.r - line.l), 0);
        const chars = Math.max(4, (el.textContent ?? "").trim().length);
        el.style.clipPath = clipPath(lines, 0);
        el.classList.add("swarm-in");
        cursors[i].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 120, fill: "forwards" });
        const caret = add(document.createElement("div"));
        const lineH = lines[0].b - lines[0].t;
        caret.style.cssText = `position:absolute;left:0;top:0;width:2px;height:${lineH}px;background:${AGENTS[i].color};z-index:25`;
        const start = performance.now();
        const frame = (now: number) => {
          if (stopped) return resolve();
          const t = Math.min(1, (now - start) / ms);
          const shown = (Math.floor(t * chars) / chars) * total;
          el.style.clipPath = clipPath(lines, shown);
          let cum = 0;
          let at = lines[lines.length - 1];
          let x = at.r;
          for (const line of lines) {
            const w = line.r - line.l;
            if (shown <= cum + w) {
              at = line;
              x = line.l + (shown - cum);
              break;
            }
            cum += w;
          }
          caret.style.transform = `translate(${er.x + x}px,${er.y + at.t}px)`;
          place(i, { x: er.x + x, y: er.y + at.t + lineH * 0.55 });
          if (t < 1) requestAnimationFrame(frame);
          else {
            el.style.clipPath = "";
            caret.remove();
            resolve();
          }
        };
        requestAnimationFrame(frame);
      });

    const popIn = async (i: number, el: HTMLElement) => {
      const r = rectOf(el);
      await move(i, { x: r.x + r.w * 0.3, y: r.y + r.h * 0.5 }, 200);
      if (stopped) return;
      el.classList.add("swarm-in");
      await el.animate([{ opacity: 0, transform: "scale(0.94)" }, { opacity: 1, transform: "scale(1)" }], { duration: 260, easing: EASE }).finished;
    };

    const run = async () => {
      const title = pick("title");
      const eyebrow = pick("eyebrow");
      const subtitle = pick("subtitle");
      const cta = pick("cta");
      const dur = (el: HTMLElement | null, perChar: number, min: number, max: number) =>
        Math.min(max, Math.max(min, ((el?.textContent ?? "").trim().length || 10) * perChar));

      await Promise.all([
        (async () => {
          if (!title || stopped) return;
          await dragBox(0, title);
          if (!stopped) await typeText(0, title, dur(title, 14, 260, 520));
        })(),
        (async () => {
          if (!eyebrow) return;
          await sleep(60);
          if (stopped) return;
          await move(1, { x: rectOf(eyebrow).x - 2, y: rectOf(eyebrow).y + 6 }, 220);
          if (!stopped) await typeText(1, eyebrow, dur(eyebrow, 16, 180, 320));
        })(),
        (async () => {
          if (!subtitle) return;
          await sleep(140);
          if (stopped) return;
          await dragBox(2, subtitle);
          if (!stopped) await typeText(2, subtitle, dur(subtitle, 5, 300, 640));
        })(),
        (async () => {
          if (!cta) return;
          await sleep(220);
          if (stopped) return;
          await dragBox(3, cta);
          if (!stopped) await popIn(3, cta);
        })(),
      ]);
      if (stopped) return;
      await Promise.all(
        cursors.map(async (el, i) => {
          await sleep(i * 40);
          el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
          await move(i, home(i), 420);
        }),
      );
      finish();
    };

    void run();
    return () => {
      stopped = true;
      made.forEach((el) => el.remove());
      ["pointerdown", "keydown", "wheel", "touchstart"].forEach((type) => window.removeEventListener(type, finish));
    };
  }, []);

  return <div ref={hostRef} aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden" />;
}
