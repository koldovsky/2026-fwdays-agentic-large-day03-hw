---
description: "Verification workflow for Excalidraw monorepo changes"
applyTo: "package.json,excalidraw-app/**,packages/**,examples/**,scripts/**"
---

# Verification Workflow

## Default Commands

- Run verification from the repository root.
- Type safety: `yarn test:typecheck`.
- App and package tests: `yarn test:app --watch=false`.
- Snapshot-affecting UI changes: `yarn test:update`.
- Lint: `yarn test:code`.
- Formatting check: `yarn test:other`.
- Autofix formatting and lint issues with `yarn fix` when appropriate.

## Choosing Coverage

- Pick the narrowest command set that still proves the change.
- Use `yarn test:all` for broad cross-cutting changes.
- Use `yarn build` for app build validation and `yarn build:packages` for shared package build validation when the change affects packaging or runtime wiring.
- If you do not run a relevant command, say that explicitly instead of implying the change was verified.

## How To Verify

- Match at least one executed command to the area you changed.
- Fix new lint, type, test, or formatting failures caused by your changes before handoff.
- Prefer reporting the exact command used and whether it passed, failed, or was not run.