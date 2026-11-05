'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const required = ['public/index.html','public/config.js','public/country-profile.js','public/official-sources.js','public/who-road-facts.js','public/bamako-gallery.js','public/sw.js','public/manifest.webmanifest','public/icon.svg','public/learning-expansion.js','public/immersive-courses.js','public/safe-mobility-campaigns.js','public/permit-categories.js','public/bamanankan-glossary.js','public/programs.js','vercel.json','server.js'];
for (const file of required) {
  const full = path.join(root, file);
  if (!fs.existsSync(full) || !fs.statSync(full).isFile()) throw new Error('Fichier requis absent : ' + file);
}
const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
const config = fs.readFileSync(path.join(root, 'public/config.js'), 'utf8');
const countryProfile = fs.readFileSync(path.join(root, 'public/country-profile.js'), 'utf8');
const officialSources = fs.readFileSync(path.join(root, 'public/official-sources.js'), 'utf8');
const whoRoadFacts = fs.readFileSync(path.join(root, 'public/who-road-facts.js'), 'utf8');
const bamakoGallery = fs.readFileSync(path.join(root, 'public/bamako-gallery.js'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'public/sw.js'), 'utf8');
const expansion = fs.readFileSync(path.join(root, 'public/learning-expansion.js'), 'utf8');
const immersive = fs.readFileSync(path.join(root, 'public/immersive-courses.js'), 'utf8');
const safeMobility = fs.readFileSync(path.join(root, 'public/safe-mobility-campaigns.js'), 'utf8');
const permitCategories = fs.readFileSync(path.join(root, 'public/permit-categories.js'), 'utf8');
const glossary = fs.readFileSync(path.join(root, 'public/bamanankan-glossary.js'), 'utf8');
const programs = fs.readFileSync(path.join(root, 'public/programs.js'), 'utf8');
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/manifest.webmanifest'), 'utf8'));
if (!html.includes('id="lesson-grid"') || !html.includes('id="quiz-main"') || !html.includes('id="scenario-main"')) throw new Error('Une section pédagogique essentielle est absente.');
if (!html.includes('data-tab="scenarios"') || html.includes('socket.io.min.js')) throw new Error('La navigation pédagogique ou la suppression de la dépendance de chat est incorrecte.');
if (!config.includes('window.APP_CONFIG')) throw new Error('Configuration de marque introuvable.');
if (!config.includes('/country-profile.js') || !config.includes('/official-sources.js') || !config.includes('/who-road-facts.js') || !config.includes('/bamako-gallery.js')) throw new Error('Le chargeur des modules de données nationales est absent de la configuration.');
if (!countryProfile.includes('window.MOBILITY_COUNTRY_PROFILE') || !countryProfile.includes("code:'ML'") || !countryProfile.includes('partial-review-required')) throw new Error('Le profil national malien est incomplet.');
if (!countryProfile.includes('dgt.gouv.ml') || !countryProfile.includes('sgg-mali.ml')) throw new Error('Le profil national doit référencer les autorités maliennes.');
if (!officialSources.includes('dgt.gouv.ml') || !officialSources.includes('sgg-mali.ml') || !officialSources.includes('2023-045') || !officialSources.includes('2023-0509')) throw new Error('Les références légales maliennes (loi 2023-045, décret 2023-0509) sont absentes des sources officielles.');
if (!whoRoadFacts.includes('225 482') || !whoRoadFacts.includes('19 %') || !whoRoadFacts.includes('+17 %') || !whoRoadFacts.includes('afro.who.int')) throw new Error('Les constats OMS doivent conserver les chiffres vérifiés et leur source primaire.');
if (!whoRoadFacts.includes('régionales')) throw new Error('Les constats OMS doivent préciser que les données sont régionales et non nationales.');
if (!bamakoGallery.includes('commons.wikimedia.org') || !/loading\s*=\s*["']lazy["']/.test(bamakoGallery)) throw new Error('La galerie Bamako doit charger des images distantes en mode différé.');
if (!sw.includes('/country-profile.js') || !sw.includes('/official-sources.js') || !sw.includes('/who-road-facts.js') || !sw.includes('/bamako-gallery.js')) throw new Error('Les nouveaux modules doivent être mis en cache par le service worker.');
if (vercel.outputDirectory !== 'public' || vercel.buildCommand !== 'npm run build') throw new Error('Configuration de build Vercel incorrecte.');
// Configuration PWA : le précache de l'app shell est requis, sous l'une des deux stratégies validées —
// installation atomique historique (addAll(APP_SHELL)) OU installation tolérante aux pannes
// (mise en cache individuelle des fichiers APP_SHELL, un fichier manquant ne casse pas l'installation).
// L'intention protégée est la même : l'app shell est précaché au démarrage.
if (!manifest.icons || !manifest.icons.length) throw new Error('Configuration PWA incomplète : icônes du manifeste absentes.');
if (!(sw.includes('addAll(APP_SHELL)') || sw.includes('APP_SHELL.map'))) throw new Error('Configuration PWA incomplète : le précache de l\u2019app shell est absent du service worker.');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map((m) => m[1]).filter((s) => s.trim());
if (!scripts.length) throw new Error('Script applicatif introuvable.');
for (const script of scripts) new vm.Script(script, { filename: 'public/index.html:inline-script' });
new vm.Script(config, { filename: 'public/config.js' });
new vm.Script(countryProfile, { filename: 'public/country-profile.js' });
new vm.Script(officialSources, { filename: 'public/official-sources.js' });
new vm.Script(whoRoadFacts, { filename: 'public/who-road-facts.js' });
new vm.Script(bamakoGallery, { filename: 'public/bamako-gallery.js' });
new vm.Script(sw, { filename: 'public/sw.js' });
new vm.Script(expansion, { filename: 'public/learning-expansion.js' });
new vm.Script(immersive, { filename: 'public/immersive-courses.js' });
const openCourseBlock = immersive.split('function openCourse(id){')[1]?.split('\n}\nsection.addEventListener')[0] || '';
if (!openCourseBlock.includes("delete stage.dataset.answered;")) throw new Error('Le module immersif doit réinitialiser la réponse à chaque ouverture de scène.');
new vm.Script(safeMobility, { filename: 'public/safe-mobility-campaigns.js' });
new vm.Script(permitCategories, { filename: 'public/permit-categories.js' });
new vm.Script(glossary, { filename: 'public/bamanankan-glossary.js' });
new vm.Script(programs, { filename: 'public/programs.js' });
if (!html.includes('/immersive-courses.js') || !sw.includes('/immersive-courses.js')) throw new Error('Le module immersif doit être chargé et mis en cache.');
if (!html.includes('/safe-mobility-campaigns.js') || !sw.includes('/safe-mobility-campaigns.js')) throw new Error('Le module mobilité sûre doit être chargé et mis en cache.');
const permitCodes = [...permitCategories.matchAll(/code:'([A-F][12]?)'/g)].map((m) => m[1]);
if (!html.includes('/permit-categories.js') || !sw.includes('/permit-categories.js') || permitCodes.join(',') !== 'A1,A2,B1,B,C,D,E,F') throw new Error('Le référentiel des huit catégories de permis doit être chargé et mis en cache.');
if (!html.includes('/bamanankan-glossary.js') || !sw.includes('/bamanankan-glossary.js') || !glossary.includes('window.MBK_BAMANANKAN_TERMS') || !glossary.includes('status:\'pending\'')) throw new Error('Le dictionnaire Bamanankan doit être chargé et distinguer les termes attestés des traductions à valider.');
if (!html.includes('/programs.js') || !sw.includes('/programs.js') || !programs.includes('demande d’intérêt uniquement') || !programs.includes('ONG / ASSOCIATION')) throw new Error('Les parcours particuliers et ONG doivent être chargés et leurs limites explicites.');
if (!programs.includes('Programme institutionnel de sensibilisation') || !programs.includes('value="institution"') || !programs.includes('INSTITUTION / COLLECTIVITÉ')) throw new Error('Les programmes de sensibilisation doivent couvrir les institutions, collectivités et organisations.');
if (!permitCategories.includes('window.switchTab(\'permit-categories\')') || permitCategories.includes("document.querySelectorAll('.tab').forEach")) throw new Error('La navigation de la rubrique permis est incorrecte ou dupliquée.');
if (!html.includes('class="traffic-signal"') || !html.includes('signal-red') || !html.includes('signal-amber') || !html.includes('signal-green') || !html.includes('prefers-reduced-motion')) throw new Error('Le feu tricolore canonique ou son accessibilité est absent.');
const immersiveScenes = (immersive.match(/\{id:'[a-z]+',n:'/g) || []).length;
if (immersiveScenes !== 8) throw new Error('Le module immersif doit contenir 8 scènes illustrées : ' + immersiveScenes);
const lessons = (html.match(/\{id:'/g) || []).length;
const signBlock = expansion.split('const details=')[0];
const extraSigns = (signBlock.match(/^\['/gm) || []).length;
const bamakoBlock = (expansion.split('const bamako=[')[1] || '').split('];')[0];
const bamakoCases = (bamakoBlock.match(/^\{title:/gm) || []).length;
const nationalBlock = (expansion.split('const national=[')[1] || '').split('];')[0];
const nationalCases = (nationalBlock.match(/^\{title:/gm) || []).length;
const habitsBlock = (expansion.split('const goodHabits=[')[1] || '').split('];')[0];
const goodPractices = (habitsBlock.match(/^\['/gm) || []).length;
if (lessons + extraSigns !== 51) throw new Error('Le catalogue doit contenir exactement 51 panneaux : ' + (lessons + extraSigns));
if (bamakoCases !== 8) throw new Error('Le module Bamako doit contenir 8 cas : ' + bamakoCases);
if (nationalCases !== 8) throw new Error('Le module national doit contenir 8 cas hors Bamako : ' + nationalCases);
if (!expansion.includes('window.scenarios.push(...bamako,...national)')) throw new Error('Les situations nationales ne sont pas chargées.');
if (goodPractices !== 8) throw new Error('Le module bonnes conduites doit contenir 8 scènes : ' + goodPractices);
if (lessons < 20) throw new Error('Le catalogue de leçons est trop court : ' + lessons);
// Verrou définitif sur le nom officiel « Mali BOLIFEN KALANSO ».
// Toute graphie alternative du nom est interdite dans TOUT le dépôt, quel que soit le fichier.
// Balayage récursif de l'ensemble des fichiers texte (hors node_modules, .git et archives de résultats de tests).
const FORBIDDEN_NAME = /BOLIFENKO\s+KALANSO/i;
const TEXT_EXTENSIONS = new Set(['.js', '.html', '.css', '.json', '.md', '.txt', '.yml', '.yaml', '.webmanifest', '.svg', '.xml', '.sql', '.mjs', '.cjs']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'docs/resultats-tests']);
let scannedFiles = 0;
function scanForForbiddenName(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      scanForForbiddenName(path.join(dir, entry.name));
    } else if (TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      scannedFiles++;
      const content = fs.readFileSync(path.join(dir, entry.name), 'utf8');
      if (FORBIDDEN_NAME.test(content)) throw new Error('Graphie interdite du nom du projet détectée dans : ' + entry.name + ' — le nom officiel unique est « Mali BOLIFEN KALANSO » (verrou définitif, décision CTO du 3 novembre 2026). Corrige le fichier puis relance les contrôles.');
    }
  }
}
scanForForbiddenName(root);
// Les fichiers de marque doivent toujours porter le nom officiel.
// La vérification est insensible à la casse : « Mali BOLIFEN KALANSO », « MALI BOLIFEN KALANSO »
// et toute casse équivalente sont le même nom officiel ; seule la graphie interdite reste bloquée.
const OFFICIAL_NAME = /mali\s+bolifen\s+kalanso/i;
const brandingFiles = ['README.md', 'package.json', 'public/config.js', 'public/index.html', 'public/manifest.webmanifest', 'server.js'];
for (const file of brandingFiles) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  if (!OFFICIAL_NAME.test(content)) throw new Error('Nom officiel « Mali BOLIFEN KALANSO » absent de : ' + file);
}
// Verrou sur le libellé officiel de l'école : « École Numérique Citoyenne pour une Mobilité Sûre ».
// La graphie ancienne « Numérique et Citoyenne » est interdite dans les sources du titre composé
// (config.js et country-profile.js produisent le titre affiché, README et package.json le portent).
// index.html conserve provisoirement son libellé statique de repli : il est remplacé à l'exécution
// par le titre composé depuis public/config.js et public/country-profile.js (IIFE de surcharge).
const OFFICIAL_BASE_TITLE = 'École Numérique Citoyenne pour une Mobilité Sûre';
const FORBIDDEN_OLD_TITLE = /Numérique\s+et\s+Citoyenne/i;
const titleSourceFiles = ['README.md', 'package.json', 'public/config.js', 'public/country-profile.js'];
for (const file of titleSourceFiles) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  if (!content.includes(OFFICIAL_BASE_TITLE)) throw new Error('Libellé officiel de l’école absent de : ' + file + ' — attendu : « École Numérique Citoyenne pour une Mobilité Sûre ».');
  if (FORBIDDEN_OLD_TITLE.test(content)) throw new Error('Graphie ancienne « Numérique et Citoyenne » interdite dans : ' + file + ' — le libellé officiel est « École Numérique Citoyenne pour une Mobilité Sûre ».');
}
const OFFICIAL_FULL_TITLE = 'École Numérique Citoyenne pour une Mobilité Sûre : MALI BOLIFEN KALANSO';
const indexTitle = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
if (!indexTitle.includes('<title>' + OFFICIAL_FULL_TITLE + '</title>') || !indexTitle.includes('id="brand-title">' + OFFICIAL_FULL_TITLE + '</h1>')) throw new Error('Le titre officiel exact doit être présent dans le titre HTML et le titre visible de l’accueil.');
if (!config.includes("countrySuffix: 'MALI BOLIFEN KALANSO'") || !countryProfile.includes("editionName:'MALI BOLIFEN KALANSO'")) throw new Error('La casse officielle MALI BOLIFEN KALANSO doit être cohérente dans la configuration et le profil national.');
if (manifest.name !== OFFICIAL_FULL_TITLE || manifest.short_name !== 'MALI BOLIFEN KALANSO') throw new Error('Le manifeste PWA doit utiliser le nom officiel exact.');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (packageJson.description !== OFFICIAL_FULL_TITLE) throw new Error('La description du package doit porter le nom officiel exact.');
console.log('Contrôles réussis : ' + (lessons + extraSigns) + ' panneaux, ' + bamakoCases + ' cas de Bamako, ' + nationalCases + ' cas nationaux, ' + goodPractices + ' bonnes conduites, quiz, PWA, profil national, sources officielles, constats OMS, galerie Bamako et nom officiel vérifié dans ' + scannedFiles + ' fichiers du dépôt.');
