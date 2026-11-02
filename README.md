# Mali Bolifen Kalanso

**École Numérique et Citoyenne pour une Mobilité Sûre : Mali Bolifen Kalanso** — outil pédagogique indépendant de sensibilisation et de préparation à la sécurité routière, conçu pour les téléphones modestes et les connexions irrégulières.

## Périmètre national
Le contenu doit être utile dans toutes les régions du Mali et dans le District de Bamako : centres urbains, périphéries, villages, marchés, abords d’écoles, routes interurbaines, axes ruraux, traversées d’animaux, chantiers, hivernage et déplacements nocturnes. Les huit exemples localisés à Bamako restent des cas particuliers parmi des situations nationales ; ils ne définissent pas à eux seuls le territoire couvert.

## Fonctionnalités réellement présentes
- 51 panneaux et repères pédagogiques, dont des schémas de signalisation originaux. Ils constituent un support d’apprentissage et non une reproduction certifiée de l’intégralité des panneaux officiels.
- Explications en français et lecture vocale via la synthèse vocale disponible sur l’appareil.
- Recherche, filtres par catégorie et favoris.
- Progression, favoris et résultats conservés localement sur l’appareil.
- Quiz d’entraînement avec corrections expliquées.
- 22 situations interactives : 8 exemples localisés à Bamako, 8 situations complémentaires couvrant des contextes urbains, villageois, ruraux et interurbains, en plus des situations déjà présentes dans le socle.
- 8 scènes immersives d’apprentissage et 8 engagements de bonnes conduites.
- Application web installable (PWA) et cache hors ligne après une première visite réussie.
- Interface responsive, navigation clavier et prise en compte de la préférence de réduction des animations.

## Limites fonctionnelles importantes
- Cette version est un outil pédagogique local : elle ne comporte pas encore de comptes candidats, d’inscription en ligne persistante, d’espace auto-école, de gestion multi-établissements, de comptes moniteurs, de calendrier de conduite, de stockage centralisé ni de synchronisation multi-appareils.
- Les données de progression sont stockées dans le navigateur de l’utilisateur. Elles ne sont pas visibles par une auto-école et peuvent être perdues si les données du navigateur sont effacées.
- Le choix de la langue bambara est un objectif de produit, mais la présente interface et les contenus ne constituent pas encore une traduction complète validée. La voix dépend des langues installées sur le téléphone ou l’ordinateur.
- Les illustrations SVG sont des schémas pédagogiques, pas des photographies de lieux maliens. Ne pas les présenter comme des scènes réelles de Bamako ou d’une autre région.
- Les 51 panneaux ne représentent pas la totalité du programme d’examen. Le contenu réglementaire, les catégories, les âges, les sanctions et les procédures doivent être vérifiés sur les textes officiels en vigueur et validés par des personnes compétentes au Mali.
- Une inscription numérique à une auto-école ne vaut ni inscription administrative à l’examen, ni autorisation de conduire, ni délivrance d’un permis.

## Priorités recommandées pour la version multi-auto-écoles
1. Valider le référentiel pédagogique national avec les autorités et formateurs habilités : textes sources, version, date d’effet, catégorie concernée et historique des corrections.
2. Ajouter un backend avec authentification et rôles (administrateur national, responsable d’auto-école, moniteur, candidat), séparation stricte des données par établissement et journal d’audit.
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
