'use strict';
/* Profil national pilote Mali. Les modules pédagogiques existants restent spécifiques au Mali. */
window.MOBILITY_COUNTRY_PROFILE = Object.freeze({
  code:'ML', country:'Mali', editionName:'Mali BOLIFEN KALANSO',
  officialTitle:'École Numérique et Citoyenne pour une Mobilité Sûre',
  defaultLanguage:'fr',
  languages:[{code:'fr',name:'Français',status:'active'},{code:'bm',name:'Bamanankan',status:'partial-review-required'}],
  currency:'XOF',
  theme:{colors:['#14b24c','#ffcc00','#e03c31'],label:'Vert, jaune, rouge'},
  geography:{capital:'Bamako',localities:['Bamako','Sikasso','Ségou','Mopti','Kayes','Gao','Tombouctou','Kidal'],roadContexts:['carrefours urbains','marchés','abords des écoles','routes interurbaines','pistes rurales','traversées d’animaux','hivernage','circulation nocturne']},
  authorities:[{name:'Direction générale des Transports',url:'https://dgt.gouv.ml/documents',validation:'source-reference'},{name:'Secrétariat général du Gouvernement',url:'https://sgg-mali.ml/fr/le-journal-officiel/le-journal-officiel.html',validation:'source-reference'}],
  visualPolicy:{requiredCountryContext:'Mali',preferredLocality:'Bamako',requireAuthenticLocalPhotography:true,requireLicenseReview:true,prohibitMislabelledGenericImages:true,dignityReviewRequired:true},
  validation:{legalContent:'human-validation-required',translations:'human-validation-required',emergencyNumbers:'verify-before-publication',photographyLicenses:'verify-per-image',nationalStatistics:'use-national-source-only'},
  duplication:{contentPack:'mali',countrySpecificModules:['permit-categories.js','learning-expansion.js','immersive-courses.js','safe-mobility-campaigns.js','bamanankan-glossary.js'],note:'Ces modules contiennent des éléments maliens et doivent être adaptés et validés avant toute autre édition nationale.'}
});
(function(){
 const p=window.MOBILITY_COUNTRY_PROFILE,c=window.APP_CONFIG||{};
 if(!p||p.code!==c.countryCode){console.error('Profil pays absent ou code pays incohérent.');return;}
 const title=(c.brandBase||p.officialTitle)+' : '+(c.countrySuffix||p.editionName);
 document.title=title;
 const brand=document.getElementById('brand-title');if(brand)brand.textContent=title;
 const appName=document.querySelector('meta[name="application-name"]');if(appName)appName.content=p.editionName;
 const theme=document.querySelector('meta[name="theme-color"]');if(theme)theme.content=p.theme.colors[0];
 const colors=p.theme.colors,gradient='linear-gradient(90deg,'+colors[0]+' 0 33.33%,'+colors[1]+' 33.33% 66.66%,'+colors[2]+' 66.66% 100%)';
 document.documentElement.style.setProperty('--forest',colors[0]);
 document.documentElement.style.setProperty('--forest2',colors[0]);
 document.documentElement.style.setProperty('--green',colors[0]);
 document.documentElement.style.setProperty('--gold',colors[1]);
 document.documentElement.style.setProperty('--red',colors[2]);
 document.querySelectorAll('.topline,.brandmark').forEach(function(el){el.style.background=gradient;});
})();
/* Chargement du module visuel national : galerie de photographies locales (licences vérifiées par image).
   Le module est ajouté au cache PWA : l’onglet reste disponible hors ligne ; seules les photos distantes demandent Internet. */
(function(){
 function loadGallery(){
 if(document.querySelector('script[data-mbk="bamako-gallery"]'))return;
 var s=document.createElement('script');
 s.src='/bamako-gallery.js';s.async=true;s.dataset.mbk='bamako-gallery';
 document.head.appendChild(s);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadGallery);else loadGallery();
})();
