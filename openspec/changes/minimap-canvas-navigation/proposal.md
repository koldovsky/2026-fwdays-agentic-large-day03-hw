## Why

Users working on large Excalidraw diagrams have no way to orient themselves on the canvas without zooming all the way out, losing their working context. A minimap overlay solves this by providing a persistent bird's-eye view of the entire scene alongside a visual indicator of the current viewport, enabling fast navigation without disrupting zoom level.

## What Changes

- Add a new **Minimap** overlay component rendered in the bottom-right corner of the canvas
- The minimap renders a scaled-down representation of all scene elements
- A viewport rectangle on the minimap tracks the currently visible area in real-time
- Clicking or dragging on the minimap pans the main canvas to that position
- Minimap is **off by default**, toggled via a keybind (`M`) and a toolbar button
- Minimap re-renders only when `elements` change (not on scroll or zoom — those only update the viewport rectangle overlay)

## Capabilities

### New Capabilities

- `minimap`: A togglable canvas overlay showing a scaled-down view of the entire scene with an interactive viewport indicator for panning

### Modified Capabilities

<!-- No existing capabilities have requirement changes -->

## Impact

- **New files**: `Minimap.tsx`, `Minimap.scss`, `renderMinimap.ts`, `actionToggleMinimap.tsx`
- **Modified files**: `types.ts` (add `minimapEnabled` to AppState), `appState.ts` (default value), `App.tsx` (mount component, pass state), `LayerUI.tsx` (render in UI layer), `actions/index.ts` (register action)
- **No breaking changes** — purely additive, feature-flagged off by default
- **Performance risk**: rendering overhead on large scenes; mitigated by lazy/debounced updates and optional OffscreenCanvas rendering
