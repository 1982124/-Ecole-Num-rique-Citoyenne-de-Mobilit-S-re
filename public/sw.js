'use strict';
const CACHE_NAME = 'mbk-shell-v22';
/* La photo hero webp n'est PAS dans l'app shell tant qu'elle n'est pas dans le dépôt :
   check-pwa.js exige que chaque ressource précachée existe réellement (contrôle pertinent).
   Le hero conserve son triple repli (local → distant → message pédagogique) : aucune casse.
   Dès l'ajout du fichier public/images/bamako/hero-bamako-carrefour.webp, il réintègre l'app shell. */
const APP_SHELL = ['/', '/config.js', '/country-profile.js', '/official-sources.js', '/who-road-facts.js', '/bamako-gallery.js', '/quiz-exam.js', '/signs-extra.js', '/home-canonical.js', '/hero-bamako.js', '/journee-bamako.js', '/signs-extra2.js', '/quiz-bank2.js', '/audio-voiceover.js', '/spaces-navigation.js', '/institutional-design.js', '/traffic-light-home.js', '/manifest.webmanifest', '/icon.svg', '/learning-expansion.js', '/immersive-courses.js', '/safe-mobility-campaigns.js', '/permit-categories.js', '/bamanankan-glossary.js', '/programs.js'];
/* Installation tolérante aux pannes : chaque fichier est mis en cache individuellement.
   Un fichier manquant n'empêche plus l'installation du service worker ni la mise hors ligne du reste
   de l'app. Le fichier manquant sera mis en cache au premier accès réussi par le gestionnaire fetch. */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(APP_SHELL.map((url) =>
        cache.add(url).catch(() => {
          /* Échec silencieux pour ce seul fichier : l'app reste installable et hors ligne. */
        })
      )
    ).then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => {
      if (response && response.ok) caches.open(CACHE_NAME).then((cache) => cache.put('/', response.clone()));
      return response;
    }).catch(async () => (await caches.match('/'))));
    return;
  }
  event.respondWith(caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((response) => {
      if (response && response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
      return response;
    });
  }));
});
