## 1. State and actions

- [x] 1.1 Confirm approach for storing `Temporary` vs `Persistent` mode (minimal `AppState` / action change with maintainer approval if `types.ts` or `manager.ts` must change; document fallback if not).
- [x] 1.2 Implement state field and update path (e.g. `actionManager.dispatch`) so mode is readable from `App` where `LaserTrails` runs.
- [x] 1.3 Define behavior when switching **Persistent → Temporary** (clear persistent trails per design) and implement the transition.

## 2. Rendering

- [x] 2.1 Refactor or branch `LaserTrails.getTrailOptions()` so **Persistent** mode uses non-decaying `sizeMapping` (or equivalent) while **Temporary** keeps current `DECAY_TIME` / length behavior.
- [x] 2.2 Ensure `AnimatedTrail` / `LaserPointer` options stay consistent for local trails when mode toggles; avoid stale trails with wrong decay rules.
- [x] 2.3 Wire collaboration: keep remote laser behavior as today unless explicitly extending pointer payload (per design v1 scope).

## 3. UI and i18n

- [x] 3.1 Add laser mode toggle (Temporary / Persistent) in the laser tool context (toolbar / popover / collab bar) matching existing UI patterns.
- [x] 3.2 Add **Clear laser marks** (or equivalent) visible when persistent strokes exist; call into trail clearing (`clearTrails` or equivalent).
- [x] 3.3 Add localization keys and English strings; follow existing `t(...)` patterns.

## 4. Verification

- [x] 4.1 Extend or add tests in `packages/excalidraw/tests/laser.test.tsx` (or colocated tests) for default temporary behavior, persistent visibility, clear, and mode switch.
- [x] 4.2 Run `yarn test:typecheck` and targeted `yarn test:app` (or `yarn test:all` if core paths touched).
- [x] 4.3 Manual QA: laser on/off, collab bar if applicable, zoom/pan with persistent strokes.
- [x] 4.4 Run `yarn build` from the repo root and confirm a successful production build for the monorepo and `@excalidraw/excalidraw` packaging (persistent-laser changes should not break the library or app build).
