## Context

The Escape-to-cancel feature for in-progress pointer drawing was implemented in `onKeyDownFromPointerDownHandler` in `App.tsx`. The handler uses `scene.mutateElement(el, { isDeleted: true })` to soft-delete the element. However, `mutateElement` only mutates the element object in-place and calls `triggerUpdate()` — it does not call `replaceAllElements()`, so the Scene's `nonDeletedElements` cache is never rebuilt. The renderer reads from this stale cache and continues drawing the element.

Excalidraw's Scene class maintains two layers:
- `elements` — the full array including deleted elements
- `nonDeletedElements` / `nonDeletedElementsMap` — cached pre-filtered views rebuilt only inside `replaceAllElements()`

The `mutateElement` method is designed for geometry/style mutations during drag, where the element stays in the non-deleted set. For actual removal, the codebase uses `updateScene()` with a filtered elements array (see `isInvisiblySmallElement` handling at ~line 10802 of `App.tsx`).

## Goals / Non-Goals

**Goals:**
- Make the in-progress element disappear from the canvas immediately when Escape is pressed during drag-create.
- Preserve the multi-point guard so that Escape during multi-point creation falls through to `actionFinalize` and finalized multi-point elements are never deleted.
- Keep the state cleanup additions (`selectedLinearElement`, `startBoundElement`, `cursorButton`) from the previous fix.
- Maintain test coverage for all cancel flows.

**Non-Goals:**
- Changing the `Scene.mutateElement` API to rebuild the cache on `isDeleted` changes (would affect the entire codebase).
- Changing the tool-reset-to-selection behavior after normal drawing completion (that is standard Excalidraw UX).
- Adding undo entries for cancelled elements.

## Decisions

### 1. Use `updateScene` with filtered elements array instead of `mutateElement`

**Decision**: Replace `this.scene.mutateElement(this.state.newElement, { isDeleted: true })` with `this.updateScene({ elements: filteredArray, ... })`, filtering out the in-progress element by ID.

**Rationale**: `updateScene` calls `replaceAllElements` under the hood, which rebuilds the `nonDeletedElements` cache. This is the exact pattern used elsewhere in Excalidraw for element removal — see `isInvisiblySmallElement` handling in `onPointerUpFromPointerDownHandler` (~line 10807):
```
this.updateScene({
  elements: this.scene
    .getElementsIncludingDeleted()
    .filter((el) => el.id !== newElement.id),
  appState: { newElement: null },
  captureUpdate: CaptureUpdateAction.NEVER,
});
```

**Alternatives considered**:
- *Calling `replaceAllElements` after `mutateElement`*: Works but is redundant — `updateScene` handles both the element array update and state cleanup in one call.
- *Patching `Scene.mutateElement` to rebuild cache on `isDeleted` changes*: Too invasive; would change behavior for every `mutateElement` call across the codebase and could introduce performance regressions.

### 2. Use `CaptureUpdateAction.NEVER` for the cancelled element

**Decision**: Pass `captureUpdate: CaptureUpdateAction.NEVER` to `updateScene` so the cancelled element creates no undo history entry.

**Rationale**: A cancelled element should be as if it never existed. The same pattern is used for removing invisibly-small elements. The `Store` should not capture a snapshot for an element that was never finalized.

### 3. Consolidate state cleanup into `updateScene`'s `appState` parameter

**Decision**: Move `newElement: null` into the `updateScene` call's `appState` parameter. Keep the remaining state cleanup (`selectedLinearElement`, `startBoundElement`, `cursorButton`, `suggestedBinding`, `snapLines`, `activeTool`) in a separate `setState` call after `updateScene`.

**Rationale**: `updateScene` accepts an `appState` partial, which is merged atomically with the element update. Setting `newElement: null` there ensures consistency — the element is removed from the array and `newElement` is cleared in the same operation. The remaining state properties (tool reset, cursor, etc.) are set in a follow-up `setState` to keep the `updateScene` call focused on element removal.

### 4. Preserve multi-point guard unchanged

**Decision**: Keep the existing guard: `this.state.newElement && this.state.multiElement === null`. The `!this.state.newElement.isDeleted` check from the previous fix is no longer needed since we're removing the element from the array entirely (not soft-deleting).

**Rationale**: When `multiElement` is set, Escape should fall through to `actionFinalize` which finalizes the multi-point line. Our handler must not interfere. The `isDeleted` guard was only needed because `mutateElement` left the element in the cache — with `updateScene`, the element is gone entirely.

### 5. Remove explicit `triggerUpdate()` call

**Decision**: Remove the `this.scene.triggerUpdate()` call that was added after `setState` in the previous fix.

**Rationale**: `updateScene` → `replaceAllElements` already calls `triggerUpdate()` internally. The extra call is redundant and was only added as a workaround for the stale cache problem.

## Risks / Trade-offs

- **Element physically removed vs soft-deleted**: By filtering the element out of the array entirely (instead of keeping it with `isDeleted: true`), we deviate slightly from the "soft-delete" pattern. However, this matches the `isInvisiblySmallElement` precedent and is appropriate since the element was never finalized — it should leave no trace. Risk is minimal.

- **`updateScene` overhead**: `updateScene` → `replaceAllElements` rebuilds the full `nonDeletedElements` cache by iterating all elements. For typical scenes this is fast, and it only happens once on Escape press (not per frame). No performance concern.

- **Lingering pointer events after Escape**: After removing the window listeners, a `pointerup` event may still fire via the React handler on the canvas. This is safe — `handleCanvasPointerUp` only updates pointer tracking state and does not interact with the now-removed element or `newElement` (which is null). Verified by inspecting the handler at ~line 7924.
