## Context

Excalidraw switches from a shape-drawing tool back to **selection** (or **lasso**) when the user finalizes or cancels drawing mode (e.g. Esc). Dragging on empty canvas then starts **box selection** or **lasso selection**, not element creation. Some users interpret that as “broken” drawing. The product already uses **cursor shape**, **toolbar highlighting**, and **selection visuals**; this change adds an optional **toast** for a narrow class of gestures. Reference: [GitHub issue #9541](https://github.com/excalidraw/excalidraw/issues/9541).

## Goals / Non-Goals

**Goals:**

- Provide a **clear textual hint** when a drag on empty canvas in selection-like tools likely reflects mistaken “draw” intent.
- Keep the hint **low-frequency** (once per tab session) to avoid annoying power users.
- Keep logic **testable** (pure predicate + integration smoke test).
- Cover **selection** and **lasso** as selection-like modes.

**Non-Goals:**

- Replace or duplicate the primary visual language (cursor, selection rectangle, lasso trail).
- Show hints on every failed draw attempt or on single clicks without a qualifying drag.
- Persist opt-out across devices or users (no account-level preference in this change).
- Change how Esc or tool state transitions work.

## Decisions

1. **Toast vs tooltip**  
   - **Choice:** Use existing **toast** (`setToast`) with a short message and optional close control.  
   - **Rationale:** Toasts are already used for ephemeral editor messages; tooltips tied to canvas position are harder to implement consistently across zoom/scroll.  
   - **Alternative:** Extend `HintViewer` only — rejected for this change because the issue explicitly mentions toast/tooltip-style messaging and hint bar may not fire on the same gesture boundary.

2. **Where to hook**  
   - **Choice:** Evaluate eligibility on **pointer up** after the gesture completes, using `pointerDownState` and snapshot of `activeTool` from the same interaction.  
   - **Rationale:** All flags (box select occurred, lasso path extended, drag distance, hit target) are known at end of gesture; avoids flashing toast mid-drag.

3. **Pure predicate module**  
   - **Choice:** Implement `shouldShowSelectShapeToolToast(params)` in a small util; `App.tsx` only aggregates parameters and calls `setToast`.  
   - **Rationale:** Unit tests without mounting the full app; easier to review guard conditions.

4. **Session frequency cap**  
   - **Choice:** `sessionStorage` key set when the toast is first shown; skip if key present or `sessionStorage` unavailable.  
   - **Rationale:** Matches “explain once per session” product goal; avoids repeated noise.  
   - **Alternative:** LocalStorage — rejected as too sticky across sessions.

5. **Lasso parity**  
   - **Choice:** Track a `lasso.hasOccurred` (or equivalent) on the pointer-down state when the lasso path accumulates points, and OR it with box-selection occurrence for eligibility.  
   - **Rationale:** Users with **lasso** as preferred selection experience the same mental model gap as rectangular selection.

## Risks / Trade-offs

- **[Risk] Toast still feels noisy** → Mitigation: session cap; strict predicate (empty hit, no resize/edit, distance threshold).
- **[Risk] False positives** → Mitigation: exclude hits on elements, resizing, linear edit mode, `newElement` in progress; require drag distance above `DRAGGING_THRESHOLD`.
- **[Risk] `sessionStorage` blocked** → Mitigation: skip toast path safely; no throw.
- **[Risk] Upstream rejects toast UX** → Mitigation: document in proposal; fork or product build can keep behavior independently of upstream merge.

## Migration Plan

- **Deploy:** Standard app release; no data migration.
- **Rollback:** Remove or feature-flag the pointer-up branch and util; locale keys can remain unused.

## Open Questions

- Whether upstream prefers **only** visual affordances long-term; if so, consider contributing **documentation** or **HintViewer** text instead of toast.
- Whether to add a **settings** toggle (“Show drawing hints”) in a later change.
