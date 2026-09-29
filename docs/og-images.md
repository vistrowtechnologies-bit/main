# Social Preview Images

The default preview is `public/og-vistrow-v2.png` (1200 x 630). Its versioned URL
helps distinguish it from the previous `/og.png` in social caches.

Blog previews render at `/api/og/blog/<slug>` using the published article title,
category, original logo, and locally bundled Manrope Bold. They include
`vistrow.com | 9067097779`. Missing articles return 404. Separately selected
editorial social images are preserved; social images copied from the featured
image use the branded template instead.

The new default image was created with the built-in image generation tool.
Generation brief: white fine-grid background, original Vistrow logo reference,
carbon black typography, neon lime highlight, and a folded black/silver/lime 3D
growth sculpture. Headline: "Digital marketing. Connected systems. Measurable
growth." Avoid glowing networks, robots, dashboards, and invented metrics.
Final edit prompt: change only the footer to "vistrow.com | 9067097779",
preserving the logo, headline, palette, sculpture, lighting, and layout.

The font is distributed under the SIL Open Font License in
`public/fonts/manrope-OFL.txt`.
