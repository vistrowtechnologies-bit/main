"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { consentDefaultsScript } from "@/lib/consent";

// No-ops until NEXT_PUBLIC_GA_MEASUREMENT_ID is set. Loads only on the production host.
// Consent Mode v2: no analytics cookies until the visitor accepts in the cookie banner.
export function GoogleAnalytics() {
  const [isProductionHost, setIsProductionHost] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    setIsProductionHost(window.location.hostname === "www.vistrow.com");
  }, []);

  if (!measurementId || !isProductionHost) return null;

  return (
    <>
      <Script id="ga4-consent" strategy="afterInteractive">
        {consentDefaultsScript}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
