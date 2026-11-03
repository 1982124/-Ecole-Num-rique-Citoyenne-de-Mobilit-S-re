/* Galerie immersive complémentaire — photographies de Bamako hébergées par Wikimedia Commons.
   Chaque carte renvoie à la page de fichier qui précise l'auteur et la licence. Images distantes : connexion requise. */
(function () {
  'use strict';
  const tabNav = document.querySelector('.tabs');
  const shell = document.querySelector('.shell');
  if (!tabNav || !shell || document.querySelector('[data-tab="bamako-gallery"]')) return;
  const scenes = [
    { title: 'Circulation sur une route de Bamako', caption: 'Observer les interactions entre véhicules et usagers.', file: 'On_the_Road_-_Bamako,_MALI.jpg', page: 'https://commons.wikimedia.org/wiki/File:On_the_Road_-_Bamako,_MALI.jpg' },
    { title: 'Une rue de Korofina', caption: 'Repérer les zones de vigilance et les usagers vulnérables.', file: 'Quartier_de_Korofina_à_Bamako,_MALI_(1).jpg', page: 'https://commons.wikimedia.org/wiki/File:Quartier_de_Korofina_à_Bamako,_MALI_(1).jpg' },
    { title: 'Rond-point à Bamako', caption: 'Anticiper les trajectoires et céder le passage selon la signalisation.', file: 'Rondpoint.jpg', page: 'https://commons.wikimedia.org/wiki/File:Rondpoint.jpg' },
    { title: 'Taxis collectifs de Bamako', caption: 'Comprendre les arrêts, angles morts et mouvements des transports collectifs.', file: 'Taxi_vans_in_Bamako.jpg', page: 'https://commons.wikimedia.org/wiki/File:Taxi_vans_in_Bamako.jpg' },
    { title: 'Pont des Martyrs', caption: 'Adapter sa conduite à la densité du trafic et aux conditions de visibilité.', file: 'Sur_le_pont_des_martyrs_à_Bamako.jpg', page: 'https://commons.wikimedia.org/wiki/File:Sur_le_pont_des_martyrs_à_Bamako.jpg' },
    { title: 'Route du Niger', caption: 'Observer le partage de la chaussée et garder une distance de sécurité.', file: 'Route_du_Niger_à_Bamako_(AOF).jpg', page: 'https://commons.wikimedia.org/wiki/File:Route_du_Niger_à_Bamako_(AOF).jpg' },
    { title: 'Bamako après la tombée de la nuit', caption: 'Réduire les risques et rester visible lorsque la luminosité baisse.', file: 'Bamako_at_Night_(45407846292).jpg', page: 'https://commons.wikimedia.org/wiki/File:Bamako_at_Night_(45407846292).jpg' }
  ];
  const tab = document.createElement('button');
  tab.className = 'tab';
  tab.dataset.tab = 'bamako-gallery';
  tab.textContent = '📸 Immersion à Bamako';
  tabNav.appendChild(tab);

  const view = document.createElement('section');
  view.id = 'bamako-gallery';
  view.className = 'view';
  view.hidden = true;
  view.innerHTML = '<div class="section-head"><div><h2>Observer la route au Mali</h2><p>Photographies réelles complémentaires pour contextualiser les apprentissages. Sélection de Wikimedia Commons ; chaque photo ouvre sa fiche source et sa licence.</p></div></div>' +
    '<div class="gallery-notice" role="note"><strong>À savoir :</strong> ces photos sont des supports d’observation, pas des preuves de la réglementation actuelle. Elles se chargent depuis Internet ; les cours essentiels restent accessibles selon le fonctionnement hors ligne existant.</div>' +
    '<div class="bamako-gallery-grid">' + scenes.map(function (s) {
      const imageUrl = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(s.file) + '?width=900';
      return '<article class="bamako-scene"><a class="bamako-image-link" href="' + s.page + '" target="_blank" rel="noopener noreferrer" aria-label="Voir la photo et sa licence : ' + s.title + '">' +
        '<img loading="lazy" decoding="async" src="' + imageUrl + '" alt="' + s.title + '" />' +
        '<span class="image-open">Voir la source ↗</span></a><div class="bamako-scene-copy"><h3>' + s.title + '</h3><p>' + s.caption + '</p><a href="' + s.page + '" target="_blank" rel="noopener noreferrer">Auteur et licence sur Wikimedia Commons ↗</a></div></article>';
    }).join('') + '</div><p class="gallery-credit">Les droits et conditions de réutilisation varient selon le fichier. Vérifier la licence indiquée sur chaque page avant toute redistribution ou réutilisation hors de cette application.</p>';
  shell.insertBefore(view, shell.querySelector('footer'));

  const style = document.createElement('style');
  style.textContent = '.bamako-gallery-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.bamako-scene{overflow:hidden;border:1px solid #d9e3dc;border-radius:18px;background:#fffefa;box-shadow:0 6px 20px rgba(15,45,28,.06)}.bamako-image-link{display:block;position:relative;background:#e7ece8;aspect-ratio:16/9;overflow:hidden}.bamako-image-link img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s ease}.bamako-image-link:hover img{transform:scale(1.035)}.image-open{position:absolute;right:10px;bottom:10px;padding:6px 10px;border-radius:20px;background:rgba(13,35,23,.88);color:#fff;font-size:12px}.bamako-scene-copy{padding:16px}.bamako-scene-copy h3{font-size:18px;line-height:1.3;margin:0 0 7px}.bamako-scene-copy p{font-size:14px;line-height:1.6;color:#4b594f;margin:0 0 12px}.bamako-scene-copy a,.gallery-credit{font-size:12px;line-height:1.6;color:#087a3e}.gallery-notice{margin:16px 0 20px;padding:14px 16px;border-radius:12px;background:#eef7ee;color:#264b31;font-size:14px;line-height:1.6}.gallery-credit{color:#68756b;margin:18px 0 28px}@media(max-width:650px){.bamako-gallery-grid{grid-template-columns:1fr}.bamako-scene-copy{padding:14px}}@media(prefers-reduced-motion:reduce){.bamako-image-link img{transition:none}}';
  document.head.appendChild(style);
  tab.addEventListener('click', function () { switchTab('bamako-gallery'); });
})();