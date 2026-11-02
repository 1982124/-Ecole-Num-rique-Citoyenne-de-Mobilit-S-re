'use strict';
window.APP_CONFIG = Object.freeze({
  brandBase: 'École Numérique et Citoyenne pour une Mobilité Sûre',
  countrySuffix: 'Mali BOLIFEN KALANSO',
  countryCode: 'ML',
  defaultLanguage: 'fr',
  // La lecture vocale utilise la synthèse vocale disponible sur l'appareil.
  // L'apprentissage fonctionne sans serveur de discussion ni base de données.
  backendUrl: ''
});
window.BACKEND_URL = window.APP_CONFIG.backendUrl;
window.APP_TITLE = window.APP_CONFIG.brandBase + ' : ' + window.APP_CONFIG.countrySuffix;