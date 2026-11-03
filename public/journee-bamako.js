/* « Une journée à Bamako » — parcours narratif immersif.
   L’utilisateur vit une journée de conduite, du matin au soir : 10 moments réels, une décision à chacun,
   conséquence racontée, score de prudence et débrief final.
   Scénarios pédagogiques originaux : ils ne reproduisent pas une journée réelle et restent des supports de sensibilisation. */
(function () {
  'use strict';
  var nav = document.querySelector('.tabs');
  var shell = document.querySelector('.shell');
  if (!nav || !shell || document.querySelector('[data-tab="journee"]')) return;

  var steps = [
    { time: '06h40', icon: '🌅', place: 'Hamdallaye, début de matinée', scene: 'Tu quittes la maison. La fraîcheur matinale attire marcheurs et cyclistes ; la poussière limite un peu la visibilité.', q: 'Avant de démarrer, tu vérifies :', a: ['Rien, je connais ma moto', 'Phares, pression des pneus, freins et rétroviseurs', 'Uniquement le niveau d’essence'], c: 1, why: 'Un contrôle de 30 secondes (phares, pneus, freins, rétroviseurs) prévient les pannes et chocs les plus fréquents à deux-roues.' },
    { time: '07h15', icon: '🎒', place: 'Abords d’une école, Badalabougou', scene: 'Les élèves arrivent ; certains traversent en courant entre les véhicules arrêtés.', q: 'Ton approche de la zone école :', a: ['Klaxonner pour prévenir', 'Vitesse très réduite, prêt à m’arrêter, laisser traverser', 'Maintenir ma vitesse habituelle'], c: 1, why: 'Les enfants sont imprévisibles et peu visibles : seule une vitesse très basse laisse le temps de réagir.' },
    { time: '08h00', icon: '🛍️', place: 'Marché de Médine', scene: 'Ruelle commerçante dense : piétons, charrettes, taxis qui manœuvrent, étals empiétant sur la chaussée.', q: 'Un piéton surgit entre deux étals :', a: ['Accélérer pour passer avant lui', 'M’arrêter et attendre qu’il soit en sécurité', 'Klaxonner et continuer'], c: 1, why: 'Dans un marché, des piétons surgissent de partout : la seule réponse sûre est la vitesse basse et l’arrêt.' },
    { time: '09h30', icon: '🚦', place: 'Carrefour giratoire, centre-ville', scene: 'Le giratoire est encombré, les véhicules entrent sans regarder. Tu arrives à l’entrée de l’anneau.', q: 'Ta décision :', a: ['Entrer vite pour prendre ma place', 'Céder aux véhicules déjà sur l’anneau, puis m’engager', 'Attendre que le giratoire se vide'], c: 1, why: 'Les véhicules déjà engagés sur l’anneau sont prioritaires : ralentis et engage-toi quand un créneau sûr se présente.' },
    { time: '11h00', icon: '☀️', place: 'Axe Sotuba, chaleur montante', scene: 'Le soleil tape ; la chaussée chauffe ; des remorques chargées circulent lentement.', q: 'Tu as sommeil après un lever tôt. Tu dois :', a: ['Continuer, je tiendrai', 'Faire une pause, boire de l’eau, reprendre après', 'Ouvrir grand les vitres'], c: 1, why: 'La fatigue dégrade le temps de réaction comme l’alcool : une pause régulière et de l’eau sont les seuls vrais remèdes.' },
    { time: '12h45', icon: '🏍️', place: 'Rond-point Hamdallaye, trafic dense', scene: 'Ton cousin monte derrière toi pour un trajet de dix minutes. Un seul casque : le tien.', q: 'Avant de partir :', a: ['Il s’accroche, ça ira pour si peu de temps', 'Deuxième casque attaché pour lui aussi, ou il ne monte pas', 'Il tient le porte-bagages, ça suffira'], c: 1, why: 'Un casque bien attaché réduit de 42 % le risque de décès et de 69 % le risque de traumatisme crânien — pour le conducteur ET le passager. Un trajet court n’atténue pas un choc.' },
    { time: '15h20', icon: '🌧️', place: 'Hivernage, quartier de Lafiabougou', scene: 'Une averse soudaine : flaques profondes, chaussée glissante, visibilité réduite.', q: 'Ton adaptation :', a: ['Mêmes distances, la route est droite', 'Distances allongées, freinage doux, feux adaptés', 'Traverser les flaques au plus vite'], c: 1, why: 'Sur chaussée mouillée, la distance de freinage s’allonge fortement ; les flaques cachent des trous : on ralentit, on allonge, on éclaire.' },
    { time: '17h10', icon: '🐄', place: 'Route de Ségou, sortie de ville', scene: 'Un troupeau s’approche du bord de la chaussée ; un véhicule lent te précède.', q: 'Le dépassement du véhicule lent :', a: ['Je dépasse maintenant, avant le troupeau', 'J’attends : ni visibilité suffisante ni distance de sécurité', 'Je klaxonne et je frôle le troupeau'], c: 1, why: 'Dépasser à l’approche d’animaux, sans visibilité, cumule deux dangers : choc frontal et traversée soudaine. Patience.' },
    { time: '19h05', icon: '🌇', place: 'Retour vers Bamako, nuit tombante', scene: 'La nuit tombe vite ; des piétons sans gilet réfléchissant longent la chaussée ; phares éblouissants en face.', a: ['Feux de route en permanence', 'Vitesse réduite selon ma visibilité, feux de croisement', 'Éteindre momentanément pour voir'], c: 1, q: 'Ton éclairage et ta vitesse :', why: 'La nuit, la vitesse doit permettre l’arrêt dans la distance visible ; les feux de route éblouissent en face : croisement et prudence.' },
    { time: '20h30', icon: '🏠', place: 'Maison, fin de journée', scene: 'Dix heures de route, de marché, de pluie et de poussière. Demain, école et travail t’attendent.', q: 'Ton débrief personnel :', a: ['C’était calme, rien à noter', 'Noter les deux moments les plus risqués et préparer demain', 'Se reposer uniquement'], c: 1, why: 'Le réflexe des conducteurs sûrs : relire sa journée, repérer les moments à risque et mieux les gérer demain.' }
  ];

  var tab = document.createElement('button');
  tab.className = 'tab';
  tab.dataset.tab = 'journee';
  tab.textContent = '🌅 Une journée à Bamako';
  nav.appendChild(tab);

  var section = document.createElement('section');
  section.id = 'journee';
  section.className = 'view';
  section.hidden = true;
  shell.insertBefore(section, shell.querySelector('footer'));

  var pos = 0, score = 0, log = [];

  function sceneArt(icon) { return '<div class="jn-icon">' + icon + '</div>'; }

  function render() {
    if (pos >= steps.length) return finale();
    var s = steps[pos];
    section.innerHTML =
      '<div class="jn-bar"><span>' + s.time + ' · Bamako</span><span>Étape ' + (pos + 1) + ' / ' + steps.length + '</span></div>' +
      '<article class="jn-scene">' + sceneArt(s.icon) +
      '<h2 class="jn-place">' + s.place + '</h2>' +
      '<p class="jn-text">' + s.scene + '</p>' +
      '<h3 class="jn-q">' + s.q + '</h3>' +
      s.a.map(function (opt, i) { return '<button class="jn-opt" data-i="' + i + '">' + opt + '</button>'; }).join('') +
      '</article>' +
      '<div class="jn-progress" aria-hidden="true">' + steps.map(function (_, i) { return '<span class="' + (i < pos ? 'done' : (i === pos ? 'now' : '')) + '"></span>'; }).join('') + '</div>';
    Array.prototype.forEach.call(section.querySelectorAll('.jn-opt'), function (b) {
      b.onclick = function () {
        var i = parseInt(b.dataset.i, 10);
        var good = i === s.c;
        if (good) score++;
        log.push({ s: s, given: i, good: good });
        feedback(s, i, good);
      };
    });
  }

  function feedback(s, i, good) {
    var els = section.querySelectorAll('.jn-opt');
    Array.prototype.forEach.call(els, function (b, k) {
      b.disabled = true;
      if (k === s.c) b.classList.add('good');
      else if (k === i) b.classList.add('bad');
    });
    var fb = document.createElement('div');
    fb.className = 'jn-feedback ' + (good ? 'ok' : 'ko');
    fb.innerHTML = (good ? '<strong>✓ Bon réflexe.</strong> ' : '<strong>✗ Réflexe risqué.</strong> ') + s.why +
      '<button class="btn primary" id="jn-next">' + (pos === steps.length - 1 ? 'Voir mon débrief →' : 'Continuer →') + '</button>';
    section.querySelector('.jn-scene').appendChild(fb);
    document.getElementById('jn-next').onclick = function () { pos++; render(); };
  }

  function finale() {
    var pct = Math.round(score / steps.length * 100);
    var msg = pct === 100 ? 'Journée parfaite : chaque décision a protégé les autres et toi. Partage tes réflexes autour de toi.' :
      pct >= 80 ? 'Excellente journée : les bons réflexes sont là. Revois les étapes marquées pour viser la journée parfaite.' :
      pct >= 60 ? 'Journée correcte mais des choix risqués t’ont exposé. Relis les leçons liées aux étapes échouées.' :
      'Journée dangereuse : plusieurs réflexes essentiels manquent. Reprends les leçons de base puis retente la journée.';
    section.innerHTML =
      '<div class="section-head"><div><h2>Débrief de ta journée</h2><p>Parcours pédagogique original — aucune valeur officielle.</p></div></div>' +
      '<div class="jn-result"><strong>' + score + ' / ' + steps.length + '</strong><span>' + msg + '</span></div>' +
      '<h3 class="jn-review-title">Ta journée étape par étape</h3><ol class="jn-review">' +
      log.map(function (l) {
        return '<li class="' + (l.good ? 'ok' : 'ko') + '"><strong>' + l.s.time + ' — ' + l.s.place + '</strong>' +
          '<p>Ta réponse : ' + (l.good ? 'bon réflexe ✓' : '« ' + l.s.a[l.given] + ' » — le bon choix était : « ' + l.s.a[l.s.c] + ' »') + '</p></li>';
      }).join('') + '</ol>' +
      '<div class="actions"><button class="btn primary" id="jn-again">↻ Revivre une journée</button></div>';
    document.getElementById('jn-again').onclick = function () { pos = 0; score = 0; log = []; render(); };
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  var style = document.createElement('style');
  style.textContent =
    '.jn-bar{display:flex;justify-content:space-between;padding:10px 14px;background:#1d3029;color:#fff;border-radius:12px;font-weight:800;margin-bottom:16px}' +
    '.jn-scene{background:#fffefa;border:1px solid #dce5dd;border-radius:20px;padding:24px;box-shadow:0 12px 35px #193d2c12}' +
    '.jn-icon{font-size:44px;line-height:1;margin-bottom:10px}' +
    '.jn-place{font-size:21px;margin:0 0 8px;letter-spacing:-.3px}' +
    '.jn-text{font-size:15px;line-height:1.7;color:#46534b;margin:0 0 14px}' +
    '.jn-q{font-size:16.5px;margin:0 0 12px}' +
    '.jn-opt{display:block;width:100%;text-align:left;margin:0 0 10px;padding:13px 15px;border:1px solid #dce5dd;border-radius:12px;background:#fff;font-weight:600;cursor:pointer;font-size:15px}' +
    '.jn-opt:hover:not(:disabled){border-color:#087a3e;background:#f2f8f3}' +
    '.jn-opt:disabled{opacity:.6}.jn-opt.good{border-color:#087a3e;background:#e6f4e9;font-weight:800}' +
    '.jn-opt.bad{border-color:#ce1126;background:#fdecec}' +
    '.jn-feedback{margin-top:14px;padding:15px 16px;border-radius:12px;font-size:14.5px;line-height:1.65;animation:jn-in .25s ease}' +
    '.jn-feedback.ok{background:#edf7ee;border:1px solid #8cb79a;color:#1e5c36}.jn-feedback.ko{background:#fdf1f1;border:1px solid #d8a5a5;color:#7a2d2d}' +
    '.jn-feedback .btn{margin-top:10px}' +
    '@keyframes jn-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}' +
    '.jn-progress{display:flex;gap:6px;margin-top:16px}.jn-progress span{flex:1;height:5px;border-radius:3px;background:#dce5dd}.jn-progress .done{background:#087a3e}.jn-progress .now{background:#f9d616}' +
    '.jn-result{display:flex;flex-direction:column;gap:6px;padding:22px;border-radius:16px;margin-bottom:18px;background:#edf7ee;border:1px solid #8cb79a;color:#1e5c36}.jn-result strong{font-size:34px}' +
    '.jn-review-title{font-size:18px;margin:6px 0 10px}.jn-review{margin:0 0 18px;padding-left:20px}.jn-review li{margin-bottom:10px;font-size:14px}.jn-review li.ok strong{color:#1e5c36}.jn-review li.ko strong{color:#7a2d2d}' +
    '@media(max-width:650px){.jn-scene{padding:16px}.jn-icon{font-size:36px}}' +
    '@media(prefers-reduced-motion:reduce){.jn-feedback{animation:none}.jn-progress span{transition:none}}';
  document.head.appendChild(style);

  tab.addEventListener('click', function () { window.switchTab('journee'); });
  render();
})();
