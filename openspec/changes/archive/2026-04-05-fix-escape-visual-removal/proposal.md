## Why

The Escape-to-cancel handler added in `escape-cancel-pointer-drawing` uses `scene.mutateElement(el, { isDeleted: true })` to soft-delete the in-progress element. However, `mutateElement` does not rebuild the Scene's `nonDeletedElements` cache — only `replaceAllElements` does. As a result, the element stays in the cached array returned by `getNonDeletedElements()`, the renderer still draws it, and the figure remains visible on canvas until some other operation (e.g., starting a new drawing) triggers a cache rebuild via `replaceAllElements`.

## What Changes

- Replace the `mutateElement(el, { isDeleted: true })` call in the Escape handler with `updateScene()` using a filtered elements array — the same pattern Excalidraw already uses for removing invisibly-small elements on pointer-up. This ensures `replaceAllElements` is called, the `nonDeletedElements` cache is rebuilt, and the element disappears immediately.
- Preserve the existing multi-point guard (`multiElement === null`) so that Escape during multi-point creation still falls through to `actionFinalize` and finalized multi-point lines are never affected.
- Keep the state cleanup additions from the previous fix (`selectedLinearElement`, `startBoundElement`, `cursorButton`).
- Update regression tests to verify immediate visual removal.

## Capabilities

### New Capabilities
- `fix-escape-element-removal`: Fix the Escape cancel handler to use `updateScene` with element filtering instead of `mutateElement` soft-delete, ensuring the in-progress element is immediately removed from the Scene's non-deleted elements cache and disappears visually.

### Modified Capabilities
- `escape-cancel-creation`: The original spec's requirements are correct, but the implementation must use `updateScene` (not `mutateElement`) for element removal to satisfy the "element is discarded" requirement. Multi-point mode guard must remain intact.

## Impact

- `packages/excalidraw/components/App.tsx` — `onKeyDownFromPointerDownHandler`: replace `mutateElement` call with `updateScene` call; retain all other state cleanup.
- `packages/excalidraw/tests/dragCreate.test.tsx` — update/add regression tests verifying the element is absent from `scene.getNonDeletedElements()` after Escape.
- No API changes, no new dependencies.
