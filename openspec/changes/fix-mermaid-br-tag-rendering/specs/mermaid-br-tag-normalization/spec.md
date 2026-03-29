## ADDED Requirements

### Requirement: Mermaid br-tag normalization
When skeleton elements returned by `parseMermaidToExcalidraw()` contain `<br>`, `<br/>`, or `<br />` in any visible text field, the system SHALL replace those tags with newline characters (`\n`) before converting the elements to Excalidraw elements.

#### Scenario: Clipboard paste with br tag in node label
- **GIVEN** the user pastes a Mermaid diagram into the editor
- **WHEN** the pasted diagram contains a node label with `<br>` (e.g., `A["Line1<br>Line2"]`)
- **THEN** the resulting Excalidraw text element SHALL display the text as two lines separated by a newline, not as `Line1<br>Line2`

#### Scenario: TTD dialog with br tag in node label
- **GIVEN** the user opens the Text-to-Diagram dialog with a Mermaid definition
- **WHEN** the definition contains a node label with `<br/>`
- **THEN** the preview and inserted elements SHALL render the text with a line break, not the literal string `<br/>`

#### Scenario: Self-closing and space variants are normalized
- **GIVEN** a Mermaid skeleton element text contains br variants
- **WHEN** the text contains `<br/>` or `<br />`
- **THEN** these variants SHALL also be replaced with `\n`

#### Scenario: No br tag - no change
- **GIVEN** a Mermaid node label that contains no HTML br tags
- **WHEN** the skeleton element is processed
- **THEN** the text SHALL be passed through unchanged to `convertToExcalidrawElements()`
