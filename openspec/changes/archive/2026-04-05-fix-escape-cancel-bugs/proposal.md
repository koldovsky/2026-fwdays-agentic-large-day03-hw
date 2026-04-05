## Why

The initial implementation of Escape-to-cancel for in-progress pointer drawing (from `escape-cancel-pointer-drawing`) has three interrelated bugs that break acceptance criteria #1, #3, and #4 from [issue #10814](https://github.com/excalidraw/excalidraw/issues/10814):

1. Pressing Escape during drag-create does not always remove the in-progress element visually — the figure remains on canvas.
2. After cancelling a freedraw stroke with Escape, switching to the line tool and attempting to draw produces no line (stuck interaction state).
3. Pressing Escape after the failed line attempt deletes a previously finalized multi-point line instead of only affecting the current in-progress element — violating the "no regression for multi-point mode" guarantee.

## What Changes

- Fix the Escape cancel handler in `onKeyDownFromPointerDownHandler` to reliably soft-delete the in-progress element and trigger a scene re-render so the element disappears visually.
- Fix state cleanup after Escape cancellation to fully reset `newElement`, `selectedLinearElement`, `multiElement`, `startBoundElement`, and `cursorButton` so subsequent tool use (especially line/arrow) starts from a clean slate.
- Add a guard to prevent the cancel handler from ever acting on a finalized multi-point element that is no longer truly "in-progress" — ensuring Escape only reaches `actionFinalize` for multi-point mode as designed.
- Add regression tests covering the exact sequences that reproduce these bugs.

## Capabilities

### New Capabilities
- `fix-escape-state-cleanup`: Fix interaction state cleanup after Escape cancellation so that subsequent tool switches and drawing operations work correctly. Covers freedraw → line transition, stale `selectedLinearElement` / `startBoundElement` cleanup, and `cursorButton` reset.
- `fix-escape-multipoint-guard`: Strengthen the guard in the Escape cancel handler to prevent accidental deletion of previously finalized multi-point elements. Ensures the cancel path only acts on genuinely in-progress drag-create elements.

### Modified Capabilities
- `escape-cancel-creation`: The original escape-cancel-creation spec's scenarios pass but the implementation has gaps in state cleanup and element removal visibility. Requirements themselves are correct — the fix is in satisfying them fully.

## Impact

- `packages/excalidraw/components/App.tsx` — `onKeyDownFromPointerDownHandler`: fix Escape branch state cleanup; strengthen multi-point guard; ensure scene re-render after soft-delete.
- `packages/excalidraw/tests/dragCreate.test.tsx` — add regression tests for the three bug sequences.
- No API changes, no new dependencies.
