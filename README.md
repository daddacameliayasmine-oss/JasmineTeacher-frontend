# JasmineTeacher — Frontend

Application React du projet **Jasmine Teacher** (cours de danse orientale en ligne).

## Stack

- **React 18 + TypeScript** — UI
- **Vite** — bundler / dev server
- **React Router** — routing côté client
- **Biome** — lint + formatage
- **Husky** — hooks Git

## Installation

```bash
git clone https://github.com/daddacameliayasmine-oss/JasmineTeacher-frontend.git
cd JasmineTeacher-frontend
npm install
npm run dev
```

L'app démarre sur `http://localhost:5173`. Le proxy Vite redirige `/api/*` vers le backend en `http://localhost:3310`.

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Démarre Vite en mode dev |
| `npm run build` | Build de production |
| `npm run preview` | Preview du build |
| `npm run lint` | Vérifie le code avec Biome |
| `npm run lint:fix` | Corrige automatiquement |

## Architecture

```
src/
├── components/
│   └── layout/      # Header, Footer
├── pages/           # Une page = une route
├── services/        # Appels API (à venir)
├── context/         # AuthContext (à venir)
├── styles/          # theme.css (variables) + global.css
├── App.tsx          # Layout + routes
└── main.tsx         # Point d'entrée
```

## Charte graphique

Univers **sombre / oriental / luxueux** : bordeaux, crème, doré, typographies serif élégantes.

Variables CSS définies dans `src/styles/theme.css`.

## Règles de contribution

- Workflow Git : `main > dev > feature/*`. Push direct interdit sur `main` / `dev`.
- **Conventional Commits** obligatoires (`type(scope): description`).
- **Limite de 150 lignes** par commit (hook `pre-commit`).
- Toute feature passe par une **Pull Request** vers `dev`.

Voir `CLAUDE.md` (racine du projet) pour le détail.
