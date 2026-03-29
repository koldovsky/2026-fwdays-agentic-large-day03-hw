## ADDED Requirements

### Requirement: Keyboard shortcut triggers wrap text in container

The system SHALL execute the `wrapTextInContainer` action when the user presses Alt+Shift+W (Option+Shift+W on macOS) while one or more unbound text elements are selected on the canvas.

#### Scenario: Shortcut wraps a single selected text element

- **WHEN** the user selects a single unbound text element and presses Alt+Shift+W
- **THEN** the text element SHALL be wrapped in a new rectangle container, and the container SHALL become the selected element

#### Scenario: Shortcut wraps multiple selected text elements

- **WHEN** the user selects multiple unbound text elements and presses Alt+Shift+W
- **THEN** each text element SHALL be wrapped in its own rectangle container, and all new containers SHALL become the selected elements

#### Scenario: Shortcut is ignored when no text is selected

- **WHEN** the user presses Alt+Shift+W with no elements selected, or with only non-text elements selected
- **THEN** no action SHALL be performed

#### Scenario: Shortcut is ignored for already-bound text

- **WHEN** the user selects only text elements that are already bound to containers and presses Alt+Shift+W
- **THEN** no action SHALL be performed

### Requirement: Shortcut is displayed in the context menu

The system SHALL display the Alt+Shift+W shortcut label next to the "Wrap text in a container" entry in the element context menu.

#### Scenario: Context menu shows shortcut hint

- **WHEN** the user right-clicks on an unbound text element to open the context menu
- **THEN** the "Wrap text in a container" menu item SHALL display the keyboard shortcut Alt+Shift+W (rendered with platform-appropriate modifier symbols)
