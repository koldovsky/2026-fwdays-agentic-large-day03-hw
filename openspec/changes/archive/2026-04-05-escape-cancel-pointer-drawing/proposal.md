## Why

When a user accidentally starts drawing (wrong tool selected or misclick on canvas), there is no way to cancel mid-creation. They must finish creating the element and then delete it. This adds friction and breaks expected drawing flow, especially during fast sketching sessions. Most modern whiteboard/design tools allow Escape to cancel an in-progress draw action -- users expect this as a standard interaction pattern.

## What Changes

- Add Escape key handling during pointer-drag creation to cancel in-progress element creation (shapes, freedraw, single-segment arrows/lines).
- Remove the partially-created element from the scene, reset interaction state (`newElement`, snap lines, suggested bindings), and clean up window-level event listeners.
- Preserve existing Escape behavior for multi-point linear creation mode (polyline/multi-point arrow), where Escape already finalizes the element via `actionFinalize`.
- Add automated tests covering cancellation for generic shapes, freedraw, and non-regression for multi-point linear elements.

## Capabilities

### New Capabilities
- `escape-cancel-creation`: Cancel in-progress pointer-based element creation by pressing Escape. Covers drag-create shapes (rectangle, ellipse, diamond, frame), freedraw strokes, and single-segment linear elements (arrow, line). Cleans up scene and interaction state without leaving partial elements.

### Modified Capabilities

## Impact

- `packages/excalidraw/components/App.tsx` -- primary change site: `onKeyDownFromPointerDownHandler` needs Escape handling; cleanup logic modeled after existing "too small element" removal in `onPointerUpFromPointerDownHandler`.
- `packages/excalidraw/actions/actionFinalize.tsx` -- must NOT be affected for multi-point linear mode (`multiElement !== null`); verify no regression.
- `packages/excalidraw/tests/dragCreate.test.tsx` -- new test cases for Escape cancellation.
- `packages/element/src/Scene.ts` -- element removal via existing APIs (soft-delete or filter).
- No API/dependency changes. No breaking changes.
