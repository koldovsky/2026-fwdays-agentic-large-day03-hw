## Context

[`packages/element`](packages/element) already defines **`triangle`** and **`triangle_outline`** in element types and renders them in [`shape.ts`](packages/element/src/shape.ts). The main gap for issue [#8955](https://github.com/excalidraw/excalidraw/issues/8955) is **discoverable creation** (toolbar) and **arrow binding / elbow routing** that still behaves like an **AABB** for some code paths. Diamond and other polygons are the reference for “shape-aware” binding. Editor orchestration follows **actions + `syncActionResult`** per [`docs/memory/systemPatterns.md`](docs/memory/systemPatterns.md).

## Goals / Non-Goals

**Goals:**

- Triangle appears in the **shape picker** with patterns consistent with rectangle / diamond / ellipse (`packages/excalidraw/components/shapes.tsx`, `KEYS`).
- New elements use **`triangle`** or **`triangle_outline`** according to existing **fill/stroke** UI (one slot; same mental model as rectangle).
- **Every** arrow binding mode that can attach to a boundable shape uses **triangle outline geometry** (transformed polygon in scene space), including **elbow** orthogonal segments.
- **Rotated** triangles: attachment points and hit-testing follow the **rotated** triangle, with automated tests.

**Non-Goals:**

- Text bound **inside** the triangle (v1).
- Deliberate export / PNG / SVG fidelity work unless incorrect binding is visible there too.
- New npm dependencies or edits to **protected** core files without the approval path in [`AGENTS.md`](AGENTS.md) and [`.cursor/rules/do-not-touch.mdc`](.cursor/rules/do-not-touch.mdc).

## Decisions

1. **Implement binding in `@excalidraw/element` (and shared helpers) first**  
   **Rationale:** Scene truth and geometry live there; diamond-like polygon binding should extend or reuse the same abstractions elbow and sharp arrows already use for other shapes.  
   **Alternatives:** Patching only elbow in `packages/excalidraw` — rejected: violates “all arrow modes” and duplicates logic.

2. **Toolbar: mirror existing shape registration**  
   **Rationale:** Minimizes UX inconsistency and shortcut conflicts.  
   **Alternatives:** New global shortcut — rejected without explicit conflict audit.

3. **Avoid protected files (`Renderer.ts`, `restore.ts`, `manager.tsx`, `types.ts`) unless proven necessary**  
   **Rationale:** Project policy; triangles already exist in persisted data at the element layer.  
   **Alternatives:** Extend `types.ts` for new `AppState` — only if spike shows no other hook for toolbar state (unlikely).

4. **Testing: Vitest units for geometry + binding edge cases; rotation cases required**  
   **Rationale:** Regressions in binding are subtle; AABB vs polygon bugs are easy to reintroduce.

## Risks / Trade-offs

- **[Risk] Elbow routing has more call sites than sharp arrows** → **Mitigation:** Trace elbow binding from `currentItemArrowType: "elbow"` through element helpers; add one focused test per mode after unifying attachment API.
- **[Risk] Hidden dependency on AABB for “boundable” hit boxes** → **Mitigation:** Search for binding/snap code branches keyed by element type; align `triangle` / `triangle_outline` with `diamond` paths.
- **[Risk] i18n / icons for new toolbar item** → **Mitigation:** Reuse existing shape icon patterns and translation key conventions from sibling shapes.

## Migration Plan

- **Deploy:** Standard library/app release; no data migration—types already exist in JSON.
- **Rollback:** Revert commits; scenes with triangles remain valid if restore already accepts them.

## Open Questions

- Exact **toolbar slot order** and **shortcut key** after auditing `KEYS` conflicts (resolve during implementation; document choice in PR).
- Whether any **app-only** binding UI assumes rectangle-only geometry (spike in `packages/excalidraw` pointer layer).
