# Delta spec: Mermaid imported text — `<br>` handling

## MODIFIED Requirements

### Requirement: Mermaid-imported node labels MUST render line breaks where Mermaid uses `<br>`

The system SHALL normalize text coming from the Mermaid-to-Excalidraw parse result so that HTML line-break sequences used in Mermaid labels are represented as newline characters in Excalidraw text, not as the literal characters `<`, `b`, `r`, etc.

**Scenario: Paste flow — two-line label**

- **GIVEN** the clipboard contains a valid Mermaid diagram with a node label `A["User Registration<br>Process"]`
- **WHEN** the user pastes into the canvas and the editor imports it as Mermaid
- **THEN** the resulting text element(s) for that node MUST display two lines: `User Registration` on the first line and `Process` on the second (no visible `<br>` substring)

**Scenario: Text-to-diagram preview**

- **GIVEN** the Mermaid tab in Text-to-diagram contains `graph TD\n  A["Line one<br>Line two"]`
- **WHEN** the preview renders
- **THEN** the preview MUST show `Line one` and `Line two` on separate lines without literal `<br>` in the visible label

**Scenario: Self-closing break tag**

- **GIVEN** a node label contains `<br/>` or `<br />` (common HTML variants)
- **WHEN** the diagram is imported via paste or TTD
- **THEN** the system MUST treat it as a line break consistent with the `<br>` scenario above

**Scenario: No break tag**

- **GIVEN** a node label has no `<br>` sequence
- **WHEN** the diagram is imported
- **THEN** the label text MUST be unchanged aside from normal processing already performed by the parser

**Scenario: Multiple breaks**

- **GIVEN** a label `A["a<br>b<br>c"]`
- **WHEN** imported
- **THEN** the rendered text MUST contain three lines `a`, `b`, and `c` in order

## ADDED Requirements

### Requirement: Normalization MUST be shared between paste and TTD

The same normalization logic SHALL be applied on both the clipboard Mermaid import path and the TTD Mermaid conversion path, so behavior does not diverge.

**Scenario: Consistency**

- **GIVEN** the same Mermaid source string
- **WHEN** it is imported via paste and via TTD insert
- **THEN** the resulting element text for equivalent nodes MUST match (subject to ID regeneration)
