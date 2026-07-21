"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { primaryNav, type NavItem } from "@/lib/nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccentSwitcher } from "@/components/accent-switcher";
import { Wordmark } from "@/components/ui/wordmark";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (item: NavItem) => {
    const paths = item.activeMatch ?? [item.href];
    return paths.some((path) =>
      path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/"),
    );
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menus on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openWith = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ease-premium ${
        scrolled
          ? "glass border-line/60 shadow-soft"
          : "border-transparent bg-bg/60 backdrop-blur-md"
      }`}
    >
      <nav
        className="container-edge grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]"
        aria-label="Primary"
      >
        <div className="flex min-w-0 items-center">
          <Wordmark className="shrink-0" priority />
        </div>

        <ul className="hidden items-center justify-self-center gap-0.5 lg:flex xl:gap-1">
          {primaryNav.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => (item.children || item.groups) && openWith(item.label)}
              onMouseLeave={scheduleClose}
            >
              <NavTrigger
                item={item}
                open={openMenu === item.label}
                active={isActive(item)}
                onFocus={() => (item.children || item.groups) && openWith(item.label)}
                onClick={() =>
                  setOpenMenu((cur) => (cur === item.label ? null : item.label))
                }
              />
              {(item.children || item.groups) && openMenu === item.label && (
                <MegaMenu item={item} onClose={() => setOpenMenu(null)} />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-self-end gap-1.5 sm:gap-2">
          <AccentSwitcher />
          <ThemeToggle />
          <Link
            href="/growth-audit"
            className="btn-primary hidden whitespace-nowrap sm:inline-flex"
          >
            Book a Growth Audit
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>
      </nav>
    </header>

    {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </>
  );
}

function NavTrigger({
  item,
  open,
  active,
  onClick,
  onFocus,
}: {
  item: NavItem;
  open: boolean;
  active: boolean;
  onClick: () => void;
  onFocus: () => void;
}) {
  const base =
    "nav-link-motion relative flex items-center gap-1 whitespace-nowrap rounded-sm px-2.5 py-2 font-sans text-[15px] font-medium transition-colors";
  const tone = active ? "text-ink" : open ? "text-ink" : "text-ink-2 hover:text-ink";
  const indicator = active ? (
    <span className="absolute -bottom-[3px] left-2.5 right-2.5 h-[2px] rounded-full bg-accent" />
  ) : null;

  if (!item.children && !item.groups) {
    return (
      <Link href={item.href} aria-current={active ? "page" : undefined} className={`${base} ${tone}`}>
        {item.label}
        {indicator}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={`${base} ${tone}`}
      aria-expanded={open}
      aria-haspopup="true"
      onClick={onClick}
      onFocus={onFocus}
    >
      {item.label}
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        strokeWidth={2}
      />
      {indicator}
    </button>
  );
}

function MegaMenu({ item, onClose }: { item: NavItem; onClose: () => void }) {
  if (item.groups) {
    return (
      <div className="absolute left-0 top-full z-50 pt-3">
        <div className="dropdown-glass w-[min(92vw,580px)] overflow-hidden rounded-lg p-5 animate-rise-in">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {item.groups.map((group) => (
              <div key={group.title}>
                <p className="mb-1.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  {group.title}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="block rounded-sm px-2.5 py-2 font-sans text-sm font-medium text-ink-2 transition-colors hover:bg-surface/80 hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {item.linkRows && (
            <div className="mt-5 space-y-2">
              {item.linkRows.map((row) => (
                <div
                  key={row.href}
                  className="flex items-center justify-between rounded-sm border border-line/50 bg-surface/75 px-4 py-3"
                >
                  <span className="font-sans text-[13px] text-muted">{row.label}</span>
                  <Link href={row.href} onClick={onClose} className="btn-ghost">
                    {row.cta} <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-full z-50 pt-3">
      <div className="dropdown-glass w-[min(92vw,560px)] overflow-hidden rounded-lg p-2 animate-rise-in">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="group rounded-sm px-3 py-2.5 transition-colors hover:bg-surface/80"
            >
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm font-semibold text-ink">
                  {child.label}
                </span>
              </div>
              {child.desc && (
                <p className="mt-0.5 font-sans text-[13px] text-muted">{child.desc}</p>
              )}
            </Link>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-between rounded-sm border border-line/50 bg-surface/75 px-3 py-2.5">
          <span className="font-sans text-[13px] text-muted">Explore all {item.label}</span>
          <Link href={item.href} onClick={onClose} className="btn-ghost">
            View overview <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-bg shadow-lift animate-rise-in">
        <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
          <Wordmark />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {primaryNav.map((item) => (
              <MobileNavItem key={item.label} item={item} onClose={onClose} />
            ))}
          </ul>
        </div>
        <div className="border-t border-line p-4">
          <Link href="/growth-audit" onClick={onClose} className="btn-primary w-full">
            Book a Growth Audit
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.children && !item.groups) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onClose}
          className="block rounded-sm px-3 py-2.5 font-display text-lg font-bold text-ink"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left font-display text-lg font-bold text-ink"
      >
        {item.label}
        <ChevronDown
          className={`h-5 w-5 text-muted transition-transform duration-200 ${open ? "rotate-180 text-accent-strong" : ""}`}
          strokeWidth={2}
        />
      </button>
      {open && (
        <div className="mb-2 ml-3 space-y-3 border-l border-line pl-3 animate-rise-in">
          {item.groups
            ? item.groups.map((group) => (
                <div key={group.title}>
                  <p className="px-2 py-1 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    {group.title}
                  </p>
                  <ul className="space-y-0.5">
                    {group.items.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="block rounded-sm px-2 py-2 font-sans text-[15px] text-ink-2 transition-colors hover:text-accent-strong"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            : (
                <ul className="space-y-0.5">
                  {item.children!.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="block rounded-sm px-2 py-2 font-sans text-[15px] text-ink-2 transition-colors hover:text-accent-strong"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
          {item.linkRows && (
            <div className="space-y-1.5 pt-1">
              {item.linkRows.map((row) => (
                <Link
                  key={row.href}
                  href={row.href}
                  onClick={onClose}
                  className="block rounded-sm bg-surface px-2.5 py-2 font-sans text-[13px] font-semibold text-accent-strong"
                >
                  {row.cta}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}
