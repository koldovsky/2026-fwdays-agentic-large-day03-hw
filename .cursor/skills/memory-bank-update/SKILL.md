---
name: memory-bank-update
description: >-
  Reconciles docs/memory with the repo after substantive changes. Use when
  finishing a feature or refactor, after merging or rebasing significant work,
  when stack/tooling or architecture shifts, or when the user asks to refresh
  or sync the Memory Bank. Skips trivial/format-only edits unless requested.
---

# Memory Bank update

## Scope

Memory Bank lives in `docs/memory/`. Keep it aligned with **current** code, tooling, and product boundaries. Prefer **minimal edits**: change only files the diff actually affects.

| File | Update when… |
| --- | --- |
| `activeContext.md` | Session focus, branch/HEAD, dirty files, immediate next steps change |
| `progress.md` | Milestones, “what’s built,” blockers, or high-level status shift |
| `techContext.md` | Commands, Node/Yarn/Vite/TS versions, path aliases, dev workflow |
| `systemPatterns.md` | Layers, state model, rendering, testing strategy, CI shape |
| `projectbrief.md` | Monorepo layout, delivery shapes, or stated repo scope changes |
| `productContext.md` | User-facing behavior boundaries or journeys change |
| `decisionLog.md` | New doc/architecture **decisions**; B/C pointers if gap/hazard docs move |

Long-form detail stays in `docs/technical/` and `docs/product/`; Memory Bank **indexes and summarizes**, per `decisionLog.md` Section A conventions.

## When to update (yes)

- Behavior or public API of the editor/app changed
- New package, script, or CI step that agents must know
- Architecture or state-flow assumptions in Memory Bank are now wrong
- User explicitly asks to sync or refresh Memory Bank

## When to skip (no)

- Whitespace, rename-only, comment-only, or single-line typo fixes in unrelated areas
- Unless the user asked: do not rewrite Memory Bank “for freshness” without a concrete delta

## Workflow

1. **Infer impact** from the change (files touched, behavior, tooling).
2. **Open only** the memory files that need edits; read adjacent sections for tone and tables.
3. **Patch facts**, not essays: short bullets, consistent headings, update **Last updated** where the file uses it.
4. **Citations:** Factual claims about the repo should name paths (see `decisionLog.md` “source-verified” policy). Label inference explicitly.
5. **Active context:** If work continues elsewhere, set current focus and repo state (`branch`, notable uncommitted files) in `activeContext.md`.
6. **Do not** duplicate `AGENTS.md` / root agent guides; **cross-link** if a single sentence avoids drift.

## Checklist (copy if useful)

- [ ] Identified which `docs/memory/*.md` files are stale relative to the change
- [ ] Updated only those files; **Last updated** / tables adjusted if present
- [ ] No unnecessary rewrites of unrelated sections
- [ ] Decisions that matter long-term → short entry in `decisionLog.md` Section A (if applicable)
