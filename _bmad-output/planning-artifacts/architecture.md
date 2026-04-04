---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
workflowType: architecture
lastStep: 8
status: complete
completedAt: "2026-04-03"
project_name: 2026-fwdays-agentic-large-day03-hw
user_name: Kaliuzhnyi.ye
date: "2026-04-03"
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

The PRD defines **21 FRs** focused on **standalone text** (not general shape stroke/fill unless shared UI forces it). Architecturally this implies:

- A **text paint model** with at least **fill** and optional **outline** (color + thickness), exposed consistently in **properties UI**, **inline editor**, and **render pipelines**.
- **Three rendering surfaces** that must stay aligned: interactive **canvas**, **WYSIWYG** overlay, and **vector export** (SVG). Raster export should match where the product already guarantees parity for text.
- **Persistence**: new or remapped fields on `ExcalidrawTextElement` (or equivalent) with **documented defaults** and **migration** from today’s “stroke as fill” behavior.
- **Integrators**: stable **serialization contract**, optional fields, and public docs for any schema or prop surface changes.

**Non-Functional Requirements:**

- **Performance (NFR-P1, NFR-P2):** no user-noticeable interaction regression with many text elements; vector export time stays same order of magnitude as pre-change baselines.
- **Accessibility (NFR-A1, NFR-A2):** new controls match existing picker baseline; copy/locales updated for non-conflicting terminology.
- **Integration (NFR-I1, NFR-I2):** backward-readable scenes per versioning policy or explicit version bump with embedder documentation.

**Scale & Complexity:**

- **Primary domain:** Web client — **canvas + SVG + DOM editor**, monorepo (`packages/element`, `excalidraw-app`, embed package).
- **Complexity level:** **Medium** — constrained feature surface but touches **element schema**, **three render paths**, **theme filters**, and **file compatibility**.
- **Architectural components (initial guess):** element types & serialization, canvas renderer, SVG scene export, wysiwyg styling, actions/properties UI, i18n strings, tests/docs.

### Technical Constraints & Dependencies

- **Brownfield:** must preserve **visual parity** for untouched legacy text per PRD migration rules.
- **Browser variance:** text **stroke** and **paint order** (e.g. Safari) are a known risk area — architecture should allow **focused QA** and **snapshot/SVG tests** where the repo already uses them.
- **Shared naming:** `strokeColor` today means **glyph fill** for text; any new model must reduce ambiguity for **shapes vs text** in code and UI.

### Cross-Cutting Concerns Identified

- **Single source of truth** for text paint state and its mapping to canvas, SVG `<text>`, and editor CSS.
- **Migration & versioning** (file format + optional API for embedders).
- **Theming** (`applyDarkModeFilter` or successor) applied consistently to fill and stroke colors.
- **Testing strategy** for cross-surface parity and legacy scene loads.

## Starter Template Evaluation

### Primary Technology Domain

**Brownfield extension** of the **Excalidraw monorepo** — not a greenfield web app. No new project starter is selected; implementation must follow existing workspace boundaries (`packages/*`, `excalidraw-app`, `examples/*`).

### Starter Options Considered

| Option | Verdict |
|--------|---------|
| Greenfield starters (e.g. Vite/React CLI, T3, Next.js) | **Rejected** — would fork away from upstream; out of scope. |
| Incremental change inside current repo | **Selected baseline** — all work lands as patches to published packages and app. |

### Selected Starter: *Existing Excalidraw monorepo*

**Rationale for Selection:** PRD and project classification are **brownfield**; the capability contract (FRs) assumes the current editor, embed package, and serialization pipeline.

**Initialization Command:**

```bash
# No new scaffold. Standard repo workflow:
yarn
# Then use project-documented dev commands for the app / packages.
```

**Architectural Decisions Already Provided by the Codebase:**

**Language & Runtime:** TypeScript (strict configs per package), Node ≥ 18.

**Build & dev tooling:** Yarn workspaces; **Vite** for `excalidraw-app`; **esbuild** for library packages (per repository conventions).

**Testing:** **Vitest** and existing test scripts (`yarn test:*`).

**Code organization:** Text rendering and element behavior primarily **`packages/element`**; editor UI, wysiwyg, and integration in **`packages/excalidraw`** / `excalidraw-app`; SVG export alongside canvas render paths.

**Development experience:** ESLint, Prettier, husky — extend rather than replace.

**Note:** Implementation stories branch from this monorepo and preserve **embedder-facing** package APIs unless a versioned breaking change is explicitly approved.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

1. **Text paint model** — how fill vs outline are represented on `ExcalidrawTextElement` and how legacy `strokeColor`-as-fill maps forward.
2. **Render contract** — single definition of “resolved paint” consumed by canvas, SVG `<text>`, and wysiwyg styling.
3. **Migration default** — untouched legacy text stays visually stable; document whether upgraded internal representation happens on **first user edit** vs **on load** (team must pick one before coding; PRD prefers no silent visual shift on load).

**Important Decisions (Shape Architecture):**

4. **Outline width semantics** — align text outline width with existing **scene stroke width** conventions where possible for predictable UX.
5. **Theme / dark mode** — apply the same color pipeline as other elements to **both** fill and outline (e.g. existing dark-mode filter helpers).
6. **Property surface** — which controls appear for text-only vs mixed selection; i18n keys and copy (FR4, NFR-A2).

**Deferred (Post-MVP per PRD):**

- Advanced outline (dash, joins, miter); meme presets; formal comparison matrix vs other editors.

### Data Architecture

- **Decision:** Extend the **scene graph** via text element fields (and optional file-format version bump), not a separate database.
- **Modeling:** Treat **fill** and **outline** as explicit capabilities on text; avoid overloading `strokeColor` for two meanings after migration.
- **Validation:** Centralize normalization (defaults, invalid combinations) when mutating elements so all surfaces stay consistent.
- **Migration:** Implement **deserialize-time** and/or **mutate-time** mapping from legacy documents; document rules in CHANGELOG and integrator notes (NFR-I1/I2).

### Authentication & Security

- **Decision:** **No new auth or server security scope** for this feature. Existing client-side model applies; no new secrets or PII handling from text paint alone.

### API & Communication Patterns

- **Decision:** **Scene JSON serialization** is the primary contract for data exchange; changes must be **backward compatible** or **explicitly versioned** for `@excalidraw/excalidraw` consumers.
- **Documentation:** Public list of new optional fields and migration behavior (FR16–FR17).

### Frontend Architecture

- **State:** Text paint remains **per-element** scene state; updates use established **`mutateElement`** (or equivalent) paths — no parallel shadow state for colors.
- **UI:** Property controls follow existing **selection / Actions** patterns; keyboard and a11y match current pickers (FR13–FR14, NFR-A1).
- **Wysiwyg:** Inline editor uses the same resolved colors as canvas (FR7).

### Infrastructure & Deployment

- **Decision:** Use **existing** CI (`yarn test:typecheck`, `yarn test:update`, etc. per project docs). No new deployment topology for this feature.

### Decision Impact Analysis

**Implementation Sequence (suggested):**

1. Lock **data model + migration** (including default resolved paint for legacy).
2. Implement **canvas** render + **SVG** export with shared helpers for resolved colors/outline.
3. Wire **wysiwyg** + **property UI** + **i18n**.
4. Add **tests** (snapshots / SVG samples / legacy file fixtures) and **docs**.

**Cross-Component Dependencies:**

- `packages/element` drives renderers and types consumed by app and embedders.
- UI copy and control visibility depend on final **field names** and **migration** story.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical conflict points:** element field naming, where paint logic lives, canvas vs SVG parity, migration touch points, i18n keys, test placement, and avoiding duplicate color state.

### Naming Patterns

**Code & types (TypeScript):**

- New persisted fields on text elements use **camelCase** consistent with existing `ExcalidrawElement` properties.
- Prefer **semantic names** for text (e.g. `textFillColor` / `textStrokeColor` — exact names decided at implementation) — **do not** use ambiguous names like `strokeColor2`.
- Shared helpers: **verb–noun** functions (e.g. `getResolvedTextPaint`, `normalizeTextElementForRender`) colocated in **`packages/element`** unless the repo already defines a canonical text utility module.

**Database naming:** N/A (client scene graph only).

**HTTP REST:** N/A for this feature; scene JSON keeps **camelCase** keys consistent with existing elements.

### Structure Patterns

**Project organization:**

- **Types, defaults, migration, shared paint resolution** → **`packages/element`** (`types`, `newElement`, transforms, helpers re-exported via package entry).
- **Canvas drawing** → `packages/element/src/renderElement.ts` (and related element render code).
- **SVG export** → `packages/excalidraw/renderer/staticSvgScene.ts` (must use same resolved paint as canvas).
- **Raster/static scene** → `packages/excalidraw/renderer/staticScene.ts` if text appears there.
- **Wysiwyg** → `packages/excalidraw/wysiwyg/textWysiwyg.tsx` (+ tests alongside).
- **Property UI / actions** → `packages/excalidraw/components/` (e.g. `Actions.tsx` and related), following existing stroke/fill controls.

**Tests:** **Vitest**, placed next to existing tests for the touched modules; add **legacy scene fixtures** alongside existing serialization/renderer tests if the repo uses that pattern.

### Format Patterns

**Scene JSON:**

- New fields **optional** with defaults on deserialize; follow existing **file version** strategy if bumped.
- Color values: match existing element conventions (string colors / existing palette model).

### Communication Patterns

**State updates:**

- User-visible style changes → **scene mutation** (`mutateElement` / batch APIs). **Never** paint from React/local UI state without updating the element model.

**Render order (canvas):**

- Document one approach (typically **stroke then fill** per line) and reuse everywhere text is drawn to canvas.

**SVG parity:**

- One approach for outline/fill on `<text>` (including `paint-order` or equivalent if required) matching canvas.

### Process Patterns

**Errors:** Use existing guards; invalid combinations fall back to safe defaults rather than throwing in render hot paths.

**Loading:** N/A for this feature.

### Enforcement Guidelines

**All implementers MUST:**

- Land **canvas + SVG + wysiwyg** updates together or split with an explicit tracked follow-up that blocks release.
- Add tests that detect **divergence** between surfaces for the same fixture.
- Run **`yarn test:typecheck`** and **`yarn test:update`** (or repo-documented equivalents) before merge.

**Review checklist:** (1) single paint resolver, (2) migration documented, (3) locale strings updated.

### Pattern Examples

**Good:** Shared `resolveTextPaint(element, theme)` consumed by element canvas render and excalidraw SVG export.

**Anti-patterns:** Duplicating color math only in the app; SVG missing stroke that canvas shows; new UI label only in English.

## Project Structure & Boundaries

### Complete Project Directory Structure (feature-relevant view)

Root follows the **Excalidraw monorepo** (`excalidraw-monorepo` in `package.json`). The full repository tree is not duplicated here; implementers work inside the existing repo. Below are paths that **must** be considered for text fill/stroke work.

```
excalidraw-monorepo/
├── package.json                 # Yarn workspaces, root scripts (test, typecheck)
├── excalidraw-app/              # Full app shell (consumes packages)
├── packages/
│   ├── element/                 # Core element types & canvas render
│   │   └── src/
│   │       ├── renderElement.ts # Canvas text paint (fillText today)
│   │       ├── types.ts         # ExcalidrawTextElement & base fields
│   │       ├── newElement.ts    # Element construction defaults
│   │       ├── transform.ts     # Resize / mutate helpers (typical touchpoint)
│   │       └── …
│   ├── excalidraw/              # Editor UI, SVG export, wysiwyg
│   │   ├── renderer/
│   │   │   ├── staticSvgScene.ts # SVG <text> fill (strokeColor today)
│   │   │   ├── staticScene.ts    # Static raster path if text rendered here
│   │   │   └── interactiveScene.ts
│   │   ├── wysiwyg/
│   │   │   ├── textWysiwyg.tsx   # Inline editor color (strokeColor today)
│   │   │   └── textWysiwyg.test.tsx
│   │   ├── components/
│   │   │   ├── Actions.tsx       # Property UI (stroke/fill controls)
│   │   │   └── App.tsx           # Integration / scene host
│   │   ├── scene/
│   │   │   └── export.ts         # Export pipeline touchpoints
│   │   └── locales/              # i18n (en.json, …)
│   ├── common/, math/, utils/    # Shared helpers — use if color/math lives here
│   └── …
└── examples/                      # Optional: embed examples if new props must be demonstrated
```

### Architectural Boundaries

**API boundaries:** No new HTTP API. **Boundary = public package exports**: `@excalidraw/element` types and serialized JSON consumed by `@excalidraw/excalidraw` embedders.

**Component boundaries:**

- **`packages/element`:** element model + canvas render; avoid React dependencies; must not import from `packages/excalidraw`.
- **`packages/excalidraw`:** React UI, wysiwyg, SVG pipeline; imports from `@excalidraw/element`.

**Data boundaries:** Single source of truth = **scene elements** in app state; persistence = existing **JSON** / file format.

### Requirements to Structure Mapping

| FR category (PRD) | Primary location |
|-------------------|------------------|
| Text appearance (FR1–FR5) | `components/Actions.tsx` (or siblings), `wysiwyg/textWysiwyg.tsx` |
| Cross-surface consistency (FR6–FR8) | `element/renderElement.ts` ↔ `excalidraw/renderer/staticSvgScene.ts` ↔ `textWysiwyg.tsx` |
| Document compatibility (FR9–FR11) | `element` types + deserialize/restore + `newElement`/migration helpers |
| Theming (FR12) | Shared color resolution using existing theme helpers (both packages as needed) |
| A11y / i18n (FR13–FR14, NFR-A) | `components/*`, `locales/*` |
| Integrators (FR16–FR17) | Package `CHANGELOG`, developer docs; optional `examples/` |
| QA (FR18–FR19) | Colocated `*.test.ts` / `*.test.tsx`; export tests near `scene/export` |

### Integration Points

**Internal:** Mutation flows from UI → scene → `renderElement` + export paths + wysiwyg style updates.

**External:** Host apps embedding `@excalidraw/excalidraw` — only via **documented** serialized fields and semver policy.

### File Organization Patterns

- **Configuration:** Root/tooling unchanged unless a new lint or build rule is required.
- **Source:** Stay within existing package boundaries; avoid new top-level packages unless maintainers require them.
- **Tests:** Mirror existing layout (e.g. `textWysiwyg.test.tsx` next to source).

### Development Workflow Integration

- **Dev:** `yarn` + documented dev server for app/packages.
- **Build:** Existing Vite (app) + esbuild (packages) pipelines.
- **CI:** Existing workspace CI; no new deploy target for this feature.

## Architecture Validation Results

### Coherence Validation

**Decision compatibility:** Brownfield monorepo stack is consistent with client-only scope. Text paint split (fill vs outline) aligns with three-surface render contract and JSON serialization. No conflicting backend or database assumptions.

**Pattern consistency:** Naming (camelCase, semantic text fields), package boundaries (`element` vs `excalidraw`), and mutation-via-scene rules support the documented decisions.

**Structure alignment:** Listed paths match the repository layout; the mapping table ties PRD FR categories to concrete modules.

### Requirements Coverage Validation

**Epic/Feature coverage:** No epics document was loaded; coverage is traced from the **PRD FR/NFR** only.

**Functional requirements:** FR1–FR19 map to element model, renderers, wysiwyg, UI, i18n, tests, and docs. FR20–FR21 are explicitly out of scope or post-MVP — no architecture gap.

**Non-functional requirements:** NFR-P (performance) is addressed via no-regression constraints and shared render helpers. NFR-A (accessibility/copy) via existing picker patterns and locales. NFR-I (serialization/embedders) via optional fields and versioning policy.

### Implementation Readiness Validation

**Decision completeness:** Critical decisions are documented; **exact field names** and **final migration trigger** (on load vs first user edit) remain to be locked during implementation (called out in Core Architectural Decisions).

**Structure completeness:** The feature-relevant tree is specific; the full monorepo tree is intentionally omitted.

**Pattern completeness:** Multi-agent conflict points (naming, render order, cross-package duplication) are covered with examples and anti-patterns.

### Gap Analysis Results

| Priority | Gap | Mitigation |
|----------|-----|------------|
| Important | Final property names on `ExcalidrawTextElement` | Decide in the first implementation story; update this document if the team wants a frozen schema appendix |
| Important | Exact file-format / version bump policy | Follow the repository’s existing versioning; document in CHANGELOG |
| Nice | Reference captures comparing canvas vs SVG | Add during QA if helpful |

### Validation Issues Addressed

No blocking contradictions were found. Remaining items are **specification todos**, not architectural conflicts.

### Architecture Completeness Checklist

**Requirements analysis:** context, scale, constraints, cross-cutting concerns — satisfied.  
**Architectural decisions:** text paint, migration, surfaces — satisfied (with noted TBDs).  
**Implementation patterns:** naming, structure, render/state rules — satisfied.  
**Project structure:** boundaries and FR→path mapping — satisfied.

### Architecture Readiness Assessment

**Overall status:** **READY FOR IMPLEMENTATION** (pending resolution of field names and migration trigger in stories).

**Confidence level:** **High** for scope and boundaries; **medium** until migration edge cases are exercised on real legacy files.

**Key strengths:** Clear three-surface contract; strict package boundary; explicit anti-patterns for implementer consistency.

**Areas for future enhancement:** Post-MVP stroke styling; caption presets; formal comparison matrix vs other editors (per PRD Vision).

### Implementation Handoff

**Guidelines for implementers:** Follow this document and the PRD; do not merge canvas-only or SVG-only text paint without a tracked parity follow-up.

**First implementation priority:** Finalize **element schema + migration defaults**, then implement **shared resolved paint** (e.g. `resolveTextPaint` or equivalent) and wire **canvas + SVG + wysiwyg** plus tests.
