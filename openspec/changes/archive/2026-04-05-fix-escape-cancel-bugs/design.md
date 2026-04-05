## Context

The `escape-cancel-pointer-drawing` change added an Escape handler inside `onKeyDownFromPointerDownHandler` in `App.tsx` (line ~9456). The handler fires when `event.key === KEYS.ESCAPE && this.state.newElement && this.state.multiElement === null`, soft-deletes the element, removes window listeners, and clears `newElement` / `suggestedBinding` / `snapLines`.

Three bugs were discovered after the initial implementation:

1. **Element doesn't disappear** — after Escape, the in-progress shape sometimes stays visible on canvas.
2. **Line tool broken after freedraw cancel** — after Escape-cancelling a freedraw stroke, switching to line tool and clicking produces no line.
3. **Previous multipoint deleted** — pressing Escape again after the failed line attempt deletes a previously finalized multi-point line.

All three are symptoms of **incomplete state cleanup** in the Escape cancel branch.

## Goals / Non-Goals

**Goals:**
- Make the Escape cancel branch fully reset all interaction state so subsequent tool use works cleanly.
- Prevent the cancel branch from ever acting on finalized elements.
- Ensure the soft-deleted element disappears from the canvas immediately.
- Add regression tests for the exact bug sequences.

**Non-Goals:**
- Changing the cancel handler's overall architecture (it stays in `onKeyDownFromPointerDownHandler`).
- Modifying multi-point Escape finalization via `actionFinalize`.
- Adding new cancel capabilities beyond what was originally scoped.

## Decisions

### 1. Add `startBoundElement`, `selectedLinearElement`, and `cursorButton` to Escape cleanup

**Decision**: Extend the `setState` call in the Escape branch to also clear `startBoundElement: null`, `selectedLinearElement: null`, and set `cursorButton: "up"`.

**Rationale**: The original cancel branch only clears `newElement`, `suggestedBinding`, and `snapLines`. But `handleLinearElementOnPointerDown` (line ~9170) and `handleFreeDrawElementOnPointerDown` also set `selectedLinearElement` and `startBoundElement` during pointer-down. When Escape cancels the creation, these are left stale. On the next pointer-down for line creation, `handleLinearElementOnPointerDown` sees `selectedLinearElement` still set and enters the wrong branch, or `startBoundElement` interferes with binding logic. Similarly, `cursorButton` remains `"down"` because the normal `pointerUp` path (which sets it to `"up"`) never runs.

**Alternatives considered**:
- *Dispatch synthetic pointerup*: Would trigger finalization logic on the deleted element. Rejected — the original design already ruled this out.
- *Extract a shared cleanup helper from pointerUp*: More elegant long-term, but higher risk for a targeted bug fix. Can be done as a follow-up refactor.

### 2. Add `isDeleted` guard to the `newElement` check

**Decision**: Change the Escape guard from `this.state.newElement` to `this.state.newElement && !this.state.newElement.isDeleted`.

**Rationale**: Bug #3 (multipoint deletion) occurs when `newElement` references a finalized element that was previously the `newElement` of a completed creation. After Escape cancel, `newElement` is nulled. But in the broken flow (freedraw cancel → line attempt → Escape), `newElement` can point to a previously finalized element still in the scene. The `isDeleted` check prevents the cancel handler from soft-deleting an element that isn't genuinely in-progress. Combined with the `multiElement === null` guard, this ensures only truly in-progress drag-created elements are cancelled.

**Alternatives considered**:
- *Track an explicit `isCreating` flag*: More robust semantically, but adds new state to `AppState` and requires coordinating it across all creation paths. Overkill for this fix.

### 3. Trigger explicit scene re-render after soft-delete

**Decision**: After `mutateElement(..., { isDeleted: true })` and `setState`, call `this.scene.triggerUpdate()` to force a re-render cycle.

**Rationale**: Bug #1 (element stays visible) happens because `mutateElement` with `isDeleted: true` marks the element but doesn't always trigger a synchronous re-render if React batches the update with other state. The `onPointerUpFromPointerDownHandler` has a similar pattern where `this.scene.triggerUpdate()` is called explicitly for linear elements (line ~10767). Adding this ensures the canvas reflects the deletion immediately.

**Alternatives considered**:
- *Rely on `setState` alone*: The current behavior proves this is insufficient in some timing paths. `triggerUpdate()` is the standard Excalidraw pattern for forcing a scene refresh.

### 4. Preserve multi-point guard as-is

**Decision**: Keep the `this.state.multiElement === null` guard unchanged. The bug is not in this guard itself but in stale `newElement` references.

**Rationale**: When `multiElement` is set, Escape correctly falls through to `actionFinalize` via the main `App.onKeyDown` path. The `stopPropagation()` call in the cancel branch only matters when cancel actually fires. The multi-point deletion bug (#3) happens in a sequence where `multiElement` is already null (the multi-point element was finalized earlier), so strengthening `newElement` validation (Decision #2) is the correct fix.

## Risks / Trade-offs

- **Clearing `selectedLinearElement` during cancel may affect edge cases**: If a user is editing a linear element and simultaneously in a creation drag (unlikely but theoretically possible via rapid input), clearing `selectedLinearElement` could discard editing state. Mitigation: The cancel guard already requires `newElement` to be set, which means creation is in progress, not editing. During creation, `selectedLinearElement` is a fresh instance for the new element, not an existing edit session.

- **`triggerUpdate()` adds a render cycle**: In the hot path of keydown during drag, an extra render is negligible since the drag is being cancelled anyway. No performance concern.

- **Stale `newElement` after finalization**: The `isDeleted` guard is a defensive check. The deeper question is why `newElement` isn't always nulled after finalization — `actionFinalize` does set `newElement: null`, but if the action's state update hasn't been processed by React when the next interaction starts, `newElement` could still reference the old element. This is a pre-existing race condition that the `isDeleted` guard mitigates rather than fully resolves. A broader fix would require auditing all finalization paths, which is out of scope.
