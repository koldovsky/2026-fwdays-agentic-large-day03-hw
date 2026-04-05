## Context

Multi-point line and arrow drawing already have written requirements in `escape-multipoint-finalize` and `escape-cancel-creation`: Escape with two or more committed points must finalize the element; Escape with one committed point may discard it. In practice, the generic Escape-to-cancel path for drag-create still runs for multi-point gestures in some cases, so the element is removed from the scene instead of being finalized. Prior work fixed similar issues for other tools; multi-point state (`multiElement`, linear editing flags) needs to be handled before the generic cancel branch.

## Goals / Non-Goals

**Goals:**

- Ensure Escape during multi-point linear creation finalizes the in-progress element when at least two points are committed, matching `escape-multipoint-finalize`.
- Clear `newElement` / `multiElement` and related interaction state after finalization without soft-deleting the finalized element.
- Add automated coverage for “Escape after exactly one committed point” in `dragCreate.test.tsx`, as requested for parity with the spec scenario.

**Non-Goals:**

- Changing freedraw, rectangle, or single-segment linear drag-cancel behavior.
- Changing UX for Enter, double-click, or pointer-up completion of multi-point shapes beyond what existing specs require.

## Decisions

1. **Order of handling in the Escape path** — Evaluate multi-point linear finalization (or explicit discard when only one point is committed) *before* the generic “cancel in-progress drag-create” logic that removes `newElement`. Rationale: the bug is a precedence issue; the generic path must not run when multi-point rules apply.

2. **Reuse existing finalization** — Prefer calling the same code path used for completing multi-point lines (e.g. `actionFinalize` or the existing handler that runs on Enter / pointer-up) so behavior stays consistent with non-Escape completion. Rationale: one code path reduces drift between Enter and Escape.

3. **Tests live in `dragCreate.test.tsx`** — Implement the single-point Escape scenario alongside existing drag-create tests, using the same patterns (pointer events, assertions on scene elements and `isDeleted`). Rationale: keeps interaction tests co-located and discoverable.

**Alternatives considered:** Adding only unit tests around a pure helper — rejected because the failure mode is integration between keyboard handling and scene updates; an integration-style test in `dragCreate.test.tsx` matches how other Escape behavior is validated.

## Risks / Trade-offs

- **[Risk]** Tightening guard conditions might skip legitimate cancel for a broken in-progress element. → **Mitigation:** Gate on explicit multi-point / `multiElement` signals already used elsewhere; run existing drag-create and Escape tests.

- **[Risk]** Curves (multi-point with many segments) vs “line” naming in tests. → **Mitigation:** Name tests after user action (line tool, multiple clicks) per existing suite style.

## Migration Plan

Not applicable — behavior fix and tests only; no data migration.

## Open Questions

- None blocking: exact function names (`actionFinalize`, cancel helpers) will be confirmed during implementation in the Excalidraw package.
