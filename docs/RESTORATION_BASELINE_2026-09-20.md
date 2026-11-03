# Baseline de restauration — archive du 20 septembre 2026

## Objet
Cette note fixe le contenu de référence de l'archive utilisateur « mali bolifen kalanso 20-09-26-(1).tar ». Elle ne remplace pas les sources. Elle sert à empêcher la perte des contenus historiques lors de la réconciliation avec l'application statique actuelle.

## Architecture de l'archive
- Next.js 16, React 19, TypeScript, Tailwind CSS 4.
- Composants pédagogiques dans `src/components/auto-ecole/`.
- Données pédagogiques structurées dans `src/lib/data/`.
- Illustrations PNG dans `public/images/bamako/`.
- Schéma Prisma et base locale présents dans l'archive : ils doivent faire l'objet d'une revue de sécurité et de pertinence avant toute réutilisation.

## Inventaire pédagogique identifié
- Leçons : `src/lib/data/lessons.ts`.
- Quiz : `src/lib/data/quiz.ts`.
- Panneaux : `src/lib/data/signs.ts`.
- Études de cas : `src/lib/data/case-studies.ts`.
- Conseils : `src/lib/data/tips.ts`.
- Contrôles du véhicule : `src/lib/data/vehicle.ts`.
- Onboarding : `src/lib/data/onboarding.ts`.
- Blocs de lecture : `src/lib/data/reader-blocks.ts`.
- Ressources Bamanankan : `src/lib/data/i18n-bm.ts`.

## Illustrations historiques
Les 16 fichiers ci-dessous sont présents dans l'archive et doivent être préservés avec leurs noms et leur usage prévu :
- car-dashboard-interior.png
- car-exterior-check.png
- carrefour-hamdallaye.png
- case-moto-taxi.png
- case-night-driving.png
- case-pedestrian-crossing.png
- case-rainy-flood.png
- case-roundabout-approach.png
- case-school-zone.png
- driving-instructor-student.png
- emergency-scene-bamako.png
- hero-bamako-carrefour.png
- parked-cars-bamako.png
- rainy-driving-bamako.png
- road-signs-bamako.png
- roundabout-bamako.png

Chemin source : `public/images/bamako/`.

## Composants historiques
- hero, navigation et footer
- onboarding et formation
- panneaux et quiz
- études de cas
- contrôles du véhicule et conseils
- tableau de progression et certificat
- lecture vocale globale, bouton d'écoute et réglages TTS
- contrôle de zoom

## Règles de restauration
1. Ne pas remplacer les données actuelles par un ancien instantané sans comparaison champ par champ.
2. Conserver les enrichissements nationaux postérieurs à l'archive (situations hors Bamako, catégories de permis, programmes et lexique) lorsqu'ils sont compatibles.
3. Ne pas dupliquer une image pour plusieurs cartes ou sections sans justification pédagogique explicite.
4. Ne jamais présenter une illustration 3D comme une photographie documentaire réelle.
5. Maintenir le nom canonique « Mali BOLIFEN KALANSO » ; rejeter « BOLIFENKO KALANSO ».
6. Vérifier les données réglementaires contre les textes maliens applicables et faire valider les contenus sensibles par des personnes compétentes au Mali.
7. Ne pas réutiliser les fichiers secrets, bases locales, journaux, identifiants ou configurations privées contenus dans l'archive.
8. Aucun changement de production ni déploiement avant tests de non-régression, mobile et hors ligne.

## Écart d'architecture à résoudre
Le dépôt courant utilise une application statique HTML/JavaScript servie depuis `public/`, alors que l'archive contient une application Next.js/React. La réconciliation doit être explicite : soit restaurer l'application Next.js comme application principale après validation du déploiement, soit porter sélectivement ses composants, données et médias dans l'architecture statique. Ne pas mélanger les deux systèmes sans stratégie de routage et de build documentée.

## Statut
- Archive examinée et inventaire établi.
- Branche de travail isolée créée depuis le commit courant de `main`.
- Aucun fichier de production modifié.
- Aucun build ou déploiement déclenché.
- Étape suivante : comparer les contenus structurés et intégrer les médias binaires historiques dans la branche, puis tester la version candidate.
