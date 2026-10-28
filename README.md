# Aqil — Personal Portfolio

Personal portfolio of **Nurman Aqil Wicaksono**, an Informatics undergraduate at Universitas Sebelas Maret interested in project management, team coordination, and technology.

Built with **React 19 + Vite 7 + Tailwind CSS 4**, with static prerendering for initial content and React hydration for interactions. The site includes a scroll-driven 3D collaboration archive, floating glass navigation, and subtle smoke/pixel effects, with reduced-motion fallbacks.

## Development

Requires **Node.js 22.12+** (Node 24 recommended).

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:4173`. Vite updates the browser automatically as components change. On Windows, `start.cmd` is available and installs dependencies if npm is available.

For reproducible installs with the committed lockfile, use `corepack pnpm install --frozen-lockfile` instead of `npm install`.

```sh
npm run build      # Build and prerender to dist/
npm test           # Verify built HTML, assets, and animation geometry
npm run preview    # Serve the production build
```

Existing commands `node scripts/dev.mjs` and `node scripts/build.mjs` remain supported.

## Structure

| Path | Purpose |
|---|---|
| `src/App.jsx` | Main layout and page sections |
| `src/components/Archive.jsx` | React gallery, hover preview, and image viewer |
| `src/hooks` | Scroll/navigation lifecycle and visual effects |
| `src/data` | Profile, content, and 15-image archive manifest |
| `src/styles/tailwind.css` | Tailwind entry, theme tokens, and glass utility |
| `src/styles` | Custom typography and specialized animation styles |
| `src/scripts` | Animation geometry, smoke, and cursor effects |
| `public/assets` | Optimized WebP images |
| `scripts` | Vite server and prerender build |
| `tests` | Built-content, asset, and motion checks |

The archive includes ten online-session screenshots and five additional in-person photographs. Duplicate source photos are excluded. Originals remain in the local `asset/` directory; optimized images are committed in `public/assets/`.

Layout, spacing, responsive breakpoints, navigation states, and UI borders use Tailwind utilities in JSX. Custom CSS handles the 3D gallery, blur, smoke, and fine typography. Tailwind is compiled by the official Vite plugin; no CDN script is used.

## Cloudflare deployment

The existing **Workers Static Assets** deployment remains compatible:

- **Build command:** `node scripts/build.mjs`
- **Deploy command:** `npx wrangler deploy --assets ./dist --name portfolio --compatibility-date 2026-10-27`
- **Node version:** 24 (also declared in `.node-version`).

Commit the dependency lockfile and Vite configuration so Cloudflare can install the new dependencies. Deploy only `dist/`; no application server is required. The site retains preview indexing restrictions until explicitly enabled for search.

To push this migration without including local originals or working documents:

```sh
git add src public scripts tests package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version vite.config.js index.html start.cmd README.md .gitignore
git commit -m "Migrate portfolio to React and Vite"
git push origin main
```

## Connect

[GitHub](https://github.com/nurmanaqil) · [LinkedIn](https://www.linkedin.com/in/nurmanaqil/)

Visual inspiration: [Grilled Pixels](https://www.grilledpixels.com/ecommerce/). Photography and collaboration imagery belong to their respective owners.
