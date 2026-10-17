"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("@/components/chat/chat-widget").then((mod) => mod.ChatWidget), { ssr: false });
const AccentSwitcher = dynamic(() => import("@/components/accent-switcher").then((mod) => mod.AccentSwitcher), { ssr: false });

// The floating chat and accent buttons are not needed for first paint, so their code
// loads once the page has finished loading and the browser is idle.
export function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const show = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      } else {
        setTimeout(() => setReady(true), 1200);
      }
    };
    if (document.readyState === "complete") {
      show();
      return;
    }
    window.addEventListener("load", show, { once: true });
    return () => window.removeEventListener("load", show);
  }, []);

  if (!ready) return null;

  return (
    <>
      <ChatWidget />
      <AccentSwitcher />
    </>
  );
}
