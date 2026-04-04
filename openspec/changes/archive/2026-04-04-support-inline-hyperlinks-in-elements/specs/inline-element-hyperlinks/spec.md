## ADDED Requirements

### Requirement: Text elements recognize markdown-style hyperlinks
The system SHALL recognize inline hyperlinks embedded in text content when the author enters the markdown-style syntax `[label](url)` and the URL passes the platform's normal link validation rules.

#### Scenario: Valid markdown link becomes an inline hyperlink
- **WHEN** a user finishes editing a text element containing `See [docs](https://example.com/docs)`
- **THEN** the text element SHALL preserve the authored source text
- **AND** the rendered text SHALL expose `docs` as an interactive hyperlink targeting `https://example.com/docs`

#### Scenario: Invalid markdown link remains plain text
- **WHEN** a text element contains malformed link syntax or a URL that fails validation
- **THEN** the system SHALL render the content as plain text
- **AND** the malformed segment SHALL NOT become interactive

### Requirement: Inline hyperlinks are visually distinguishable in rendered output
The system SHALL render recognized inline hyperlinks with visible hyperlink affordances so users can identify interactive text in the canvas and exported output.

#### Scenario: Canvas rendering indicates interactivity
- **WHEN** a text element contains a recognized inline hyperlink and is not actively being edited
- **THEN** the hyperlink label SHALL be styled distinctly from surrounding plain text
- **AND** only the hyperlink label glyph area SHALL respond to link activation input

#### Scenario: Export preserves hyperlink semantics
- **WHEN** a scene containing recognized inline hyperlinks is exported to a link-capable format
- **THEN** the exported output SHALL preserve the hyperlink target for each recognized inline hyperlink
- **AND** the exported label text SHALL remain readable even in viewers that do not activate the link

### Requirement: Activating an inline hyperlink reuses existing link-opening behavior
The system SHALL open inline hyperlinks using the same normalization, target selection, and host interception behavior used for existing Excalidraw hyperlinks.

#### Scenario: External inline hyperlink opens in a new tab
- **WHEN** a user activates a recognized inline hyperlink whose normalized target is external
- **THEN** the system SHALL open the normalized URL in a new browser tab

#### Scenario: Host application intercepts inline hyperlink activation
- **WHEN** the host application intercepts inline hyperlink activation through the existing link-open hook and prevents the default action
- **THEN** the system SHALL NOT open a browser tab automatically

### Requirement: Editing preserves raw markdown source
The system SHALL preserve plain-text authoring semantics for text elements that contain inline hyperlinks.

#### Scenario: User re-enters text editing for a linked label
- **WHEN** a user opens the editor for a text element containing a recognized inline hyperlink
- **THEN** the editor SHALL show the original markdown source text including `[label](url)`
- **AND** saving without changes SHALL preserve the same source text

