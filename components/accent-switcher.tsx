"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { Palette } from "lucide-react";

type AccentKey = "lime" | "orange" | "cyan" | "pink" | "purple";

const accents: { key: AccentKey; label: string; swatch: string }[] = [
  { key: "lime", label: "Neon Lime", swatch: "#C6FF00" },
  { key: "orange", label: "Neon Orange", swatch: "#FF6A00" },
  { key: "cyan", label: "Neon Cyan", swatch: "#00E5FF" },
  { key: "pink", label: "Neon Pink", swatch: "#FF0099" },
  { key: "purple", label: "Neon Violet", swatch: "#B026FF" },
];

const ACCENT_KEY = "vistrow-accent";
const POS_Y_KEY = "vistrow-accent-switcher-y";
const SIDE_KEY = "vistrow-accent-switcher-side";

const BTN = 44; // button size (h-11/w-11)
const MARGIN = 16; // gap from the viewport edge
const TOP_CLEARANCE = 108; // keep the button below the announcement bar + sticky header
const BOTTOM_MARGIN = 24;

type Side = "left" | "right";
type Bounds = { left: number; right: number; top: number; bottom: number };

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function AccentSwitcher() {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<AccentKey>("lime");
  const [mounted, setMounted] = useState(false);
  const [side, setSide] = useState<Side>("left");
  const [bounds, setBounds] = useState<Bounds>({ left: MARGIN, right: MARGIN, top: TOP_CLEARANCE, bottom: TOP_CLEARANCE });
  const rootRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<Side>("left");
  const x = useMotionValue(MARGIN);
  const y = useMotionValue(TOP_CLEARANCE);

  useEffect(() => {
    sideRef.current = side;
  }, [side]);

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.getAttribute("data-accent") as AccentKey | null;
    setAccent(current || "lime");

    const compute = (): Bounds => ({
      left: MARGIN,
      right: window.innerWidth - BTN - MARGIN,
      top: TOP_CLEARANCE,
      bottom: window.innerHeight - BTN - BOTTOM_MARGIN,
    });

    const initial = compute();
    setBounds(initial);

    let storedSide: Side = "left";
    let storedY = (initial.top + initial.bottom) / 2;
    try {
      const s = localStorage.getItem(SIDE_KEY);
      if (s === "left" || s === "right") storedSide = s;
      const yv = localStorage.getItem(POS_Y_KEY);
      if (yv) storedY = parseFloat(yv);
    } catch {}

    setSide(storedSide);
    sideRef.current = storedSide;
    x.set(storedSide === "right" ? initial.right : initial.left);
    y.set(clamp(storedY, initial.top, initial.bottom));

    const onResize = () => {
      const next = compute();
      setBounds(next);
      x.set(sideRef.current === "right" ? next.right : next.left);
      y.set(clamp(y.get(), next.top, next.bottom));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [x, y]);

  useEffect(() => {
    if (!open) return;
    const onClickAway = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClickAway);
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("mousedown", onClickAway);
      window.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const onDragEnd = () => {
    const centerX = x.get() + BTN / 2;
    const newSide: Side = centerX < window.innerWidth / 2 ? "left" : "right";
    const targetX = newSide === "left" ? bounds.left : bounds.right;
    const targetY = clamp(y.get(), bounds.top, bounds.bottom);
    setSide(newSide);
    sideRef.current = newSide;
    animate(x, targetX, { type: "spring", stiffness: 500, damping: 42 });
    animate(y, targetY, { type: "spring", stiffness: 500, damping: 42 });
    try {
      localStorage.setItem(SIDE_KEY, newSide);
      localStorage.setItem(POS_Y_KEY, String(targetY));
    } catch {}
  };

  const choose = (key: AccentKey) => {
    setAccent(key);
    setOpen(false);
    if (key === "lime") {
      document.documentElement.removeAttribute("data-accent");
    } else {
      document.documentElement.setAttribute("data-accent", key);
    }
    try {
      localStorage.setItem(ACCENT_KEY, key);
    } catch {}
  };

  const current = accents.find((item) => item.key === accent) || accents[0];

  return (
    <div className="pointer-events-none fixed inset-0 z-[56] print:hidden">
      <motion.div
        ref={rootRef}
        drag
        dragConstraints={bounds}
        dragElastic={0.04}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        style={{ x, y, opacity: mounted ? 1 : 0 }}
        className="pointer-events-auto absolute left-0 top-0 cursor-grab active:cursor-grabbing"
      >
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Choose accent color"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-card/95 shadow-[0_10px_30px_rgb(0_0_0/0.18)] backdrop-blur transition-transform hover:scale-105"
        >
          <Palette className="h-5 w-5" strokeWidth={1.9} style={{ color: current.swatch }} />
        </button>

        {open && (
          <div
            className={`dropdown-glass absolute top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-full border border-line/70 bg-card/95 p-2 shadow-[0_16px_40px_rgb(0_0_0/0.16)] ${
              side === "left" ? "left-full ml-2" : "right-full mr-2"
            }`}
          >
            {accents.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => choose(item.key)}
                aria-label={item.label}
                aria-pressed={accent === item.key}
                className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110 ${
                  accent === item.key ? "ring-2 ring-offset-2 ring-offset-card" : ""
                }`}
                style={accent === item.key ? ({ "--tw-ring-color": item.swatch } as React.CSSProperties) : undefined}
              >
                <span
                  aria-hidden
                  className="h-6 w-6 rounded-full border border-line"
                  style={{ backgroundColor: item.swatch }}
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
