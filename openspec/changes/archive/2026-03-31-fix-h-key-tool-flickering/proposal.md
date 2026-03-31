## Why

Holding the `H` key to pan causes rapid tool flickering because the browser fires repeated `keydown` events while a key is held, and each event toggles the hand tool on/off. This makes it impossible to pan smoothly via keyboard, breaking the expected "hold to pan" UX that mirrors how the spacebar works.

## What Changes

- Replace toggle-on-repeat keyboard behavior with a proper **hold-to-activate** pattern for the `H` key
- On first `H` keydown: switch to the hand tool (if not already active) and record the hold state
- While `H` is held: repeated keydown events are ignored (no flickering)
- On `H` keyup: restore the previously active tool automatically
- Clicking the hand tool button in the toolbar retains its existing toggle behavior (unaffected)

## Capabilities

### New Capabilities

- `h-key-hold-to-pan`: Keyboard hold behavior for the H key — activates the hand tool while held and restores the previous tool on release, matching the spacebar panning pattern

### Modified Capabilities

<!-- No existing specs with requirement changes -->

## Impact

- `packages/excalidraw/components/App.tsx` — add `isHoldingH` module-level flag; handle H keydown (first press only) and H keyup in `onKeyDown` / `onKeyUp` handlers
- `packages/excalidraw/actions/actionCanvas.tsx` — remove `keyTest` from `actionToggleHandTool` so the action system no longer handles H keyboard events (keyboard handling moves to App.tsx); toolbar click path unchanged
