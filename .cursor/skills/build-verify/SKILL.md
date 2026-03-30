---
name: build-verify
description: Runs yarn build at the project root after code changes, fixes compilation errors without ts-ignore or test hacks, and reports status with fixes and full output. Use when the user asks to build, verify, or check compilation, or after edits that might affect compilation.
---

# Build & Verify

## When to use

After code changes that might affect compilation, or when the user asks to validate the build.

**Triggers:** "build", "verify", "check compilation", "does it compile".

## Inputs

- Changed files (from `git diff`, `git status`, or conversation)

## Steps

1. From the **project root**, run `yarn build`.
2. **If the build succeeds:** Report PASS, note relevant changed files when known, and include the **full** build output (or the full stdout/stderr from the command).
3. **If the build fails:**
   a. Parse the output — file, line, and error kind (types, imports, syntax, etc.).
   b. Open the cited file(s) at the error location(s).
   c. Fix the root cause in **source** (types, imports, exports, syntax). Do not paper over failures.
   d. Re-run `yarn build`.
   e. Repeat until PASS or **3 failed fix cycles** (count attempts after the initial run), whichever comes first.

## Outputs

- **Build status:** PASS or FAIL
- **Fixes applied:** bullet list of what changed (if any)
- **Full build output:** complete log from the **last** `yarn build` run (success or final failure)

## How to verify

- From the **repo root**, `yarn build` exits with code **0** and produces no unresolved compilation errors.
- The reported **PASS** matches the terminal: no hidden failures; if the log was truncated, re-run and confirm the same result.
- Fixes did **not** introduce `@ts-ignore`, `@ts-expect-error`, or `any` solely to silence errors (see **Safety** below).
- Optionally cross-check with **`yarn test:typecheck`** if the project uses it and the change touches TypeScript types.

## Safety

- Do **not** use `@ts-ignore`, `@ts-expect-error`, or widen types with `any` to silence errors.
- Do **not** change test files, skip tests, or weaken assertions to make the build pass — fix production code or types instead.
- After **3** unsuccessful fix-and-rebuild cycles, **stop**, report FAIL, paste the full output, and summarize blockers for the user.
