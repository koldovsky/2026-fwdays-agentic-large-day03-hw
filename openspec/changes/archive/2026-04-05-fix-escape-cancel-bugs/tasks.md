## 1. Extend Escape cancel state cleanup

- [x] 1.1 In `onKeyDownFromPointerDownHandler` Escape branch in `packages/excalidraw/components/App.tsx` (~line 9460), add `selectedLinearElement: null` and `startBoundElement: null` to both `setState` calls (locked and unlocked tool paths).
- [x] 1.2 Add `cursorButton: "up"` to the `setState` calls in the Escape branch so pointer state is not left as "down".
- [x] 1.3 After the `setState` call, add `this.scene.triggerUpdate()` to force a re-render cycle ensuring the soft-deleted element disappears from the canvas immediately.

## 2. Strengthen newElement guard

- [x] 2.1 Change the Escape guard condition from `this.state.newElement` to `this.state.newElement && !this.state.newElement.isDeleted` to prevent the cancel handler from acting on already-deleted or finalized elements.

## 3. Regression tests

- [x] 3.1 Add a test in `packages/excalidraw/tests/dragCreate.test.tsx` that verifies: after Escape-cancelling a freedraw stroke, switching to line tool and clicking creates a line normally (no stuck state).
- [x] 3.2 Add a test that verifies: after creating a multi-point line and finalizing it, pressing Escape does not delete the finalized line.
- [x] 3.3 Add a test that verifies: after Escape-cancelling a rectangle drag-create, the rectangle is not visible in the scene elements (element count check or `isDeleted` check).
- [x] 3.4 Add a test that verifies: `cursorButton` is `"up"` and `selectedLinearElement` is null after Escape cancellation.
