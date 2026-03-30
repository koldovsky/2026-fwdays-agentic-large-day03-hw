## Context

The laser pointer tool renders animated trails that fade automatically using a `sizeMapping` function in `LaserTrails` (`packages/excalidraw/laser-trails.ts`). The fade combines two decay curves:

- **Time-based**: trail opacity decays over `DECAY_TIME = 1000ms` from creation
- **Length-based**: older (farther back) segments of a trail decay over `DECAY_LENGTH = 50` units

Trails are rendered via `AnimatedTrail` (`animated-trail.ts`) which filters out fully-faded `pastTrails` on each animation frame. The `LaserTrails` class is instantiated once in `App.tsx` as `this.laserTrails` and managed via `startPath()` / `addPointToPath()` / `endPath()`.

There is currently no `AppState` field for laser configuration — the laser is only tracked via `activeTool.type === "laser"`.

## Goals / Non-Goals

**Goals:**
- Add a user-controlled toggle to switch the laser between temporary (current fade behavior) and persistent (trails stay until cleared) mode
- Allow clearing persistent trails via UI action and keyboard shortcut (Delete/Backspace)
- Persist the toggle setting in browser storage across sessions
- Add i18n entries for all new UI strings

**Non-Goals:**
- Changing the appearance or color of laser trails
- Exporting or saving laser trails to the canvas as permanent elements
- Implementing a separate "annotation tool" (suggested as future work by maintainer; out of scope here)
- Modifying collab/remote trail behavior

## Decisions

### 1. State location: `AppState.laserToolPersistence`

Add `laserToolPersistence: boolean` to `AppState` (default `false`). This keeps laser config alongside other tool config and integrates with the existing browser-storage persist mechanism.

**Alternative considered**: Store in a separate React ref or class property on `App`. Rejected because `AppState` is the canonical source for tool configuration, is automatically wired to browser storage, and the UI toggle needs to read/write it reactively.

### 2. Disable decay in `sizeMapping` when persistence is enabled

In `LaserTrails.sizeMapping`, check the persistence flag before computing decay. When `laserToolPersistence === true`, return `1` (fully opaque) unconditionally, so trails never fade and are never filtered out.

**Alternative considered**: Add a separate `PersistentTrail` class. Rejected as over-engineering — the single `sizeMapping` guard is minimal and keeps all trail logic in one place.

### 3. `clearTrails()` method on `LaserTrails`

Expose `clearTrails()` on `LaserTrails` that empties `pastTrails` and aborts any `currentTrail`. Called from:
- A `DropdownMenu.Item` "Clear laser trails" action in `Actions.tsx` (shown only when persistence is on)
- A `keydown` handler in `App.tsx` for Delete/Backspace when laser tool is active and persistence is on

**Alternative considered**: Dispatch an `actionClearLaserTrails` through the normal action system. This would work but adds indirection for a non-element action; direct method call is simpler and consistent with how `stop()` is called.

### 4. UI: `DropdownMenu.ItemCheckbox` inside the laser tool dropdown

Add a checkbox item to the existing laser tool dropdown in `Actions.tsx` for the persistence toggle, and a separate "Clear" item below it (visible only when persistence is on). This follows the pattern of other tool options in the same menu.

**Alternative considered**: A floating toolbar or context menu. Rejected to stay consistent with existing tool-option placement.

## Risks / Trade-offs

- **Persistent trails are not canvas elements** → they disappear on page reload even if `laserToolPersistence` is persisted. Users may be confused. Mitigation: UI label clarifies trails are session-only.
- **Collab sessions**: remote laser trails use the same `AnimatedTrail` plumbing but are driven by collab events. Persistence toggle will only apply to the local user's trails. Remote trails will continue to fade. Mitigation: document this limitation; out of scope for this change.
- **Performance**: persistent trails accumulate in `pastTrails` indefinitely until cleared. For long sessions this could grow large. Mitigation: trails are SVG path strings, impact is low; no action needed for v1.

## Migration Plan

1. Add `laserToolPersistence: boolean` to `AppState` with default `false` — no migration needed, existing sessions get the default.
2. Add to browser-storage persist list alongside other tool settings.
3. Deploy: no rollback concerns; default preserves existing behavior entirely.

## Open Questions

- Should clearing persistent trails also be bound to the Escape key (in addition to Delete/Backspace)? Escape currently deselects tools. Decision can be deferred to implementation.
- Should the "Clear" action also be available via the Edit menu or toolbar? Out of scope for v1.
