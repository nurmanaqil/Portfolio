# Aqil — Personal Portfolio

Personal portfolio of **Nurman Aqil Wicaksono**, an Informatics undergraduate at Universitas Sebelas Maret interested in project management, team coordination, and technology.

Built with **React 19, Vite 7, and Tailwind CSS 4**. Features include static prerendering, a scroll-driven 3D collaboration archive, floating navigation, and subtle visual effects with reduced-motion fallbacks.

## Development

Requires **Node.js 22.12+**; Node 24 is recommended.

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:4173`. On Windows, `start.cmd` is also available. Use `npm.cmd` instead of `npm` if PowerShell blocks npm scripts.

For a reproducible installation using the committed lockfile: `corepack pnpm install --frozen-lockfile`.

```sh
npm run build      # Generate and prerender dist/
npm test           # Verify the production build
npm run preview    # Preview the production build locally
```

## Content and structure

| Path | Purpose |
|---|---|
| `src/App.jsx` | Page sections and layout |
| `src/components/Archive.jsx` | Gallery and image viewer |
| `src/data/content.mjs` | Profile, links, and individually editable photo captions |
| `src/hooks` / `src/scripts` | Navigation and visual interactions |
| `src/styles` | Tailwind entry, design tokens, and custom effects |
| `public/assets` | Optimized images shipped with the site |
| `scripts` / `tests` | Build tools and verification |
| `firebase.json` | Firebase Hosting configuration targeting dist/ |

The archive contains 11 photos. Edit each image’s `caption` in `src/data/content.mjs`; labels follow their original photos even when the gallery order is mixed. Original images remain in the local `asset/` folder.

## Deployment

The build is a **static website**. Deploy only **`dist/`**, not the repository root or `public/`. The same build can be hosted on Firebase or Cloudflare without changing the application.

### Firebase Hosting

The project now includes Firebase Hosting configuration. Install the CLI and authenticate once:

```powershell
npm.cmd install -g firebase-tools
firebase.cmd login
```

Create a Firebase project in the console, then build and deploy from this repository’s root:

```powershell
npm.cmd run build
firebase.cmd deploy --only hosting --project YOUR_PROJECT_ID
```

Replace `YOUR_PROJECT_ID` with the target Firebase project ID, not its display name. Use these same two commands for every website update. There is no need to rerun `firebase init hosting` because `firebase.json` is already provided.

To switch projects, change `--project YOUR_PROJECT_ID`. Alternatively, run `firebase.cmd use --add`, select the new project, and assign it the alias `default`; subsequent deployments can omit `--project`.

**A GitHub push does not automatically deploy to Firebase** unless GitHub deployment automation has been configured separately. Existing deployments in other projects or on Cloudflare remain active until explicitly disabled.

### Cloudflare

| Platform | Build command | Output / deployment |
|---|---|---|
| Workers Static Assets | `node scripts/build.mjs` | Deploy command below |
| Pages | `node scripts/build.mjs` | Output directory: `dist`; framework: None |

Workers deploy command:

```sh
npx wrangler deploy --assets ./dist --name portfolio --compatibility-date 2026-10-27
```

Use Node 24 for hosted builds. Cloudflare deployment on push depends on the repository integration and production branch configured in its dashboard.

### When changing the domain or hosting platform

- Update absolute `og:image` and `twitter:image` URLs in `index.html` to the new public domain.
- Confirm the favicon, photo viewer, mobile layout, and external links on the deployed URL.
- Remove the preview `noindex` meta tag and update `public/robots.txt` when ready for search indexing.
- Keep `firebase.json`, build configuration, and the dependency lockfile in Git. Do not commit `node_modules/`, `dist/`, or local hosting caches.

## Connect

[GitHub](https://github.com/nurmanaqil) · [LinkedIn](https://www.linkedin.com/in/nurmanaqil/)

Visual inspiration: [Grilled Pixels](https://www.grilledpixels.com/ecommerce/). Photography and collaboration imagery belong to their respective owners.
