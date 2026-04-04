## ADDED Requirements

### Requirement: Arrow keys pan canvas in view mode
When view mode is enabled, pressing arrow keys (Up, Down, Left, Right) SHALL pan the canvas in the corresponding direction by updating `scrollX` and `scrollY` in AppState.

#### Scenario: Single arrow key pans in one direction
- **WHEN** view mode is enabled AND user presses the Right arrow key
- **THEN** the canvas SHALL scroll to the left (scrollX decreases), moving the viewport to the right

#### Scenario: Arrow keys do nothing outside view mode
- **WHEN** view mode is NOT enabled AND user presses an arrow key
- **THEN** the keyboard pan system SHALL NOT intercept the event, allowing existing behavior (element nudging, etc.)

### Requirement: Simultaneous arrow keys produce diagonal movement
Pressing two perpendicular arrow keys at the same time SHALL pan the canvas diagonally, combining both axes of movement.

#### Scenario: Up + Left produces diagonal pan
- **WHEN** view mode is enabled AND user holds both Up and Left arrow keys
- **THEN** the canvas SHALL pan diagonally up-left (scrollX increases AND scrollY increases simultaneously)

#### Scenario: Opposing keys cancel out
- **WHEN** view mode is enabled AND user holds both Up and Down arrow keys
- **THEN** the vertical movement SHALL cancel out, resulting in no vertical pan

### Requirement: Panning has ease-in acceleration
When an arrow key is first pressed, panning SHALL start slowly and accelerate to maximum speed over a short duration, rather than starting at full speed immediately.

#### Scenario: Gradual speed increase on key press
- **WHEN** view mode is enabled AND user presses and holds an arrow key
- **THEN** the pan velocity SHALL increase from zero toward maximum speed over approximately 200-300ms

### Requirement: Panning has ease-out decay on release
When all arrow keys are released, panning SHALL NOT stop immediately. The canvas SHALL continue to coast with decreasing velocity until it comes to a natural stop.

#### Scenario: Momentum after key release
- **WHEN** user releases all arrow keys after panning
- **THEN** the canvas SHALL continue moving in the last direction with exponentially decreasing velocity until velocity drops below a threshold

#### Scenario: Re-pressing key during coast overrides decay
- **WHEN** the canvas is coasting after key release AND user presses an arrow key
- **THEN** the system SHALL resume acceleration in the new direction, combining with any remaining coast velocity

### Requirement: Pan animation is frame-rate independent
The panning system SHALL use delta-time between frames to compute scroll updates, ensuring consistent pan speed regardless of monitor refresh rate.

#### Scenario: Consistent speed at different frame rates
- **WHEN** the animation loop runs at 60fps vs 120fps
- **THEN** the canvas SHALL travel approximately the same distance per second in both cases

### Requirement: Animation loop self-terminates when idle
The requestAnimationFrame loop SHALL stop running when no keys are pressed AND velocity has decayed below the dead-zone threshold.

#### Scenario: Loop stops after coast completes
- **WHEN** all arrow keys are released AND velocity decays below 0.5 px/frame
- **THEN** the animation loop SHALL stop requesting new frames

### Requirement: Window blur clears key state
If the browser window loses focus while arrow keys are held, the system SHALL treat all keys as released to prevent stuck panning.

#### Scenario: Focus loss during panning
- **WHEN** user is panning with arrow keys AND the browser window loses focus
- **THEN** all arrow keys SHALL be treated as released AND the canvas SHALL coast to a stop via normal decay
