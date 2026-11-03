/* Mali BOLIFEN KALANSO — institutions, parcours du permis et mobilité sûre.
   Les procédures administratives affichées sont des repères d'orientation, pas une garantie de procédure actuelle.
   Toute condition réglementaire doit être confirmée auprès des services maliens compétents. */
(function(){
'use strict';
if(!document.querySelector('.tabs')||!document.querySelector('.shell')||document.getElementById('mali-permit-path'))return;
const modules=[
{title:'1. Choisir sa catégorie',icon:'🪪',body:'Identifier le véhicule et l’usage envisagé. Les catégories, les âges minimaux, les aptitudes médicales, les extensions et les restrictions doivent être vérifiés dans les textes maliens en vigueur. Ne pas choisir une catégorie à partir d’un tableau non daté.'},
{title:'2. Se renseigner auprès du service compétent',icon:'🏛️',body:'Consulter la Direction générale des Transports (DGT) et le service régional ou subrégional compétent pour obtenir la liste actuelle des pièces, les modalités de dépôt, les examens, les tarifs officiels et les délais applicables dans sa région.'},
{title:'3. Vérifier l’auto-école',icon:'🏫',body:'Avant de payer une formation, demander les informations d’identification de l’établissement et vérifier son agrément auprès de l’administration compétente. Distinguer les frais de formation privés des droits et redevances administratifs officiels.'},
{title:'4. Apprendre et pratiquer',icon:'📚',body:'Étudier la signalisation, les règles de circulation, les documents liés au véhicule, les vérifications mécaniques, les risques humains et la conduite responsable. Pratiquer avec un encadrement autorisé et un véhicule adapté à la catégorie visée.'},
{title:'5. Préparer le dossier',icon:'📄',body:'Utiliser uniquement la liste de pièces confirmée par le service compétent. Les formulaires, certificats, photographies, justificatifs, frais et lieux de dépôt peuvent dépendre des textes et procédures applicables : cette application ne remplace pas la liste officielle.'},
{title:'6. Comprendre les épreuves',icon:'📝',body:'Se préparer à démontrer ses connaissances et son aptitude pratique selon les épreuves officiellement organisées. Les quiz de cette application sont des entraînements pédagogiques, pas les questions officielles de l’examen.'},
{title:'7. Après les résultats',icon:'✅',body:'Demander au service d’examen quelle preuve de réussite est délivrée, quelles démarches restent nécessaires et à partir de quel moment le titre autorise légalement la conduite. Ne pas conduire sur la seule base d’une attestation pédagogique ou d’une information non confirmée.'},
{title:'8. Conduire en protégeant les autres',icon:'🛡️',body:'Respecter les règles, les agents habilités et les autres usagers. Casque correctement attaché à moto, ceinture, vitesse adaptée, distance de sécurité, attention aux enfants, piétons, animaux, angles morts, fatigue, alcool et téléphone.'}
];
const institutions=[
['Ministère chargé des Transports et des Infrastructures','Cadre et orientations nationales des transports. Les décisions précises applicables au permis doivent être recherchées dans les textes et actes officiels.'],
['Direction générale des Transports (DGT) et services territoriaux compétents','Point de départ pour consulter les documents officiels relatifs au permis, aux véhicules et à l’enseignement de la conduite. Vérifier quel service traite le dossier dans sa région.'],
['Établissements d’enseignement de la conduite agréés','Formation théorique et pratique dans le cadre de l’agrément applicable. Une auto-école ne délivre pas elle-même le permis officiel.'],
['Services d’examen et agents habilités','Organisation et évaluation des épreuves selon les procédures en vigueur. Les modalités précises doivent être confirmées auprès de l’administration.'],
['ANASER','Acteur de sensibilisation et de prévention de la sécurité routière. Utiliser ses communications officielles pour les campagnes et recommandations.'],
['Police, Gendarmerie et agents habilités','Police de circulation, prévention et constatation dans les limites des compétences légales. En situation réelle, suivre les instructions légitimes et les règles applicables.'],
['Services de santé et commissions médicales','Interviennent lorsque les textes exigent une aptitude ou une évaluation médicale pour la catégorie concernée. Ne pas généraliser les exigences d’une catégorie à toutes les autres.']
];
const scenes=[
['Marché et gare routière','Ralentir, anticiper les piétons qui surgissent entre les véhicules, garder une distance et ne pas bloquer les accès.'],
['École et traversée piétonne','Réduire l’allure à l’approche, observer les deux côtés et être prêt à s’arrêter. Ne jamais presser un enfant avec le klaxon.'],
['Carrefour ou rond-point encombré','Observer la signalisation et les gestes de l’agent, choisir sa voie à l’avance, ne pas s’engager si la sortie est bloquée.'],
['Route interurbaine et village','Adapter la vitesse à la visibilité, anticiper les animaux, les piétons, les véhicules lents et les changements d’état de la chaussée.'],
['Hivernage et chaussée dégradée','Réduire progressivement la vitesse, augmenter la distance et ne pas traverser une eau de profondeur inconnue.'],
['Moto, taxi-moto et véhicule lourd','Porter et attacher le casque, éviter les angles morts, ne pas surcharger et renoncer aux dépassements sans visibilité suffisante.'],
['Nuit, fatigue et distraction','Vérifier l’éclairage, adapter la vitesse à la visibilité et s’arrêter en lieu sûr en cas de fatigue. Ne pas manipuler le téléphone en conduisant.'],
['Panne ou accident','Protéger sa propre sécurité et celle des lieux sans se mettre en danger, alerter les secours par les canaux locaux confirmés et ne pratiquer que les gestes pour lesquels on est formé.']
];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function card(title,body,icon){return '<article class="lesson"><div class="lesson-top"><div class="visual" aria-hidden="true" style="font-size:34px">'+icon+'</div><span class="tag">Repère pratique</span></div><h3>'+esc(title)+'</h3><p>'+esc(body)+'</p><button class="btn outline" data-mpk-listen="'+esc(title)+'">🔊 Écouter</button></article>';}
function mount(){
 if(document.querySelector('[data-tab="mali-permit-path"]'))return;
 const nav=document.querySelector('.tabs');if(!nav||!window.switchTab)return;
 const b=document.createElement('button');b.className='tab';b.dataset.tab='mali-permit-path';b.textContent='🛣️ Permis & mobilité sûre';nav.appendChild(b);
 const sec=document.createElement('section');sec.id='mali-permit-path';sec.className='view';sec.hidden=true;
 sec.innerHTML='<div class="section-head"><div><h2>Le permis au Mali : comprendre le parcours</h2><p>Un guide d’orientation pour apprendre, se renseigner et éviter les informations administratives non vérifiées.</p></div></div>'+
 '<div class="progress" style="display:block"><h3>Important : repère pédagogique, pas décision administrative</h3><p>Les règles, pièces, frais, calendriers et délais doivent être confirmés auprès des services compétents. Les informations anciennes publiées en ligne peuvent ne plus refléter la procédure actuelle. Cette application ne délivre pas de permis.</p></div>'+
 '<div class="section-head"><div><h2>Le parcours du candidat</h2><p>Les huit étapes essentielles à vérifier dans l’ordre.</p></div></div><div class="grid">'+modules.map(x=>card(x.title,x.body,x.icon)).join('')+'</div>'+
 '<div class="section-head" style="margin-top:28px"><div><h2>Qui fait quoi ?</h2><p>Comprendre les rôles institutionnels sans confondre formation, examen et délivrance du titre.</p></div></div><div class="grid">'+institutions.map(x=>card(x[0],x[1],'🏛️')).join('')+'</div>'+
 '<div class="section-head" style="margin-top:28px"><div><h2>La mobilité sûre dans la vie réelle</h2><p>Situations de terrain à apprendre dans toutes les régions du Mali.</p></div></div><div class="grid">'+scenes.map(x=>card(x[0],x[1],'🛡️')).join('')+'</div>'+
 '<div class="progress" style="display:block;margin-top:24px"><h3>Sources institutionnelles de départ</h3><p><a href="https://dgt.gouv.ml/documents" target="_blank" rel="noopener noreferrer" style="color:#ffe681">DGT Mali — documents officiels</a><br><a href="https://sgg-mali.ml/JO/2023/mali-jo-2023-23-3.pdf" target="_blank" rel="noopener noreferrer" style="color:#ffe681">Journal officiel — loi n°2023-045 du 31 août 2023</a><br><a href="https://sgg-mali.ml/JO/2023/mali-jo-2023-26.pdf" target="_blank" rel="noopener noreferrer" style="color:#ffe681">Journal officiel — texte relatif aux catégories et à l’enseignement de la conduite</a><br><a href="https://demarchesadministratives.gouv.ml/permis-de-conduire-obtention/" target="_blank" rel="noopener noreferrer" style="color:#ffe681">Administration malienne — démarche d’obtention du permis (à confronter aux textes récents)</a></p><p>Les formulations Bamanankan, les conditions réglementaires, les tarifs et les démarches doivent être validés par des personnes compétentes au Mali avant de devenir des consignes définitives.</p></div>';
 document.querySelector('.shell').appendChild(sec);
 nav.addEventListener('click',function(e){const btn=e.target.closest('[data-tab="mali-permit-path"]');if(btn&&window.switchTab)window.switchTab('mali-permit-path');});
 sec.addEventListener('click',function(e){const btn=e.target.closest('[data-mpk-listen]');if(!btn)return;const title=btn.getAttribute('data-mpk-listen');const item=modules.find(x=>x.title===title);const inst=institutions.find(x=>x[0]===title);const scene=scenes.find(x=>x[0]===title);const textToRead=title+'. '+(item?item.body:inst?inst[1]:scene?scene[1]:'');if('speechSynthesis'in window){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(textToRead);u.lang='fr-FR';window.speechSynthesis.speak(u);}else if(typeof window.readAloud==='function'){window.readAloud(textToRead);}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();