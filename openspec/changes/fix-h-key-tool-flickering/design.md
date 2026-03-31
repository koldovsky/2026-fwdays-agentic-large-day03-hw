## Context

Excalidraw handles the `H` key through the action system (`actionToggleHandTool` in `actionCanvas.tsx`). The action's `keyTest` callback fires on every `keydown` event, which includes repeated events the browser emits when a key is held. Because the action toggles the hand tool, rapid keydown repeats cause the tool to switch back and forth many times per second.

The spacebar already implements a correct "hold to pan" pattern: a module-level `isHoldingSpace` flag in `App.tsx` is set on the first `keydown` and cleared on `keyup`; the pointer handlers check this flag to decide whether to pan. The `H` key should follow the same idiom.

Current code locations:
- `packages/excalidraw/components/App.tsx` — `onKeyDown` / `onKeyUp` handlers, `isHoldingSpace` flag pattern
- `packages/excalidraw/actions/actionCanvas.tsx` — `actionToggleHandTool` with `keyTest`

## Goals / Non-Goals

**Goals:**
- Eliminate flickering when `H` is held by preventing repeated keydown events from re-triggering the toggle
- Restore the previous tool automatically when `H` is released (hold-to-pan UX matching spacebar)
- Keep the toolbar hand-tool button working as a normal toggle (click to activate, click again to deactivate)

**Non-Goals:**
- Changing how other shortcut keys behave
- Altering hand-tool behavior when activated via toolbar or programmatic API
- Supporting simultaneous H + pointer interactions beyond what the existing hand tool already handles

## Decisions

### Decision 1 — Move H keyboard handling from action `keyTest` to `App.tsx` direct handlers

**Chosen:** Remove the `keyTest` from `actionToggleHandTool` and add explicit H key handling inside `onKeyDown` / `onKeyUp` in `App.tsx`, mirroring the `isHoldingSpace` pattern.

**Alternative considered:** Add `!event.repeat` to the existing `keyTest`. This stops the rapid toggling but does not restore the previous tool on key release, so the user must press H a second time to return to their prior tool — worse UX.

**Rationale:** The hold pattern already exists for spacebar. Centralising H key logic in the same two places keeps the code consistent. The action system is still invoked (`this.actionManager.executeAction(actionToggleHandTool)`) so tool-switching side effects (cursor, state) remain handled by the existing action; only the *trigger* changes.

### Decision 2 — Module-level `isHoldingH` flag

**Chosen:** A module-level `boolean` flag `isHoldingH`, set when H activates the hand tool via keyboard and cleared on `keyup`.

**Alternative considered:** Storing the hold state inside React component state (`this.setState`). This would trigger an unnecessary render and introduce timing issues because React batches state updates.

**Rationale:** Consistent with `isHoldingSpace` and `isPanning` which are both module-level booleans. No render needed; the flag only guards the keyup handler logic.

### Decision 3 — Guard on `!event.repeat` in `onKeyDown`

Only the first keydown event (where `event.repeat === false`) activates the hold and switches to hand tool. Subsequent repeated keydown events while H is held are ignored entirely for H-key logic.

## Risks / Trade-offs

- [Behaviour change] Quick tap of H no longer toggles hand tool persistently — the tool is restored on key-up. Users who relied on "tap H → keep panning → tap H again to return" will need to use the toolbar button instead. → Mitigation: This aligns with the reported expected behaviour and the spacebar precedent; the toolbar button preserves the toggle path.
- [Edge case] If the browser or OS swallows the `keyup` event (e.g., focus change, system modal), `isHoldingH` stays true but the hand tool persists. → Mitigation: Same risk exists for `isHoldingSpace`; can be addressed in a follow-up by resetting on window `blur` (not in scope here).

## Migration Plan

No data migration needed. The change is entirely in client-side event-handling logic.

Rollback: revert the two changed files (`App.tsx`, `actionCanvas.tsx`).

## Open Questions

- Should a `blur` / `visibilitychange` event clear `isHoldingH`? (Existing `isHoldingSpace` does not handle this either — out of scope.)
