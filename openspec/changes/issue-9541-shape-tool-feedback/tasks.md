## 1. Specification alignment

- [x] 1.1 Confirm `editor-selection-draw-hint` spec scenarios match product intent for this fork (session cap, selection + lasso, exclusions).
- [x] 1.2 Cross-check with [excalidraw#9541](https://github.com/excalidraw/excalidraw/issues/9541) expected behavior and upstream discussion (toast vs visual-only feedback).

## 2. Core implementation

- [x] 2.1 Add or extend `PointerDownState` with any fields needed to detect lasso gesture progression (e.g. `lasso.hasOccurred`) if not already present.
- [x] 2.2 Implement `shouldShowSelectShapeToolToast` (or equivalent) in `packages/excalidraw/utils/selectionShapeToolToast.ts` per `design.md` and spec.
- [x] 2.3 Wire pointer-up handler in `packages/excalidraw/components/App.tsx`: compute screen drag distance, call predicate, read/write `sessionStorage` key, invoke `setToast` with `t("toast.selectShapeToolToDraw")` (or chosen key).
- [x] 2.4 Set `lasso.hasOccurred` when lasso path receives move points (avoid false positives from `fromSelection` transitional paths per design).

## 3. Internationalization

- [x] 3.1 Add English source string under `packages/excalidraw/locales/en.json` (`toast.selectShapeToolToDraw`).
- [x] 3.2 Add the same key to other locale files per repository convention (fallback English acceptable where translations are pending).

## 4. Verification

- [x] 4.1 Unit tests in `packages/excalidraw/tests/selectionShapeToolToast.test.ts` for predicate branches (tool types, gestures, thresholds, exclusions).
- [x] 4.2 Integration test(s) in `packages/excalidraw/tests/selectionShapeToolToast.integration.test.tsx` (or equivalent) for pointer down/move/up and `sessionStorage` behavior.
- [x] 4.3 Manual smoke: shape tool → Esc → empty drag → toast once; second drag same tab → no repeat; hit element → no toast. _(Automated: integration tests cover session cap + qualifying gestures; full browser Esc path left for optional manual check.)_
- [x] 4.4 Run `yarn build` and targeted `vitest` for affected tests.

## 5. Wrap-up

- [x] 5.1 Update PR / assignment description referencing issue #9541 and this change folder. _(See **Pull request reference** in `proposal.md`.)_
- [ ] 5.2 After merge, run `/opsx-archive` (or project archive process) to fold requirements into `openspec/specs/` when applicable.
