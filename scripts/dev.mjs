import { createServer, preview } from 'vite';

const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = portIndex >= 0 ? Number(args[portIndex + 1]) : 4173;
const options = { host: '127.0.0.1', port, strictPort: true };
if (args.includes('--preview')) {
  const server = await preview({ preview: options });
  server.printUrls();
} else {
  const server = await createServer({ server: options });
  await server.listen();
  server.printUrls();
}
