## 1. Core Implementation

- [x] 1.1 In `packages/excalidraw/components/App.tsx`, inside `handleTextWysiwyg()`, locate the `onSubmit` callback where `refreshTextDimensions()` is called after the user commits text.
- [x] 1.2 Import `isMobileBreakpoint` from `@excalidraw/common/src/editorInterface` and `getVisibleSceneBounds` from `@excalidraw/element/src/bounds` at the top of `App.tsx` (or verify they are already imported).
- [x] 1.3 After `refreshTextDimensions()` completes in `onSubmit`, add a guard: if `isMobileBreakpoint(this.state.width, this.state.height)` is `false`, skip the repositioning entirely.
- [x] 1.4 Add a second guard: if `element.containerId !== null`, skip the repositioning (bound text is governed by its container).
- [x] 1.5 Add a third guard: if the text element is not newly created (i.e., it existed before editing started), skip the repositioning. Use a local flag (e.g., `isNewElement`) set at the point where WYSIWYG is opened for a fresh element vs. an existing one.
- [x] 1.6 Compute the horizontal margin in scene units: `const MARGIN_PX = 16; const margin = MARGIN_PX / this.state.zoom.value`.
- [x] 1.7 Derive the target scene-space values using `getVisibleSceneBounds`:
  ```ts
  const [vx1, , vx2] = getVisibleSceneBounds(this.state);
  const targetX = vx1 + margin;
  const targetWidth = vx2 - vx1 - 2 * margin;
  ```
- [x] 1.8 Call `mutateElement(element, { x: targetX, width: targetWidth, autoResize: false })`.
- [x] 1.9 Call `refreshTextDimensions(element, ...)` again so text re-wraps at `targetWidth`.

## 2. Unit Tests

- [x] 2.1 In `packages/excalidraw/tests/` (or colocated test), add a unit test: given a mobile-sized `appState` (`width: 390, height: 844`) and a newly committed text element with `x` and `width` extending outside the viewport, verify the element is repositioned so its `x >= vx1 + margin` and `width === targetWidth`.
- [x] 2.2 Add a unit test: given a desktop-sized `appState` (`width: 1440, height: 900`), verify the element's `x` and `width` are unchanged after commit.
- [x] 2.3 Add a unit test: given a mobile `appState` and a text element with `containerId !== null`, verify no repositioning occurs.
- [x] 2.4 Add a unit test: given a mobile `appState` and an _existing_ text element being re-edited, verify no repositioning occurs.
- [x] 2.5 Add a unit test: given a landscape phone `appState` (`width: 844, height: 390`), verify `isMobileBreakpoint` returns `true` and the repositioning is applied.

## 3. Playwright Integration Tests

- [x] 3.1 Add a Playwright test in `excalidraw-app/tests/` that sets the viewport to `390 × 844` (mobile portrait), double-clicks the canvas to create a text element, types some text, presses Escape to commit, then asserts the element's bounding box is fully within the canvas viewport width (minus margins).
- [x] 3.2 Add a Playwright test with viewport `1440 × 900` (desktop), performs the same flow, and asserts the element's position is unchanged (i.e., matches the scene coordinates from the original pointer position).
- [x] 3.3 Add a Playwright test with viewport `844 × 390` (landscape phone), verifies the same fit-to-viewport behaviour as task 3.1.

## 4. Validation

- [x] 4.1 Run `yarn test` and `yarn test:typecheck` — all must pass with no new errors.
- [x] 4.2 Run `yarn test:code` (ESLint) — zero new warnings.
- [ ] 4.3 Manually verify on a real mobile device or browser DevTools mobile emulation (iPhone SE, Pixel 5): create a text element, confirm it appears within the visible canvas area immediately after committing.
- [ ] 4.4 Manually verify on desktop (1440 px wide) that text element creation behaviour is unchanged.
- [ ] 4.5 Verify that editing an existing (desktop-created) text element on mobile does not reposition it.
