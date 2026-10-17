import Link from "next/link";
import Image from "next/image";

// Intrinsic size of the trimmed logo lockups in /public.
const LOGO_W = 494;
const LOGO_H = 152;

export function Wordmark({
  className = "",
  height = 38,
  eager = false,
}: {
  className?: string;
  height?: number;
  /** Load immediately (above the fold) without a high-priority preload competing with the hero text. */
  eager?: boolean;
}) {
  const width = Math.round((height * LOGO_W) / LOGO_H);
  return (
    <Link
      href="/"
      aria-label="Vistrow home"
      className={`inline-flex items-center ${className}`}
    >
      {/* Light-mode lockup */}
      <Image
        src="/logo-light.png"
        alt="Vistrow"
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        className="block dark:hidden"
      />
      {/* Dark-mode lockup */}
      <Image
        src="/logo-dark.png"
        alt="Vistrow"
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        className="hidden dark:block"
      />
    </Link>
  );
}
