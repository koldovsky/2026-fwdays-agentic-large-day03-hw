# Create component

**Purpose:** Scaffold or implement a **new** React UI component in this Excalidraw monorepo following repo conventions and architecture.

You are doing that work now. **Scope** comes from the user: component name, behavior, and target area (`packages/excalidraw/` vs `excalidraw-app/`). If placement or API is unclear, ask briefly before writing code.

## Examples

- User runs `/create-component` and describes “a settings row for export quality in the app menu” → place under the appropriate `excalidraw-app/` or `packages/excalidraw/components/` subtree; match sibling patterns.
- User `@`-references a folder and asks for `FooBar.tsx` → colocate with neighbors; mirror exports and naming.
- User wants “a new item in the main menu that toggles grid visibility” → add UI next to existing menu entries (e.g. `AppMainMenu` / related components); wire the click to an **existing** action via `actionManager` / the same patterns siblings use — do not invent a parallel mutation path into `AppState`.

## Rules (must follow)

1. **UI vs canvas** — New work is **shell UI** (menus, dialogs, panels). The whiteboard stays on **Canvas 2D** (`Scene` / `Renderer`); do not replace board rendering with DOM for scene content.
2. **Placement**
   - **Editor chrome / shared editor UI:** `packages/excalidraw/components/` (or the subtree the task names). Match **siblings** for default vs named exports and file naming (camelCase / PascalCase / kebab-case as neighbors use).
   - **Hosted product / collab / app shell:** `excalidraw-app/` — collaboration UI under `excalidraw-app/collab/`, not inside `packages/excalidraw/` (see `.cursor/rules/architecture.mdc`).
3. **Implementation**
   - **Function component + hooks** for new UI. No new class components unless the task is an explicit refactor.
   - **Props type:** `{ComponentName}Props` where the area already does; reuse patterns from nearby files.
   - **TypeScript:** `import type` for type-only imports. No new `any` / `@ts-ignore` / `@ts-expect-error` without justification.
   - **Editor state:** User-facing commands and `AppState` changes go through **ActionManager** / existing actions — do not mutate `AppState` ad hoc. Jotai only for fine-grained UI signals where the codebase already uses it.
   - **Dependencies:** No new npm packages without approval (`AGENTS.md`).
4. **Do-not-touch** — Do not edit without explicit approval: `packages/excalidraw/scene/Renderer.ts`, `packages/excalidraw/data/restore.ts`, `packages/excalidraw/actions/manager.tsx`, `packages/excalidraw/types.ts` (see `.cursor/rules/do-not-touch.mdc`).
5. **Tests** — Add or extend **Vitest** tests when behavior is non-trivial: `*.test.ts(x)` in `packages/<pkg>/tests/`, `excalidraw-app/tests/`, or colocated next to source per existing tree.

## Verify

After changes: `yarn test:typecheck && yarn test:code` at repo root; if behavior changed, run targeted tests (e.g. `yarn test:app --watch=false`). State which commands you ran (or that the user should run them if you could not).

## Output format

- **Files changed** — Bulleted list of every new or modified path.
- **Placement** — One or two sentences: why this package/folder, and how it matches neighbors (exports, naming).
- **Wiring** — How the UI connects to the app: e.g. parent import, menu registration, `actionManager` / action name, Jotai atom (only if used). If nothing beyond “rendered by parent X”, say so.
- **Tests** — New/updated test files and what they cover; or “none — UI-only / covered by parent” with brief justification.
- **Commands** — `yarn test:typecheck`, `yarn test:code`, and any extra tests you ran or recommend.

Skip filler; if something does not apply, note **N/A** in that subsection.
