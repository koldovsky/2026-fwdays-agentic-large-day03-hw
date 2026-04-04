## 1. Core Fix — Bounding Box Visibility

- [x] 1.1 In `packages/element/src/transformHandles.ts`, update `hasBoundingBox()` to remove the `!editorInterface.userAgent.isMobileDevice` guard, changing the return for linear elements from `element.points.length > 2 && !editorInterface.userAgent.isMobileDevice` to `element.points.length > 2`
- [x] 1.2 Verify that elbow arrow exclusion (`isElbowArrow` check) remains unchanged and still returns `false` on all platforms

## 2. Core Fix — Transform Handle Interaction

- [x] 2.1 In `packages/excalidraw/components/App.tsx` (~line 7126), update the cursor/hover HACK block to use `selectedElements[0].points.length <= 2` instead of `(this.editorInterface.userAgent.isMobileDevice || selectedElements[0].points.length === 2)`
- [x] 2.2 In `packages/excalidraw/components/App.tsx` (~line 8297), update the pointer-down HACK block with the same condition change as 2.1
- [x] 2.3 Update the HACK comments in both locations to explain the new rationale (suppressing handles for 2-point lines only, not all linear elements on mobile)

## 3. Verification — Rendering and Hit-Testing

- [x] 3.1 Verify in `packages/excalidraw/renderer/interactiveScene.ts` that the rendering path for transform handles correctly passes through for multi-point linear elements once `hasBoundingBox()` returns `true` (no additional mobile guards in rendering code)
- [x] 3.2 Verify in `packages/element/src/resizeTest.ts` that hit-testing for transform handles works for touch pointerType on multi-point linear elements (no additional mobile guards blocking interaction)
- [x] 3.3 Verify that `canResizeFromSides()` in `transformHandles.ts` correctly returns `false` for phone form factor (ensuring corner-only handles on phones) — this is existing behavior that must be preserved

## 4. Tests

- [x] 4.1 Add test: multi-point linear element (> 2 points) shows bounding box when `isMobileDevice` is `true`
- [x] 4.2 Add test: 2-point linear element does NOT show bounding box on any platform
- [x] 4.3 Add test: elbow arrow does NOT show bounding box on mobile (regression guard)
- [x] 4.4 Add test: multi-element selection shows bounding box on mobile (regression guard)
- [x] 4.5 Run existing test suite (`yarn test:update`) to confirm no regressions (349 pre-existing failures verified on clean branch)

## 5. Quality Checklist

- [x] 5.1 Run `yarn test:typecheck` to verify TypeScript types
- [x] 5.2 Run `yarn build` to verify the project builds successfully (pre-existing failure: workbox/vite-plugin-pwa service worker issue, verified identical on clean branch)
- [x] 5.3 Run `yarn fix` to ensure code formatting and linting passes
- [x] 5.4 Verify no hardcoded values were introduced (all thresholds use existing constants/conditions)
- [x] 5.5 Verify no i18n strings were added or need translation
- [x] 5.6 Verify no security concerns (no new user input handling, no new data exposure)
- [x] 5.7 Review that the changes are self-explanatory — another developer should understand the fix without additional explanation
