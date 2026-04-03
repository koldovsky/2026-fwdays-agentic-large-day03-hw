# OpenSpec initial prompt — triangle shape + elbow binding (GitHub #8955)

Use this as the **argument or first message** for `/opsx:propose` (or paste into chat when running the propose skill).  
**Product decisions below are agreed** (full scope, all arrow modes, one triangle tool + fill/stroke, rotation, strict protected files first, no text-in-triangle v1).

**Suggested change id (kebab-case):** `triangle-shape-elbow-binding`

---

## Prompt text (copy from here)

**Goal:** Address [Excalidraw issue #8955 — Add triangle shape](https://github.com/excalidraw/excalidraw/issues/8955): users want a **triangle** shape, and **elbow (orthogonal) arrows** should bind/interact using **triangular geometry**, not the shape’s **axis-aligned bounding box** (the “rectangle frame” problem when connecting).

**Background in this fork (verify in code before designing):**

- `@excalidraw/element` already defines element types **`triangle`** and **`triangle_outline`** and handles them in shape logic (e.g. `packages/element/src/shape.ts`). The **toolbar** in `packages/excalidraw/components/shapes.tsx` currently exposes **rectangle, diamond, ellipse** — not triangle — so “add triangle” may mean **first-class UI + creation flow**, not only geometry types.
- **Elbow arrows** are a first-class mode (`currentItemArrowType: "elbow"` in `packages/excalidraw/types.ts`). Binding and hit-testing for arrows likely need to treat triangle like other polygons (compare **diamond**), not as a plain rectangle.
- **Architecture:** Prefer **actions + `syncActionResult`** over ad hoc scene mutation (`docs/memory/systemPatterns.md`). Element model / bounds / bindings live heavily under **`packages/element`**; UI and pointer orchestration under **`packages/excalidraw`**.

**Constraints:**

- Follow **`.cursor/rules/do-not-touch.mdc`**: do **not** change `packages/excalidraw/scene/Renderer.ts`, `packages/excalidraw/data/restore.ts`, `packages/excalidraw/actions/manager.tsx`, or `packages/excalidraw/types.ts` without explicit approval and the full verification path described there and in `AGENTS.md`.
- No new npm dependencies without explicit approval (see `.cursor/rules/architecture.mdc`).
- Verification: call out **`yarn test:typecheck`**, targeted **`vitest`** for new behavior, and **`yarn test:all`** (or project gate) before merge; update snapshots if UI tests change.

**Success criteria (agreed):**

1. **Scope — §1 A (full):** Triangle in the **shape picker** **and** correct **binding / elbow** (and other bound arrows per §3) for `triangle` / `triangle_outline`. Align toolbar slot / keys with existing patterns in `shapes.tsx` / `KEYS` (no ad hoc shortcuts without conflict check).
2. **Elbow + triangle:** Binding / snap / connection geometry follows **triangle outline** (or documented approximation), not the **AABB “rectangle frame”** — matching issue #8955.
3. **Other arrow modes — §2 B:** **All** arrow binding to triangles uses the same **shape-aware** attachment logic (not elbow-only).
4. **Fill/outline — §3 A:** **One** triangle tool; **fill/stroke** UI selects **`triangle`** vs **`triangle_outline`** (same model as rectangle).
5. **Rotation — §4 A:** **Rotated** triangles: binding follows **rotated** polygon; cover with tests.
6. **Protected files — §5:** Prefer **no** edits to `Renderer.ts`, `restore.ts`, `manager.tsx`, `types.ts`; if unavoidable, **stop** for explicit approval + full gate per `AGENTS.md`.
7. **Non-goals — §6:** **Out of scope v1:** text bound inside triangle; export fidelity work **unless** binding preview is wrong in export.

**References:**

- Issue: https://github.com/excalidraw/excalidraw/issues/8955  
- Repo guidance: `AGENTS.md`, `docs/memory/systemPatterns.md`, `docs/memory/techContext.md`

---

## Decision log — alternatives, tradeoffs, recommendation

Pick one letter per section (or note a hybrid). The **Recommendation** line is a sensible default for this fork and issue #8955.

### §1 — Product scope (toolbar vs geometry-only)

| Option | What you get | Pros | Cons |
|--------|----------------|------|------|
| **A — Full** | Triangle in shape picker **+** correct binding/elbow for triangles | Matches issue title (“add triangle”); users can actually draw triangles; one coherent PR | Larger diff; touches UI, i18n, possibly icons/shortcuts |
| **B — Binding only** | Fix elbow/binding for `triangle` / `triangle_outline` elements that already exist in JSON/API | Smaller scope; avoids toolbar debates; good if you only care about connector correctness | Triangles still awkward to create unless you paste JSON or have another path; incomplete vs “add shape” |
| **C — Phased** | **Phase 1:** binding/elbow + tests. **Phase 2:** toolbar + creation | De-risks geometry; ship value early; clear OpenSpec archive boundary between phases | Two changes to propose/archive; slightly more process overhead |

**Recommendation:** **A** if this homework is “ship the feature”; **C** if you want the smallest first merge (geometry proof) then UX. **B** only if you explicitly do not want a toolbar change.

---

### §2 — Which arrow modes use triangular geometry

| Option | What you get | Pros | Cons |
|--------|----------------|------|------|
| **A — Elbow only** | Orthogonal routing respects triangle outline; sharp/round unchanged | Directly targets #8955 wording (“elbow”); possibly smaller code path | Inconsistent UX: same triangle looks “right” for elbow but “boxy” for sharp arrows |
| **B — All bound arrows** | Any arrow binding to triangle uses the same shape-aware attachment logic | Consistent with user mental model (“the shape is a triangle”); closer to diamond-like behavior | More call sites / tests; slightly higher regression surface |

**Recommendation:** **B** for product consistency unless you are time-boxed — then **A** with a spec note that sharp/round may still use AABB until a follow-up.

---

### §3 — Filled vs outline in the UI (only if §1 is A or C phase 2)

| Option | What you get | Pros | Cons |
|--------|----------------|------|------|
| **A — Both types** | `triangle` and `triangle_outline` in picker (or one tool with fill toggle) | Matches existing element types; parity with rectangle/diamond patterns | More UI work; need clarity on default fill vs stroke |
| **B — Filled only first** | Single tool creating `triangle` | Faster; covers most diagrams | Outline fans wait or use hacky workarounds |
| **C — Outline only first** | Single tool creating `triangle_outline` | Good for wireframes | Less common default for “shape fill” workflows |

**Recommendation:** **A** implemented like other shapes: **one** toolbar slot, **fill/stroke** controls already in the app decide between solid and outline (same mental model as rectangle).

---

### §4 — Rotation

| Option | What you get | Pros | Cons |
|--------|----------------|------|------|
| **A — Full parity** | Rotated triangle: binding follows rotated polygon | Correct for real scenes | More math/edge cases; more tests |
| **B — V1 orthogonal world** | Spec states “unrotated or rotation = 0 only” for new guarantees | Smaller v1 | Weak; users rotate shapes often |

**Recommendation:** **A** — binding code paths usually already receive transform; explicitly **excluding** rotation tends to create bug reports immediately.

---

### §5 — Where you allow code to touch (compatibility / protected files)

| Option | What you get | Pros | Cons |
|--------|----------------|------|------|
| **A — Strict** | Implement without editing `restore.ts`, `types.ts` (core), `Renderer.ts`, `manager.tsx` | No protected-file approval path | May be impossible if triangle needs new `AppState` fields or restore normalization — then you must escalate |
| **B — Allowed with approval** | Change protected files if design requires it, run full gate + QA per `AGENTS.md` | Unblocks correct architecture when unavoidable | Review burden; easy to violate policy accidentally |

**Recommendation:** Start design under **A**; if investigation shows binding state or types **must** change, document why and switch to **B** with explicit approval — do not “sneak” edits past the rule.

---

### §6 — Optional non-goals (pick explicitly to avoid scope creep)

| Topic | Skip (default) | Include if you care |
|-------|----------------|---------------------|
| Text bound inside triangle | **Skip** — diamond/text has special cases; triangle doubles work | Only for documentation tools |
| Toolbar shortcut / slot order | Defer to **match diamond/ellipse pattern** (slot after ellipse or logical group) | Only if you have a strict keyboard map |
| Export (PNG/SVG) fidelity | **Skip** unless binding preview is wrong in export | Visual regression tests |

**Recommendation:** **Skip** text-in-triangle for v1 unless the PRD requires it. For **shortcut/slot**, follow existing shape ordering and key discovery in `packages/excalidraw/components/shapes.tsx` / `KEYS` — avoid inventing a new global shortcut without checking conflicts.

---

## Locked decisions (stakeholder: agreed with recommendations)

- §1 **A** — full (toolbar + binding)  
- §2 **B** — all bound arrows shape-aware  
- §3 **A** — one tool, fill/stroke → type  
- §4 **A** — rotation supported  
- §5 **A** first, **B** only with explicit approval  
- §6 — skip text-in-triangle v1; shortcut/slot follow existing patterns  

---

## Next step

Run **`/opsx:propose triangle-shape-elbow-binding`** and paste the **Prompt text** section (from **Goal** through **Success criteria**) so the agent generates `proposal.md`, `specs/`, `design.md`, and `tasks.md` under `openspec/changes/`.
