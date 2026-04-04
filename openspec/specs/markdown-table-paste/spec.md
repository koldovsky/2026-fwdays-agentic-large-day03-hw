## ADDED Requirements

### Requirement: Detect markdown table on paste
The system SHALL detect markdown table syntax when text is pasted into the canvas. Detection requires a header row with pipe-separated columns, a separator row matching the pattern `|---|`, and at least one data row.

#### Scenario: Valid markdown table is detected
- **WHEN** user pastes text matching markdown table format (header row, separator row, data rows with pipe delimiters)
- **THEN** system SHALL recognize it as a markdown table and NOT treat it as plain text

#### Scenario: Plain text with pipes is not detected
- **WHEN** user pastes text containing pipe characters but missing the separator row (`|---|`)
- **THEN** system SHALL treat it as plain text (fallback behavior)

#### Scenario: Plain paste mode bypasses detection
- **WHEN** user performs a plain paste (Ctrl+Shift+V)
- **THEN** system SHALL skip markdown table detection and paste as plain text

### Requirement: Parse markdown table into structured data
The system SHALL parse a detected markdown table into headers and rows. Each cell value SHALL be trimmed of whitespace. The separator row SHALL be excluded from the parsed data.

#### Scenario: Standard markdown table parsing
- **WHEN** a markdown table with 4 columns and 5 data rows is detected
- **THEN** system SHALL produce a structure with 4 header strings and 5 rows of 4 cell values each

#### Scenario: Cells with extra whitespace
- **WHEN** cells contain leading/trailing whitespace (e.g. `| value  |`)
- **THEN** system SHALL trim whitespace from each cell value

### Requirement: Generate visual table from parsed data
The system SHALL create Excalidraw rectangle elements with bound text labels for each cell. Each column SHALL have a uniform width determined by the longest cell content in that column. All rows SHALL have the same height. Column widths SHALL be at least 100px and SHALL scale with content length.

#### Scenario: Table with 4 columns and 6 rows (1 header + 5 data)
- **WHEN** a parsed markdown table with 4 columns and 6 total rows is processed
- **THEN** system SHALL generate 24 rectangle elements, each containing a centered text label with the cell value

#### Scenario: Per-column uniform width
- **WHEN** table elements are generated
- **THEN** all rectangles in the same column SHALL have identical width, and the width SHALL be large enough to fit the longest text in that column without overflow

#### Scenario: Short content columns use minimum width
- **WHEN** a column contains only short text (e.g. single digit numbers)
- **THEN** the column width SHALL be at least 100px

#### Scenario: Long content column expands
- **WHEN** a column contains a cell with long text (e.g. 40+ characters)
- **THEN** the column width SHALL expand proportionally to fit the content

### Requirement: Group table elements
The system SHALL assign a common group ID to all generated table elements so the table can be selected and moved as a single unit.

#### Scenario: Selecting any table cell selects the entire table
- **WHEN** user clicks on any cell of a pasted table
- **THEN** all cells in the table SHALL be selected as a group

### Requirement: Position table at paste location
The system SHALL position the generated table at the current cursor location on the canvas, consistent with how other pasted elements (Mermaid, embeddables) are positioned.

#### Scenario: Table appears at cursor position
- **WHEN** user pastes a markdown table
- **THEN** the top-left corner of the table SHALL be placed at the cursor's scene coordinates
