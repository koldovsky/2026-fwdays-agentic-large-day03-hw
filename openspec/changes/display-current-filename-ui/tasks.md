## 1. State and UI Contract

- [ ] 1.1 Identify and confirm the canonical app-state selector for the active document filename and fallback value.
- [ ] 1.2 Define the filename display contract (named value, fallback label, and update triggers for open/import/save-as/rename).

## 2. Header Integration

- [ ] 2.1 Add a filename display element in the existing header/top-bar structure using current styling conventions.
- [ ] 2.2 Implement responsive truncation behavior so long filenames remain visible without overlapping critical controls.
- [ ] 2.3 Ensure mobile layout keeps filename visibility while preserving access to existing primary actions.

## 3. Synchronization and Edge Cases

- [ ] 3.1 Wire filename updates to all supported document identity transitions (new/open/import/save-as/rename).
- [ ] 3.2 Ensure fallback label appears for untitled documents and transitions correctly when a name becomes available.
- [ ] 3.3 Verify browser title and visible filename behavior remain consistent where both are updated.

## 4. Validation

- [ ] 4.1 Add or update unit/integration coverage for filename rendering and lifecycle update scenarios.
- [ ] 4.2 Add responsive verification for narrow viewports to confirm truncation and non-overlap behavior.
- [ ] 4.3 Run project checks (`yarn test:update` and `yarn test:typecheck`) and fix any regressions.
