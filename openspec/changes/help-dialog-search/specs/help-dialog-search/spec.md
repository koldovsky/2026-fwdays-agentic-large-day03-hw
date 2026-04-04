## ADDED Requirements

### Requirement: Search input is present in the upper right corner of the dialog title bar
The help dialog SHALL render a text input field in the upper right corner of the dialog title bar, inline with the dialog heading, allowing users to type a search query.

#### Scenario: Input is visible in title bar on dialog open
- **WHEN** the user opens the help dialog
- **THEN** a search input field SHALL be visible in the upper right of the title bar, aligned with the dialog heading

#### Scenario: Input is auto-focused on dialog open
- **WHEN** the help dialog is opened
- **THEN** the search input SHALL receive focus automatically so the user can type immediately without clicking

#### Scenario: Input styling matches project design language
- **WHEN** the search input is rendered
- **THEN** it SHALL use the same border-radius, color variables, and font size as other interactive elements in the help dialog (e.g., `HelpDialog__btn`)

---

### Requirement: Shortcuts are filtered in real-time as the user types
The help dialog SHALL filter the displayed shortcuts in real-time based on a case-insensitive substring match against each shortcut's label as the user types into the search input.

#### Scenario: Matching shortcuts remain visible
- **WHEN** the user types a query that matches part of a shortcut label (case-insensitive)
- **THEN** only shortcuts whose labels contain the query string SHALL be displayed

#### Scenario: Non-matching shortcuts are hidden
- **WHEN** the user types a query that does not match a shortcut's label
- **THEN** that shortcut SHALL be hidden from the dialog

#### Scenario: Clearing the input restores all shortcuts
- **WHEN** the user clears the search input (empty string)
- **THEN** all shortcuts SHALL be displayed again

#### Scenario: Search is case-insensitive
- **WHEN** the user types a query in any combination of upper and lower case
- **THEN** shortcuts SHALL match regardless of the case of their labels

---

### Requirement: Section headers are hidden when all their shortcuts are filtered out
A ShortcutIsland section SHALL be hidden (including its header) when none of its shortcuts match the current search query.

#### Scenario: Section hidden when no matches
- **WHEN** the search query matches no shortcuts within a section
- **THEN** that section's header and container SHALL not be rendered

#### Scenario: Section visible when at least one match
- **WHEN** the search query matches at least one shortcut within a section
- **THEN** that section's header and remaining matching shortcuts SHALL be visible

---

### Requirement: Matching text is highlighted within shortcut labels
When a search query is active, the substring of the shortcut label that matches the query SHALL be visually highlighted.

#### Scenario: Match substring is highlighted
- **WHEN** a shortcut label contains the search query substring
- **THEN** the matching portion of the label SHALL be wrapped in a highlighted element (e.g., `<mark>`) that is visually distinct from the surrounding text

#### Scenario: No highlight when query is empty
- **WHEN** the search input is empty
- **THEN** shortcut labels SHALL be rendered without any highlight markup
