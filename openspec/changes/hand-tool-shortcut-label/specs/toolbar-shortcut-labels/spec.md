## ADDED Requirements

### Requirement: Primary toolbar shows shortcut label on hand tool

The system SHALL display a keyboard shortcut label on the hand (pan) tool button in the primary desktop toolbar when that tool has a defined letter or number shortcut in editor metadata, consistent with other primary tools in the same toolbar.

#### Scenario: Hand tool shows letter shortcut

- **WHEN** the user views the main editor toolbar on a configuration where other tools show superscript shortcut labels
- **THEN** the hand tool button SHALL display its letter shortcut label (e.g. **H**) in the same manner as other primary tools that use a letter shortcut

#### Scenario: Shortcut behavior unchanged

- **WHEN** the user presses the hand tool shortcut key
- **THEN** the editor SHALL activate the hand tool as it did before this change
