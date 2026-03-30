---
description: Create a new UI component following Excalidraw project style guides
---

# Create UI component (project style guide)

Create or scaffold a **React UI component** that matches this monorepo’s conventions. Default target: **`packages/excalidraw/components/`** (or a subfolder there, e.g. `footer/`, `Stats/`), unless the user specifies **`excalidraw-app/`** or another path.

## Before coding — confirm with the user (if unclear)

- **Component name** (PascalCase, e.g. `ToolPalette`).
- **Location** (file path or feature area).
- **Scope**: presentational only vs needs hooks/state; **children** / **props** sketch.
- Whether to add a **colocated test** (`ComponentName.test.tsx`) — default: add for non-trivial behavior or when the user asks.

## Conventions (must follow)

From **`.cursor/rules/conventions.mdc`** and existing components (`Button.tsx`, `Island.tsx`, etc.):

1. **Functional components only** — no class components (except the legacy `App` class; do not add new class components).
2. **Named export** — `export const ComponentName = (...) => { ... }` — **no default export**.
3. **Props type** — name **`ComponentNameProps`** (use `type` or `interface` per project style; prefer `import type { ... }` for type-only imports).
4. **File name** — **`ComponentName.tsx`** (PascalCase) next to **`ComponentName.scss`** when styles are needed.
5. **Styling**
   - Colocated **`ComponentName.scss`**; import with `import "./ComponentName.scss";`.
   - Use **`clsx`** for conditional `className` merging.
   - Follow existing SCSS: often `@use "../css/theme" as *;` or adjust the relative path to `css/theme` from the file depth; many UI classes live under **`.excalidraw`** (see `Button.scss`).
   - Reuse design primitives where appropriate: **`Button`**, **`Island`**, **`Stack`**, existing popovers, etc., instead of duplicating patterns.
6. **Copy / labels** — user-visible strings should use **`t("...")`** from **`../i18n`** or **`../../i18n`** depending on folder depth (`packages/excalidraw/i18n`), plus **`locales/en.json`** keys when adding new phrases; avoid hard-coded English for user-facing UI unless the user says otherwise.
7. **TypeScript** — strict: no **`any`**, no **`@ts-ignore`**.
8. **Tests** — if included, colocated **`ComponentName.test.tsx`** using existing **`vitest`** + **`@testing-library/react`** patterns (see `packages/excalidraw/components/Trans.test.tsx` or `dropdownMenu/DropdownMenu.test.tsx`).

## What to avoid

- Do not modify **protected** files (`Renderer.ts`, `restore.ts`, `manager.tsx`, `types.ts`) unless the user explicitly requires it and understands the cost — see **`.cursor/rules/do-not-touch.mdc`**.
- No **new npm dependencies** without explicit approval (**`AGENTS.md`**).
- No drive-by refactors in unrelated files; only what’s needed to wire the component if the user asked for integration.

## Deliverables

1. **`ComponentName.tsx`** — implementation + named export.
2. **`ComponentName.scss`** — if styled (or explain if using only utility classes).
3. Optional **`ComponentName.test.tsx`**.
4. If the component must be re-exported from **`packages/excalidraw/index.tsx`** or wired into **`LayerUI` / `App`**, do that **only when the user asked** for public API or integration; otherwise leave a short note on how to import it.

## Output

After creating files, give a **short summary**: paths created, props API, and any **follow-up** (e.g. add locale keys, export from package index, Storybook — only if the project already uses it).
