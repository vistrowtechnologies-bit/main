import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-section">
      <div className="container-edge text-center">
        <p className="font-display text-[clamp(4rem,12vw,8rem)] font-extrabold leading-none tracking-tight text-accent-strong">
          404
        </p>
        <h1 className="mt-4 font-display text-h2 text-ink">This page took a wrong turn.</h1>
        <p className="mx-auto mt-4 max-w-md font-sans text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you
          back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary px-8 py-4 text-base">
            <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            Back to home
          </Link>
          <Link href="/contact" className="btn-secondary px-8 py-4 text-base">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
