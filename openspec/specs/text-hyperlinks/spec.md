# text-hyperlinks Specification

## Purpose
TBD - created by archiving change element-markdown-hyperlinks. Update Purpose after archive.
## Requirements
### Requirement: Markdown-style link syntax in text

The system SHALL accept inline hyperlinks authored using the syntax `[label](url)` within supported text fields, where `label` is non-empty visible text and `url` is a UTF-8 string subject to URL validation. Unmatched brackets or parentheses SHALL be treated as literal characters without breaking surrounding text layout.

#### Scenario: Valid link renders as a single logical link

- **WHEN** a text element contains the substring `[Documentation](https://example.com/docs)`
- **THEN** the system treats `Documentation` as the link label and `https://example.com/docs` as the navigation target after validation

#### Scenario: Incomplete markup stays literal

- **WHEN** a text element contains `[no closing paren` or `no bracket](https://example.com)`
- **THEN** the system does not interpret a hyperlink and renders the characters as plain text

### Requirement: Visual distinction for links

The system SHALL render link labels with a visual style that indicates interactivity (including at minimum an underline and a color distinct from non-link text in the same element) while respecting the active theme (light/dark).

#### Scenario: Link styling on canvas

- **WHEN** a validated link is drawn on the interactive or static canvas
- **THEN** the link label is visibly distinguishable from plain text in the same line per the styling rules above

### Requirement: Safe navigation on activation

The system SHALL navigate to the validated target URL only when the user activates a rendered link (e.g., click or keyboard equivalent where supported). Navigation SHALL open in a new top-level browsing context (new tab) using `noopener` and `noreferrer` (or equivalent secure behavior). If navigation is blocked by the environment, the system SHALL fail without executing script URLs.

#### Scenario: Click opens https URL in a new tab

- **WHEN** the user activates a link whose validated scheme is `https`
- **THEN** the browser opens the URL in a new tab with `noopener` and `noreferrer` (or equivalent)

#### Scenario: Dangerous schemes do not navigate

- **WHEN** the stored URL uses the `javascript:` scheme or another disallowed scheme
- **THEN** the system does not perform navigation and does not pass the URL to `window.open` or `location`

### Requirement: URL validation and normalization

The system SHALL validate and normalize candidate URLs before persistence in memory and before any navigation or export that embeds the URL. Only `http` and `https` schemes SHALL be accepted for navigation unless a future requirement explicitly extends the allowlist. The system SHALL reject empty URLs, exceed max-length limits, and malformed inputs. Invalid links SHALL be treated as plain text for interaction (no click navigation) while preserving the author’s raw text.

#### Scenario: http and https accepted

- **WHEN** a link target is `http://example.com` or `https://example.com/path?query=1`
- **THEN** the URL passes validation and may be used for rendering as a link and for navigation

#### Scenario: javascript scheme rejected

- **WHEN** a link target begins with `javascript:`
- **THEN** validation fails and the UI does not offer link navigation for that segment

### Requirement: Hit testing respects link regions

The system SHALL compute axis-aligned or font-faithful hit regions for each link label in canvas coordinates such that activating within the drawn label triggers navigation and activating outside does not. Overlapping elements SHALL follow existing z-order and pointer routing rules.

#### Scenario: Pointer over label activates link

- **WHEN** the pointer is over the drawn glyphs of a validated link label at the topmost hit-tested text element
- **THEN** the system treats the event as targeting that link for activation purposes

### Requirement: SVG export includes hyperlinks when structurally valid

The system SHALL emit standards-conforming link markup in SVG export for text elements that contain validated links, such that consuming viewers that support SVG links can activate the same URLs. If a subset of lines or spans cannot be represented as links without violating SVG constraints, the behavior SHALL match the explicitly documented fallback in implementation notes (e.g., emit plain text plus URL comment), without silently dropping security validation.

#### Scenario: Simple single-line link in SVG

- **WHEN** the scene is exported to SVG and a text element contains one validated `[label](https://example.com)` on a single line
- **THEN** the exported SVG contains a hyperlink association for that label pointing at `https://example.com`

