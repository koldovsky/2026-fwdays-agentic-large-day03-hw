# AGENTS.md

## Project Overview

- Excalidraw is a layered monorepo with a publishable editor package, a reference web app, and integration examples.
- Keep this file operational and checklist-friendly. General project context belongs in Memory Bank and deep docs, not in long narrative sections here.

## Memory Bank

- Read every Markdown file in `docs/memory-bank/` at the start of every task:
- `projectbrief.md`
- `productContext.md`
- `activeContext.md`
- `systemPatterns.md`
- `techContext.md`
- `progress.md`
- `decisinLog.md`
- Treat Memory Bank as the canonical source for stable repo context, current focus, and durable decisions.
- Use `docs/technical/*` and `docs/product/*` for deep detail instead of duplicating that material in `AGENTS.md`.

## Project Layout

- `packages/excalidraw/`: published `@excalidraw/excalidraw` React editor package.
- `excalidraw-app/`: reference application and app-only integrations.
- `packages/common`, `packages/math`, `packages/element`, `packages/utils`: shared primitives and helpers.
- `examples/*`: integration examples for embedders.

## Tech Stack

- Node `>=18.0.0` and Yarn `1.22.22` workspaces.
- TypeScript with strict checking.
- Vite and Vitest toolchain.
- React `19` in `excalidraw-app`; the published package preserves compatibility across React `17`, `18`, and `19`.
- Browser-first runtime, with some advanced app features depending on external services.

## Key Commands

- `yarn`: install workspace dependencies.
- `yarn start`: run the reference app locally.
- `yarn build`: build the app.
- `yarn build:packages`: build publishable packages.
- `yarn test:typecheck`: run TypeScript checks.
- `yarn test:update`: repo-preferred test run with snapshot updates.
- `yarn test:all`: full verification sweep.
- `yarn fix`: run formatting and lint autofixes.

## Conventions

- Work in `packages/*` for editor/runtime changes and in `excalidraw-app/` for app-specific behavior.
- Read the relevant `.cursor/rules/*.mdc` files before editing code in their scope.
- Preserve architecture constraints: state changes go through `actionManager.dispatch()`, rendering stays on the canvas pipeline, and new drawing/state libraries require explicit approval.
- Follow code conventions: functional components, named exports, `import type` for type-only imports, no `any`, and no `@ts-ignore`.
- Reuse existing project patterns for actions, branded types, Jotai isolation, batched updates, and security-sensitive flows.

## Do-Not-Touch

- Do not modify these files without explicit approval:
- `packages/excalidraw/scene/renderer.ts`
- `packages/excalidraw/data/restore.ts`
- `packages/excalidraw/actions/manager.ts`
- `packages/excalidraw/types.ts`
- If a protected file must change, first map dependencies and call sites, then run the full test suite, then do manual QA.

## Verification

- Default after code changes: `yarn test:typecheck`.
- Standard repo expectation before commit: `yarn test:update`.
- Use `yarn test:all` for broad, shared, or runtime-sensitive changes.
- Run `yarn fix` when formatting or lint issues are likely.
- Docs-only changes do not require code tests, but the final handoff should say that verification was not run.

## Skills And Deep Docs

- Use the relevant local skill when the task matches it, especially `codebase-explorer`, `build-verify`, `memory-bank-update`, `undocumented-behavior-finder`, and `technical-docs-writer`.
- Use `docs/technical/architecture.md`, `docs/technical/packages-architecture.md`, `docs/technical/hidden-invariants.md`, and `docs/technical/dev-setup.md` for source-grounded technical detail.
- Use `docs/product/*` when the task depends on product behavior, domain language, or UX expectations.
