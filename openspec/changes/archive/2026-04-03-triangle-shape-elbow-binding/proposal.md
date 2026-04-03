## Why

Users expect a first-class **triangle** shape in the editor and correct **arrow binding** (especially **elbow / orthogonal** connectors) that follows the **triangle outline**, not the shape’s axis-aligned bounding box—matching [Excalidraw issue #8955](https://github.com/excalidraw/excalidraw/issues/8955). Without this, diagrams look wrong and connectors “snap” to an invisible rectangle frame.

## What Changes

- Add **triangle** to the **shape picker / toolbar** with the same patterns as rectangle, diamond, and ellipse (slot order and keyboard shortcuts aligned with `shapes.tsx` / `KEYS`; no ad hoc global shortcuts without conflict checks).
- Creation flow supports **`triangle`** and **`triangle_outline`** via existing **fill/stroke** controls (one toolbar slot; type follows fill model like rectangle).
- **All bound arrow modes** (not only elbow) use **shape-aware** attachment geometry against the **triangle polygon**, including when the triangle is **rotated**.
- **Tests** for binding / elbow routing against triangles (including rotation); **typecheck** and **Vitest** as the primary automated gates; snapshot updates only where UI tests require it.
- **Out of scope v1:** text bound inside triangles; export fidelity work unless binding preview is wrong in export.

## Capabilities

### New Capabilities

- `triangle-shape-binding`: End-to-end behavior for adding triangle shapes from the UI and for arrow binding (sharp, round, elbow) to use triangular geometry instead of AABB, with rotation support and agreed non-goals above.

### Modified Capabilities

- _(None — `openspec/specs/` has no prior capability specs in this repo.)_

## Impact

- **`packages/element`**: shape/binding/hit-test math for `triangle` / `triangle_outline` (parity with polygon shapes like diamond where applicable).
- **`packages/excalidraw`**: toolbar (`components/shapes.tsx`), pointer/creation flows, any binding orchestration that is not already generic.
- **Protected files** (per `.cursor/rules/do-not-touch.mdc`): prefer **no** edits to `Renderer.ts`, `restore.ts`, `manager.tsx`, or `types.ts`; if investigation shows they are unavoidable, stop for explicit approval and full verification per `AGENTS.md`.
- **Tooling**: `yarn test:typecheck`, targeted `vitest`, and `yarn test:all` (or project gate) before merge; no new npm dependencies without explicit approval.
