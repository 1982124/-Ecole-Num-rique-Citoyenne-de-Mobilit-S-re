/* Panneaux complémentaires — familles de signalisation illustrées par des schémas pédagogiques originaux.
   Ils ne reproduisent pas à l'identique les panneaux officiels maliens et restent à faire valider par les autorités compétentes avant tout usage officiel. */
(function () {
  'use strict';
  var nav = document.querySelector('.tabs');
  var shell = document.querySelector('.shell');
  if (!nav || !shell || document.querySelector('[data-tab="signs-extra"]')) return;

  var items = [
    { id: 'giratoire', title: 'Carrefour à sens giratoire', cat: 'Danger', short: 'Un giratoire arrive : ralentis avant l\'anneau.', rule: 'Le panneau t\'avertit d\'un carrefour à sens giratoire. Ralentis avant l\'entrée, cède aux véhicules déjà sur l\'anneau, puis engage-toi sans couper la trajectoire des autres.' },
    { id: 'zone30', title: 'Zone à vitesse limitée (type zone 30)', cat: 'Limitation', short: 'Vitesse maximale réduite dans toute la zone.', rule: 'Une vitesse maximale faible s\'applique dans toute la zone, souvent autour d\'habitations ou d\'écoles. À la sortie, les limites habituelles reprennent. Vérifie la valeur exacte dans le texte malien en vigueur.' },
    { id: 'prio-droite', title: 'Intersection : priorité à droite', cat: 'Danger', short: 'Prochaine intersection : règle de la priorité à droite.', rule: 'À l\'approche de cette intersection sans signalisation, la règle usuelle s\'applique : tu cèdes au véhicule arrivant de ta droite, tout en vérifiant dans les deux directions.' },
    { id: 'traversee-pietons', title: 'Traversée de piétons', cat: 'Danger', short: 'Des piétons peuvent traverser à proximité.', rule: 'Un passage pour piétons est proche : réduis ta vitesse et sois prêt à t\'arrêter pour laisser traverser, surtout aux heures de sortie des écoles.' },
    { id: 'interdit-depasser', title: 'Interdiction de dépasser', cat: 'Interdiction', short: 'Le dépassement est interdit sur ce tronçon.', rule: 'Tant que la restriction s\'applique, ne dépasse aucun véhicule : elle vise les zones sans visibilité ou à risque. Sa fin est signalée par un panneau barré.' },
    { id: 'fin-interdit-depasser', title: 'Fin d\'interdiction de dépasser', cat: 'Indication', short: 'Le dépassement redevient possible, sous conditions.', rule: 'La restriction de dépassement prend fin : tu peux à nouveau dépasser, mais uniquement avec une visibilité suffisante et une manœuvre autorisée.' },
    { id: 'demi-tour-interdit', title: 'Demi-tour interdit', cat: 'Interdiction', short: 'Impossible de faire demi-tour à cet endroit.', rule: 'Le demi-tour est interdit ici : poursuis ton itinéraire jusqu\'à un croisement autorisé ou un aménagement prévu à cet effet.' },
    { id: 'passage-pieton-bleu', title: 'Passage pour piétons (repère)', cat: 'Indication', short: 'Emplacement aménagé pour traverser.', rule: 'Ce repère indique aux piétons l\'emplacement prévu pour traverser. En conducteur, reste attentif et arrête-toi pour laisser passer les piétons engagés.' },
    { id: 'animaux', title: 'Passage d\'animaux domestiques', cat: 'Danger', short: 'Troupeaux susceptibles de traverser.', rule: 'Sur les axes ruraux, des animaux peuvent traverser : réduis ta vitesse, tiens ta droite et laisse le passage se dégager sans klaxonner.' },
    { id: 'chute-pierres', title: 'Chute de pierres', cat: 'Danger', short: 'Risque de pierres sur la chaussée.', rule: 'Après de fortes pluies ou en zone rocheuse, des pierres peuvent encombrer la chaussée : adapte ta vitesse et évite de longer la paroi.' },
    { id: 'vent', title: 'Vent latéral', cat: 'Danger', short: 'Rafales susceptibles de déporter le véhicule.', rule: 'Le vent peut déporter ton véhicule, surtout à deux-roues ou avec une charge légère : réduis ta vitesse et tiens fermement la direction.' },
    { id: 'glissant', title: 'Chaussée glissante', cat: 'Danger', short: 'Adhérence réduite : pluie, huile ou sable.', rule: 'Freine en douceur, allonge la distance de sécurité et évite tout changement brusque de direction sur chaussée glissante.' }
  ];

  function svg(id) {
    var tri = '<polygon points="50,9 94,89 6,89" fill="#fffefa" stroke="#ce1126" stroke-width="7" stroke-linejoin="round"/>';
    var ring = '<circle cx="50" cy="50" r="41" fill="#fffefa" stroke="#ce1126" stroke-width="8"/>';
    var greyRing = '<circle cx="50" cy="50" r="41" fill="#fffefa" stroke="#5c6a60" stroke-width="8"/>';
    var blueSq = '<rect x="7" y="7" width="86" height="86" rx="14" fill="#285e9b"/>';
    var g = '';
    switch (id) {
      case 'giratoire': g = tri + '<circle cx="50" cy="60" r="15" fill="none" stroke="#1d3029" stroke-width="5"/><polygon points="64,48 70,60 58,60" fill="#1d3029"/>'; break;
      case 'zone30': g = ring + '<text x="50" y="62" text-anchor="middle" font-family="system-ui,sans-serif" font-size="30" font-weight="800" fill="#1d3029">30</text>'; break;
      case 'prio-droite': g = tri + '<rect x="44" y="34" width="5" height="46" fill="#1d3029"/><rect x="30" y="60" width="34" height="5" fill="#1d3029"/><polygon points="62,55 74,62.5 62,70" fill="#ce1126"/>'; break;
      case 'traversee-pietons': g = tri + '<circle cx="44" cy="42" r="6" fill="#1d3029"/><rect x="41" y="49" width="6" height="16" fill="#1d3029"/><rect x="41" y="65" width="5" height="14" fill="#1d3029" transform="rotate(18 43 72)"/><rect x="46" y="65" width="5" height="14" fill="#1d3029" transform="rotate(-16 48 72)"/>'; break;
      case 'interdit-depasser': g = ring + '<rect x="28" y="42" width="20" height="10" rx="3" fill="#1d3029"/><rect x="52" y="42" width="20" height="10" rx="3" fill="#1d3029"/><circle cx="33" cy="55" r="3" fill="#1d3029"/><circle cx="43" cy="55" r="3" fill="#1d3029"/><circle cx="57" cy="55" r="3" fill="#1d3029"/><circle cx="67" cy="55" r="3" fill="#1d3029"/>'; break;
      case 'fin-interdit-depasser': g = greyRing + '<rect x="28" y="42" width="20" height="10" rx="3" fill="#5c6a60"/><rect x="52" y="42" width="20" height="10" rx="3" fill="#5c6a60"/><path d="M22 78 L78 22" stroke="#5c6a60" stroke-width="5"/>'; break;
      case 'demi-tour-interdit': g = ring + '<path d="M36 66 V42 A14 14 0 0 1 64 42 V66" fill="none" stroke="#1d3029" stroke-width="6"/><polygon points="64,70 58,58 70,58" fill="#1d3029"/>'; break;
      case 'passage-pieton-bleu': g = blueSq + '<rect x="22" y="42" width="8" height="22" fill="#fff"/><rect x="34" y="42" width="8" height="22" fill="#fff"/><rect x="46" y="42" width="8" height="22" fill="#fff"/><rect x="58" y="42" width="8" height="22" fill="#fff"/><rect x="70" y="42" width="8" height="22" fill="#fff"/>'; break;
      case 'animaux': g = tri + '<rect x="30" y="50" width="26" height="13" rx="4" fill="#1d3029"/><rect x="54" y="44" width="10" height="9" rx="3" fill="#1d3029"/><rect x="33" y="63" width="4" height="12" fill="#1d3029"/><rect x="49" y="63" width="4" height="12" fill="#1d3029"/>'; break;
      case 'chute-pierres': g = tri + '<path d="M18 86 L38 66 L50 74 L66 56" fill="none" stroke="#1d3029" stroke-width="5"/><circle cx="72" cy="48" r="4" fill="#1d3029"/><circle cx="78" cy="60" r="3" fill="#1d3029"/><circle cx="84" cy="44" r="2.5" fill="#1d3029"/>'; break;
      case 'vent': g = tri + '<path d="M28 58 h34 a6 6 0 1 0 -6 -9" fill="none" stroke="#1d3029" stroke-width="5"/><path d="M28 70 h24 a5 5 0 1 1 -5 8" fill="none" stroke="#1d3029" stroke-width="5"/>'; break;
      case 'glissant': g = tri + '<rect x="40" y="42" width="20" height="10" rx="3" fill="#1d3029"/><path d="M34 68 q6 -8 14 -8 q8 0 14 8" fill="none" stroke="#1d3029" stroke-width="3" stroke-dasharray="4 3"/>'; break;
    }
    return '<svg viewBox="0 0 100 100" role="img" aria-label="Illustration : ' + id + '" xmlns="http://www.w3.org/2000/svg">' + g + '</svg>';
  }

  var tab = document.createElement('button');
  tab.className = 'tab';
  tab.dataset.tab = 'signs-extra';
  tab.textContent = '🚸 Plus de panneaux';
  nav.appendChild(tab);

  var view = document.createElement('section');
  view.id = 'signs-extra';
  view.className = 'view';
  view.hidden = true;
  view.innerHTML =
    '<div class="section-head"><div><h2>Familles de panneaux complémentaires</h2>' +
    '<p>Douze repères illustrés supplémentaires pour élargir ta lecture de la route.</p></div></div>' +
    '<div class="signs-extra-note" role="note"><strong>Important :</strong> ces schémas sont des supports pédagogiques originaux. Ils illustrent des familles de panneaux sans reproduire à l\'identique les panneaux officiels maliens, et restent à faire valider par les autorités compétentes avant tout usage officiel.</div>' +
    '<div class="signs-extra-grid">' + items.map(function (s) {
      return '<article class="signs-extra-card"><div class="signs-extra-visual">' + svg(s.id) + '</div>' +
        '<span class="tag">' + s.cat + '</span><h3>' + s.title + '</h3><p class="signs-extra-short">' + s.short + '</p>' +
        '<p class="signs-extra-rule">' + s.rule + '</p>' +
        '<button class="btn outline" data-listen-extra="' + s.id + '">🔊 Écouter</button></article>';
    }).join('') + '</div>';
  shell.insertBefore(view, shell.querySelector('footer'));

  view.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-listen-extra]');
    if (!btn) return;
    var s = items.find(function (x) { return x.id === btn.dataset.listenExtra; });
    if (!s) return;
    var text = s.title + '. ' + s.rule;
    if (typeof window.readAloud === 'function') window.readAloud(text);
    else if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(text)); } catch (err) {} }
  });

  var style = document.createElement('style');
  style.textContent = '.signs-extra-note{margin:0 0 18px;padding:14px 16px;border:1px solid #b7d4bb;border-left:5px solid #087a3e;border-radius:12px;background:#eef7ef;color:#26442d;font-size:13.5px;line-height:1.6}.signs-extra-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.signs-extra-card{background:#fffefa;border:1px solid #dce5dd;border-radius:18px;padding:18px;box-shadow:0 12px 35px #193d2c12;display:flex;flex-direction:column;align-items:flex-start;gap:8px}.signs-extra-visual{width:86px;height:86px;display:grid;place-items:center;background:#f1f4ed;border-radius:18px}.signs-extra-visual svg{width:74px;height:74px}.signs-extra-card h3{font-size:17px;margin:2px 0 0;line-height:1.3}.signs-extra-short{font-size:13px;color:#63736b;margin:0}.signs-extra-rule{font-size:13.5px;color:#46534b;line-height:1.6;margin:0}.signs-extra-card .btn{margin-top:auto}@media(max-width:650px){.signs-extra-grid{grid-template-columns:1fr}}';
  document.head.appendChild(style);

  tab.addEventListener('click', function () { window.switchTab('signs-extra'); });
})();
