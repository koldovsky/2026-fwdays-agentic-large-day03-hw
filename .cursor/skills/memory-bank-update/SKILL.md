---
name: memory-bank-update
description: >-
  Updates the Memory Bank under docs/memory/ so technical details stay accurate. Use when the user asks to update the
  memory bank, sync documentation, or refresh project context; or after significant code changes (features, refactors,
  architecture, dependencies, milestones).
---

# Memory Bank update

## When to use

After significant code changes: new features, refactors, architecture changes, dependency updates, or completed milestones. Also when the user says: **update memory bank**, **sync docs**, **refresh project docs**.

## Inputs

- What changed: from `git diff`, conversation, or the user’s description.

## Steps

1. Run `git diff --stat HEAD~5` (or a wider range if needed) to see recent changes.
2. Read the relevant files in `docs/memory/`.
3. For each affected area, update the matching file(s):
   - New feature → `progress.md` + `activeContext.md`
   - Architecture change → `systemPatterns.md` + `decisionLog.md`
   - Dependency change → `techContext.md`
   - Scope change → `projectbrief.md` + `productContext.md`
4. Verify every updated statement against actual source (or other authoritative project artifacts).
5. Keep **each** Memory Bank file **under 200 lines** — compress or summarize if needed.

## Outputs

- List of Memory Bank files touched.
- Short summary of what changed in the docs and why.

## Safety

- Do **not** delete or overwrite manually curated content without asking the user.
- Do **not** add guesses or speculation — only verified facts.
- Do **not** exceed 200 lines per file — summarize instead.
- Verify **all** technical claims against the codebase (or cited config/docs).
