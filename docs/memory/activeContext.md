# Active Context

## Last updated

2026-04-02 — branch `day-2/brainboost721`. Day 2: `docs/ab-validation.md` records A/B validation of `.cursor/rules/security.mdc` (see `decisionLog.md` §11). `git status` for dirty paths.

## Current focus

- **Day 2** homework on `day-2/brainboost721`. Excalidraw app/library source unchanged; work focuses on **documentation, Cursor rules, agent guidance, and repomix tooling**. Deliverable: [`docs/ab-validation.md`](../ab-validation.md) (A/B test write-up for `security.mdc`).
- **`AGENTS.md`** at repo root — canonical agent onboarding: overview, stack, structure, commands, architecture (dual state, canvas, ActionManager), conventions, do-not-touch table, and links to Memory Bank ([`techContext.md`](./techContext.md), [`systemPatterns.md`](./systemPatterns.md)). Detailed conventions and guardrails also live in **`.cursor/rules/*.mdc`** (architecture, conventions, do-not-touch, lower-layers, security, testing). **`.cursor/skills/`** holds repeatable workflows (`build-verify`, `codebase-explore`, `memory-bank-update`, `repomix-reference`); **`.cursor/commands/`** holds slash-style command templates (`create-component`, `review-code`). Root **`CLAUDE.md`** and **`.cursor/rules/memory-bank.mdc`** were removed when agent assets were consolidated (commit `1381548` on this branch).
- The Memory Bank (`docs/memory/`) is the working context for agents; product and technical docs live in [`docs/product/`](../product/) and [`docs/technical/`](../technical/).
- Use [`decisionLog.md`](./decisionLog.md) for documentation decisions, doc-vs-code gaps (Section B), and refactor hazards (Section C). Full B/C detail: [`code-behavior-gaps.md`](../technical/code-behavior-gaps.md), [`implicit-invariants.md`](../technical/implicit-invariants.md).
- **Stable deep link:** `docs/memory/systemPatterns.md` defines `<a id="cicd-pipeline"></a>` before the CI/CD table so `techContext.md` can link `./systemPatterns.md#cicd-pipeline` reliably.

## Recent commits (this repo — `git log`)

History on this homework branch is a **short linear log** (squashed vs. older granular homework commits). Inspect with `git show <hash>`.

| Commit    | Date (author) | What changed                                                                 |
| --------- | ------------- | ---------------------------------------------------------------------------- |
| `21bf0a6` | 2026-03-26    | Initial                                                                      |
| `70259e8` | 2026-03-26    | checker                                                                      |
| `d69f395` | 2026-03-31    | day 2 init — Memory Bank, product/technical docs, ignore/repomix tooling, `repomix-compressed.txt` baseline |
| `1381548` | 2026-04-01    | add `AGENTS.md`, expand `.cursor/rules`, skills (incl. `repomix-reference`), commands; remove `CLAUDE.md` and `memory-bank.mdc` |

## Repository state

- Branch: **`day-2/brainboost721`**. HEAD: **`1381548`**.
- Compare with `origin/day-2/brainboost721` after fetch; local branch may be ahead or behind.
- Working tree **dirty** when this file lists pending Memory Bank commits — `git status` for exact paths.

## Decisions captured in the doc set

- **Source-verified assertions** in Memory Bank and technical docs cite repo paths; inferences are labeled where used.
- **Layouts:** `docs/memory/` (session/context), `docs/product/` (PRD, glossary), `docs/technical/` (architecture, dev setup, B/C technical splits).
- **Canonical decision log:** `docs/memory/decisionLog.md` (not a root-level redirect).
- **Cursor:** topic rules under `.cursor/rules/*.mdc` (see [`decisionLog.md`](./decisionLog.md) §10). Memory Bank sync workflow: [`.cursor/skills/memory-bank-update/SKILL.md`](../../.cursor/skills/memory-bank-update/SKILL.md).

## Blockers & risks

- Documentation may drift from upstream Excalidraw if the subtree is updated without refreshing docs.
- Collaboration locally still needs env configuration (see `docs/technical/dev-setup.md`).

## Next steps

1. Finish **day 2** assignment tasks; update this file and `progress.md` when focus or scope changes.
2. Regenerate and commit `repomix-compressed.txt` when the export should match HEAD.

## Open questions

- None recorded.
