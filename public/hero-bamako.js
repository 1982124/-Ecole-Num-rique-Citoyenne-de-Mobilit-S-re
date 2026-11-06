/* Photographie du carrefour de Bamako dans le visuel d’accueil.
   Le schéma SVG déjà présent reste le repli automatique si la photo ne charge pas. */
(function () {
  'use strict';
  var art = document.querySelector('.hero .hero-art');
  if (!art || document.getElementById('mbk-hero-photo')) return;
  var img = document.createElement('img');
  img.id = 'mbk-hero-photo';
  img.loading = 'eager';
  img.decoding = 'async';
  img.alt = 'Circulation réelle à un carrefour de Bamako, Mali';
  img.src = 'https://mali-bolifen-kalanso.ml/images/bamako/hero-bamako-carrefour.png';
  img.onerror = function () { img.remove(); };
  var style = document.createElement('style');
  style.textContent = '#mbk-hero-photo{width:100%;height:auto;border-radius:16px;display:block;box-shadow:0 10px 30px #193d2c33}';
  document.head.appendChild(style);
  art.appendChild(img);
})();
