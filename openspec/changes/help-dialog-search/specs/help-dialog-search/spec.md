## ADDED Requirements

### Requirement: Search is accessible via a magnifying glass icon in the dialog title bar
The help dialog SHALL render a magnifying glass icon button in the upper-right corner of its title bar. The icon button SHALL be the only visible search-related element until the user activates search.

#### Scenario: Icon button is visible on dialog open
- **WHEN** the user opens the help dialog
- **THEN** a magnifying glass icon button SHALL be visible in the upper-right corner of the title bar

#### Scenario: No input field shown by default
- **WHEN** the user opens the help dialog and has not activated search
- **THEN** no text input field SHALL be rendered or focused

---

### Requirement: Search activates on icon click or keypress
The search input SHALL expand and receive focus when the user either clicks the magnifying glass icon button or presses any printable key while the help dialog is open and search is not yet active.

#### Scenario: Clicking the icon activates search
- **WHEN** the user clicks the magnifying glass icon button
- **THEN** the icon SHALL be replaced by a frameless text input that is focused and ready to accept text

#### Scenario: Typing while dialog is open activates search
- **WHEN** the help dialog is open and the user presses a printable key (not a modifier or control key) while search is inactive
- **THEN** the search input SHALL activate, the typed character SHALL appear in the input, and filtering SHALL begin immediately

#### Scenario: Escape or clearing input deactivates search
- **WHEN** the search input is active and the user clears the input text (empty string)
- **THEN** all shortcuts SHALL be shown again and the input MAY remain visible for continued use

---

### Requirement: Search input is frameless with an underline style
The search input, when active, SHALL have no visible border box and no focus ring box. It SHALL display only a bottom border (underline) consistent with Excalidraw's minimal UI style.

#### Scenario: Input has underline-only styling
- **WHEN** the search input is active
- **THEN** the input SHALL display a bottom border only, with no surrounding border and no outline

#### Scenario: Input is positioned in the upper-right of the title bar
- **WHEN** the search input is active
- **THEN** it SHALL appear in the upper-right area of the dialog title bar, aligned with the title row

---

### Requirement: Shortcuts are filtered in real-time as the user types
The help dialog SHALL filter the displayed shortcuts in real-time based on a case-insensitive substring match against each shortcut's label.

#### Scenario: Matching shortcuts remain visible
- **WHEN** the user types a query that matches part of a shortcut label (case-insensitive)
- **THEN** only shortcuts whose labels contain the query string SHALL be displayed

#### Scenario: Non-matching shortcuts are hidden
- **WHEN** the user types a query that does not match a shortcut's label
- **THEN** that shortcut SHALL be hidden from the dialog

#### Scenario: Clearing the input restores all shortcuts
- **WHEN** the user clears the search input
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

### Requirement: Help dialog dimensions do not change during filtering
The outer dimensions of the help dialog SHALL remain fixed while the user types a search query. The dialog SHALL NOT shrink or grow as shortcuts are shown or hidden.

#### Scenario: Dialog size unchanged after filtering
- **WHEN** the user types a query that hides the majority of shortcuts
- **THEN** the help dialog container SHALL maintain the same width and height as when fully populated

#### Scenario: Dialog size unchanged after clearing filter
- **WHEN** the user clears the search query after filtering
- **THEN** the help dialog SHALL return to showing all shortcuts without any layout shift

---

### Requirement: Matching text is highlighted within shortcut labels
When a search query is active, the matching substring within a shortcut label SHALL be visually highlighted.

#### Scenario: Match substring is highlighted
- **WHEN** a shortcut label contains the search query substring
- **THEN** the matching portion of the label SHALL be wrapped in a `<mark>` element that is visually distinct from the surrounding text

#### Scenario: No highlight when query is empty
- **WHEN** the search input is empty or inactive
- **THEN** shortcut labels SHALL be rendered without any highlight markup
