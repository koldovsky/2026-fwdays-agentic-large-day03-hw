### Requirement: Clear Canvas menu item displays shortcut hint

The "Clear Canvas" item in the main dropdown menu SHALL display the keyboard shortcut hint (Ctrl+Delete on Windows/Linux, Cmd+Delete on macOS), consistent with all other shortcut-enabled menu items (Load, Save, Export Image, Help).

#### Scenario: Shortcut hint visible on desktop

- **WHEN** a user opens the main dropdown menu on a desktop device
- **THEN** the "Clear Canvas" menu item MUST display "Ctrl+Delete" (Windows/Linux) or "⌘+Delete" (macOS) as an inline shortcut hint

#### Scenario: Shortcut hint hidden on mobile

- **WHEN** a user opens the main dropdown menu on a phone form factor
- **THEN** the "Clear Canvas" menu item MUST NOT display a shortcut hint (matching existing mobile behavior for all menu items)

#### Scenario: Shortcut functionality unchanged

- **WHEN** a user presses Ctrl/Cmd+Delete with the canvas focused
- **THEN** the clear canvas confirmation dialog MUST appear exactly as before — no change in behavior
