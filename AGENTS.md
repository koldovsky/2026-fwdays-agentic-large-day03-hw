# AGENTS.md

## Project Overview

Excalidraw is an open-source virtual whiteboard: a canvas-based diagramming app shipped as a React library and a full web product. This repository is a **Yarn workspaces monorepo**: the editor core lives in `packages/excalidraw/` (published as `@excalidraw/excalidraw`), while `excalidraw-app/` is the production-style shell (Vite, hosting, collaboration UI). Agents and contributors should default to **yarn** (not npm/pnpm) and follow workspace boundaries described below.

## Tech Stack

- **UI**: React (functional components and hooks)
- **Language**: TypeScript (strict)
- **App tooling**: Vite (`excalidraw-app/`)
- **Monorepo**: Yarn workspaces; package builds use esbuild for libraries
- **Tests / quality**: Vitest, ESLint, Prettier (`yarn test:*`, `yarn fix`)

## Project Structure

- **`packages/excalidraw/`** — main editor React library (`@excalidraw/excalidraw`)
- **`excalidraw-app/`** — full web application (excalidraw.com–style) consuming the library
- **`packages/`** — shared packages: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/utils`
- **`examples/`** — integration examples (e.g. Next.js, browser script)

## Key Commands

```bash
yarn start              # Dev server (excalidraw-app via Vite)
yarn build              # Production build (app)
yarn test:typecheck     # TypeScript across workspaces
yarn test:app           # Vitest
yarn test:all           # typecheck + ESLint + Prettier + Vitest (non-watch)
yarn test:update        # Vitest with snapshot updates (inspect diffs before commit)
yarn fix                # Prettier write + ESLint --fix
```

For environment variables and local setup details, see `docs/technical/dev-setup.md` when present.

## Architecture

- **State**: Editor state flows through the action system (`actionManager.dispatch()`); this is not a Redux/Zustand app.
- **Rendering**: Scene drawing uses the canvas pipeline (`renderScene` and related code), not React DOM for the canvas itself.
- **Boundaries**: Product-only code (routing, deploy config, analytics) belongs in `excalidraw-app/`; core editor behavior belongs in `packages/excalidraw/`. Prefer public package APIs over deep imports into internals unless the repo already uses that pattern.
- **Package system**: Internal path aliases are configured for Vitest and builds; see `vitest.config.mts` and package `package.json` files.

### Memory Bank

Project memory for agents lives under [`docs/memory/`](docs/memory/). After material changes (features, fixes, refactors, or docs that change how the repo is operated), update the Memory Bank per [`docs/memory/README.md`](docs/memory/README.md) (e.g. `activeContext.md`, `progress.md`, `decisionLog.md`, and related files as appropriate).

## Conventions

- **Components**: Functional components only; **named exports** (no default exports); props type `ComponentNameProps`.
- **Files**: kebab-case for utilities (`element-utils.ts`), PascalCase for components (`LayerUI.tsx`).
- **TypeScript**: No `any` or `@ts-ignore` without strong justification; prefer `import type` for type-only imports.
- **Tests**: Colocate `ComponentName.test.tsx` next to sources; see `.cursor/rules/testing.mdc` for the full verification matrix.
- **Workflow**: Run `yarn test:update` before committing when snapshots are expected to change; use `yarn test:typecheck` after type-affecting edits.
- **Security / input**: Treat imports and `.excalidraw` data as untrusted; no secrets in source — use documented env vars. Details in `.cursor/rules/security.mdc`.

## Do-Not-Touch / Constraints

Do **not** modify these core files without explicit approval, full understanding of dependents, `yarn test:all`, and manual QA — they are protected in `.cursor/rules/do-not-touch.mdc`:

- `packages/excalidraw/scene/renderer.ts` — render pipeline
- `packages/excalidraw/data/restore.ts` — file format compatibility
- `packages/excalidraw/actions/manager.ts` — action system
- `packages/excalidraw/types.ts` — core types

Prefer scoped changes, match existing patterns in the touched package, and avoid drive-by refactors unrelated to the task.
