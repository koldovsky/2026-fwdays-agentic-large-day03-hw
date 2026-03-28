## 1. App State And Data Flow

- [x] 1.1 Add a persisted canvas background pattern field and default value to the relevant app state, restore, and serialization code paths.
- [x] 1.2 Thread the new background pattern through clear-canvas and any app-state helpers that currently preserve canvas background settings.

## 2. UI And Rendering

- [x] 2.1 Extend the existing canvas background controls to let users choose between no pattern and squared paper under the current background-editing permission gate.
- [x] 2.2 Implement squared paper background rendering in the static scene pipeline so it appears in the editor independently from the snapping grid overlay.
- [x] 2.3 Update export rendering to include the squared paper background only when background export is enabled.

## 3. Verification

- [x] 3.1 Add or update tests for app state restore/round-trip behavior of the background pattern field.
- [x] 3.2 Add or update UI and export-focused tests covering squared paper selection, independence from grid mode, and export-background gating.
- [x] 3.3 Run the project verification workflow relevant to the touched areas and resolve any regressions.