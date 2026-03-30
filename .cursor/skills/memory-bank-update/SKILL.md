---
name: memory-bank-update
description: Updates the Memory Bank with recent changes, ensuring all technical details are accurate and up to date. Use when the user asks to update the memory bank, sync documentation, or refresh project context.
---

# Memory Bank Update

## When to use

After significant code changes: new features, refactors, architecture changes, dependency updates, or completed milestones.

**Triggers:** "update memory bank", "sync docs", "refresh project docs".

## Inputs

- What changed (from `git diff`, conversation, or user description)

## Steps

1. Run `git diff --stat HEAD~5` to identify recent changes (adjust range if the user specifies a branch or commit).
2. Read relevant Memory Bank files under `docs/memory/`.
3. For each changed area, update the matching file:
   - **New feature** → `progress.md` + `activeContext.md`
   - **Architecture change** → `systemPatterns.md` + `decisionLog.md`
   - **Dependency change** → `techContext.md`
   - **Scope change** → `projectbrief.md` + `productContext.md`
4. Verify updated content against actual source code (open files, grep, or read implementations — do not rely on assumptions).
5. Keep each Memory Bank file **under 200 lines**; summarize or split content if needed.

## Outputs

- List of updated Memory Bank files
- Short summary of what changed and why

## How to verify

- Open each **updated** `docs/memory/*.md` file and confirm claims match **`git diff`**, `AGENTS.md`, or source under `packages/` / `excalidraw-app/` (grep or read implementations).
- Each touched file stays **≤ 200 lines**; split or summarize if over limit.
- No **speculative** bullets: every technical statement should be traceable to code, config, or an explicit user note.
- Run **`git status`** to ensure only intended Memory Bank (and related) files changed; no accidental deletion of curated sections.
- Optional: ask the user to **spot-check** `activeContext.md` / `progress.md` for alignment with current work.

## Safety

- Do **not** remove manually curated content without asking the user.
- Do **not** add speculative information — only verified facts from code, config, or the user.
- Do **not** exceed 200 lines per file — summarize if needed.
- Verify **all** technical claims against actual code or authoritative project files.
