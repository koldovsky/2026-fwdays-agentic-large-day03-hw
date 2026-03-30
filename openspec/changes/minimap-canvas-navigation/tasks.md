## 1. AppState & Toggle Infrastructure

- [x] 1.1 Add `minimapEnabled: boolean` to `AppState` interface in `packages/excalidraw/types.ts`
- [x] 1.2 Set `minimapEnabled: false` as default in `packages/excalidraw/appState.ts`
- [x] 1.3 Create `packages/excalidraw/actions/actionToggleMinimap.tsx` with keybind `M` and toolbar button definition
- [x] 1.4 Register the new action in `packages/excalidraw/actions/index.ts`
- [x] 1.5 Persist `minimapEnabled` to localStorage (follow `gridModeEnabled` pattern in App.tsx)

## 2. Minimap Renderer

- [x] 2.1 Create `packages/excalidraw/renderer/renderMinimap.ts` — function `renderMinimap(canvas, elements, appState)` that draws bounding-box representations of all elements
- [x] 2.2 Use `getCommonBounds(elements)` to compute scene extents and derive minimap scale transform
- [x] 2.3 Draw each element as a filled/stroked axis-aligned rectangle using `getElementBounds()` (leverages existing WeakMap cache)
- [x] 2.4 Wrap the render call with a 200ms debounce tied to an element version hash (`elements.length + sum of el.version`)

## 3. Minimap React Component

- [x] 3.1 Create `packages/excalidraw/components/Minimap.tsx` — renders a `<canvas>` for the scene overview and a `<div>` overlay for the viewport rectangle
- [x] 3.2 Accept props: `elements`, `appState` (for scrollX, scrollY, zoom, width, height)
- [x] 3.3 Compute viewport rectangle position/size from `appState` scroll/zoom values and update it on every render (CSS repositioning, no canvas repaint)
- [x] 3.4 Call `renderMinimap()` inside a `useEffect` that depends on the elements version hash (not appState scroll/zoom)
- [x] 3.5 Implement click handler: convert minimap pointer coords to scene coords and call `centerScrollOn()` to pan main canvas
- [x] 3.6 Implement drag handler: same coordinate conversion, update scroll on `pointermove` until `pointerup`
- [x] 3.7 Create `packages/excalidraw/components/Minimap.scss` — fixed positioning bottom-right, semi-transparent background, viewport rect border style

## 4. App Integration

- [x] 4.1 Mount `<Minimap>` in `packages/excalidraw/components/LayerUI.tsx` (conditionally rendered when `appState.minimapEnabled`)
- [x] 4.2 Pass `elements` and `appState` from `App.tsx` through to `LayerUI` / `Minimap`
- [x] 4.3 Wire the `actionToggleMinimap` dispatch so toolbar button and keybind update `appState.minimapEnabled`

## 5. Performance Hardening

- [x] 5.1 Guard `renderMinimap` with `requestIdleCallback` fallback (use `throttleRAF` pattern from `packages/common/src/utils.ts` as reference)
- [x] 5.2 Skip all minimap work (no element iteration, no canvas ops) when `minimapEnabled === false`
- [ ] 5.3 Test with the stress-test scene from PR #2992 (`map.excalidraw`) — confirm no visible FPS regression on main canvas interactions

## 6. Tests & Cleanup

- [x] 6.1 Add unit tests for `renderMinimap` (mocked canvas context, check draw calls for given elements)
- [x] 6.2 Add unit tests for coordinate conversion in Minimap component (click → scene coords → scroll update)
- [ ] 6.3 Update snapshot tests (`yarn test:update`) to include minimap toggle state
- [ ] 6.4 Run `yarn test:typecheck` and fix any TypeScript errors
- [ ] 6.5 Run `yarn fix` for formatting/linting
