## Context

The hand tool can be activated by pressing `H`. The current implementation routes `H` keydown events through `actionToggleHandTool` (in `actionCanvas.tsx`), which toggles between the hand tool and the previously active tool on every `keydown` event. Because browsers fire repeated `keydown` events while a key is held, holding `H` causes the tool to toggle back and forth on each repeat, producing visible flickering and making hold-to-pan impossible.

The spacebar already has a hold-to-pan pattern: a module-level `isHoldingSpace` boolean in `App.tsx` gates panning logic, and `onKeyUp` / `onBlur` clean it up. The `H` key fix mirrors this exact pattern.

Relevant files:
- `packages/excalidraw/actions/actionCanvas.tsx` — `actionToggleHandTool` with `keyTest`
- `packages/excalidraw/components/App.tsx` — `onKeyDown`, `onKeyUp`, `onBlur`, `isHoldingSpace`

## Goals / Non-Goals

**Goals:**
- Eliminate flickering when `H` is held by ignoring key-repeat events in `actionToggleHandTool`
- Implement hold-to-activate: holding `H` temporarily switches to the hand tool; releasing restores the previous tool
- Mirror the spacebar pattern for consistency

**Non-Goals:**
- Changing how `H` behaves when tapped once (still toggles hand tool on/off)
- Altering mouse/pointer panning behavior
- Changing any other tool's hold-to-activate behavior

## Decisions

### 1. Filter repeats in `keyTest`, not in `onKeyDown`

`keyTest` is the purpose-built place to gate action execution. Adding `!event.repeat` there is the minimal, self-contained change with no side effects on other actions.

*Alternative considered*: Intercept in `onKeyDown` before dispatching actions. Rejected — more invasive and inconsistent with how other actions are guarded.

### 2. Module-level `isHoldingH` boolean (same as `isHoldingSpace`)

A module-level boolean is already the established pattern in `App.tsx`. It avoids React re-renders and is accessible in both event handlers and the `onBlur` cleanup.

*Alternative considered*: React state (`this.setState({ isHoldingH })`). Rejected — causes unnecessary renders; the flag is purely an event-coordination concern, not a rendering concern.

### 3. Restore previous tool in `onKeyUp`, not via a separate action

`onKeyUp` already handles `KEYS.SPACE` cleanup. Adding `KEYS.H` handling there is consistent and keeps hold-to-activate logic co-located with hold-to-activate teardown.

*Alternative considered*: A separate `actionReleaseHandTool`. Rejected — over-engineered for a two-line keyup handler.

### 4. Hold-to-activate only activates hand when not already in hand mode

If the user explicitly toggled to the hand tool (tap `H` once), `isHoldingH` is `false`. A subsequent hold of `H` will not trigger hold-to-activate, preventing accidental tool restoration on keyup. This matches spacebar behavior (spacebar while panning does not re-toggle anything).

## Risks / Trade-offs

- **Hold vs. tap ambiguity**: After this change, tapping `H` once still toggles permanently; holding `H` activates temporarily. These two code paths share `keyTest` (gated by `!event.repeat`) and the new `isHoldingH` flag. The distinction is: if `isHandToolActive` is `false` on the initial keydown, `isHoldingH` is set to `true`; if already active, the tap toggles it off normally. This means a user who taps H (activating hand) and then immediately holds H again won't get the hold-restore — acceptable edge case.
  → Mitigation: document behavior in tests.

- **Focus loss during hold**: If the window loses focus while `H` is held, `isHoldingH` stays `true` but the `onBlur` handler resets it (same as `isHoldingSpace`). The hand tool may remain active — same trade-off as the spacebar today.
  → Mitigation: reset `isHoldingH` in `onBlur`.
