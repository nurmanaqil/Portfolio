# Aqil — Personal Portfolio

Personal portfolio of **Nurman Aqil Wicaksono**, an Informatics undergraduate at Universitas Sebelas Maret with an interest in project management, team coordination, and technology.

The website presents my background, software explorations, and collaboration archive from my role as **Project Controlling Manager at AIESEC in UNS**.

## Experience

- Responsive, light editorial design with floating glass navigation.
- Scroll-driven 3D gallery, image viewer, and subtle smoke/pixel effects.
- Keyboard navigation and reduced-motion fallbacks.
- Static HTML with modular CSS and JavaScript; no runtime dependencies.

## Local development

Requires **Node.js 22+**. No dependency installation is needed.

```sh
node scripts/dev.mjs
```

Open `http://127.0.0.1:4173`. On Windows, `start.cmd` is also available.

```sh
node scripts/build.mjs          # Generate dist/
node --test tests/*.test.mjs    # Run checks
```

## Project structure

| Directory | Purpose |
|---|---|
| `src/components` | HTML templates |
| `src/data` | Profile, copy, and image manifest |
| `src/styles` | Design tokens and responsive styles |
| `src/scripts` | Navigation and visual interactions |
| `public` | Optimized images and static assets |
| `scripts` | Build and development tools |
| `tests` | Content and animation checks |

## Deployment

Deploy the generated **`dist/`** directory. For Cloudflare Workers Static Assets:

- **Build:** `node scripts/build.mjs`
- **Deploy:** `npx wrangler deploy --assets ./dist --name portfolio --compatibility-date 2026-10-27`

The site currently retains preview indexing restrictions. Update the robots meta tag and `public/robots.txt` when ready for search indexing.

## Connect

[GitHub](https://github.com/nurmanaqil) · [LinkedIn](https://www.linkedin.com/in/nurmanaqil/)

Visual inspiration: [Grilled Pixels](https://www.grilledpixels.com/ecommerce/). Photography and collaboration imagery belong to their respective owners.
