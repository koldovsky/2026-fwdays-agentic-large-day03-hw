# editor-tools — delta spec

## ADDED Requirements

### Requirement: Eraser keyboard toggle MUST align with UI tool transition

The system SHALL apply the same `AppState` resets when activating or deactivating the eraser via the **`toggleEraserTool`** keyboard shortcut as when switching to the same target tool via **`App.setActiveTool`**, for the fields affected by `setActiveTool` tool transitions (including `multiElement`, `editingGroupId`, snap overlay state, and `selectedLinearElement` where applicable).

#### Scenario: Arrow multi-point in progress then E

- **GIVEN** the user has chosen the **arrow** tool and started a **multi-point** stroke such that `AppState.multiElement` is non-null (at least first segment placed, stroke not finalized)
- **WHEN** the user presses **`E`** to invoke **`toggleEraserTool`**
- **THEN** `AppState.activeTool` indicates **eraser** AND `AppState.multiElement` is **null**
- **AND** `AppState.editingGroupId` is **null**

#### Scenario: Arrow multi-point in progress then eraser toolbar

- **GIVEN** the same state as in the previous scenario (`multiElement` non-null while drawing an arrow)
- **WHEN** the user activates the **eraser** from the **toolbar** (same as `setActiveTool({ type: "eraser" })`)
- **THEN** `AppState.multiElement` is **null** AND `AppState.activeTool` indicates **eraser**

#### Scenario: Keyboard E and toolbar eraser produce the same drawing-state fields

- **GIVEN** identical initial canvas state and the same in-progress multi-point arrow as above
- **WHEN** the user presses **`E`** once
- **THEN** the values of **`multiElement`**, **`editingGroupId`**, **`originSnapOffset`**, and **`snapLines`** match those after activating eraser via the **toolbar** from the same prior state

#### Scenario: Empty snap lines after eraser activation

- **GIVEN** `AppState.snapLines` is non-empty (any valid editor state where snap lines are present)
- **WHEN** the user presses **`E`** to switch **to** eraser from a non-eraser tool
- **THEN** `AppState.snapLines` is empty

#### Scenario: Toggle off eraser to selection preserves no stale multi-point

- **GIVEN** the user is on **eraser** with `AppState.multiElement` null
- **WHEN** the user presses **`E`** to restore the **previous** tool where that tool is **selection**
- **THEN** `AppState.multiElement` remains **null** (no resurrected in-progress stroke)
