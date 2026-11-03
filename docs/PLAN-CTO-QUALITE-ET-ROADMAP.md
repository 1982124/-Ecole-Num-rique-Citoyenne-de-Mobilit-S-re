# Plan CTO — fiabilisation et évolution de Mali Bolifenko Kalanso

> Document de pilotage. Il décrit les travaux à réaliser ; il ne prétend pas que les fonctions listées sont déjà implémentées.
> Périmètre initial : PWA statique existante, branche `main`. Aucun service payant, aucune migration de production et aucun changement d'architecture majeur dans cette phase.

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
- `npm test` et `npm run build` exécutent actuellement trois contrôles en chaîne : `scripts/check-build.js`, `scripts/check-bamanankan.js` et `scripts/check-pwa.js`.
- `check-build.js` vérifie les fichiers requis, la syntaxe JavaScript, des points d'ancrage pédagogiques, la configuration Vercel et certains contenus ; les deux contrôles complémentaires protègent les invariants du lexique/campagnes Bamanankan et les ressources du manifeste/service worker PWA.
- Ces contrôles sont statiques : ils ne remplacent pas les tests manuels dans un navigateur réel, sur téléphone, après installation et en mode avion.
- Le service worker utilise une liste de ressources statiques et un cache versionné. Le comportement hors ligne doit encore être vérifié dans un vrai navigateur après installation et sur téléphone.
- Le lexique `public/bamanankan-glossary.js` existe ; il distingue les formes marquées attestées des notions en attente. Le module `public/safe-mobility-campaigns.js` contient un parcours français/bamanankan dont les formulations sont signalées comme propositions à faire valider.
- Les progrès sont locaux au navigateur ; aucun compte ni synchronisation multi-appareils n'est établi.
- Les fonctions de gestion multi-auto-écoles, de suivi moniteur/candidat et de paiement ne sont pas disponibles.
- Les traductions Peul/Bamanankan proposées par le pipeline de la PR #12 sont un flux de brouillons à réviser, pas une traduction prête à publier.
- Le dépôt contient plusieurs PR ouvertes. Les PR #3, #11, #12 et #13 sont à examiner individuellement ; aucune ne doit être réputée fusionnée ni déployée sans vérification de son état et de ses contrôles.

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
- Les tests ne prétendent pas prouver la qualité linguistique ou juridique.

### P1 — Bamanankan et accessibilité vocale, sans régression

**Tâches**
- P1.1 Recenser précisément les écrans et questions déjà disponibles en Bamanankan.
- P1.2 Ajouter des tests de présence et de rendu pour les contenus BM existants.
- P1.3 Vérifier le choix de langue, le maintien du choix après navigation/rechargement et le retour au français.
- P1.4 Tester la synthèse vocale selon les voix réellement installées ; afficher clairement une solution de repli si aucune voix BM n'est disponible.
- P1.5 Constituer une liste de termes à valider par des locuteurs/enseignants ; conserver tons, ɛ/ɔ/ɲ/ŋ et variantes.
- P1.6 Traiter le Peul/Fulfulde comme un lot distinct, soumis à validation humaine avant diffusion.

**Critères d'acceptation**
- Aucun texte BM existant n'est supprimé ou remplacé par une traduction automatique non révisée.
- Une vérification de non-régression couvre les caractères Unicode et l'affichage sur mobile.
- L'application ne promet pas une voix hors ligne ou une voix Bamanankan si elle n'est pas détectée et testée sur l'appareil.
- Toute nouvelle traduction porte un statut explicite : brouillon, en révision ou validée, avec réviseur et date.

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
- Les limites audio hors ligne sont décrites honnêtement.

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
- Les contenus non confirmés sont explicitement signalés ou non publiés.
- Aucune présentation ne laisse croire que l'app délivre un permis ou vaut inscription administrative.

**Point de vigilance** : les documents institutionnels consultés peuvent annoncer des projets de réforme ou citer des textes anciens. Une annonce, un plan d'action ou un rapport secondaire ne suffit pas à prouver qu'une règle est entrée en vigueur. Vérifier le Journal officiel et les textes consolidés applicables avant publication.

### P4 — Renforcer l'apprentissage et la préparation à l'examen

**Tâches**
- P4.1 Auditer le nombre réel de questions actives, leur couverture par catégorie et leurs explications.
- P4.2 Concevoir une banque structurée avec identifiant stable, thème, catégorie, difficulté, langue, source et statut de validation.
- P4.3 Ajouter progressivement examens blancs chronométrés, revue des erreurs et progression par thème.
- P4.4 Étendre la banque par lots relus ; ne pas fixer un objectif de volume au détriment de la justesse.
- P4.5 Concevoir des scénarios réalistes couvrant Bamako, villes secondaires, villages, routes interurbaines, marchés, écoles, animaux, hivernage et nuit.

**Critères d'acceptation**
- Chaque question possède une réponse expliquée, une catégorie/thématique et un statut de validation.
- Les examens blancs sont reproductibles et ne modifient pas les données personnelles sans action de l'utilisateur.
- Les scénarios distinguent clairement schémas pédagogiques, illustrations générées et photographies documentaires.
- Le contenu ne se présente pas comme un examen officiel.

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

### P6 — Pilote terrain et préparation commerciale

**Tâches**
- P6.1 Organiser un pilote avec un petit groupe de candidats, moniteurs et partenaires au Mali.
- P6.2 Mesurer activation, complétion, erreurs fréquentes, rétention, réussite aux exercices et retours d'accessibilité.
- P6.3 Faire signer des accords pilotes et clarifier les responsabilités avant traitement de données réelles.
- P6.4 Définir les offres particuliers/auto-écoles/ONG/institutions seulement après validation du besoin et des coûts.
- P6.5 Ne pas activer paiement avant sécurisation du backend, support, conditions et politique de remboursement.

**Critères d'acceptation**
- Un rapport pilote anonymisé présente méthode, effectif, limites et résultats.
- Les tarifs sont basés sur des coûts observés et des retours clients, pas sur une estimation théorique seule.
- Aucune promesse de certification officielle ou de réussite à l'examen n'est faite.

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

## Ordre d'exécution et décisions de passage

1. **Lot 0 :** établir la base de référence et les tests de non-régression (P0).
2. **Lot 1 :** sécuriser Bamanankan et les parcours vocaux (P1).
3. **Lot 2 :** vérifier PWA/offline/mobile (P2).
4. **Lot 3 :** auditer et faire valider le référentiel malien (P3).
5. **Lot 4 :** enrichir la pédagogie avec contrôle qualité (P4).
6. **Lot 5 :** architecture multi-acteurs après décision coût/confidentialité (P5).
7. **Lot 6 :** pilote terrain et modèle économique (P6).

Une PR ne passe à l'étape suivante que si ses tests passent, si le diff est relu et si aucune régression n'est ouverte. Les PR existantes #11 et #12 doivent être examinées et comparées à ce plan avant fusion ; aucune fusion automatique n'est autorisée par ce document.

## Sources de référence à maintenir à jour

- Journal officiel du Mali / Secrétariat général du Gouvernement : https://sgg-mali.ml/
- Démarches administratives du Mali — obtention du permis : https://demarchesadministratives.gouv.ml/permis-de-conduire-obtention/
- ANASER : rechercher les publications et statistiques officielles les plus récentes auprès de l'agence.
- Toute source lexicographique Bamanankan reste une aide linguistique, pas une validation institutionnelle des termes routiers.

---
Dernière mise à jour : 3 novembre 2026 (état du dépôt vérifié après fusion des contrôles Bamanankan/PWA).