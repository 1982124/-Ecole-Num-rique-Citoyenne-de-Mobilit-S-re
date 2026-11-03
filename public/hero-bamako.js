/* Visuels authentiques — hero photographique de Bamako (utilisé par le site de référence mali-bolifen-kalanso.ml)
   avec repli hors ligne sur le schéma SVG existant. Image distante : connexion requise, chargement différé. */
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
  var credit = document.createElement('p');
  credit.className = 'mbk-hero-credit';
  credit.innerHTML = 'Carrefour de Bamako — photographie utilisée par le site de référence <a href="https://mali-bolifen-kalanso.ml" target="_blank" rel="noopener noreferrer">mali-bolifen-kalanso.ml ↗</a>. Hors ligne, le schéma pédagogique reste affiché.';
  var style = document.createElement('style');
  style.textContent = '#mbk-hero-photo{width:100%;height:auto;border-radius:16px;display:block;box-shadow:0 10px 30px #193d2c33}.mbk-hero-credit{margin:8px 0 0;font-size:11px;line-height:1.5;color:#a8c4b0}.mbk-hero-credit a{color:#f9d616;font-weight:700}';
  document.head.appendChild(style);
  art.appendChild(img);
  art.appendChild(credit);
})();
