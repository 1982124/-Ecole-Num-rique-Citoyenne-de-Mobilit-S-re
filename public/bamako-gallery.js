/* Galerie de photographies authentiques de Bamako — sources Wikimedia Commons.
   Les fichiers sont chargés à la demande depuis Commons (connexion Internet requise).
   Chaque carte affiche le crédit et la licence vérifiés sur la fiche source.
   Ces photos illustrent des contextes ; elles ne constituent pas des références réglementaires. */
(function () {
  'use strict';
  var tabNav = document.querySelector('.tabs');
  var shell = document.querySelector('.shell');
  if (!tabNav || !shell || document.querySelector('[data-tab="bamako-gallery"]')) return;

  var scenes = [
    {
      title: 'Circulation sur une route de Bamako',
      caption: 'Observer les interactions entre véhicules et usagers dans la circulation urbaine.',
      file: 'On_the_Road_-_Bamako,_MALI.jpg',
      page: 'https://commons.wikimedia.org/wiki/File:On_the_Road_-_Bamako,_MALI.jpg',
      author: 'Carolinerre',
      license: 'CC BY-SA 4.0'
    },
    {
      title: 'Une rue du quartier de Korofina',
      caption: 'Repérer les zones de vigilance et les usagers vulnérables dans un quartier de Bamako.',
      file: 'Quartier_de_Korofina_à_Bamako,_MALI_(1).jpg',
      page: 'https://commons.wikimedia.org/wiki/File:Quartier_de_Korofina_à_Bamako,_MALI_(1).jpg',
      author: 'Carolinerre',
      license: 'CC BY-SA 4.0'
    },
    {
      title: 'Rond-point du marché de l’Assemblée nationale',
      caption: 'Observer un carrefour giratoire et discuter de l’anticipation des trajectoires.',
      file: 'Rondpoint.jpg',
      page: 'https://commons.wikimedia.org/wiki/File:Rondpoint.jpg',
      author: 'Aboubacar223',
      license: 'CC BY-SA 4.0'
    },
    {
      title: 'Taxis collectifs de Bamako',
      caption: 'Identifier les transports collectifs, leurs arrêts et les situations de visibilité réduite.',
      file: 'Taxi_vans_in_Bamako.jpg',
      page: 'https://commons.wikimedia.org/wiki/File:Taxi_vans_in_Bamako.jpg',
      author: 'robin.elaine',
      license: 'CC BY 2.0'
    },
    {
      title: 'Sur le pont des Martyrs',
      caption: 'Observer les déplacements sur un axe important de Bamako et la cohabitation des usagers.',
      file: 'Sur_le_pont_des_martyrs_à_Bamako.jpg',
      page: 'https://commons.wikimedia.org/wiki/File:Sur_le_pont_des_martyrs_à_Bamako.jpg',
      author: 'Christine MALARD',
      license: 'CC BY-SA 4.0'
    },
    {
      title: 'Bamako vue de nuit depuis ACI 2000',
      caption: 'Évoquer la visibilité et l’adaptation de la conduite lorsque la luminosité baisse.',
      file: 'Bamako_at_Night_(45407846292).jpg',
      page: 'https://commons.wikimedia.org/wiki/File:Bamako_at_Night_(45407846292).jpg',
      author: 'Mark Fischer',
      license: 'CC BY-SA 2.0'
    }
  ];

  var tab = document.createElement('button');
  tab.type = 'button';
  tab.className = 'tab';
  tab.dataset.tab = 'bamako-gallery';
  tab.textContent = '📸 Photos de Bamako';
  tab.setAttribute('aria-controls', 'bamako-gallery');
  tabNav.appendChild(tab);

  var view = document.createElement('section');
  view.id = 'bamako-gallery';
  view.className = 'view';
  view.hidden = true;
  view.setAttribute('aria-labelledby', 'bamako-gallery-title');
  view.innerHTML =
    '<div class="section-head"><div><h2 id="bamako-gallery-title">Observer la route au Mali</h2>' +
    '<p>Photographies documentées de Bamako pour contextualiser les apprentissages.</p></div></div>' +
    '<div class="gallery-notice" role="note"><strong>Usage pédagogique :</strong> ces photographies montrent des lieux et déplacements à Bamako. Elles ne prouvent pas à elles seules une règle de circulation. Les images sont hébergées par Wikimedia Commons et nécessitent une connexion Internet.</div>' +
    '<div class="bamako-gallery-grid">' +
    scenes.map(function (s) {
      var imageUrl = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(s.file) + '?width=960';
      return '<article class="bamako-scene">' +
        '<a class="bamako-image-link" href="' + s.page + '" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir la source de la photographie : ' + s.title + '">' +
        '<img loading="lazy" decoding="async" src="' + imageUrl + '" alt="' + s.title + '" />' +
        '<span class="image-open">Voir la source ↗</span></a>' +
        '<div class="bamako-scene-copy"><h3>' + s.title + '</h3><p>' + s.caption + '</p>' +
        '<p class="photo-credit">Photo : ' + s.author + ' · ' + s.license + '</p>' +
        '<a href="' + s.page + '" target="_blank" rel="noopener noreferrer">Consulter la fiche, les conditions et l’historique ↗</a></div></article>';
    }).join('') +
    '</div><p class="gallery-credit">Crédits et licences affichés pour chaque photographie. Toute réutilisation ou redistribution doit respecter les conditions de la licence correspondante.</p>';

  shell.insertBefore(view, shell.querySelector('footer'));

  var style = document.createElement('style');
  style.textContent =
    '.bamako-gallery-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}' +
    '.bamako-scene{overflow:hidden;border:1px solid #d9e3dc;border-radius:18px;background:#fffefa;box-shadow:0 6px 20px rgba(15,45,28,.06);min-width:0}' +
    '.bamako-image-link{display:block;position:relative;background:#e7ece8;aspect-ratio:16/9;overflow:hidden}' +
    '.bamako-image-link img{display:block;width:100%;height:100%;object-fit:cover}' +
    '.bamako-image-link img:not([src]){visibility:hidden}' +
    '.image-open{position:absolute;right:10px;bottom:10px;padding:6px 10px;border-radius:20px;background:rgba(13,35,23,.88);color:#fff;font-size:12px}' +
    '.bamako-scene-copy{padding:16px}.bamako-scene-copy h3{font-size:18px;line-height:1.3;margin:0 0 7px}' +
    '.bamako-scene-copy p{font-size:14px;line-height:1.6;color:#4b594f;margin:0 0 10px}' +
    '.bamako-scene-copy .photo-credit{font-size:12px;font-weight:700;color:#315b3c}' +
    '.bamako-scene-copy a,.gallery-credit{font-size:12px;line-height:1.6;color:#087a3e}' +
    '.gallery-notice{margin:16px 0 20px;padding:14px 16px;border-radius:12px;background:#eef7ee;color:#264b31;font-size:14px;line-height:1.6}' +
    '.gallery-credit{color:#68756b;margin:18px 0 28px}' +
    '@media(max-width:650px){.bamako-gallery-grid{grid-template-columns:1fr}.bamako-scene-copy{padding:14px}}' +
    '@media(prefers-reduced-motion:reduce){.bamako-image-link img{transition:none!important}}';
  document.head.appendChild(style);

  tab.addEventListener('click', function () {
    if (typeof window.switchTab === 'function') window.switchTab('bamako-gallery');
  });

  view.addEventListener('error', function (event) {
    if (event.target && event.target.tagName === 'IMG') {
      event.target.alt = event.target.alt + ' — image indisponible, ouvrir la fiche source';
      event.target.removeAttribute('src');
      event.target.parentNode.classList.add('image-unavailable');
    }
  }, true);
})();
