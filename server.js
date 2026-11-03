'use strict';

// Serveur de prévisualisation locale sans dépendance externe. Vercel sert directement public/.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'public');
const port = Number(process.env.PORT || 3001);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json; charset=utf-8', '.json': 'application/json; charset=utf-8'
};
const server = http.createServer((req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  const pathname = new URL(req.url, 'http://' + (req.headers.host || 'localhost')).pathname;
  if (pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ status: 'ok', app: 'Mali BOLIFEN KALANSO' }));
  }
  let relative;
  try { relative = decodeURIComponent(pathname).replace(/^\/+/, ''); } catch { res.writeHead(400); return res.end('Bad request'); }
  if (!relative || relative.endsWith('/')) relative += 'index.html';
  let file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep) && file !== path.join(root, 'index.html')) {
    res.writeHead(403); return res.end('Forbidden');
  }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) file = path.join(root, 'index.html');
    fs.readFile(file, (readError, data) => {
      if (readError) { res.writeHead(404); return res.end('Not found'); }
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    });
  });
});
server.listen(port, () => console.log('Mali BOLIFEN KALANSO disponible sur http://localhost:' + port));
