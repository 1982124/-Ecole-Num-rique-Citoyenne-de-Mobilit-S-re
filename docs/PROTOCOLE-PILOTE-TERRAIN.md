# Protocole de pilote terrain — Mali BOLIFEN KALANSO

> Document opérationnel P6.1–P6.3 du plan CTO (version du 4 novembre 2026).
> Objectif : produire la **preuve par les données** — un rapport d'usage anonymisé qui fonde les premières offres B2G/B2B (seuils de passage de la stratégie de monétisation).
> Statut : à signer avec les partenaires avant tout traitement de données réelles (P6.3). Tant que ce document n'est pas signé, aucune collecte ne démarre.

## 0. Cadre et principes

- **Finalité unique** : mesurer l'efficacité pédagogique et l'usage réel de l'application auprès de candidats au permis encadrés par des auto-écoles partenaires à Bamako.
- **Principes du plan CTO applicables** : coût zéro (aucun outil payant), confidentialité (données minimales, anonymisation), aucune promesse de réussite à l'examen, aucune certification officielle.
- **Durée** : 4 semaines (28 jours) par cohorte.
- **Effectif cible** : 30 à 60 candidats, 2 à 3 auto-écoles partenaires.
- **Matériel** : téléphones Android entrée de gamme (le public cible réel) fournis par les participants eux-mêmes ou prêtés par l'auto-école ; l'application est installable depuis le navigateur, aucune installation d'application payante.

## 1. Partenaires et rôles

| Rôle | Responsabilité |
|---|---|
| **Porteur du projet** | Conception du protocole, coordination, agrégation des données, rapport final |
| **Auto-école partenaire** | Recrutement des candidats, local d'accueil, moniteur référent, respect du protocole |
| **Moniteur référent** | Animation des sessions hebdomadaires, observations de terrain consignées |
| **Candidat participant** | Usage de l'application, consentement éclairé, retours d'expérience |

## 2. Méthodologie

### 2.1 Recrutement
- Candidats en préparation au code, recrutés par les auto-écoles partenaires sur volontariat.
- Critères : 18 ans et plus, préparation du permis B (ou A pour un sous-groupe de 10 maximum), accès à un téléphone Android, consentement signé.
- Aucune discrimination : le refus de participer n'affecte en rien la préparation au permis auprès de l'auto-école.

### 2.2 Séquençage (4 semaines)

| Semaine | Activité | Mesure |
|---|---|---|
| S0 (jour 0) | Session d'installation collective : installation PWA sur téléphone personnel, premier parcours guidé (accueil → leçon → quiz), collecte du consentement | M0 : état initial (score de diagnostic au quiz d'entrée, auto-évaluation de lecture) |
| S1 | Usage libre ; thème « signalisation » ; le moniteur répond aux questions | M1 : score quiz signalisation, leçons terminées |
| S2 | Thème « priorités » + premier examen blanc | M2 : score examen blanc n°1, temps de réponse |
| S3 | Thèmes « vitesse/alcool/fatigue » + parcours immersif « Une journée à Bamako » complet | M3 : complétion du parcours, scènes correctes |
| S4 | Examen blanc n°2 + entretien de sortie structuré | M4 : score examen blanc n°2, retours qualitatifs |

### 2.3 Groupes
- **Groupe principal (25-45 participants)** : usage de l'application en complément de la préparation classique.
- **Groupe de comparaison interne (5-15 participants)** : préparation classique uniquement, mesures M0 et M4 identiques — comparaison indicative, PAS une étude scientifique contrôlée (l'effectif est trop faible pour une causalité ; le rapport le dira explicitement).

### 2.4 Collecte des données — outils gratuits uniquement

| Donnée | Outil | Fréquence |
|---|---|---|
| Scores quiz et examens blancs | Export local navigateur → relevé papier/feuille de calcul par le moniteur | Fin de chaque semaine |
| Complétion des leçons et du parcours immersif | Compteur de progression local relevé par le participant (capture d'écran ou dictée au moniteur) | Fin de chaque semaine |
| Retours qualitatifs | Grille d'entretien structurée (annexe A), notes manuscrites du moniteur | S0, S2, S4 |
| Observations terrain | Journal du moniteur (anecdotes, difficultés d'usage, contextes) | Continu |

**Aucune donnée n'est collectée à l'insu des participants.** L'application ne comporte aujourd'hui aucun tracking : toutes les mesures sont déclaratives et relevées en session encadrée — c'est un argument de confiance à mettre en avant.

### 2.5 Métriques du rapport final

| Métrique | Définition | Cible indicative |
|---|---|---|
| Taux d'activation | % de participants ayant terminé le premier parcours guidé à S0 | ≥ 80 % |
| Rétention à 4 semaines | % de participants actifs à S4 | ≥ 50 % |
| Progression pédagogique | Écart moyen score examen blanc S2 → S4 | Amélioration mesurable |
| Complétion du parcours immersif | % ayant terminé les 10 scènes | ≥ 60 % |
| Accessibilité effective | % de participants utilisant la voix off (déclaratif) et retours | Documenté |
| Satisfaction | Échelle simple 1-5 à l'entretien de sortie | ≥ 4/5 |
| Difficultés techniques | Journal des incidents (installation, hors-ligne, petit écran) | Documenté, sans cible |

Les cibles indicatives ne sont pas des promesses : elles structurent la lecture des résultats. Un pilote « échoué » documenté honnêtement vaut mieux qu'un succès embellis — c'est ce qui crédibilise le rapport auprès des institutions.

## 3. Consentement et confidentialité (P6.3 — bloquant)

### 3.1 Consentement éclairé
- Formulaire papier en français simple (+ lecture orale pour les participants qui lisent difficilement — cohérent avec la mission d'accessibilité).
- Mentions obligatoires : finalité, durée (28 jours + archivage), données collectées, anonymat, absence de conséquence du refus ou du retrait, contact du responsable.
- Le participant peut se retirer à tout moment ; ses données relevées sont détruites sur demande.

### 3.2 Anonymisation — règle absolue
- Chaque participant reçoit un code alphanumérique à S0 (ex. P-BKA-001) ; **aucune donnée nominative n'entre dans le rapport final**.
- La table code ↔ identité reste chez l'auto-école sous scellé, détruite à la clôture du pilote.
- Le rapport final ne publie que des agrégats (moyennes, taux, citations anonymisées).

### 3.3 Limites légales assumées
- Ce protocole ne constitue pas un avis juridique. Avant collecte, le porteur fait relire le formulaire de consentement par un juriste malien compétent (recommandation : cadre de la loi malienne sur la protection des données personnelles en vigueur, à vérifier sur le Journal officiel).
- Les données restent au Mali (feuilles papier, feuille de calcul locale) — aucun cloud étranger, cohérent avec le principe de souveraineté.

## 4. Accord-type avec une auto-école partenaire

> Modèle à adapter puis signer (papier, deux exemplaires). Enregistrement de la société, numéro d'agrément et coordonnées à compléter.

**Entre** le porteur du projet Mali BOLIFEN KALANSO, ci-après « le Porteur », **et** l'auto-école [dénomination], agréée sous le n° [agrément], ci-après « l'Établissement ».

1. **Objet** : pilote d'usage de l'application pédagogique gratuite Mali BOLIFEN KALANSO auprès des candidats de l'Établissement, sur 4 semaines, selon le protocole joint.
2. **Nature de l'application** : outil pédagogique complémentaire ; il ne remplace ni la formation de l'Établissement, ni les démarches administratives, et ne délivre aucun permis ni certification officielle.
3. **Engagements de l'Établissement** : recruter 15 à 30 candidats volontaires ; désigner un moniteur référent ; accueillir la session d'installation ; relever hebdomadairement les mesures selon la grille du protocole ; conserver la table des codes sous scellé.
4. **Engagements du Porteur** : fournir l'application gratuitement ; animer la session S0 ; former le moniteur référent au protocole ; fournir les grilles de relevé ; produire le rapport anonymisé ; remettre à l'Établissement un exemplaire du rapport.
5. **Données** : relevés anonymisés par code ; aucune donnée nominative transmise au Porteur ; destruction de la table des codes à la clôture ; aucun usage commercial des données pendant le pilote.
6. **Confidentialité** : le rapport cite l'Établissement comme partenaire pilote uniquement avec son accord écrit.
7. **Coût** : le pilote est sans échange d'argent. Chaque partie supporte ses propres coûts.
8. **Propriété** : l'application reste la propriété du Porteur ; les relevés produits dans le cadre du pilote sont co-détenus et utilisables par les deux parties, le rapport final étant rédigé par le Porteur.
9. **Durée et sortie** : 4 semaines à compter de la session S0 ; sortie anticipée possible par notification écrite 7 jours à l'avance.
10. **Communication** : aucune communication publique conjointe sans accord écrit préalable des deux parties.

Fait à Bamako, le [date], en deux exemplaires.

Le Porteur : [nom, signature] — L'Établissement : [nom, fonction, signature, cachet]

## 5. Déroulé des sessions encadrées (repère pour le moniteur)

| Session | Durée | Déroulé |
|---|---|---|
| S0 — Installation | 90 min | Accueil → lecture orale du consentement → signature → installation PWA sur téléphone personnel → parcours guidé (accueil, une leçon, un quiz) → quiz de diagnostic (M0) → remise du code participant |
| S1–S3 — Suivi hebdomadaire | 45 min | Relevé des compteurs de progression → quiz de la semaine → questions/réponses → journal du moniteur |
| S4 — Clôture | 90 min | Examen blanc n°2 (M4) → entretien de sortie structuré (annexe A) → satisfaction 1-5 → remerciements et remise éventuelle d'une attestation locale de participation (étiquetée « sensibilisation — aucune valeur officielle ») |

## 6. Rapport final (livrable P6.2)

Structure imposée du rapport :
1. Contexte et protocole résumé (effectifs réels, dates, lieux).
2. Résultats par métrique, avec écarts aux cibles indicatives.
3. Analyse honnête : limites méthodologiques (effectif, auto-sélection, déclaratif), incidents techniques.
4. Verbatims anonymisés (sélection, validés par les participants lors de l'entretien de sortie quand c'est possible).
5. Recommandations produits (corrections, priorités).
6. Conclusion factuelle : **aucune généralisation au-delà de l'échantillon** ; ce rapport ouvre la discussion des offres (licence institutionnelle, abonnement auto-écoles) selon les seuils de passage du plan CTO, il ne les valide pas seul.

## Annexe A — Grille d'entretien de sortie (S4)

1. Avez-vous utilisé l'application en dehors des sessions ? Combien de fois par semaine, dans quelles circonstances (domicile, transport, pause) ?
2. Avez-vous utilisé la voix off (🔊) ? Pourquoi, ou pourquoi pas ?
3. Qu'est-ce qui vous a le plus aidé à comprendre une règle de la route ?
4. Qu'est-ce qui vous a manqué ou gêné (écran, connexion, contenu, langue) ?
5. Si l'application existait en bamanankan avec voix, l'utiliseriez-vous davantage ?
6. Recommanderiez-vous l'application à un ami qui prépare le code ? Pourquoi ?
7. Notation de satisfaction globale de 1 à 5.
8. Une chose à changer en priorité ?

## Annexe B — Journal du moniteur (modèle de colonnes)

Date | Code participant | Session | Observation (incident, difficulté, anecdote de terrain, suggestion) | Action éventuelle

## Annexe C — Feuille de relevé hebdomadaire (modèle)

Code | Semaine | Leçons terminées | Quiz réussis/ tentés | Score examen | Parcours immersif (x/10 scènes) | Voix off utilisée (oui/non) | Remarque

---
Document de travail du 4 novembre 2026. À relire par un juriste malien compétent avant la première signature (section 3.3). Version : 1.0 — à incrémenter à chaque révision signée.