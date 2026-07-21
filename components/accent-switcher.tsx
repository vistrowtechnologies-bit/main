"use client";

import { useEffect, useRef, useState } from "react";
import { Palette } from "lucide-react";

type AccentKey = "lime" | "orange" | "cyan" | "pink";

const accents: { key: AccentKey; label: string; swatch: string }[] = [
  { key: "lime", label: "Neon Lime", swatch: "#C6FF00" },
  { key: "orange", label: "Neon Orange", swatch: "#FF6A00" },
  { key: "cyan", label: "Neon Cyan", swatch: "#00E5FF" },
  { key: "pink", label: "Neon Pink", swatch: "#FF0099" },
];

export function AccentSwitcher({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<AccentKey>("lime");
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.getAttribute("data-accent") as AccentKey | null;
    setAccent(current || "lime");
  }, []);

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

  const choose = (key: AccentKey) => {
    setAccent(key);
    setOpen(false);
    if (key === "lime") {
      document.documentElement.removeAttribute("data-accent");
    } else {
      document.documentElement.setAttribute("data-accent", key);
    }
    try {
      localStorage.setItem("vistrow-accent", key);
    } catch {}
  };

  const current = accents.find((item) => item.key === accent) || accents[0];

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Choose accent color"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink-2 transition-colors hover:bg-surface hover:text-ink"
      >
        {mounted ? (
          <span
            aria-hidden
            className="h-4 w-4 rounded-full border border-line"
            style={{ backgroundColor: current.swatch }}
          />
        ) : (
          <Palette className="h-5 w-5" strokeWidth={1.75} />
        )}
      </button>

      {open && (
        <div className="dropdown-glass absolute right-0 top-full z-50 mt-2 flex items-center gap-2 rounded-full border border-line/70 bg-card/95 p-2 shadow-[0_16px_40px_rgb(0_0_0/0.16)]">
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
    </div>
  );
}
