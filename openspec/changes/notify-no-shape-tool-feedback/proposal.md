## Why

After pressing Esc, Excalidraw returns to the selection tool (or lasso if that is the preferred selection tool), but many users still expect click-drag to create a shape; nothing appears and [no feedback is shown](https://github.com/excalidraw/excalidraw/issues/9541), which feels broken. Addressing this improves discoverability of tool state without changing core drawing semantics.

## What Changes

- Detect user gestures that look like “draw on empty canvas” while the active tool cannot create a new shape, **only in a short-lived window after switching from a drawable shape tool to selection or lasso** (e.g. Esc after picking rectangle). This avoids spamming users who intentionally use the selection tool for marquee selection.
- Show **brief, non-blocking feedback** via existing `appState.toast` with neutral copy (`toast.selectShapeToolToDraw` in `locales/en.json`), using **`DEFAULT_TOAST_TIMEOUT`** from `Toast.tsx`.
- **Lasso**: When the active tool is lasso (and not the temporary `fromSelection` path), apply the same armed feedback on an empty-canvas drag past the threshold.
- **Threshold**: Scene-space minimum drag distance (`SHAPE_TOOL_DRAW_FEEDBACK_DRAG_THRESHOLD_SCENE`, 10px) defined in `packages/excalidraw/shapeToolDrawFeedback.ts`, covered by Vitest.
- **Toast visibility**: Stronger grey treatment in `Toast.scss` (`popup-secondary-bg-color`, `color-gray-40` border, layered shadow) so the message reads clearly on the canvas.
- Optional follow-up (out of scope unless needed): toolbar/cursor affordance audits.

## Capabilities

### New Capabilities

- `shape-tool-feedback`: Requirements for when and how the editor informs users that a draw-like interaction will not create a shape because no shape-drawing tool is active.

### Modified Capabilities

- _(none — no existing `openspec/specs/` baseline in this repo)_

## Impact

- **Code**: `packages/excalidraw` — `shapeToolDrawFeedback.ts` (predicates + threshold), `App.tsx` (`componentDidUpdate` arming + pointer-move hooks for selection marquee and lasso), `Toast.tsx` (exported `DEFAULT_TOAST_TIMEOUT`), `Toast.scss`, `locales/en.json`.
- **Tests**: `packages/excalidraw/tests/shapeToolDrawFeedback.test.ts` (arming helpers, threshold, modes).
- **Dependencies**: None new; `@excalidraw/common` `isSelectionLikeTool` reused in the feedback module.
