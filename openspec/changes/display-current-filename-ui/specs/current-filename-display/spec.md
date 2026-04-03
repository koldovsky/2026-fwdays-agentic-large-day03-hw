## ADDED Requirements

### Requirement: Visible current filename in editor UI
The system SHALL display the active document filename in a persistent, clearly visible location in the editor UI.

#### Scenario: Named file is shown
- **WHEN** a document with an explicit filename is active
- **THEN** the UI displays that filename as the current document label

### Requirement: Fallback label for unnamed documents
The system SHALL display a deterministic fallback label when the active document has no explicit filename.

#### Scenario: Untitled document is shown
- **WHEN** a new or unnamed document is active
- **THEN** the UI displays the configured fallback label instead of an empty filename

### Requirement: Filename label stays synchronized with file lifecycle actions
The system SHALL update the displayed filename whenever document identity changes through supported file actions.

#### Scenario: Open or import updates label
- **WHEN** the user opens or imports a document with a different filename
- **THEN** the visible filename label updates to the newly active document name

#### Scenario: Save As or rename updates label
- **WHEN** the active document is saved with a new name or renamed through supported flows
- **THEN** the visible filename label updates to the new filename without requiring a reload

### Requirement: Responsive filename display behavior
The system SHALL preserve filename visibility on both desktop and mobile layouts without overlapping critical controls.

#### Scenario: Long filename on narrow viewport
- **WHEN** the filename exceeds available horizontal space on a constrained viewport
- **THEN** the UI applies responsive truncation behavior while keeping the label discoverable
