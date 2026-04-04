## Why

Users in view mode have no way to pan the canvas using the keyboard. This forces reliance on mouse/trackpad scrolling or touch gestures, which is limiting for accessibility, presentation workflows, and keyboard-centric users. Arrow-key panning with momentum (similar to Miro) would make navigation feel fluid and natural.

GitHub issue: https://github.com/excalidraw/excalidraw/issues/6688

## What Changes

- Add arrow key listeners (Up/Down/Left/Right) that pan the canvas when in view mode
- Support simultaneous key presses for diagonal movement (e.g., Up+Left)
- Implement momentum/decay animation so panning eases in on key press and eases out on key release, rather than stopping abruptly
- Panning updates `scrollX`/`scrollY` in AppState via the existing state management pattern

## Capabilities

### New Capabilities

- `keyboard-pan`: Arrow-key canvas panning with momentum in view mode. Covers key event handling, velocity accumulation, diagonal movement, and decay animation.

### Modified Capabilities

_(none)_

## Impact

- **Code**: `packages/excalidraw/components/App.tsx` (onKeyDown/onKeyUp handlers), potentially a new animation utility or action
- **APIs**: No public API changes; internal AppState `scrollX`/`scrollY` usage only
- **Dependencies**: No new dependencies; uses existing `requestAnimationFrame` patterns and `easeToValuesRAF` utilities
- **Systems**: View mode only; no impact on edit mode behavior or collaboration
