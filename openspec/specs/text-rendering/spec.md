## ADDED Requirements

### Requirement: Markdown Link Detection
The system SHALL detect markdown-style links in the format
`[label](url)` within text element content (typically a single link in the submitted string).

#### Scenario: Valid link detected (before or after submit)
- **GIVEN** a text element whose content is or normalizes to a valid `[label](url)` with an allowed URL scheme
- **WHEN** the text is rendered on canvas
- **THEN** `label` is displayed with hyperlink styling (distinct color and underline)

#### Scenario: Persisted model after submit
- **GIVEN** the user submitted text that contained a single valid markdown link
- **WHEN** the element is stored in the scene
- **THEN** `element.text` equals the visible `label` and `element.link` holds the normalized URL (full markdown syntax is not required in stored `text`)

#### Scenario: No links in text
- **GIVEN** a text element with content "Hello world"
- **WHEN** the text is rendered on canvas
- **THEN** text renders as plain text without hyperlink styling from this feature

### Requirement: Link Security
The system SHALL validate URLs and reject unsafe schemes (for example `javascript:` and dangerous `data:`).

#### Scenario: Malicious link rejected
- **GIVEN** a text element with "[Click](javascript:alert(1))"
- **WHEN** the text is rendered
- **THEN** the link is treated as plain text (no hyperlink styling or navigation to the payload)