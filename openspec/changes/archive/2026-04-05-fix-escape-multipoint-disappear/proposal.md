## Why

Pressing Escape during multi-point line or arrow drawing incorrectly removes the in-progress element from the scene even when at least two points have been committed, so the curve vanishes instead of being finalized. Related fixes for other drawing modes are in place; multi-point Escape still needs to consistently finalize the element and clear creation state. We also lack an automated test for the spec scenario where Escape is pressed after only one committed point (element should be discarded as invalid geometry).

## What Changes

- Fix keyboard/interaction handling so Escape during multi-point linear creation finalizes the element when it has meaningful geometry (per existing multi-point Escape rules), instead of routing through the generic cancel path that deletes the element.
- Ensure `newElement` / `multiElement` and related app state are cleared after finalization without soft-deleting the finalized line or arrow.
- Add a regression test in `dragCreate.test.tsx` covering Escape after exactly one committed point on a multi-point line (element removed or deleted, tool/creation state reset).

## Capabilities

### New Capabilities

- _(none — behavior is already specified; this change aligns implementation and tests with existing specs.)_

### Modified Capabilities

- `escape-multipoint-finalize`: Requirements already describe finalize vs single-point removal; this change delivers the missing implementation behavior and adds the missing test for the single committed point scenario.
- `escape-cancel-creation`: Reinforce that multi-point Escape must finalize (Requirement: Multi-point linear creation Escape behavior is preserved) by fixing code paths that currently cancel multi-point elements incorrectly.

## Impact

- **Code**: Multi-point / linear element creation and Escape handling (likely under `packages/excalidraw` or shared app state for drag-create), plus tests in `dragCreate.test.tsx`.
- **Behavior**: Users keep partially drawn multi-point lines and arrows when pressing Escape after two or more committed points; single-point discard behavior remains unchanged.
- **APIs / dependencies**: No public API changes expected.
