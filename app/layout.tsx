import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RouteTransition, ScrollProgress } from "@/components/ui/motion-primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { graph, websiteSchema } from "@/lib/structured-data";
import { ChatWidget } from "@/components/chat/chat-widget";
import { AccentSwitcher } from "@/components/accent-switcher";
import { CookieConsent } from "@/components/privacy/cookie-consent";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Vistrow Technologies | Digital Marketing and Business Automation",
    description:
      "Vistrow connects performance marketing, lead generation, CRM, AI voice agents, automation, and conversion tracking into one measurable growth system.",
    path: "/",
  }),
  metadataBase: new URL("https://www.vistrow.com"),
  title: {
    default: "Vistrow Technologies | Digital Marketing and Business Automation",
    template: "%s | Vistrow",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

// Runs before paint to set the theme class and accent color, avoiding a flash of the wrong theme.
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('vistrow-theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : systemDark;
    document.documentElement.classList.toggle('dark', isDark);

    var accent = localStorage.getItem('vistrow-accent');
    if (accent && accent !== 'lime') {
      document.documentElement.setAttribute('data-accent', accent);
    }
  } catch (e) {}
})();
`;

// Establish denied consent before any optional Google tag can load.
const consentModeScript = `
(function() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script id="ga-consent-default" dangerouslySetInnerHTML={{ __html: consentModeScript }} />
        <JsonLd data={graph([websiteSchema])} />
      </head>
      <body className="font-sans antialiased">
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
        <ChatWidget />
        <AccentSwitcher />
        <CookieConsent />
      </body>
    </html>
  );
}
