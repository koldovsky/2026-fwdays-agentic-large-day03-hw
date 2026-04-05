## Context

Primary toolbar tools are rendered in `ShapesSwitcher` (`packages/excalidraw/components/Actions.tsx`). Each `ToolButton` receives `keyBindingLabel` derived from shape metadata (`numericKey || letter`). For `value === "hand"`, the code currently forces `keybindingLabel` to `undefined`, so the superscript never appears. Shape metadata in `packages/excalidraw/components/shapes.tsx` already defines `key: KEYS.H` and `numericKey: null` for the hand tool, so the letter **H** is available via the same `letter` variable used for other tools.

`HandButton.tsx` (e.g. mobile layout) already passes `keyBindingLabel={KEYS.H.toLocaleUpperCase()}` on non-mobile, confirming the product expectation for showing **H** when appropriate.

## Goals / Non-Goals

**Goals:**

- Desktop/main toolbar: hand tool shows the same style of shortcut superscript as sibling tools (using **H**, since there is no number row binding for hand).
- Preserve existing accessibility strings (`title`, `aria-keyshortcuts`) and shortcut behavior.

**Non-Goals:**

- Changing the actual **H** shortcut, help dialog content, or command palette entries.
- Redesigning toolbar layout or typography beyond restoring the missing label.
- Guaranteeing a numeric superscript for hand (hand has no `numericKey` in metadata).

## Decisions

1. **Remove the hand-only suppression of `keybindingLabel`**  
   **Rationale:** The bug is a one-line special case (`value === "hand" ? undefined : …`). Removing it makes hand use `numericKey || letter`, which evaluates to **H** for the hand tool.  
   **Alternative considered:** Hardcode `KEYS.H` only for hand — rejected as redundant with existing `letter` and easier to drift from `shapes.tsx`.

2. **Do not change `HandButton` unless a gap appears**  
   **Rationale:** Mobile passes `isMobile` and intentionally omits the label; issue screenshot targets the main navigation bar (desktop). Re-verify after the `ShapesSwitcher` fix.

## Risks / Trade-offs

- **[Risk] Visual crowding on very narrow viewports** → Same as other tools that only show a letter; hand is first in the row and already spaced like others.
- **[Risk] Historical reason for hiding hand label** → If CI or snapshots fail, update snapshots; no product requirement found for hiding **H**.

## Migration Plan

- Ship as a normal library/app release; no data migration. Rollback: restore the `hand` branch in `keybindingLabel` assignment.

## Open Questions

- None for MVP; confirm snapshot tests if any cover `toolbar-hand` markup.
