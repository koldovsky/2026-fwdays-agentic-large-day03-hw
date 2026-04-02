## Context

Excalidraw already pans in view mode via middle-click / space+drag (`handleCanvasPanUsingWheelOrSpaceDrag`). Global keyboard handling lives in `App.tsx` (`onKeyDown` / `onKeyUp`, also registered on `document`). Arrow keys are used elsewhere (e.g. nudge selection, flowchart) behind modifiers or non–view-mode paths. Issue [#6688](https://github.com/excalidraw/excalidraw/issues/6688) requires view-mode-only panning with diagonal composition and eased motion.

## Goals / Non-Goals

**Goals:**

- Pan the canvas with arrow keys only when view mode is active (and not while editing text or focus is in an input-like element).
- Support simultaneous orthogonal keys for diagonal panning.
- Apply short acceleration on press and deceleration on release (no instant snap to zero velocity).

**Non-Goals:**

- Changing default arrow behavior outside view mode.
- New settings UI for pan speed or easing curves (sensible constants in code are enough unless product asks).
- Replicating Miro’s exact physics; “similar feel” with small decay is sufficient.

## Decisions

1. **Velocity + animation frame loop**  
   Track which arrow keys are currently down (e.g. a `Set` of `ArrowLeft` / `ArrowRight` / `ArrowUp` / `ArrowDown`). Each frame, derive a direction vector from the set (components −1, 0, +1 per axis; diagonal = sum of two unit axes, then normalize or apply both components at same max speed so diagonals are not faster). Integrate velocity toward a target speed while keys are held, and decay velocity when keys are released. Apply `translateCanvas` once per frame with delta derived from current velocity.  
   _Alternatives:_ discrete step per keyrepeat — rejected (no smooth decay). Physics engine — rejected (overkill).

2. **Hook into existing `onKeyDown` / `onKeyUp`**  
   Early guard: `viewModeEnabled`, not `editingTextElement`, `!isInputLike(target)`, and laser tool policy consistent with grab cursor (only when `activeTool.type !== "laser"` if that matches current view-mode pan rules).  
   _Alternative:_ separate `window` listeners — rejected to avoid duplicate paths and missed cleanup.

3. **Prevent default when consuming arrows**  
   When handling arrow pan in view mode, call `preventDefault()` so the page/container does not scroll (aligned with wheel-pan comment in `handleCanvasPanUsingWheelOrSpaceDrag`).

4. **Lifecycle**  
   Start `requestAnimationFrame` loop only while velocity is non-zero or at least one pan key is down; cancel on component unmount and clear key state when exiting view mode.

5. **Testing**  
   Use existing `Keyboard` / `API` helpers in `viewMode.test.tsx`: assert scroll changes after arrow keydown + advance timers/rAF as needed; verify no pan when focus is in a writable control if the test harness allows.

## Risks / Trade-offs

- **[Risk]** `requestAnimationFrame` + batched React updates may interact with `withBatchedUpdates` — **Mitigation:** apply pan via `translateCanvas` in the same style as other pan code; avoid nested state thrashing.
- **[Risk]** Key repeat may fire many `keydown` events — **Mitigation:** track by `event.code` / key and treat repeat as “still held”; velocity logic should depend on held state, not keyrepeat count.
- **[Risk]** Accessibility: arrow pan may conflict with screen reader or browser caret — **Mitigation:** only active when canvas context is focused / not in input; document as view-mode-only.

## Migration Plan

No data migration. Ship behind existing view mode; rollback is revert commit.

## Open Questions

- Exact max speed and decay constants: tune in implementation (can align with existing zoom/scroll deltas order of magnitude).
