import { mkdir, readFile, writeFile, cp, access, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { renderPage } from '../src/components/page.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const output = path.join(root, 'dist');
export async function build() {
  await mkdir(output, { recursive: true });
  await Promise.all(['styles', 'scripts', 'assets'].map(folder => mkdir(path.join(output, folder), { recursive: true })));
  await cp(path.join(root, 'public'), output, {
    recursive: true,
    // Skip unchanged assets, including those being served by another local process.
    filter: async (source, destination) => {
      const sourceInfo = await stat(source);
      if (!sourceInfo.isFile()) return true;
      try {
        const destinationInfo = await stat(destination);
        return sourceInfo.size !== destinationInfo.size || sourceInfo.mtimeMs > destinationInfo.mtimeMs;
      } catch { return true; }
    },
  });
  await cp(path.join(root, 'src/styles'), path.join(output, 'styles'), { recursive: true });
  await cp(path.join(root, 'src/scripts'), path.join(output, 'scripts'), { recursive: true });
  await cp(path.join(root, 'src/data/content.mjs'), path.join(output, 'scripts/content.js'));
  await writeFile(path.join(output, 'index.html'), renderPage());
  await writeFile(path.join(output, '404.html'), '<!doctype html><html lang="en"><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Page not found — Aqil</title><style>body{background:#080808;color:#eeede8;font:18px Arial;padding:12vw}a{color:inherit}h1{font-size:clamp(50px,10vw,130px);letter-spacing:-.06em}</style><h1>A wrong turn.</h1><p>Let’s get you back to the good stuff.</p><a href="/">Back to Aqil’s portfolio ↗</a></html>');
  try { await access(path.join(output, 'assets/aqil-portrait.webp')); }
  catch { throw new Error('Optimized assets missing. Run scripts/prepare_assets.py first; see README.md.'); }
  console.log(`Built portfolio → ${output}`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
