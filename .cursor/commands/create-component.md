# Create component

Create or extend a **React UI component** in this monorepo following Excalidraw patterns. Prefer **packages/excalidraw** for editor UI; use **excalidraw-app/** only for app-shell concerns (routing, hosting-specific UI).

## Before coding

1. **Locate** the right folder: colocate with siblings; check similar components for file naming (`PascalCase.tsx` for components) and export style.
2. **Read** nearby code and `.cursor/rules/` (architecture, conventions, `excalidraw-app` if under that tree).
3. **State**: editor/document state must stay on **`AppState`** and update via **actionManager** — do not add Redux/Zustand/MobX for canvas/editor state.

## Implementation checklist

- Functional component + hooks; props type named `{Name}Props`
- **Named export** for new components (match rule: no default exports for new code)
- **i18n**: add strings to `packages/excalidraw/locales/en.json` (and follow existing locale patterns) for user-visible strings where sibling components use i18n
- **Tests**: colocate `ComponentName.test.tsx`; use `packages/excalidraw/tests/test-utils.ts` helpers; Vitest + Testing Library only (`vi` not `jest`)
- **Types**: strict TypeScript — no `any`, no `@ts-ignore` unless unavoidable and called out
- Do **not** draw the scene with React DOM — canvas stays in the render pipeline

## Output

- List files created/changed
- Brief note how the component receives data and dispatches updates (props, callbacks, or actions)
- Any follow-ups (a11y, feature flags) as separate bullets if needed

## How to verify

1. `yarn test:typecheck` — no TypeScript errors.
2. `yarn test --watch=false` — tests pass; new test file named `*.test.tsx` and uses Vitest patterns from `.cursor/rules/testing.mdc`.
3. `yarn fix` — formatting/lint clean for touched files (or equivalent project lint command if the user’s branch differs).
4. Manual: run the app (`yarn start` or project-standard dev command) and smoke-test the new UI in the intended surface (editor vs app shell).
