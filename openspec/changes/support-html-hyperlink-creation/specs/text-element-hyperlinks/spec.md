## ADDED Requirements

### Requirement: Parse markdown-style hyperlinks in text elements
The system MUST detect inline markdown hyperlinks in text element content when text matches the form `[label](url)`, and MUST treat non-matching or incomplete patterns as plain text.

#### Scenario: Valid markdown link is recognized
- **WHEN** a text element contains `See [docs](https://example.com/docs)`
- **THEN** the system identifies one hyperlink segment with label `docs` and URL `https://example.com/docs`

#### Scenario: Malformed markdown remains plain text
- **WHEN** a text element contains `See [docs](https://example.com`
- **THEN** the system renders the full string as plain text with no active hyperlink segment

### Requirement: Hyperlink segments are visually distinguishable
The system MUST render recognized hyperlink segments with clear interactive styling while preserving existing typography and layout for non-link text.

#### Scenario: Link segment is styled as interactive
- **WHEN** a text element contains one or more recognized markdown hyperlinks
- **THEN** each hyperlink segment is rendered with link affordance styling and non-link segments keep default text styling

### Requirement: Hyperlinks open safely in a new tab
The system MUST open recognized hyperlinks in a new browser tab only when the URL passes validation against allowed schemes, and MUST block unsafe URLs.

#### Scenario: Safe URL opens in new tab
- **WHEN** the user activates a recognized hyperlink with URL `https://excalidraw.com`
- **THEN** the system opens that URL in a new browser tab

#### Scenario: Unsafe URL is blocked
- **WHEN** the user activates a recognized hyperlink with URL `javascript:alert(1)`
- **THEN** the system does not open a new tab for that URL

### Requirement: Link activation does not break editing workflows
The system MUST preserve existing text editing and element selection behavior, and MUST avoid triggering unintended navigation during normal editing interactions.

#### Scenario: Text editing remains available over link text
- **WHEN** the user enters text-edit mode on an element containing recognized hyperlinks
- **THEN** the user can place the caret and edit text without automatic link navigation
