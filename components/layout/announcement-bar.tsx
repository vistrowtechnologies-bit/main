"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

const messages = {
  IN: "The AI agency for Indian businesses: AI voice, WhatsApp AI and AI CRM.",
  US: "AI call answering and follow-up for US dental practices and contractors.",
  UK: "AI call answering and follow-up for UK dental practices and trades.",
} as const;

export function AnnouncementBar() {
  const pathname = usePathname();
  const market = pathname === "/us" || pathname?.startsWith("/us/") ? "US" : pathname === "/uk" || pathname?.startsWith("/uk/") ? "UK" : "IN";
  return (
    <div className="relative z-50 hidden border-b border-white/5 bg-[#0d0d0d] text-[#f5f7fa] dark:bg-[#1c1c1e] lg:block">
      <div className="container-edge flex flex-row items-center justify-center gap-2 py-2 text-center">
        <p className="font-sans text-[13px] font-medium text-[#f5f7fa]/90">{messages[market]}</p>
        <Link
          href="/growth-audit"
          className="inline-flex min-h-6 items-center gap-1 font-sans text-[13px] font-semibold text-accent transition-all hover:gap-2"
        >
          Request a Growth Audit
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
