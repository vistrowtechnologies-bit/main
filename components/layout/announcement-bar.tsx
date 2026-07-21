import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 border-b border-white/5 bg-[#0d0d0d] text-[#f5f7fa] dark:bg-[#1c1c1e]">
      <div className="container-edge flex items-center justify-center gap-2 py-2 text-center">
        <p className="font-sans text-[13px] font-medium text-[#f5f7fa]/90">
          Digital marketing, CRM and automation - built to work together.
        </p>
        <Link
          href="/growth-audit"
          className="hidden items-center gap-1 font-sans text-[13px] font-semibold text-accent transition-all hover:gap-2 sm:inline-flex"
        >
          Book a Growth Audit
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
