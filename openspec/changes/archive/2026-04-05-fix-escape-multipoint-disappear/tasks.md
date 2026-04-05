## 1. Locate and fix Escape handling for multi-point linear creation

- [x] 1.1 Find the Escape key handler and generic drag-create cancel path used during `newElement` creation (e.g. cancel / soft-delete of in-progress elements).
- [x] 1.2 Identify how multi-point state is represented (`multiElement`, multi-point mode flags, linear element point counts) and where finalization runs today (Enter, pointer-up, `actionFinalize`).
- [x] 1.3 Change ordering or guards so multi-point Escape is handled first: with ≥2 committed points, finalize the element and clear creation state without running generic cancel; with 1 committed point, discard per existing spec.
- [x] 1.4 Manually verify line and arrow tools: Escape with two+ clicks keeps the curve; single-segment drag and rectangle Escape cancel still behave as before.

## 2. Automated tests in `dragCreate.test.tsx`

- [x] 2.1 Add a test: line tool, one click (first point committed), Escape — assert element is not left as a valid visible line (removed/deleted per spec).
- [x] 2.2 Add a test: line tool, two clicks (two points committed), Escape — assert line remains with `isDeleted === false` and at least two points.
- [x] 2.3 Run `yarn test:update` (or targeted tests) and fix any failures.

## 3. Verification

- [x] 3.1 Run `yarn test:typecheck` and resolve any new type errors.
- [x] 3.2 Re-read delta specs under `openspec/changes/fix-escape-multipoint-disappear/specs/` and confirm behavior matches scenarios.
