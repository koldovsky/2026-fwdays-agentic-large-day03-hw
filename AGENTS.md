# AGENTS.md

## Project Overview

Excalidraw is a monorepo for a whiteboard-style diagram editor and its embeddable React library.
The repository contains both the reusable editor package and the full web app integration.
The goal is to keep drawing fast, collaborative, and stable while preserving backward compatibility.

## Tech Stack

- React + TypeScript across packages and app
- Vite for the app build/dev workflow
- Yarn 1 workspaces for monorepo dependency management
- Vitest for tests and snapshot-driven validation
- Internal package graph: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/excalidraw`

## Project Structure

- `packages/excalidraw/` — main library published as `@excalidraw/excalidraw`
- `excalidraw-app/` — app shell and production integrations
- `packages/*` — core reusable packages (`common`, `element`, `math`, `utils`)
- `examples/*` — embedding examples and integration demos
- `docs/*` — spec, product, technical architecture, and memory bank (**canonical for SSD/worktree docs**)
- `dev-docs/*` — upstream-style Docusaurus docs (**canonical for `@excalidraw/excalidraw` integration & API reference**)

## Key Commands

```bash
yarn start           # run app in development mode
yarn build           # build app bundle
yarn build:packages  # build internal packages
yarn test            # run tests
yarn test:update     # run tests with snapshot updates
yarn test:typecheck  # TypeScript checks
yarn fix             # lint/format fixes
```

## Architecture

- Rendering is Canvas-first with scene-driven updates.
- Editor behavior is coordinated through action flow and app state transitions.
- Core types and scene lifecycle live in `packages/excalidraw/` and `packages/element/`.
- Keep architectural details aligned with `docs/technical/architecture.md` and `docs/spec/SSD.md`.

## Conventions

- Prefer functional components and strict TypeScript typing.
- Keep changes scoped to the relevant package or app layer.
- Use Yarn commands from repository root; avoid introducing new package managers.
- Document meaningful architecture/process changes in `docs/memory/*`.
- Keep rules and commands specific to Excalidraw workflows, not generic advice.

## Do-Not-Touch / Constraints

Do not modify these files without explicit approval:

- `packages/excalidraw/scene/Renderer.ts`
- `packages/excalidraw/data/restore.ts`
- `packages/excalidraw/actions/manager.tsx`
- `packages/excalidraw/types.ts`

Changes to protected files require dependency awareness, full relevant test execution, and manual QA notes.

## Development Workflow

1. Implement in the correct scope (`packages/*` for library, `excalidraw-app/` for app behavior).
2. Verify with matching commands (`yarn test:typecheck`, `yarn test:update`, `yarn fix` as needed).
3. Keep docs in sync for any meaningful project/process update.

## Memory Bank

- Use `docs/memory/` as operational memory for architecture and active decisions.
- Update `activeContext.md` and `progress.md` after meaningful changes.
- Record notable choices in `decisionLog.md` with context and consequences.

## Documentation and SSD

- Use `docs/spec/SSD.md` as the primary spec-driven process guide.
- Validate work against `docs/product/PRD.md`, `docs/product/domain-glossary.md`, and `docs/technical/architecture.md`.
- If implementation diverges from spec, document the reason and approved direction.
- For integration/API details of `@excalidraw/excalidraw`, prefer `dev-docs/docs/@excalidraw/excalidraw/*`. Keep `docs/` focused on SSD + architecture + Memory Bank, linking to `dev-docs/` where needed.

## Rules Index (Single Source of Truth)

- Keep this file as index/entrypoint, not a duplicate of rule bodies.
- Rule priority for conflicts: repository-level system instructions > protected-file rules > project process docs.
- Primary rule/document sources:
  - `.cursor/rules/excalidraw-protected-files.mdc`
  - `.cursor/rules/excalidraw-architecture.mdc`
  - `.cursor/rules/excalidraw-code-conventions.mdc`
  - `.cursor/rules/project-communication-language.mdc`
  - `docs/spec/SSD.md`
  - `docs/product/PRD.md`
  - `docs/product/domain-glossary.md`
  - `docs/technical/architecture.md`
  - `docs/memory/*`
