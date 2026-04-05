## Context

Excalidraw's pointer-based element creation follows a three-phase lifecycle: pointer down (creates element and inserts it into the scene), pointer move (mutates element geometry via window-level event listeners), and pointer up (finalizes or discards if too small). During the drag phase, a dedicated `onKeyDownFromPointerDownHandler` handles modifier keys (Shift for aspect ratio, Alt for center-resize) but does not handle Escape.

The element is already in `Scene` from the moment of `pointerDown` via `scene.insertElement()`, with `AppState.newElement` pointing to it. The `Store` commits snapshots in `componentDidUpdate`, meaning a cancellation before the next render cycle should leave no undo history entry for the cancelled element.

Three creation flows exist: generic shapes (rectangle, ellipse, diamond, frame), freedraw strokes, and linear elements (arrow, line). Linear elements have two sub-modes: single-segment drag-create (uses `newElement`) and multi-point click-create (uses `multiElement`). Escape already finalizes multi-point creation via `actionFinalize` and must not be altered.

## Goals / Non-Goals

**Goals:**
- Allow users to press Escape during a pointer-drag creation gesture to cancel and discard the in-progress element.
- Clean up all interaction state: `newElement`, snap lines, suggested bindings, window event listeners.
- Cover generic shapes, freedraw, and single-segment linear elements.
- Preserve existing multi-point linear Escape behavior (finalize, not cancel).
- Automated test coverage for all affected flows.

**Non-Goals:**
- Changing Escape behavior for multi-point linear creation (polylines, multi-point arrows).
- Adding cancel support for text element creation (handled by separate WYSIWYG editor with its own Escape).
- Adding cancel support for image placement or other non-pointer-drag flows.
- Undo/redo integration for cancelled elements (cancelled = never happened, no undo entry).

## Decisions

### 1. Intercept Escape in `onKeyDownFromPointerDownHandler`

**Decision**: Add Escape handling at the top of `onKeyDownFromPointerDownHandler` in `App.tsx`, before the existing `maybeHandleResize` and `maybeDragNewGenericElement` calls.

**Rationale**: This handler is the window-level keydown listener active only during a pointer-drag gesture. It's the natural place to intercept keys during creation. The main `App.onKeyDown` handler on the container div would also fire, but adding logic there would require additional state checks and could conflict with existing `actionFinalize`/`actionDeselect` routing.

**Alternatives considered**:
- *New action in ActionManager*: Would require a new `keyTest` predicate, but actions are designed for UI-triggered commands, not mid-gesture interception. The window-level handler runs before action dispatch, making this unnecessarily complex.
- *Intercept in `App.onKeyDown`*: Would work but requires guarding against the many existing Escape branches and ensuring the window listeners are still cleaned up. Less clean than handling it where the gesture is managed.

### 2. Remove element via `scene.mutateElement` with `isDeleted: true`

**Decision**: Soft-delete the in-progress element by setting `isDeleted: true` rather than filtering it out of the elements array.

**Rationale**: Soft-delete is the standard Excalidraw pattern for element removal. It works with the existing `getNonDeletedElements()` filtering, collaboration sync, and avoids the overhead of `replaceAllElements`. The existing "too small element" removal in `onPointerUpFromPointerDownHandler` uses the same pattern (via `isInvisiblySmallElement` check).

**Alternatives considered**:
- *`replaceAllElements` with filtered array*: Works but is heavier -- triggers full scene rebuild and is not the idiomatic pattern for single-element removal.

### 3. Simulate pointer-up cleanup path

**Decision**: After soft-deleting the element, perform the same cleanup as the pointer-up handler: remove window event listeners, clear `newElement`, `suggestedBindings`, `snapLines`, and reset `activeTool` to `preferredSelectionTool` (unless tool is locked).

**Rationale**: The pointer-up handler already handles all edge cases for cleanup. By replicating its cleanup steps (or extracting a shared helper), we ensure no ghost state. We cannot literally dispatch a synthetic `pointerup` because the element would still be finalized by the up handler.

### 4. Guard multi-point linear mode

**Decision**: The Escape handler in `onKeyDownFromPointerDownHandler` must check that `multiElement === null` before cancelling. If `multiElement` is set, Escape should be ignored in this handler so it falls through to `actionFinalize` via the normal `App.onKeyDown` path.

**Rationale**: Multi-point linear creation (click-to-add-points mode) uses `multiElement` state and Escape already means "finish creating this element." Changing that behavior would break the established UX documented in the issue's compatibility note.

### 5. Handle tool-locked mode

**Decision**: If the tool is locked (`activeTool.locked === true`), cancellation should keep the tool active instead of resetting to selection. Only clear `newElement` and the in-progress element.

**Rationale**: Locked tools indicate the user wants to create multiple elements of the same type. Cancelling one accidental drag shouldn't force them to re-select the tool.

## Risks / Trade-offs

- **Race condition with Store commit**: If `componentDidUpdate` fires between Escape keydown and our cleanup `setState`, the Store could capture the now-deleted element as a durable increment, creating a spurious undo entry. Mitigation: The cleanup runs synchronously inside `withBatchedUpdates`, so React should batch the state change with the deletion, preventing an intermediate commit.

- **Event listener leak**: If the cleanup path misses removing any window listener, the next pointer gesture could have doubled handlers. Mitigation: Reuse the same `pointerDownState.eventListeners` references that the pointer-up handler uses for removal. Extract a shared `removePointerDownEventListeners` helper if needed.

- **Free draw specifics**: Freedraw uses `actionFinalize` on pointer up rather than the generic cleanup path. Cancellation during freedraw drag should soft-delete and clear state without calling `actionFinalize` (which would try to finalize the deleted element). Verify that the freedraw branch in `onPointerMoveFromPointerDownHandler` guards against `newElement` being null after cancellation.
