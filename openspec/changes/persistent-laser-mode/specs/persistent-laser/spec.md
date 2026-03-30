## ADDED Requirements

### Requirement: Laser persistence toggle
The system SHALL provide a toggle in the laser tool dropdown that switches between temporary mode (trails auto-fade) and persistent mode (trails remain visible indefinitely). The default state SHALL be temporary mode (persistence off) to preserve backward compatibility.

#### Scenario: Toggle is off by default
- **WHEN** a user opens Excalidraw for the first time or has no stored preference
- **THEN** the laser tool operates in temporary mode and trails fade automatically

#### Scenario: User enables persistent mode
- **WHEN** user selects the laser tool and activates the "Persistent laser" toggle in the tool dropdown
- **THEN** subsequent laser trails SHALL remain fully visible on the canvas without fading

#### Scenario: Persistent setting is remembered across sessions
- **WHEN** user enables persistent mode and reloads the page
- **THEN** the laser tool SHALL still be in persistent mode

#### Scenario: Disabling persistence restores fade behavior
- **WHEN** user toggles persistence off
- **THEN** any new laser trails SHALL fade automatically (existing persistent trails are cleared)

### Requirement: Clear persistent laser trails
When persistent mode is active, the system SHALL provide a mechanism to clear all laser trails from the canvas. Clearing SHALL remove all visible laser trails immediately.

#### Scenario: Clear via UI action
- **WHEN** persistent mode is on and user clicks "Clear laser trails" in the laser tool dropdown
- **THEN** all visible laser trails SHALL be removed from the canvas immediately

#### Scenario: Clear via keyboard shortcut
- **WHEN** persistent mode is on, the laser tool is active, and user presses Delete or Backspace
- **THEN** all visible laser trails SHALL be removed from the canvas immediately

#### Scenario: Clear action not shown in temporary mode
- **WHEN** persistent mode is off
- **THEN** the "Clear laser trails" option SHALL NOT be visible in the laser tool dropdown

### Requirement: Persistent trails do not fade
When persistent mode is active, drawn laser trails SHALL maintain full opacity indefinitely and SHALL NOT be removed by the animation loop regardless of elapsed time or trail length.

#### Scenario: Trail remains after fade timeout
- **WHEN** persistent mode is on and user draws a laser trail
- **THEN** the trail SHALL remain fully visible after 1 second (the normal `DECAY_TIME`)

#### Scenario: Multiple overlapping trails all persist
- **WHEN** persistent mode is on and user draws multiple successive laser strokes
- **THEN** all strokes SHALL remain visible simultaneously until explicitly cleared

### Requirement: Persistent mode applies only to local user's trails
Remote collaborator laser trails SHALL continue to use the existing temporary fade behavior regardless of the local user's persistence setting.

#### Scenario: Remote trails still fade during collab session
- **WHEN** a remote collaborator uses the laser tool while local user has persistence enabled
- **THEN** the remote trail SHALL fade automatically as per existing behavior
