# Tasks: Stroke width slider (#11105)

- [ ] Add or extend constants for stroke width **min**, **max**, **step**, and default in `@excalidraw/common` (e.g. [`packages/common/src/constants.ts`](../../../packages/common/src/constants.ts)); avoid magic numbers in UI
- [ ] Refactor `actionChangeStrokeWidth` in [`packages/excalidraw/actions/actionProperties.tsx`](../../../packages/excalidraw/actions/actionProperties.tsx): replace `RadioSelection` with a range/slider; reuse patterns from [`packages/excalidraw/components/Range.tsx`](../../../packages/excalidraw/components/Range.tsx) (label, `type="range"`, value bubble) or compose `Range` if props align
- [ ] Confirm all surfaces that call `renderAction("changeStrokeWidth")` ([`packages/excalidraw/components/Actions.tsx`](../../../packages/excalidraw/components/Actions.tsx), mobile/popover) layout correctly with the new control
- [ ] Add or update i18n strings in locale files if new labels are introduced; keep user-visible copy out of hardcoded English in components
- [ ] Update [`packages/excalidraw/actions/actionProperties.test.tsx`](../../../packages/excalidraw/actions/actionProperties.test.tsx) and any tests that assume exactly three stroke options (e.g. context menu “bold” expectations); add cases for intermediate values and clamping behavior per delta spec
- [ ] Manual / integration check: create shapes, drag slider, save `.excalidraw`, reload; verify legacy `strokeWidth` `1`/`2`/`4` files and out-of-range values behave as specified
- [ ] Run `yarn test:typecheck` and `yarn test:update`; run `yarn build` to verify production build
