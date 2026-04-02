## 1. Discovery and hook point

- [x] 1.1 Trace `handleSelectionOnPointerDown` and selection rectangle creation; use `selectionElement` and `pointerDownState.hit.element` for empty-canvas marquee detection in `onPointerMoveFromPointerDownHandler` (`App.tsx`).
- [x] 1.2 Confirm form-factor behavior for `appState.toast` (`LayerUI` omits floating toasts when `formFactor === "phone"`); skip setting toast on phone with an inline comment in `App.tsx`.

## 2. Core behavior

- [x] 2.1 Extract pure logic to `packages/excalidraw/shapeToolDrawFeedback.ts`: drawable tool list, `shouldArmShapeDrawFeedbackForToolChange`, `shouldShowShapeToolDrawFeedback` with modes `selection-marquee` and `lasso-empty`, threshold `SHAPE_TOOL_DRAW_FEEDBACK_DRAG_THRESHOLD_SCENE` (10px scene space).
- [x] 2.2 Arm `shapeDrawFeedbackArmedAfterShapeToolSwitch` in `App.componentDidUpdate` when `shouldArmShapeDrawFeedbackForToolChange(prev, next)`; clear when user selects a drawable tool again or after a qualifying toast fires.
- [x] 2.3 On pointer move: selection branch — toast when armed and `shouldShowShapeToolDrawFeedback` (marquee mode); lasso branch — same when `!activeTool.fromSelection` and lasso-empty mode.
- [x] 2.4 Set toast via `setToast` with `duration: DEFAULT_TOAST_TIMEOUT` (exported from `Toast.tsx`).
- [x] 2.5 At-most-once per gesture via `shapeToolDrawFeedbackShownForGesture`; reset on pointer up (`onPointerUpFromPointerDownHandler`).

## 3. i18n and UX copy

- [x] 3.1 Add `toast.selectShapeToolToDraw` to `packages/excalidraw/locales/en.json`; other locales fall back via `i18n.ts`.
- [x] 3.2 Neutral copy (“Select a shape tool to draw.”), not Esc-specific.

## 4. Visual

- [x] 4.1 Update `packages/excalidraw/components/Toast.scss`: grey secondary background (`--popup-secondary-bg-color`), `--color-gray-40` border, `var(--shadow-island)` plus subtle outer ring for visibility on canvas.

## 5. Verification

- [x] 5.1 Vitest: `packages/excalidraw/tests/shapeToolDrawFeedback.test.ts` — arming, threshold, armed vs unarmed, lasso mode, editing/hit guards.
- [x] 5.2 Manual: rectangle → Esc → empty drag shows toast once; normal marquee without prior shape-tool switch does not; shape tool drag does not toast; small movement does not toast; lasso-as-default after Esc if applicable.
