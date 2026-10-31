"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { rememberMarket } from "@/lib/market";

export const markets = [
  { code: "IN", label: "India", href: "/", hint: "Home" },
  { code: "US", label: "United States", href: "/us", hint: "US businesses" },
  { code: "UK", label: "United Kingdom", href: "/uk", hint: "UK businesses" },
] as const;

export function currentMarket(pathname: string | null) {
  if (pathname === "/us" || pathname?.startsWith("/us/")) return markets[1];
  if (pathname === "/uk" || pathname?.startsWith("/uk/")) return markets[2];
  return markets[0];
}

// Compact country switcher for the header. Plain links, so every market hub is crawlable and works without JavaScript.
export function MarketSwitcher() {
  const pathname = usePathname();
  const active = currentMarket(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    rememberMarket(pathname);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Market: ${active.label}. Change market`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-1.5 rounded-sm px-2 font-sans text-[13px] font-semibold text-ink-2 transition-colors hover:text-ink"
      >
        <Globe className="h-4 w-4" strokeWidth={1.75} />
        {active.code}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} strokeWidth={2} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 pt-2">
          <ul className="dropdown-glass w-56 overflow-hidden rounded-lg p-1.5 animate-rise-in">
            {markets.map((m) => (
              <li key={m.code}>
                <Link
                  href={m.href}
                  className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 font-sans text-sm text-ink transition-colors hover:bg-accent/10"
                >
                  <span>
                    <span className="block font-semibold">{m.label}</span>
                    <span className="block text-xs text-muted">{m.hint}</span>
                  </span>
                  {m.code === active.code && <Check className="h-4 w-4 text-accent-strong" strokeWidth={2.25} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
