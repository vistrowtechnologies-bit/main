"use client";

import { useEffect, useRef } from "react";

// Two quiet bot checks: a field people never see (bots fill every input), and the time since the
// form appeared (bots submit within milliseconds). Positioned off-screen rather than display:none,
// because many bots skip hidden fields.
export function SpamGuard() {
  const startedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>
      <input ref={startedAt} type="hidden" name="_t" />
    </div>
  );
}

export function readSpamGuard(form: HTMLFormElement) {
  const data = new FormData(form);
  const startedAt = Number(data.get("_t"));
  return {
    _gotcha: String(data.get("_gotcha") || ""),
    _elapsed: startedAt ? Date.now() - startedAt : undefined,
  };
}
