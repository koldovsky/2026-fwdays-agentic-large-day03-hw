## Why

The laser pointer tool currently fades automatically after a few seconds, making it difficult for presenters, teachers, and collaborators to keep attention on specific areas for extended periods. A persistent mode would allow users to choose whether laser trails remain visible until explicitly cleared.

## What Changes

- Add a `laserToolPersistence` boolean to `AppState` (default: `false`, preserving current behavior)
- Modify laser trail rendering to skip time/length decay when persistence is enabled
- Add a toggle UI in the laser tool dropdown menu to enable/disable persistent mode
- Add a "Clear laser trails" action (visible only when persistence is on)
- Support clearing persistent trails via Delete/Backspace when the laser tool is active
- Persist the `laserToolPersistence` setting in browser storage
- Add i18n keys for new UI strings (`laserPersist`, `laserClear`)

## Capabilities

### New Capabilities

- `persistent-laser`: Laser pointer mode where drawn trails remain on the canvas until explicitly cleared, with a toggle to switch between temporary (fade) and persistent behavior

### Modified Capabilities

_(none — existing fade behavior is unchanged when persistence is off)_

## Impact

- **`packages/excalidraw/`**: `AppState` type, laser trail rendering logic (`LaserTrails`), action definitions (`Actions.tsx`), `App.tsx` keyboard handling
- **Locales**: `packages/excalidraw/locales/en.json` (new i18n keys)
- **Browser storage**: new persisted key for `laserToolPersistence`
- No breaking changes; default behavior is preserved
