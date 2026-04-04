# OpenSpec project context

This repository is the **Excalidraw** monorepo: a React + TypeScript whiteboard editor published as `@excalidraw/excalidraw`, with shared packages under `packages/` and the full web app under `excalidraw-app/`.

## Tech stack

- **Language:** TypeScript (strict)
- **UI:** React
- **App bundling:** Vite (`excalidraw-app/`)
- **Library build:** esbuild for packages
- **Package manager:** Yarn workspaces
- **Tests:** Vitest; run `yarn test:update` before commit; `yarn test:typecheck` for types
- **Formatting/lint:** `yarn fix`

## Repository layout

| Path | Role |
|------|------|
| `packages/excalidraw/` | Main editor package (actions, components, scene, tests) |
| `packages/common/`, `packages/element/`, `packages/math/`, `packages/utils/` | Shared types, constants, geometry, utilities |
| `excalidraw-app/` | excalidraw.com application |
| `examples/` | Integration examples |

Path aliases for tests and builds are configured in Vitest/esbuild (see `vitest.config.mts`).

## Conventions for changes

- Prefer minimal blast radius; align with existing patterns (actions in `actions/`, UI in `components/`).
- User-visible strings go through i18n (`locales/`).
- Avoid magic numbers: use `@excalidraw/common` constants where appropriate.
- For URL or text handling, stay mindful of XSS and validation.

This file is **reference context** for AI and reviewers; the authoritative behavior for a given change lives under `openspec/changes/<change-name>/`.
