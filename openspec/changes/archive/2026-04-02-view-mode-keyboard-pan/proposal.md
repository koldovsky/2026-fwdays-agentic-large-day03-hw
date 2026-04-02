## Why

In view mode, users can only pan with pointer or wheel; keyboard navigation is missing. [excalidraw#6688](https://github.com/excalidraw/excalidraw/issues/6688) asks for arrow-key panning with diagonal support and smooth acceleration/deceleration (Miro-like), so presentations and read-only review feel natural without grabbing the canvas.

## What Changes

- When `viewModeEnabled` is true, ArrowLeft/Right/Up/Down pan the canvas (consistent with existing scroll conventions).
- Holding two perpendicular arrows pans diagonally (combined direction vector).
- Movement eases in on key press and eases out on release (small decay), not instant start/stop.
- Arrow keys must not steal focus from editable fields (inputs, wysiwyg); existing keyboard shortcuts and action manager behavior stay valid where they already apply in view mode.

## Capabilities

### New Capabilities

- `view-mode-keyboard-pan`: Keyboard-driven canvas panning in view mode only, including diagonal combined input and eased velocity over time.

### Modified Capabilities

- _(none — no existing OpenSpec capability specs in this repo to delta)_

## Impact

- Primary: `packages/excalidraw/components/App.tsx` (keydown/keyup or a small pan controller, integration with `translateCanvas` / scroll state, view-mode guards).
- Tests: extend or add cases in `packages/excalidraw/tests/viewMode.test.tsx` (or nearby) for arrow pan, diagonal, and non-capture when typing in inputs.
- No public npm API change unless documented keyboard behavior is considered part of embed contract (behavioral enhancement only).
