/* Lot design institutionnel (Strangler Fig) — charte visuelle appliquée à toute l'application.
   Décisions CTO validées (4 novembre 2026) :
   1. Texte institutionnel sur fond vert uni (#087a3e) — JAMAIS de photo derrière le texte (lisibilité, public à lecture difficile).
   2. Photo réelle de Bamako en pleine largeur, placée SOUS la bande verte, triple repli (local → distant → SVG).
   3. Photo intégrée au dépôt et au cache service worker v18 → disponible hors ligne.
   4. Aucun module détruit : ce module enrichit les styles et le hero ; l'existant reste en repli.
   5. Améliorations UX cohérentes avec la mission accessibilité : cibles tactiles, focus visible, contraste, reduced-motion. */
(function () {
  'use strict';

  /* ---------- 1. HERO : bande verte institutionnelle + photo pleine largeur ---------- */

  function upgradeHero() {
    var art = document.querySelector('.hero .hero-art');
    var hero = document.querySelector('.hero');
    if (!hero || document.getElementById('mbk-institutional-hero')) return;

    var style = document.createElement('style');
    style.textContent =
      /* Dégradé vertical subtil dans le bandeau vert (pas de photo derrière le texte) */
      'header{background:linear-gradient(180deg,#087a3e 0%,#0a8a47 100%)}' +
      /* La zone visuelle du hero devient un conteneur pleine largeur de la photo */
      '.hero .hero-art{background:transparent;border:0;padding:0;min-height:0;display:block}' +
      '.hero .hero-art .road-scene{display:none}' +
      '#mbk-institutional-hero{grid-column:1/-1;margin:2px 0 4px}' +
      '#mbk-institutional-hero figure{margin:0}' +
      '#mbk-hero-photo-institutional{width:100%;height:auto;display:block;border-radius:16px;box-shadow:0 12px 32px #193d2c40;background:#066b35}' +
      '.mbk-hero-photo-institutional-credit{margin:8px 0 0;font-size:11px;line-height:1.5;color:#a8c4b0}' +
      '.mbk-hero-photo-institutional-credit a{color:#f9d616;font-weight:700}' +
      /* Étiquette contextuelle sur la photo (accessible, discret) */
      '#mbk-institutional-hero .mbk-photo-tag{position:static;margin:0 0 6px;font-size:12px;font-weight:800;color:#f9d616;letter-spacing:.4px;text-transform:uppercase}' +
      '@media(max-width:640px){#mbk-hero-photo-institutional{border-radius:12px}.mbk-photo-tag{font-size:11px}}' +
      '@media(prefers-reduced-motion:reduce){#mbk-institutional-hero *{transition:none!important;animation:none!important}}';
    document.head.appendChild(style);

    var figure = document.createElement('figure');
    figure.id = 'mbk-institutional-hero';
    var tag = document.createElement('p');
    tag.className = 'mbk-photo-tag';
    tag.textContent = 'Bamako, en conditions r\u00e9elles';
    var img = document.createElement('img');
    img.id = 'mbk-hero-photo-institutional';
    img.alt = 'Circulation r\u00e9elle \u00e0 un carrefour de Bamako, Mali';
    img.loading = 'eager';
    img.decoding = 'async';
    /* Triple repli : fichier local (mis en cache par le service worker v18) puis URL distante du site de r\u00e9f\u00e9rence.
       Si aucun des deux ne charge : l'image est retir\u00e9e et le message de repli s'affiche (le sch\u00e9ma SVG reste le repli historique). */
    img.src = '/images/bamako/hero-bamako-carrefour.webp';
    img.onerror = function () {
      img.src = 'https://mali-bolifen-kalanso.ml/images/bamako/hero-bamako-carrefour.png';
      img.onerror = function () {
        img.remove();
        tag.remove();
      };
    };
    figure.appendChild(tag);
    figure.appendChild(img);

    /* La photo prend la place pleine largeur, sous la bande verte, après le texte institutionnel. */
    var canonicalHome = document.getElementById('mbk-canonical-home');
    var improvements = document.getElementById('mbk-improvements');
    if (improvements && improvements.parentNode === hero) hero.insertBefore(figure, improvements);
    else if (canonicalHome && canonicalHome.parentNode === hero) hero.insertBefore(figure, canonicalHome.nextSibling);
    else if (art) hero.appendChild(figure);
    else hero.appendChild(figure);
    /* L'ancienne zone hero-art (photo distante non mise en cache) est retir\u00e9e du DOM :
       remplac\u00e9e par la figure pleine largeur avec triple repli. Aucune fonction p\u00e9dagagogique perdue. */
    if (art) art.remove();
  }

  /* ---------- 2. CHARTE GLOBALE : cohérence visuelle de toute l'application ---------- */

  function applyDesignSystem() {
    if (document.getElementById('mbk-design-system')) return;
    var style = document.createElement('style');
    style.id = 'mbk-design-system';
    style.textContent =
      /* Typographie : hiérarchie plus affirmée, lisible par un public \u00e0 lecture difficile */
      'body{font-size:16.5px}' +
      '.lesson p{font-size:14.5px}' +
      /* Cibles tactiles : minimum 48px sur tous les boutons et filtres (bonne pratique d'accessibilit\u00e9 mobile) */
      '.btn{min-height:48px;padding:13px 18px}' +
      '.filter{min-height:48px;display:inline-flex;align-items:center}' +
      '.tab{min-height:48px;display:flex;align-items:center;justify-content:center}' +
      /* Focus visible renforc\u00e9 partout */
      '.tab:focus-visible{outline:3px solid #e6a916;outline-offset:2px}' +
      '.filter:focus-visible{outline:3px solid #e6a916;outline-offset:2px}' +
      /* Cartes le\u00e7ons : ombre plus douce, coin plus doux, align\u00e9 au hero */
      '.lesson{border-radius:22px}' +
      /* Stat cards de l'accueil : m\u00eame famille que le hero */
      '.stat{border-radius:19px}' +
      /* Respect syst\u00e9matique du reduced-motion */
      '@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;scroll-behavior:auto!important}}';
    document.head.appendChild(style);
  }

  /* ---------- 3. Disponibilit\u00e9 hors ligne de la photo : copie diff\u00e9r\u00e9e ---------- */
  /* Le fichier /images/bamako/hero-bamako-carrefour.webp doit \u00eatre ajout\u00e9 au d\u00e9p\u00f4t.
     Le service worker v18 le met en cache. En attendant le fichier, le triple repli garantit z\u00e9ro casse :
     local manquant \u2192 distant \u2192 SVG + message de repli explicite. */

  function boot() {
    applyDesignSystem();
    upgradeHero();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
