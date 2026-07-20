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

- Client/logos, case studies, and statistics are **representative placeholders** — replace with verified content before launch.
- The Contact and Growth Audit forms validate client-side and show success states but are **not yet wired to a backend**.
