---
stepsCompleted: []
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
workflowType: ux-design
status: draft
note: "Stakeholder UX decisions captured from chat before full UX workflow steps."
---

# UX Design Specification — 2026-fwdays-agentic-large-day03-hw

**Author:** Kaliuzhnyi.ye  
**Date:** 2026-04-03

## Stakeholder decisions (text fill & outline)

_Decisions below apply to standalone text styling (per PRD scope). Document output language: English._

### Terminology

- **Keep the label “Stroke”** for the **text outline** control only (the contour around glyphs), not for glyph fill.
- Use a distinct control/label for **text fill** (e.g. **Fill** / **Text color** — final copy to align with existing Excalidraw property panel patterns and i18n keys).

### Defaults

- **Text outline (stroke): off by default** for newly created text. User explicitly enables outline and sets color/width when needed.

### Selection scope

- **No mixed-selection UX** for this feature: do not design or implement combined text+shape selection behavior for these controls; scope is **text-only** selection (or equivalent single-type context as defined during implementation).

## Traceability

- **PRD:** `_bmad-output/planning-artifacts/prd.md` (FR1–FR5, FR4 clarity, FR13–FR14).
- **Architecture:** `_bmad-output/planning-artifacts/architecture.md` (property UI, wysiwyg, i18n paths).

## Next steps (optional)

- Run full **`bmad-create-ux-design`** workflow to expand flows, accessibility detail, and component-level specs on top of this baseline.
