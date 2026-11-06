/* Finalisation (P1.A) — regroupement de la navigation en six espaces.
   Conforme au plan CTO : migration Strangler Fig, aucun module détruit,
   aucun écran retiré — les onglets existants sont regroupés en six espaces.
   Espaces cibles : 01 Accueil · 02 Apprendre · 03 S'entraîner · 04 Cas pratiques · 05 Ma progression · 06 Ressources.
   Décision du 6 nov. 2026 : la bannière « Nouveautés de la version finale » a été retirée
   sur demande du porteur du projet — l'accueil reste sobre et institutionnel. */
(function () {
  'use strict';

  /* 1. MAPPING des six espaces. Aucun onglet orphelin. */
  var SPACES = [
    { id: 'view-home', name: '01 Accueil', icon: '🏠', hint: 'Porte d'entrée et tableau de bord' },
    { id: 'view-learn', name: '02 Apprendre', icon: '📚', hint: 'Code, panneaux, permis' },
    { id: 'view-quiz', name: "03 S'entraîner", icon: '🎯', hint: 'Quiz et examens blancs' },
    { id: 'view-scenarios', name: '04 Cas pratiques', icon: '🚗', hint: 'Immersion à Bamako' },
    { id: 'view-progress', name: '05 Ma progression', icon: '📈', hint: 'Où j'en suis' },
    { id: 'view-resources', name: '06 Ressources', icon: '🗂', hint: 'Sources, glossaire, urgence' }
  ];

  /* Table de correspondance espace cible. Le contrôle qualité peut vérifier
     que chaque espace reste accessible. */
  window.MBK_SPACE_MAP = Object.freeze({
    'view-home': 'view-home',
    'view-learn': 'view-learn',
    'view-quiz': 'view-quiz',
    'view-scenarios': 'view-scenarios',
    'view-progress': 'view-progress',
    'view-resources': 'view-resources'
  });

  /* Les écrans absorbés dans 06 Ressources restent accessibles : hub + ancres directes.
     Ne PAS figer ce tableau : il reçoit les onglets absorbés à l'exécution. */
  window.MBK_ABSORBED = [];

  function applyTabs() {
    var tabs = document.querySelector('.tabs');
    if (!tabs || tabs.dataset.spacesApplied === '1') return;
    tabs.dataset.spacesApplied = '1';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Six espaces de l'école numérique');
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
    if (window.MBK_ABSORBED.length === 0) return;
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
    hub.innerHTML = '<h3>Regroupés dans cet espace</h3><p>Contenus regroupés dans 06 Ressources lors de la réorganisation en six espaces. Rien n'a été supprimé.</p>';
    var links = document.createElement('div');
    links.className = 'mbk-hub-links';
    window.MBK_ABSORBED.forEach(function (absorbed) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = absorbed.label;
      btn.addEventListener('click', function () {
        var tab = document.getElementById(absorbed.tabId);
        if (tab) {
          tab.hidden = false;
          tab.click();
          window.setTimeout(function () { tab.hidden = true; }, 300);
        }
      });
      links.appendChild(btn);
    });
    hub.appendChild(links);
    view.insertBefore(hub, view.firstChild);
  }

  applyTabs();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { buildResourcesHub(); });
  } else {
    buildResourcesHub();
  }
})();
