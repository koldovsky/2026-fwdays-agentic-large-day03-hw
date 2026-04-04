# Proposal: Stroke width slider

**Issue:** [excalidraw#11105 — Feature request: Stroke width slider](https://github.com/excalidraw/excalidraw/issues/11105)

## Why

Today the editor exposes stroke width as three fixed presets (thin, bold, extra bold). That is too coarse for sketching and illustration workflows where users need finer control. A slider (or equivalent range control) over a bounded numeric interval lets users pick intermediate widths without leaving the shape properties UI, addressing the request in #11105 while keeping `strokeWidth` as the single source of truth on elements.

## What

- Replace the three-radio **Stroke width** control with a **range control** (slider) that sets numeric `strokeWidth` for the active tool default (`AppState.currentItemStrokeWidth`) and for selected elements, using the same `changeStrokeWidth` action semantics as today.
- Define **minimum, maximum, and step** for the slider as shared constants (exact numbers are an implementation detail; the delta spec fixes behavior, not specific pixel widths).
- **Backward compatibility:** Existing `.excalidraw` files already store `strokeWidth` as a number (historically `1`, `2`, or `4`). Those values remain valid; the spec defines how values outside the new slider range behave when edited.

## Impact

| Area | Notes |
|------|--------|
| [`packages/excalidraw/actions/actionProperties.tsx`](../../../packages/excalidraw/actions/actionProperties.tsx) | `actionChangeStrokeWidth`: replace `RadioSelection` panel with range-based UI; keep `perform` behavior unless a deliberate change is needed for batching while dragging. |
| [`packages/common/src/constants.ts`](../../../packages/common/src/constants.ts) | Introduce or extend stroke-width bounds (`STROKE_WIDTH` may remain for legacy mapping or be superseded by min/max/step constants). |
| [`packages/excalidraw/types.ts`](../../../packages/excalidraw/types.ts) | `currentItemStrokeWidth` stays `number`; ensure defaults align with new bounds. |
| [`packages/excalidraw/components/Actions.tsx`](../../../packages/excalidraw/components/Actions.tsx) | No structural change expected (`renderAction("changeStrokeWidth")`); verify popover/mobile layouts still fit. |
| [`packages/excalidraw/components/MobileToolBar.tsx`](../../../packages/excalidraw/components/MobileToolBar.tsx) | Confirm stroke width entry points if any duplicate the control. |
| [`packages/excalidraw/components/Range.tsx`](../../../packages/excalidraw/components/Range.tsx) | Reuse or mirror patterns (`type="range"`, styling) for consistency with opacity and similar controls. |
| Tests | [`packages/excalidraw/actions/actionProperties.test.tsx`](../../../packages/excalidraw/actions/actionProperties.test.tsx), context menu / style tests that assert bold = `2`, etc. |
| i18n | [`labels.strokeWidth`](../../../packages/excalidraw/locales/en.json); add keys only if new copy is required (e.g. min/max labels). |
| Styles | Scoped SCSS/CSS for the stroke-width fieldset if the slider needs layout tweaks next to other property rows. |

## Risks

| Risk | Mitigation |
|------|------------|
| **Rapid updates while dragging** may flood history or hurt performance. | Debounce or commit on pointer-up if needed; match existing `Range` / opacity patterns. |
| **Accessibility** of the native range input (focus, keyboard, screen readers). | Use a labeled control; set `aria-*` as required by the chosen component; manual keyboard pass. |
| **Legacy files** with `strokeWidth` outside the new min–max. | Policy in delta spec: clamp when the user changes stroke width via the slider; do not mutate file on load solely for out-of-range values. |
| **Magic numbers** scattered in UI. | Centralize min, max, step, and default in `@excalidraw/common` constants. |
| **Mobile layout** — slider may need more horizontal space than three icons. | Test compact properties popover and mobile toolbar; adjust CSS max-width if needed. |
