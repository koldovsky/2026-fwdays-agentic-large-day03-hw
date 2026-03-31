## ADDED Requirements

### Requirement: Hand tool displays keyboard shortcut label

The hand (pan) tool in the desktop toolbar SHALL display its keyboard shortcut "H" as a superscript label on its icon, consistent with all other toolbar tools.

#### Scenario: Hand tool shows "H" label on desktop toolbar

- **GIVEN** the Excalidraw editor is rendered on a desktop (non-mobile) viewport
- **WHEN** the toolbar displays the hand tool icon
- **THEN** the hand tool icon SHALL render a `span.ToolIcon__keybinding` element containing the text "H" in the bottom-right corner

#### Scenario: Hand tool tooltip includes shortcut

- **GIVEN** the Excalidraw editor is rendered on a desktop viewport
- **WHEN** the user hovers over the hand tool icon
- **THEN** the tooltip SHALL display "Hand (panning tool) — H"

### Requirement: Mobile toolbar hides hand tool shortcut label

The hand tool on mobile viewports SHALL NOT display a keybinding label, consistent with the existing mobile toolbar behavior.

#### Scenario: Hand tool has no label on mobile

- **GIVEN** the Excalidraw editor is rendered on a mobile viewport using `MobileToolBar`
- **WHEN** the toolbar displays the hand tool via `HandButton` with `isMobile=true`
- **THEN** the hand tool icon SHALL NOT render a `span.ToolIcon__keybinding` element

### Requirement: All toolbar tools follow consistent label pattern

Every tool in the desktop toolbar that has a keyboard shortcut defined in `SHAPES` SHALL display its shortcut as a keybinding label. No tool-specific exclusions SHALL exist in the label computation logic.

#### Scenario: No tool-specific exclusions in keybinding label logic

- **GIVEN** the `SHAPES` array contains entries with `key` and/or `numericKey` properties
- **WHEN** `ShapesSwitcher` computes `keybindingLabel` for any tool
- **THEN** the computation SHALL use the generic formula `numericKey || letter` without special-casing any tool by name or value

#### Scenario: Tool with only a letter key and no numericKey

- **GIVEN** a tool in `SHAPES` has `key: KEYS.H` and `numericKey: null` (like the hand tool)
- **WHEN** `ShapesSwitcher` computes `keybindingLabel` for that tool
- **THEN** `keybindingLabel` SHALL resolve to `"H"` (the capitalized letter)

#### Scenario: Tool with both numericKey and letter key

- **GIVEN** a tool in `SHAPES` has `key: KEYS.R` and `numericKey: KEYS["2"]` (like the rectangle tool)
- **WHEN** `ShapesSwitcher` computes `keybindingLabel` for that tool
- **THEN** `keybindingLabel` SHALL resolve to `"2"` (numericKey takes precedence)

#### Scenario: Tool with no keyboard shortcut

- **GIVEN** a hypothetical tool in `SHAPES` has `key: null` and `numericKey: null`
- **WHEN** `ShapesSwitcher` computes `keybindingLabel` for that tool
- **THEN** `keybindingLabel` SHALL resolve to `undefined` and no keybinding overlay SHALL be rendered
