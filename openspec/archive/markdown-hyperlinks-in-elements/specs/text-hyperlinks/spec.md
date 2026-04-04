## ADDED Requirements

### Requirement: Markdown link syntax in text

The system SHALL recognize zero or more non-overlapping substrings in text element content that match the markdown link pattern `[label](url)` where `label` and `url` are non-empty strings constrained by the parsing rules in implementation. Text outside such patterns SHALL be treated as plain text.

#### Scenario: Valid link renders as a link

- **WHEN** a text element contains the substring `[Docs](https://example.com/doc)` and the URL passes URL validation
- **THEN** the canvas SHALL display the visible text `Docs` with link styling distinct from surrounding plain text

#### Scenario: Malformed sequence stays literal

- **WHEN** a text element contains `[unclosed` or `](invalid` without a valid matching pattern
- **THEN** the system SHALL render the characters as plain text with no hyperlink behavior

### Requirement: Link styling

The system SHALL render recognized links with a clear visual indication of interactivity, including at minimum a distinct color from normal text stroke and an underline (or equivalent accessibility-consistent styling).

#### Scenario: Styling is visible in the editor

- **WHEN** a valid link is present in a text element in the editing canvas
- **THEN** the link label SHALL be rendered with the mandated distinct styling so a typical user can distinguish it from non-link text

### Requirement: Open in new tab

- **WHEN** the user activates a valid link in a text element (per interaction rules defined in implementation) and the URL is allowed
- **THEN** the system SHALL open the URL in a new browser tab (or equivalent new browsing context)

#### Scenario: Allowed HTTP(S) opens

- **WHEN** the user activates a link whose URL uses the `https` scheme and passes validation
- **THEN** the system SHALL open that URL in a new tab

### Requirement: URL safety

The system SHALL NOT open, SHALL NOT emit as a clickable `href` in vector export, and SHALL NOT treat as a link for activation purposes any URL whose scheme or normalized form is disallowed by the security rules (including but not limited to `javascript:` and other executable or opaque schemes as specified in implementation).

#### Scenario: Dangerous scheme is blocked

- **WHEN** text contains `[x](javascript:alert(1))`
- **THEN** the system SHALL not execute script and SHALL not offer a clickable link that navigates to that URL

### Requirement: SVG export semantics

- **WHEN** the user exports or generates SVG including text elements that contain valid, allowed links
- **THEN** the SVG SHALL represent those links with appropriate hyperlink markup where supported so viewers can activate the same URLs from the exported file

#### Scenario: Raster export is visual-only

- **WHEN** the user exports a raster image (e.g. PNG) of the scene
- **THEN** link labels SHALL appear with the same link styling as on canvas but the image SHALL not embed clickable regions unless explicitly specified elsewhere
