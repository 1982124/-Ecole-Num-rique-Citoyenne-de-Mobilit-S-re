/* Extension pédagogique MBK — 51 panneaux, situations de Bamako et bonnes conduites.
   Les scènes urbaines sont des cas d'apprentissage, pas une description officielle de la signalisation actuelle. */
(function(){
'use strict';
if(!Array.isArray(window.signs)||!Array.isArray(window.scenarios)) return;
const extraSigns=[
['priority-right','Priorité à droite','Obligation','À l’approche de cette intersection, applique la règle de priorité indiquée et ralentis pour observer les usagers venant de droite.','priorité','↗'],
['curve-left','Virage à gauche','Danger','Un virage vers la gauche se présente. Réduis ta vitesse avant le virage et reste dans ta voie.','virage','↶'],
['curve-right','Virage à droite','Danger','Un virage vers la droite se présente. Anticipe la courbe, évite les freinages brusques et garde ta trajectoire.','virage','↷'],
['double-curve','Succession de virages','Danger','Plusieurs virages se suivent. Adapte ta vitesse à toute la succession et ne dépasse pas sans visibilité suffisante.','virages','∿'],
['road-narrow','Chaussée rétrécie','Danger','La chaussée devient plus étroite. Ralentis, garde ta droite et facilite le croisement sans forcer le passage.','chaussée','⇤'],
['roadworks','Travaux','Danger','Des travaux peuvent modifier la chaussée et la circulation. Ralentis, observe les indications temporaires et respecte les agents.','travaux','⚒'],
['slippery','Chaussée glissante','Danger','L’adhérence peut être réduite. Évite les gestes brusques, augmente la distance et ralentis progressivement.','adhérence','≈'],
['animals','Passage d’animaux','Danger','Des animaux peuvent traverser ou se trouver sur la chaussée. Ralentis et ne klaxonne pas de manière à les affoler.','animaux','♞'],
['steep-descent','Descente dangereuse','Danger','Une pente descendante demande une vitesse maîtrisée. Anticipe, utilise un rapport adapté et évite de laisser le véhicule prendre de la vitesse.','pente','↘'],
['intersection','Intersection','Danger','Une intersection approche. Réduis ta vitesse, observe les directions et les autres usagers avant de t’engager.','croisement','✚'],
['speed-bump','Dos-d’âne','Danger','Un ralentisseur est annoncé. Réduis ta vitesse avant de le franchir et sois attentif aux deux-roues et piétons.','ralentisseur','⌒'],
['two-way','Circulation dans les deux sens','Danger','Des véhicules peuvent arriver en sens inverse. Reste dans ta voie et ne dépasse que si la visibilité et les règles le permettent.','double sens','⇄'],
['no-overtake','Dépassement interdit','Interdiction','Ne dépasse pas dans la zone concernée. Garde une distance suffisante et attends une zone où la manœuvre est autorisée et sûre.','dépassement','⇎'],
['no-parking','Stationnement interdit','Interdiction','Ne laisse pas ton véhicule stationné dans la zone signalée. Cherche un emplacement autorisé qui ne gêne personne.','stationnement','P̸'],
['no-stopping','Arrêt interdit','Interdiction','Ne t’arrête pas dans la zone concernée, sauf nécessité absolue ou instruction d’un agent. Anticipe ton arrêt ailleurs.','arrêt','S̸'],
['no-bicycles','Accès interdit aux cycles','Interdiction','Les cycles ne doivent pas emprunter la voie signalée. Cherche un itinéraire autorisé et sûr.','cycles','🚲̸'],
['no-horn','Usage de l’avertisseur interdit','Interdiction','Évite d’utiliser le klaxon dans la zone signalée, sauf situation de danger immédiat nécessitant un avertissement.','klaxon','♪̸'],
['height-limit','Hauteur limitée','Interdiction','Un véhicule dépassant la hauteur indiquée ne doit pas s’engager. Vérifie la hauteur réelle du véhicule et de son chargement.','hauteur','↕'],
['weight-limit','Poids limité','Interdiction','Respecte la limite de poids affichée. Vérifie le poids du véhicule et de son chargement avant d’emprunter la voie.','poids','t'],
['no-u-turn','Demi-tour interdit','Interdiction','Ne fais pas demi-tour dans la zone signalée. Continue jusqu’à un endroit où la manœuvre est autorisée et sûre.','demi-tour','↶̸'],
['turn-right','Direction obligatoire à droite','Obligation','Tu dois suivre la direction indiquée. Place-toi correctement à l’avance et vérifie les angles morts.','direction','→'],
['turn-left','Direction obligatoire à gauche','Obligation','Tu dois suivre la direction indiquée. Signale ton intention et vérifie que la voie est libre avant de tourner.','direction','←'],
['keep-right','Contournement obligatoire par la droite','Obligation','Contourne l’obstacle par le côté indiqué. Ralentis et vérifie qu’aucun usager ne se trouve dans ta trajectoire.','contournement','⇢'],
['cycleway','Piste cyclable','Obligation','Cette voie est destinée aux cycles selon la signalisation. Les autres usagers doivent respecter son affectation et ne pas la bloquer.','piste cyclable','🚲'],
['one-way','Sens unique','Information','La circulation s’effectue dans le sens indiqué. Vérifie le sens avant de t’engager et ne circule jamais à contresens.','sens unique','↑'],
['dead-end','Impasse','Information','La voie ne débouche pas sur une autre rue. Anticipe ton itinéraire et ne t’engage pas si tu ne peux pas manœuvrer en sécurité.','impasse','⊣'],
['bus-stop','Arrêt d’autobus','Information','Un arrêt de transport collectif est signalé. Ralentis et reste attentif aux voyageurs qui montent, descendent ou traversent.','transport','BUS'],
['first-aid','Poste de secours','Information','Un service de premiers secours est indiqué. En cas d’accident, protège d’abord les lieux et contacte les secours compétents.','secours','+'],
['fuel','Station-service','Information','Une station-service est signalée à proximité. Prépare ton arrêt à l’avance et gare-toi dans l’espace prévu.','service','⛽'],
['residential','Zone fréquentée / résidentielle','Danger','Des habitants, enfants, piétons et deux-roues peuvent être nombreux. Réduis ta vitesse et redouble d’attention.','zone habitée','⌂']
];
const details=[
['À un carrefour sans indication claire','La priorité dépend de la signalisation et des règles applicables : ne présume jamais que tu peux passer.'],
['Sur une route sinueuse','Freiner avant le virage aide à conserver la maîtrise du véhicule.'],
['Dans une courbe serrée','Reste dans ta voie même si la trajectoire paraît plus courte de l’autre côté.'],
['Sur une route de campagne','La succession de courbes peut masquer un véhicule ou un obstacle.'],
['À proximité d’un chantier ou d’un pont','Ne cherche pas à gagner la place en forçant le passage.'],
['Près d’une équipe de voirie','Les panneaux temporaires et les consignes des agents guident le passage.'],
['Après une pluie ou sur du sable','Les distances de freinage peuvent augmenter.'],
['À proximité d’un troupeau','Laisse aux animaux et à leur conducteur le temps de dégager la chaussée.'],
['Sur une longue descente','Évite de descendre au point mort.'],
['À l’approche d’une rue transversale','Un piéton, une moto ou une voiture peut surgir latéralement.'],
['Près d’une école ou d’un marché','Les ralentisseurs protègent des usagers parfois difficiles à voir.'],
['Sur un axe à double sens','Un dépassement mal anticipé expose au choc frontal.'],
['Sur une route étroite ou sans visibilité','La patience est plus sûre qu’un dépassement forcé.'],
['Dans une rue commerçante','Ne bloque ni la chaussée, ni le trottoir, ni un accès.'],
['Près d’un carrefour ou d’un passage piéton','Choisis un emplacement qui ne masque pas la visibilité.'],
['À l’entrée d’une voie réservée','Respecte la signalisation et cherche un itinéraire autorisé.'],
['Dans une zone de tranquillité','Le klaxon ne remplace jamais l’attention et le freinage.'],
['Avant un tunnel ou un ouvrage bas','Ne tente jamais de passer si la hauteur est incertaine.'],
['À l’approche d’un pont ou d’une voie limitée','Ne surcharge pas le véhicule et sécurise le chargement.'],
['À une intersection','Continue jusqu’à un endroit adapté pour changer de direction.'],
['Dans une rue à sens imposé','Prépare ta trajectoire sans couper la route aux autres.'],
['À une bifurcation','Annonce ton changement de direction suffisamment tôt.'],
['Devant un îlot ou un obstacle','Le côté de passage est imposé par le panneau.'],
['Dans une zone urbaine partagée','Ne stationne pas sur la piste cyclable.'],
['Dans une rue à sens unique','Un conducteur venant à contresens peut surprendre les autres usagers.'],
['Dans un quartier peu familier','Utilise un itinéraire de sortie sûr plutôt qu’une marche arrière risquée.'],
['Près d’un arrêt fréquenté','Attention aux passagers qui peuvent apparaître devant ou derrière un bus.'],
['En cas d’accident ou de malaise','Ne déplace pas une personne blessée sauf danger immédiat.'],
['Avant un long trajet','Planifie le ravitaillement avant que le réservoir soit presque vide.'],
['Dans un quartier habité','La présence d’enfants et de piétons impose une conduite particulièrement attentive.']
];
extraSigns.forEach((d,i)=>{
 const [id,title,cat,rule,short,symbol]=d, meta=details[i];
 window.signs.push({id,title,cat,short,rule,why:meta[1],context:meta[0],action:'Observe la signalisation, ralentis si nécessaire et choisis une manœuvre prévisible qui protège tous les usagers.',avoid:'Ne force jamais le passage, ne te fie pas à une habitude locale et ne prends pas de risque pour gagner quelques secondes.',symbol});
});
const oldSvg=window.svg;
window.svg=function(s){
 if(!s||!s.symbol) return oldSvg(s);
 const color=s.cat==='Danger'?'#c63d3d':s.cat==='Interdiction'?'#c63d3d':s.cat==='Obligation'?'#2765a5':s.cat==='Protection'?'#27834b':'#2765a5';
 let shape='';
 if(s.cat==='Danger') shape='<polygon points="50,5 96,91 4,91" fill="#fff" stroke="'+color+'" stroke-width="8" stroke-linejoin="round"/>';
 else if(s.cat==='Interdiction') shape='<circle cx="50" cy="50" r="44" fill="#fff" stroke="'+color+'" stroke-width="9"/>';
 else if(s.cat==='Information') shape='<rect x="7" y="7" width="86" height="86" rx="7" fill="'+color+'" stroke="#fff" stroke-width="3"/>';
 else shape='<circle cx="50" cy="50" r="44" fill="'+color+'" stroke="#fff" stroke-width="3"/>';
 const fg=(s.cat==='Danger'||s.cat==='Interdiction')?'#24342c':'#fff';
 const fs=s.symbol.length>3?15:s.symbol.length>2?20:31;
 let slash=s.cat==='Interdiction'?'<path d="M19 81L81 19" stroke="'+color+'" stroke-width="7" stroke-linecap="round"/>':'';
 return '<svg viewBox="0 0 100 100" role="img" aria-label="Illustration : '+s.title+'" xmlns="http://www.w3.org/2000/svg">'+shape+'<text x="50" y="61" text-anchor="middle" font-size="'+fs+'" font-weight="900" fill="'+fg+'" font-family="Arial,sans-serif">'+s.symbol+'</text>'+slash+'</svg>';
};
const oldShow=window.showLesson;
window.showLesson=function(id){
 const s=window.signs.find(x=>x.id===id); if(!s)return oldShow(id);
 window.visited.add(id);window.persist();window.renderLessons();
 const extra='<div class="lesson-extras">'+
 (s.context?'<p><strong>📍 Exemple de contexte :</strong> '+s.context+'</p>':'')+
 (s.why?'<p><strong>Pourquoi c’est important :</strong> '+s.why+'</p>':'')+
 (s.action?'<p><strong>Le bon réflexe :</strong> '+s.action+'</p>':'')+
 (s.avoid?'<p><strong>À éviter :</strong> '+s.avoid+'</p>':'')+
 '</div>';
 document.querySelector('#lesson-detail').innerHTML='<article class="detail" style="margin-top:16px"><div class="lesson-top"><div class="visual">'+window.svg(s)+'</div><button class="bookmark" id="close-detail" aria-label="Fermer la leçon">✕</button></div><span class="tag">'+s.cat+'</span><h2>'+s.title+'</h2><p>'+s.rule+'</p>'+extra+'<div class="actions"><button class="btn dark" id="detail-listen">🔊 Écouter l’explication</button><button class="btn outline" id="detail-done">✓ J’ai compris</button></div></article>';
 document.querySelector('#detail-listen').onclick=()=>window.readAloud(s.title+'. '+s.rule+'. '+(s.why||'')+'. '+(s.action||''));document.querySelector('#close-detail').onclick=()=>document.querySelector('#lesson-detail').innerHTML='';document.querySelector('#detail-done').onclick=()=>{document.querySelector('#lesson-detail').innerHTML='';window.toast('Leçon consultée. Continue comme ça !');};document.querySelector('#lesson-detail').scrollIntoView({behavior:'smooth',block:'nearest'});
};
const bamako=[
{title:'Traverser l’axe près du Grand Marché',place:'Secteur du Grand Marché · Bamako',q:'Des piétons, motos, véhicules de livraison et vendeurs se partagent un espace animé. Tu dois rejoindre une rue de l’autre côté. Quel comportement est le plus sûr ?',a:['Te faufiler entre deux véhicules sans regarder','Ralentir, observer dans les deux sens et ne traverser que lorsque le passage est sûr','Suivre un autre piéton sans vérifier'],c:1,why:'Dans un secteur commercial dense, les mouvements peuvent venir de plusieurs directions. Cherche un passage adapté, établis un contact visuel si possible et ne traverse pas entre des véhicules en mouvement.',icon:'🛍️'},
{title:'Approche d’un carrefour sur l’ACI 2000',place:'Quartier ACI 2000 · Bamako',q:'Tu arrives à une intersection où plusieurs voies se croisent. Le feu est vert, mais des véhicules sont encore engagés et la sortie est encombrée. Que fais-tu ?',a:['Tu entres pour ne pas perdre ton tour','Tu attends que l’intersection puisse être dégagée','Tu changes de voie au dernier moment'],c:1,why:'Ne bloque pas une intersection. Observe les autres usagers et attends un espace suffisant pour traverser entièrement sans immobiliser ton véhicule au milieu.',icon:'🚦'},
{title:'Départ de la gare de Sogoniko',place:'Gare routière de Sogoniko · Bamako',q:'Un bus démarre, des passagers marchent près de la chaussée et des motos circulent à proximité. Quelle conduite adopter ?',a:['Accélérer pour dépasser le bus à tout prix','Ralentir, augmenter la vigilance et anticiper les traversées','Rouler sur le trottoir pour éviter l’attente'],c:1,why:'Aux abords d’une gare, les trajectoires sont nombreuses et parfois imprévisibles. Réduis ta vitesse, garde une marge latérale et sois prêt à t’arrêter.',icon:'🚌'},
{title:'Passage sur le Pont des Martyrs',place:'Pont des Martyrs · Bamako',q:'La circulation ralentit et un deux-roues se trouve près de ton angle mort. Quelle décision est la plus prudente avant un changement de voie ?',a:['Vérifier rétroviseurs et angle mort, signaler puis changer seulement si l’espace est libre','Tourner immédiatement parce que le clignotant est activé','Klaxonner et te déporter'],c:0,why:'Un clignotant annonce une intention mais ne donne pas la priorité. Vérifie les rétroviseurs et l’angle mort, puis renonce si l’espace est insuffisant.',icon:'🌉'},
{title:'Zone scolaire à l’heure de sortie',place:'Abords d’une école · Bamako',q:'Des élèves sortent en groupe et certains se rapprochent du bord de la chaussée. Comment réagis-tu ?',a:['Garder la même vitesse si aucun enfant n’est encore sur la route','Ralentir fortement, couvrir le frein et être prêt à t’arrêter','Klaxonner longuement pour les faire reculer'],c:1,why:'Un enfant peut changer brusquement de direction. Réduis ta vitesse avant la zone, observe les deux côtés et laisse les traversées se faire sans pression.',icon:'🎒'},
{title:'Pluie soudaine sur une avenue urbaine',place:'Avenue urbaine · Bamako',q:'Une forte pluie réduit la visibilité, l’eau s’accumule par endroits et le freinage semble moins efficace. Que fais-tu ?',a:['Augmenter la distance, ralentir progressivement et éviter les flaques profondes','Freiner brusquement et suivre le véhicule devant','Allumer les feux de route éblouissants'],c:0,why:'La pluie peut masquer les nids-de-poule et réduire l’adhérence. Ralentis sans geste brusque, augmente la distance et évite les zones dont la profondeur est inconnue.',icon:'🌧️'},
{title:'Moto et véhicule lourd sur un axe partagé',place:'Axe urbain fréquenté · Bamako',q:'Un camion ralentit et une moto apparaît à sa droite. Tu souhaites dépasser. Quel choix est le plus sûr ?',a:['Te glisser dans l’espace étroit entre les deux','Attendre derrière à distance et ne dépasser que si la visibilité et l’espace sont suffisants','Suivre la moto sans regarder devant'],c:1,why:'Les angles morts des véhicules lourds sont importants. Ne te glisse jamais dans un espace incertain et ne dépasse que si la manœuvre est clairement sûre et autorisée.',icon:'🏍️'},
{title:'Stationnement devant un commerce',place:'Rue commerçante · Bamako',q:'Tu dois faire une course rapide. Un emplacement semble libre devant une entrée et près d’un passage piéton. Que fais-tu ?',a:['Te garer quelques minutes, feux de détresse allumés','Chercher un emplacement autorisé qui ne bloque ni entrée, ni passage, ni visibilité','Laisser le véhicule en double file'],c:1,why:'Un arrêt bref peut gêner les piétons, les riverains et la circulation. Les feux de détresse ne rendent pas légal ou sûr un stationnement gênant.',icon:'🅿️'}
];
window.scenarios.push(...bamako);
const baseRenderScenario=window.renderScenario;
window.renderScenario=function(){
 const item=window.scenarios[window.scenarioIndex%window.scenarios.length];window.scenarioAnswered=false;
 const main=document.querySelector('#scenario-main');if(!main)return baseRenderScenario();
 main.innerHTML='<div class="quiz-kicker"><span>SITUATION '+(window.scenarioIndex+1)+' / '+window.scenarios.length+'</span><span>Cas pratique · '+(item.place||'Situation générale')+'</span></div><div class="quiz-sign" aria-hidden="true">'+(item.icon||'🚦')+'</div><p class="scenario-place">'+(item.place||'')+'</p><h3>'+item.title+'</h3><p>'+item.q+'</p><div class="answers">'+item.a.map((a,i)=>'<button class="answer" data-scenario="'+i+'">'+String.fromCharCode(65+i)+'. '+a+'</button>').join('')+'</div><div id="scenario-feedback" aria-live="polite"></div><div class="actions" style="justify-content:center;margin-top:16px"><button class="btn outline" id="hear-scenario">🔊 Écouter</button><button class="btn primary" id="next-scenario" hidden>Situation suivante →</button></div>';
 document.querySelector('#hear-scenario').onclick=()=>window.readAloud(item.title+'. '+item.q+'. '+item.a.join('. '));document.querySelector('#next-scenario').onclick=()=>{window.scenarioIndex=(window.scenarioIndex+1)%window.scenarios.length;window.renderScenario();};
 document.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',function(){if(window.scenarioAnswered)return;window.scenarioAnswered=true;const i=Number(this.dataset.scenario),ok=i===item.c;window.scenarioDone++;if(ok)window.scenarioCorrect++;document.querySelectorAll('[data-scenario]').forEach((x,j)=>{x.disabled=true;if(j===item.c)x.classList.add('correct');else if(j===i)x.classList.add('wrong');});document.querySelector('#scenario-feedback').innerHTML='<div class="feedback"><strong>'+(ok?'✅ Bon réflexe !':'↻ Retenons le bon réflexe.')+'</strong><p>'+item.why+'</p></div>';document.querySelector('#next-scenario').hidden=false;document.querySelector('#hear-scenario').hidden=true;document.querySelector('#scenario-record').textContent=window.scenarioCorrect+' bonne(s) réponse(s) sur '+window.scenarioDone+' situation(s).';try{localStorage.setItem('mbk_scenario_record',JSON.stringify({done:window.scenarioDone,correct:window.scenarioCorrect}));}catch(e){};}));
};
const goodHabits=[
['👀','Observer avant d’agir','Regarde loin devant, contrôle régulièrement les rétroviseurs et vérifie les angles morts avant chaque changement de direction.','Ne te fie pas uniquement au rétroviseur ou au comportement du véhicule devant.'],
['🛵','Partager la route avec les deux-roues','Laisse une marge latérale, évite les changements brusques de trajectoire et ne serre jamais un motocycliste contre le bord.','Ne coupe pas la route d’un deux-roues et ne roule pas dans son espace.'],
['🚶','Protéger les piétons','Ralentis près des marchés, écoles, arrêts de transport et passages piétons. Sois prêt à t’arrêter.','Ne klaxonne pas pour presser une personne qui traverse.'],
['🪖','S’équiper avant le départ','Porte les équipements de protection adaptés, attache la ceinture et vérifie que les passagers sont correctement installés.','Ne démarre pas en pensant t’équiper quelques minutes plus tard.'],
['↔️','Garder une distance suffisante','Laisse un espace qui te permet de réagir et de freiner. Augmente-le sous la pluie, la nuit et lorsque la chaussée est dégradée.','Ne colle pas le véhicule devant pour empêcher un autre usager de s’insérer.'],
['📵','Rester concentré','Range le téléphone avant de démarrer. Si tu dois l’utiliser, arrête-toi dans un endroit sûr.','Ne lis pas un message à un feu ou dans un embouteillage : reste attentif à la circulation.'],
['🧘','Garder son calme','Anticipe, accepte de perdre quelques secondes et laisse passer les usagers vulnérables.','Ne réponds pas à une provocation et n’effectue pas de manœuvre de représailles.'],
['🔧','Vérifier son véhicule','Avant un trajet, contrôle les pneus, freins, feux, rétroviseurs et les éléments de sécurité essentiels.','Ne prends pas la route avec un défaut important ou un chargement mal arrimé.']
];
function addGoodConduct(){
 const nav=document.querySelector('.tabs'),tab=document.createElement('button');tab.className='tab';tab.dataset.tab='good-practices';tab.textContent='🤝 Bonnes conduites';nav.appendChild(tab);
 const section=document.createElement('section');section.id='good-practices';section.className='view';section.hidden=true;
 section.innerHTML='<div class="section-head"><div><h2>8 bonnes conduites au quotidien</h2><p>Des gestes simples pour protéger les personnes et partager la route avec respect.</p></div></div><div class="progress" style="display:block"><h3>Mon engagement de conducteur ou conductrice</h3><p id="good-progress">0 conduite validée sur 8.</p><div class="good-meter"><span id="good-meter-fill"></span></div></div><div class="grid good-grid">'+goodHabits.map((h,i)=>'<article class="lesson good-card"><div class="good-icon" aria-hidden="true">'+h[0]+'</div><span class="tag">Bonne conduite '+(i+1)+'</span><h3>'+h[1]+'</h3><p>'+h[2]+'</p><p class="avoid"><strong>À éviter :</strong> '+h[3]+'</p><label class="good-check"><input type="checkbox" data-good="'+i+'"> Je m’engage à appliquer ce réflexe</label></article>').join('')+'</div>';
 document.querySelector('.shell').insertBefore(section,document.querySelector('footer'));
 let done=new Set();try{done=new Set(JSON.parse(localStorage.getItem('mbk_good_practices')||'[]'));}catch(e){}
 const update=()=>{document.querySelectorAll('[data-good]').forEach(x=>x.checked=done.has(Number(x.dataset.good)));document.querySelector('#good-progress').textContent=done.size+' conduite(s) validée(s) sur 8.';document.querySelector('#good-meter-fill').style.width=(done.size/8*100)+'%';};
 section.addEventListener('change',e=>{if(!e.target.matches('[data-good]'))return;const i=Number(e.target.dataset.good);if(e.target.checked)done.add(i);else done.delete(i);try{localStorage.setItem('mbk_good_practices',JSON.stringify([...done]));}catch(e){}update();});update();
 tab.addEventListener('click',()=>switchTab('good-practices'));
 document.querySelectorAll('.tab').forEach(b=>{if(b!==tab)b.addEventListener('click',()=>switchTab(b.dataset.tab));});
}
function addStyles(){
 const style=document.createElement('style');style.textContent='.lesson-extras{margin:15px 0;padding:14px 16px;background:#f1f5ee;border-radius:14px;border-left:4px solid var(--forest)}.lesson-extras p{margin:8px 0;font-size:14px}.scenario-place{color:var(--forest);font-weight:800;margin:0 0 6px}.good-grid{margin-bottom:20px}.good-card{gap:8px}.good-icon{font-size:38px;width:70px;height:70px;border-radius:18px;background:#e9f2e9;display:grid;place-items:center}.good-card .avoid{font-size:13px;background:#fff4e8;padding:10px;border-radius:10px}.good-check{display:flex;gap:9px;align-items:flex-start;font-weight:750;font-size:13px;margin-top:auto;padding-top:10px}.good-check input{width:19px;height:19px;accent-color:var(--forest);flex:none}.good-meter{height:9px;border-radius:99px;background:#ffffff45;margin-top:12px;overflow:hidden}.good-meter span{display:block;height:100%;width:0;background:var(--gold);transition:width .2s}@media(max-width:540px){.good-grid{grid-template-columns:1fr 1fr}.good-card{padding:11px}.good-card h3{font-size:15px}.good-check{font-size:12px}}';document.head.appendChild(style);
}
addStyles();addGoodConduct();window.renderLessons();window.updateStats();window.renderScenario();
})();
