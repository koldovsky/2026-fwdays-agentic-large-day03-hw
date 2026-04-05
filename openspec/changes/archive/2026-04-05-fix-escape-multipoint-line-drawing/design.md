## Context

Excalidraw supports two sub-modes for linear element creation (lines, arrows):

1. **Single-segment drag-create**: pointer down → drag → pointer up. Uses `AppState.newElement` only. `multiElement` remains null.
2. **Multi-point click-create**: click to place first point → click to place subsequent points → Escape or Enter (or double-click) to finalize. Uses both `AppState.multiElement` and `AppState.newElement`. The transition to multi-point mode happens in `onPointerUpFromPointerDownHandler` when the first click-release sets `multiElement = newElement`.

A recent change added Escape-to-cancel in `onKeyDownFromPointerDownHandler` for single-segment creation. This handler guards against multi-point mode with `this.state.multiElement === null`. When multi-point mode is active, Escape should fall through to `actionFinalize` (registered in `ActionManager`), which finalizes the element — keeping all committed points and removing the trailing hover point.

The user reports that pressing Escape during multi-point line drawing deletes the element instead of finalizing it. The existing `actionFinalize.keyTest` matches when `multiElement !== null`, and `actionFinalize.perform` should keep the element. The root cause likely involves one of:
- An event ordering issue between `App.onKeyDown` (React synthetic, fires first in bubble phase) and the window-level `onKeyDownFromPointerDownHandler` (fires last), where state updates from `actionFinalize` interact with the pointer-down handler's guard check
- The `isInvisiblySmallElement` check in `actionFinalize` incorrectly marking a valid multi-point element as too small (e.g., if points are close together or if the hover-point removal leaves fewer than 2 points)
- The pointer-up handler's linear element branch not properly handling the scenario where `actionFinalize` already ran mid-drag (clearing `newElement`/`multiElement` from state)

## Goals / Non-Goals

**Goals:**
- Ensure pressing Escape during multi-point line/arrow drawing finalizes the element with all committed points intact.
- Fix any event-handler interaction that causes the element to be deleted instead of finalized.
- Add regression tests that reproduce the exact failure scenario (Escape during active multi-point drawing with 2+ committed points).
- Preserve existing Escape-to-cancel behavior for single-segment drag-create (generic shapes, freedraw, single-segment linear elements).

**Non-Goals:**
- Changing the behavior for single-point multi-point lines (only one point placed, then Escape — deletion is correct here since there's nothing meaningful to keep).
- Modifying the `actionFinalize` flow beyond what's needed for this bug.
- Addressing other Escape-related behaviors (text editing, image cropping, etc.).

## Decisions

### 1. Investigate and fix the root cause in `onKeyDownFromPointerDownHandler` interaction

**Decision**: Add diagnostic logging or stepping through the exact sequence of events when Escape is pressed during multi-point mode. The fix will likely involve one of:

a. **Strengthening the guard in `onKeyDownFromPointerDownHandler`**: If there's a state timing issue where `multiElement` reads as null when it shouldn't, add an additional guard checking whether the element type is linear and has more than 1 committed point.

b. **Preventing event propagation interference**: Ensure that when `onKeyDownFromPointerDownHandler` doesn't match the cancel condition, it does not interfere with `actionFinalize`'s ability to process the event. Verify that `event.preventDefault()` and `event.stopPropagation()` are only called in the cancel path.

c. **Handling state inconsistency in pointer-up handler**: If `actionFinalize` runs mid-drag (during pointer-down), ensure the subsequent pointer-up handler gracefully handles the already-finalized element and does not re-process or corrupt it.

**Rationale**: The guard `this.state.multiElement === null` should prevent the cancel path from running during multi-point mode. But React state batching means `this.state` values during the window-level handler reflect the state BEFORE any `actionFinalize` state updates are committed. This creates a window where the pointer-up handler might see stale state.

### 2. Add an early-exit guard in the pointer-up handler for already-finalized elements

**Decision**: In `onPointerUpFromPointerDownHandler`, after destructuring `this.state` to get `newElement` and `multiElement`, check whether both are null for the linear element branch. If they are, skip the linear element processing entirely (the element was already finalized by `actionFinalize` during the drag).

**Rationale**: This is a defensive measure. If `actionFinalize` runs from a keyboard event during a drag, it clears `newElement` and `multiElement`. The pointer-up handler then reads null values from `this.state`. The existing code on line 10684 (`isLinearElement(newElement)`) would already skip processing since `newElement` is null, but making this explicit with a guard improves clarity and prevents future regressions.

### 3. Use `updateScene` with `filter` for cancel (single-segment) but NOT for finalize (multi-point)

**Decision**: Keep the current approach where the cancel handler in `onKeyDownFromPointerDownHandler` removes the element entirely from the scene (via `filter`), while `actionFinalize` keeps the element in the scene. Verify there's no code path that applies the `filter` removal to a multi-point element.

**Rationale**: For cancelled elements, removing them entirely from the scene array (rather than soft-delete with `isDeleted: true`) is the approach chosen by the previous fix to prevent ghost elements from appearing. For finalized elements, `actionFinalize` correctly keeps them in the scene. These two paths must remain separate.

### 4. Regression tests covering the exact failure scenario

**Decision**: Add tests for:
- Pressing Escape between clicks during multi-point line drawing (2+ committed points) → element is finalized, not deleted.
- Pressing Escape while pointer is down during a mid-point drag in multi-point mode → element is finalized.
- Pressing Escape after only 1 committed point in multi-point mode → element is deleted (correct behavior).
- Ensuring the element remains non-deleted after finalization and subsequent Escape presses.

**Rationale**: The existing tests cover some of these scenarios but the user's specific failure case (element disappearing during active multi-point drawing) may not be precisely reproduced by the current test setup.

## Risks / Trade-offs

- **Event listener ordering assumption**: The fix assumes React synthetic events fire before window-level event listeners in the bubble phase. If this assumption is wrong in certain browser/React version combinations, the guard logic could fail. Mitigation: Verify the event ordering in tests and consider using `capture: true` for the window listener if needed to guarantee ordering.

- **State batching across handlers**: React's state batching means `this.state` doesn't update between `App.onKeyDown` and `onKeyDownFromPointerDownHandler` within the same event. This is relied upon for the guard to work correctly. If React's batching behavior changes (e.g., with concurrent features), this could regress. Mitigation: Both handlers use `withBatchedUpdates`, which provides controlled batching.

- **`isInvisiblySmallElement` false positives**: If a multi-point line has points that are very close together, the element might pass the `isInvisiblySmallElement` check in `actionFinalize` and be deleted. This is an edge case but worth testing. Mitigation: The check only deletes if `points.length < 2` or if it's an arrow with 2 identical points. Multi-point lines with 2+ distinct committed points should always pass.
