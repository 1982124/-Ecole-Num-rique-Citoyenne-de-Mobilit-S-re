/* Sources officielles du droit routier malien — vérifiées le 2 novembre 2026.
   Cette rubrique référence les textes officiels sans remplacer leur lecture ni une validation pédagogique/juridique. */
(function () {
  'use strict';
  if (!document.querySelector('.tabs') || !document.querySelector('.shell')) return;
  if (document.querySelector('[data-tab="official-sources"]')) return;
  const sources = [
    {
      authority: 'Direction générale des Transports (DGT) — Ministère chargé des Transports',
      title: 'Documents officiels : Code de la route, permis et conduite',
      detail: 'La DGT publie notamment la loi et le décret du Code de la route, les conditions de délivrance et de validité des permis et les documents relatifs au contrôle technique.',
      url: 'https://dgt.gouv.ml/documents',
      label: 'Consulter les documents de la DGT'
    },
    {
      authority: 'Secrétariat général du Gouvernement du Mali (SGG)',
      title: 'Journal officiel de la République du Mali',
      detail: 'Source de publication des lois et décrets. À consulter pour contrôler le texte applicable, sa date de publication et les éventuels textes modificatifs.',
      url: 'https://sgg-mali.ml/fr/le-journal-officiel/le-journal-officiel.html',
      label: 'Consulter le Journal officiel'
    },
    {
      authority: 'Secrétariat général du Gouvernement du Mali (SGG)',
      title: 'Loi n° 2023-045 du 31 août 2023 — référence légale',
      detail: 'La loi est citée dans le décret relatif à la circulation routière. Le PDF lié est le Journal officiel du 29 septembre 2023 contenant cette référence dans le texte réglementaire ; il ne doit pas être confondu avec une copie isolée de la loi.',
      url: 'https://sgg-mali.ml/JO/2023/mali-jo-2023-26.pdf',
      label: 'Vérifier la référence dans le Journal officiel (PDF)'
    },
    {
      authority: 'Journal officiel de la République du Mali — SGG',
      title: 'Décret n° 2023-0509/PT-RM du 12 septembre 2023',
      detail: 'Le Journal officiel n° 26 du 29 septembre 2023 publie ce décret relatif aux conditions d’usage des voies ouvertes à la circulation publique et à la mise en circulation des véhicules. Vérifier les textes ultérieurs avant d’en déduire une règle actuelle.',
      url: 'https://sgg-mali.ml/JO/2023/mali-jo-2023-26.pdf',
      label: 'Consulter le décret au Journal officiel'
    },
    {
      authority: 'Direction générale des Transports (DGT)',
      title: 'Présentation et missions de la DGT',
      detail: 'Repère institutionnel pour les démarches de transport, les documents de circulation et les services compétents.',
      url: 'https://dgt.gouv.ml/direction/presentation',
      label: 'Voir les missions de la DGT'
    }
  ];
  const nav = document.querySelector('.tabs');
  const tab = document.createElement('button');
  tab.className = 'tab';
  tab.dataset.tab = 'official-sources';
  tab.textContent = '⚖️ Sources officielles';
  nav.appendChild(tab);

  const section = document.createElement('section');
  section.id = 'official-sources';
  section.className = 'view';
  section.hidden = true;
  section.innerHTML =
    '<div class="section-head"><div><h2>Références officielles du Mali</h2>' +
    '<p>Les règles de l’application doivent être contrôlées à partir des textes publiés par les autorités maliennes.</p></div></div>' +
    '<div class="official-alert" role="note"><strong>Important — exactitude réglementaire</strong>' +
    '<p>Cette application est un outil pédagogique, pas une source juridique. Les vitesses, seuils d’alcool, catégories de permis, amendes et autres sanctions ne doivent être présentés comme des obligations en vigueur qu’après vérification article par article dans les textes officiels applicables. En cas de doute, consulte le texte et les autorités compétentes.</p></div>' +
    '<div class="official-grid">' + sources.map(function (s) {
      return '<article class="official-card"><span class="official-authority">' + s.authority + '</span>' +
        '<h3>' + s.title + '</h3><p>' + s.detail + '</p>' +
        '<a class="btn primary official-link" href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + s.label + ' ↗</a></article>';
    }).join('') + '</div>' +
    '<p class="official-date">Sources officielles consultées le 2 novembre 2026. Les liens externes s’ouvrent dans un nouvel onglet. La publication d’un texte ne dispense pas de vérifier les modifications et textes d’application en vigueur.</p>';
  document.querySelector('.shell').insertBefore(section, document.querySelector('footer'));

  const style = document.createElement('style');
  style.textContent = '.official-alert{padding:17px 19px;border:1px solid #e6bf52;border-left:5px solid #d6a42e;border-radius:14px;background:#fff8df;color:#433711;margin:18px 0 22px}.official-alert p{margin:8px 0 0;line-height:1.65}.official-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.official-card{min-width:0;padding:20px;border:1px solid #dce5dd;background:#fffefa;border-radius:18px;display:flex;flex-direction:column;align-items:flex-start;gap:10px}.official-authority{font-size:11px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#087a3e}.official-card h3{font-size:19px;line-height:1.3;margin:0}.official-card p{font-size:14px;line-height:1.65;color:#46534b;margin:0 0 5px}.official-link{display:inline-flex;text-decoration:none;margin-top:auto;white-space:normal}.official-date{font-size:12px;line-height:1.6;color:#657169;margin:18px 0 28px}@media(max-width:600px){.official-grid{grid-template-columns:1fr}.official-card{padding:16px}.official-card h3{font-size:17px}}';
  document.head.appendChild(style);
  tab.addEventListener('click', function () { switchTab('official-sources'); });
})();
