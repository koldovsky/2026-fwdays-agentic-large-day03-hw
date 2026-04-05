## 1. Fix element removal in Escape handler

- [x] 1.1 In `onKeyDownFromPointerDownHandler` in `packages/excalidraw/components/App.tsx` (~line 9460), replace `this.scene.mutateElement(this.state.newElement, { isDeleted: true })` with a `this.updateScene()` call that filters the element out of the array by ID, passes `appState: { newElement: null }`, and uses `captureUpdate: CaptureUpdateAction.NEVER`. Follow the exact pattern from `isInvisiblySmallElement` removal at ~line 10807.
- [x] 1.2 Remove the `!this.state.newElement.isDeleted` guard from the Escape `if` condition (no longer needed since the element is removed from the array entirely, not soft-deleted).
- [x] 1.3 Remove the explicit `this.scene.triggerUpdate()` call after the `setState` block (no longer needed since `updateScene` → `replaceAllElements` already calls `triggerUpdate` internally).
- [x] 1.4 In the `setState` calls (both locked and unlocked branches), remove `newElement: null` since it is now set by `updateScene`. Keep `selectedLinearElement: null`, `startBoundElement: null`, `cursorButton: "up"`, `suggestedBinding: null`, `snapLines`, and the `activeTool` reset (unlocked branch only).

## 2. Regression tests

- [x] 2.1 Update the existing "cancelled rectangle is not visible in scene elements" test in `packages/excalidraw/tests/dragCreate.test.tsx` to also verify that `h.elements.filter(el => !el.isDeleted)` has length 0 (confirming the element is truly gone from the non-deleted cache, not just soft-deleted).
- [x] 2.2 Add a test: after creating and finalizing a multi-point line (click-click-Escape), then pressing Escape again, the line remains in the scene with `isDeleted === false`. Then select another tool and draw a new element — verify the multi-point line is still present and not deleted.
- [x] 2.3 Verify the existing tests still pass: "line tool works after freedraw Escape cancel", "cursorButton is up and selectedLinearElement is null after Escape cancel".

## 3. Validation

- [x] 3.1 Run `yarn test:typecheck` to ensure no TypeScript errors.
- [x] 3.2 Run `yarn test:update` to ensure all tests pass.
