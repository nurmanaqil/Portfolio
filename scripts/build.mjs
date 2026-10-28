import { build, createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { renderToString } from 'react-dom/server';
import React from 'react';

await build();
// Pre-render the same React tree used by the browser for fast initial content.
const server = await createServer({ optimizeDeps: { noDiscovery: true, entries: [] }, server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const html = await readFile('dist/index.html', 'utf8');
  await writeFile('dist/index.html', html.replace('<div id="root"></div>', `<div id="root">${renderToString(React.createElement(App))}</div>`));
  console.log('React portfolio prerendered successfully. Deploy dist/.');
} finally { await server.close(); }
