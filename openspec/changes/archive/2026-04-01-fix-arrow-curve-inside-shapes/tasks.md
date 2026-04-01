## 1. Fix pointer-down finalization path

- [x] 1.1 In `handleLinearElementOnPointerDown` (App.tsx ~line 9066-9087), after `getHoveredElementForBinding` returns a result, add a check: if `hoveredElementForBinding.id === multiElement.startBinding?.elementId`, treat `hoveredElementForBinding` as null (skip finalization)
- [x] 1.2 Verify that clicking inside the start-bound shape adds a new point instead of finalizing

## 2. Fix pointer-move auto-finalization path

- [x] 2.1 In `handleCanvasPointerMove` (App.tsx ~line 6905-6922), after `getHoveredElementForBinding` returns a result, add the same check: if the hovered element matches the arrow's `startBinding.elementId`, skip the finalization branch
- [x] 2.2 Verify that mouse movement inside the start-bound shape does not auto-finalize the arrow

## 3. Testing

- [x] 3.1 Write a test: create an arrow inside a rectangle, add intermediate points — assert the arrow has multiple points and is not prematurely finalized
- [x] 3.2 Write a test: create an arrow starting inside shape A, end on shape B — assert finalization and end-binding to shape B works correctly
- [x] 3.3 Write a test: create an arrow inside a shape and double-click or click in commit zone — assert normal finalization still works
- [x] 3.4 Run existing arrow and binding test suites to verify no regressions (`yarn test:app --watch=false`)
- [x] 3.5 Run build: run `yarn build` and confirm no build errors
