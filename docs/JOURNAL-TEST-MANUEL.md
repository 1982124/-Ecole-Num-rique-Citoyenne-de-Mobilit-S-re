# Journal de test manuel — MALI BOLIFEN KALANSO

> Outil P0/P2 du plan CTO (4 novembre 2026) : le prochain seuil de qualité n'est pas un nouveau module, c'est la **preuve que l'application fonctionne de bout en bout sur mobile réel**. Ce journal est l'outil de cette preuve.
> Méthode : exécuter chaque campagne sur un **vrai téléphone Android** (idéal : entrée de gamme, le public cible), cocher, dater, consigner. Toute anomalie devient une issue GitHub et bloque toute communication de « version prête ».

## Règles du journal

1. Tester sur le **domaine public de référence** (le projet Vercel identifié comme officiel), pas uniquement en local.
2. Une ligne par test : `Date | Campagne | # | Appareil/navigateur | Résultat (✅/❌/⚠️) | Observation`.
3. Un résultat ❌ **bloque** la déclaration de « prête pour le pilote terrain » jusqu'à correction + re-test consigné.
4. Un résultat ⚠️ exige une décision CTO écrite avant de continuer.
5. Ce journal est conservé dans le dépôt et présenté aux partenaires du pilote — c'est un acte de transparence, pas un document interne.

## Campagne 1 — Premier contact (première visite, connexion mobile réelle)

| # | Test | Résultat attendu |
|---|---|---|
| 1.1 | Ouvrir l'URL publique sur mobile | Accueil charge (tolérance réseau 3G), nom exact « MALI BOLIFEN KALANSO » affiché |
| 1.2 | Bouton « 🔊 Écouter le message » | Voix française lit le message ; si aucune voix installée, repli visible et compréhensible, pas d'erreur silencieuse |
| 1.3 | Bouton « Démarrer les cas pratiques » | Navigation vers le parcours immersif fonctionnelle |
| 1.4 | Balayage horizontal à 360 px | Aucun débordement, aucun bouton coupé |
| 1.5 | Bloc OMS de l'accueil | Chiffres régionaux étiquetés comme régionaux, source visible (pas présentés comme maliens) |
| 1.6 | Disclaimer permis | Visible : l'app ne délivre aucun permis, ne remplace ni l'auto-école ni l'administration |

## Campagne 2 — Parcours apprenant complet

| # | Test | Résultat attendu |
|---|---|---|
| 2.1 | Ouvrir une leçon, la terminer | Leçon marquée terminée, explication accessible, voix off de la leçon fonctionne |
| 2.2 | Quiz thématique : répondre juste, puis faux | Correction explique **POURQUOI** dans les deux cas ; score mis à jour |
| 2.3 | Rejouer le même quiz | Questions différentes ou réordonnées ; pas de blocage |
| 2.4 | Examen blanc complet (40 questions / 35 requises / 30 min) | Chrono visible, résultats affichés, revue des erreurs accessible |
| 2.5 | Parcours immersif « Une journée à Bamako » : les 10 scènes | Chaque scène a une image **unique**, heure affichée, question, conséquence racontée, débrief final |
| 2.6 | Écran « Ma progression » | Reflète les actions réellement effectuées pendant la campagne (jamais décoratif) |
| 2.7 | Écran Ressources | Textes officiels, glossaire, numéros d'urgence accessibles et lisibles |

## Campagne 3 — Persistance (le test qui fonde la confiance)

| # | Test | Résultat attendu |
|---|---|---|
| 3.1 | Terminer 2 leçons + 1 quiz → fermer **entièrement** le navigateur → rouvrir | Progression conservée |
| 3.2 | Ajouter un favori → recharger la page | Favori conservé |
| 3.3 | Éteindre/rallumer le téléphone → rouvrir l'app | Progression et favoris conservés |
| 3.4 | Après un **nouveau déploiement** (nouvelle version en ligne) → ouvrir l'app | Mise à jour appliquée SANS perte de progression ni de favoris — c'est le test de non-régression le plus important du projet |

## Campagne 4 — Mode hors ligne (test P2 bloquant)

| # | Test | Résultat attendu |
|---|---|---|
| 4.1 | Installer la PWA (menu navigateur → Ajouter à l'écran d'accueil) | Icône correcte, ouverture plein écran sans barre de navigateur |
| 4.2 | Couper données + wifi → tuer l'app → rouvrir hors ligne | Accueil, leçons, quiz, cas pratiques et ressources **tous accessibles** ; aucune page blanche |
| 4.3 | Hors ligne : faire une leçon et un quiz | Fonctionne ; progression enregistrée localement |
| 4.4 | Hors ligne : écouter la voix off | Fonctionne (synthèse locale de l'appareil) |
| 4.5 | Rétablir la connexion → recharger | Pas de casse ; le service worker propose/installe la mise à jour sans perte de données |

## Campagne 5 — Écrans et accessibilité

| # | Test | Résultat attendu |
|---|---|---|
| 5.1 | Largeurs 360 / 375 / 390 px | Aucun débordement horizontal sur aucun écran ; cibles tactiles confortables |
| 5.2 | Zoom texte 200 % | Contenu lisible et utilisable, pas de chevauchement |
| 5.3 | Réduction d'animations (paramètre système) | Respectée, pas d'animation bloquante |
| 5.4 | Lecture en plein soleil (terrain) | Contrastes suffisants ; sinon → candidat « mode contraste élevé » |

## Campagne 6 — Contenus sensibles (échantillon aléatoire)

| # | Test | Résultat attendu |
|---|---|---|
| 6.1 | 5 panneaux au hasard | Nom, explication pédagogique, pictogramme ; étiquette « enseignement pédagogique » jamais présentée comme reproduction officielle |
| 6.2 | 5 questions au hasard | 3 options, une bonne réponse, correction qui explique le pourquoi, thème identifié |
| 6.3 | Chiffres OMS et statistiques | Toujours sourcés et datés ; régionaux jamais présentés comme nationaux maliens |
| 6.4 | Traductions bamanankan présentes | Statut de validation visible ou absent sans erreur ; jamais présentées comme validées si non validées |
| 6.5 | Audio bamanankan | Affiché comme « fonctionnalité à venir » seulement — jamais comme disponible |

## Critère de sortie du journal

- **Toutes les campagnes ✅** (ou ⚠️ avec décision CTO écrite) → l'application est déclarée « **prête pour le pilote terrain** » et le one-pager peut être présenté en toute honnêteté.
- Sinon → liste de corrections priorisée AVANT tout contact avec une auto-école : on ne pilote pas une application qui perd la progression de ses testeurs.

## Modèle de relevé (à recopier pour chaque exécution)

| Date | Campagne | # | Appareil/navigateur | Résultat | Observation | Décision |
|---|---|---|---|---|---|---|
| | | | | | | |

---
Document du 4 novembre 2026. À exécuter sur le domaine de référence après identification du projet Vercel officiel. Le premier passage complet vaut audit de fin de consolidation ; chaque déploiement majeur ultérieur déclenche un nouveau passage des campagnes 3 et 4 au minimum.