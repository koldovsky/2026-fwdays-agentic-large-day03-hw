## Why

After leaving a shape tool with `Esc`, users can still expect drawing behavior and may not realize they are back in selection mode. The app currently relies on cursor and selection rectangle cues, but this transition can still feel ambiguous in quick keyboard-first workflows.

## What Changes

- Add explicit, lightweight feedback when a user attempts to draw immediately after exiting a drawing tool to selection mode via `Esc`.
- Keep feedback non-blocking and rate-limited so it does not spam during normal selection drags.
- Preserve existing selection behavior (box selection, cursor updates, and shortcuts) while improving discoverability of current mode.
- Add focused tests for escape-to-selection transition and first drag interaction feedback.

## Capabilities

### New Capabilities
- `tool-deactivation-feedback`: Provides immediate UX feedback when a draw-like gesture occurs after tool deactivation and no drawing tool is active.

### Modified Capabilities
- None.

## Impact

- Affected package: `packages/excalidraw`.
- Primary code paths: keyboard tool switching and pointer drag handling in `components/App.tsx`; user hint/notification surface in `components/HintViewer.tsx` and/or `components/Toast.tsx` flow via `AppState.toast`.
- Localization impact: new user-facing string keys in `packages/excalidraw/locales/en.json` (and follow-up translation sync for other locales).
- Test impact: `packages/excalidraw/tests` (likely `dragCreate.test.tsx` and/or `tool.test.tsx`).
