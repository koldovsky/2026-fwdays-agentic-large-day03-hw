## Why

When drawing a multi-point (curved) arrow inside a closed shape (e.g., a rounded rectangle), the arrow is immediately finalized on the second click instead of allowing intermediate points. This happens because the binding finalization logic in `handleLinearElementOnPointerDown` and `handleCanvasPointerMove` detects the enclosing shape as a hovered binding target and auto-finalizes the arrow. Curved arrows work correctly outside shapes and plain lines work correctly inside shapes, confirming the issue is specific to arrow binding logic during multi-point creation. (GitHub issue excalidraw/excalidraw#10661)

## What Changes

- Modify the arrow finalization check during multi-point arrow creation to exclude the element that the arrow is already start-bound to. When the user clicks inside the same shape the arrow started in, the arrow should not be finalized — it should add a new point instead.
- Apply the same fix to both the `handleCanvasPointerMove` (mouse move preview) and `handleLinearElementOnPointerDown` (click to add point) code paths in `App.tsx`.

## Capabilities

### New Capabilities
- `arrow-curve-inside-shape`: Fix arrow multi-point creation inside closed shapes by preventing premature finalization when the hovered binding target is the arrow's existing start-bound element.

### Modified Capabilities

## Impact

- `packages/excalidraw/components/App.tsx` — Two code paths affected:
  - `handleCanvasPointerMove` (~line 6905-6922): hover detection auto-finalizes arrow when inside a shape
  - `handleLinearElementOnPointerDown` (~line 9066-9087): click handler auto-finalizes arrow when `hoveredElementForBinding` matches enclosing shape
- `packages/element/src/collision.ts` — `getHoveredElementForBinding` may need an optional exclusion parameter, or the filtering can be done at the call site
- No API/dependency changes. No breaking changes.
