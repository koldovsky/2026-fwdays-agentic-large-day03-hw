## ADDED Requirements

### Requirement: Toast notification on shape tool deactivation via Escape

The system SHALL display a toast notification when the user presses Escape to deactivate a shape tool (any tool not in the NON_SHAPE_TOOLS set: `"selection"`, `"lasso"`, `"eraser"`, `"hand"`, `"laser"`) via `actionDeselect`. The preferred selection tool is `app.state.preferredSelectionTool`, which is either `"selection"` or `"lasso"` depending on user preference.

#### Scenario: User deactivates a shape tool via Escape

- **GIVEN** the active tool is a shape tool (e.g., `"rectangle"`, `"ellipse"`, `"diamond"`, `"arrow"`, `"line"`, `"freedraw"`, `"text"`, `"image"`) and no elements are selected
- **WHEN** the user presses the Escape key
- **THEN** the system SHALL switch the active tool to the preferred selection tool (`"selection"` or `"lasso"`) AND display a toast notification with the `toast.toolDeactivated` message

#### Scenario: User presses Escape while a shape tool is active and elements are selected

- **GIVEN** the active tool is a shape tool (e.g., `"rectangle"`) and one or more elements are selected
- **WHEN** the user presses the Escape key
- **THEN** the system SHALL switch the active tool to the preferred selection tool, clear the element selection, AND display the tool-deactivated toast, because `actionDeselect.perform` handles tool switching, selection clearing, and toast in a single operation based on the deactivated tool type

#### Scenario: User presses Escape while already in selection mode

- **GIVEN** the active tool is `"selection"` or `"lasso"`, no elements are selected, and no tool-deactivated toast is displayed
- **WHEN** the user presses the Escape key
- **THEN** the system SHALL NOT display a toast notification

#### Scenario: User presses Escape while a non-shape utility tool is active

- **GIVEN** the active tool is `"eraser"`, `"hand"`, or `"laser"`
- **WHEN** the user presses the Escape key
- **THEN** the system SHALL NOT display a tool-deactivated toast notification (these are non-shape tools)

### Requirement: Repeated Escape refreshes toast timer

The system SHALL allow repeated Escape presses to refresh the toast auto-dismiss timer rather than stacking or ignoring subsequent presses.

#### Scenario: Repeated Escape after toast is already shown

- **GIVEN** the tool-deactivated toast is currently displayed from a prior Escape press
- **WHEN** the user presses Escape again
- **THEN** the system SHALL refresh the toast auto-dismiss timer to the full duration (3000ms) from the time of the last Escape press

### Requirement: Toast auto-dismisses after configured duration

The system SHALL auto-dismiss the tool-deactivated toast after 3000 milliseconds using the existing Toast component infrastructure.

#### Scenario: Toast auto-dismiss

- **GIVEN** the tool-deactivated toast has been displayed
- **WHEN** 3000 milliseconds have elapsed without another Escape press
- **THEN** the system SHALL dismiss the toast notification

### Requirement: Toast message is localized

The system SHALL use the `toast.toolDeactivated` i18n key for the toast message, with a default English translation.

#### Scenario: English locale toast message

- **GIVEN** the application is running in English locale
- **WHEN** the tool-deactivated toast is triggered
- **THEN** the toast message SHALL be "Tool deactivated — select a shape to draw"
