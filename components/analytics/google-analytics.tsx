"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// No-ops until NEXT_PUBLIC_GA_MEASUREMENT_ID is set (create a GA4 property
// at analytics.google.com, then add the Measurement ID to .env.local / Vercel).
// Loads unconditionally on the production host - no consent gate, no banner.
export function GoogleAnalytics() {
  const [isProductionHost, setIsProductionHost] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    setIsProductionHost(window.location.hostname === "www.vistrow.com");
  }, []);

  if (!measurementId || !isProductionHost) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
