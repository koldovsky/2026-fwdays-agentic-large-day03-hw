# Project: Excalidraw

Open-source virtual whiteboard for sketching hand-drawn-like diagrams. Published as `@excalidraw/excalidraw` on npm and deployed at excalidraw.com.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Language | TypeScript (strict) | 5.9.3 |
| UI framework | React | 19.x |
| Bundler (app) | Vite | 5.0.12 |
| Bundler (packages) | esbuild | via custom scripts |
| Package manager | Yarn Classic (workspaces) | 1.22.22 |
| Test runner | Vitest | 3.0.6 |
| Coverage | @vitest/coverage-v8 | 3.0.7 |
| Linting | ESLint (`eslint-config-react-app`) | — |
| Formatting | Prettier (`@excalidraw/prettier-config`) | 2.6.2 |
| Git hooks | Husky + lint-staged | — |
| PWA | vite-plugin-pwa (Workbox) | 0.21.1 |
| Node | >=18.0.0 | — |

## Monorepo Structure

```text
excalidraw-monorepo/
├── packages/
│   ├── excalidraw/       # Main React component library (@excalidraw/excalidraw)
│   ├── common/           # Shared utilities (@excalidraw/common)
│   ├── element/          # Element model & operations (@excalidraw/element)
│   ├── math/             # Geometry primitives (@excalidraw/math)
│   └── utils/            # Public utility functions (@excalidraw/utils)
├── excalidraw-app/       # Full web application (excalidraw.com)
├── examples/             # Integration examples (NextJS, browser script)
└── scripts/              # Build, release, and code generation scripts
```

Packages have a strict dependency order: `common` -> `math` -> `element` -> `excalidraw`. The app depends on `excalidraw`. Internal packages use path aliases configured in `vitest.config.mts`.

## Key Conventions

- **Commit hygiene**: Run `yarn test:update` before committing to update snapshots. Run `yarn fix` to auto-fix formatting and lint issues.
- **Type safety**: `yarn test:typecheck` (strict `tsc`) must pass. No `any` without justification.
- **Testing**: Vitest with jsdom environment. Tests co-located in `tests/` or `__tests__/` dirs next to source. Use `vitest-canvas-mock` for canvas APIs.
- **Build order**: `yarn build:packages` builds in dependency order (common -> math -> element -> excalidraw). App build is separate via `yarn build:app`.
- **Package development**: Feature work goes in `packages/*`. App-specific features go in `excalidraw-app/`.
- **Styling**: SCSS modules (`.scss` files alongside components). CSS variables for theming.
- **i18n**: Translation keys via `t()` helper. Locale files in `packages/excalidraw/locales/`.

## Key Commands

| Command | Purpose |
|---------|---------|
| `yarn start` | Dev server (excalidraw-app) |
| `yarn build:packages` | Build all library packages |
| `yarn build:app` | Production build of the web app |
| `yarn test:typecheck` | TypeScript strict type checking |
| `yarn test:update` | Run all tests, update snapshots |
| `yarn test:coverage` | Run tests with v8 coverage |
| `yarn test:all` | Full CI suite (typecheck + lint + prettier + tests) |
| `yarn fix` | Auto-fix formatting and lint errors |
