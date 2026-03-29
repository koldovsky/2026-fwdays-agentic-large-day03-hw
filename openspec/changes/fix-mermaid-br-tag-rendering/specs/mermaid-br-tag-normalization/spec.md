## ADDED Requirements

### Requirement: Mermaid br-tag normalization
When skeleton elements returned by `parseMermaidToExcalidraw()` contain `<br>`, `<br/>`, or `<br />` in any visible text field, the system SHALL replace those tags with newline characters (`\n`) before converting the elements to Excalidraw elements.

#### Scenario: Clipboard paste with br tag in node label
- **WHEN** a user pastes a Mermaid diagram containing a node label with `<br>` (e.g., `A["Line1<br>Line2"]`)
- **THEN** the resulting Excalidraw text element SHALL display the text as two lines separated by a newline, not as `Line1<br>Line2`

#### Scenario: TTD dialog with br tag in node label
- **WHEN** a user submits a Mermaid definition in the Text-to-Diagram dialog containing a node label with `<br/>`
- **THEN** the preview and inserted elements SHALL render the text with a line break, not the literal string `<br/>`

#### Scenario: Self-closing and space variants are normalized
- **WHEN** a Mermaid skeleton element text contains `<br/>` or `<br />`
- **THEN** these variants SHALL also be replaced with `\n`

#### Scenario: No br tag - no change
- **WHEN** a Mermaid node label contains no HTML br tags
- **THEN** the text SHALL be passed through unchanged to `convertToExcalidrawElements()`
