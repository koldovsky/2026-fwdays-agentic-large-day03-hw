## ADDED Requirements

### Requirement: Notion URL recognition
The system SHALL recognize published Notion page URLs matching the `*.notion.site` hostname pattern and treat them as embeddable content.

#### Scenario: Standard published Notion page URL
- **WHEN** a user provides a URL like `https://myteam.notion.site/My-Page-Title-abc123def456`
- **THEN** the system SHALL identify it as an embeddable Notion link

#### Scenario: Notion URL without page title slug
- **WHEN** a user provides a URL like `https://myteam.notion.site/abc123def456`
- **THEN** the system SHALL identify it as an embeddable Notion link

#### Scenario: Non-Notion URL
- **WHEN** a user provides a URL that does not match `*.notion.site`
- **THEN** the system SHALL NOT treat it as a Notion embed

### Requirement: Notion embed URL transformation
The system SHALL transform recognized Notion page URLs into the embed format `https://{hostname}/ebd/{pageId}` for iframe rendering.

#### Scenario: URL with page title slug
- **WHEN** the input URL is `https://myteam.notion.site/My-Page-Title-abc123def456`
- **THEN** the embed URL SHALL be `https://myteam.notion.site/ebd/abc123def456`

#### Scenario: URL without page title slug
- **WHEN** the input URL is `https://myteam.notion.site/abc123def456`
- **THEN** the embed URL SHALL be `https://myteam.notion.site/ebd/abc123def456`

### Requirement: Notion domain allowlisting
The system SHALL include `*.notion.site` in the set of allowed embed domains so that Notion URLs pass the default embeddable URL validation.

#### Scenario: Notion URL passes default validation
- **WHEN** a `*.notion.site` URL is checked against the default allowed domains
- **THEN** the validation SHALL return `true`

### Requirement: Notion iframe sandbox configuration
The system SHALL grant `allow-same-origin` to Notion embeds so that interactive page content renders correctly within the iframe.

#### Scenario: Notion embed iframe sandbox
- **WHEN** a Notion embed iframe is rendered on the canvas
- **THEN** the iframe sandbox attribute SHALL include `allow-same-origin`

### Requirement: Notion embed display properties
The system SHALL render Notion embeds as `"generic"` type with a document-oriented aspect ratio suitable for reading page content.

#### Scenario: Notion embed intrinsic size
- **WHEN** a Notion page is embedded
- **THEN** the embed SHALL use a portrait-oriented aspect ratio (taller than wide)
