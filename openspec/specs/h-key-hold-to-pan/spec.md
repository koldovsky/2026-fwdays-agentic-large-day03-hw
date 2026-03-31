# h-key-hold-to-pan Specification

## Purpose
TBD - created by archiving change fix-h-key-tool-flickering. Update Purpose after archive.
## Requirements
### Requirement: H key activates hand tool on press
When the user presses the `H` key (without Alt or Ctrl/Cmd modifiers) and the active tool is not already the hand tool, the system SHALL immediately switch to the hand tool and record that the hand tool was activated via keyboard hold.

#### Scenario: First keydown activates hand tool
- **WHEN** the user presses the `H` key with no modifier keys while the selection tool is active
- **THEN** the active tool switches to the hand tool

#### Scenario: Repeated keydown does not flicker
- **WHEN** the user holds the `H` key so that the browser fires repeated keydown events
- **THEN** the active tool remains the hand tool without toggling back and forth

#### Scenario: H key ignored when hand tool already active via keyboard hold
- **WHEN** the hand tool is already active because the user is holding the `H` key
- **THEN** subsequent keydown repeat events for `H` produce no tool change

### Requirement: H key restores previous tool on release
When the user releases the `H` key after having activated the hand tool via keyboard hold, the system SHALL restore the tool that was active before the `H` key was pressed.

#### Scenario: Release restores selection tool
- **WHEN** the user pressed `H` while the selection tool was active and then releases `H`
- **THEN** the active tool switches back to the selection tool

#### Scenario: Release restores non-selection tool
- **WHEN** the user pressed `H` while the rectangle tool was active and then releases `H`
- **THEN** the active tool switches back to the rectangle tool

#### Scenario: Release does not restore when hand tool activated via toolbar
- **WHEN** the hand tool was activated by clicking the toolbar button (not via keyboard hold) and the user presses and releases `H`
- **THEN** the hand tool remains active (keyboard H is a no-op when entering an already-active hand tool state via toolbar)

### Requirement: Toolbar hand tool button retains toggle behavior
Clicking the hand tool button in the toolbar SHALL toggle the hand tool on and off independently of keyboard hold state.

#### Scenario: Toolbar click activates hand tool
- **WHEN** the user clicks the hand tool button while the selection tool is active
- **THEN** the active tool switches to the hand tool

#### Scenario: Toolbar click deactivates hand tool
- **WHEN** the user clicks the hand tool button while the hand tool is active
- **THEN** the active tool switches back to the last active tool before hand

