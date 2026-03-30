---
name: memory-bank-update
description: Updates the Memory Bank with recent changes, ensuring all technical details are accurate and up to date. Use when the user asks to update the memory bank, sync documentation, or refresh project context.
---

# Skill: Memory Bank Update

## When to use

After significant code changes in this **Excalidraw** monorepo: new features, refactors, architecture changes, dependency updates, or completed milestones.

Triggered by: "update memory bank", "sync docs", "refresh project docs".

**Change triggers (examples)** — Treat as a signal to review/update the Memory Bank when diffs touch:

- `packages/excalidraw/**` — editor library behavior, public surface, or internals
- `excalidraw-app/**` — product shell, hosting, collaboration UI
- `packages/*` (shared packages) — cross-cutting types, math, elements, utils
- `**/src/components/**` when present (e.g. `dev-docs/src/components/**`) — ancillary site/docs UI tied to the project
- Public API churn — imports from `"excalidraw"` / `"excalidraw/*"` in examples or docs; package `exports` / entry re-exports

## Inputs

- What changed (from git diff, conversation, or user description)

## Steps

1. Run `git diff --stat HEAD~5` to identify recent changes. If `HEAD~5` is invalid (few commits), use `git diff --stat` against the merge base or last tag, or `git log -5 --oneline` plus scoped `git diff`. Weight paths under `packages/excalidraw/`, `excalidraw-app/`, and `packages/*` heavily; if the diff is mostly `.cursor/` or docs-only, still update Memory Bank only when it reflects a **material** product/engineering change (not typo-only churn).
2. Read relevant Memory Bank files in `docs/memory/`. For file roles, see [`docs/memory/README.md`](../../../docs/memory/README.md).
3. For each changed area, map updates using these **triggers → files** (combine when multiple apply):
   - **UI/UX or a specific component/flow** → `progress.md` + `activeContext.md`
   - **Architecture, state flow, or patterns** (e.g. actions/render pipeline boundaries, monorepo boundaries) → `systemPatterns.md` + `decisionLog.md`
   - **Dependencies, build, toolchain, CI** → `techContext.md`
   - **Scope, product goals, user-facing intent** → `projectbrief.md` + `productContext.md`
   Before writing, **confirm relevance**: grep or read call sites for **public API** imports (`from "excalidraw"`, `from "excalidraw/..."`); if the change affects published behavior, skim `CHANGELOG.md` / package changelog (if present) so Memory Bank notes match what consumers would see.
4. Verify updated content against actual source code (read files, grep, or run commands as needed).
5. Ensure each updated file stays under **200 lines** — summarize or split pointers to other docs if needed.

## Outputs

- List of updated Memory Bank files
- Summary of what changed and why

## Safety

- Do NOT remove manually curated content without asking
- Do NOT add speculative information — only verified facts
- Do NOT exceed 200 lines per file — summarize if needed
- Verify ALL technical claims against actual code
