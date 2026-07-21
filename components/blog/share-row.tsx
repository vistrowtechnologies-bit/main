"use client";

import { useState } from "react";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";

export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const links = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: Twitter,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: Linkedin,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — nothing to fall back to.
    }
  };

  return (
    <div className="flex items-center gap-2">
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent-strong"
        >
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy article link"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent-strong"
      >
        {copied ? <Check className="h-4 w-4 text-accent-strong" strokeWidth={2} /> : <Link2 className="h-4 w-4" strokeWidth={1.8} />}
      </button>
    </div>
  );
}
