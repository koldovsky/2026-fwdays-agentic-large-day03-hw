# Review code

You are doing a **structured code review** of the current change set (or the files/context the user points to). Do **not** rewrite working code unless you find a concrete defect or policy violation.

## What to do

1. **Scope**: Identify which files/commits/PR slice to review. If unclear, ask once or infer from open editors and git diff.
2. **Check against project rules** (`.cursor/rules/`): architecture (actionManager / `AppState`, canvas pipeline), protected files, conventions, testing (Vitest only), security, MemoryBank updates if the change was substantive.
3. **Review for**:
   - Correctness risks (edge cases, lifecycle, async, null handling)
   - Maintainability (naming, duplication, dead code, API boundaries between `excalidraw-app/` and `packages/*`)
   - Performance hotspots only when justified (avoid nitpicking micro-optimizations)
   - Tests: coverage of behavior changed; no Jest APIs; stable patterns from `packages/excalidraw/tests/test-utils.ts`
4. **Output format**:
   - Short **summary** (must-fix vs nice-to-have)
   - **Findings** as a numbered list with severity: `blocker` / `major` / `minor` / `question`
   - For each finding: **location** (file path + symbol or line range if known), **issue**, **suggested fix** (concise)

## How to verify

1. Re-read your review: every **blocker** and **major** maps to a specific line/area and a actionable fix or test.
2. If the change touches tests, sanity-check that `yarn test --watch=false` would be the right next step for the author (you may run it yourself if in agent mode).
3. If the change touches types or many packages, note `yarn test:typecheck` as the author's verification step.
4. Confirm you did not recommend modifying `packages/excalidraw/scene/renderer.ts`, `packages/excalidraw/data/restore.ts`, `packages/excalidraw/actions/manager.ts`, or `packages/excalidraw/types.ts` without explicit approval (see `do-not-touch` rule).
