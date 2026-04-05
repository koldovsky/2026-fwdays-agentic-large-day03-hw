## Context

Multi-point creation for lines and arrows uses `AppState.multiElement` and `AppState.newElement`. Escape during that mode is supposed to route to `actionFinalize`, which keeps committed points and clears trailing hover state. A separate Escape path in `onKeyDownFromPointerDownHandler` cancels single-segment drag creation when `multiElement === null`.

The bug remains: pressing Escape while drawing a multi-point line (or equivalent multi-segment path) can still remove the element instead of finalizing it—often described as the “curve” disappearing. Prior analysis points to interaction between the window-level key handler, React state timing, and `onPointerUpFromPointerDownHandler` after mid-drag Escape. The spec scenario **Escape after only one committed point** (delete invisibly-small / meaningless geometry) is not yet covered by an explicit test in `dragCreate.test.tsx`.

## Goals / Non-Goals

**Goals:**

- Finalize multi-point linear elements on Escape with all committed points preserved (`isDeleted === false`) whenever at least two meaningful points exist; do not remove the element from the scene due to the single-segment cancel path.
- Ensure pointer-up after Escape does not delete or corrupt an element already finalized during pointer-down.
- Add a **dedicated** `dragCreate.test.tsx` test for **Escape after only one committed point**, matching the spec.
- Keep single-segment Escape-to-cancel behavior unchanged.

**Non-Goals:**

- Broader Escape behavior (text editing, crop, etc.).
- Changing UX beyond finalize-vs-cancel rules already described in specs.

## Decisions

### 1. Fix handler ordering and guards

**Decision:** Re-verify guards in `onKeyDownFromPointerDownHandler` so the cancel branch runs only for true single-segment creation (`multiElement === null` and no multi-point in progress). If stale state is suspected, narrow the cancel condition using the active linear element and committed point count (e.g. only cancel when the in-progress element is still a single-segment drag) instead of broadening deletion.

**Rationale:** Misclassification sends multi-point flows through the cancel/remove path.

### 2. Pointer-up idempotency after finalize

**Decision:** In `onPointerUpFromPointerDownHandler`, keep an explicit early exit when `newElement` and `multiElement` are both cleared after `actionFinalize`, so linear cleanup does not run on a finalized element.

**Rationale:** Avoids double-processing and accidental removal.

### 3. Tests in `dragCreate.test.tsx`

**Decision:** Add an explicit test that: line tool → one click (one committed point) → Escape → assert behavior per spec (element removed or not present as a finalized multi-point line). Complement with tests for 2+ committed points + Escape if not already present or insufficient.

**Rationale:** The user requested an explicit test for the one-point scenario; multi-point tests lock in the disappearing-curve fix.

## Risks / Trade-offs

- **React state batching** — Handlers may see pre-update `this.state`; mitigated by precise guards and pointer-up early exit.
- **Duplicate tests** — Avoid overlapping cases; name scenarios clearly in test titles.

## Migration Plan

None; behavior fix and tests only.

## Open Questions

None blocking implementation; if production still shows deletion, add a focused trace around `actionFinalize.perform` and `isInvisiblySmallElement` for the affected element.
