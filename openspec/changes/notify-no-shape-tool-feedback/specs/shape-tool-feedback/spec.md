## ADDED Requirements

### Requirement: Empty-canvas draw feedback when no shape tool is active

The editor SHALL show a brief, non-blocking message when the user performs a drag gesture on the canvas that would not create a new shape because the active tool is selection or lasso, **and** the editor has **armed** that feedback because the user recently switched from a drawable shape tool to selection or lasso. The gesture SHALL be consistent with attempting to draw on empty canvas (pointer down on empty canvas, drag beyond the configured minimum distance in scene space).

#### Scenario: Armed after leaving a shape tool for selection

- **WHEN** the active tool has just changed from a drawable shape tool (rectangle, ellipse, diamond, arrow, line, or freedraw) to the selection tool
- **AND** the user presses the primary pointer on empty canvas and drags farther than the configured minimum distance
- **AND** the interaction does not create a new drawable element
- **THEN** the editor SHALL show a transient message explaining that a shape tool must be selected to draw
- **AND** the editor SHALL disarm further messages of this kind until the user again transitions from a drawable shape tool to selection or lasso, or selects a drawable shape tool

#### Scenario: Armed after leaving a shape tool for lasso

- **WHEN** the active tool has just changed from a drawable shape tool to the lasso tool (preferred selection tool)
- **AND** the user performs an equivalent empty-canvas drag with the lasso tool (excluding temporary lasso-from-selection interactions)
- **AND** the drag exceeds the configured minimum distance
- **THEN** the editor SHALL show the same transient message and disarm as in the selection scenario

#### Scenario: No feedback during normal selection work

- **WHEN** the user is using the selection tool for ordinary marquee selection on empty canvas
- **AND** the editor has **not** been armed by a recent drawable-to-selection (or drawable-to-lasso) transition
- **THEN** the editor SHALL NOT show the empty-canvas draw feedback message

#### Scenario: No feedback when a shape tool is active

- **WHEN** the active tool is a tool that creates new shapes (for example rectangle, ellipse, arrow, or line)
- **AND** the user drags on the canvas to create that shape
- **THEN** the editor SHALL NOT show the empty-canvas draw feedback message for that gesture

#### Scenario: Suppress noise on small movement

- **WHEN** the feedback would otherwise be eligible
- **AND** the pointer movement from pointer down stays within the configured minimum drag threshold
- **THEN** the editor SHALL NOT show the empty-canvas draw feedback message

#### Scenario: At most one message per pointer gesture

- **WHEN** the user holds the primary pointer and moves multiple times during one gesture
- **THEN** the editor SHALL show at most one instance of this feedback for that gesture

#### Scenario: Localized copy

- **WHEN** the empty-canvas draw feedback message is shown
- **THEN** the message text SHALL be loaded from the application locale files in the same manner as other user-visible UI strings

### Requirement: Toast legibility for draw feedback

The toast surface used for this and other ephemeral messages SHALL use theme tokens so the panel reads clearly against the canvas (for example grey-tinted background and visible border consistent with the design system).

#### Scenario: Theme-aligned toast chrome

- **WHEN** a toast is displayed
- **THEN** its background and border SHALL use design-system color variables (not plain white-only styling) so contrast is sufficient in default and dark themes
