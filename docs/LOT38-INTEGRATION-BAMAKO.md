# Lot 38 — intégration des visuels de Bamako

Branche de travail : `feat/lot38-bamako-assets-integration`.

Base : `6fc58c014d67f980f717a242249f32c5097641da`.

Le dépôt cible est une PWA statique. L’archive source contient une application Next.js distincte : les visuels doivent être adaptés à la PWA existante, sans remplacer son architecture.

Les 16 fichiers sont présents dans l’archive inspectée, mais ne sont pas encore téléversés dans GitHub. Le manifeste `public/images/bamako/lot38-manifest.json` décrit leur correspondance et conserve leur statut `pending_binary_upload`.

Avant publication : corriger le texte anglais « SCHOOL ZONE » dans `case-school-zone.png`, vérifier l’enseigne « AUTO-ÉCOLE », contrôler les panneaux et situations routières pour le contexte malien, et éviter toute réutilisation d’image sur la page d’accueil.

Les images sont des illustrations générées à vocation pédagogique, pas des photographies documentaires.

Étapes restantes : téléverser les 16 fichiers binaires, intégrer les références dans les sections existantes, actualiser le cache du service worker, tester le mode hors ligne et les formats d’écran, puis vérifier un aperçu Vercel protégé. Aucune modification de `main` ni de la production n’est effectuée par cette branche.