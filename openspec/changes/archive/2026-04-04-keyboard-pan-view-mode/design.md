## Context

Excalidraw's canvas position is controlled by `scrollX`/`scrollY` in AppState. Keyboard events are handled centrally in `App.tsx` via `onKeyDown`/`onKeyUp` listeners registered on `document`. View mode (`viewModeEnabled`) restricts interactions to read-only — only hand and laser tools are available. Currently, arrow keys have no behavior in view mode.

The existing animation infrastructure includes `easeToValuesRAF()` for smooth scroll transitions and `cancelInProgressAnimation()` for interrupting them. However, there is no velocity-based momentum system — all animations are duration-based easing.

## Goals / Non-Goals

**Goals:**

- Enable fluid arrow-key panning in view mode with ease-in on press and ease-out (decay) on release
- Support simultaneous keys for diagonal movement
- Keep the implementation self-contained — no changes to existing scroll/pan logic
- Work correctly with zoom (pan in screen space, not scene space)

**Non-Goals:**

- Arrow-key panning in edit mode (conflicts with element nudging, text editing, etc.)
- Configurable pan speed or key bindings
- Gamepad or joystick support
- Infinite/wrap-around canvas scrolling

## Decisions

### 1. Velocity-based animation loop (not discrete steps)

**Choice**: Use a `requestAnimationFrame` loop that tracks velocity per axis, applies acceleration while keys are held, and applies friction/decay when released.

**Alternatives considered**:
- *Discrete scroll increments per keydown*: Feels choppy, no momentum. Rejected.
- *Reuse `easeToValuesRAF()`*: Designed for point-to-point animation with known duration, not open-ended velocity-based movement. Would need significant rework. Rejected.

**Rationale**: A velocity model naturally handles simultaneous keys (each axis independent), smooth start/stop, and variable frame timing via delta-time.

### 2. Track pressed keys in a Set, derive direction each frame

**Choice**: Maintain a `Set<string>` of currently pressed arrow keys. Each animation frame reads the set to determine acceleration direction.

**Alternatives considered**:
- *Boolean flags per direction*: Works but a Set is cleaner and scales if more keys are added.
- *Accumulate velocity in keydown handler*: Misses the continuous acceleration feel; keydown repeat rate varies by OS.

**Rationale**: Decoupling key state from animation logic keeps the code simple and frame-rate independent.

### 3. Encapsulate in a dedicated class/module

**Choice**: Create a `KeyboardPanEngine` class (or similar) in a new file `packages/excalidraw/keyboard-pan.ts` that owns the animation loop, velocity state, and scroll updates. `App.tsx` only wires key events into it and provides a scroll update callback.

**Alternatives considered**:
- *Inline everything in App.tsx*: App.tsx is already very large (~10k lines). Adding animation state and RAF management would increase complexity. Rejected.
- *Action-based approach*: Actions are designed for discrete state transitions, not continuous animation loops. Poor fit. Rejected.

**Rationale**: Isolation makes the feature testable and easy to remove/modify without touching App.tsx internals.

### 4. Animation parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Max velocity | ~20 px/frame (at 60fps) | ~1200 px/s, comfortable for large canvases |
| Acceleration | ~1.5 px/frame² | Reaches max in ~13 frames (~220ms) — snappy but not instant |
| Friction (decay) | 0.92 multiplier/frame | Velocity halves in ~8 frames (~130ms) — short, noticeable coast |
| Dead zone | < 0.5 px/frame | Stop the loop when velocity is negligible |

These values should be tuned during implementation. All are constants in the module, easy to adjust.

## Risks / Trade-offs

- **[Performance]** An RAF loop runs continuously while panning. → Mitigation: Loop self-terminates when velocity drops below dead zone and no keys are pressed. No ongoing cost when idle.
- **[Key conflict]** Arrow keys may have other bindings in view mode. → Mitigation: Currently arrow keys do nothing in view mode. Guard with `viewModeEnabled` check.
- **[OS key repeat]** Holding a key fires repeated `keydown` events. → Mitigation: Use `event.repeat` to ignore repeats; the Set-based approach already handles this since re-adding an existing key is a no-op.
- **[Focus loss]** If the window loses focus while keys are held, `keyup` may never fire. → Mitigation: Listen for `blur` event to clear all pressed keys and let friction stop the animation.
