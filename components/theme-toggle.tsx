"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("vistrow-theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
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
