# Mobilité citoyenne - salon de chat temps réel

Applications de démonstration pour un salon de discussion en temps réel orienté mobilité citoyenne et apprentissage du code de la route.

## Prérequis

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Démarrage local

```bash
npm run dev
```

L’application est accessible sur :

```text
http://localhost:3001
```

## Fonctionnalités

- inscription utilisateur
- liste des membres connectés
- messages en temps réel
- notifications système pour les entrées et sorties
- interface responsive

## Déploiement

Ce projet est prêt pour un déploiement de type :
- backend Node.js + Socket.IO sur Render / Railway / Fly.io
- frontend statique sur Vercel

Pour un front statique sur Vercel, il faut connecter le site HTML/CSS/JS dans `public/` et point le frontend vers le backend distant.

## Important

- Vercel n’est pas le meilleur choix pour un serveur WebSocket persistant.
- Le plus fiable est de déployer le backend sur une plateforme Node qui supporte les sockets.
- Le frontend peut rester sur Vercel ou sur n’importe quel hébergement statique.
