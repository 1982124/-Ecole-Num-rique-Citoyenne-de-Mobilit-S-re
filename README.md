# Mali Bolifen Kalanso

**École Numérique et Citoyenne pour une Mobilité Sûre** — application pédagogique de sensibilisation à la sécurité routière, conçue pour être simple à utiliser sur téléphone et ordinateur.

## Fonctionnalités
- 21 leçons visuelles avec illustrations SVG originales intégrées au code.
- Explications en français facile et lecture vocale via la synthèse vocale du navigateur si disponible.
- Recherche, filtres par catégorie et favoris.
- Progression, favoris et résultats conservés localement sur l’appareil.
- Quiz avec corrections expliquées et mises en situation interactives.
- Application web installable (PWA) et cache hors ligne après une première visite réussie.
- Interface responsive, navigation clavier et retours accessibles.
- Aucun compte, aucune collecte de données personnelles et aucune dépendance payante pour les fonctions pédagogiques.

## Développement local
Prérequis : Node.js 18 ou plus.

\`\`\`bash
npm test
npm start
\`\`\`

Puis ouvrir http://localhost:3001.

## Déploiement Vercel
Le site est servi comme application statique depuis le dossier public. La configuration Vercel définit la commande de build et le dossier de sortie. Un push sur la branche reliée à Vercel déclenche normalement un nouveau déploiement automatiquement.

Le serveur local sert uniquement à la prévisualisation. L’application pédagogique principale n’a pas besoin de serveur temps réel, de base de données, de variable secrète, de domaine personnalisé ou de plan payant.

## Limites et validation
Ces conseils sont des supports pédagogiques de sensibilisation et ne remplacent pas le Code de la route ni les instructions des autorités compétentes au Mali. Les contenus réglementaires doivent être relus et validés par des autorités ou formateurs habilités avant tout usage officiel. La lecture vocale dépend de la voix française installée sur l’appareil. L’interface actuelle est en français ; une version complète en bambara nécessitera une traduction et une validation dédiées.