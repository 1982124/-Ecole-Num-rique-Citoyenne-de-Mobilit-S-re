/* Référentiel synthétique des catégories du permis malien — Décret n°2023-0509/PT-RM, art. 90. */
(function(){
'use strict';
const categories=[
{code:'A1',name:'Vélomoteurs',description:'Vélomoteurs.',age:'16 ans révolus',medical:'Pas de visite médicale préalable sauf constatation de l’examinateur.'},
{code:'A2',name:'Motocyclettes',description:'Motocyclettes avec ou sans side-car.',age:'16 ans révolus',medical:'Pas de visite médicale préalable sauf constatation de l’examinateur.'},
{code:'B1',name:'Tricycles et quadricycles à moteur',description:'Transport de personnes avec au maximum quatre places assises en plus du conducteur, ou transport de marchandises avec charge utile maximale de 1 500 kg.',age:'18 ans révolus',medical:'Certificat médical favorable requis.'},
{code:'B',name:'Véhicules légers',description:'Véhicules de transport de personnes jusqu’à huit places assises en plus du conducteur, ou véhicules de marchandises dont le PTAC ne dépasse pas 3 500 kg. Remorque de marchandises jusqu’à 750 kg.',age:'18 ans révolus',medical:'Pas de visite médicale préalable sauf constatation de l’examinateur.'},
{code:'C',name:'Transport de marchandises et matériels',description:'Véhicules de marchandises ou matériels de PTAC supérieur à 3 500 kg ; comprend également les engins et matériels mentionnés par le décret.',age:'18 ans révolus',medical:'Certificat médical favorable requis.'},
{code:'D',name:'Transport de personnes',description:'Véhicules de transport de personnes comportant plus de huit places assises en plus du conducteur ou transportant plus de huit personnes hors conducteur.',age:'21 ans révolus',medical:'Certificat médical favorable requis.'},
{code:'E',name:'Véhicules avec remorque lourde',description:'Véhicules des catégories B, C ou D attelés d’une remorque dont le PTAC dépasse 750 kg ; le décret prévoit aussi des ensembles agricoles.',age:'Âge requis pour la catégorie du véhicule tracteur',medical:'Certificat médical favorable requis.'},
{code:'F',name:'Véhicules spécialement aménagés',description:'Véhicules des catégories A1, A2 ou B spécialement aménagés pour tenir compte du handicap du conducteur.',age:'18 ans révolus',medical:'Certificat médical favorable requis.'}
];
function render(){
 const nav=document.querySelector('.tabs'),shell=document.querySelector('.shell');
 if(!nav||!shell||document.getElementById('permit-categories'))return;
 const tab=document.createElement('button');tab.className='tab';tab.dataset.tab='permit-categories';tab.textContent='🪪 Permis maliens';nav.appendChild(tab);
 const section=document.createElement('section');section.id='permit-categories';section.className='view';section.hidden=true;
 section.innerHTML='<div class="section-head"><div><h2>Les 8 catégories de permis au Mali</h2><p>Repères de lecture du décret n°2023-0509/PT-RM du 12 septembre 2023, article 90.</p></div></div><div class="permit-note"><strong>À retenir :</strong> l’autorisation de conduire un cyclomoteur à partir de 14 ans est distincte des catégories de permis A1, A2, B1, B, C, D, E et F.</div><div class="permit-grid">'+categories.map(c=>'<article class="lesson permit-card"><div class="permit-code">'+c.code+'</div><h3>'+c.name+'</h3><p>'+c.description+'</p><p><strong>Âge minimum indiqué :</strong> '+c.age+'</p><p><strong>Condition médicale :</strong> '+c.medical+'</p></article>').join('')+'</div><div class="permit-note"><strong>Examen :</strong> le décret prévoit une épreuve théorique et une épreuve pratique. La délivrance intervient sur avis favorable d’un inspecteur du permis de conduire. Les conditions détaillées de demande, de formation, de passage entre catégories et de délivrance peuvent dépendre d’arrêtés d’application.</div><p class="permit-source"><a href="https://sgg-mali.ml/JO/2023/mali-jo-2023-26.pdf" target="_blank" rel="noopener noreferrer">Consulter le Journal officiel du Mali, n°2023-26 du 29 septembre 2023 (décret 2023-0509, art. 89–90)</a></p>';
 shell.insertBefore(section,document.querySelector('footer'));
 tab.addEventListener('click',()=>window.switchTab('permit-categories'));
 const style=document.createElement('style');style.textContent='.permit-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin:16px 0}.permit-card{position:relative;gap:8px}.permit-card h3{margin:0}.permit-card p{margin:0;font-size:13px}.permit-code{display:grid;place-items:center;width:52px;height:52px;border-radius:15px;background:linear-gradient(135deg,#14b24c,#ffcc00);color:#15191f;font-weight:950;font-size:21px}.permit-note{background:#eef5ec;border-left:4px solid #14b24c;border-radius:12px;padding:14px 16px;margin:14px 0;color:#24352b;font-size:14px}.permit-source{font-size:13px}.permit-source a{color:var(--forest);font-weight:800}@media(max-width:600px){.permit-grid{grid-template-columns:1fr}}';document.head.appendChild(style);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
