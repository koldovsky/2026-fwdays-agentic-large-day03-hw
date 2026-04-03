## Context

Excalidraw currently stores and renders text elements as plain text and does not expose hyperlink semantics at render or interaction time. The proposed capability adds markdown-style link behavior without changing the serialized element schema in a breaking way. This affects multiple editor layers: text parsing, render styling, pointer hit-testing, and interaction handling. Security and UX constraints require opening only safe URLs in a new tab while preserving existing editing, selection, and export behavior for non-link content.

## Goals / Non-Goals

**Goals:**
- Detect markdown-style links (`[label](url)`) inside text elements.
- Render parsed links as visually interactive segments while keeping non-link text unchanged.
- Open validated links in a new browser tab from canvas interactions.
- Keep existing drawings backward compatible by treating unmatched patterns as plain text.

**Non-Goals:**
- Supporting rich HTML anchor tags or arbitrary markdown features beyond inline links.
- Adding per-element link metadata fields to persisted scene JSON in this change.
- Implementing custom link previews, unfurling, or analytics.

## Decisions

1. Parse links as a derived runtime model rather than a persisted data model change.  
   - Rationale: avoids migration risk and keeps serialized text backward compatible.  
   - Alternative considered: store structured link spans in element data, rejected due to schema complexity and migration cost.

2. Restrict activation to safe URL schemes and reject unsafe protocols.  
   - Rationale: prevents script-injection and reduces malicious link vectors.  
   - Alternative considered: allow any valid URI, rejected due to security exposure.

3. Preserve editor-first interaction semantics (edit/select) and activate links only when interaction intent is clearly "open link."  
   - Rationale: avoids regressions in common editing workflows.  
   - Alternative considered: open link on any click over link text, rejected because it conflicts with text editing and element manipulation.

4. Keep styling implementation minimal and consistent with current theming primitives.  
   - Rationale: ensures readable affordance without introducing a full typography/style subsystem.

## Risks / Trade-offs

- [Interaction ambiguity over linked text] -> Mitigation: gate activation behind explicit open-link interaction path and add regression tests around selection/edit flows.
- [Parser false positives/negatives for malformed markdown] -> Mitigation: strict pattern matching with plain-text fallback when syntax is incomplete.
- [Security gaps in URL normalization] -> Mitigation: centralize URL validation/sanitization and test blocked schemes.
- [Cross-platform behavior differences when opening tabs] -> Mitigation: use existing browser-safe open utility paths and add integration tests where available.

## Migration Plan

- No persisted schema migration is required because link semantics are derived from existing text content.
- Rollout can be done as a regular application release; rollback simply disables parsing/activation paths and preserves text content.

## Open Questions

- Should relative URLs be supported, or only absolute URLs with explicit schemes?
- Which exact interaction gesture should be canonical for opening links (modifier+click, context action, or both)?
- Should link styling be configurable in theme settings or fixed for initial release?
