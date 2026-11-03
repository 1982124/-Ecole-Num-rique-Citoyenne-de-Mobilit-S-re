'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}
function assert(condition, message) {
  if (!condition) throw new Error('Contrôle PWA échoué : ' + message);
}
const manifest = JSON.parse(read('public/manifest.webmanifest'));
const html = read('public/index.html');
const sw = read('public/sw.js');
assert(manifest.name && manifest.short_name, 'nom et nom court du manifeste requis');
assert(manifest.start_url === '/' && manifest.scope === '/', 'start_url et scope doivent rester à la racine');
assert(manifest.display === 'standalone', 'affichage standalone requis pour l’installation');
assert(manifest.lang === 'fr', 'langue par défaut française attendue');
assert(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'au moins une icône PWA requise');
for (const icon of manifest.icons) {
  assert(typeof icon.src === 'string' && icon.src.startsWith('/') && !icon.src.startsWith('//'), 'chemin d’icône local requis');
  const iconPath = path.join(publicDir, icon.src.replace(/^\//, ''));
  assert(fs.existsSync(iconPath) && fs.statSync(iconPath).isFile(), 'icône introuvable : ' + icon.src);
}
const shellMatch = sw.match(/const APP_SHELL = (\[[\s\S]*?\]);/);
assert(shellMatch, 'liste APP_SHELL introuvable');
const shell = vm.runInNewContext(shellMatch[1]);
assert(shell.includes('/'), 'la page d’accueil doit être précachée');
assert(new Set(shell).size === shell.length, 'APP_SHELL ne doit pas contenir de doublons');
for (const asset of shell) {
  assert(typeof asset === 'string' && asset.startsWith('/') && !asset.startsWith('//'), 'ressource du cache non locale : ' + asset);
  if (asset !== '/') {
    const assetPath = path.join(publicDir, asset.replace(/^\//, ''));
    assert(fs.existsSync(assetPath) && fs.statSync(assetPath).isFile(), 'ressource précachée absente : ' + asset);
  }
}
assert(fs.existsSync(path.join(publicDir, 'sw.js')), 'service worker absent du dossier publié');
assert(/navigator\.serviceWorker\.register\(['"]\/sw\.js['"]\)/.test(html), 'enregistrement du service worker absent');
assert(sw.includes("request.mode === 'navigate'"), 'stratégie de navigation hors ligne absente');
assert(sw.includes("caches.match('/')"), 'solution de repli hors ligne de la page absente');
assert(sw.includes('self.skipWaiting()') && sw.includes('self.clients.claim()'), 'activation de la nouvelle version du service worker incomplète');
assert(sw.includes("key !== CACHE_NAME"), 'nettoyage des anciens caches absent');
assert(sw.includes("request.method !== 'GET'"), 'les requêtes non GET doivent être ignorées');
console.log('Contrôles PWA réussis : manifeste, ' + shell.length + ' ressources locales précachées, navigation hors ligne et cycle de mise à jour.');