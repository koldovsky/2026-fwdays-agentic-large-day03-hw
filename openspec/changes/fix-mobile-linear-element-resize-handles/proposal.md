## Why

On Android and mobile devices, shapes inserted from the Basic Shapes library (which are implemented as multi-point linear elements / polylines) lose their selection frame and resize handles entirely. This makes them impossible to resize or manipulate on mobile platforms. The root cause is an intentional `isMobileDevice` guard in `hasBoundingBox()` that suppresses bounding boxes for all single-selected linear elements on mobile, plus a companion "HACK" in `App.tsx` that disables transform handle hit-testing for linear elements on mobile. While this was added to work around resize issues with simple 2-point lines, it inadvertently breaks complex multi-point polyline shapes (like those in the Basic Shapes library) that should behave like regular shapes.

**GitHub Issue**: [excalidraw/excalidraw#10304](https://github.com/excalidraw/excalidraw/issues/10304)

## What Changes

- Enable bounding box rendering for multi-point linear elements (points > 2) on mobile devices by removing the blanket `isMobileDevice` suppression in `hasBoundingBox()`
- Update the transform handle interaction "HACK" in `App.tsx` to allow resize handles for multi-point linear elements on mobile (keep the suppression only for simple 2-point lines)
- Ensure touch-friendly handle sizing is used when rendering transform handles on mobile for these elements
- Add tests covering mobile selection frame visibility for multi-point linear elements

## Capabilities

### New Capabilities

- `mobile-linear-resize`: Enable selection frame and resize handles for multi-point linear elements (polylines with > 2 points) on mobile/tablet devices

### Modified Capabilities

## Risks

- **Touch hit-testing regression on multi-point polylines** (Likelihood: Low, Severity: Medium) — `resizeTest.ts` already handles touch `pointerType` correctly; no mobile-specific guards exist in that code path. Mitigation: new unit tests for `hasBoundingBox()` on mobile; manual QA on Android/iOS with Basic Shapes library items.
- **Incorrect handle rendering on mobile** (Likelihood: Low, Severity: Low) — `interactiveScene.ts` has no `isMobileDevice` checks in the transform handle rendering path; once `hasBoundingBox()` returns `true`, handles render through the same code as desktop. Mitigation: verify no additional mobile guards in rendering code.
- **Unintended behavior change for 2-point lines on desktop** (Likelihood: Low, Severity: Low) — The App.tsx HACK condition changes from `isMobileDevice || points === 2` to `points <= 2`, which is functionally equivalent on desktop (the `points === 2` branch already covered desktop). Mitigation: existing tests for 2-point line behavior.
- **Phone form factor handle clutter** (Likelihood: Low, Severity: Low) — `canResizeFromSides()` already returns `false` for phone+mobile, ensuring corner-only handles. Mitigation: verify existing behavior is preserved.
- **Rollback plan**: Revert the 3-line change in `hasBoundingBox()` and 2 condition changes in `App.tsx`; no data migration or API changes involved.

## Impact

- **`packages/element/src/transformHandles.ts`**: `hasBoundingBox()` — remove the `!editorInterface.userAgent.isMobileDevice` condition for multi-point linear elements; review `canResizeFromSides()` and `getOmitSidesForEditorInterface()` for phone form factor behavior
- **`packages/excalidraw/components/App.tsx`**: Two "HACK" blocks (cursor hover ~line 7126 and pointer down ~line 8297) — relax the `isMobileDevice` guard to only apply to 2-point linear elements
- **`packages/excalidraw/renderer/interactiveScene.ts`**: Verify transform handle rendering uses appropriate touch-sized handles for mobile
- **`packages/element/src/resizeTest.ts`**: Verify hit-testing works correctly for touch pointers on multi-point linear elements
- **Test files**: New/updated tests for mobile selection frame behavior on multi-point linear elements
- **No breaking changes to public API**: This is a behavior fix, not an API change
- **No i18n impact**: No user-facing strings are added or changed
- **No dependency changes**
