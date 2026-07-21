"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    const applyTheme = () => {
      setIsDark(next);
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("vistrow-theme", next ? "dark" : "light");
      } catch {}
    };

    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const button = buttonRef.current;

    if (!doc.startViewTransition || reduceMotion || !button) {
      applyTheme();
      return;
    }

    const { left, top, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(applyTheme);
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      aria-pressed={mounted ? isDark : undefined}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink-2 transition-colors hover:bg-surface hover:text-ink ${className}`}
    >
      {/* Avoid hydration mismatch: render a stable icon until mounted. */}
      {mounted && isDark ? (
        <Sun className="h-5 w-5" strokeWidth={1.75} />
      ) : (
        <Moon className="h-5 w-5" strokeWidth={1.75} />
      )}
    </button>
  );
}
