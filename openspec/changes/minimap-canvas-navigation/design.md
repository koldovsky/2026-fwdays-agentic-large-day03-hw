## Context

Excalidraw renders its scene on two layered HTML canvases — a `StaticCanvas` (elements, grid, background) and an `InteractiveCanvas` (selection handles, cursors). The scene coordinate system is independent of the viewport: `scrollX`/`scrollY` and `zoom.value` in `AppState` define what portion of the scene is visible. All elements live in scene coordinates; rendering transforms them via `sceneCoordsToViewportCoords()`.

There is no existing minimap. A closed PR (#2992, Dec 2021) proved the concept but was rejected for performance reasons: it re-rendered the minimap on every frame including scrolls, causing significant FPS drops on large scenes.

Key utilities already available:

- `getCommonBounds(elements)` → `[minX, minY, maxX, maxY]` of all elements
- `sceneCoordsToViewportCoords()` / `viewportCoordsToSceneCoords()` for coordinate transforms
- `throttleRAF()` for frame-rate throttling
- `ElementBounds` WeakMap cache for element bounds

## Goals / Non-Goals

**Goals:**

- Render a scaled-down overview of all scene elements in a fixed overlay panel
- Show a viewport rectangle that reflects `scrollX`, `scrollY`, `zoom`, and canvas dimensions
- Allow clicking and dragging the viewport rectangle (or any point on the minimap) to pan the main canvas
- Lazy rendering: re-render minimap canvas only when `elements` change, not on scroll/zoom
- Off by default; toggled via keyboard shortcut and toolbar button

**Non-Goals:**

- Full-fidelity element rendering in the minimap (simplified shapes are acceptable)
- Interactive element selection via the minimap
- Minimap zoom controls
- Mobile/touch optimization (defer to follow-up)

## Decisions

### D1: Separate minimap canvas, not reusing the static canvas

**Decision**: Render the minimap to a dedicated `<canvas>` element inside a React component.

**Rationale**: Reusing `renderStaticScene()` directly would couple minimap rendering to the main render pipeline and inherit all its transforms and clipping. A dedicated canvas with its own coordinate system is simpler, independently throttleable, and easier to position via CSS.

**Alternatives considered**:

- SVG export reuse (suggested in PR comments) — would work but SVG serialization is expensive and loses the native canvas rendering path
- CSS `transform: scale()` on a hidden full-size canvas — technically clever but fragile across zoom levels and DPI

---

### D2: Render simplified shapes only (bounding boxes + type hints)

**Decision**: Draw element bounding rectangles (with rough fill/stroke color) rather than full shape paths.

**Rationale**: At minimap scale (typically 150–200px wide), fine detail is invisible. Full element rendering via `renderElement()` is expensive. Drawing axis-aligned bounding boxes using `getElementBounds()` (already cached) is O(n) with minimal per-element cost.

**Alternatives considered**:

- Full `renderStaticScene()` call scaled down — too expensive on large scenes (this is what killed PR #2992)
- Render to OffscreenCanvas in a Web Worker — valid future enhancement, deferred to Phase 3

---

### D3: Debounced re-render on element version, live viewport rectangle

**Decision**: Track a hash/version of the elements array. Re-render the minimap canvas only when elements change (debounced 200ms). The viewport rectangle is an absolutely-positioned `<div>` overlay updated on every render (cheap CSS repositioning, no canvas repaint).

**Rationale**: Scroll and zoom events are high-frequency. Separating the expensive canvas repaint (element changes) from the cheap overlay repositioning (viewport moves) avoids the performance cliff seen in PR #2992.

**Implementation detail**:

```
elements hash = elements.length + sum of (el.id + el.version)
```

Simple and fast — no deep comparison needed.

---

### D4: Minimap pan updates main canvas scrollX/scrollY via existing action

**Decision**: On minimap click/drag, compute the scene coordinate under the pointer and call `centerScrollOn()` from `packages/excalidraw/scene/scroll.ts` (already exists) to reposition the main viewport.

**Rationale**: Reuses existing scroll logic, respects offset/zoom math. No new scroll primitives needed.

---

### D5: `minimapEnabled` as AppState boolean (not local component state)

**Decision**: Store `minimapEnabled` in `AppState` so it participates in undo/redo, serialization, and external API control.

**Rationale**: Consistent with how other toggleable modes (`gridModeEnabled`, `objectsSnapModeEnabled`) are handled. Also allows library consumers to control minimap visibility.

## Risks / Trade-offs

| Risk | Mitigation |
| --- | --- |
| Performance regression on large scenes (>1000 elements) | Debounced re-render (200ms), simplified bounding-box rendering, and an optional FPS guard that auto-hides minimap if main canvas drops below 30 FPS |
| Minimap obscures canvas content | Make minimap semi-transparent (0.85 opacity), allow drag-to-reposition in a follow-up, or provide a collapse affordance |
| Coordinate math edge cases at extreme zoom levels | Use the same `sceneCoordsToViewportCoords` utilities already battle-tested in main rendering |
| OffscreenCanvas / Worker complexity | Deferred to Phase 3; not required for MVP |

## Migration Plan

- Feature is off by default (`minimapEnabled: false`) — no migration needed
- No schema changes to `.excalidraw` file format
- Rollback: remove the toggle; component is purely additive

## Open Questions

- Should `minimapEnabled` be persisted to localStorage like `gridModeEnabled`? (Probably yes — follow existing pattern)
- What is the right minimap size? Fixed 180×120px, or proportional to canvas aspect ratio? (proportional)
- Should the minimap be repositionable by the user (drag to corner)? (no)
