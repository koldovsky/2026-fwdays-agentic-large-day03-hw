# Toolbar Shortcut Label Consistency

Desktop toolbar tools display keyboard shortcut labels as small overlays on their icons, giving users a persistent visual reference for shortcuts without requiring hover or memorization.

## Requirement: Keybinding label computation

`ShapesSwitcher` SHALL compute a `keybindingLabel` for every tool in the `SHAPES` array using the generic formula `numericKey || letter`. The computation SHALL NOT special-case any tool by name or value.

### Scenario: Tool with both numericKey and letter key

- **GIVEN** a tool in `SHAPES` has `key: KEYS.R` and `numericKey: KEYS["2"]` (e.g. the rectangle tool)
- **WHEN** `ShapesSwitcher` computes `keybindingLabel`
- **THEN** `keybindingLabel` SHALL resolve to `"2"` (numericKey takes precedence)

### Scenario: Tool with only a letter key

- **GIVEN** a tool in `SHAPES` has a `key` value and `numericKey: null` (e.g. the hand tool with `key: KEYS.H`)
- **WHEN** `ShapesSwitcher` computes `keybindingLabel`
- **THEN** `keybindingLabel` SHALL resolve to the capitalized letter (e.g. `"H"`)

### Scenario: Tool with no keyboard shortcut

- **GIVEN** a tool in `SHAPES` has `key: null` and `numericKey: null`
- **WHEN** `ShapesSwitcher` computes `keybindingLabel`
- **THEN** `keybindingLabel` SHALL resolve to `undefined` and no keybinding overlay SHALL be rendered

## Requirement: Desktop toolbar shortcut label rendering

On desktop (non-mobile) viewports, every tool icon whose `keybindingLabel` is defined SHALL render a `span.ToolIcon__keybinding` element containing the label text in the bottom-right corner of the icon.

### Scenario: Hand tool shows "H" label

- **GIVEN** the editor is rendered on a desktop viewport
- **WHEN** the toolbar displays the hand tool icon
- **THEN** the icon SHALL render a `span.ToolIcon__keybinding` element containing `"H"`

### Scenario: Tool tooltip includes shortcut

- **GIVEN** the editor is rendered on a desktop viewport and a tool has a keybinding label
- **WHEN** the user hovers over the tool icon
- **THEN** the tooltip SHALL include the shortcut key after a dash (e.g. "Hand (panning tool) — H")

## Requirement: Mobile toolbar hides shortcut labels

On mobile viewports, toolbar tool icons SHALL NOT render `span.ToolIcon__keybinding` elements regardless of whether a `keybindingLabel` is defined.

### Scenario: No keybinding label on mobile

- **GIVEN** the editor is rendered on a mobile viewport
- **WHEN** the toolbar displays a tool icon via its mobile component (e.g. `HandButton` with `isMobile=true`)
- **THEN** the tool icon SHALL NOT render a `span.ToolIcon__keybinding` element
