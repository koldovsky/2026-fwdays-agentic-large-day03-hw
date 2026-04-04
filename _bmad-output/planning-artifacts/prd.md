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
prdCompletedAt: "2026-04-03"
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: brownfield
inputDocuments:
  - note: "Informal input via chat (2026-04-03): separate text fill and stroke for Excalidraw text; UI label Stroke misleading (strokeColor used as glyph fill); use cases — screenshot and meme annotation; comparison to other editors referenced by user (no attachment)."
documentCounts:
  briefCount: 0
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 0
workflowType: prd
---

# Product Requirements Document - 2026-fwdays-agentic-large-day03-hw

**Author:** Kaliuzhnyi.ye
**Date:** 2026-04-03

*Scope: standalone **text** elements in Excalidraw—separate **fill** and **outline/stroke**, honest UI labels, cross-surface rendering parity, serialization/migration, and embedder-facing documentation. Does not redefine non-text shape stroke/fill unless required for shared UI.*

## Executive Summary

Excalidraw text styling today maps the shared property `strokeColor` to **glyph fill** (canvas `fillText` / SVG `fill`), while the UI presents it as **Stroke**—the same mental model as vector outlines on shapes. Users annotating **screenshots and memes** expect **independent fill and outline** (readable text on busy backgrounds). This PRD scopes a brownfield change to the **web-based Excalidraw editor and library** so text can be styled with a **true fill**, an optional **true stroke/outline**, and **labels that match behavior**, without breaking existing scenes.

**Primary users:** people who combine drawings or imported images with text overlays (communication, social content, documentation screenshots).

**Problem:** misleading control naming plus missing second paint channel makes high-contrast captions unnecessarily hard.

**Outcome:** predictable, editor-like text appearance; reduced cognitive load; parity closer to common bitmap/vector meme and annotation tools.

### What Makes This Special

- **Honest model:** UI terminology reflects what is painted (fill vs outline), aligned with how other editors treat text.
- **Dual-channel paint:** separate fill color and stroke (color + width) for text glyphs where product scope allows.
- **Brownfield-safe intent:** preserve the look of legacy documents via clear defaults and migration rules.

## Project Classification

| Dimension | Value |
|-----------|--------|
| **Project type** | Web app (browser canvas editor; monorepo app + `@excalidraw/excalidraw` package) |
| **Domain** | General productivity / creative tooling (no domain-specific compliance row) |
| **Complexity (registry)** | Low (regulatory); engineering risk medium for rendering, SVG export, WYSIWYG sync, backward compatibility |
| **Context** | Brownfield extension of existing Excalidraw codebase |

## Success Criteria

### User Success

- Users can set **text fill** and **text outline** independently (or understand a deliberate single-channel model if scope is reduced) without guessing which control maps to which paint.
- Annotating text on **busy backgrounds** (screenshots, memes) reaches **readable contrast** using built-in controls, without multi-step workarounds.
- **WYSIWYG editing**, **canvas render**, and **SVG export** show **consistent** text styling for the same element.
- Existing drawings **open unchanged** visually unless the user edits text styling (per migration rules).

### Business Success

- **Contribution / product:** change lands as a **reviewable, documented** increment suitable for upstream or fork maintenance (CHANGELOG, migration note).
- **Adoption signal (qualitative):** fewer confusion reports about “Stroke” on text; positive feedback on meme/screenshot annotation (issues, discussions, or internal dogfooding—*targets TBD by maintainer*).

### Technical Success

- **Backward compatibility:** default appearance matches **legacy** text for unchanged elements after migration.
- **Coverage:** rendering paths updated for **canvas** and **SVG**; **wysiwyg** reflects the same colors/outline.
- **Quality bar:** existing test suites pass; new or updated tests for text paint where the codebase expects them.
- **Performance:** no user-visible regression on typical boards with many text elements (*baseline TBD in implementation*).

### Measurable Outcomes

- **Functional:** given a text element, user can produce **fill-only**, **outline-only** (if in scope), and **fill+outline** combinations from the UI.
- **Regression:** snapshot or visual tests (if used) stable for migrated legacy scenes.
- **Clarity:** UI strings for text match **actual paint operations** (validated by UX copy review).

## Product Scope

### MVP - Minimum Viable Product

- **Truth in labeling:** rename or split UI so text **fill** is not presented as “Stroke” when it only sets glyph fill.
- **Independent stroke (outline):** optional outline with **color** and **width** (reasonable defaults), applied consistently in editor + export, with **legacy migration** (e.g. current `strokeColor` → fill; stroke off or derived per rule).

### Growth Features (Post-MVP)

- Advanced stroke options (joins, miter limit, dash) if needed for parity with other tools.
- Theming / dark-mode behavior validated for dual-channel text paint.
- Accessibility review (contrast, focus) for new controls.

### Vision (Future)

- Parity with **reference editors** the user cited (attach comparison spec when available).
- Optional presets (“meme caption”, “subtitle”) applying fill+stroke in one action.

## User Journeys

### Journey 1: Olena — meme caption on a busy image (primary, happy path)

**Opening:** Olena drops a screenshot into the canvas and adds a short joke caption. The background is noisy; single flat text color is hard to read.

**Rising action:** She selects the text tool, types the caption, opens style controls. She sets a **bright fill** and a **dark outline** with width that matches the meme style she uses in other apps.

**Climax:** Canvas, inline editor, and exported PNG/SVG all show the same readable caption without hacks (no duplicate text layers).

**Resolution:** She exports and posts; Excalidraw feels predictable for “text on image” work.

**Capabilities implied:** separate fill/stroke for text; width control; consistent render across wysiwyg, raster path, SVG export.

### Journey 2: Marcin — documentation screenshot callout (primary, alternate goal)

**Opening:** Marcin annotates a UI screenshot for internal docs. He needs subtle **outline-only** or low-contrast fill so arrows and boxes stay primary.

**Rising action:** He adjusts text: outline visible, fill muted or transparent if supported.

**Climax:** Labels stay legible on both light and dark UI regions without overpowering the image.

**Resolution:** Doc readers understand callouts; he does not fight the “Stroke” label.

**Capabilities implied:** optional fill; outline-only mode if in scope; clear naming; theme/dark-mode sanity (Growth).

### Journey 3: Aisha — opens a years-old board (primary, edge / trust)

**Opening:** Aisha opens an old `.excalidraw` file full of text labels created before the change.

**Rising action:** She scans the board; everything looks as before. She edits one label and only then sees new fill/stroke controls.

**Climax:** **No silent visual shift** for untouched text; migration rules are documented.

**Resolution:** She trusts upgrading the app or merging upstream.

**Capabilities implied:** backward-compatible defaults; migration spec; optional “touch to upgrade” behavior if product chooses it.

### Journey 4: Jordan — maintainer reviewing the PR (secondary)

**Opening:** Jordan reviews a community PR that touches text rendering.

**Rising action:** They verify canvas + SVG + wysiwyg parity, migration notes, and tests/snapshots for legacy scenes.

**Climax:** CI green; CHANGELOG explains user-visible and file-format impact.

**Resolution:** Safe merge for library consumers and excalidraw.com.

**Capabilities implied:** tests; documentation; minimal breaking API for embedders (`@excalidraw/excalidraw` props if surface changes).

### Journey 5: Sam — embedder updating the React wrapper (integration)

**Opening:** Sam ships an app that embeds Excalidraw and serializes scenes to their backend.

**Rising action:** New optional fields or renamed semantics for text styling appear in the element model.

**Climax:** Old scenes deserialize correctly; new scenes round-trip through their pipeline.

**Resolution:** No emergency patch for host app.

**Capabilities implied:** versioned file format behavior; clear element schema / migration for integrators.

### Journey Requirements Summary

| Area | From journeys |
|------|----------------|
| **Text paint model** | Independent fill + stroke (color, width); optional outline-only / transparent fill if scoped |
| **Consistency** | Wysiwyg ↔ canvas ↔ SVG (and raster export where applicable) |
| **Trust & upgrade** | Legacy visual parity, documented migration, tests |
| **Ecosystem** | Maintainer reviewability; embedder round-trip and schema clarity |

## Web App Specific Requirements

### Project-Type Overview

Excalidraw ships as a **browser-based canvas editor** (SPA-style app plus embeddable React package). This feature touches **Canvas2D text rendering**, **SVG export**, and the **in-browser wysiwyg** surface—typical web-app concerns are **cross-browser paint consistency**, **zoom/DPR**, and **accessible UI** for new controls.

### Technical Architecture Considerations

- **Rendering stack:** Any text paint change must be applied consistently in `packages/element` (canvas), SVG export path, and wysiwyg styling—no single-path drift.
- **State model:** Text elements share the global element schema; new fields (e.g. explicit fill vs stroke) must serialize/deserialize with **versioned** or backward-compatible defaults.
- **Theming:** Dark/light theme already adjusts colors; dual-channel text paint must define behavior under `applyDarkModeFilter` (or equivalent) so previews match user intent.

### Browser Support Matrix

- **Target:** Evergreen **Chromium**, **Firefox**, **Safari** (desktop + mobile where Excalidraw already supports)—aligned with existing project policy (*confirm against repo docs at implementation*).
- **Capability note:** Outline text relies on **canvas `strokeText` / SVG `stroke` on `<text>`** and correct **paint order**; verify behavior on Safari (historical quirks on text stroke) during QA.

### Responsive Design & Zoom

- Editor **zoom** scales the canvas; text fill/stroke **width** must scale predictably (stroke width in scene units vs screen pixels per existing stroke conventions).
- **Embedded** instances (`@excalidraw/excalidraw`) must behave the same as excalidraw-app for text styling.

### Performance Targets

- **No meaningful regression** when many text elements exist: avoid extra full-scene passes or per-glyph DOM overhead; prefer the same render patterns as today’s `fillText` loops.
- **Export:** SVG size and export time should remain in the same order of magnitude (*baseline benchmarks TBD*).

### SEO Strategy

- **Not applicable** to the core drawing surface (canvas). Any **marketing/docs** pages describing the feature are out of scope for this PRD unless explicitly bundled; no SEO requirements for the editor iframe itself.

### Accessibility Level

- New or relabeled controls (**fill / stroke / width**) must be **keyboard reachable**, have **clear names** (screen readers), and not rely on color alone for state.
- Color pickers should follow existing Excalidraw patterns; focus order and ARIA labels reviewed for the text property panel.

### Implementation Considerations

- **Migration:** One-time mapping from legacy `strokeColor`-as-fill to new fields; document in CHANGELOG and developer-facing notes.
- **Testing:** Automated coverage for canvas + SVG output for representative text samples; manual Safari/Firefox spot checks for stroke.
- **Skip (per project type):** native shell features and CLI—no requirements added here.

## Project Scoping & Phased Development

*Product-facing phasing (MVP / Growth / Vision) is stated in **Product Scope** above; this section adds delivery strategy, resourcing, journey coverage, and risk mitigations.*

### MVP Strategy & Philosophy

**MVP Approach:** **Problem-solving MVP** — smallest release that removes the misleading “Stroke” mental model for text and enables **independent fill + outline** (with width) for meme/screenshot-style annotation, without breaking legacy boards.

**Resource Requirements:** Typically **1–2 engineers** familiar with `packages/element`, SVG export, and `wysiwyg` (*adjust to team reality*); plus **QA** spot-check on Safari/Firefox and a **short design/copy** pass for control labels.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**

- **Journey 1 (Olena):** readable fill + outline on busy images; consistent canvas / editor / export.
- **Journey 3 (Aisha):** legacy files open with **unchanged** appearance until intentional edits.

**Must-Have Capabilities:**

- **Truthful UI** for text paint (fill vs stroke/outline), not reusing “Stroke” for glyph fill alone.
- **Element model + migration:** legacy `strokeColor` maps to new semantics with documented defaults.
- **Rendering parity:** canvas + SVG + wysiwyg aligned; basic stroke **width** control.
- **Tests + CHANGELOG** suitable for upstream/fork review.

### Post-MVP Features

**Phase 2 (Post-MVP):**

- Advanced stroke (dash, joins, miter) if competitors/users demand it; deeper **a11y** review; dark-mode edge cases for dual paint.
- **Journey 2** polish: outline-only / muted fill if not fully covered in MVP.

**Phase 3 (Expansion):**

- Presets (“meme caption”, “subtitle”); parity doc vs **reference editors** once comparison spec exists (**Vision** from Product Scope).

### Risk Mitigation Strategy

**Technical Risks:** Safari/text-stroke quirks and paint-order bugs — mitigate with **targeted manual QA**, golden/SVG snapshots, and conservative defaults (e.g. stroke off unless set).

**Market / user risks:** Users not noticing the fix — mitigate with **release notes**, optional in-app hint for text tool, and clear migration doc.

**Resource risks:** If capacity drops, **fallback MVP** = rename/relabel + model prep without full outline feature (*explicitly deprioritize only if agreed*); still document roadmap for stroke in Phase 2.

## Functional Requirements

### Text appearance

- FR1: A user can set the **fill color** of standalone text independently from other paint properties.
- FR2: A user can enable and set an **outline/stroke** on standalone text (color and thickness) when the product exposes that control.
- FR3: A user can combine fill and outline so that text remains readable on visually busy backgrounds.
- FR4: A user sees **control labels** for text that describe the actual paint operation (fill vs outline), not a misleading reuse of shape-oriented naming.
- FR5: A user can apply text appearance changes while editing with the inline text editor and see results consistent with the canvas selection.

### Cross-surface consistency

- FR6: The system renders a given text element’s appearance **consistently** on the interactive canvas and in exported **vector** output for the same scene state.
- FR7: The system renders a given text element’s appearance **consistently** between the inline editor and the canvas for the same scene state.
- FR8: A user’s text appearance choices are reflected after **zoom** and pan operations without requiring a manual refresh workaround.

### Document compatibility

- FR9: The system loads **legacy** documents without altering the **visual appearance** of text that the user does not edit, according to published migration rules.
- FR10: The system persists text appearance so that **re-opening** the same document reproduces the same text styling.
- FR11: The system defines and documents **default** appearance for text that predates the new properties so that behavior is predictable for users and integrators.

### Theming

- FR12: Text appearance respects the active **light/dark** theme in a way that matches product-wide color treatment for elements (no orphan styling).

### Accessibility & discoverability

- FR13: A user can adjust text appearance using **keyboard-accessible** property controls where the editor already supports keyboard workflows for similar properties.
- FR14: Property controls for text appearance expose **understandable names** to assistive technologies consistent with other color/stroke controls in the editor.

### Collaboration & sharing (read-only impact)

- FR15: When a scene is shared or viewed by another party, text appearance is **interpreted the same** for viewers using a compatible version of the editor (no silent drop of outline/fill semantics beyond documented version rules).

### Integrator / host application

- FR16: An integrator can rely on **documented** serialization behavior for text appearance when saving and reloading scenes through the public embedding API.
- FR17: An integrator receives **clear documentation** of any new or renamed text-related properties and migration expectations.

### Quality assurance & release readiness

- FR18: The system supports **automated verification** that representative text samples render equivalently across primary output surfaces defined for this feature (e.g. canvas vs vector export), where the project’s test strategy allows.
- FR19: Release materials explain **user-visible** changes and **compatibility** expectations for text styling.

### Boundaries (explicit non-goals for MVP unless pulled in)

- FR20: Out-of-scope **marketing site SEO** for the drawing surface remains unchanged; no FR for canvas iframe SEO.
- FR21: **Advanced** outline styling (dashes, join styles) remains optional and is tracked for post-MVP unless explicitly promoted into MVP scope.

## Non-Functional Requirements

### Performance

- **NFR-P1:** Editing and panning/zooming with **many text elements** (order-of-magnitude consistent with current Excalidraw stress scenarios) must not introduce a **user-noticeable** interaction regression versus the prior release on the same hardware profile (*measure via existing perf checks or manual benchmark agreed at implementation*).
- **NFR-P2:** Exporting a scene to **vector** format with text using outline must complete in **the same order of magnitude** of time as equivalent scenes before the feature for comparable element counts (*baseline recorded pre-change*).

### Accessibility

- **NFR-A1:** New or revised text property controls conform to the **same accessibility baseline** as existing color and stroke pickers in the editor (keyboard reachability, visible focus, exposed accessible names).
- **NFR-A2:** User-visible strings for text paint use **clear, non-conflicting** terminology reviewed for translation impact (locale files updated consistently).

### Integration

- **NFR-I1:** Serialized scene data remains **backward readable** by the previous minor version according to the project’s versioning policy, or the breaking change is **explicitly versioned** and documented for embedders.
- **NFR-I2:** Public API or schema documentation lists any **new optional fields** for text styling without requiring integrators to guess behavior from implementation.
