## Why

When pressing Escape during multi-point line or arrow drawing (click-to-add-points mode), the element disappears from the canvas instead of being finalized. The expected behavior is that Escape should stop drawing and keep the line with all committed points — matching the existing `actionFinalize` semantics. This regression was likely introduced by the recent Escape-to-cancel feature for single-segment pointer-drag creation, which added an Escape handler in `onKeyDownFromPointerDownHandler` that may interfere with the multi-point finalization flow.

## What Changes

- Fix the interaction between the new `onKeyDownFromPointerDownHandler` Escape handler and the existing `actionFinalize` action so that multi-point linear elements (lines, arrows) are properly finalized — not deleted — when Escape is pressed.
- Ensure the pointer-up handler (`onPointerUpFromPointerDownHandler`) does not inadvertently delete or corrupt a multi-point element that was already finalized by `actionFinalize` during a mid-drag Escape press.
- Add or update regression tests that specifically cover pressing Escape while the pointer is down during a multi-point drag (not just between clicks).

## Capabilities

### New Capabilities

- `escape-multipoint-finalize`: Ensure Escape during multi-point linear element drawing finalizes the element with all committed points instead of deleting it.

### Modified Capabilities


## Impact

- `packages/excalidraw/components/App.tsx` — `onKeyDownFromPointerDownHandler` and `onPointerUpFromPointerDownHandler` methods.
- `packages/excalidraw/actions/actionFinalize.tsx` — verify perform logic correctly handles the mid-drag multi-point Escape case.
- `packages/excalidraw/tests/dragCreate.test.tsx` — add/update regression tests for multi-point Escape during active drag.
