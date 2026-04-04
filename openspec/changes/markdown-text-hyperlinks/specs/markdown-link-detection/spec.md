## ADDED Requirements

### Requirement: Parse markdown link syntax from text content
The system SHALL detect `[label](url)` patterns within text element content and decompose them into structured segments. Each segment SHALL be either a plain text segment or a link segment containing the label, the sanitized URL, and the raw character length of the original markdown syntax.

#### Scenario: Single markdown link in text
- **WHEN** a text element contains `Visit [Excalidraw](https://excalidraw.com) for more`
- **THEN** the parser SHALL return three segments: a plain text segment `Visit `, a link segment with label `Excalidraw` and URL `https://excalidraw.com`, and a plain text segment ` for more`

#### Scenario: Multiple markdown links in one line
- **WHEN** a text element contains `See [docs](https://docs.example.com) and [repo](https://github.com/example)`
- **THEN** the parser SHALL return five segments: plain `See `, link `docs` → `https://docs.example.com`, plain ` and `, link `repo` → `https://github.com/example`, and an empty trailing segment (if any)

#### Scenario: No markdown links present
- **WHEN** a text element contains `Hello world` with no `[label](url)` syntax
- **THEN** the parser SHALL return a single plain text segment containing the full text

#### Scenario: Markdown link spans full line
- **WHEN** a text element contains `[Click here](https://example.com)`
- **THEN** the parser SHALL return a single link segment with label `Click here` and URL `https://example.com`

#### Scenario: Nested brackets are not treated as links
- **WHEN** a text element contains `Use [[nested]](url)` or `[label](not a url` (malformed)
- **THEN** the parser SHALL treat incomplete or malformed patterns as plain text and NOT produce a link segment for them

### Requirement: Sanitize parsed URLs
The system SHALL pass every URL extracted from `[label](url)` through the existing `normalizeLink` function (which uses `sanitizeUrl` from `@braintree/sanitize-url`) before storing it in the link segment.

#### Scenario: JavaScript protocol URL is sanitized
- **WHEN** a text element contains `[click](javascript:alert(1))`
- **THEN** the sanitized URL in the link segment SHALL be `about:blank` (as returned by `sanitizeUrl`)

#### Scenario: Valid HTTPS URL passes through
- **WHEN** a text element contains `[site](https://example.com)`
- **THEN** the URL in the link segment SHALL be `https://example.com`

### Requirement: Cache parsed results by element version
The system SHALL cache the parsing result for each text element keyed by element `id` and `version`. When the same element is queried again with the same version, the system SHALL return the cached result without re-parsing.

#### Scenario: Cached result returned for unchanged element
- **WHEN** `parseMarkdownLinks` is called twice for the same element with the same `version`
- **THEN** the second call SHALL return the identical segment array without executing the regex parser

#### Scenario: Cache invalidated on element version change
- **WHEN** an element's text is edited (incrementing `version`) and `parseMarkdownLinks` is called
- **THEN** the system SHALL re-parse the text and return updated segments reflecting the new content

### Requirement: Provide raw length for offset mapping
Each link segment SHALL include a `rawLength` field equal to the character count of the full `[label](url)` string in the original text, enabling callers to map between visual positions and source text offsets.

#### Scenario: Raw length calculation
- **WHEN** a text element contains `[Go](https://go.dev)`
- **THEN** the link segment SHALL have `rawLength` equal to `20` (the length of `[Go](https://go.dev)`)
