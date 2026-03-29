---
name: build-verify
description: Runs yarn build at the project root after code changes, fixes compilation errors without ts-ignore or test hacks, and reports status with fixes and full output. Use when the user asks to build, verify, or check compilation, or after edits that might affect compilation.
---

# Skill: Build & Verify

## When to use

After making code changes that might affect compilation.
Triggered by: "build", "verify", "check compilation".

## Inputs

- Changed files (from git diff or conversation context)

## Steps

1. Run `yarn build` in the project root
2. If build succeeds → report success, list changed files
3. If build fails (each pass through these sub-steps counts as one **attempt** toward max **3**; log attempt `N/3` each time):
   a. Read error output — identify file, line, error type.
   b. **Protected paths** — Before editing, decide if the error’s file path is protected. Protected if **either**:
      - The path is under `.cursor/skills/` (any file in that tree), **or**
      - It matches do-not-touch in `.cursor/rules/do-not-touch.mdc` / `AGENTS.md`: `packages/excalidraw/scene/renderer.ts`, `packages/excalidraw/data/restore.ts`, `packages/excalidraw/actions/manager.ts`, `packages/excalidraw/types.ts`.
   c. Open the file at the error line when you need context to fix or to verify the location; **do not write** to a protected path until the gate in (d) allows it.
   d. **Fix gate** — If the error location is in a **protected** file:
      - Do **not** apply edits until the user **explicitly confirms** in chat that changing that path is allowed for this build fix.
      - Without confirmation: **skip**; log `SKIP (protected, no user confirmation): <path> — <error summary>` (no edit).
      - With confirmation: fix; log `APPLY (protected, user confirmed): <path>`.
   e. If the path is **not** protected: fix (type error, missing import, syntax); log `FIX: <path> — <short description>`.
   f. **Re-run** — If you made **at least one** edit this attempt, run `yarn build` again. If **every** error you addressed this attempt was **skipped** (protected, no confirmation), **do not** re-run just to repeat the same failure; log that the build remains blocked, list skipped paths, and ask the user to confirm edits on protected files or fix manually—still count this as attempt `N/3`.
   g. After each attempt, summarize: fixes applied, skips (with reasons), and whether you re-ran the build.
   h. Repeat from (a) until the build passes or you exhaust 3 attempts.

## Outputs

- Build status: PASS / FAIL
- List of fixes applied (if any)
- Full build output

## Safety

- Do NOT fix errors by adding `@ts-ignore` or `any`
- Do NOT modify test files to fix build errors
- Do NOT edit protected paths without explicit user confirmation; always log skips vs applies
- If 3 attempts fail — stop and report to user
