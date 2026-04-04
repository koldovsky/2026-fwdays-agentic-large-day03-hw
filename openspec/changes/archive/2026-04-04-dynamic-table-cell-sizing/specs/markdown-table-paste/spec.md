## MODIFIED Requirements

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
