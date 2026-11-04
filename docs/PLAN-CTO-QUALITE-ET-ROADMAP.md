# Plan CTO — fiabilisation et évolution de Mali BOLIFEN KALANSO

> Document de pilotage. Il décrit les travaux à réaliser ; il ne prétend pas que les fonctions listées sont déjà implémentées.
> Périmètre initial : PWA statique existante, branche `main`. Aucun service payant, aucune migration de production et aucun changement d'architecture majeur dans cette phase.

## Nom officiel du projet (invariant non négociable)

Le nom officiel est **« Mali BOLIFEN KALANSO »**. Toute autre graphie du nom — en particulier l'ancienne, qui diffère par les lettres finales du premier mot — est interdite définitivement dans tout le dépôt : code, documentation, manifeste PWA, messages de commit et noms de fichiers. Le contrôle qualité `scripts/check-build.js` balaie l'intégralité des fichiers texte du dépôt à chaque exécution et fait échouer la CI si une graphie alternative réapparaît, quel que soit le fichier. Ce verrou ne peut être retiré que par une décision CTO explicite consignée dans ce document.

## Architecture fonctionnelle cible (décision CTO — adoptée le 4 novembre 2026)

> Décision : l'application doit devenir une véritable **école numérique de mobilité sûre**, et non une simple accumulation de panneaux, quiz et informations. Principe directeur : chaque apprenant doit pouvoir **comprendre une règle, la voir dans une situation réelle de circulation au Mali, s'entraîner, corriger ses erreurs et mesurer ses progrès** — même s'il lit difficilement ou dispose d'une connexion limitée. Priorité : simplicité à l'écran, profondeur dans les contenus, progression visible.

### Les six espaces de navigation cibles

La navigation principale sera limitée à **six espaces**, alimentés par les modules existants (migration progressive, aucun module détruit) :

| # | Espace | Contenu regroupé | Rôle |
|---|---|---|---|
| 01 | **ACCUEIL** | Présentation, message canonique et sensibilisation OMS, bouton « Reprendre mon apprentissage », progression personnelle, accès rapides | Porte d'entrée et tableau de bord de l'apprenant |
| 02 | **APPRENDRE** | Code et réglementation, panneaux et signalisation, catégories de permis, conduite préventive, sécurité des usagers vulnérables, vérifications du véhicule, gestes de l'agent de la circulation | École théorique, par niveaux et thèmes |
| 03 | **S'ENTRAÎNER** | Quiz par thème, questions aléatoires, examens blancs chronométrés, corrections expliquées, révision automatique des erreurs, préparation par catégorie de permis | Préparation progressive aux examens |
| 04 | **CAS PRATIQUES** | Circulation à Bamako (Hamdallaye, rond-points, dépassements, moto, pluie, piétons, agents) — le cœur immersif distinctif | Immersion, situations réelles maliennes |
| 05 | **MA PROGRESSION** | Leçons terminées, résultats, points forts et difficultés, historique, objectifs et recommandations, engagements de bonne conduite | L'apprenant sait où il en est |
| 06 | **RESSOURCES** | Textes officiels, sources institutionnelles, glossaire français–bamanankan, conseils de sécurité, numéros d'urgence, hors connexion et accessibilité | Bibliothèque de référence et outils pratiques |

### Méthode pédagogique transversale

Chaque situation immersive suit : **VOIR → ÉCOUTER → COMPRENDRE → CHOISIR → AGIR → RÉPÉTER.**
Parcours d'apprentissage en sept étapes : **Découvrir → Apprendre → Reconnaître → S'entraîner → Pratiquer → Évaluer → Adopter.**
Exigence : réussir un quiz ne suffit pas — l'apprenant doit pouvoir **expliquer pourquoi** une réponse est correcte et **reconnaître le danger** dans une situation concrète.

### Écran d'accueil cible

Ordre exact retenu : (1) titre « MALI BOLIFEN KALANSO » et devise « La route s'apprend par les yeux et par l'oreille » ; (2) boutons « 🔊 Écouter le message » et « 🚗 Démarrer les cas pratiques » ; (3) « Reprendre mon apprentissage » et progression réelle de l'apprenant ; (4) bloc OMS **à l'emplacement déjà retenu** (225 482 décès en Région africaine 2021, 19 % des décès mondiaux — chiffres régionaux clairement distingués des statistiques nationales maliennes, source OMS Afrique 2023) ; (5) messages « Un casque pour chaque tête » et « Un message peut attendre. Une vie ne se remplace pas » ; (6) accès directs : Apprendre / S'entraîner / Pratiquer / Progresser. La progression affichée doit être alimentée par les **données réelles** de l'apprenant, jamais décorative.

### Taxonomie des contenus (obligatoire)

Tout contenu affiché appartient à l'une de ces trois catégories, toujours étiquetée :
1. **Règles officielles** — textes et prescriptions vérifiés auprès des sources compétentes au Mali.
2. **Enseignements pédagogiques** — explications simplifiées pour faciliter la comprévension.
3. **Conseils de prévention** — recommandations de sécurité, clairement identifiées comme telles.

L'application prépare à la conduite et à la mobilité sûre ; elle ne délivre pas elle-même de permis officiel.

### Sept différenciateurs à concentrer

| Différenciateur | Mise en place |
|---|---|
| Immersion malienne | Scènes réalistes de Bamako : véhicules, visages, carrefours et panneaux locaux |
| Apprentissage audio | Lecture des leçons, consignes et corrections |
| Accessibilité | Gros caractères, commandes simples, peu de texte à l'écran |
| Bamanankan | Traductions validées progressivement, jamais approximatives |
| Mode hors connexion | Leçons, quiz et ressources essentielles sans Internet |
| Intelligence pédagogique | Révisions adaptées aux erreurs et difficultés |
| Références officielles | Sources maliennes vérifiables, dates de mise à jour, distinction règle officielle / conseil pédagogique |

### Feuille de route d'exécution de l'architecture (P1–P7, dans cet ordre)

| Priorité | Chantier | Résultat attendu |
|---|---|---|
| P1 | Accueil et navigation | Une architecture claire et cohérente en six espaces |
| P2 | Parcours d'apprentissage | Progression logique entre les leçons (les 7 étapes) |
| P3 | Examens et corrections | Préparation au permis plus efficace |
| P4 | Cas pratiques immersifs | Expériences réalistes propres au Mali |
| P5 | Audio, Bamanankan, accessibilité | Application plus inclusive |
| P6 | Sources officielles et ressources | Informations fiables et actualisables |
| P7 | Suivi des apprenants | Progression conservée et exploitable |

Règle technique de chaque évolution : préserver les fonctionnalités acquises. Tests avant modification, tests après, vérification mobile, contrôle hors connexion, contrôle du déploiement réel. Pas de fusion d'une branche risquée uniquement parce qu'elle contient de nouvelles fonctionnalités. Une mise à jour GitHub n'est pas une mise à jour de production tant que le déploiement n'est pas confirmé.

### Interdits architecturaux (non négociables)

- Transformer l'accueil en catalogue interminable.
- Multiplier menus et sous-menus.
- Remplacer les images maliennes par des illustrations génériques.
- Réutiliser une même image pour plusieurs scènes distinctes.
- Sacrifier le mode hors connexion.
- Publier des traductions Bamanankan non validées.
- Présenter des données africaines comme statistiques nationales du Mali.
- Ajouter un service payant sans autorisation explicite du porteur du projet.
- Considérer une mise à jour GitHub comme production tant que le déploiement n'est pas confirmé.

### Stratégie de migration (Strangler Fig, progressive)

Décision CTO : cette architecture est la **cible fonctionnelle** ; l'application actuelle n'est pas remplacée brutalement. Étapes :
1. **Cartographier** les écrans et fonctionnalités existants (onglets actuels → espaces cibles).
2. **Regrouper** la navigation par espaces, sans détruire aucun module ni donnée de progression.
3. **Compléter** chaque espace avec les contenus manquants (par lot, avec CI verte à chaque étape).
4. **Étiqueter** tous les contenus selon la taxonomie à trois catégories.
5. **Alimenter** l'accueil avec la progression réelle de l'apprenant.

## Principes non négociables

1. **Préserver l'existant** : aucune réécriture globale, aucun remplacement de la PWA par Flutter/React Native/Next.js.
2. **Bamanankan protégé** : ne pas supprimer ni écraser les traductions et le lexique déjà présents. Tester les parcours actuels avant toute modification linguistique. Les formulations de travail ne deviennent pas « validées » sans relecture par des locuteurs compétents.
3. **Mali uniquement** : les règles, catégories, exemples et sanctions doivent être sourcés pour le Mali. Les exemples de Bamako complètent un contenu national, ils ne le remplacent pas.
4. **Aucune fausse promesse** : l'application est pédagogique ; elle ne délivre pas de permis, ne remplace pas l'auto-école ni les démarches administratives.
5. **Coût zéro par défaut** : ne pas créer de projet payant, activer de service facturé, consommer d'API payante ou ajouter de dépendance payante sans accord explicite.
6. **Changements isolés** : une branche et une PR par lot cohérent ; revue du diff, tests, puis décision humaine avant fusion et déploiement.
7. **Confidentialité** : pas de collecte de données personnelles avant définition des finalités, consentements, durée de conservation, sécurité et procédure de suppression.

## État de départ connu

- Application web statique servie depuis `public/`, installable comme PWA.
- `npm test` et `npm run build` exécutent trois contrôles en chaîne : `scripts/check-build.js`, `scripts/check-bamanankan.js` et `scripts/check-pwa.js`.
- Ces contrôles sont statiques : ils ne remplacent pas les tests manuels dans un navigateur réel, sur téléphone, après installation et en mode avion.
- Le service worker utilise une liste de ressources statiques et un cache versionné (v16). Le comportement hors ligne doit être vérifié dans un vrai navigateur après installation et sur téléphone.
- Le lexique `public/bamanankan-glossary.js` existe ; il distingue les formes attestées des notions en attente. Le module `public/safe-mobility-campaigns.js` contient un parcours français/bamanankan dont les formulations sont signalées comme propositions à faire valider.
- Les progrès sont locaux au navigateur ; aucun compte ni synchronisation multi-appareils n'est établi.
- Les fonctions de gestion multi-auto-écoles, de suivi moniteur/candidat et de paiement ne sont pas disponibles.
- Modules injectés progressivement sur `main` : profil national, sources officielles, constats OMS, galerie Bamako, examen blanc chronométré, familles de panneaux complémentaires, accueil canonique, photo hero de Bamako, parcours narratif « Une journée à Bamako », 75 panneaux, ~90 questions d'entraînement, voix off française (accueil, parcours, leçons), audio Bamanankan différé avec décision documentée.
- PR historiques (#3, #11, #12, #13) : examinées et closes ou intégrées via consolidation ; aucune ne reste fusionnable en l'état.

## Priorités et lots de travail

### P0 — Cartographier les parcours et verrouiller les non-régressions

**Tâches**
- P0.1 Établir l'inventaire des écrans, modules, données, scripts et ressources réellement chargés.
- P0.2 Ajouter des tests de contrat sur les fonctions clés : navigation, leçons, quiz, scénarios, favoris, progression locale, dictionnaire Bamanankan, campagnes FR/BM, programmes et PWA.
- P0.3 Tester le chargement et les erreurs JavaScript des modules dans un navigateur réel.
- P0.4 Définir une procédure de test manuel sur petits écrans et réseau lent.

**Critères d'acceptation**
- Chaque fonctionnalité existante a un test automatisé ou une procédure manuelle explicite.
- Le test échoue si un module essentiel disparaît du HTML ou du cache PWA.
- Les entrées Bamanankan existantes, leurs identifiants, caractères et statuts sont conservés.

### P1 — Accueil et navigation en six espaces + langues et voix

**Tâches**
- P1.A.1 Cartographier chaque onglet existant vers son espace cible (table de correspondance complète).
- P1.A.2 Regrouper la barre d'onglets actuelle en six espaces, sans supprimer aucun module ni donnée.
- P1.A.3 Ajouter le bouton « Reprendre mon apprentissage » alimenté par la progression réelle.
- P1.A.4 Conserver le bloc OMS à son emplacement retenu (après la progression, avant la navigation).
- P1.A.5 Vérifier 360/375/390 px : chaque espace accessible en deux gestes maximum.
- P1.1 Recenser précisément les écrans et questions déjà disponibles en Bamanankan.
- P1.2 Ajouter des tests de présence et de rendu pour les contenus BM existants.
- P1.3 Vérifier le choix de langue, son maintien après navigation/rechargement et le retour au français.
- P1.4 Tester la synthèse vocale française selon les voix réellement installées ; afficher une solution de repli si aucune voix n'est disponible.
- P1.5 Constituer une liste de termes à valider par des locuteurs/enseignants ; conserver tons, ɛ/ɔ/ɲ/ŋ et variantes.
- P1.6 Traiter le Peul/Fulfulde comme un lot distinct, soumis à validation humaine avant diffusion.
- P1.7 Audio Bamanankan : statut « fonctionnalité à venir » (aucune voix bambara fiable en navigateur aujourd'hui). Chemins documentés : (a) MALIBA-AI TTS open source sur HuggingFace (MOS 4,2/5, 10 locuteurs, licence CC BY-NC-SA non commerciale — incompatible avec un rachat commercial sans renégociation) ; (b) Kooma.ai (malien, 40+ voix, forfait découverte puis payant — accord du porteur requis) ; (c) DJELIA (API bambara/dioula, payante). **Recommandation CTO** : enregistrements humains par locuteurs/radios maliennes pour le lot pilote (accueil + 10 scènes) — coût zéro, tons justes, droits possédés, compatible rachat ; TTS à réévaluer tous les 6 mois.

**Critères d'acceptation**
- Aucun module existant n'est retiré ni inaccessible lors du regroupement.
- La progression locale persiste après la réorganisation ; l'accueil affiche la progression réelle.
- Aucun texte BM existant n'est supprimé ou remplacé par une traduction automatique non révisée.
- Toute nouvelle traduction porte un statut explicite : brouillon, en révision ou validée, avec réviseur et date.
- L'application n'affiche jamais l'audio Bamanankan comme disponible tant qu'il n'est pas réellement testé sur appareil.

### P2 — Fiabilité PWA et usage hors ligne

**Tâches**
- P2.1 Vérifier que toutes les ressources essentielles sont mises en cache et que les chemins réels correspondent aux entrées du service worker.
- P2.2 Tester première visite en ligne, installation, redémarrage, mode avion, mise à jour du cache et retour en ligne.
- P2.3 Vérifier les mises à jour du service worker sans perdre les données locales.
- P2.4 Tester au minimum des largeurs 360/375/390/768/1024/1440 px, clavier et zoom.
- P2.5 Mesurer poids initial, temps de chargement et comportement sur réseau lent.

**Critères d'acceptation**
- Le parcours pédagogique principal reste utilisable après une première visite réussie et un redémarrage hors ligne.
- Aucun cache obsolète ne bloque une nouvelle version ; la stratégie de mise à jour est documentée.
- Aucune donnée locale utilisateur n'est effacée lors d'une mise à jour du cache.
- Aucun débordement horizontal sur les tailles ciblées ; commandes principales utilisables au clavier.

### P3 — Référentiel juridique et pédagogique Mali

**Tâches**
- P3.1 Créer un registre des sources : URL/document, institution, date, version, article/page, date de consultation et responsable de validation.
- P3.2 Vérifier chaque catégorie de permis, âge, condition médicale, vitesse, alcoolémie, sanction, numéro d'urgence et procédure contre le texte malien en vigueur.
- P3.3 Identifier les contenus périmés, ambigus ou non sourcés ; les corriger ou les masquer jusqu'à validation.
- P3.4 Faire relire les questions et explications par au moins un formateur/moniteur qualifié et un relecteur juridique compétent.
- P3.5 Ajouter date de révision et avertissement pédagogique sur les contenus réglementaires.

**Critères d'acceptation**
- Chaque affirmation réglementaire affichée possède une source primaire identifiable et une date de vérification.
- Aucune règle d'un autre pays n'est importée comme règle malienne.
- Les sanctions et statistiques datées portent leur période et leur source.
- Aucune présentation ne laisse croire que l'app délivre un permis ou vaut inscription administrative.

**Point de vigilance** : une annonce, un plan d'action ou un rapport secondaire ne suffit pas à prouver qu'une règle est entrée en vigueur. Vérifier le Journal officiel et les textes consolidés applicables avant publication.

### P4 — Renforcer l'apprentissage et la préparation à l'examen

**Tâches**
- P4.1 Auditer le nombre réel de questions actives, leur couverture par thème et leurs explications.
- P4.2 Concevoir une banque structurée avec identifiant stable, thème, catégorie, difficulté, langue, source et statut de validation.
- P4.3 Ajouter progressivement examens blancs chronométrés, revue des erreurs et progression par thème.
- P4.4 Étendre la banque par lots relus ; ne pas fixer un objectif de volume au détriment de la justesse.
- P4.5 Concevoir des scénarios réalistes couvrant Bamako, villes secondaires, villages, routes interurbaines, marchés, écoles, animaux, hivernage et nuit.

**Critères d'acceptation**
- Chaque question possède une réponse expliquée, une catégorie/thématique et un statut de validation.
- Les examens blancs sont reproductibles et ne modifient pas les données personnelles sans action de l'utilisateur.
- Le contenu ne se présente jamais comme un examen officiel.

### P5 — Architecture et plateforme multi-acteurs (après validation P0–P4)

**Tâches**
- P5.1 Rédiger un modèle de données et un schéma de rôles avant de choisir/créer le backend.
- P5.2 Définir séparation des données par auto-école, droits minimaux, journal d'audit, sauvegardes et export/suppression.
- P5.3 Prototyper l'authentification et la synchronisation sur environnement de test uniquement.
- P5.4 Concevoir les espaces candidat, moniteur, responsable d'auto-école et administrateur.
- P5.5 Ajouter séances, présences, évaluations et rapports après validation du modèle.
- P5.6 Évaluer le coût total et les limites des offres gratuites avant tout choix fournisseur.

**Critères d'acceptation**
- Tests d'accès démontrent qu'un établissement ne peut pas lire les dossiers d'un autre.
- Les permissions sont vérifiées côté serveur, jamais uniquement dans l'interface.
- Consentement, durée de conservation, export et suppression sont spécifiés.
- Aucun projet cloud ou service payant n'est créé sans accord explicite.
- La PWA de base reste utilisable sans compte.

### P6 — Stratégie de monétisation (décision CTO du 4 novembre 2026) et pilote terrain

> Décision : « coût zéro par défaut » est une règle **d'exploitation** (aucune dépense sans accord), pas un engagement que l'application reste gratuite pour les citoyens. Le cœur pédagogique citoyen reste **gratuit, hors ligne et sans compte — de façon permanente** : c'est le produit d'appel public et l'argument de rachat institutionnel. La monétisation vise les **organisations** (institutions, auto-écoles, ONG, sponsors), jamais une barrière devant l'apprenant.

**Modèles autorisés, par ordre de priorité**

| Priorité | Modèle | Qui paie | Montant indicatif | Prérequis |
|---|---|---|---|---|
| 1 | **Licence institutionnelle (B2G)** | Ministères, DGT, ANASER, communes | Licence annuelle sur devis | Pilote mesuré + rapport de données + conformité P3 |
| 2 | **Abonnement auto-écoles (B2B)** | Établissements (suivi moniteur/candidat, rapports) | Abonnement mensuel par établissement | Backend P5 sécurisé + support défini |
| 3 | **Conventions programmes (B2B)** | ONG, fondations, entreprises de transport | Sur devis (personnalisation, rapports d'impact) | Accord signé, périmètre écrit |
| 4 | **Parrainage de campagnes** | Assurances, télécoms, pétroliers | Sponsor d'un module ou d'une campagne | Audience mesurée ; aucune influence éditoriale sur les contenus de sécurité |
| 5 | **Freemium citoyen** | Candidat souhaitant des fonctions avancées | 500–2 000 F CFA/mois via paiement mobile | Backend sécurisé, CGU, support, remboursement — **en dernier seulement** |
| — | Publicité tiers | Annonceurs | — | ❌ **Modèle interdit** : incompatible avec la mission de sécurité |

**Séquence de passage (seuils obligatoires)**

1. **Gratuit citoyen** (permanent) → adoption et données d'usage locales.
2. → **Pilote mesuré** (2-3 écoles de Bamako ; activation, complétion, réussite, rétention) : condition d'entrée = protocole écrit, consentements, anonymisation.
3. → **Rapport de données anonymisé** : condition d'entrée = pilote terminé avec effectif et limites documentés.
4. → **Contrats B2G/B2B** : condition d'entrée = rapport remis + référentiel P3 validé + engagement de maintenance écrit.
5. → **Backend multi-acteurs (P5)** : condition d'entrée = **au moins un contrat signé** le justifiant (jamais de backend spéculatif).
6. → **Freemium citoyen** : condition d'entrée = backend en production, paiements mobiles intégrés, CGU/remboursement publiées, support assuré — et seulement si un besoin citoyen réel est démontré.

**Règles de la monétisation**
- Aucun contenu de sécurité ne devient jamais payant pour un citoyen malien.
- Le parrainage n'achète aucune influence sur les contenus pédagogiques ni les corrections.
- Chaque offre institutionnelle inclut la gratuité citoyenne comme clause : l'État finance l'accès public, il ne paie pas un péage.
- Tout chiffre présenté dans une négociation est sourcé et daté (règle P3).
- Le freemium n'est activé qu'après décision écrite du porteur, avec seuils de révocation définis.

**Tâches**
- P6.1 Organiser un pilote avec un petit groupe de candidats, moniteurs et partenaires au Mali.
- P6.2 Mesurer activation, complétion, erreurs fréquentes, rétention, réussite aux exercices et retours d'accessibilité.
- P6.3 Faire signer des accords pilotes et clarifier les responsabilités avant traitement de données réelles.
- P6.4 Définir les offres (particuliers/auto-écoles/ONG/institutions) sur la base du rapport pilote, jamais d'estimations théoriques seules.
- P6.5 Ne pas activer le paiement avant sécurisation du backend, support, conditions et politique de remboursement.
- P6.6 Produire le one-pager institutionnel et le tenir à jour à chaque fusion majeure.

**Critères d'acceptation**
- Un rapport pilote anonymisé présente méthode, effectif, limites et résultats.
- Les tarifs sont basés sur des coûts observés et des retours clients, pas sur une estimation théorique seule.
- Aucune promesse de certification officielle ou de réussite à l'examen n'est faite.
- La gratuité citoyenne est contractuellement garantie dans chaque offre.

### P7 — Sources officielles et suivi des apprenants

**Tâches**
- P7.1 Maintenir le registre des sources à jour à chaque évolution réglementaire.
- P7.2 Conserver la progression locale de l'apprenant comme donnée personnelle minimale, exportable et supprimable.
- P7.3 Documenter publiquement ce qui est collecté (rien, à ce jour) et ce qui le serait après backend.

## Matrice minimale anti-régression à exécuter pour chaque PR

| Domaine | Contrôle obligatoire | Bloquant si échec |
|---|---|---|
| Build | `npm test` et `npm run build` | Oui |
| JavaScript | Syntaxe de tous les scripts chargés | Oui |
| Navigation | Accès aux rubriques principales et retour | Oui |
| Quiz | Réponse, correction, score et reprise | Oui |
| Scénarios | Choix, explication et navigation suivante | Oui |
| Bamanankan | Présence, caractères, changement de langue et retour FR | Oui |
| Lexique | Entrées attestées/pending et liens sources | Oui |
| Progression | Persistance locale après rechargement | Oui |
| PWA | Installation, cache, mode avion après première visite | Oui avant release |
| Mobile | 360/375/390 px sans débordement | Oui avant release |
| Accessibilité | Clavier, focus visible, zoom, réduction animations | Oui avant release |
| Juridique | Source primaire et date pour chaque règle | Oui pour publier le contenu concerné |
| Marque | Graphie alternative du nom interdite dans tout fichier du dépôt | Oui (verrou définitif) |
| Architecture | Aucun module retiré ni inaccessible lors d'un regroupement d'espaces | Oui |
| Monétisation | Aucun péage devant un contenu de sécurité citoyen ; aucun paiement sans backend sécurisé et CGU | Oui |

## Ordre d'exécution et décisions de passage

1. **Lot 0 :** base de référence et tests de non-régression (P0).
2. **Lot 1 :** accueil et navigation en six espaces, langues et voix (P1).
3. **Lot 2 :** PWA/offline/mobile (P2).
4. **Lot 3 :** référentiel malien validé (P3).
5. **Lot 4 :** pédagogie enrichie avec contrôle qualité (P4).
6. **Lot 5 :** architecture multi-acteurs — **uniquement après un premier contrat signé** (P5).
7. **Lot 6 :** pilote terrain, rapport de données, offres commerciales (P6).
8. **Lot 7 :** sources et suivi (P7).

Une PR ne passe à l'étape suivante que si ses tests passent, si le diff est relu et si aucune régression n'est ouverte. Aucune fusion automatique n'est autorisée par ce document.

## Sources de référence à maintenir à jour

- Journal officiel du Mali / Secrétariat général du Gouvernement : https://sgg-mali.ml/
- Démarches administratives du Mali — obtention du permis : https://demarchesadministratives.gouv.ml/permis-de-conduire-obtention/
- OMS — Rapport sur la sécurité routière dans la Région africaine, 2023 : https://afro.who.int/
- ANASER : publications et statistiques officielles les plus récentes.
- Toute source lexicographique Bamanankan reste une aide linguistique, pas une validation institutionnelle des termes routiers.

---
Dernière mise à jour : 4 novembre 2026, seconde révision (stratégie de monétisation consignée en P6 : gratuité citoyenne permanente, 5 modèles autorisés par priorité, seuils de passage obligatoires entre étapes, publicité interdite ; audio Bamanankan différé avec chemins documentés ; one-pager institutionnel livré hors dépôt).