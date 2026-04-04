## ADDED Requirements

### Requirement: Detect markdown table on paste
The system SHALL detect markdown table syntax when text is pasted into the canvas. Detection requires a header row with pipe-separated columns, a separator row matching the pattern `|---|`, and at least one data row.

#### Scenario: Valid markdown table is detected
- **GIVEN** the Excalidraw canvas is active and editable
- **WHEN** user pastes text matching markdown table format (header row, separator row, data rows with pipe delimiters)
- **THEN** system SHALL recognize it as a markdown table and NOT treat it as plain text

#### Scenario: Plain text with pipes is not detected
- **GIVEN** the Excalidraw canvas is active and editable
- **WHEN** user pastes text containing pipe characters but missing the separator row (`|---|`)
- **THEN** system SHALL treat it as plain text (fallback behavior)

#### Scenario: Plain paste mode bypasses detection
- **GIVEN** the Excalidraw canvas is active and the user has a markdown table in the clipboard
- **WHEN** user performs a plain paste (Ctrl+Shift+V)
- **THEN** system SHALL skip markdown table detection and paste as plain text

### Requirement: Parse markdown table into structured data
The system SHALL parse a detected markdown table into headers and rows. Each cell value SHALL be trimmed of whitespace. The separator row SHALL be excluded from the parsed data.

#### Scenario: Standard markdown table parsing
- **GIVEN** a valid markdown table with 4 columns, a header row, a separator row, and 5 data rows
- **WHEN** the table is parsed
- **THEN** system SHALL produce a structure with 4 header strings and 5 rows of 4 cell values each

#### Scenario: Cells with extra whitespace
- **GIVEN** a markdown table where cells contain leading/trailing whitespace (e.g. `| value  |`)
- **WHEN** the table is parsed
- **THEN** system SHALL trim whitespace from each cell value

### Requirement: Generate visual table from parsed data
The system SHALL create Excalidraw rectangle elements with bound text labels for each cell. All cells SHALL have uniform width and uniform height.

#### Scenario: Table with 4 columns and 6 rows (1 header + 5 data)
- **GIVEN** a parsed markdown table with 4 columns and 6 total rows (1 header + 5 data)
- **WHEN** the visual table elements are generated
- **THEN** system SHALL generate 24 rectangle elements, each containing a centered text label with the cell value

#### Scenario: Uniform cell dimensions
- **GIVEN** a parsed markdown table with any number of columns and rows
- **WHEN** the visual table elements are generated
- **THEN** all rectangles SHALL have identical width and identical height

### Requirement: Group table elements
The system SHALL assign a common group ID to all generated table elements so the table can be selected and moved as a single unit.

#### Scenario: Selecting any table cell selects the entire table
- **GIVEN** a markdown table has been pasted and rendered on the canvas
- **WHEN** user clicks on any cell of the table
- **THEN** all cells in the table SHALL be selected as a group

### Requirement: Position table at paste location
The system SHALL position the generated table at the current cursor location on the canvas, consistent with how other pasted elements (Mermaid, embeddables) are positioned.

#### Scenario: Table appears at cursor position
- **GIVEN** the cursor is positioned at coordinates (x, y) on the canvas
- **WHEN** user pastes a markdown table
- **THEN** the top-left corner of the table SHALL be placed at (x, y) scene coordinates
