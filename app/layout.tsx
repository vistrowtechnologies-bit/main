import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
  metadataBase: new URL("https://vistrow.com"),
  title: {
    default: "Vistrow | Digital marketing connected to business growth",
    template: "%s | Vistrow",
  },
  description:
    "Vistrow combines performance marketing, landing pages, CRM, AI voice, automation, and conversion tracking to help businesses generate more opportunities and manage them more effectively.",
  keywords: [
    "digital marketing",
    "business automation",
    "CRM",
    "AI voice calling",
    "lead generation",
    "conversion tracking",
  ],
  openGraph: {
    type: "website",
    siteName: "Vistrow",
    title: "Vistrow | Digital marketing connected to business growth",
    description:
      "Generate demand. Manage leads. Automate follow-ups. Improve conversions.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

// Runs before paint to set the theme class and avoid a flash of the wrong theme.
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('vistrow-theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : systemDark;
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
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
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
