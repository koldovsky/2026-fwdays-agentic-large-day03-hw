# AGENTS.md

## 1. Project overview

Excalidraw is an open-source collaborative whiteboard for informal diagrams, sketches, and shared canvas work (shapes, text, images, export and collaboration flows). This monorepo builds the **hosted product** and the **embeddable editor library** that third-party apps can integrate. Shared packages hold math, element logic, and utilities; `examples/` shows common integration patterns. Product or fork-specific scope may live under `docs/product/`. Stack and runtime patterns: [docs/memory/techContext.md](docs/memory/techContext.md), [docs/memory/systemPatterns.md](docs/memory/systemPatterns.md).

## 2. Tech stack

- **TypeScript** — strict, root `typescript` ~5.9
- **React** 19
- **Vite** 5 — dev/build for `excalidraw-app`
- **Yarn Classic 1.x workspaces** — install and scripts at repo root with **`yarn`** only; do not use npm or pnpm as the primary workflow here
- **Vitest** + `jsdom`; **`@vitest/coverage-v8`** in CI
- **ESLint** (`yarn test:code`), **Prettier** (`yarn test:other` / `yarn fix:other`)
- **Node** `>=18` (see root / app `engines`)

## 3. Project structure

- **`excalidraw-app/`** — Vite host app: shell UI, collaboration, persistence, PWA-oriented wiring
- **`packages/excalidraw/`** — main editor: `Excalidraw` component, `App`, `actions/`, `scene/`, `data/`, etc.
- **`packages/common`**, **`packages/math`**, **`packages/element`**, **`packages/utils`** — shared layers; package build order: `common` → `math` → `element` → `excalidraw` (`yarn build:packages`)
- **`examples/*`** — integration demos (e.g. Next.js, in-browser script)
- **Path aliases:** `@excalidraw/*` from root `tsconfig.json` `paths`, mirrored in `excalidraw-app/vite.config.mts` and `vitest.config.mts`

## 4. Key commands

- `yarn` — install dependencies
- `yarn start` — dev server (port 3000, `excalidraw-app`)
- `yarn build` — production app build
- `yarn build:packages` — build internal packages in dependency order
- `yarn test` — Vitest
- `yarn test:all` — typecheck + lint + format check + tests (local PR-style gate)
- `yarn test:coverage` — coverage report
- `yarn fix` — autofix where supported (format + lint)

## 5. Architecture

- **Components / layers:** Product and collab live in `excalidraw-app`; editor UI and runtime live in `packages/excalidraw`; geometry and scene element logic lean on `packages/element` and `packages/math`. Longer doc: [docs/technical/architecture.md](docs/technical/architecture.md).
- **State management:** No Redux/Zustand. **Dual model:** canonical `AppState` on the **`App` class** (`packages/excalidraw/components/App.tsx`); **Jotai** for fine-grained UI (`editor-jotai.ts`, isolated store); scene elements in **Scene/Store**, not React state; user-facing editor commands go through **ActionManager** (`actions/*`).
- **Rendering:** The whiteboard is drawn with **HTML canvas (2D)**, not React DOM.

## 6. Conventions

- **Naming / files:** Match siblings in the tree you edit — typically camelCase modules, PascalCase React components, `{Name}Props` where the package already does; see [.cursor/rules/conventions.mdc](.cursor/rules/conventions.mdc).
- **Code style:** `import type` for type-only imports; no new `any`, `@ts-ignore`, or `@ts-expect-error` without justification; prefer hooks and function components for **new** UI — do not refactor legacy `App.tsx` to hooks unless the task explicitly includes that.
- **Editor state:** No ad-hoc mutation; use ActionManager, `App` state updates, or the documented Jotai bridge.
- **PR workflow:** CI on PRs includes lint, tests, and coverage; **semantic PR titles** are enforced (`.github/workflows/semantic-pr-title.yml`). Follow team/workshop title conventions.

## 7. Do-not-touch and constraints

Without **explicit approval**, do not edit, rename, delete, or bypass these paths (see [.cursor/rules/do-not-touch.mdc](.cursor/rules/do-not-touch.mdc)):

| Path | Why |
| --- | --- |
| `packages/excalidraw/scene/Renderer.ts` | Canvas render pipeline |
| `packages/excalidraw/data/restore.ts` | Scene restore / file format compatibility |
| `packages/excalidraw/actions/manager.tsx` | `ActionManager` |
| `packages/excalidraw/types.ts` | Root editor types (`AppState`, etc.) |

**Constraints:** no new package dependencies without approval; keep TypeScript strict (same bar as conventions above).
