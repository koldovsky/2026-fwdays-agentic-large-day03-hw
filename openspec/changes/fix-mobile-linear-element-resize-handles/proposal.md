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

## Impact

- **`packages/element/src/transformHandles.ts`**: `hasBoundingBox()` — remove the `!editorInterface.userAgent.isMobileDevice` condition for multi-point linear elements; review `canResizeFromSides()` and `getOmitSidesForEditorInterface()` for phone form factor behavior
- **`packages/excalidraw/components/App.tsx`**: Two "HACK" blocks (cursor hover ~line 7126 and pointer down ~line 8297) — relax the `isMobileDevice` guard to only apply to 2-point linear elements
- **`packages/excalidraw/renderer/interactiveScene.ts`**: Verify transform handle rendering uses appropriate touch-sized handles for mobile
- **`packages/element/src/resizeTest.ts`**: Verify hit-testing works correctly for touch pointers on multi-point linear elements
- **Test files**: New/updated tests for mobile selection frame behavior on multi-point linear elements
- **No breaking changes to public API**: This is a behavior fix, not an API change
- **No i18n impact**: No user-facing strings are added or changed
- **No dependency changes**
