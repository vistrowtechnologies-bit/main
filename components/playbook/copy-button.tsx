"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setState("done");
        } catch {
          setState("fail");
        }
        setTimeout(() => setState("idle"), 1800);
      }}
      className="absolute bottom-2.5 right-2.5 rounded-full bg-ink px-3.5 py-1.5 font-sans text-xs font-semibold text-surface transition active:scale-95"
    >
      {state === "done" ? "Copied ✓" : state === "fail" ? "Select & copy" : "Copy"}
    </button>
  );
}

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-secondary w-full sm:w-auto">
      Save as PDF
    </button>
  );
}
