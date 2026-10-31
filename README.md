# Code de la route citoyenne

Application de salon de discussion en temps réel basée sur Socket.IO pour le projet de sensibilisation à la mobilité citoyenne.

## Prérequis

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Configuration

Copiez le fichier d’exemple d’environnement :

```bash
cp .env.example .env
```

## Développement

```bash
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Structure du projet

```text
.
├── .env.example
├── .gitignore
├── Caddyfile
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   ├── state.ts
│   ├── types.ts
│   └── utils.ts
└── dist/
```

## Configuration Caddy

Exemple minimal :

```caddy
:80 {
    reverse_proxy localhost:3003
}
```

Si vous utilisez un chemin Socket.IO explicite :

```caddy
:80 {
    handle /socket.io* {
        reverse_proxy localhost:3003
    }

    handle {
        reverse_proxy localhost:3000
    }
}
```

## Bonnes pratiques

- Ne laissez pas `path: '/'` pour Socket.IO si un reverse proxy est en place.
- Réduisez le CORS en production à des origines connues.
- Pour une vraie application publique, remplacez l’état mémoire par une base de données.
- Ajoutez une authentification si vous voulez sécuriser les salons et les messages.

## Description du projet

Ce dépôt contient une base solide pour un service de chat en temps réel, pensé pour des environnements de démonstration ou de prototype.
