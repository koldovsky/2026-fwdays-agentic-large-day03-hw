---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-03-28'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
workflowType: 'architecture'
project_name: '2026-fwdays-agentic-large-day03-hw'
user_name: 'Alex'
date: '2026-03-28'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
10 FRs organized into 4 capability areas: Mermaid Text Sanitization (FR1-4), Import Entry Points (FR5-6), Element Integrity (FR7-8), Backward Compatibility (FR9-10). All tightly scoped — single-concern fix with no feature sprawl.

**Non-Functional Requirements:**
Single NFR category: Performance. Regex must be single-pass, no measurable regression on 100+ node diagrams.

**Scale & Complexity:**
- Primary domain: Client-side text transformation within existing React/Canvas app
- Complexity level: Medium — multiple code paths, but identical fix pattern in each
- Estimated architectural components affected: 3-4 files

### Components Affected

| Component | File | Role | Impact |
| --- | --- | --- | --- |
| TTD Dialog converter | `packages/excalidraw/components/TTDDialog/common.ts` | Calls `parseMermaidToExcalidraw()` → `convertToExcalidrawElements()` | **Direct** — sanitize text after parse, before element conversion |
| App clipboard handler | `packages/excalidraw/components/App.tsx` (lines ~3750-3774) | Detects Mermaid on paste → parses → converts | **Direct** — same sanitization needed |
| Element transform | `packages/element/src/transform.ts` (`bindTextToContainer`, line 218+) | Creates `ExcalidrawTextElement` from `label.text` | **Potential** — alternative single-point placement for sanitization |
| Text normalization | `packages/element/src/textMeasurements.ts` (`normalizeText`) | Normalizes EOL and tabs | **Not modified** — related prior art, currently no HTML awareness |

### Impact on Existing Architecture

1. **No new packages or dependencies.** Native `String.replace()` with regex.
2. **No API surface changes.** `ExcalidrawTextElement` type unchanged.
3. **No rendering pipeline changes.** Text sanitized before element creation.
4. **No serialization changes.** `.excalidraw` file format unaffected.
5. **No state management changes.** No `actionManager` modifications needed.

**Key architectural question:** Where to place the sanitization — per-entry-point (2+ locations) or at the funnel point (`transform.ts`). This is an ADR worth documenting.

### Technical Constraints & Dependencies

- `@excalidraw/mermaid-to-excalidraw` is an external dependency returning unsanitized HTML in label text — sanitization happens on Excalidraw's side
- `normalizeText()` exists as prior art for text normalization but is scoped to whitespace only
- Element bounds auto-calculated from text content — adding newlines naturally resizes elements if `autoResize: true`

### Cross-Cutting Concerns

- **Text sanitization pattern:** If placed in `transform.ts`, establishes a pattern for future HTML cleanup (post-MVP: `<b>`, `<i>` stripping)
- **Test infrastructure:** Existing Mermaid test mocks need updating to include `<br>` variants in label text

## Starter Template Evaluation

### Primary Technology Domain

Brownfield React/TypeScript monorepo — no starter template needed.

### Existing Technology Stack

- **Language & Runtime:** TypeScript (strict mode), targeting ES2020+
- **Framework:** React 18+ with functional components and hooks
- **Build Tooling:** Vite (app), esbuild (packages)
- **Testing:** Vitest with jsdom, @testing-library/react
- **Package Management:** Yarn workspaces monorepo
- **Styling:** CSS modules, colocated with components
- **Rendering:** Canvas 2D (custom render pipeline, not React DOM for drawing)

### Rationale

No starter evaluation needed — this is a bug fix within the existing codebase. All technology decisions are inherited from the project. The fix uses only native JavaScript APIs (`String.replace()`, `RegExp`).

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- ADR-001: Sanitization placement strategy

**Deferred Decisions (Post-MVP):**
- Full HTML tag stripping strategy (Phase 2)
- Rich text support architecture (Phase 3)

### ADR-001: Sanitization Placement Strategy

**Decision:** Option C — Utility function in `@excalidraw/common`, called explicitly at Mermaid import entry points.

**Implementation:**
- Create `sanitizeMermaidText(text: string): string` in `packages/common/src/`
- Export through `packages/common/src/index.ts`
- Call from `packages/excalidraw/components/TTDDialog/common.ts` after `parseMermaidToExcalidraw()` returns
- Call from `packages/excalidraw/components/App.tsx` in the Mermaid clipboard paste handler (~line 3750)
- Regex: `/<br\s*\/?>/gi` → replace with `\n`

**Rationale:**
- No duplicated regex — single source of truth in `@excalidraw/common`
- Explicit call sites — each Mermaid entry point clearly shows sanitization happening
- Follows existing architecture — `@excalidraw/common` is the base utility layer with zero external dependencies
- Extensible — post-MVP HTML tag stripping adds to the same function
- Does not pollute `transform.ts` with Mermaid-specific concerns

**Affects:** `@excalidraw/common`, `@excalidraw/excalidraw` (TTDDialog, App)

### Data Architecture

Not applicable — no data model changes. `ExcalidrawTextElement.text` stores `\n` characters (already supported).

### Authentication & Security

Not applicable — no security surface changes. The regex operates on Mermaid parser output (trusted internal data), not user-supplied HTML.

### Frontend Architecture

No changes to state management, component architecture, or rendering pipeline. The sanitization is a pure string transformation before element creation.

### Decision Impact Analysis

**Implementation Sequence:**
1. Create `sanitizeMermaidText()` in `@excalidraw/common`
2. Add to `common/src/index.ts` exports
3. Apply in `TTDDialog/common.ts`
4. Apply in `App.tsx` clipboard handler
5. Add tests for the utility function
6. Add integration tests for both entry points

**Cross-Component Dependencies:**
- `@excalidraw/excalidraw` depends on `@excalidraw/common` (already existing dependency)
- No new cross-package dependencies introduced

## Implementation Patterns & Consistency Rules

### Inherited Project Conventions

All patterns follow existing Excalidraw codebase conventions (documented in `.claude/rules/`):

**Naming:**
- File naming: `kebab-case.ts` (e.g., `mermaid-text-utils.ts`)
- Function naming: `camelCase` (e.g., `sanitizeMermaidText`)
- Type naming: `type` keyword preferred over `interface` for simple types
- Named exports only — no `export default`

**Code Patterns:**
- TypeScript strict mode — no `any`, no `@ts-ignore`
- Pure functions for utilities — no side effects, no state
- Import types with `import type { X } from "..."`

**Testing:**
- Vitest with `describe`/`it`/`expect` (globals, no imports needed)
- Colocated test files: `*.test.ts` alongside source
- Test behavior, not implementation
- No snapshot tests for new code
- Use `waitFor`/`findBy` instead of `setTimeout`

**Package Rules (`@excalidraw/common`):**
- Zero external dependencies
- Must not import from other `@excalidraw/*` packages
- Export through `index.ts`

### Fix-Specific Patterns

**Sanitization function pattern:**
```typescript
// packages/common/src/sanitize-mermaid-text.ts
export const sanitizeMermaidText = (text: string): string => {
  return text.replace(/<br\s*\/?>/gi, "\n");
};
```

**Call site pattern:**
```typescript
import { sanitizeMermaidText } from "@excalidraw/common";

// Apply to each element's label text after Mermaid parse
const sanitizedText = sanitizeMermaidText(element.label.text);
```

**Anti-patterns (do NOT do):**
- Do not add sanitization inside `normalizeText()` — that's for whitespace normalization, not HTML
- Do not add sanitization in the renderer — fix at the source, not at display time
- Do not modify `transform.ts` — keep Mermaid-specific logic out of general element creation
- Do not use `innerHTML` or DOM parsing for a simple regex replacement

### Enforcement

- Run `yarn test:code` — ESLint checks import order, naming, type imports
- Run `yarn test:other` — Prettier checks formatting
- Run `yarn test:typecheck` — TypeScript strict mode validation
- Grep for `export default` in changed files — must not exist

## Project Structure & Boundaries

### Affected Directory Structure

```
packages/
├── common/
│   └── src/
│       ├── index.ts                          # ← ADD export
│       └── sanitize-mermaid-text.ts          # ← NEW FILE (utility function)
│       └── sanitize-mermaid-text.test.ts     # ← NEW FILE (unit tests)
├── element/
│   └── src/
│       └── transform.ts                      # NO CHANGE (confirmed: not modified)
└── excalidraw/
    ├── components/
    │   ├── App.tsx                            # ← MODIFY (~line 3750, clipboard paste handler)
    │   └── TTDDialog/
    │       └── common.ts                     # ← MODIFY (after parseMermaidToExcalidraw call)
    └── tests/
        ├── MermaidToExcalidraw.test.tsx       # ← MODIFY (add <br> variant test cases)
        └── helpers/
            └── mocks.ts                      # ← MODIFY (update mock labels with <br>)
```

### Architectural Boundaries

**Package boundary:** `@excalidraw/common` → `@excalidraw/excalidraw`
- Utility function lives in `common` (base layer, zero dependencies)
- Consumers in `excalidraw` package import from `@excalidraw/common`
- Follows existing dependency direction — no circular dependencies

**Modification boundary:**
- `App.tsx` and `TTDDialog/common.ts` are in `packages/excalidraw/` — the main library
- `App.tsx` is not in the protected files list — safe to modify
- The change to `App.tsx` is minimal: one import + one function call wrapping existing text

### Requirements to Structure Mapping

| FR | File(s) |
| --- | --- |
| FR1-FR4 (sanitize `<br>` variants) | `packages/common/src/sanitize-mermaid-text.ts` |
| FR5 (clipboard paste path) | `packages/excalidraw/components/App.tsx` |
| FR6 (TTD dialog path) | `packages/excalidraw/components/TTDDialog/common.ts` |
| FR7-FR8 (element bounds, rendering) | No code change — verified via tests (bounds auto-calculated) |
| FR9-FR10 (backward compat) | Verified via existing test suite — no regressions |

### Data Flow

```
Mermaid text input
    ↓
parseMermaidToExcalidraw()          ← external library, returns raw HTML in labels
    ↓
sanitizeMermaidText(label.text)     ← NEW: <br> → \n conversion
    ↓
convertToExcalidrawElements()       ← existing: creates ExcalidrawElements
    ↓
bindTextToContainer()               ← existing: label.text → ExcalidrawTextElement
    ↓
Canvas rendering                    ← existing: renders \n as multi-line text
```

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:** All decisions are coherent. The single ADR (utility function in `@excalidraw/common`) aligns with the existing package dependency graph. `common` has zero external dependencies — adding a pure function with native `String.replace()` maintains that constraint.

**Pattern Consistency:** Implementation patterns match existing codebase conventions exactly — kebab-case files, camelCase functions, named exports, colocated tests, Vitest globals.

**Structure Alignment:** New files follow existing directory patterns. The utility function in `packages/common/src/` follows the same pattern as other common utilities.

### Requirements Coverage Validation

| FR | Architectural Support | Status |
| --- | --- | --- |
| FR1-FR4 (sanitize variants) | `sanitizeMermaidText()` with `/<br\s*\/?>/gi` | Covered |
| FR5 (clipboard paste) | Call site in `App.tsx` ~line 3750 | Covered |
| FR6 (TTD dialog) | Call site in `TTDDialog/common.ts` | Covered |
| FR7 (element bounds) | Auto-calculated by existing `bindTextToContainer()` | Covered |
| FR8 (multi-line rendering) | Existing canvas renderer handles `\n` | Covered |
| FR9 (backward compat) | Pure additive change — no existing behavior modified | Covered |
| FR10 (library consumers) | Internal fix, no API surface change | Covered |

**NFR Coverage:** Performance NFR addressed — single-pass regex replacement, O(n) on text length, negligible overhead on 100+ node diagrams.

### Implementation Readiness Validation

**Decision Completeness:** Single ADR fully documented with rationale, implementation details, and code examples.

**Structure Completeness:** All affected files identified with specific line references. New file locations defined. Test file locations defined.

**Pattern Completeness:** Code examples provided for both the utility function and call sites. Anti-patterns documented. Enforcement commands listed.

### Gap Analysis Results

**Critical Gaps:** None.

**Important Gaps:**
- Exact insertion point within `TTDDialog/common.ts` to be determined during implementation (after `parseMermaidToExcalidraw()`, before `convertToExcalidrawElements()`)
- Verify whether `App.tsx` clipboard handler processes elements individually or in batch

### Architecture Completeness Checklist

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped
- [x] Critical decisions documented with rationale
- [x] Technology stack confirmed (brownfield — inherited)
- [x] Naming conventions established (inherited from project)
- [x] Structure patterns defined
- [x] Process patterns documented (anti-patterns, enforcement)
- [x] Complete directory structure of affected files defined
- [x] Component boundaries established
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High — scoped fix with clear boundaries, single ADR, established codebase patterns.

**Key Strengths:**
- Minimal architectural footprint — one new utility function, two call sites
- Follows existing dependency graph and conventions exactly
- Extensible for post-MVP HTML tag stripping
- Comprehensive FR-to-file mapping

**First Implementation Priority:**
1. Create `sanitizeMermaidText()` in `packages/common/src/sanitize-mermaid-text.ts`
2. Write unit tests
3. Integrate at both call sites
4. Run full test suite
