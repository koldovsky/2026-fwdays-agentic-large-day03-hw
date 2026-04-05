# A/B validation: `testing.mdc`

**Rule tested:** `.cursor/rules/testing.mdc`

Section labels match CodeRabbit `pre_merge_checks`: **Result A** = without the rule; **Result B** = with the rule applied.

## Protocol (how variants were run)

- **With rule:** `.cursor/rules/testing.mdc` enabled (default for this workspace when rules are on).
- **Without rule:** Disable the rule for a chat or project-wide, then send the **same prompt** so the model falls back to generic Jest/RTL habits.

### How to run the “without rule” variant in Cursor

1. Open **Cursor Settings → Rules** (or **Project rules** / `.cursor/rules` depending on your Cursor version).
2. **Disable** only `testing.mdc` (toggle off), or temporarily rename/move `/.cursor/rules/testing.mdc` so it is not loaded.
3. Start a **new Agent/Chat** (so prior context does not re-inject the rule text).
4. Paste the **Prompt** below and apply the generated test exactly as suggested (do not fix imports yet).
5. Run Vitest / `yarn test` and capture stdout + exit code.
6. **Re-enable** `testing.mdc` after the experiment.

Optional: compare with the frozen snippet in [`fixtures/StatsLayout-result-b.md`](fixtures/StatsLayout-result-b.md).

## Test scenario (prompt)

**"Add a colocated `StatsLayout.test.tsx` next to `StatsLayout.tsx` with one smoke test: render `StatsRow` with `columns={2}` and two child `<span>` nodes, then assert both appear in the document."**

(Targets `packages/excalidraw/components/Stats/StatsLayout.tsx`.)

---

## Result A — without the rule (rule OFF)

**Procedure:** A temporary file `StatsLayout.rule-b-experiment.test.tsx` was added next to `StatsLayout.tsx` with the **same assertions** as the passing case but with explicit Jest globals — typical “StackOverflow / Jest tutorial” output.

**Snippet + failure analysis:** [`fixtures/StatsLayout-result-b.md`](fixtures/StatsLayout-result-b.md)

| Item | Actual |
|------|--------|
| Imports | `describe`, `expect`, `it` from **`@jest/globals`**; `render`, `screen` from `@testing-library/react` |
| Command | `yarn vitest run packages/excalidraw/components/Stats/StatsLayout.rule-b-experiment.test.tsx` |
| Outcome | **Failed suite (0 tests run)** — Vite could not resolve `@jest/globals` |
| Root cause | **Jest is not a dependency** of this monorepo; Vitest does not provide `@jest/globals` |

The experiment file was **removed** after the run so the repo stays green.

---

## Result B — with the rule (rule ON)

**File in repo:** `packages/excalidraw/components/Stats/StatsLayout.test.tsx`

| Item | Actual |
|------|--------|
| Imports | `render`, `screen` from `@testing-library/react`; **`StatsRow`** from `./StatsLayout` |
| Test runner | Vitest globals (`describe` / `it`) — **no** `@jest/globals` |
| Command | `yarn test --watch=false packages/excalidraw/components/Stats/StatsLayout.test.tsx` |
| Outcome | **1 passed**, exit code **0** |
| `rg '@jest' …StatsLayout.test.tsx` | **no matches** |

Notes:

- Plain RTL `render` matches `Trans.test.tsx` / `appStateHooks.test.tsx` for UI that does **not** mount full Excalidraw.
- `tests/test-utils.ts` **`render`** is **`renderApp`** (async, waits for canvases) — wrong harness for this smoke test.

---

## Comparison

| Aspect | Result A (without rule) | Result B (with rule) |
|--------|-------------------------|----------------------|
| **CI / `yarn test`** | **Fails at transform** (`@jest/globals` unresolved) | Passes |
| **Repo alignment** | Violates `.cursor/rules/testing.mdc` (“NEVER … `@jest/globals`”) | Matches Vitest + RTL patterns |
| **RTL `render`** | Yes | Yes (same for this prompt) |
| **Lesson** | “OFF” Jest habits are **actively harmful** here — not just style | Rule keeps imports on supported APIs |

### Runner and APIs

| Aspect | Without rule | With rule |
|--------|--------------|-----------|
| Globals | `@jest/globals` → **broken** | Vitest `describe` / `it` / `expect` |
| Mock/spy (if added) | Likely `jest` / `@jest/globals` → same class of breakage | `vi` from `vitest` |

---

## How to verify (checklist)

**With rule (Result B):**

1. `yarn test --watch=false packages/excalidraw/components/Stats/StatsLayout.test.tsx`
2. `rg "from ['\"]@jest" packages/excalidraw/components/Stats/StatsLayout.test.tsx` → empty

**Without rule (Result A) — if the model emits Jest globals:**

1. Same test command → expect **resolve error** for `@jest/globals` unless someone adds Jest (out of scope for this project).
2. Grep: `rg "@jest/globals" packages/` → should stay **empty** on `master`; any hit should be reverted.

---

## Conclusion

- **With the rule** produced a **passing** Vitest test aligned with in-repo isolated-RTL patterns.
- **Without the rule** (modeled by common `@jest/globals` output) **does not run at all** in this monorepo — strong objective signal, not only taste.
- For prompts where the model stays on Vitest globals without Jest imports, the two outcomes can look similar; the recorded “without rule” path shows the **high-severity** case when the model picks Jest.

## Recorded runs summary

| Variant | Date | File | Result |
|---------|------|------|--------|
| Without rule | 2026-04-04 | `StatsLayout.rule-b-experiment.test.tsx` (removed) | Failed: cannot resolve `@jest/globals` |
| With rule | 2026-04-04 | `StatsLayout.test.tsx` | 1 passed |
