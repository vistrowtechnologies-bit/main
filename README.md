# Vistrow

Marketing website for **Vistrow Technologies** — a digital-marketing-first technology company connecting marketing to CRM, AI voice, automation, and conversion tracking.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with a token-based design system
- [Framer Motion](https://www.framer.com/motion/) for controlled motion
- [lucide-react](https://lucide.dev/) icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Copy `.env.example` to `.env.local` and add a Resend API key to deliver Contact and Growth Audit submissions. Add the same variables in Vercel for production.

## Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the dev server               |
| `npm run build` | Production build                   |
| `npm run start` | Serve the production build         |
| `npm run lint`  | Lint the project                   |

## Structure

```
app/                     App Router routes + metadata (sitemap, robots)
components/
  layout/                Header, footer, announcement bar
  sections/              Reusable page sections
  templates/             Service / industry / product / overview / legal / work templates
  forms/                 Contact + Growth Audit forms
  ui/                    Primitives (wordmark, breadcrumb, reveal, section heading)
content/                 Typed content data driving the templates
lib/                     Nav + content types
public/                  Logos and static assets
```

## Design system

- **White-first** palette with carbon/graphite structure and a controlled **neon-lime** accent (`#C6FF00`).
- Headlines in **Manrope**, body/UI in **Inter**.
- Full **light / dark** mode with system preference + `localStorage` persistence.
- Restrained glassmorphism, WCAG-minded contrast, reduced-motion support.

## Notes

- Product information is based on the live ArthaLeads and Vistrow Voice product sites.
- Work examples are labelled as solution examples unless a named client result has been verified and approved for publication.
- Contact and Growth Audit submissions are validated on the client and server, protected by a honeypot and basic rate limiting, and delivered through Resend.
