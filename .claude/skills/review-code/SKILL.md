---
name: review-code
description: Reviews code changes for bugs, security issues, convention violations, and adherence to project rules. Use when the user asks to review code, review a PR, check changes, or before committing.
---

# Skill: Review Code

## When to use

Before committing or when the user asks to review changes.
Triggered by: "review", "review code", "check my changes", "review PR".

## Inputs

- Changed files (from `git diff` or specific file paths provided by the user)

## Steps

1. Get the diff:
   - Run `git diff` for unstaged changes
   - Run `git diff --cached` for staged changes
   - If a branch is specified, run `git diff <base>...HEAD`

2. For each changed file, check against project rules:
   a. **Architecture** (`.cursor/rules/architecture.mdc`):
      - State updates use actionManager — not Redux/Zustand/MobX
      - No react-konva, fabric.js, pixi.js for rendering
      - No new npm packages without approval
   b. **Conventions** (`.cursor/rules/conventions.mdc`):
      - Functional components + hooks only, no class components
      - Props interface named `{ComponentName}Props`
      - Named exports only, no default exports
      - Strict TypeScript — no `any`, no `@ts-ignore`
      - `import type` for type-only imports
      - kebab-case files, PascalCase components
   c. **Security** (`.cursor/rules/security.mdc`):
      - No `dangerouslySetInnerHTML` without sanitization
      - No `eval()` or `Function()` on user data
      - URL construction uses `URL` constructor with protocol validation
      - No prototype pollution via unchecked user-keyed indexing
   d. **Protected files** (`.cursor/rules/do-not-touch.mdc`):
      - Warn if changes touch `renderer.ts`, `restore.ts`, `manager.ts`, or `types.ts`
   e. **Math purity** (`.cursor/rules/math-purity.mdc`):
      - Functions in `packages/math/` are pure, no side effects, no external deps
   f. **Testing** (`.cursor/rules/testing.mdc`):
      - Tests use existing helpers (API, Keyboard, Pointer, UI)
      - No `it.skip`/`describe.skip` without explanation
      - No timing-based waits

3. Check for common issues:
   - Unused imports or variables
   - Missing error handling at system boundaries
   - Hardcoded strings that should use `t()` for i18n
   - Performance concerns (missing memoization in components receiving frequent updates)
   - Console.log or debugging artifacts left in

4. Compile findings into a structured report

## Outputs

Report with sections:

```
## Review Summary
- Files reviewed: N
- Issues found: N (X critical, Y warnings, Z suggestions)

## Critical Issues
- [file:line] Description — why it matters

## Warnings
- [file:line] Description — rule reference

## Suggestions
- [file:line] Description — improvement opportunity

## Protected File Alerts
- List any protected files that were modified

## Verdict
APPROVE / REQUEST CHANGES — with summary
```

## Safety

- This skill is read-only — it NEVER modifies files
- It reports findings for the user to act on
- If no issues found, report a clean review with APPROVE verdict
