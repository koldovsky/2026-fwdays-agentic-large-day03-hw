## ADDED Requirements

### Requirement: View mode arrow-key panning

When view mode is enabled, the editor SHALL pan the canvas in response to the ArrowLeft, ArrowRight, ArrowUp, and ArrowDown keys while the user is not editing text and the event target is not an input-like element.

#### Scenario: Single arrow pans along one axis

- **WHEN** view mode is enabled and the user presses and holds ArrowRight (with focus not in an input-like element)
- **THEN** the canvas scroll position SHALL change in the corresponding direction over time

#### Scenario: Diagonal pan with two keys

- **WHEN** view mode is enabled and the user holds ArrowUp and ArrowLeft together
- **THEN** the canvas SHALL pan simultaneously along both axes (diagonal motion), not only one axis

#### Scenario: No pan while typing

- **WHEN** view mode is enabled but focus is in a writable control (e.g. text editing or input-like element)
- **THEN** arrow keys SHALL NOT pan the canvas for that input

### Requirement: Eased keyboard pan motion

Keyboard-driven panning in view mode SHALL accelerate after a key is pressed and decelerate after keys are released, rather than starting and stopping movement instantly in a single frame.

#### Scenario: Deceleration on release

- **WHEN** the user releases all arrow keys used for panning after moving the canvas
- **THEN** panning SHALL continue briefly with decreasing speed until motion stops
