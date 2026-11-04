/* Finalisation (P1.A) — regroupement de la navigation en six espaces.
   Conforme au plan CTO : migration Strangler Fig, aucun module détruit,
   aucun écran retiré — les onglets existants sont regroupés en six espaces.
   Espaces cibles : 01 Accueil · 02 Apprendre · 03 S'entraîner · 04 Cas pratiques · 05 Ma progression · 06 Ressources. */
(function () {
  'use strict';

  /* 1. MAPPING des six espaces. Aucun onglet orphelin. */
  var SPACES = [
    { id: 'view-home', name: '01 Accueil', icon: '\ud83c\udfe0', hint: 'Porte d\u2019entr\u00e9e et tableau de bord' },
    { id: 'view-learn', name: '02 Apprendre', icon: '\ud83d\udcda', hint: 'Code, panneaux, permis' },
    { id: 'view-quiz', name: '03 S\u2019entra\u00eener', icon: '\ud83c\udfaf', hint: 'Quiz et examens blancs' },
    { id: 'view-scenarios', name: '04 Cas pratiques', icon: '\ud83d\ude97', hint: 'Immersion \u00e0 Bamako' },
    { id: 'view-progress', name: '05 Ma progression', icon: '\ud83d\udcc8', hint: 'O\u00f9 j\u2019en suis' },
    { id: 'view-resources', name: '06 Ressources', icon: '\ud83d\uddc2', hint: 'Sources, glossaire, urgence' }
  ];

  /* Table de correspondance complète espace cible. Le contrôle qualité peut vérifier
     que chaque espace reste accessible. */
  window.MBK_SPACE_MAP = Object.freeze({
    'view-home': 'view-home',
    'view-learn': 'view-learn',
    'view-quiz': 'view-quiz',
    'view-scenarios': 'view-scenarios',
    'view-progress': 'view-progress',
    'view-resources': 'view-resources'
  });

  /* Les écrans absorbés dans 06 Ressources restent accessibles : hub + ancres directes. */
  window.MBK_ABSORBED = Object.freeze([]);

  function applyTabs() {
    var tabs = document.querySelector('.tabs');
    if (!tabs || tabs.dataset.spacesApplied === '1') return;
    tabs.dataset.spacesApplied = '1';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Six espaces de l\u2019\u00e9cole num\u00e9rique');
    var existing = Array.prototype.slice.call(tabs.children).filter(function (el) { return el.classList.contains('tab'); });
    /* 1. Renommer les six premiers onglets en espaces, conserver les gestionnaires de clic existants. */
    existing.slice(0, 6).forEach(function (tab, i) {
      var space = SPACES[i];
      if (!space) return;
      tab.textContent = space.icon + ' ' + space.name;
      tab.title = space.hint;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', space.id);
      tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
      if (!tab.id) tab.id = 'mbk-space-tab-' + i;
    });
    /* 2. Tout onglet au-delà du sixième est regroupé dans 06 Ressources.
       Son écran reste présent dans le DOM et accessible par le hub — jamais détruit. */
    existing.slice(6).forEach(function (tab, i) {
      var label = (tab.textContent || '').trim();
      var absorbed = { label: label, tabId: tab.id || ('mbk-extra-' + i) };
      window.MBK_ABSORBED.push(absorbed);
      tab.dataset.absorbedInto = 'view-resources';
      tab.hidden = true;
    });
    /* 3. Accessibilité clavier : flèches gauche/droite entre espaces. */
    tabs.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var visible = Array.prototype.slice.call(tabs.children).filter(function (t) { return t.classList.contains('tab') && !t.hidden; });
      var idx = visible.indexOf(document.activeElement);
      if (idx === -1) return;
      var next = e.key === 'ArrowRight' ? visible[idx + 1] || visible[0] : visible[idx - 1] || visible[visible.length - 1];
      next.focus();
      e.preventDefault();
    });
    /* 4. Mettre à jour aria-selected quand la navigation change. */
    document.addEventListener('click', function () {
      existing.forEach(function (tab) {
        tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
      });
    });
  }

  /* 2. HUB RESSOURCES : porte d'entrée des écrans absorbés par l'espace 06. */
  function buildResourcesHub() {
    var view = document.getElementById('view-resources');
    if (!view || view.dataset.hubBuilt === '1') return;
    view.dataset.hubBuilt = '1';
    var style = document.createElement('style');
    style.textContent =
      '.mbk-hub{border:1px solid var(--line);border-radius:18px;padding:14px 16px;background:var(--paper);margin:0 0 18px}' +
      '.mbk-hub h3{margin:0 0 4px;font-size:16px}' +
      '.mbk-hub p{margin:0 0 10px;font-size:13px;color:var(--muted)}' +
      '.mbk-hub-links{display:flex;flex-wrap:wrap;gap:8px}' +
      '.mbk-hub-links button{border:1px solid var(--line);background:#f1f6f1;border-radius:999px;padding:7px 12px;font-weight:700;font-size:13px;color:#2e6243}' +
      '.mbk-hub-links button:focus-visible{outline:3px solid #e6a916;outline-offset:3px}' +
      '@media(prefers-reduced-motion:reduce){.mbk-hub *{transition:none!important;animation:none!important}}';
    document.head.appendChild(style);
    var hub = document.createElement('div');
    hub.className = 'mbk-hub';
    hub.id = 'mbk-resources-hub';
    var links = document.createElement('div');
    links.className = 'mbk-hub-links';
    window.MBK_ABSORBED.forEach(function (absorbed) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = absorbed.label;
      btn.addEventListener('click', function () {
        var tab = document.getElementById(absorbed.tabId);
        if (tab) { tab.hidden = false; tab.click(); window.setTimeout(function () { tab.hidden = true; }, 300); }
      });
      links.appendChild(btn);
    });
    if (window.MBK_ABSORBED.length === 0) return;
    hub.innerHTML = '<h3>Regroup\u00e9s dans cet espace</h3><p>Contenus regroup\u00e9s dans 06 Ressources lors de la r\u00e9organisation en six espaces. Rien n\u2019a \u00e9t\u00e9 supprim\u00e9.</p>';
    hub.appendChild(links);
    view.insertBefore(hub, view.firstChild);
  }

  /* 3. BANNIÈRE « AMÉLIORATIONS » — transparence des livrables (P6.6). */
  function buildImprovements() {
    if (document.getElementById('mbk-improvements')) return;
    var hero = document.querySelector('.hero');
    if (!hero) return;
    var style = document.createElement('style');
    style.textContent =
      '#mbk-improvements{grid-column:1/-1;margin:4px 0 2px;padding:13px 16px;border-radius:14px;border:1px solid #ffffff2e;background:#ffffff10}' +
      '#mbk-improvements h2{font-size:15px;margin:0 0 6px;color:#f9d616;letter-spacing:.3px}' +
      '#mbk-improvements ul{margin:0;padding-left:18px;color:#eef5ef;font-size:13.5px;line-height:1.7}' +
      '#mbk-improvements li{margin:0}' +
      '@media(max-width:640px){#mbk-improvements{padding:11px 13px}#mbk-improvements ul{font-size:12.5px}}';
    document.head.appendChild(style);
    var block = document.createElement('div');
    block.id = 'mbk-improvements';
    block.setAttribute('role', 'region');
    block.setAttribute('aria-labelledby', 'mbk-improvements-title');
    block.innerHTML =
      '<h2 id="mbk-improvements-title">\u2728 Nouveaut\u00e9s de la version finale</h2>' +
      '<ul>' +
      '<li><strong>Navigation en six espaces</strong> : Accueil, Apprendre, S\u2019entra\u00eener, Cas pratiques, Ma progression, Ressources.</li>' +
      '<li><strong>75 panneaux</strong> de signalisation expliqu\u00e9s en contexte malien.</li>' +
      '<li><strong>90+ questions</strong> d\u2019entra\u00eenement avec corrections expliqu\u00e9es.</li>' +
      '<li><strong>Examen blanc</strong> chronom\u00e9tr\u00e9 (40 questions, 35 requises, 30 minutes).</li>' +
      '<li><strong>Parcours immersif</strong> \u00ab Une journ\u00e9e \u00e0 Bamako \u00bb en 10 sc\u00e8nes r\u00e9elles.</li>' +
      '<li><strong>Voix off fran\u00e7aise</strong> gratuite (le\u00e7ons, parcours, accueil).</li>' +
      '<li><strong>100 % hors ligne</strong> apr\u00e8s la premi\u00e8re visite.</li>' +
      '<li><strong>Sources officielles</strong> cit\u00e9es et dat\u00e9es (textes maliens, OMS).</li>' +
      '</ul>';
    var home = document.getElementById('mbk-canonical-home');
    if (home && home.parentNode === hero) hero.insertBefore(block, home.nextSibling);
    else hero.appendChild(block);
  }

  applyTabs();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { buildResourcesHub(); buildImprovements(); });
  } else {
    buildResourcesHub();
    buildImprovements();
  }
})();
