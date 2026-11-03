/* Accueil canonique — message officiel MALI  BOLIFEN KALANSO MALI.
   Chiffres OMS vérifiés le 3 novembre 2026 : 225 482 décès routiers estimés en Région africaine (2021),
   19 % des décès mondiaux, casque : -42 % de risque de décès et -69 % de risque de traumatisme crânien.
   Sources : OMS Bureau régional de l'Afrique (afro.who.int) et fiche OMS sécurité routière. */
(function () {
  'use strict';
  if (document.getElementById('mbk-canonical-home')) return;
  var hero = document.querySelector('.hero');
  if (!hero) return;

  var block = document.createElement('div');
  block.id = 'mbk-canonical-home';
  block.setAttribute('role', 'region');
  block.setAttribute('aria-labelledby', 'mbk-canonical-title');
  block.innerHTML =
    '<p class="mbk-motto" id="mbk-canonical-kicker"><em>Comprendre la route. Protéger la vie. Avancer ensemble.</em></p>' +
    '<blockquote class="mbk-callout">' +
    '<p><strong>La route ne prévient pas.</strong> En Afrique, <strong>225 482 vies</strong> ont été fauchées en 2021 — <strong>19 % des décès mondiaux</strong> — derrière ces chiffres de l’OMS, chaque vie compte.</p>' +
    '<p>Un casque bien attaché réduit de <strong>42 %</strong> le risque de décès et de <strong>69 %</strong> le risque de traumatisme crânien.</p>' +
    '<p class="mbk-cta-line"><strong>Apprends, entraîne-toi avec nos quiz et prépare ton permis à ton rythme.</strong></p>' +
    '</blockquote>' +
    '<p class="mbk-sources">Estimations régionales OMS 2021 (Région africaine) — sources : <a href="https://www.afro.who.int/publications/road-safety-who-african-region-2023" target="_blank" rel="noopener noreferrer">OMS Afrique ↗</a>. Chiffres régionaux, non nationaux maliens ; à actualiser à chaque nouvelle publication officielle.</p>';

  var heroArt = hero.querySelector('.hero-art');
  var heroP = hero.querySelector('p:not(.eyebrow):not(.brandtag)');
  if (heroArt) hero.insertBefore(block, heroArt);
  else if (heroP) hero.insertBefore(block, heroP.nextSibling);
  else hero.appendChild(block);

  var style = document.createElement('style');
  style.textContent =
    '#mbk-canonical-home{grid-column:1/-1;margin:4px 0 6px;max-width:820px}' +
    '.mbk-motto{margin:0 0 10px;font-size:15.5px;color:#d7e7dc;letter-spacing:.2px}' +
    '.mbk-callout{margin:0;padding:18px 20px;border-radius:16px;border:1px solid #ffffff2e;background:#ffffff10;backdrop-filter:blur(2px)}' +
    '.mbk-callout p{margin:0 0 10px;font-size:15.5px;line-height:1.65;color:#eef5ef}' +
    '.mbk-callout p:last-child{margin-bottom:0}' +
    '.mbk-callout strong{color:#f9d616}' +
    '.mbk-cta-line{font-size:16.5px}' +
    '.mbk-sources{margin:10px 0 0;font-size:11.5px;line-height:1.55;color:#a8c4b0}' +
    '.mbk-sources a{color:#f9d616;font-weight:700}' +
    '@media(max-width:640px){#mbk-canonical-home{max-width:100%}.mbk-callout{padding:15px 16px}.mbk-callout p{font-size:14.5px}.mbk-cta-line{font-size:15px}}' +
    '@media(prefers-reduced-motion:reduce){#mbk-canonical-home *{transition:none!important;animation:none!important}}';
  document.head.appendChild(style);
})();
