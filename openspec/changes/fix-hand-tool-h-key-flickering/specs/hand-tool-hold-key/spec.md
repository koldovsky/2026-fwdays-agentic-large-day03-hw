## ADDED Requirements

### Requirement: H key activates hand tool on initial press only
The system SHALL activate the hand tool on the first `keydown` event for the `H` key and SHALL ignore subsequent `keydown` events caused by key-repeat while the key remains held.

#### Scenario: Initial H keydown activates hand tool
- **WHEN** the user presses the `H` key while not in hand tool mode
- **THEN** the hand tool becomes active

#### Scenario: Key-repeat does not toggle hand tool off
- **WHEN** the user holds the `H` key such that the browser fires repeated `keydown` events
- **THEN** the hand tool remains active for the entire duration of the hold without flickering

### Requirement: Releasing H restores previous tool when held
When `H` was held to temporarily activate the hand tool, the system SHALL restore the previously active tool upon `keyup`.

#### Scenario: Release H after hold restores previous tool
- **WHEN** the user holds the `H` key (activating hand tool via hold)
- **AND** the user releases the `H` key
- **THEN** the tool active before the `H` hold is restored

#### Scenario: Tap H does not trigger hold-restore on keyup
- **WHEN** the user taps `H` once to toggle the hand tool on
- **AND** the user does not immediately hold H again
- **THEN** releasing `H` does NOT restore the previous tool (the hand tool stays active)

### Requirement: Focus loss resets H hold state
The system SHALL reset the `H` hold state if the application loses focus while `H` is held, preventing the hand tool from remaining indefinitely active after blur.

#### Scenario: Window blur during H hold resets state
- **WHEN** the user holds the `H` key (activating hand tool via hold)
- **AND** the application window loses focus
- **THEN** the `isHoldingH` flag is reset to `false`
