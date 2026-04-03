## ADDED Requirements

### Requirement: Markdown Link Detection
The system SHALL detect markdown-style links in the format
[label](url) within text element content.

#### Scenario: Valid link detected
- **GIVEN** a text element with content "See [Docs](https://docs.example.com)"
- **WHEN** the text is rendered on canvas
- **THEN** "Docs" is displayed as a styled clickable hyperlink

#### Scenario: No links in text
- **GIVEN** a text element with content "Hello world"
- **WHEN** the text is rendered on canvas
- **THEN** text renders as plain text without modifications

### Requirement: Link Security
The system SHALL validate URLs and reject javascript: protocol links.

#### Scenario: Malicious link rejected
- **GIVEN** a text element with "[Click](javascript:alert(1))"
- **WHEN** the text is rendered
- **THEN** the link is rendered as plain text, not as hyperlink
