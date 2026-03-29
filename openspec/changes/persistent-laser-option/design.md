## Context

Laser strokes are rendered as SVG trails via `LaserTrails` → `AnimatedTrail` → `@excalidraw/laser-pointer`. Temporary fading is implemented in `laser-trails.ts` through `sizeMapping`, which reduces stroke contribution using `performance.now()` (`DECAY_TIME` ≈ 1s) and path length. `AnimatedTrail.onFrame` drops trails when `getStrokeOutline()` is empty. There is already `AnimatedTrail.clearTrails()` for wiping past trails.

The product goal ([issue #9884](https://github.com/excalidraw/excalidraw/issues/9884)) is an **optional** persistent mode (default stays temporary), plus a way to clear persistent marks.

**Constraints:** Editor state normally lives on `AppState` and updates through the action system. `packages/excalidraw/types.ts` and `actions/manager.ts` are **protected** in this repo—any new persisted UI preference that requires typing or registering a new action there needs **explicit maintainer approval** and full verification. Prefer the smallest surface change that matches existing patterns (e.g. how other tool options are stored).

## Goals / Non-Goals

**Goals:**

- User can choose **Temporary** vs **Persistent** laser behavior; **Temporary** remains default and matches current decay.
- In **Persistent** mode, completed strokes remain visible until the user clears them or switches back to Temporary (exact clear UX below).
- Local laser rendering and tests cover both modes.
- Document behavior for collaboration/embed consumers if state or props become public.

**Non-Goals:**

- Treating persistent laser strokes as normal canvas elements (selectable, in `.excalidraw` file format, undo stack as geometric edits)—unless a later change explicitly scopes that.
- Pixel-perfect parity with iPad Keynote laser—only “stays until cleared” semantics.
- **v1 optional:** Synchronizing persistent mode preference or persistent stroke geometry across collaborators (local-only behavior is acceptable if called out in spec).

## Decisions

1. **Where decay is controlled**  
   **Decision:** Drive persistence by passing different `LaserPointerOptions` (or a parallel flag read inside options factories) into `AnimatedTrail` / `LaserTrails`, so **Persistent** mode uses a `sizeMapping` (and related options) that does **not** time-decay toward zero—or uses a dedicated branch in trail update logic that skips decay for “persistent segments.”  
   **Rationale:** Keeps rendering inside the existing laser pipeline; avoids duplicating SVG path logic.  
   **Alternatives:** Separate overlay layer for persistent paths (more code); canvas-based laser (conflicts with current SVG approach).

2. **User preference storage**  
   **Decision:** Store mode in editor state following the same pattern as other tool-adjacent toggles (e.g. app state + action dispatch), so it is testable and consistent with collaboration hooks.  
   **Rationale:** Single source of truth; works with React updates.  
   **Alternatives:** Module singleton or `localStorage` only—faster to ship but harder to test and inconsistent with `App` state.  
   **Note:** If `AppState` or action registration cannot be extended under repo policy, fall back to an approved alternate (e.g. minimal approved delta to `types.ts`, or app-layer wrapper) before implementation.

3. **Discovery / UI**  
   **Decision:** Expose a **toggle** (checkbox or two-option control) in the **laser tool affordance**—toolbar popover, overflow menu, or existing laser button context—labeled clearly as Temporary vs Persistent (copy can follow i18n keys like existing `toolBar.laser`).  
   **Rationale:** Matches the issue suggestion; keeps mode next to the tool.  
   **Alternatives:** Global settings only—fewer discoverable.

4. **Clearing persistent strokes**  
   **Decision:** When any persistent trails exist, provide an explicit **Clear laser marks** control (toolbar entry, same popover as the toggle, or keyboard shortcut if the repo already uses one for laser). Switching **Persistent → Temporary** SHOULD either clear accumulated persistent trails or prompt/define behavior in spec (recommend: **clear** on switch to avoid mixed semantics).  
   **Rationale:** Avoids orphaned invisible state; uses `clearTrails()`-style behavior.  
   **Alternatives:** Leave old persistent strokes visible when switching to Temporary—confusing.

5. **Collaboration**  
   **Decision (v1):** Apply persistence to **local** trails first; **remote** collaborator lasers keep current ephemeral behavior unless low-cost to thread a flag through pointer messages.  
   **Rationale:** Smaller scope; remote laser is often “live pointer” only.  
   **Alternatives:** Full sync of persistent segments (requires protocol/storage decisions).

## Risks / Trade-offs

- **Protected core files** — Adding typed state may touch `types.ts` / actions → **Mitigation:** Get approval early; document in tasks; consider smallest possible API surface.
- **Performance** — Many persistent segments could grow `pastTrails` → **Mitigation:** Cap segments or document limit; reuse existing filter/update paths.
- **UX confusion** — Users may not know how to clear → **Mitigation:** Visible “Clear” when persistent trails exist; tooltips/strings.

## Migration Plan

- Ship with default **Temporary**; no migration for existing users.
- Rollback: hide toggle and force temporary `sizeMapping` if a critical bug is found.

## Open Questions

- Exact placement of the toggle in the current toolbar (desktop vs mobile collab bar).
- Whether switching to another tool should clear persistent laser marks or leave them until explicit clear (product call—bias: **keep** until clear for presenter use cases).
- Whether persistent strokes should survive **zoom/pan** (they should follow scene coordinates like today’s trails via `sceneCoordsToViewportCoords`).
