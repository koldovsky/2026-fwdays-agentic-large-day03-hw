## Why

The laser tool currently fades strokes using a time-based decay in trail rendering, so highlights disappear after about a second—fine for a pointer, but awkward for teaching and demos where emphasis should stay visible. [GitHub issue #9884](https://github.com/excalidraw/excalidraw/issues/9884) asks for an optional persistent mode (similar to iPad laser) while keeping today’s behavior as the default.

## What Changes

- Add a **user-visible mode** for the laser: **Temporary** (default, current fade behavior) vs **Persistent** (strokes remain until cleared or mode switched back).
- Wire mode into local laser trail rendering (`LaserTrails` / `AnimatedTrail` / `LaserPointer` options) so persistent strokes do not time-decay the same way as temporary ones.
- Provide **clear or reset** for persistent laser marks (exact UX to match design: e.g. action, context control, or leaving laser tool—specified in design).
- Preserve **backward compatibility**: default remains temporary; no change to existing sessions unless the user opts in.
- Consider **collaboration**: remote laser trails should follow the same semantics where feasible (or document limitations if only local persistence is in scope for v1).

## Capabilities

### New Capabilities

- `laser-persistence`: User-controlled laser behavior—temporary vs persistent trails, default temporary, and explicit clearing of persistent marks.

### Modified Capabilities

- _(None.)_ No existing OpenSpec capability specs in `openspec/specs/` yet; this change introduces the first scoped spec for this behavior.

## Impact

- **Code**: `packages/excalidraw/laser-trails.ts` (decay via `sizeMapping`), `packages/excalidraw/animated-trail.ts`, likely `packages/excalidraw/components/App.tsx` for pointer handling, UI near laser tool (`LayerUI`, `LaserPointerButton`, or tool submenu), and possibly `AppState` / actions for mode + clear (avoid editing protected `types.ts` / `manager.ts` without approval—prefer extending via existing patterns).
- **Tests**: `packages/excalidraw/tests/laser.test.tsx` and any new unit/UI tests for mode toggle and clear.
- **Dependencies**: Existing `@excalidraw/laser-pointer`; no new packages expected unless design requires it.
- **API / embed**: If `AppState` or props surface laser options, document for hosts; default behavior unchanged.

## Risks

- **Performance with many persistent strokes** — Large `pastTrails` growth could slow laser updates. *Mitigation:* Cap segment count or batch invalidations; add tests around many-stroke sessions; monitor frame time in manual QA.
- **UX confusion (Temporary vs Persistent)** — Users may not understand why marks linger or how to remove them. *Mitigation:* Default **Temporary**; clear labels/tooltips; show **Clear laser marks** only when relevant; document in help/release notes.
- **Backward compatibility / sessions** — Existing flows assume ephemeral laser only. *Mitigation:* Default unchanged; treat persistence as opt-in; document embed/host expectations.
- **Collaboration / sync** — Remote lasers may not match local persistence semantics. *Mitigation:* v1 local-only persistence for completed strokes where needed; document protocol limits; add tests for local vs remote where applicable.
- **Test and maintenance burden** — Mode toggle, clear, and decay branches multiply scenarios. *Mitigation:* Keep automated coverage (`laser.test.tsx`, typecheck, app tests); require `yarn build` before merge for packaging regressions.
