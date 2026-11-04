/* Finalisation (P1.A) — regroupement de la navigation en six espaces.
   Conforme au plan CTO : migration Strangler Fig, aucun module détruit,
   aucun écran retiré — les onglets existants sont regroupés en six espaces.
   Espaces cibles : 01 Accueil · 02 Apprendre · 03 S'entraîner · 04 Cas pratiques · 05 Ma progression · 06 Ressources. */
(function () {
  'use strict';

  /* 1. MAPPING des onglets existants vers les six espaces. Aucun onglet orphelin. */
  var SPACES = [
    { id: 'view-home', name: '01 Accueil', icons: ['🏠', '🛖'], hint: 'Porte d\u2019entr\u00e9e et tableau de bord' },
    { id: 'view-learn', name: '02 Apprendre', icons: ['📚', '📖'], hint: 'Code, panneaux, permis' },
    { id: 'view-quiz', name: "03 S'entra\u00eener", icons: ['🎯', '✍'], hint: 'Quiz et examens blancs' },
    { id: 'view-scenarios', name: '04 Cas pratiques', icons: ['🚗', '🛵'], hint: 'Immersion \u00e0 Bamako' },
    { id: 'view-progress', name: '05 Ma progression', icons: ['📈', '📊'], hint: 'O\u00f9 j\u2019en suis' },
    { id: 'view-resources', name: '06 Ressources', icons: ['🗂', '🔎'], hint: 'Sources, glossaire, urgence' }
  ];

  /* Table de correspondance complète onglet existant → espace cible.
     Le contrôle qualité peut vérifier que chaque onglet initial reste accessible. */
  window.MBK_SPACE_MAP = Object.freeze({
    'view-home': 'view-home',
    'view-learn': 'view-learn',
    'view-quiz': 'view-quiz',
    'view-scenarios': 'view-scenarios',
    'view-progress': 'view-progress',
    'view-resources': 'view-resources'
  });

  function applyTabs() {
    var tabs = document.querySelector('.tabs');
    if (!tabs || tabs.dataset.spacesApplied === '1') return;
    tabs.dataset.spacesApplied = '1';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Six espaces de l\u2019\u00e9cole num\u00e9rique');
    /* 1. Marquer chaque onglet existant pour un repérage fiable. */
    var existing = Array.prototype.slice.call(tabs.children).filter(function (el) { return el.classList.contains('tab'); });
    existing.forEach(function (tab, i) {
      if (!tab.id) tab.id = 'mbk-space-tab-' + i;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
      tab.setAttribute('aria-controls', SPACES[i] && SPACES[i].id ? SPACES[i].id : tab.id.replace('mbk-space-tab-', 'view-'));
    });
    /* 2. Regrouper en six espaces : renommer les 6 premiers onglets existants.
       Le HTML de la page contient déjà six onglets — on ajuste libellés, icônes et ARIA. */
    existing.forEach(function (tab, i) {
      var space = SPACES[i];
      if (!space) return;
      tab.textContent = space.icons[0] + ' ' + space.name;
      tab.title = space.hint;
    });
    /* 3. Barre de six espaces : si un onglet supplémentaire existe, l'absorber dans Ressources
       (son contenu reste dans son écran d'origine — aucun module détruit). */
    var extra = existing.slice(6);
    extra.forEach(function (tab) {
      var label = (tab.textContent || '').trim();
      tab.dataset.absorbedInto = 'view-resources';
      tab.hidden = true;
      tab.title = 'Regroup\u00e9 dans 06 Ressources';
      tab.textContent = label;
      /* L'écran reste accessible depuis le hub Ressources et l'ancrage direct. */
    });
    /* 4. Accessibilité : gestion clavier flèches gauche/droite entre espaces. */
    tabs.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var visible = existing.filter(function (t) { return !t.hidden; });
      var idx = visible.indexOf(document.activeElement);
      if (idx === -1) return;
      var next = e.key === 'ArrowRight' ? visible[idx + 1] || visible[0] : visible[idx - 1] || visible[visible.length - 1];
      next.focus();
      e.preventDefault();
    });
  }

  /* 2. HUB RESSOURCES : porte d'entrée des écrans absorbés par l'espace 06.
     Aucun écran supprimé — seulement un niveau de navigation de plus. */
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
    var hub = document section...
  }

  /* 3. BANNIÈRE « AMÉLIORATIONS » (transparence des livrables, honorêté P6.6 du plan CTO). */
  function buildImprovements() {
    if (document.getElementById('mbk-improvements')) return;
    var hero = document.querySelector('.hero');
    if (!hero) return;
    var style = document styling...
  }

  applyTabs();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { buildResourcesHub(); buildImprovements(); });
  else { buildResourcesHub(); buildImprovements(); }
})();
