## Context

Excalidraw’s `actionDeselect` (Escape) switches `activeTool` to the preferred selection tool via `getNextActiveTool` in `actionDeselect.ts` (selection or lasso, depending on `preferredSelectionTool`). Shape creation runs only after `handleSelectionOnPointerDown` returns false in `handleCanvasPointerDown` (`App.tsx`). Users who expect to keep drawing after Esc get selection/marquee or lasso behavior instead, often with no visible outcome on an empty board ([upstream issue #9541](https://github.com/excalidraw/excalidraw/issues/9541)).

The codebase exposes ephemeral UI through `appState.toast`, rendered in `LayerUI.tsx` via `Toast.tsx` and set with `setToast` / `setState({ toast: { message, duration } })`. **`DEFAULT_TOAST_TIMEOUT`** is exported from `Toast.tsx` for consistent auto-dismiss.

## Goals / Non-Goals

**Goals:**

- Give one clear, short explanation when a drag on empty canvas cannot create a shape **shortly after the user left a drawable shape tool for selection or lasso** (primary case: Esc after picking a shape).
- Reuse existing toast infrastructure and i18n (`locales/en.json` key `toast.selectShapeToolToDraw`).
- Limit noise: **arm** feedback only on drawable → selection/lasso transitions; **disarm** after the first qualifying toast or when the user picks a drawable shape tool again; at-most-once toast per pointer gesture; minimum scene drag threshold.

**Non-Goals:**

- Changing Escape semantics (still maps to deselect / return to preferred selection-like tool as today).
- Adding a new persistent “no tool” mode.
- Toasting on every empty-canvas marquee while the user has been working in selection mode normally.

## Decisions

1. **Feedback mechanism: `appState.toast`**  
   **Rationale:** Matches export progress and other ephemeral messages; accessible `role="status"` on `Toast`.  
   **Alternatives:** Browser `alert` (too intrusive); inline canvas text (new layout work).

2. **Arming: drawable → selection-like transition**  
   **Rationale:** A naive “empty marquee while selection is active” rule fires on **every** box-select, which is incorrect UX. The product signal we want is **confusion after leaving a shape tool** (rectangle, ellipse, diamond, arrow, line, freedraw).  
   **Implementation:** `App.componentDidUpdate` compares `prevState.activeTool.type` vs `this.state.activeTool.type`; uses `shouldArmShapeDrawFeedbackForToolChange` from `shapeToolDrawFeedback.ts` (drawable list × `isSelectionLikeTool` from `@excalidraw/common`). Instance flag `shapeDrawFeedbackArmedAfterShapeToolSwitch` is cleared after showing the toast or when the new tool is drawable again.

3. **Trigger: pointer drag on empty canvas while armed**  
   **Rationale:** Same notion of “empty” as marquee start: `pointerDownState.hit.element === null` at pointer down; not editing linear points; drag distance ≥ `SHAPE_TOOL_DRAW_FEEDBACK_DRAG_THRESHOLD_SCENE` (10 scene units).  
   **Selection path:** `selectionElement` present, `shouldShowShapeToolDrawFeedback` with `mode: "selection-marquee"`.  
   **Lasso path:** `mode: "lasso-empty"` inside the `addPointToPath` branch; skip when `activeTool.fromSelection` (alt-transition from selection).

4. **Threshold**  
   **Rationale:** Dedicated constant in `shapeToolDrawFeedback.ts` next to pure predicates for unit testing.  
   **Alternatives:** Reuse an unrelated DRAGGING_THRESHOLD (semantics differ).

5. **Form factors**  
   **Rationale:** `LayerUI` renders the floating toast stack only when `formFactor !== "phone"`. Do not set toast state on phone for this feature (comment in `App.tsx`).

6. **Toast chrome**  
   **Rationale:** Improve legibility on the canvas: `Toast.scss` uses `background-color: var(--popup-secondary-bg-color)`, `border: 1px solid var(--color-gray-40)`, and `box-shadow: var(--shadow-island)` plus a subtle outer ring. Theme variables keep light/dark consistency.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Toast spam during normal selection | Arming only after shape→selection/lasso; disarm after toast or picking a shape tool. |
| Missed feedback if user never crosses threshold | Arm stays until disarm; a later long drag can still show the toast. |
| False positives on near-miss hits | Require `hit.element` null at pointer down (same as empty marquee). |
| Lasso-from-selection alt path | Explicitly exclude `fromSelection` lasso transitions from lasso-empty feedback. |

## Migration Plan

Not applicable: user-visible additive behavior, no data migration. Rollback is reverting the change.

## Open Questions

- Resolved: hook points — selection marquee block and lasso `addPointToPath` branch in `onPointerMoveFromPointerDownHandler`.
- Resolved: lasso — supported for primary lasso tool with same armed rule.
- Resolved: copy — neutral `selectShapeToolToDraw` string (not Esc-specific).
