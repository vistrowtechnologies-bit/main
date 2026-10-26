"use client";

import { useEffect } from "react";
import { CONSENT_CHANGED_EVENT, readConsent } from "@/lib/consent";

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

// Microsoft Clarity (heatmaps and session recordings), project "Vistrow". The project ID is public by design
// (it is visible in every visitor's browser), so it lives here; NEXT_PUBLIC_CLARITY_PROJECT_ID overrides it.
// Loads only on the production host, and only after the visitor accepts analytics in the cookie banner.
const CLARITY_PROJECT_ID = "z3n5jioqgx";

// If they later reject, Clarity is told to stop and clear its cookies.
export function MicrosoftClarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || CLARITY_PROJECT_ID;

  useEffect(() => {
    if (!projectId || window.location.hostname !== "www.vistrow.com") return;

    const load = () => {
      if (document.getElementById("ms-clarity")) {
        window.clarity?.("consent");
        return;
      }
      window.clarity =
        window.clarity ||
        Object.assign((...args: unknown[]) => {
          (window.clarity!.q = window.clarity!.q || []).push(args);
        }, {});
      const tag = document.createElement("script");
      tag.id = "ms-clarity";
      tag.async = true;
      tag.src = `https://www.clarity.ms/tag/${projectId}`;
      document.head.appendChild(tag);
      window.clarity("consent");
    };

    const apply = () => {
      if (readConsent() === "granted") load();
      else window.clarity?.("consent", false);
    };

    apply();
    window.addEventListener(CONSENT_CHANGED_EVENT, apply);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, apply);
  }, [projectId]);

  return null;
}
