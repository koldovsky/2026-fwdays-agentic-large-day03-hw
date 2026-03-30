---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments: []
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 0
classification:
  projectType: developer_tool
  domain: general
  complexity: medium
  projectContext: brownfield
  scopeNotes:
    - "Handle <br>, <br/>, <br /> variants → newline conversion"
    - "Strip other HTML tags (b, i, s, u, sub, sup) — Excalidraw text doesn't support inline formatting"
    - "Sanitization scoped to Mermaid import pipeline only, not general text input"
    - "Element bounds must be recalculated/verified after text conversion"
    - "Acceptance criteria: visual parity with Mermaid Live for multi-line labels"
    - "Test coverage required: all <br> variants, HTML tag stripping, bounds correctness"
  rootCause: "Missing sanitization boundary between Mermaid parser output and Excalidraw element creation"
  affectedPaths:
    - "App.tsx (clipboard paste)"
    - "TTDDialog/common.ts (text-to-diagram dialog)"
    - "Potential additional entry points via library API"
---

# Product Requirements Document: Mermaid Import `<br>` Tag Fix

**Author:** Alex
**Date:** 2026-03-28
**Project:** Excalidraw (open-source whiteboard tool)
**GitHub Issue:** excalidraw/excalidraw#10952

## Executive Summary

Excalidraw's Mermaid diagram import renders HTML `<br>` tags as literal text instead of line breaks. Users who paste or import Mermaid diagrams with multi-line labels — an extremely common pattern in flowcharts, sequence diagrams, and state diagrams — see raw `<br>` strings in element text instead of properly formatted multi-line output.

**Root Cause:** Missing sanitization boundary between the `@excalidraw/mermaid-to-excalidraw` parser output and Excalidraw element creation. The parser returns text containing literal `<br>` HTML tags, and Excalidraw passes them through without conversion.

**Fix:** Add a sanitization step in the Mermaid import pipeline that converts all `<br>` tag variants to newline characters before element creation. The fix is scoped exclusively to Mermaid import paths — no changes to general text input, public API, or serialization format.

## Project Classification

| Attribute | Value |
| --- | --- |
| Project Type | Developer tool (open-source library + web application) |
| Domain | General (creative/design tooling) |
| Complexity | Medium — multiple code paths, HTML variant handling, element bounds implications |
| Project Context | Brownfield — fix within the mature Excalidraw codebase |

## Success Criteria

### User Success

- Users import Mermaid diagrams containing `<br>` tags and see properly formatted multi-line text labels — zero literal HTML tags visible
- Imported diagram text layout visually matches Mermaid Live rendering for multi-line labels
- Fix works identically across all Mermaid import entry points (clipboard paste, TTD dialog)

### Business Success

- GitHub issue #10952 resolved and closeable
- No new regression issues opened against the Mermaid import pipeline within 30 days of fix
- PR #10953 (or equivalent) merged cleanly with passing CI

### Technical Success

- All `<br>` variants handled: `<br>`, `<br/>`, `<br />` (case-insensitive)
- Element bounds remain correct after newline conversion — no overlapping or clipped text
- No regressions in existing Mermaid import tests or snapshot tests
- Sanitization scoped exclusively to Mermaid import pipeline — no side effects on other text input paths
- Processing performance remains proportional — no noticeable degradation on diagrams with 100+ nodes

### Measurable Outcomes

- 100% of `<br>` variant patterns converted to newlines in imported Mermaid text
- Zero literal HTML `<br>` strings present in any Excalidraw element after Mermaid import
- All existing tests pass, new tests added for `<br>` variant coverage

## Product Scope

### MVP (Phase 1)

- Convert `<br>`, `<br/>`, `<br />` (case-insensitive) to newline characters in Mermaid import pipeline
- Fix applied to both known code paths: `App.tsx` (clipboard) and `TTDDialog/common.ts` (TTD dialog)
- Audit for additional Mermaid import entry points and fix if found
- Verify element bounds correctness after text conversion
- Add test coverage for all `<br>` variants
- No regressions in existing test suite

**Resource estimate:** Single developer, 1-2 days implementation + testing.

### Post-MVP (Phase 2)

- Strip unsupported HTML tags (`<b>`, `<i>`, `<s>`, `<u>`, `<sub>`, `<sup>`) from Mermaid imports silently
- Handle HTML entities (`&amp;`, `&nbsp;`, etc.)

### Vision (Phase 3)

- Rich text formatting support in Excalidraw text elements (bold, italic) — enabling faithful conversion of Mermaid's full HTML formatting
- General text import sanitization layer for all external sources

## User Journeys

### Journey 1: End User — Mermaid Paste (Happy Path)

**Persona:** Dana, a software architect who documents systems in Mermaid and uses Excalidraw for visual presentations.

**Opening Scene:** Dana has a Mermaid flowchart with multi-line node labels using `<br>` tags. She pastes the Mermaid code into Excalidraw for a stakeholder meeting.

**Rising Action:** Excalidraw detects Mermaid syntax from the clipboard and triggers the conversion pipeline.

**Climax:** `<br>` tags in labels like `"User Registration<br>Process"` convert to newlines. Text elements display as two properly separated lines with correct element bounds.

**Resolution:** Dana's diagram matches what she sees in Mermaid Live. No cleanup needed.

### Journey 2: End User — TTD Dialog (Happy Path)

**Persona:** Marco, a developer who types Mermaid syntax directly into the Text-to-Diagram dialog.

**Opening Scene:** Marco types a state diagram with `<br/>` tags in state labels.

**Rising Action:** He clicks "Generate" and the TTD pipeline converts Mermaid syntax to Excalidraw elements.

**Climax:** All `<br/>` self-closing variants convert to newlines with correct text layout.

**Resolution:** Multi-line labels render cleanly. It just works.

### Journey 3: End User — Edge Case (Mixed HTML Tags)

**Persona:** Dana, importing a diagram containing `"Setup<br>Config<b>bold</b>Value"`.

**Rising Action:** The sanitization layer converts `<br>` to newline. `<b>` tags are outside MVP scope — they pass through as literal text without causing a crash.

**Resolution:** Line breaks work correctly. `<b>` tags remain as literal text — a known limitation for post-MVP.

### Journey 4: Library Consumer

**Persona:** Kai, a developer embedding `@excalidraw/excalidraw` in a documentation platform.

**Opening Scene:** Kai's users report `<br>` showing as text in Mermaid imports.

**Rising Action:** Kai upgrades to the patched version. No API changes, no configuration needed.

**Resolution:** Mermaid imports produce correct multi-line labels. Transparent patch-level fix with zero migration effort.

### Journey Requirements Summary

| Capability                                                                    | Revealed By    |
| ----------------------------------------------------------------------------- | -------------- |
| `<br>` variant regex conversion (`<br>`, `<br/>`, `<br />`, case-insensitive) | Journeys 1, 2  |
| Sanitization in clipboard paste path (`App.tsx`)                              | Journey 1      |
| Sanitization in TTD dialog path (`TTDDialog/common.ts`)                       | Journey 2      |
| Graceful handling of unsupported HTML tags (no crash)                         | Journey 3      |
| Backward-compatible fix — no API surface changes for library consumers        | Journey 4      |
| Correct element bounds calculation for multi-line text                        | Journeys 1, 2  |

## Technical Architecture Considerations

- **Sanitization layer placement:** Between Mermaid parser output and Excalidraw element creation — not in the renderer, not in the serializer
- **Regex pattern:** Case-insensitive match for all `<br>` variants: `/<br\s*\/?>/gi`
- **Affected code paths:**
  - `App.tsx` — clipboard paste flow
  - `TTDDialog/common.ts` — text-to-diagram dialog flow
  - Audit needed for additional entry points (library API, drag-and-drop)
- **No new dependencies:** Fix uses native string/regex operations only
- **Backward compatibility:** No breaking changes — existing serialized `.excalidraw` files unaffected
- **No public API changes:** Internal pipeline fix only
- **Element bounds:** Verify text measurement and element sizing account for additional lines after `<br>` → `\n` conversion

## Functional Requirements

### Mermaid Text Sanitization

- **FR1:** System converts `<br>` tags to newline characters in Mermaid-imported text element labels
- **FR2:** System converts `<br/>` tags to newline characters in Mermaid-imported text element labels
- **FR3:** System converts `<br />` tags to newline characters in Mermaid-imported text element labels
- **FR4:** System handles `<br>` tag variants case-insensitively (e.g., `<BR>`, `<Br/>`)

### Mermaid Import Entry Points

- **FR5:** System sanitizes text labels when importing Mermaid diagrams via clipboard paste
- **FR6:** System sanitizes text labels when importing Mermaid diagrams via the Text-to-Diagram dialog

### Element Integrity

- **FR7:** System calculates correct element bounds for text elements containing converted newlines
- **FR8:** System renders multi-line text labels with proper line spacing after `<br>` conversion

### Backward Compatibility

- **FR9:** System processes existing Mermaid imports without `<br>` tags with no behavioral change
- **FR10:** Library consumers receive the fix transparently without API changes or migration steps

## Non-Functional Requirements

### Performance

- Sanitization adds no perceptible delay to the Mermaid import pipeline
- Diagrams with 100+ nodes containing `<br>` tags complete sanitization within the existing import processing budget (no measurable regression)
- Regex replacement operates in a single pass — no recursive or multi-iteration processing

## Risk Mitigation

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Element bounds miscalculation after `<br>` → `\n` conversion | Layout breakage in imported diagrams | Verify bounds in tests; compare with Mermaid Live rendering |
| Incomplete `<br>` variant coverage | Users report "still broken" for `<br/>` or `<br />` | Use comprehensive regex: `/<br\s*\/?>/gi`; test all variants |
| Regression in non-Mermaid text flows | Side effects on user-typed text or other imports | Scope sanitization strictly to Mermaid import pipeline; regression tests |
| Undiscovered Mermaid import entry points | Fix incomplete for some import methods | Audit codebase for all Mermaid parse calls during implementation |
