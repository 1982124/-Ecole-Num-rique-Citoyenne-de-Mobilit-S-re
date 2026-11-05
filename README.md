# Mali Bolifen Kalanso

**École Numérique Citoyenne pour une Mobilité Sûre : Mali Bolifen Kalanso** — outil pédagogique indépendant de sensibilisation et de préparation à la sécurité routière, conçu pour les téléphones modestes et les connexions irrégulières.

## Périmètre national
Le contenu doit être utile dans toutes les régions du Mali et dans le District de Bamako : centres urbains, périphéries, villages, marchés, abords d’écoles, routes interurbaines, axes ruraux, traversées d’animaux, chantiers, hivernage et déplacements nocturnes. Les huit exemples localisés à Bamako restent des cas particuliers parmi des situations nationales ; ils ne définissent pas à eux seuls le territoire couvert.

## Fonctionnalités réellement présentes
- 8 catégories de permis maliens (A1, A2, B1, B, C, D, E, F), avec âges minimaux et exigences médicales tels que repris du décret 2023-0509, article 90.
- 51 panneaux et repères pédagogiques, dont des schémas de signalisation originaux. Ils constituent un support d’apprentissage et non une reproduction certifiée de l’intégralité des panneaux officiels.
- Explications en français et lecture vocale via la synthèse vocale disponible sur l’appareil.
- Recherche, filtres par catégorie et favoris.
- Progression, favoris et résultats conservés localement sur l’appareil.
- Quiz d’entraînement avec corrections expliquées.
- 22 situations interactives : 8 exemples localisés à Bamako, 8 situations complémentaires couvrant des contextes urbains, villageois, ruraux et interurbains, en plus des situations déjà présentes dans le socle.
- 8 scènes immersives d’apprentissage et 8 engagements de bonnes conduites.
- **Profil national Mali** (identification, langues, autorités, garde-fous de validation) dans `public/country-profile.js`.
- **Rubrique Sources officielles** (DGT, SGG, loi n° 2023-045, décret 2023-0509) dans `public/official-sources.js`.
- **Constats OMS sourcés** (225 482 décès routiers estimés dans la Région africaine en 2021, 19 % du fardeau mondial, +17 % depuis 2010) dans `public/who-road-facts.js` — données régionales, explicitement distinctes de statistiques nationales maliennes.
- **Galerie « Immersion à Bamako »** : 7 photographies réelles de Wikimedia Commons avec licence liée à chaque image, dans `public/bamako-gallery.js`.
- Application web installable (PWA) et cache hors ligne après une première visite réussie.
- Interface responsive, navigation clavier et prise en compte de la préférence de réduction des animations.

## Limites fonctionnelles importantes
- Cette version est un outil pédagogique local : elle ne comporte pas encore de comptes candidats, d’inscription en ligne persistante, d’espace auto-école, de gestion multi-établissements, de comptes moniteurs, de calendrier de conduite, de stockage centralisé ni de synchronisation multi-appareils.
- Les données de progression sont stockées dans le navigateur de l’utilisateur. Elles ne sont pas visibles par une auto-école et peuvent être perdues si les données du navigateur sont effacées.
- Le choix de la langue bambara est un objectif de produit, mais la présente interface et les contenus ne constituent pas encore une traduction complète validée. La voix dépend des langues installées sur le téléphone ou l’ordinateur.
- Les illustrations SVG sont des schémas pédagogiques, pas des photographies de lieux maliens. Ne pas les présenter comme des scènes réelles de Bamako ou d’une autre région. Les photographies de la galerie sont des supports d’observation et non des preuves réglementaires.
- Les 51 panneaux ne représentent pas la totalité du programme d’examen. Le contenu réglementaire, les catégories, les âges, les sanctions et les procédures doivent être vérifiés sur les textes officiels en vigueur et validés par des personnes compétentes au Mali.
- Une inscription numérique à une auto-école ne vaut ni inscription administrative à l’examen, ni autorisation de conduire, ni délivrance d’un permis.

## Priorités recommandées pour la version multi-auto-écoles
1. Valider le référentiel pédagogique national avec les autorités et formateurs habilités : textes sources, version, date d’effet, catégorie concernée et historique des corrections.
2. Ajouter un backend avec authentification et rôles (administrateur national, responsable d’auto-école, moniteur, candidat), séparation strurcturelle des données par établissement et journal d’audit.
3. Créer les dossiers candidats avec consentement, pièces strictement nécessaires, statut, catégorie demandée, suivi de formation et export contrôlé.
4. Ajouter la gestion des moniteurs, séances, présences, évaluations et notifications, sans prétendre remplacer les démarches officielles.
5. Mettre en place synchronisation hors ligne, sauvegardes, export/suppression des données, politique de confidentialité et protection des mineurs.
6. Tester en navigateur réel sur petits téléphones, réseau lent, mode hors ligne, lecteur d’écran et navigateurs courants avant toute mise en production.

## Développement local
Prérequis : Node.js 18 ou plus.

```bash
npm test
npm start
```

Puis ouvrir http://localhost:3001.

## Déploiement Vercel
Le site est servi comme application statique depuis le dossier public. Le serveur local sert uniquement à la prévisualisation. Cette version pédagogique n’a pas besoin d’un serveur temps réel ni d’une base de données pour ses fonctions actuelles. En revanche, les fonctions multi-auto-écoles et les inscriptions à distance nécessiteront un backend sécurisé et une politique de gestion des données.

## Avertissement
Les contenus sont des supports pédagogiques de sensibilisation et ne remplacent ni le Code de la route ni les instructions des autorités compétentes au Mali. Aucun certificat de cette application ne doit être présenté comme un permis ou une certification officielle sans habilitation explicite.

## Parcours particuliers et ONG
- Un particulier peut consulter le parcours de découverte gratuit et préparer une demande d’accès au futur abonnement individuel accompagné.
- Les ONG, associations et collectivités disposent de deux modèles de programmes de sensibilisation (local et multi-sites), à adapter aux publics et aux zones d’intervention.
- Le formulaire actuel prépare un résumé téléchargeable ou copiable sur l’appareil. Il ne transmet pas encore la demande à un serveur : aucun abonnement payant, compte ou paiement n’est activé. L’activation réelle nécessite authentification, base de données, gestion des consentements et intégration d’un moyen de paiement choisi par le projet.

## Dictionnaire français–bamanankan de la mobilité
- Un premier lexique interactif distingue les formes relevées dans des sources lexicographiques des notions techniques dont la traduction reste à construire.
- Les formes attestées renvoient à Bamadaba ; les notions telles que sécurité routière, code de la route, conducteur, piéton, casque, ceinture, panneau, priorité et freinage restent volontairement sans traduction jusqu’à validation.
- Le Bamanankan est une langue tonale : les tons, caractères ɛ/ɔ/ɲ/ŋ, variantes et exemples doivent être préservés. Une traduction approfondie des leçons, quiz, sanctions et situations doit être réalisée et relue par des locuteurs compétents avant publication.
- Référence principale : https://www.mali-pense.net/bm/lexicon/index.htm (Bamadaba, version de travail décembre 2025, explicitement non officielle). Ressource complémentaire : https://dictionary.ankataa.com/.

## Architecture de duplication nationale — modèle Afrique

Cette application est le **pilote malien** et le socle de référence pour créer des éditions nationales indépendantes. Il ne suffit pas de remplacer le drapeau ou le nom : chaque édition doit avoir son propre contenu national validé.

### Socle commun à conserver
- navigation, composants pédagogiques, quiz, progression locale et accessibilité ;
- fonctionnement PWA, cache hors ligne, responsive et contrôles de qualité ;
- structure des leçons, scénarios, panneaux, quiz, bonnes pratiques et références ;
- principes de protection des données et d’avertissement pédagogique.

### Profil national à remplacer
`public/country-profile.js` définit le code ISO, le nom, les langues, la devise, les couleurs, les autorités, les sources, les lieux, les contextes routiers et les exigences de validation. `public/config.js` sélectionne le profil actif.

### Pack national obligatoire
1. textes légaux, règles, permis, sanctions et procédures avec articles, dates d’effet et historique ;
2. panneaux et quiz conformes au référentiel national ;
3. langues nationales et traductions relues par des locuteurs compétents ;
4. scénarios réalistes propres aux villes, campagnes, routes et usages du pays ;
5. photographies locales authentiques, dignes et sous licences vérifiées ;
6. contacts d’urgence confirmés par les autorités.

### Garde-fous
- ne jamais présenter une statistique OMS régionale comme une statistique nationale ;
- ne jamais copier les règles d’un pays vers un autre ;
- ne jamais légender une image générique comme locale ;
- marquer les sources, images et traductions non vérifiées « à valider » ;
- faire passer les tests et une revue humaine nationale avant publication.

### Procédure de duplication
1. Dupliquer le dépôt dans un dépôt distinct.
2. Remplacer le profil et les packs nationaux ; conserver le socle commun.
3. Exécuter `npm test`, puis tester sur mobile et hors ligne.
4. Faire valider le contenu par des spécialistes et autorités du pays.
5. Créer un projet Vercel distinct et vérifier l’aperçu avant publication.

**État actuel :** le profil malien est initialisé et la procédure de duplication documentée. Les contenus pédagogiques existants restent maliens : ils ne sont pas automatiquement adaptés à un autre pays. Toute nouvelle édition exige son pack national complet.
