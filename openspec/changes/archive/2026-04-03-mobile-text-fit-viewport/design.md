## Context

Excalidraw text elements are created in scene coordinates. When a user double-clicks on the canvas to start typing, the text element's initial `x`, `y`, and `width` are derived from the pointer position in scene space. On desktop this is fine — the viewport is wide enough. On mobile (phones, narrow windows ≤ 599 px), the resulting element often extends outside the visible viewport, requiring the user to manually pan and resize before the text is readable.

**Relevant code paths:**

- `packages/excalidraw/wysiwyg/textWysiwyg.tsx` — WYSIWYG editor lifecycle; the `onSubmit` callback is where the text element is finalized.
- `packages/excalidraw/components/App.tsx` `handleTextWysiwyg()` (≈ line 5664) — calls `refreshTextDimensions()`, then updates state; this is the commit point.
- `packages/element/src/newElement.ts` `newTextElement()` — initial element construction.
- `packages/common/src/editorInterface.ts` — `isMobileBreakpoint(width, height)` returns `true` when `width ≤ 599` or `(height < 500 && width < 1000)`.
- `packages/element/src/bounds.ts` `getVisibleSceneBounds({ scrollX, scrollY, width, height, zoom })` — returns `[x1, y1, x2, y2]` in scene coordinates for the current viewport.
- `packages/common/src/utils.ts` `viewportCoordsToSceneCoords()` / `sceneCoordsToViewportCoords()` — coordinate conversion utilities.

**AppState properties used:** `scrollX`, `scrollY`, `zoom.value`, `width`, `height`, `offsetLeft`, `offsetTop`.

---

## Goals / Non-Goals

**Goals:**

- On mobile viewports (`isMobileBreakpoint` = `true`), after a text element is committed (onSubmit), reposition its `x` and constrain its `width` so the element fits within the visible viewport width.
- Apply a configurable horizontal margin (e.g., 16 px each side in screen space, converted to scene units) so the text does not touch screen edges.
- Keep the element's `y` position unchanged — vertical repositioning is not needed and risks interfering with intentional vertical placement.
- Ensure `autoResize` is set to `false` on the repositioned element so the width constraint is respected, and trigger `refreshTextDimensions()` to re-wrap text at the new width.
- Zero impact on desktop (`isMobileBreakpoint` = `false`).

**Non-Goals:**

- Changing font size, line height, or other style properties.
- Auto-scrolling/panning the viewport to the element after repositioning.
- Affecting text elements inside containers (`containerId !== null`).
- Supporting undo of the reposition as a separate history entry — it should be atomic with the text commit.
- Making the breakpoint or margin configurable via user settings.

---

## Decisions

### D1 — Hook into `handleTextWysiwyg` rather than `newTextElement`

**Decision:** Apply the viewport-fit logic inside the `onSubmit` callback in `App.handleTextWysiwyg()`, after `refreshTextDimensions()` has been called.

**Why:** `newTextElement()` runs before the user types anything — dimensions are unknown at that point. The `onSubmit` callback fires with final text content and measured dimensions, making it the only place where a meaningful reposition can happen. Hooking in earlier (e.g., `actionFinalize`) would require propagating appState down to the element package, violating the package boundary rules (`element` must not import from `excalidraw`).

**Alternatives considered:**

- _At element creation time (`newTextElement`):_ Width is unknown, would require a second pass anyway.
- _In `actionFinalize`:_ Would work but mixes element-specific mobile logic into the generic finalize action, reducing clarity.

---

### D2 — Use `getVisibleSceneBounds` + margin conversion for target width

**Decision:** Compute the target scene-space width as `(appState.width - 2 * MARGIN_PX) / appState.zoom.value`, where `MARGIN_PX = 16`. Then set `element.x` to `-appState.scrollX + MARGIN_PX / appState.zoom.value` (left edge of viewport in scene coords plus margin).

**Why:** `getVisibleSceneBounds` already encapsulates the scroll/zoom arithmetic. The margin ensures visual breathing room and matches common mobile UI conventions. All math stays in scene coordinates, which is what `mutateElement` expects.

**Alternatives considered:**

- _CSS-based approach:_ Not applicable — Excalidraw renders to canvas, not DOM.
- _Centering after repositioning:_ Adds scroll side-effects; out of scope.

---

### D3 — Use `mutateElement` to apply the reposition

**Decision:** Use `mutateElement(element, { x, width, autoResize: false })` followed by a call to `refreshTextDimensions(element, ...)` to re-wrap text at the new width.

**Why:** `mutateElement` is the only sanctioned way to mutate element properties (increments `version`/`versionNonce`, required for collab sync). Direct property assignment would bypass history.

**Alternatives considered:**

- _`newElementWith`:_ Creates a new element object, which would require updating all references; unnecessary complexity for an in-place mutation.

---

### D4 — Mobile detection via `isMobileBreakpoint(appState.width, appState.height)`

**Decision:** Use the existing `isMobileBreakpoint` function from `@excalidraw/common/src/editorInterface` with the editor's `width` and `height` from `appState`.

**Why:** This is the canonical mobile check already used across the Excalidraw UI. It covers both portrait phones (≤ 599 px wide) and landscape phones (height < 500 and width < 1000), which matches the user experience problem.

**Alternatives considered:**

- _`window.innerWidth`:_ Fragile — the editor can be embedded at non-full-window sizes; `appState.width` is always the actual editor width.
- _User-agent sniffing:_ Unreliable and harder to test.

---

## Risks / Trade-offs

| Risk | Mitigation |
| --- | --- |
| Re-wrapping text at a narrower width increases element height, potentially pushing content below the fold. | Acceptable trade-off; the text is at minimum visible horizontally. Vertical scroll is still available. |
| `autoResize: false` changes future editing behaviour — typing more text will no longer auto-expand the width. | This is intentional and consistent with the narrow-width constraint. Users can manually resize if needed. |
| The 599 px breakpoint may feel arbitrary on some devices. | Matches the existing `MQ_MAX_MOBILE` constant; keeps behaviour consistent with the rest of the UI. |
| Bound text elements (`containerId !== null`) must be excluded — their dimensions are controlled by the container. | Guard added: skip repositioning when `element.containerId !== null`. |

---

## Migration Plan

No migration needed — this is a purely additive change to the text commit flow. No existing data formats, APIs, or persisted element shapes are affected.

Rollback: removing the mobile guard and reposition call from `handleTextWysiwyg` fully reverts the feature.

---

## Open Questions

- Should the feature also apply when the user _edits_ an existing text element (re-enters WYSIWYG on an element that was originally created on desktop)? Current decision: **no** — only apply to freshly created elements (`isNew` flag if available) to avoid surprising repositions on existing content. Revisit if user feedback demands it.
