# Audit de réconciliation — archive historique et application actuelle

Date de l'audit : 3 novembre 2026

## Décision technique

La base actuelle (HTML/CSS/JavaScript statique) doit rester la base de travail immédiate. L'archive historique Next.js contient une expérience pédagogique riche, mais la remplacer d'un seul coup changerait le framework, la commande de build, le mode de sortie Vercel et le modèle de fonctionnement. Ce serait un risque inutile tant qu'une version candidate Next.js n'a pas été reconstruite et testée isolément.

La voie retenue est donc une restauration sélective, fichier par fichier, dans une branche dédiée, en préservant les enrichissements nationaux déjà présents dans la version actuelle.

## Ce que la version actuelle apporte déjà et qu'il faut préserver

- Catalogue de 51 panneaux et situations associées.
- 8 scènes immersives illustrées en SVG schématique.
- 8 cas de circulation à Bamako et 8 cas nationaux hors Bamako.
- Campagnes de mobilité sûre, avec contenu bilingue présenté comme brouillon à valider.
- 8 catégories de permis configurées : A1, A2, B1, B, C, D, E, F.
- Lexique Bamanankan distinguant les termes attestés des termes en attente de validation.
- Parcours et programmes destinés aux particuliers, ONG, associations, institutions et collectivités.
- PWA, service worker, cache applicatif et vérifications de build.

Ces éléments sont plus récents que l'archive historique sur plusieurs axes. Ils ne doivent pas être écrasés par une restauration ancienne.

## Ce que l'archive historique apporte

- Application Next.js 16 / React 19 / TypeScript.
- Modules pédagogiques structurés : leçons, quiz, panneaux, cas pratiques, conseils, vérifications du véhicule, onboarding.
- Boucle d'apprentissage guidée : VOIR → ÉCOUTER → COMPRENDRE → CHOISIR → AGIR → RÉPÉTER.
- Lecture vocale, réglages Français/Bamanankan, progression locale, révision, certificat et zoom.
- 16 illustrations PNG originales, de style 3D pédagogique, dans `public/images/bamako/`.

Le journal de travail historique mentionne 10 leçons après enrichissement, 40 questions et 6 études de cas. Ces nombres sont des indications du journal de travail ; ils doivent être contrôlés directement dans les structures de données avant toute importation.

## Contrôle des illustrations

- 16 fichiers PNG sont présents dans l'archive.
- 15 noms de fichiers PNG sont référencés dans les sources TypeScript/TSX examinées.
- Les références trouvées totalisent 27 occurrences.
- Plusieurs visuels sont réutilisés dans l'application historique : `hero-bamako-carrefour.png` (5 occurrences), `carrefour-hamdallaye.png` (3), `case-roundabout-approach.png` (3). Il faut donc éviter de recopier mécaniquement cette distribution dans une page d'accueil où chaque carte doit avoir son visuel distinct.
- Le fichier `driving-instructor-student.png` est présent dans le dossier mais aucune référence n'a été trouvée dans les sources TypeScript/TSX examinées.
- Ce sont des illustrations 3D éducatives, pas des photographies documentaires.

## Points de vigilance à résoudre avant publication

1. Réconcilier le nom partout sous la forme exacte « Mali BOLIFEN KALANSO » et éliminer « BOLIFENKO ».
2. Revoir les catégories de permis : l'archive et la version actuelle ne présentent pas exactement le même référentiel. Aucune liste ne doit être déclarée officielle sans source réglementaire malienne à jour.
3. Vérifier les vitesses, alcoolémie, sanctions, numéros d'urgence et références institutionnelles contre les textes officiels en vigueur. Les notes historiques elles-mêmes contiennent des formulations à vérifier.
4. Valider les traductions Bamanankan par des locuteurs/enseignants compétents, en particulier les consignes de sécurité.
5. Vérifier le fonctionnement réel hors ligne et la persistance des progrès sur appareils mobiles.
6. Ne jamais réintroduire `.env`, base SQLite locale, journaux, PID ou autres fichiers privés de l'archive.

## Contrôles effectués

- L'archive a été extraite et son historique Git examiné.
- Le journal de travail, le manifeste des images, les modules de données et le package ont été inspectés.
- Les principaux modules de la version statique actuelle et son script `scripts/check-build.js` ont été lus.
- Aucun déploiement n'a été déclenché.
- La branche principale n'a pas été modifiée.

## Prochaine étape sûre

Importer d'abord les 16 médias historiques dans la branche de restauration, puis créer une table de correspondance entre chaque illustration, son sujet et son emplacement. Ensuite seulement, porter les contenus pédagogiques historiques qui complètent réellement la version actuelle, avec tests de non-régression et validation des contenus réglementaires.