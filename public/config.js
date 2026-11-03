'use strict';
/*
 * Configuration de déploiement : le code pays sélectionne un profil national.
 * Pour une nouvelle déclinaison, créer un profil validé et remplacer countryCode.
 */
window.APP_CONFIG = Object.freeze({
  brandBase: 'École Numérique et Citoyenne pour une Mobilité Sûre',
  countrySuffix: 'Mali BOLIFEN KALANSO',
  countryCode: 'ML',
  countryProfile: '/country-profile.js',
  defaultLanguage: 'fr',
  backendUrl: ''
});
window.BACKEND_URL = window.APP_CONFIG.backendUrl;
window.APP_TITLE = window.APP_CONFIG.brandBase + ' : ' + window.APP_CONFIG.countrySuffix;
