import http from 'node:http';
import path from 'node:path';
import { readFile, stat, watch } from 'node:fs/promises';
import { root, output, build } from './build.mjs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

await build();
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json' };
const portArg = process.argv.indexOf('--port');
const port = Number(portArg >= 0 ? process.argv[portArg + 1] : process.env.PORT || 4173);
const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/__qa') {
      const width = Math.max(320, Math.min(1600, Number(url.searchParams.get('width')) || 390));
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(`<!doctype html><html lang="en"><meta charset="UTF-8"><title>Local responsive QA — ${width}px</title><style>body{margin:0;background:#242424;color:white;font:12px monospace}p{margin:12px}iframe{display:block;margin:12px;border:1px solid #666;background:#080808;width:${width}px;height:844px}</style><p>LOCAL RESPONSIVE QA / ${width}px — not included in production build</p><p id="result">Checking layout…</p><iframe title="Portfolio at ${width}px" src="/"></iframe><script>const frame=document.querySelector('iframe');frame.addEventListener('load',()=>{requestAnimationFrame(()=>{const d=frame.contentDocument;const w=d.documentElement.clientWidth;const s=d.documentElement.scrollWidth;document.querySelector('#result').textContent='Viewport: '+w+'px / Content: '+s+'px / Horizontal overflow: '+(s>w?'FAIL':'PASS');});});</script></html>`);
      return;
    }
    const target = path.resolve(output, '.' + decodeURIComponent(url.pathname));
    if (target !== output && !target.startsWith(output + path.sep)) { response.writeHead(403); response.end('Forbidden'); return; }
    let file = target;
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    response.end(content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(await readFile(path.join(output, '404.html')));
  }
});
server.on('error', error => { console.error(`Preview failed: ${error.message}. Try --port ${port + 1}.`); process.exit(1); });
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
if (!process.argv.includes('--preview')) {
  let timeout;
  const watcher = watch(path.join(root, 'src'), { recursive: true });
  (async () => {
    for await (const event of watcher) {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        // A fresh process reloads template and content imports on every build.
        try {
          const result = await run(process.execPath, [path.join(root, 'scripts/build.mjs')]);
          console.log(result.stdout.trim());
        } catch (error) { console.error(error.message); }
      }, 100);
    }
  })().catch(console.error);
}
