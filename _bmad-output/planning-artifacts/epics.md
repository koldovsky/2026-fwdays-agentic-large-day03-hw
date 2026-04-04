---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
workflowType: epics
---

# 2026-fwdays-agentic-large-day03-hw - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for 2026-fwdays-agentic-large-day03-hw, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: A user can set the **fill color** of standalone text independently from other paint properties.

FR2: A user can enable and set an **outline/stroke** on standalone text (color and thickness) when the product exposes that control.

FR3: A user can combine fill and outline so that text remains readable on visually busy backgrounds.

FR4: A user sees **control labels** for text that describe the actual paint operation (fill vs outline), not a misleading reuse of shape-oriented naming.

FR5: A user can apply text appearance changes while editing with the inline text editor and see results consistent with the canvas selection.

FR6: The system renders a given text element’s appearance **consistently** on the interactive canvas and in exported **vector** output for the same scene state.

FR7: The system renders a given text element’s appearance **consistently** between the inline editor and the canvas for the same scene state.

FR8: A user’s text appearance choices are reflected after **zoom** and pan operations without requiring a manual refresh workaround.

FR9: The system loads **legacy** documents without altering the **visual appearance** of text that the user does not edit, according to published migration rules.

FR10: The system persists text appearance so that **re-opening** the same document reproduces the same text styling.

FR11: The system defines and documents **default** appearance for text that predates the new properties so that behavior is predictable for users and integrators.

FR12: Text appearance respects the active **light/dark** theme in a way that matches product-wide color treatment for elements (no orphan styling).

FR13: A user can adjust text appearance using **keyboard-accessible** property controls where the editor already supports keyboard workflows for similar properties.

FR14: Property controls for text appearance expose **understandable names** to assistive technologies consistent with other color/stroke controls in the editor.

FR15: When a scene is shared or viewed by another party, text appearance is **interpreted the same** for viewers using a compatible version of the editor (no silent drop of outline/fill semantics beyond documented version rules).

FR16: An integrator can rely on **documented** serialization behavior for text appearance when saving and reloading scenes through the public embedding API.

FR17: An integrator receives **clear documentation** of any new or renamed text-related properties and migration expectations.

FR18: The system supports **automated verification** that representative text samples render equivalently across primary output surfaces defined for this feature (e.g. canvas vs vector export), where the project’s test strategy allows.

FR19: Release materials explain **user-visible** changes and **compatibility** expectations for text styling.

FR20: Out-of-scope **marketing site SEO** for the drawing surface remains unchanged; no FR for canvas iframe SEO.

FR21: **Advanced** outline styling (dashes, join styles) remains optional and is tracked for post-MVP unless explicitly promoted into MVP scope.

### NonFunctional Requirements

NFR1 (NFR-P1): Editing and panning/zooming with **many text elements** (order-of-magnitude consistent with current Excalidraw stress scenarios) must not introduce a **user-noticeable** interaction regression versus the prior release on the same hardware profile (*measure via existing perf checks or manual benchmark agreed at implementation*).

NFR2 (NFR-P2): Exporting a scene to **vector** format with text using outline must complete in **the same order of magnitude** of time as equivalent scenes before the feature for comparable element counts (*baseline recorded pre-change*).

NFR3 (NFR-A1): New or revised text property controls conform to the **same accessibility baseline** as existing color and stroke pickers in the editor (keyboard reachability, visible focus, exposed accessible names).

NFR4 (NFR-A2): User-visible strings for text paint use **clear, non-conflicting** terminology reviewed for translation impact (locale files updated consistently).

NFR5 (NFR-I1): Serialized scene data remains **backward readable** by the previous minor version according to the project’s versioning policy, or the breaking change is **explicitly versioned** and documented for embedders.

NFR6 (NFR-I2): Public API or schema documentation lists any **new optional fields** for text styling without requiring integrators to guess behavior from implementation.

### Additional Requirements

- **Brownfield Excalidraw monorepo:** implement inside existing Yarn workspaces; no greenfield starter.
- **Text paint model:** explicit fill vs outline on `ExcalidrawTextElement`; migrate legacy use of `strokeColor` as glyph fill; avoid dual meaning of `strokeColor` after migration.
- **Render contract:** single resolved paint definition for **canvas** (`packages/element/src/renderElement.ts`), **SVG** (`packages/excalidraw/renderer/staticSvgScene.ts`), **wysiwyg** (`packages/excalidraw/wysiwyg/textWysiwyg.tsx`).
- **Shared helpers** in `packages/element` (e.g. resolve/normalize text paint); **no** duplicate color logic only in app.
- **State:** updates via `mutateElement` / batch APIs only; no shadow UI state for colors.
- **Canvas render order:** document and reuse one approach (e.g. stroke then fill per line); **SVG parity** with same semantics.
- **Migration:** deserialize- and/or mutate-time mapping; **CHANGELOG** and integrator docs; optional file-format version bump per repo policy.
- **Theme:** dark/light pipeline applies to both fill and outline colors.
- **Package boundary:** `packages/element` must not depend on `packages/excalidraw`.
- **CI:** `yarn test:typecheck`, `yarn test:update` (or repo equivalents) before merge.
- **Critical TBD for implementation:** exact persisted field names; migration trigger (on load vs first edit) — lock in first stories.

### UX Design Requirements

UX-DR1: Use the label **Stroke** only for **text outline** (glyph contour); provide a **separate** control and label for **text fill** (e.g. Fill / Text color), aligned with existing property panel and i18n patterns.

UX-DR2: **Text outline (stroke) is off by default** for newly created text; user enables outline and sets color/width explicitly.

UX-DR3: **No mixed-selection UX** for these controls: scope is **text-only** selection (or equivalent); do not design combined text+shape behavior for this feature.

### FR Coverage Map

| FR | Epic | Notes |
|----|------|--------|
| FR1 | Epic 1 | Text fill control |
| FR2 | Epic 1 | Text outline (stroke) color + thickness |
| FR3 | Epic 1 | Combined fill + outline for contrast |
| FR4 | Epic 1 | Honest labels (Fill vs Stroke for outline) |
| FR5 | Epic 1 | Wysiwyg matches canvas |
| FR6 | Epic 2 | Canvas vs SVG parity |
| FR7 | Epic 2 | Wysiwyg vs canvas parity |
| FR8 | Epic 2 | Zoom/pan reflect styling |
| FR9 | Epic 3 | Legacy load, no visual drift |
| FR10 | Epic 3 | Persist / reopen |
| FR11 | Epic 3 | Documented defaults for pre-migration text |
| FR12 | Epic 1 | Theme alignment for text paint |
| FR13 | Epic 1 | Keyboard-accessible controls |
| FR14 | Epic 1 | Assistive names for controls |
| FR15 | Epic 4 | Shared view interprets paint consistently |
| FR16 | Epic 4 | Documented serialization for embedders |
| FR17 | Epic 4 | Integrator-facing docs |
| FR18 | Epic 4 | Automated cross-surface checks |
| FR19 | Epic 4 | Release notes / compatibility messaging |
| FR20 | — | Out of scope (SEO) — no epic |
| FR21 | Epic 5 | Post-MVP advanced outline |

**NFR quick map:** NFR1–NFR2 → Epic 2; NFR3–NFR4 → Epic 1; NFR5 → Epic 3; NFR6 → Epic 4.

**UX-DR map:** UX-DR1–UX-DR3 → Epic 1.

## Epic List

### Epic 1: Honest text paint in the editor

Users set **fill** and optional **text outline (Stroke)** on standalone text with **clear labels**, **outline off by default**, **text-only selection scope**, **wysiwyg** matching the canvas, **theme-aware** colors, and **accessible** property controls.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR12, FR13, FR14  
**UX covered:** UX-DR1, UX-DR2, UX-DR3  
**NFRs covered:** NFR3, NFR4

### Epic 2: One look everywhere you draw or export

Users see the **same** text styling on the **interactive canvas**, in **SVG export**, and while **editing inline**, including after **zoom** and pan, without extra refresh tricks.

**FRs covered:** FR6, FR7, FR8  
**NFRs covered:** NFR1, NFR2

### Epic 3: Safe upgrades for saved drawings

Users open **legacy** boards and see **unchanged** text until they choose to edit; **saved** files **round-trip** styling; **defaults** and **migration** are **predictable** and **backward-readable** for older clients.

**FRs covered:** FR9, FR10, FR11  
**NFRs covered:** NFR5

### Epic 4: Share, embed, and ship with confidence

**Viewers** and **embedders** get **consistent** interpretation of text paint; **docs** and **tests** prove **parity** across surfaces; **releases** explain **user-visible** and **compatibility** changes.

**FRs covered:** FR15, FR16, FR17, FR18, FR19  
**NFRs covered:** NFR6

### Epic 5 (Post-MVP): Advanced outline styling

**Future:** dashed outlines, join/miter controls, and related polish **after** MVP ships (per PRD Growth/Vision).

**FRs covered:** FR21

## Epic 1: Honest text paint in the editor

Users set **fill** and optional **text outline (Stroke)** on standalone text with **clear labels**, **outline off by default**, **text-only selection scope**, **wysiwyg** matching the canvas, **theme-aware** colors, and **accessible** property controls.

### Story 1.1: Text element schema and defaults for fill and outline

As a **developer**,
I want **persisted fields and defaults on `ExcalidrawTextElement` for text fill and optional outline (including “outline off” by default)**,
So that **the UI and renderers share one source of truth without shadow state**.

**Acceptance Criteria:**

**Given** a new standalone text element is created  
**When** it is initialized  
**Then** outline/stroke is **disabled by default** and fill uses the chosen default semantics (aligned with UX-DR2 and migration plan for legacy `strokeColor`)  
**And** mutations normalize invalid combinations in one place (`mutateElement` or equivalent)

**Given** a text element in the scene graph  
**When** its paint-related fields are read  
**Then** naming follows **camelCase** and avoids ambiguous dual use of `strokeColor` for glyph fill after migration (per Architecture)

---

### Story 1.2: Text-only property controls for Fill and Stroke (outline)

As a **diagram author**,
I want **separate Fill and Stroke controls when exactly standalone text is selected**,
So that **I can set glyph fill and optional outline without shape-oriented confusion**.

**Acceptance Criteria:**

**Given** exactly one **text** element is selected  
**When** I open the style / properties area  
**Then** I see a **Fill** (or **Text color**) control and a **Stroke** control that applies to **text outline only** (UX-DR1)  
**And** I can set fill color independently of outline (FR1)

**Given** outline is disabled  
**When** I view the panel  
**Then** stroke width/color controls are hidden or clearly inactive until I enable outline (UX-DR2)

**Given** a **non–text-only** selection (e.g. text + rectangle)  
**When** I view properties  
**Then** this feature’s text-paint controls are **not shown** (or are disabled per UX-DR3 — no mixed-selection UX)

**Given** outline is enabled  
**When** I adjust stroke color and thickness  
**Then** both apply to the text outline (FR2) and I can combine with fill for busy backgrounds (FR3)

---

### Story 1.3: Theme-aware resolved colors for text paint

As a **diagram author**,
I want **text fill and outline to follow light/dark theme like other elements**,
So that **previews stay trustworthy in both themes**.

**Acceptance Criteria:**

**Given** light or dark theme is active  
**When** resolved paint is computed for a text element  
**Then** the same theme pipeline used elsewhere applies to **both** fill and outline colors (FR12, Architecture)

---

### Story 1.4: Accessibility and i18n for text paint controls

As a **keyboard and assistive-tech user**,
I want **text paint controls to match the editor’s existing picker baseline**,
So that **I can adjust text styling without confusion**.

**Acceptance Criteria:**

**Given** text-only selection and paint controls visible  
**When** I navigate with keyboard  
**Then** I can reach and operate Fill and Stroke controls with visible focus (FR13, NFR3)

**Given** assistive technologies query control names  
**When** they read the text paint controls  
**Then** names match visible labels and do not label glyph fill as “Stroke” (FR14, NFR4, UX-DR1)

**Given** locale files  
**When** strings ship  
**Then** **en.json** (and any required locales per repo policy) include non-conflicting labels for Fill vs Stroke/outline (NFR4)

---

### Story 1.5: Inline editor reflects the same text paint

As a **diagram author**,
I want **the wysiwyg text editor to show the same fill/outline as the canvas**,
So that **I edit what I see**.

**Acceptance Criteria:**

**Given** a text element with fill and optional outline set  
**When** I enter inline edit mode  
**Then** the editable text appearance matches the canvas selection for those paints (FR5)

---

## Epic 2: One look everywhere you draw or export

Users see the **same** text styling on the **interactive canvas**, in **SVG export**, and while **editing inline**, including after **zoom** and pan.

### Story 2.1: Canvas text rendering uses shared resolved paint

As a **diagram author**,
I want **the canvas to draw text fill and optional outline using the same resolver as the data model**,
So that **on-screen text matches saved intent**.

**Acceptance Criteria:**

**Given** a text element with known fill/outline state  
**When** it is drawn on the interactive canvas  
**Then** glyph fill and optional outline match the resolved paint from shared helpers (FR6 canvas portion, Architecture)  
**And** documented draw order (e.g. stroke then fill per line) is applied consistently

---

### Story 2.2: SVG export parity for text fill and outline

As a **diagram author**,
I want **exported SVG to match canvas text appearance**,
So that **vector exports are trustworthy**.

**Acceptance Criteria:**

**Given** the same scene and text styling  
**When** I export to SVG  
**Then** text fill and outline match the canvas within normal SVG limitations (FR6 vector portion)  
**And** implementation reuses the shared resolver / semantics from Architecture (no app-only color math)

---

### Story 2.3: Zoom and pan keep text paint correct

As a **diagram author**,
I want **zoom and pan not to desync text styling**,
So that **I don’t need manual refresh**.

**Acceptance Criteria:**

**Given** styled text on canvas  
**When** I zoom and pan the viewport  
**Then** text paint remains correct without workaround refresh (FR8)

---

### Story 2.4: Performance sanity for many text elements and SVG export

As a **maintainer**,
I want **no major perf regression**,
So that **large boards stay usable**.

**Acceptance Criteria:**

**Given** stress scenarios comparable to existing Excalidraw text-heavy boards  
**When** users edit and pan/zoom  
**Then** no user-noticeable interaction regression vs baseline (NFR1)

**Given** comparable scenes before/after  
**When** exporting SVG with outlined text  
**Then** export duration stays the same order of magnitude as pre-feature baseline (NFR2)

---

## Epic 3: Safe upgrades for saved drawings

Users open **legacy** boards without silent visual changes; saves **round-trip**; **defaults** documented.

### Story 3.1: Legacy file load preserves untouched text appearance

As a **user with old `.excalidraw` files**,
I want **text to look the same until I edit it**,
So that **I trust upgrades**.

**Acceptance Criteria:**

**Given** a legacy document where `strokeColor` was used as glyph fill  
**When** I open it and do not edit a text element  
**Then** its on-screen appearance matches pre-migration behavior per published rules (FR9)

---

### Story 3.2: Save and reload preserves new text paint

As a **diagram author**,
I want **my text fill/outline choices to survive save and reopen**,
So that **work is not lost**.

**Acceptance Criteria:**

**Given** I styled text with fill and optional outline  
**When** I save and reopen the document  
**Then** the same styling is restored (FR10)

---

### Story 3.3: Migration rules and backward readability documented

As an **integrator or maintainer**,
I want **documented defaults and version/compat rules**,
So that **older clients and hosts behave predictably**.

**Acceptance Criteria:**

**Given** pre-new-field text elements  
**When** they are deserialized  
**Then** defaults are defined and match PRD/Architecture (FR11)  
**And** serialized output remains **backward readable** by the prior minor version **or** the change is explicitly versioned with embedder-facing notes (NFR5, CHANGELOG)

---

## Epic 4: Share, embed, and ship with confidence

**Viewers**, **embedders**, **tests**, and **release notes** align.

### Story 4.1: Consistent interpretation across compatible viewers

As a **collaborator**,
I want **another user on a compatible build to see the same text paint**,
So that **shared scenes don’t silently lose outline/fill meaning**.

**Acceptance Criteria:**

**Given** a scene with new text paint fields saved by a newer build  
**When** a viewer opens it with a **compatible** version per documented rules  
**Then** fill and outline render as specified without silent semantic drop (FR15)

---

### Story 4.2: Embedder-facing serialization and API documentation

As an **embedder**,
I want **documented optional fields and migration**,
So that **I can persist scenes safely**.

**Acceptance Criteria:**

**Given** the public embedding / package docs  
**When** I read them  
**Then** new or renamed text styling fields, defaults, and migration expectations are listed (FR16, FR17, NFR6)

---

### Story 4.3: Automated cross-surface verification

As a **maintainer**,
I want **tests that fail if canvas and SVG diverge**,
So that **regressions are caught in CI**.

**Acceptance Criteria:**

**Given** representative text fixtures (fill-only, fill+outline, legacy-mapped)  
**When** tests run in the repo’s test pipeline  
**Then** primary surfaces (canvas vs SVG export per Architecture) stay equivalent within the project’s testing approach (FR18)

---

### Story 4.4: Release and compatibility messaging

As a **user or host maintainer**,
I want **clear release notes**,
So that **I know what changed and how to upgrade**.

**Acceptance Criteria:**

**Given** a release containing this feature  
**When** I read release materials  
**Then** user-visible behavior and compatibility expectations for text styling are explained (FR19)

---

## Epic 5 (Post-MVP): Advanced outline styling

**Future** stroke styling beyond MVP (FR21).

### Story 5.1: Advanced text outline styling (deferred scope)

As a **diagram author**,
I want **dashes, joins, or miter controls for text outline**,
So that **I can match specialized design tools**.

**Acceptance Criteria:**

**Given** MVP text outline (color + width) is shipped  
**When** this story is prioritized  
**Then** implement advanced outline options per product decision (FR21) without breaking legacy migration rules  
**And** extend canvas, SVG, and property UI consistently (same parity rules as Epic 2)
