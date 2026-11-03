(function () {
  'use strict';
  /* Examen blanc d'entraînement — 40 questions, 30 minutes, seuil 35/40.
     Outil pédagogique : ne remplace ni l'examen officiel ni une inscription administrative au Mali.
     Les questions portent sur la sécurité routière et le référentiel des permis déjà présents dans l'application. */
  var nav = document.querySelector('.tabs');
  var shell = document.querySelector('.shell');
  if (!nav || !shell || document.querySelector('[data-tab="exam"]')) return;

  var PASS_MARK = 35;
  var EXAM_SECONDS = 1800;
  var STORAGE_KEY = 'mbk_exam_best';

  var bank = [
    { q: 'Tu abordes un rond-point sans signalisation. Qui est prioritaire ?', a: ['Les véhicules qui s\'engagent sur l\'anneau', 'Les véhicules circulant déjà sur l\'anneau', 'Le véhicule le plus rapide'], c: 1, w: 'Les véhicules déjà engagés sur l\'anneau sont prioritaires : ralentis avant de t\'engager et cède le passage.' },
    { q: 'Un feu passe à l\'orange fixe alors que tu arrives à hauteur. Que fais-tu ?', a: ['Tu accélères pour passer', 'Tu t\'arrêtes, sauf si l\'arrêt n\'est plus possible en sécurité', 'Tu klaxonnes et tu continues'], c: 1, w: 'L\'orange annonce l\'arrêt imminent : seul un véhicule trop proche pour s\'arrêter en sécurité peut continuer.' },
    { q: 'Que t\'impose un panneau STOP ?', a: ['Un simple ralentissement', 'Un arrêt complet à la limite de la chaussée, même si tout semble libre', 'Un rapide coup d\'œil'], c: 1, w: 'L\'arrêt doit être complet, à hauteur de la ligne, pour observer dans les deux directions.' },
    { q: 'Devant un panneau « Cédez le passage », tu dois :', a: ['T\'arrêter obligatoirement même si la voie est libre', 'Ralentir et céder si un usager arrive, sans arrêt si la voie est libre', 'Continuer à la même vitesse'], c: 1, w: 'Ce panneau impose de céder le passage, pas un arrêt systématique : adapte selon la circulation.' },
    { q: 'Un véhicule de secours avec sirène et gyrophares approche. Que fais-tu ?', a: ['Tu accélères pour le devancer', 'Tu serres à droite et tu lui cèdes le passage', 'Tu t\'arrêtes net au milieu de la chaussée'], c: 1, w: 'Facilite le passage des secours : serre à droite ou à l\'écart, sans créer un nouveau danger.' },
    { q: 'Un véhicule quitte un stationnement pour rejoindre la circulation. Qui doit céder ?', a: ['Toi, car tu circules déjà', 'Lui, car il rejoint la circulation', 'Personne'], c: 1, w: 'Un usager qui rejoint la circulation depuis un stationnement doit céder à ceux qui circulent.' },
    { q: 'À une intersection sans aucune signalisation, un véhicule arrive sur ta droite. La règle usuelle est :', a: ['Il te cède le passage', 'Tu lui cèdes le passage (priorité à droite)', 'Le plus gros véhicule passe'], c: 1, w: 'En l\'absence de signalisation, la règle usuelle de prudence est la priorité à droite. Vérifie toujours le texte malien en vigueur.' },
    { q: 'Sur une piste étroite en pente, un véhicule arrive en face. Qui facilite le croisement ?', a: ['Celui qui descend, s\'il dispose d\'un refuge', 'Celui qui monte, toujours', 'Aucun, chacun force'], c: 0, w: 'Sur voie étroite en pente, celui qui descend facilite le croisement s\'il dispose d\'un refuge ; dans tous les cas chacun ralentit.' },
    { q: 'Il est 12h30 devant une école, les élèves sortent. Ta vitesse doit être :', a: ['Normale, la voie semble libre', 'Très réduite, avec le pied prêt à freiner', 'Nulle : tu attends la fin'], c: 1, w: 'Les enfants sont imprévisibles et peu visibles : vitesse très réduite et vigilance maximale aux abords des écoles.' },
    { q: 'La nuit ou dans la poussière, ta vitesse doit surtout dépendre de :', a: ['De la limite affichée uniquement', 'De la distance que tu peux réellement voir', 'Du nombre de véhicules'], c: 1, w: 'Ne jamais rouler plus vite que la distance dans laquelle on peut s\'arrêter en sécurité : la visibilité commande.' },
    { q: 'Pendant l\'hivernage, la chaussée est glissante. Tu dois :', a: ['Garder la même distance de sécurité', 'Augmenter nettement la distance de sécurité et freiner en douceur', 'Serrer le véhicule devant'], c: 1, w: 'Sur chaussée mouillée, la distance de freinage s\'allonge fortement : anticiper et garder une plus grande marge.' },
    { q: 'Tu traverses un marché urbain animé. Le risque principal est :', a: ['Les piétons surgissant entre les étals et véhicules', 'Les feux de circulation', 'Les camions de livraison'], c: 0, w: 'Dans un marché, des piétons peuvent surgir de partout : vitesse très basse, prêt à s\'arrêter.' },
    { q: 'Un panneau rond cerclé de rouge t\'indique :', a: ['Un danger', 'Une interdiction', 'Une obligation'], c: 1, w: 'Le cercle rouge signale une interdiction : ne pas dépasser, ne pas tourner, limitation, etc.' },
    { q: 'Un panneau triangulaire à bord rouge t\'indique :', a: ['Une interdiction', 'Un danger à l\'approche', 'Une obligation'], c: 1, w: 'Le triangle avertit d\'un danger : adapte ta vitesse avant la zone signalée.' },
    { q: 'Un panneau rond bleu t\'indique :', a: ['Une interdiction', 'Une obligation ou une indication autorisée', 'Un danger'], c: 1, w: 'Le cercle bleu impose une obligation (sens, voie) ou indique une pratique autorisée.' },
    { q: 'S\'arrêter un instant pour laisser monter un voyageur, véhicule surveillé, s\'appelle :', a: ['Stationner', 'S\'arrêter', 'Garer'], c: 1, w: 'S\'arrêter = très court séjour, véhicule surveillé ; stationner = quitter son véhicule ; les panneaux les distinguent.' },
    { q: 'Un piéton surgit entre deux véhicules stationnés. Ta meilleure réaction :', a: ['Accélérer avant qu\'il avance', 'Ralentir et être prêt à t\'arrêter', 'Klaxonner et maintenir la vitesse'], c: 1, w: 'Un piéton masqué peut surgir brusquement : seule une vitesse réduite laisse le temps de réagir.' },
    { q: 'Un troupeau approche le bord de la chaussée sur un axe rural. Tu dois :', a: ['Klaxonner pour l\'écarter', 'Ralentir et laisser le passage se dégager', 'Dépasser au plus près'], c: 1, w: 'Un animal peut changer de direction sans prévenir : ralentis et patiente à distance.' },
    { q: 'À la tombée de la nuit, tu croises des piétons sans équipement réfléchissant. Tu dois :', a: ['Rouler en feux de route en continu', 'Réduire ta vitesse et adapter ton éclairage', 'Klaxonner pour les prévenir'], c: 1, w: 'Un piéton mal visible la nuit est un danger réel : réduis ta vitesse et adapte ton éclairage.' },
    { q: 'Un piéton attend sur un passage piéton balisé. Tu dois :', a: ['Le contourner par la gauche', 'T\'arrêter pour le laisser traverser', 'Accélérer en klaxonnant'], c: 1, w: 'Sur un passage piéton, la priorité est au piéton : arrêt complet et patience.' },
    { q: 'Dans quel cas le dépassement est-il interdit ?', a: ['Sur une route large et droite', 'À l\'approche d\'un sommet de côte ou d\'un virage sans visibilité', 'Quand la voie d\'en face est libre'], c: 1, w: 'Sans visibilité suffisante (sommet, virage, intersection), un dépassement expose à un choc frontal.' },
    { q: 'Tu ne vois pas le visage du conducteur d\'un camion dans ses rétroviseurs. Cela signifie :', a: ['Qu\'il te voit bien', 'Qu\'il ne te voit probablement pas : tu es dans son angle mort', 'Qu\'il va ralentir'], c: 1, w: 'Hors du champ des rétroviseurs d\'un poids lourd, tu es invisible : ne reste jamais dans ses angles morts.' },
    { q: 'Tu dépasses un cycliste. La marge latérale à conserver doit être :', a: ['Minimale, pour ne pas gêner les autres', 'Large, selon ta vitesse et son équilibre', 'Nulle s\'il roule près du bord'], c: 1, w: 'Un deux-roues peut se déporter (trou, vent) : laisse une marge généreuse lors du dépassement.' },
    { q: 'La nuit, en agglomération bien éclairée, tu roules avec :', a: ['Tes feux de route', 'Tes feux de croisement', 'Aucun feu'], c: 1, w: 'Les feux de route éblouissent et sont réservés aux routes non éclairées : en ville, feux de croisement.' },
    { q: 'Dans la poussière dense qui réduit la visibilité, tu utilises :', a: ['Les feux de route', 'Les feux de croisement et une vitesse adaptée', 'L\'avertisseur en continu'], c: 1, w: 'Feux de route plus poussière égale éblouissement mutuel : réduis ta vitesse et signale-toi avec les feux adaptés.' },
    { q: 'L\'avertisseur sonore (klaxon) doit servir :', a: ['À saluer les connaissances', 'À signaler un danger immédiat', 'À presser les piétons'], c: 1, w: 'L\'avertisseur est un signal de sécurité pour un danger immédiat, pas un moyen de presser autrui.' },
    { q: 'Pourquoi conserver au moins deux secondes avec le véhicule devant ?', a: ['Pour mieux l\'entendre', 'Pour disposer du temps de réaction et de freinage', 'Pour économiser le carburant'], c: 1, w: 'La distance d\'arrêt égale temps de réaction plus distance de freinage : deux secondes constituent la marge minimale de sécurité.' },
    { q: 'Sur un long trajet, la prévention de la fatigue recommande :', a: ['Rouler sans pause pour arriver plus tôt', 'Une pause au moins toutes les deux heures', 'Monter la radio'], c: 1, w: 'La fatigue dégrade vigilance et temps de réaction : une pause régulière et de l\'eau sont essentielles sous la chaleur.' },
    { q: 'Utiliser son téléphone en conduisant :', a: ['Est possible si l\'on parle fort', 'Distrait fortement l\'attention, même en kit prolongé', 'Ne change rien'], c: 1, w: 'Toute manipulation du téléphone au volant détourne l\'attention ; même en kit, un appel prolongé fatigue l\'attention.' },
    { q: 'Avant de conduire, à propos d\'alcool :', a: ['Un peu d\'alcool détend et aide à conduire', 'Aucune consommation n\'est sûre : vigilance et temps de réaction baissent dès les premiers verres', 'Seule une ivresse visible est dangereuse'], c: 1, w: 'L\'alcool réduit vigilance, coordination et jugement dès les premières doses : la règle la plus sûre est zéro alcool avant de conduire.' },
    { q: 'À deux-roues motorisé, le casque doit être :', a: ['Porté et attaché, par le conducteur et le passager', 'Porté par le conducteur seulement', 'Porté sans attacher la jugulaire'], c: 0, w: 'Un casque non attaché ou absent transforme une chute bénigne en traumatisme grave : tout le monde à bord en porte un, attaché.' },
    { q: 'À propos de la ceinture de sécurité :', a: ['Utile seulement hors agglomération', 'Chaque occupant doit être attaché, à l\'avant comme à l\'arrière', 'Inutile à faible vitesse'], c: 1, w: 'À 50 km/h, un choc équivaut à une chute de plusieurs étages pour un occupant non attaché : tous s\'attachent.' },
    { q: 'Avant l\'hivernage, les vérifications importantes sont :', a: ['La couleur du véhicule', 'L\'usure et la pression des pneus, l\'état des freins et des essuie-glaces', 'L\'autoradio'], c: 1, w: 'Adhérence, freinage et visibilité sont les trois vies d\'un véhicule sous la pluie : à contrôler avant la saison.' },
    { q: 'Ton chargement déborde ou masque tes feux. Que fais-tu ?', a: ['Tu roules prudemment, ça ira', 'Tu arrimes, tu réduis le volume et tu libères feux et plaques avant de partir', 'Tu recous une bâche rapidement'], c: 1, w: 'Un chargement mal arrimé ou masquant les feux est un danger : rien ne doit masquer l\'éclairage ni dépasser le gabarit autorisé.' },
    { q: 'Premier réflexe en arrivant sur un accident avec blessés :', a: ['Déplacer les blessés à l\'ombre', 'Protéger le lieu (avertir, baliser), puis secourir et alerter', 'Filmer la scène'], c: 1, w: 'Protéger avant tout pour éviter le suraccident ; puis secourir sans déplacer un blessé, sauf danger immédiat, et alerter les secours.' },
    { q: 'Un blessé inconscient respire, sans danger immédiat. Tu dois :', a: ['Le déplacer à l\'ombre', 'Le laisser en place, surveiller sa respiration, alerter et le couvrir', 'Lui donner à boire'], c: 1, w: 'Sauf danger immédiat (incendie, circulation), on ne déplace pas un blessé : on alerte, on surveille, on couvre.' },
    { q: 'Pourquoi baliser un accident sur la route ?', a: ['Pour protéger le lieu et éviter un suraccident', 'Pour indiquer un itinéraire', 'Par formalité administrative'], c: 0, w: 'Le balisage (triangle, feux de détresse) avertit les usagers en amont et évite de nouvelles victimes.' },
    { q: 'D\'après le référentiel des permis repris du décret 2023-0509 (article 90), la catégorie pour une motocyclette légère est :', a: ['A1', 'B1', 'F'], c: 0, w: 'La catégorie A1 couvre les motocyclettes légères dans le référentiel repris par l\'application ; vérifie toujours le texte officiel en vigueur.' },
    { q: 'Tu échoues plusieurs fois aux examens blancs sur les priorités. La meilleure stratégie :', a: ['Mémoriser les réponses sans comprendre', 'Revoir les leçons « priorités et panneaux », refaire des examens jusqu\'à comprendre', 'Abandonner cette thématique'], c: 1, w: 'L\'échec répété signale une leçon mal comprise : on reprend le cours, on s\'entraîne, on teste à nouveau.' },
    { q: 'La veille d\'un examen officiel, le bon réflexe est :', a: ['Réviser toute la nuit', 'Dormir suffisamment et repasser un examen blanc détendu', 'Boire plusieurs cafés'], c: 1, w: 'Le sommeil consolide la mémoire : un examen se prépare par la régularité, pas par une nuit blanche.' }
  ];

  var tab = document.createElement('button');
  tab.className = 'tab';
  tab.dataset.tab = 'exam';
  tab.textContent = '📝 Examen blanc';
  nav.appendChild(tab);

  var section = document.createElement('section');
  section.id = 'exam';
  section.className = 'view';
  section.hidden = true;
  shell.insertBefore(section, shell.querySelector('footer'));

  var order = [];
  var pos = 0;
  var answers = [];
  var remaining = EXAM_SECONDS;
  var timerId = null;

  function shuffled() {
    var a = bank.map(function (v, i) { return i; });
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function fmt(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  function readBest() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; }
  }

  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  function renderStart() {
    stopTimer();
    var best = readBest();
    section.innerHTML =
      '<div class="section-head"><div><h2>Examen blanc d\'entraînement</h2>' +
      '<p>Simule les conditions d\'un examen : chronomètre, 40 questions, seuil de réussite. Résultat et corrections à la fin.</p></div></div>' +
      '<div class="exam-alert" role="note"><strong>À savoir :</strong> cet examen blanc est un outil pédagogique. Il ne remplace ni l\'examen officiel ni l\'inscription administrative au Mali, et ses questions ne reproduisent pas un sujet officiel.</div>' +
      '<div class="exam-rules"><div><span class="exam-fig">40</span><span class="exam-lab">questions tirées de la banque</span></div>' +
      '<div><span class="exam-fig">30 min</span><span class="exam-lab">de temps limité</span></div>' +
      '<div><span class="exam-fig">35/40</span><span class="exam-lab">seuil de réussite conseillé</span></div>' +
      (best ? '<div><span class="exam-fig">' + best.score + '/40</span><span class="exam-lab">ton meilleur score</span></div>' : '') +
      '</div>' +
      '<div class="actions"><button class="btn primary" id="exam-start">▶ Commencer l\'examen</button></div>';
    document.getElementById('exam-start').onclick = beginExam;
  }

  function beginExam() {
    order = shuffled();
    pos = 0;
    answers = [];
    remaining = EXAM_SECONDS;
    timerId = setInterval(tick, 1000);
    renderQuestion();
  }

  function tick() {
    remaining--;
    var el = document.getElementById('exam-timer');
    if (el) el.textContent = fmt(remaining);
    if (remaining <= 0) finish(true);
  }

  function renderQuestion() {
    var q = bank[order[pos]];
    section.innerHTML =
      '<div class="exam-bar"><span id="exam-timer" role="timer">' + fmt(remaining) + '</span><span>Question ' + (pos + 1) + ' / ' + order.length + '</span></div>' +
      '<article class="exam-question"><h3>' + q.q + '</h3>' +
      q.a.map(function (opt, i) {
        return '<button class="exam-opt" data-opt="' + i + '">' + opt + '</button>';
      }).join('') +
      '</article>';
    Array.prototype.forEach.call(section.querySelectorAll('.exam-opt'), function (btn) {
      btn.onclick = function () {
        answers.push(parseInt(btn.dataset.opt, 10));
        pos++;
        if (pos >= order.length) finish(false);
        else setTimeout(renderQuestion, 180);
      };
    });
  }

  function finish(timedOut) {
    stopTimer();
    var score = 0;
    var wrong = [];
    for (var i = 0; i < order.length; i++) {
      var q = bank[order[i]];
      var given = answers[i];
      if (typeof given === 'number' && given === q.c) score++;
      else wrong.push({ n: i + 1, q: q, given: given });
    }
    var best = readBest();
    if (!best || score > best.score) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ score: score, date: new Date().toISOString() })); } catch (e) {}
    }
    var pass = score >= PASS_MARK;
    section.innerHTML =
      '<div class="section-head"><div><h2>Résultat de l\'examen blanc</h2>' +
      '<p>Entraînement pédagogique — aucune valeur officielle.</p></div></div>' +
      '<div class="exam-result ' + (pass ? 'pass' : 'fail') + '"><strong>' + score + ' / ' + order.length + '</strong>' +
      '<span>' + (pass
        ? 'Félicitations : tu atteins le seuil conseillé de ' + PASS_MARK + '/40. Continue à t\'entraîner pour maintenir ce niveau.'
        : 'Sous le seuil conseillé de ' + PASS_MARK + '/40. Relis les leçons liées aux questions manquées, puis retente l\'examen.') + '</span>' +
      (timedOut ? '<em>Temps écoulé : ' + (order.length - answers.length) + ' question(s) non répondue(s), comptées incorrectes.</em>' : '') +
      '</div>' +
      (wrong.length ? '<h3 class="exam-review-title">Revoir tes erreurs (' + wrong.length + ')</h3><ol class="exam-review">' +
        wrong.map(function (w) {
          return '<li><p class="exam-q">' + w.q.q + '</p>' +
            '<p><strong>Ta réponse :</strong> ' + (typeof w.given === 'number' ? w.q.a[w.given] : 'aucune') + ' — <strong>Bonne réponse :</strong> ' + w.q.a[w.q.c] + '</p>' +
            '<p class="exam-why">' + w.q.w + '</p></li>';
        }).join('') + '</ol>' : '<p>Toutes les réponses sont correctes. Bravo !</p>') +
      '<div class="actions"><button class="btn primary" id="exam-again">↻ Recommencer un nouvel examen</button></div>';
    document.getElementById('exam-again').onclick = renderStart;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  var style = document.createElement('style');
  style.textContent = '.exam-alert{padding:14px 16px;border:1px solid #b7d4bb;border-left:5px solid #087a3e;border-radius:12px;background:#eef7ef;color:#26442d;font-size:13.5px;line-height:1.6;margin:0 0 18px}.exam-rules{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:0 0 20px}.exam-rules div{background:#fffefa;border:1px solid #dce5dd;border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:4px}.exam-fig{font-size:22px;font-weight:900;color:#087a3e}.exam-lab{font-size:12px;color:#63736b;line-height:1.4}.exam-bar{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#1d3029;color:#fff;border-radius:12px;font-weight:800;margin-bottom:16px}.exam-bar span:first-child{font-variant-numeric:tabular-nums;color:#f9d616}.exam-question{background:#fffefa;border:1px solid #dce5dd;border-radius:18px;padding:22px;box-shadow:0 12px 35px #193d2c12}.exam-question h3{margin:0 0 16px;font-size:19px;line-height:1.45}.exam-opt{display:block;width:100%;text-align:left;margin:0 0 10px;padding:13px 15px;border:1px solid #dce5dd;border-radius:12px;background:#fff;font-weight:600;font-size:15px;cursor:pointer}.exam-opt:hover:not(:disabled){border-color:#087a3e;background:#f2f8f3}.exam-opt:focus-visible{outline:3px solid #e6a916;outline-offset:2px}.exam-opt:disabled{opacity:.55;cursor:default}.exam-result{display:flex;flex-direction:column;gap:6px;padding:22px;border-radius:16px;margin-bottom:18px;border:1px solid}.exam-result strong{font-size:34px}.exam-result.pass{background:#edf7ee;border-color:#8cb79a;color:#1e5c36}.exam-result.fail{background:#fdf1f1;border-color:#d8a5a5;color:#7a2d2d}.exam-result em{font-size:12.5px;color:#63736b}.exam-review-title{font-size:18px;margin:6px 0 10px}.exam-review{margin:0 0 18px;padding-left:20px}.exam-review li{margin-bottom:14px}.exam-q{font-weight:800;margin:0 0 4px}.exam-review p{font-size:14px;margin:0 0 3px}.exam-why{color:#46534b;font-size:13px;line-height:1.6}@media(max-width:650px){.exam-rules{grid-template-columns:repeat(2,minmax(0,1fr))}.exam-question{padding:16px}}';
  document.head.appendChild(style);

  tab.addEventListener('click', function () { window.switchTab('exam'); });
  renderStart();
})();
