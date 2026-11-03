"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { rememberMarket } from "@/lib/market";

export const markets = [
  { code: "IN", label: "India", href: "/", hint: "Home" },
  { code: "US", label: "United States", href: "/us", hint: "US businesses" },
  { code: "UK", label: "United Kingdom", href: "/uk", hint: "UK businesses" },
] as const;


// Small round flags drawn as SVG (flag emoji show up as plain letters on Windows).
export function Flag({ code, size = 20 }: { code: "IN" | "US" | "UK"; size?: number }) {
  const id = `flag-${code}-${size}`;
  const box = code === "UK" ? "0 0 60 30" : "0 0 30 20";
  return (
    <svg width={size} height={size} viewBox={box} preserveAspectRatio="xMidYMid slice" aria-hidden className="shrink-0 rounded-full ring-1 ring-black/10" style={{ overflow: "hidden" }}>
      <clipPath id={id}>
        <rect width={code === "UK" ? 60 : 30} height={code === "UK" ? 30 : 20} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        {code === "IN" && (
          <>
            <rect width="30" height="20" fill="#fff" />
            <rect width="30" height="6.67" fill="#FF9933" />
            <rect y="13.33" width="30" height="6.67" fill="#138808" />
            <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.7" />
            <circle cx="15" cy="10" r="0.6" fill="#000080" />
          </>
        )}
        {code === "US" && (
          <>
            <rect width="30" height="20" fill="#fff" />
            {[0, 2, 4, 6, 8, 10, 12].map((i) => (
              <rect key={i} y={i * (20 / 13)} width="30" height={20 / 13} fill="#B22234" />
            ))}
            <rect width="12.5" height={(20 / 13) * 7} fill="#3C3B6E" />
            {[2.5, 6.25, 10].flatMap((x) => [2.2, 5.2, 8.2].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.7" fill="#fff" />))}
          </>
        )}
        {code === "UK" && (
          <>
            <rect width="60" height="30" fill="#012169" />
            <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
            <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" />
            <path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="10" />
            <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
          </>
        )}
      </g>
    </svg>
  );
}

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
        <Flag code={active.code} size={18} />
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
                  <span className="flex items-center gap-3">
                    <Flag code={m.code} size={22} />
                    <span>
                      <span className="block font-semibold">{m.label}</span>
                      <span className="block text-xs text-muted">{m.hint}</span>
                    </span>
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
