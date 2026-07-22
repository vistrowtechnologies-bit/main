"use client";

import {
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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
type DragState = {
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startX: number;
  startY: number;
  moved: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function AccentSwitcher() {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<AccentKey>("lime");
  const [side, setSide] = useState<Side>("left");
  const [bounds, setBounds] = useState<Bounds>({ left: MARGIN, right: MARGIN, top: TOP_CLEARANCE, bottom: TOP_CLEARANCE });
  const rootRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<Side>("left");
  const dragStateRef = useRef<DragState | null>(null);
  const cleanupDragListenersRef = useRef<(() => void) | null>(null);
  const suppressClickRef = useRef(false);
  const x = useMotionValue(MARGIN);
  const y = useMotionValue(TOP_CLEARANCE);

  useEffect(() => {
    sideRef.current = side;
  }, [side]);

  useEffect(() => () => cleanupDragListenersRef.current?.(), []);

  useEffect(() => {
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

  const beginDrag = (clientX: number, clientY: number, pointerId: number) => {
    cleanupDragListenersRef.current?.();
    dragStateRef.current = {
      pointerId,
      startPointerX: clientX,
      startPointerY: clientY,
      startX: x.get(),
      startY: y.get(),
      moved: false,
    };
  };

  const moveDrag = (clientX: number, clientY: number, pointerId: number) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== pointerId) return;

    const deltaX = clientX - dragState.startPointerX;
    const deltaY = clientY - dragState.startPointerY;
    if (!dragState.moved && Math.hypot(deltaX, deltaY) < 4) return;

    dragState.moved = true;
    x.set(clamp(dragState.startX + deltaX, bounds.left, bounds.right));
    y.set(clamp(dragState.startY + deltaY, bounds.top, bounds.bottom));
  };

  const finishDrag = (pointerId: number) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== pointerId) return;

    dragStateRef.current = null;
    if (!dragState.moved) return;

    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
    onDragEnd();
  };

  const onMouseDown = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    beginDrag(event.clientX, event.clientY, -1);

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      moveDrag(moveEvent.clientX, moveEvent.clientY, -1);
    };
    const onMouseUp = () => {
      cleanup();
      finishDrag(-1);
    };
    const cleanup = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      cleanupDragListenersRef.current = null;
    };

    cleanupDragListenersRef.current = cleanup;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp, { once: true });
  };

  const onTouchStart = (event: ReactTouchEvent<HTMLButtonElement>) => {
    const touch = event.changedTouches[0];
    if (!touch) return;
    beginDrag(touch.clientX, touch.clientY, touch.identifier);

    const onTouchMove = (moveEvent: TouchEvent) => {
      const activeTouch = Array.from(moveEvent.touches).find(
        (item) => item.identifier === touch.identifier,
      );
      if (!activeTouch) return;
      moveEvent.preventDefault();
      moveDrag(activeTouch.clientX, activeTouch.clientY, touch.identifier);
    };
    const onTouchEnd = (endEvent: TouchEvent) => {
      const ended = Array.from(endEvent.changedTouches).some(
        (item) => item.identifier === touch.identifier,
      );
      if (!ended) return;
      cleanup();
      finishDrag(touch.identifier);
    };
    const cleanup = () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      cleanupDragListenersRef.current = null;
    };

    cleanupDragListenersRef.current = cleanup;
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
  };

  const onSwitcherClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    setOpen((value) => !value);
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
        style={{ x, y }}
        className="pointer-events-auto absolute left-0 top-0 cursor-grab active:cursor-grabbing"
      >
        <button
          type="button"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onClick={onSwitcherClick}
          aria-label="Choose accent color"
          aria-expanded={open}
          className="relative flex h-11 w-11 touch-none select-none items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#0d0d0d] shadow-[0_10px_30px_rgb(0_0_0/0.28),0_0_0_1px_rgb(13_13_13/0.16)] transition-[transform,box-shadow] hover:scale-105 hover:shadow-[0_14px_36px_rgb(0_0_0/0.34),0_0_0_1px_rgb(13_13_13/0.22)]"
        >
          <span
            aria-hidden
            className="absolute inset-1 rounded-full border border-white/10 bg-white/[0.035]"
          />
          <Palette
            className="relative h-5 w-5 drop-shadow-[0_0_7px_currentColor]"
            strokeWidth={2.15}
            style={{ color: current.swatch }}
          />
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
