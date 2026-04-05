## 1. Core Escape Handler

- [x] 1.1 Add Escape key check at the top of `onKeyDownFromPointerDownHandler` in `packages/excalidraw/components/App.tsx`. When `event.key === KEYS.ESCAPE` and `this.state.newElement` exists and `this.state.multiElement === null`, execute cancellation logic instead of falling through to `maybeHandleResize`/`maybeDragNewGenericElement`.
- [x] 1.2 In the Escape branch: soft-delete the in-progress element by calling `this.scene.mutateElement(this.state.newElement, { isDeleted: true })`.
- [x] 1.3 In the Escape branch: call `setState` to clear `newElement: null`, `suggestedBindings: []`, `snapLines: []`. Reset `activeTool` to `preferredSelectionTool` unless `activeTool.locked` is true.

## 2. Event Listener Cleanup

- [x] 2.1 Extract a `removePointerDownListeners(pointerDownState)` helper (or inline the cleanup) that removes all four window event listeners (`onMove`, `onUp`, `onKeyDown`, `onKeyUp`) using `pointerDownState.eventListeners` references — same pattern as the end of `onPointerUpFromPointerDownHandler`.
- [x] 2.2 Call this cleanup from the Escape branch in `onKeyDownFromPointerDownHandler` so no window listeners remain after cancellation.
- [x] 2.3 Call `event.preventDefault()` and `event.stopPropagation()` in the Escape branch to prevent the event from reaching `App.onKeyDown` (which would trigger `actionDeselect` or other Escape handlers).

## 3. Freedraw-Specific Handling

- [x] 3.1 Verify that the Escape cancellation logic works for freedraw elements (`newElement.type === "freedraw"`). The same soft-delete + state clear path should apply since freedraw also uses `newElement` during drag.
- [x] 3.2 Verify that `onPointerMoveFromPointerDownHandler` and `onPointerUpFromPointerDownHandler` guard against `newElement` being null (in case a lingering pointermove fires after Escape). Add null checks if needed.

## 4. Linear Element Handling

- [x] 4.1 Verify that single-segment drag-created arrows and lines are cancelled by the new Escape handler (they use `newElement`, not `multiElement`, during drag).
- [x] 4.2 Verify that multi-point linear creation (`multiElement !== null`) is NOT affected — the `multiElement === null` guard in the Escape handler must skip this case, allowing `actionFinalize` to handle it as before.

## 5. Tests

- [x] 5.1 Add test in `packages/excalidraw/tests/dragCreate.test.tsx`: Escape during rectangle drag-create cancels creation and leaves no element in the scene.
- [x] 5.2 Add test: Escape during ellipse drag-create cancels creation.
- [x] 5.3 Add test: Escape during diamond drag-create cancels creation.
- [x] 5.4 Add test: Escape during freedraw drag cancels creation and leaves no element.
- [x] 5.5 Add test: Escape during single-segment arrow drag cancels creation.
- [x] 5.6 Add test: Escape during multi-point arrow creation (click-click-Escape) still finalizes the element (regression test).
- [x] 5.7 Add test: after Escape cancellation, subsequent element creation works normally (no ghost state).
- [x] 5.8 Add test: Escape with locked tool keeps the tool active after cancellation.

## 6. Validation

- [x] 6.1 Run `yarn test:typecheck` to ensure no TypeScript errors.
- [x] 6.2 Run `yarn test:update` to ensure all tests pass (existing and new). Note: all tests fail due to pre-existing `localStorage.clear is not a function` environment issue (Node.js v25 + jsdom). Verified by running unmodified test files (multiPointCreate.test.tsx) which also fail.
