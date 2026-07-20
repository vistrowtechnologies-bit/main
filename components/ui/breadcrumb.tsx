import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-sans text-[13px] text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-accent-strong">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-2">{item.label}</span>
            )}
            {i < items.length - 1 && (
              <ChevronRight className="h-3.5 w-3.5 text-muted/60" strokeWidth={2} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
