/* Feu tricolore actif et clignotant — signature visuelle du home canonique (décision CTO/PO du 4 novembre 2026).
   Un feu de circulation stylisé aux couleurs institutionnelles malienne (vert #087a3e, or #f9d616, rouge #ce1126),
   fixé dans le coin supérieur droit de la zone hero, qui cyclise rouge → or → vert en boucle continue.
   Règles d'accessibilité respectées (plan CTO) :
   - prefers-reduced-motion : animation remplacée par un état statique (toutes les lampes visibles), aucun clignotement.
   - aria-hidden="true" : purement décoratif, jamais annoncé aux lecteurs d'écran.
   - Pas de flash rapide susceptible de déclencher un malaise : cycle lent de 2,4 s par couleur.
   Strangler Fig : module autonome, aucun style ni module existant détruit ; se retire silencieusement si le hero est absent. */
(function () {
  'use strict';

  function buildTrafficLight() {
    if (document.getElementById('mbk-traffic-light')) return;
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var style = document.createElement('style');
    style.textContent =
      /* Boîte du feu : coin supérieur droit de la zone hero, sur la bande verte */
      '#mbk-traffic-light{position:absolute;top:14px;right:14px;width:46px;padding:8px 0;border-radius:14px;background:#102d25;border:2px solid #ffffff2e;box-shadow:0 8px 22px #193d2c55;display:flex;flex-direction:column;align-items:center;gap:9px;z-index:3;pointer-events:none}' +
      '#mbk-traffic-light .mbk-lamp{width:26px;height:26px;border-radius:50%;background:#1b3a2b;box-shadow:inset 0 2px 5px #00000055}' +
      /* Lampes éteintes et allumées — couleurs institutionnelles malienne */
      '#mbk-traffic-light .mbk-lamp.red.on{background:#ce1126;box-shadow:0 0 14px 3px #ce1126aa,inset 0 2px 4px #00000033}' +
      '#mbk-traffic-light .mbk-lamp.gold.on{background:#f9d616;box-shadow:0 0 14px 3px #f9d616aa,inset 0 2px 4px #00000033}' +
      '#mbk-traffic-light .mbk-lamp.green.on{background:#087a3e;box-shadow:0 0 14px 3px #087a3eaa,inset 0 2px 4px #00000033}' +
      /* Clignotement doux de la lampe active (fondu, pas de flash sec) */
      '@keyframes mbk-blink{0%,100%{opacity:1}50%{opacity:.45}}' +
      '#mbk-traffic-light .mbk-lamp.on{animation:mbk-blink 1.2s ease-in-out infinite}' +
      /* Repli réduit-motion : feu statique, toutes lampes visibles, aucun cycle */
      '@media(prefers-reduced-motion:reduce){#mbk-traffic-light .mbk-lamp.on{animation:none}}' +
      /* Petit écran : feu compact, reste dégagé du texte (48px de marge de sécurité sous le feu) */
      '@media(max-width:640px){#mbk-traffic-light{width:38px;top:10px;right:10px}#mbk-traffic-light .mbk-lamp{width:20px;height:20px}}';
    document.head.appendChild(style);

    var box = document.createElement('div');
    box.id = 'mbk-traffic-light';
    box.setAttribute('role', 'presentation');
    box.setAttribute('aria-hidden', 'true');
    var colors = ['red', 'gold', 'green'];
    var lamps = [];
    colors.forEach(function (c) {
      var lamp = document.createElement('span');
      lamp.className = 'mbk-lamp ' + c;
      lamps.push(lamp);
      box.appendChild(lamp);
    });
    hero.appendChild(box);

    /* Cycle rouge → or → vert en boucle, 2,4 s par couleur. */
    function cycle() {
      lamps.forEach(function (lamp, i) {
        lamp.classList.toggle('on', i === phase);
      });
      phase = (phase + 1) % 3;
    }
    var phase = 0;
    cycle();
    var timer = window.setInterval(cycle, 2400);

    /* Propreté : si la page est cachée (onglet inactif), suspendre le cycle pour économiser la batterie. */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { window.clearInterval(timer); timer = null; }
      else if (!timer) { cycle(); timer = window.setInterval(cycle, 2400); }
    });

    /* prefers-reduced-motion : feu statique — les trois lampes allumées simultanément (état « signalisation pédagogique »), aucun clignotement. */
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.clearInterval(timer);
      timer = null;
      lamps.forEach(function (lamp) { lamp.classList.add('on'); });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildTrafficLight);
  else buildTrafficLight();
})();
