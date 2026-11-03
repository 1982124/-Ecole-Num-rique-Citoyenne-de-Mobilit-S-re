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
/*
 * Couture provisoire (Strangler Fig) : chargeur des modules de données nationales.
 * Regroupe profil pays, sources officielles, constats OMS, galerie Bamako,
 * examen blanc, familles de panneaux complémentaires et accueil canonique.
 * À remplacer par des balises <script> explicites dans index.html lors du lot suivant.
 */
(function () {
  var modules = ['/country-profile.js', '/official-sources.js', '/who-road-facts.js', '/bamako-gallery.js', '/quiz-exam.js', '/signs-extra.js', '/home-canonical.js'];
  function boot() {
    modules.forEach(function (src) {
      var s = document.createElement('script');
      s.src = src;
      s.defer = true;
      document.body.appendChild(s);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
