# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Excalidraw — open-source virtual whiteboard with hand-drawn style, real-time collaboration, and end-to-end encryption. Monorepo with a reusable React component library (`@excalidraw/excalidraw`) and a full-featured web app.

## Development Commands

```bash
yarn start                           # Dev server (port 3000)
yarn build                           # Build the app
yarn build:packages                  # Build packages in order: common → math → element → excalidraw

yarn test                            # Run vitest (watch mode)
yarn test:update                     # Run all tests with snapshot updates (no watch)
yarn test:app --watch=false          # Run tests once
npx vitest path/to/file.test.ts      # Run a single test file
npx vitest -t "test name pattern"    # Run tests matching a pattern

yarn test:typecheck                  # TypeScript type checking (tsc)
yarn test:code                       # ESLint (--max-warnings=0)
yarn test:all                        # Full suite: typecheck + eslint + prettier + tests

yarn fix                             # Auto-fix prettier + eslint
yarn fix:code                        # ESLint --fix only
yarn fix:other                       # Prettier --write only
```

## Project Structure

```
packages/
  common/       — Shared constants, types, utilities (colors, keys, defaults)
  math/         — Pure math: points, vectors, angles, transforms (branded types: GlobalPoint, LocalPoint, Radians)
  element/      — Element data model, mutation, geometry, bindings, Scene class
  excalidraw/   — Core React component library (renderer, actions, UI, i18n, fonts)
  utils/        — Public utility helpers for library consumers
excalidraw-app/ — Full web app (excalidraw.com): collab, Firebase, encryption, PWA
examples/       — Integration examples (NextJS, browser script)
```

## Architecture

### State Management

- **No Redux.** Uses React class component state (`App.tsx`, the main ~13k-line class component) + Jotai atoms (`editor-jotai.ts` with `createIsolation()` for per-editor stores).
- **AppState** (`packages/excalidraw/appState.ts`) — UI/editor state (active tool, zoom, scroll, selection, theme, grid).
- **Scene** (`packages/element/Scene.ts`) — manages element collection, caches non-deleted elements, tracks selection.

### Action System

Actions in `packages/excalidraw/actions/` follow a command pattern:
- Each action: `perform(elements, appState, formData) → { elements?, appState?, files?, captureUpdate }`
- `ActionManager` dispatches actions from UI, keyboard, context menu, API, command palette.
- Flow: User Event → ActionManager → Action.perform() → state updates → React re-render → canvas repaint via RAF throttling.

### Element Model

- Elements are **immutable readonly objects**. Mutations via `mutateElement()` create new objects.
- Each element has `version` + `versionNonce` for change detection (djb2 hashing).
- **Fractional indices** for ordering stability.
- Hierarchy: elements can be in frames, groups, or bound (text-in-shape, arrows-to-shapes). Bound text is a separate element with `containerId`.

### Rendering

- Canvas-based rendering per element type.
- `Renderer.getRenderableElements()` filters by viewport.
- RAF-throttled static scene rendering.

### Collaboration (app-level, not in core library)

- `excalidraw-app/collab/Collab.tsx` — WebSocket sync via socket.io.
- Element reconciliation merges remote + local via `reconcileElements()`.
- Jotai atoms: `collabAPIAtom`, `isCollaboratingAtom`, `isOfflineAtom`.

### Tunnel Pattern

Uses `tunnel-rat` for portal-based component composition (MainMenu, Sidebar, Dialogs) beyond the React tree.

### Build System

- **Packages**: esbuild ESM bundling with dev/prod conditional exports.
- **App**: Vite 5 with plugins (react, svgr, EJS, PWA, checker).
- **Package build order matters**: `common → math → element → excalidraw` (dependency chain).

## Coding Conventions

- TypeScript strict mode. Use `Point` type from `@excalidraw/math` for coordinates, not `{ x, y }`.
- Functional components + hooks for new code (App.tsx is legacy class component).
- CSS modules for component styling.
- PascalCase: components, interfaces, types. camelCase: variables, functions. ALL_CAPS: constants.
- Prefer immutable data (`const`, `readonly`), optional chaining (`?.`), nullish coalescing (`??`).
- Prefer performance: less CPU over less RAM, avoid unnecessary allocations.

## Testing

- Vitest with jsdom environment. Globals enabled (`describe`/`test`/`expect` are global).
- `setupTests.ts` mocks canvas API, localStorage, IndexedDB, fonts, pointer/touch APIs.
- Test helpers in `packages/excalidraw/tests/helpers/`: `api.ts` (draw shapes, type text), `ui.ts` (click, drag, transform).
- Coverage thresholds: lines 60%, branches 70%, functions 63%.

## Lint & Pre-commit

- Husky + lint-staged: ESLint on `*.{js,ts,tsx}`, Prettier on `*.{css,scss,json,md,html,yml}`.
- Always run `yarn test:app` after modifications.
