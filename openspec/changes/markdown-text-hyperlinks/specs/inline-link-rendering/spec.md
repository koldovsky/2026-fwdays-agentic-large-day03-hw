## ADDED Requirements

### Requirement: Render link labels with distinct styling on canvas
The system SHALL render link segment labels with a distinct fill color (`#1971c2`) and an underline decoration on the HTML Canvas, visually distinguishing them from surrounding plain text.

#### Scenario: Link label rendered with blue color and underline
- **WHEN** a text element containing `Visit [Excalidraw](https://excalidraw.com) now` is drawn on the canvas
- **THEN** the word `Excalidraw` SHALL be rendered in `#1971c2` fill color with an underline, while `Visit ` and ` now` SHALL be rendered in the element's normal `strokeColor`

#### Scenario: Dark mode adjusts link color
- **WHEN** the render theme is dark mode
- **THEN** the link color SHALL be transformed through `applyDarkModeFilter` before being applied, consistent with how `strokeColor` is handled in dark mode

### Requirement: Per-segment rendering preserves text layout
The system SHALL render each line of text as a sequence of segments (plain text and link) using individual `fillText` calls with a running horizontal offset, maintaining the same overall text layout as the current single-call rendering.

#### Scenario: Multi-segment line alignment
- **WHEN** a text element with `textAlign: "center"` contains `Click [here](https://example.com) to start`
- **THEN** the combined rendered width of all segments SHALL be centered within the element width, matching the behavior of a single `fillText` call for the equivalent visual text `Click here to start`

#### Scenario: Multiple lines with mixed content
- **WHEN** a text element contains two lines: `Line one with [a link](https://a.com)` and `Plain line two`
- **THEN** line one SHALL render with per-segment styling, and line two SHALL render as a single plain segment, both at the correct vertical positions

### Requirement: Text wrapping accounts for link label width
When computing soft line breaks, the system SHALL use the **label** width (not the raw `[label](url)` width) for link segments, so the visual wrapping reflects the rendered output.

#### Scenario: Wrapping uses label width
- **WHEN** a text element with `autoResize: false` and a fixed width contains `Check [this documentation page](https://example.com/docs) for details`
- **THEN** the wrapping SHALL be computed based on the visual width of `Check this documentation page for details`, not the raw markdown string

### Requirement: Per-link hit testing in view mode
The system SHALL compute bounding boxes for each rendered link span and support hit testing against individual links. When a pointer event lands on a link span in view mode, the system SHALL identify which link was hit.

#### Scenario: Click on link span opens URL
- **WHEN** a user clicks on the rendered area of a link label in view mode
- **THEN** the system SHALL open the link's sanitized URL in a new browser tab via `window.open(url, "_blank", "noreferrer")`

#### Scenario: Click on plain text does not trigger link
- **WHEN** a user clicks on a plain text region of a text element that also contains inline links
- **THEN** no link navigation SHALL occur from the inline link system (the element-level `link` behavior, if set, is unaffected)

#### Scenario: Hover on link span shows pointer cursor
- **WHEN** a user hovers over a rendered link label span in view mode
- **THEN** the cursor SHALL change to `pointer` to indicate interactivity

### Requirement: SVG export wraps link spans in anchor elements
When exporting text elements to SVG, the system SHALL wrap each link segment's `<tspan>` in an `<a>` element with the sanitized URL as its `href`, and apply the link color and underline styling via SVG attributes.

#### Scenario: SVG export with inline link
- **WHEN** a text element containing `Read [the guide](https://guide.example.com)` is exported to SVG
- **THEN** the SVG output SHALL contain an `<a>` element with `href="https://guide.example.com"` wrapping a `<tspan>` with text `the guide`, styled with `fill="#1971c2"` and `text-decoration="underline"`

#### Scenario: SVG export with no links
- **WHEN** a text element with no markdown links is exported to SVG
- **THEN** the SVG output SHALL be identical to the current rendering (no `<a>` elements added)

### Requirement: Inline links coexist with element-level link
The inline markdown link feature SHALL operate independently of the element-level `link` property. Both can be present on the same text element without conflict.

#### Scenario: Element with both link types
- **WHEN** a text element has `element.link = "https://element-link.com"` and text containing `See [inline](https://inline.com)`
- **THEN** the element-level link icon and click behavior SHALL work as before, AND the inline `inline` label SHALL be independently clickable and navigate to `https://inline.com`
