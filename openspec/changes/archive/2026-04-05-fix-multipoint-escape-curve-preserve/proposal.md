## Why

Pressing Escape while drawing a multi-point line or arrow still removes the in-progress element from the canvas instead of finalizing it with the committed points. That contradicts the intended “stop drawing, keep geometry” behavior and remains unresolved after earlier Escape-handling work. Coverage is also incomplete: the spec scenario for Escape after only one committed point is not exercised explicitly in `dragCreate.test.tsx`.

## What Changes

- Correct the Escape and pointer lifecycle so multi-point linear elements (lines, arrows, including multi-segment “curve” paths) are finalized—visible and non-deleted with all committed points—when the user presses Escape, rather than disappearing.
- Align `onKeyDownFromPointerDownHandler` / `onPointerUpFromPointerDownHandler` (and related finalize/cancel guards) so finalized multi-point elements are not deleted by a subsequent pointer-up or duplicate Escape handling.
- Add an explicit regression test in `packages/excalidraw/tests/dragCreate.test.tsx` for the **Escape after only one committed point** scenario from the spec (expected outcome: no meaningful multi-point geometry, element removed or deleted—per product rules).
- Add or strengthen tests for multi-point Escape finalization so the “disappearing curve” bug cannot regress.

## Capabilities

### New Capabilities

- `escape-multipoint-finalize`: Escape during multi-point linear drawing shall finalize the element with committed points (and defined behavior when only one point is committed); tests shall mirror spec scenarios including the single committed point case.

### Modified Capabilities

## Impact

- `packages/excalidraw/components/App.tsx` — Escape and pointer handlers for drawing / multi-element state.
- `packages/excalidraw/actions/actionFinalize.tsx` — finalize behavior when invoked from Escape during multi-point mode.
- `packages/excalidraw/tests/dragCreate.test.tsx` — new and updated tests for Escape during multi-point drawing and the one-committed-point scenario.
