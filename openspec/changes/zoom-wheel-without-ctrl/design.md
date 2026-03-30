## Context

Canvas navigation today is implemented in `packages/excalidraw/components/App.tsx` in `handleWheel`: **Ctrl/Cmd+wheel** (and pinch, which often sets `ctrlKey`) runs the zoom path anchored to `lastViewportPosition`; otherwise **wheel** pans the viewport, and **Shift+wheel** performs horizontal scrolling (with Mac-specific handling for `deltaX`/`deltaY`). Editor preferences and persistence follow patterns in `appState.ts` (browser vs export flags) and the settings UI elsewhere in the package.

## Goals / Non-Goals

**Goals:**

- Add a **user preference** (default **off**) that, when enabled, maps **plain vertical/horizontal wheel** on the interactive canvas to the **same zoom behavior** as the current Ctrl/Cmd+wheel path (including step shaping and `getStateForZoom` / `translateCanvas` usage), so users can zoom without holding a modifier.
- Preserve **predictable panning** when the preference is on: users must still be able to scroll the canvas without zooming—use **Shift+wheel** to take the role of today’s **non-shift** wheel panning (both `deltaX` and `deltaY` as today), and keep **Shift+wheel** horizontal behavior aligned with existing branch logic where possible (including Mac `deltaX`/`deltaY` notes in code).
- Keep **pinch / Ctrl+wheel** behavior coherent: the existing `metaKey || ctrlKey` branch remains the canonical zoom path when modifiers are present; the new mode only changes interpretation of **unmodified** wheel on the canvas.
- **Persist** the preference with the same mechanism as similar editor toggles (local storage / IDB migration path used by the project for `browser: true` fields).

**Non-Goals:**

- Changing default behavior for embeds or upstream consumers without an explicit opt-in (preference default remains “current behavior”).
- Browser UI zoom (whole page) — we only care about canvas handling inside Excalidraw.
- Redesigning zoom physics, `ZOOM_STEP`, or min/max zoom limits.

## Decisions

1. **State shape**: Add a boolean on `AppState` (name TBD in implementation, e.g. `zoomWithWheel` / `wheelZoomWithoutModifier`) with `browser: true` persistence so the choice survives reloads.
2. **Wheel routing** (when preference **on**):
   - If `metaKey || ctrlKey` → keep **existing zoom branch** (pinch and explicit modifier zoom unchanged).
   - Else if `event.shiftKey` → **pan** using the same logic as the current **non-shift** tail of `handleWheel` (`translateCanvas` with `deltaX`/`deltaY` / zoom scaling as today).
   - Else → **zoom** using the same logic as the current `metaKey || ctrlKey` block (reuse code paths to avoid drift).
3. **When preference off** → preserve **today’s** branch order exactly (no behavior change).
4. **UI**: One toggle in the existing settings surface used for editor/canvas preferences, with i18n keys; helper text optional if other toggles use it.
5. **Testing**: Extend or add tests that simulate wheel events with and without modifiers for both preference states; cover at least one assertion that default-off matches legacy behavior.

## Risks / Trade-offs

- **Muscle memory**: Users who rely on wheel-to-pan will need **Shift+wheel** to pan when the option is on—document in UI or release notes.
- **Platform variance**: Trackpads emit different `delta` patterns; reusing the existing zoom block minimizes new divergence.
- **Touch**: Touch handling is separate from wheel; out of scope unless regressions appear in manual QA.
