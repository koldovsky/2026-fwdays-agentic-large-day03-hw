## 1. Root cause and App handlers

- [x] 1.1 Trace Escape and pointer-up paths for multi-point linear drawing in `App.tsx` (`onKeyDownFromPointerDownHandler`, `onPointerUpFromPointerDownHandler`) and confirm when cancel-remove vs `actionFinalize` runs.
- [x] 1.2 Adjust guards so multi-point mode (or linear elements with multiple committed points) never takes the single-segment cancel path; only finalize or valid single-point cleanup per spec.
- [x] 1.3 Add or tighten an early exit on pointer-up when `newElement` and `multiElement` are already cleared after finalize-on-Escape.
- [x] 1.4 Review `actionFinalize` / `isInvisiblySmallElement` interaction for multi-point Escape; fix only if needed for incorrect deletion.

## 2. Regression tests (`dragCreate.test.tsx`)

- [x] 2.1 Add an explicit test for **Escape after only one committed point** on a line (one click, then Escape) asserting removal or deleted state per `openspec/specs/escape-multipoint-finalize/spec.md`.
- [x] 2.2 Add or reinforce tests for **2+ committed points** + Escape (pointer up and, if feasible, pointer down) so the element stays finalized and visible.
- [x] 2.3 Run `yarn test:update` and fix failures until green.
