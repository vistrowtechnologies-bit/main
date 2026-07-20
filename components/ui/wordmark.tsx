import Link from "next/link";
import Image from "next/image";

// Intrinsic size of the trimmed logo lockups in /public.
const LOGO_W = 470;
const LOGO_H = 128;

export function Wordmark({
  className = "",
  height = 38,
  priority = false,
}: {
  className?: string;
  height?: number;
  priority?: boolean;
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
        priority={priority}
        className="block h-auto w-auto dark:hidden"
        style={{ height, width: "auto" }}
      />
      {/* Dark-mode lockup */}
      <Image
        src="/logo-dark.png"
        alt="Vistrow"
        width={width}
        height={height}
        priority={priority}
        className="hidden h-auto w-auto dark:block"
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}
