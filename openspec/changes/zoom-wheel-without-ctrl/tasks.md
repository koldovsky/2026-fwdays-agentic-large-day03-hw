## 1. App state and persistence

- [x] 1.1 Add a boolean `AppState` field for “zoom with wheel without Ctrl/Cmd” (exact name aligned with codebase conventions), default `false`, with `browser: true` persistence metadata in `packages/excalidraw/appState.ts` (and any companion defaults/migration files used by this project).
- [x] 1.2 Wire storage hydration/dehydration if a central place lists migratable keys (follow patterns used by neighboring preferences).

## 2. Wheel behavior

- [x] 2.1 In `packages/excalidraw/components/App.tsx` `handleWheel`, implement routing per `design.md`: when the new preference is **on**, plain wheel → existing zoom branch; Shift+wheel → existing pan branch that today applies to plain wheel; when **off**, keep current control flow unchanged.
- [x] 2.2 Refactor minimally if needed (e.g. shared helper for the zoom block) so duplicate logic stays in sync; avoid touching protected files unless unavoidable and approved.

## 3. Settings UI and i18n

- [x] 3.1 Add a toggle in the appropriate editor/settings UI (same area as other canvas or editor preferences) bound to the new `AppState` field via existing `setAppState` / action patterns.
- [x] 3.2 Add English locale strings (and follow project i18n for any other required locales if the repo enforces them for new keys).

## 4. Tests and verification

- [x] 4.1 Add or extend tests under `packages/excalidraw/tests/` to assert wheel behavior with preference **off** matches prior pan/zoom semantics, and with preference **on** plain wheel zooms and Shift+wheel pans.
- [x] 4.2 Run `yarn test:typecheck` and relevant test targets; manual smoke-test canvas zoom/pan on the web app with both preference states.
