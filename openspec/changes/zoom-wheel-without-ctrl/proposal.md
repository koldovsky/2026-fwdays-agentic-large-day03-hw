## Why

Excalidraw currently zooms the canvas only when the user holds Ctrl (or Cmd on macOS) while scrolling; plain wheel movement pans the viewport. Many users—especially designers—expect an optional mode where the wheel zooms directly, matching tools they use elsewhere. [GitHub issue #10182](https://github.com/excalidraw/excalidraw/issues/10182) asks for this as a user-controlled preference so default behavior stays familiar for existing users.

## What Changes

- Add an **editor preference** (toggle) such as “Zoom with mouse wheel without Ctrl” (exact copy can follow existing settings patterns).
- When the preference is **on**, interpret **primary wheel gestures on the canvas** as zoom (at the pointer), consistent with current Ctrl+wheel zoom behavior, while preserving a way to **pan/scroll** the canvas (e.g. Shift+wheel for scroll, or documented alternative—final UX in design).
- When the preference is **off**, keep **current behavior**: Ctrl/Cmd+wheel zooms; plain wheel pans.
- Persist the preference where other editor toggles are stored (e.g. browser storage alongside similar settings).
- No **BREAKING** API changes to the public package contract unless we explicitly extend optional props; default embed behavior should remain unchanged unless the host opts in.

## Capabilities

### New Capabilities

- `wheel-zoom-preference`: User-visible preference and documented canvas wheel behavior (zoom vs pan) when the preference is on or off, including interaction with existing Ctrl+wheel zoom and pinch/trackpad semantics where applicable.

### Modified Capabilities

- _(none — `openspec/specs/` has no existing capability specs in this repo; behavior is introduced as a new capability spec.)_

## Impact

- **Primary implementation**: `packages/excalidraw/components/App.tsx` — `handleWheel` and related wheel handling (wheel is registered for non-passive `preventDefault` behavior).
- **App state / persistence**: `packages/excalidraw/appState.ts` and storage migration paths used for similar preferences (align with existing patterns; avoid touching protected files unless unavoidable—see project rules).
- **Settings UI**: Collocated with other editor preferences (e.g. settings dialog or sidebar—follow existing “canvas” or “editor” preference sections).
- **i18n**: New strings for the toggle label and any helper text.
- **Tests**: Wheel/scroll tests under `packages/excalidraw/tests/` (extend or add cases for both preference states).
