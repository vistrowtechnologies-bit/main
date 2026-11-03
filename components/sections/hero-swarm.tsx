"use client";

import { useEffect, useRef, useState } from "react";

// First-impression animation for the homepage hero card: labelled "agent" cursors build the card the way people build
// in a design tool. Each agent drags a selection box around a block, then fills it in: text is typed with a caret, the
// chart bars are dragged up one by one, progress lines are dragged across, check marks are placed, and repeated cards
// are copied across with a spacing badge. It is an original effect in the spirit of multiplayer-cursor design tools.
//
// Everything in the card is already in the page HTML; this only controls when each part becomes visible, and a CSS
// failsafe reveals all of it if this script never runs. It runs once per session, tablet and desktop only, and never
// with reduced motion (the flag is set by a tiny script in the page head, see app/layout.tsx). No sound.

const AGENTS = [
  { name: "Voice", color: "#C6FF00", ink: "#0d0d0d" },
  { name: "WhatsApp", color: "#22C55E", ink: "#ffffff" },
  { name: "CRM", color: "#3B82F6", ink: "#ffffff" },
  { name: "Ads", color: "#F97316", ink: "#ffffff" },
  { name: "SEO", color: "#A855F7", ink: "#ffffff" },
];

// Which agent builds which block (block numbers match data-swarm-block in hero-dashboard.tsx). "quick" skips the box.
const LANES: { block: number; quick?: boolean }[][] = [
  [{ block: 0 }, { block: 5, quick: true }],
  [{ block: 1 }],
  [{ block: 2 }],
  [{ block: 3 }],
  [{ block: 4 }],
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type Pt = { x: number; y: number };

function cursorEl(agent: (typeof AGENTS)[number]) {
  const el = document.createElement("div");
  el.style.cssText = "position:absolute;left:0;top:0;opacity:0;will-change:transform,opacity;z-index:30";
  el.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" style="display:block;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35))"><path d="M3 2v14l3.6-3.4 2.6 5.8 2.5-1.1-2.6-5.7H15L3 2z" fill="${agent.color}" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg><span style="position:absolute;left:14px;top:15px;white-space:nowrap;border-radius:999px;padding:2px 8px;font:600 11px/16px var(--font-inter),system-ui,sans-serif;background:${agent.color};color:${agent.ink};box-shadow:0 2px 6px rgba(0,0,0,.25)">${agent.name}</span>`;
  return el;
}

export function HeroSwarm() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    const host = hostRef.current;
    if (!host || root.dataset.swarm !== "1") return;
    const container = host.parentElement as HTMLElement;
    const blocks = [...container.querySelectorAll<HTMLElement>("[data-swarm-block]")];
    let stopped = false;
    const made: HTMLElement[] = [];
    const add = <T extends HTMLElement>(el: T) => {
      host.appendChild(el);
      made.push(el);
      return el;
    };

    const finish = () => {
      stopped = true;
      container.querySelectorAll<HTMLElement>("[data-swarm-block], [data-swarm-part]").forEach((el) => {
        el.classList.add("swarm-in");
        el.style.clipPath = "";
      });
      made.forEach((el) => el.remove());
      delete root.dataset.swarm;
      try {
        sessionStorage.setItem("vistrow-swarm", "1");
      } catch {
        /* ignore */
      }
      setRunning(false);
    };
    skipRef.current = finish;

    const rectOf = (el: HTMLElement) => {
      const c = container.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { x: r.left - c.left, y: r.top - c.top, w: r.width, h: r.height };
    };

    const run = async () => {
      // Let the page paint and settle before the effect starts, so it never competes with the headline.
      await sleep(500);
      if (stopped) return;
      setRunning(true);

      const cursors = AGENTS.map((agent) => {
        const el = cursorEl(agent);
        add(el);
        return el;
      });
      const cw = container.getBoundingClientRect();
      const home = (i: number): Pt => ({ x: cw.width + 40 + i * 14, y: -30 - i * 12 });
      const pos: Pt[] = AGENTS.map((_, i) => home(i));
      cursors.forEach((el, i) => (el.style.transform = `translate(${pos[i].x}px,${pos[i].y}px)`));

      const move = (i: number, to: Pt, ms: number, easing = EASE) => {
        const from = pos[i];
        pos[i] = to;
        return cursors[i].animate(
          [{ transform: `translate(${from.x}px,${from.y}px)` }, { transform: `translate(${to.x}px,${to.y}px)` }],
          { duration: ms, easing, fill: "forwards" },
        ).finished;
      };

      // ---- how each kind of part is built -------------------------------------------------------------------
      const typeText = async (i: number, el: HTMLElement) => {
        const r = rectOf(el);
        const chars = Math.max(3, (el.textContent ?? "").trim().length);
        const dur = Math.min(360, Math.max(110, chars * 13));
        await move(i, { x: r.x - 2, y: r.y + r.h * 0.5 }, 120);
        if (stopped) return;
        el.style.clipPath = "inset(0 100% 0 0)";
        el.classList.add("swarm-in");
        const caret = add(document.createElement("div"));
        caret.style.cssText = `position:absolute;left:${r.x}px;top:${r.y}px;width:2px;height:${r.h}px;background:${AGENTS[i].color};z-index:25`;
        const steps = `steps(${chars}, end)`;
        const wipe = el.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], { duration: dur, easing: steps });
        caret.animate([{ transform: "translateX(0)" }, { transform: `translateX(${r.w}px)` }], { duration: dur, easing: steps, fill: "forwards" });
        void move(i, { x: r.x + r.w, y: r.y + r.h * 0.5 }, dur, "linear");
        await wipe.finished;
        el.style.clipPath = "";
        caret.remove();
      };

      const pop = async (i: number, el: HTMLElement) => {
        const r = rectOf(el);
        await move(i, { x: r.x + r.w * 0.5, y: r.y + r.h * 0.5 }, 110);
        if (stopped) return;
        el.classList.add("swarm-in");
        await el.animate([{ opacity: 0, transform: "scale(0.4)" }, { opacity: 1, transform: "scale(1)" }], { duration: 170, easing: EASE }).finished;
      };

      const raise = async (i: number, el: HTMLElement) => {
        const r = rectOf(el);
        el.style.transformOrigin = "50% 100%";
        void move(i, { x: r.x + r.w * 0.5, y: r.y }, 90);
        el.classList.add("swarm-in");
        const grow = el.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 180, easing: EASE });
        await sleep(60);
        void grow.finished;
      };

      const drag = async (i: number, el: HTMLElement) => {
        const r = rectOf(el);
        el.style.transformOrigin = "0 50%";
        await move(i, { x: r.x, y: r.y + r.h * 0.5 }, 100);
        if (stopped) return;
        el.classList.add("swarm-in");
        void move(i, { x: r.x + r.w, y: r.y + r.h * 0.5 }, 260);
        await el.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 260, easing: EASE }).finished;
      };

      // Repeated cards are built once, then copied across with a red spacing badge (the "alt-drag duplicate").
      const copyCard = async (i: number, el: HTMLElement, first: HTMLElement | undefined) => {
        const r = rectOf(el);
        if (!first || first === el) {
          await pop(i, el);
          return;
        }
        const f = rectOf(first);
        await move(i, { x: f.x + f.w * 0.5, y: f.y + f.h * 0.5 }, 100);
        el.classList.add("swarm-in");
        el.querySelectorAll<HTMLElement>("[data-swarm-part]").forEach((p) => p.classList.add("swarm-in"));
        const gap = Math.round(r.x - (f.x + f.w));
        const badge = add(document.createElement("span"));
        badge.textContent = String(gap);
        badge.style.cssText = `position:absolute;left:${f.x + f.w}px;top:${r.y + r.h + 6}px;width:${Math.max(gap, 18)}px;text-align:center;border-radius:3px;font:600 10px/14px var(--font-inter),system-ui,sans-serif;background:#ff3b30;color:#fff;z-index:25`;
        void move(i, { x: r.x + r.w * 0.5, y: r.y + r.h * 0.5 }, 200);
        await el.animate([{ opacity: 0, transform: `translateX(${f.x - r.x}px) scale(0.96)` }, { opacity: 1, transform: "none" }], { duration: 240, easing: EASE }).finished;
        badge.remove();
      };

      const buildBlock = async (i: number, blockIndex: number, quick?: boolean) => {
        const block = blocks[blockIndex];
        if (!block || stopped) return;
        const r = rectOf(block);
        cursors[i].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: "forwards" });
        await move(i, { x: r.x, y: r.y }, quick ? 300 : 380);
        if (stopped) return;

        if (!quick) {
          // Selection box dragged from the top-left corner to the bottom-right, with a live size badge.
          const box = document.createElement("div");
          box.style.cssText = `position:absolute;left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;border:1.5px solid ${AGENTS[i].color};background:${AGENTS[i].color}14;border-radius:6px;transform-origin:0 0;pointer-events:none;z-index:20`;
          const badge = document.createElement("span");
          badge.textContent = `${Math.round(r.w)} × ${Math.round(r.h)}`;
          badge.style.cssText = `position:absolute;right:0;bottom:-24px;border-radius:4px;padding:1px 6px;font:600 10px/16px var(--font-inter),system-ui,sans-serif;background:${AGENTS[i].color};color:${AGENTS[i].ink}`;
          box.appendChild(badge);
          add(box);
          const grow = box.animate([{ transform: "scale(0,0)" }, { transform: "scale(1,1)" }], { duration: 300, easing: EASE, fill: "forwards" });
          await Promise.all([move(i, { x: r.x + r.w, y: r.y + r.h }, 300), grow.finished]);
          if (stopped) return;
          block.classList.add("swarm-in");
          void box.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: "forwards" }).finished.then(() => box.remove());
        } else {
          block.classList.add("swarm-in");
        }

        // Fill the block in, part by part, in reading order.
        const parts = [...block.querySelectorAll<HTMLElement>("[data-swarm-part]")];
        const firstCard = parts.find((p) => p.dataset.swarmPart === "card");
        for (const part of parts) {
          if (stopped) return;
          const inCopy = part.parentElement?.closest("[data-swarm-dup]");
          if (inCopy) continue; // revealed together with its copied card
          switch (part.dataset.swarmPart) {
            case "text":
              await typeText(i, part);
              break;
            case "bar":
              await raise(i, part);
              break;
            case "fill":
              await drag(i, part);
              break;
            case "card":
              await copyCard(i, part, firstCard);
              break;
            default:
              await pop(i, part); // dot, pill, icon
          }
        }
      };

      await Promise.all(
        LANES.map(async (lane, i) => {
          await sleep(i * 110);
          for (const task of lane) {
            if (stopped) return;
            await buildBlock(i, task.block, task.quick);
          }
        }),
      );
      if (stopped) return;

      // Agents leave: flock out past the top-right corner and fade.
      await Promise.all(
        cursors.map(async (el, i) => {
          await sleep(i * 40);
          el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, fill: "forwards" });
          await move(i, home(i), 500);
        }),
      );
      if (!stopped) finish();
    };

    void run();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => {
      stopped = true;
      window.removeEventListener("keydown", onKey);
      made.forEach((el) => el.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={hostRef} aria-hidden={!running} className="pointer-events-none absolute inset-0 z-20">
      {running && (
        <button
          type="button"
          onClick={() => skipRef.current()}
          className="pointer-events-auto absolute -bottom-10 right-0 rounded-full border border-line bg-card/90 px-3 py-1 font-sans text-[11px] font-semibold text-ink-2 backdrop-blur transition-colors hover:text-ink"
        >
          Skip animation
        </button>
      )}
    </div>
  );
}
