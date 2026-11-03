/* Constats OMS sur la sécurité routière en Région africaine — vérifiés le 3 novembre 2026.
   Données régionales publiées par l'Organisation mondiale de la Santé : elles ne sont pas des statistiques nationales maliennes. */
(function () {
  'use strict';
  if (!document.querySelector('.tabs') || !document.querySelector('.shell')) return;
  if (document.querySelector('[data-tab="who-road-facts"]')) return;
  const facts = [
    { value: '225 482', label: 'décès routiers estimés en 2021 dans la Région africaine de l’OMS', source: 'OMS — Bureau régional de l’Afrique' },
    { value: '19 %', label: 'du fardeau mondial des décès routiers, pour 15 % de la population mondiale et environ 3 % du parc automobile', source: 'OMS AFRO, 2023' },
    { value: '+17 %', label: 'de décès routiers en plus depuis 2010 : la Région africaine est la seule région OMS en hausse', source: 'OMS AFRO, 2023' },
    { value: '≈ 1/3', label: 'des décès routiers en Afrique concernent des piétons, contre 21 % au niveau mondial : les usagers vulnérables paient le plus lourd tribut', source: 'OMS' },
    { value: '42 % / 69 %', label: 'estimations mondiales OMS de réduction du risque de décès (42 %) et de blessure grave (69 %) grâce au port du casque pour les deux-roues motorisés', source: 'OMS — sécurité routière' }
  ];
  const nav = document.querySelector('.tabs');
  const tab = document.createElement('button');
  tab.className = 'tab';
  tab.dataset.tab = 'who-road-facts';
  tab.textContent = '🌍 Enjeux OMS';
  nav.appendChild(tab);

  const section = document.createElement('section');
  section.id = 'who-road-facts';
  section.className = 'view';
  section.hidden = true;
  section.innerHTML =
    '<div class="section-head"><div><h2>Pourquoi la mobilité sûre est urgente</h2>' +
    '<p>Estimations régionales publiées par l’Organisation mondiale de la Santé, avec leur période et leur source.</p></div></div>' +
    '<div class="who-alert" role="note"><strong>Lire correctement ces chiffres :</strong> ce sont des estimations <em>régionales</em> (Région africaine de l’OMS, année 2021). Ils ne sont pas des statistiques nationales maliennes. Les données nationales doivent provenir des sources officielles maliennes (ANASER) après vérification de leur publication la plus récente.</div>' +
    '<div class="who-grid">' + facts.map(function (f) {
      return '<article class="who-card"><strong>' + f.value + '</strong><p>' + f.label + '</p><span>' + f.source + '</span></article>';
    }).join('') + '</div>' +
    '<p class="who-source">Source : OMS, Bureau régional de l’Afrique, « Road safety in the WHO African Region 2023 » — <a href="https://www.afro.who.int/publications/road-safety-who-african-region-2023" target="_blank" rel="noopener noreferrer">afro.who.int</a>, consulté le 3 novembre 2026. Ces données ne se mettent pas à jour automatiquement : elles doivent être actualisées à chaque nouvelle publication officielle.</p>';
  document.querySelector('.shell').insertBefore(section, document.querySelector('footer'));

  const style = document.createElement('style');
  style.textContent = '.who-alert{padding:16px 18px;border:1px solid #b7d4bb;border-left:5px solid #087a3e;border-radius:14px;background:#eef7ef;color:#26442d;margin:18px 0 22px;font-size:14px;line-height:1.65}.who-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.who-card{padding:20px;border:1px solid #dce5dd;background:#fffefa;border-radius:18px;display:flex;flex-direction:column;gap:8px}.who-card strong{font-size:clamp(24px,3vw,32px);color:#087a3e;line-height:1.1}.who-card p{font-size:14px;line-height:1.6;color:#46534b;margin:0}.who-card span{font-size:11px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#63736b;margin-top:auto}.who-source{font-size:12px;line-height:1.7;color:#657169;margin:18px 0 28px}.who-source a{color:#087a3e;font-weight:700}@media(max-width:600px){.who-grid{grid-template-columns:1fr}.who-card{padding:16px}}';
  document.head.appendChild(style);
  tab.addEventListener('click', function () { switchTab('who-road-facts'); });
})();
