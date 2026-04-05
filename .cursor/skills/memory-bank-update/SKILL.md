---
name: memory-bank-update
description: Updates the Memory Bank with recent changes, ensuring all technical details are accurate and up to date. Use when the user asks to update the memory bank, sync documentation, or refresh project context.
---

# Skill: Memory Bank Update (Excalidraw)

## When to use

After significant changes in this **Excalidraw monorepo** (`packages/excalidraw` library, `packages/*` shared packages, `excalidraw-app` host): canvas/rendering behavior, **elements** and **actions**, **UI/toolbar** features, **keyboard shortcuts** (`keyTest`, Help dialog, locales), or dependency/CI updates.

## Inputs

- What changed (git diff, conversation, or user description)
- Relevant paths: e.g. `packages/excalidraw/actions/`, `packages/excalidraw/components/`, `packages/excalidraw/locales/en.json`, `excalidraw-app/`

## Steps

1. Run `git diff --stat HEAD~5` (or similar) to see recent edits.
2. Read `docs/memory/` files that correspond to the change.
3. For each changed area, update the matching file:
   - **Canvas / element / action architecture** → `systemPatterns.md` + `decisionLog.md` if non-trivial
   - **UI / toolbar / component** → `productContext.md` + `progress.md`
   - **Canvas-specific rendering/scene** (not React panels) → `systemPatterns.md`; link `canvasArchitecture.md` only if you create/split that file
   - **Keyboard shortcut changes** → `productContext.md` or `keyboardShortcuts.md` + `decisionLog.md` (example workflow: issue [#11095](https://github.com/excalidraw/excalidraw/issues/11095) — Alt+D stroke-style cycle in `actionProperties.tsx`, HelpDialog, `en.json`, tests)
   - **Dependency / toolchain** → `techContext.md`
   - **Milestone / task wrap-up** → `progress.md` + `activeContext.md`
4. Verify every claim against the **actual** files under `packages/excalidraw`, `excalidraw-app`, and `packages/*` as appropriate.
5. Keep each Memory Bank file **under 200 lines** (same rule as `.cursor/rules/memory-bank.mdc`).

## Outputs

- List of updated `docs/memory/*.md` files
- Short summary: what changed and where in the monorepo

## Safety

- Do NOT remove manually curated content without asking
- Do NOT add speculative behavior — only what exists in code
- Do NOT exceed 200 lines per file; summarize instead
