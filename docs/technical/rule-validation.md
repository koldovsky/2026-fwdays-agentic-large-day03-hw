# Rule Validation

This document records A/B validation results for Cursor rules.

Purpose:
- verify that a rule actually changes agent behavior
- compare output with the rule OFF vs ON
- document whether the rule is effective, partially effective, or ineffective

---

## excalidraw-architecture.mdc

### 2026-03-27-stateful

- **Rule**: `.cursor/rules/excalidraw-architecture.mdc`
- **Scenario**: `stateful`
- **Prompt**: [`prompt.txt`](./ab-tests/excalidraw-architecture/2026-03-27-stateful/prompt.txt)
- **Result A (OFF)**: [`result-A.txt`](./ab-tests/excalidraw-architecture/2026-03-27-stateful/result-A.txt)
- **Result B (ON)**: [`result-B.txt`](./ab-tests/excalidraw-architecture/2026-03-27-stateful/result-B.txt)
- **Notes**: [`notes.md`](./ab-tests/excalidraw-architecture/2026-03-27-stateful/notes.md)
- **Verdict**: `effective`

#### Summary

With the rule ON, the model tied selection coordinates to AppState/hooks (e.g. useAppStateValue), named concrete Stats paths under packages/excalidraw, and stated actionManager.dispatch boundaries; the OFF run stayed closer to generic useState/onChange and host-level file names.

---

## docs-maintenance.mdc

### 2026-03-27-hidden-contracts

- **Rule**: `.cursor/rules/docs-maintenance.mdc`
- **Scenario**: `hidden-contracts`
- **Prompt**: [`prompt.txt`](./ab-tests/docs-maintenance/2026-03-27-hidden-contracts/prompt.txt)
- **Result A (OFF)**: [`result-A.txt`](./ab-tests/docs-maintenance/2026-03-27-hidden-contracts/result-A.txt)
- **Result B (ON)**: [`result-B.txt`](./ab-tests/docs-maintenance/2026-03-27-hidden-contracts/result-B.txt)
- **Notes**: [`notes.md`](./ab-tests/docs-maintenance/2026-03-27-hidden-contracts/notes.md)
- **Verdict**: `effective`

#### Summary

With the rule ON, the model mapped confirmed hidden contracts to specific Memory Bank and technical doc targets, required completion semantics (code/docs/gaps/uncertainty), and repeated anti-duplication rules; OFF stayed generic (architecture/contributor notes) without the repo’s maintenance policy structure.

---

## Template

### YYYY-MM-DD-scenario-name

- **Rule**: `.cursor/rules/<rule-file>.mdc`
- **Scenario**: `<scenario-name>`
- **Prompt**: [`prompt.txt`](./ab-tests/<rule-name>/<YYYY-MM-DD-scenario-name>/prompt.txt)
- **Result A (OFF)**: [`result-A.txt`](./ab-tests/<rule-name>/<YYYY-MM-DD-scenario-name>/result-A.txt)
- **Result B (ON)**: [`result-B.txt`](./ab-tests/<rule-name>/<YYYY-MM-DD-scenario-name>/result-B.txt)
- **Notes**: [`notes.md`](./ab-tests/<rule-name>/<YYYY-MM-DD-scenario-name>/notes.md)
- **Verdict**: `effective | partially effective | ineffective | pending`

#### Summary

One-paragraph summary of what changed between A and B.

#### Expected signal

What this rule is supposed to influence.

