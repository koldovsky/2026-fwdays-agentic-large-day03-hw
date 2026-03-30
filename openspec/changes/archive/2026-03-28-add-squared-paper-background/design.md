## Context

Excalidraw currently supports a flat canvas background color and a separate grid mode used for snapping and visual guidance. The background color is configured through `changeViewBackgroundColor`, while the grid is rendered through the scene render path and is intentionally disabled during export. The requested squared paper feature needs to behave as canvas presentation rather than snapping behavior, which makes it a cross-cutting change across canvas controls, app state persistence, live rendering, and export rendering.

## Goals / Non-Goals

**Goals:**
- Introduce a persisted canvas background pattern setting with an initial `squared-paper` option.
- Render the squared paper pattern in the editor and in exported output when background export is enabled.
- Preserve the existing grid mode semantics so snapping and visual grid overlays remain independent from the new paper background.
- Keep the UI change within the existing canvas background controls and permission gates.

**Non-Goals:**
- Adding multiple notebook styles such as dotted or ruled paper in this change.
- Changing grid snapping behavior, grid sizing semantics, or grid shortcuts.
- Introducing theme-specific customization UI for paper line density, spacing, or color.

## Decisions

### 1. Store background presentation as a dedicated app state field
Add a new app state field for canvas background pattern, with a default `none` value and an explicit `squared-paper` option.

Rationale:
- `viewBackgroundColor` already represents the base canvas fill and should remain a color value.
- A dedicated field avoids overloading color parsing or encoding pattern metadata into existing export options.
- Persisting the field in app state keeps restore, collaboration payloads, and export inputs consistent with existing canvas preferences.

Alternatives considered:
- Encode the paper style into `viewBackgroundColor`: rejected because it conflates unrelated concerns and complicates existing color-only call sites.
- Reuse `gridModeEnabled`: rejected because grid mode affects snapping and intentionally does not export.

### 2. Render the paper pattern as background decoration before elements and separately from grid rendering
Extend the static scene rendering pipeline so the paper pattern is drawn after canvas bootstrap/background fill and before elements are rendered. Keep the existing `renderGrid` branch unchanged for snapping grid overlays.

Rationale:
- This preserves the current visual stack: canvas fill, optional paper decoration, optional grid overlay, scene elements.
- Export rendering already uses the same static render pipeline, so adding paper rendering there avoids a second implementation path.
- The change remains local to rendering configuration instead of leaking pattern-specific logic into unrelated element rendering code.

Alternatives considered:
- Render the paper pattern as DOM or CSS background outside the canvas: rejected because export and raster consistency would diverge.
- Replace the existing grid renderer with a styled variant: rejected because the snapping grid has different semantics and export behavior.

### 3. Attach the UI to existing canvas background controls
Expose the pattern selector next to the current canvas background picker, guarded by the same `UIOptions.canvasActions.changeViewBackgroundColor` gate used for background customization.

Rationale:
- Users already discover background-related controls in this location.
- The permission surface stays stable for embedders that disable canvas background editing.
- The feature can ship with a minimal UI footprint without introducing a new preferences area.

Alternatives considered:
- Add the option under grid preferences: rejected because it incorrectly suggests snapping behavior.
- Add a separate context-menu toggle: rejected because the feature needs configuration rather than a binary shortcut only.

### 4. Export behavior follows `exportBackground`
When `exportBackground` is enabled, exports SHALL include both the base background color and the squared paper pattern. When disabled, exports SHALL omit both the fill and the paper pattern.

Rationale:
- This matches existing expectations for background export toggles.
- Users asking for squared paper are specifically blocked by the current non-exporting grid overlay behavior.

Alternatives considered:
- Export paper independently of `exportBackground`: rejected because it would create a new export rule users must learn and would diverge from current background semantics.

## Risks / Trade-offs

- Pattern rendering adds extra draw work on large canvases or exports -> Mitigate by drawing only within the normalized viewport/export area and reusing existing zoom/scroll inputs.
- A default line color may have poor contrast in light or dark themes -> Mitigate by deriving paper line color from theme-aware background helpers and validating both themes in tests.
- New app state fields can break restore/export consumers if not threaded everywhere -> Mitigate by updating defaults, restore/clear-canvas paths, and app state tests together.
- UI density in the canvas background section may increase -> Mitigate by using a compact selector with a `none` default instead of exposing multiple new controls.

## Migration Plan

No data migration is required. Existing scenes default to `none` for the new background pattern field when the property is absent. Rollback is low-risk because older scenes without the field already render with plain background color only.

## Open Questions

- Whether squared paper spacing should reuse the existing grid size or use a fixed visual spacing tuned for notebook-style writing.
- Whether the line color should be fully theme-derived or use a fixed subtle tint across themes for paper familiarity.