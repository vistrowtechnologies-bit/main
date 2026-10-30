"use client";

import { usePathname } from "next/navigation";

const lines = {
  IN: "An AI agency for Indian businesses: AI voice agents, WhatsApp AI and AI CRM, connected to the marketing that brings enquiries in.",
  US: "An AI agency that sets up AI call answering, instant replies and follow-up for US dental practices and contractors.",
  UK: "An AI agency that sets up AI call answering, instant replies and follow-up for UK dental practices and trades.",
} as const;

export function FooterTagline() {
  const pathname = usePathname();
  const market = pathname === "/us" || pathname?.startsWith("/us/") ? "US" : pathname === "/uk" || pathname?.startsWith("/uk/") ? "UK" : "IN";
  return <>{lines[market]}</>;
}
