## 1. Root cause investigation

- [x] 1.1 Reproduce the bug: select line/arrow tool, place 2+ points in multi-point mode, press Escape, and confirm the element disappears from the scene
- [x] 1.2 Add console logging or use debugger breakpoints in `onKeyDownFromPointerDownHandler`, `actionFinalize.perform`, and `onPointerUpFromPointerDownHandler` to trace the exact execution order and state values when Escape is pressed during multi-point drawing
- [x] 1.3 Identify the root cause — determine which code path is deleting the element (the cancel handler guard failing, `isInvisiblySmallElement` false positive, pointer-up handler interference, or another path)

## 2. Fix implementation in App.tsx

- [x] 2.1 Apply the fix based on root cause findings — likely strengthening the guard in `onKeyDownFromPointerDownHandler` or fixing state handling so `actionFinalize` properly finalizes the multi-point element
- [x] 2.2 If the issue is in `onPointerUpFromPointerDownHandler`, add an early-exit guard for already-finalized elements (when `newElement` and `multiElement` are both null for the linear element branch)
- [x] 2.3 Verify that `actionFinalize.keyTest` correctly matches when `multiElement !== null` and that `actionFinalize.perform` keeps multi-point elements with 2+ committed points

## 3. Regression tests

- [x] 3.1 Add test: Escape between clicks with 2 committed points on a line — element stays with `isDeleted === false` and at least 2 points
- [x] 3.2 Add test: Escape between clicks with 2 committed points on an arrow — element stays with `isDeleted === false`
- [x] 3.3 Add test: Escape while pointer is down during multi-point drag — element is finalized, not deleted
- [x] 3.4 Add test: Second Escape after finalization does not delete the element
- [x] 3.5 Add test: Single-segment arrow Escape-to-cancel still works (no regression)
- [x] 3.6 Run full `dragCreate.test.tsx` suite and verify all tests pass (fix `localStorage.clear` test setup issue if needed)

## 4. Verification

- [x] 4.1 Run `yarn test:typecheck` to verify no TypeScript errors
- [x] 4.2 Manually verify in the running app that multi-point lines and arrows are finalized (not deleted) when pressing Escape
