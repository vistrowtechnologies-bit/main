import type { Config } from "tailwindcss";

/**
 * Semantic color tokens are backed by CSS variables (space-separated RGB
 * channels) defined per-theme in globals.css. This lets a single `.dark`
 * class on <html> flip the whole system while still supporting Tailwind's
 * `/opacity` modifiers via `rgb(var(--x) / <alpha-value>)`.
 */
const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: withOpacity("--bg"),
        surface: withOpacity("--surface"),
        card: withOpacity("--card"),
        ink: withOpacity("--ink"),
        "ink-2": withOpacity("--ink-2"),
        muted: withOpacity("--muted"),
        line: withOpacity("--line"),
        // Neon lime accent (constant across themes)
        accent: withOpacity("--accent"),
        "accent-ink": withOpacity("--accent-ink"),
        "accent-tint": withOpacity("--accent-tint"),
        // High-contrast accent used for text/links/stats (olive on light, lime on dark)
        "accent-strong": withOpacity("--accent-strong"),
        // Inverse panel (carbon in light mode)
        inverse: withOpacity("--inverse"),
        "inverse-ink": withOpacity("--inverse-ink"),
        "inverse-ink-2": withOpacity("--inverse-ink-2"),
        success: withOpacity("--success"),
        warning: withOpacity("--warning"),
        error: withOpacity("--error"),
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-lg": ["clamp(2.75rem, 5.5vw, 4.75rem)", { lineHeight: "1.04", letterSpacing: "-0.04em", fontWeight: "800" }],
        "hero": ["clamp(2.5rem, 4.5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "800" }],
        "h2": ["clamp(1.9rem, 3.4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        "h3": ["clamp(1.4rem, 2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "metric": ["clamp(2.5rem, 4vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "800" }],
      },
      maxWidth: {
        container: "1280px",
        wide: "1440px",
        reading: "720px",
      },
      spacing: {
        gutter: "24px",
        section: "clamp(4rem, 9vw, 8rem)",
      },
      borderRadius: {
        sm: "10px",
        DEFAULT: "12px",
        lg: "18px",
        xl: "24px",
        "2xl": "28px",
      },
      boxShadow: {
        soft: "0 12px 40px rgba(13, 13, 13, 0.08)",
        "soft-dark": "0 12px 40px rgba(0, 0, 0, 0.35)",
        lift: "0 20px 60px rgba(13, 13, 13, 0.12)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "rise-in": "rise-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
