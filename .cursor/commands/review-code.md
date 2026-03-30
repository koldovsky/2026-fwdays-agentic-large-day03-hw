---
description: Review uncommitted and staged changes (git diff) before commit
---

# Code review — uncommitted changes

Perform a **focused code review** of everything that is **not yet committed**: working tree + staged files.

## 1. Gather the diff

Run from the repository root (use the project’s shell):

```bash
git status
git diff
git diff --cached
```

If only specific paths matter, the user may narrow scope; otherwise review **all** uncommitted hunks.

Treat **binary-only** or **generated** noise briefly (mention if huge lockfiles were touched without need).

## 2. What to check

- **Correctness:** logic bugs, edge cases, off-by-one, async/race issues, error paths.
- **Consistency:** match existing patterns in touched files; respect `AGENTS.md` and `.cursor/rules/conventions.mdc` where applicable.
- **Scope:** no unrelated refactors or drive-by edits unless the diff clearly requires them.
- **Types:** no new `any` or `@ts-ignore` without strong justification.
- **Security:** apply the **security-common-vulnerabilities** skill when reviewing URLs, HTML/DOM, storage, env/secrets, or user-controlled input.
- **Protected files:** if the diff touches `packages/excalidraw/scene/Renderer.ts`, `packages/excalidraw/data/restore.ts`, `packages/excalidraw/actions/manager.tsx`, or `packages/excalidraw/types.ts`, flag that these need extra scrutiny and full test runs per project rules.

## 3. Output format

Respond in **English** (or the user’s language if they explicitly asked for another language in this session).

Use this structure:

1. **Summary** — one short paragraph: intent of the change and overall quality.
2. **Blockers (must fix)** — numbered list, or “None”.
3. **Suggestions (should / could)** — numbered list, or “None”.
4. **Nits (optional)** — brief list, or omit.
5. **Testing** — what to run or manually verify (e.g. `yarn test:typecheck`, relevant feature area).

Be **specific**: cite **file paths** and, when helpful, **symbols or line-level behavior** (no need to paste the entire diff if it is already in context).

## 4. If there are no changes

If `git status` is clean, say so and suggest what to review instead (e.g. last commit or a branch diff).
