## Purpose

Define how text elements are created, edited, rendered, and linked in
Excalidraw. Text elements let users place multiline text on the canvas with
configurable font, alignment, and optional binding to container shapes. Each
element may carry a single URL that makes it act as a clickable hyperlink.
## Requirements
### Requirement: Text Element Data Model
A text element SHALL store authoring text (`originalText`), display text
(`text`), font properties, alignment, container binding, and an optional
element-level link.

#### Scenario: Standalone text element created
- **GIVEN** a user double-clicks on the canvas
- **WHEN** the text element is created
- **THEN** the element has `type` "text", `originalText` and `text` equal to the entered string, `autoResize` true, `containerId` null, and `link` null

#### Scenario: Text bound to a container
- **GIVEN** a rectangle element exists on the canvas
- **WHEN** the user double-clicks the rectangle to add text
- **THEN** a text element is created with `containerId` set to the rectangle's id, and the rectangle's `boundElements` includes the text element

### Requirement: Text Editing Lifecycle
The system SHALL provide a WYSIWYG textarea overlay for editing text that
synchronises element geometry on every keystroke and commits on blur or
keyboard shortcut.

#### Scenario: User starts editing
- **GIVEN** a text element on the canvas
- **WHEN** the user double-clicks the text element
- **THEN** a positioned `<textarea>` appears over the element, pre-filled with `originalText`

#### Scenario: Text updates during editing
- **GIVEN** the text editor is open
- **WHEN** the user types new content
- **THEN** `originalText` and `text` are updated each keystroke and element dimensions are recalculated via `refreshTextDimensions`

#### Scenario: Text submitted via blur
- **GIVEN** the text editor is open
- **WHEN** the editor loses focus (blur)
- **THEN** the text element is finalised, the editor is removed, and `editingTextElement` is set to null

#### Scenario: Text submitted via keyboard
- **GIVEN** the text editor is open
- **WHEN** the user presses Escape or Ctrl/Cmd+Enter
- **THEN** the text element is finalised and the editor is closed

#### Scenario: Empty text deleted
- **GIVEN** the text editor is open
- **WHEN** the user submits with empty content
- **THEN** the text element is marked as deleted (`isDeleted: true`)

### Requirement: Text Normalisation
The system SHALL normalise raw text input by converting tabs to spaces and
standardising line endings before storage.

#### Scenario: Tab characters normalised
- **GIVEN** text containing tab characters
- **WHEN** the text element is created or edited
- **THEN** tabs are replaced with spaces in both `originalText` and `text`

### Requirement: Text Wrapping
The system SHALL wrap `originalText` into `text` when the element is bound to
a container or has `autoResize` set to false, respecting the element or
container width.

#### Scenario: Wrapping in a container
- **GIVEN** a text element bound to a rectangle container
- **WHEN** the text exceeds the container width
- **THEN** `text` contains soft line breaks so that each line fits within the container, while `originalText` retains the unwrapped source

#### Scenario: Standalone auto-resize text
- **GIVEN** a standalone text element with `autoResize` true
- **WHEN** the text is updated
- **THEN** the element width grows to fit the longest line and `text` equals `originalText`

#### Scenario: Fixed-width standalone text
- **GIVEN** a standalone text element with `autoResize` false
- **WHEN** the text exceeds the fixed width
- **THEN** `text` is wrapped to the fixed width while `originalText` retains the unwrapped source

### Requirement: Text Measurement
The system SHALL measure text dimensions using the configured font family,
font size, and line height to determine element width and height.

#### Scenario: Dimensions calculated on creation
- **GIVEN** a new text element with specific font settings
- **WHEN** the element is created
- **THEN** `width` and `height` are set based on `measureText` using the element's font string and line height

#### Scenario: Dimensions recalculated on edit
- **GIVEN** an existing text element
- **WHEN** the text content changes
- **THEN** `width` and `height` are recalculated to fit the new content

### Requirement: Canvas Text Rendering
The system SHALL render text on the HTML canvas using `fillText`, splitting on
newlines and applying font, alignment, and RTL direction settings.

#### Scenario: Multiline text rendered
- **GIVEN** a text element with multiple lines
- **WHEN** the element is drawn on canvas
- **THEN** each line is rendered with `fillText` at the correct vertical offset based on line height

#### Scenario: RTL text rendered
- **GIVEN** a text element with RTL content
- **WHEN** the element is drawn on canvas
- **THEN** the canvas direction is set appropriately for correct glyph placement

### Requirement: Element-Level Link
Each element (including text) SHALL support a single `link` property
(`string | null`) that makes the element act as a clickable hyperlink.

#### Scenario: Link icon displayed
- **GIVEN** an element with a non-null `link`
- **WHEN** the element is not selected and is visible on canvas
- **THEN** a small link icon is rendered at the top-right corner of the element bounds

#### Scenario: Link opened via click
- **GIVEN** an element with a `link` set
- **WHEN** the user clicks the link icon (or the element bounding box in view mode)
- **THEN** the URL is opened (in a new tab for external links, same tab for local links)

#### Scenario: No link set
- **GIVEN** an element with `link` set to null
- **WHEN** the element is rendered
- **THEN** no link icon is shown and clicking the element does not trigger navigation

#### Scenario: Link exported to SVG
- **GIVEN** an element with a non-null `link`
- **WHEN** the scene is exported to SVG
- **THEN** the element is wrapped in an `<a href="...">` tag

### Requirement: Plain Text Passthrough
The system SHALL treat all text content as plain text. No markdown or rich-text
formatting is parsed or applied to the rendered output.

#### Scenario: Markdown syntax rendered literally
- **GIVEN** a text element with content `[label](https://example.com)`
- **WHEN** the text is rendered on canvas
- **THEN** the literal string `[label](https://example.com)` is displayed as plain text

#### Scenario: No inline formatting
- **GIVEN** a text element with content `**bold** _italic_`
- **WHEN** the text is rendered on canvas
- **THEN** the literal string `**bold** _italic_` is displayed without any formatting

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

