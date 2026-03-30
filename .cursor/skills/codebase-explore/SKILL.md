---
name: codebase-explore
description: Explores unfamiliar areas of the codebase by mapping files, data flow, and cross-package dependencies. Use when the user asks to explore, investigate, or understand how a module or feature works.
---

# Codebase Explorer

## When to use

When you need to understand an unfamiliar area of the codebase.

**Triggers:** "explore", "investigate", "how does X work?", "walk through", "map".

## Inputs

- Area of interest: module, feature, path, or file pattern (from the user)

## Steps

1. **Locate scope:** Use semantic search, grep, and glob under the relevant paths. If the user attached a folder or codebase context (`@folder`, `@codebase`), prioritize that scope.
2. **Read orientation:** Check `README`, `AGENTS.md`, package docs, or top-of-file comments in the touched area.
3. **Map responsibilities:** List the key files and one line each on what they own (UI, state, IO, types, etc.).
4. **Trace data flow:** Entry point → main processing → side effects / output (props, events, actions, API calls as appropriate).
5. **Dependencies:** Note notable imports, especially across packages or layers (`packages/*`, shared libs).
6. **Summarize:** Produce the outputs below; add a short "related files" list for follow-up.

## Outputs

- **Summary:** purpose of the area, key files and roles, data flow, external/internal dependencies
- **Related files:** paths worth opening next for deeper work

## How to verify

- **Paths and symbols** cited in the summary exist: open a few referenced files and confirm imports, exports, and described behavior match (no stale or guessed APIs).
- **Data flow** matches a quick trace: follow one main path from entry (e.g. component, action, or public API) through the mentioned files.
- If something was ambiguous, the output should say so; **re-verify** after reading the suggested “related files.”
- The user (or follow-up agent) can **confirm** the summary against a known scenario or test case when available.

## Safety

- **Read-only:** Do not create, edit, or delete files during exploration unless the user explicitly asks for changes.
- **Evidence-based:** Tie claims to specific files or symbols; avoid guessing APIs or behavior not visible in code.
