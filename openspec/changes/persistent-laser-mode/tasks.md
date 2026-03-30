## 1. AppState Changes

- [x] 1.1 Add `laserToolPersistence: boolean` field (default `false`) to the `AppState` type in `packages/excalidraw/types.ts`
- [x] 1.2 Add `laserToolPersistence` to the initial app state in `packages/excalidraw/appState.ts` with value `false`
- [x] 1.3 Add `laserToolPersistence` to the browser-storage persistence list so the setting survives page reloads

## 2. Laser Trail Rendering

- [x] 2.1 In `packages/excalidraw/laser-trails.ts`, update `LaserTrails` to accept/read `AppState.laserToolPersistence` when computing `sizeMapping`
- [x] 2.2 Modify `sizeMapping` to return `1` (no decay) when `laserToolPersistence === true`, preserving the existing decay logic otherwise
- [x] 2.3 Update `onFrame` in `packages/excalidraw/animated-trail.ts` to skip filtering out `pastTrails` when persistence is enabled (so trails are never removed by the animation loop)
- [x] 2.4 Add a `clearTrails()` method to `LaserTrails` that empties `pastTrails` and aborts any in-progress `currentTrail`

## 3. Keyboard Shortcut — Clear Trails

- [x] 3.1 In `packages/excalidraw/components/App.tsx`, add a `keydown` handler that calls `this.laserTrails.clearTrails()` when the laser tool is active, persistence is on, and the key is Delete or Backspace

## 4. UI — Toggle and Clear Action

- [x] 4.1 In `packages/excalidraw/components/Actions.tsx`, add a `DropdownMenu.ItemCheckbox` for "Persistent laser" in the laser tool dropdown, wired to `AppState.laserToolPersistence`
- [x] 4.2 Add a `DropdownMenu.Item` "Clear laser trails" below the toggle, visible only when `laserToolPersistence === true`, that calls `laserTrails.clearTrails()`

## 5. Internationalisation

- [x] 5.1 Add `"laserPersist": "Persistent laser"` to `packages/excalidraw/locales/en.json`
- [x] 5.2 Add `"laserClear": "Clear laser trails"` to `packages/excalidraw/locales/en.json`
- [x] 5.3 Use the new i18n keys (`t("toolBar.laserPersist")` / `t("toolBar.laserClear")`) in the UI components added in task 4

## 6. Tests

- [x] 6.1 Add a unit test verifying that `sizeMapping` returns `1` for all points when `laserToolPersistence === true`
- [x] 6.2 Add a unit test verifying that `clearTrails()` empties all trails
- [x] 6.3 Add an integration test (or extend existing laser tests) confirming the toggle persists across simulated page reloads via browser storage
