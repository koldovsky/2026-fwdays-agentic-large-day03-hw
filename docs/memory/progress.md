# Progress

## Last updated

2026-04-02 — branch `day-2/brainboost721`. After Memory Bank sync: see `git status` for dirty paths.

## Overall status

Homework branch **`day-2/brainboost721`**: Excalidraw **app and package source** are the upstream baseline (not modified for homework). **`d69f395` (*day 2 init*)** introduced documentation, the Memory Bank, repomix-related files, and earlier Cursor layout. **`1381548`** expanded Cursor agent support (rules, skills, commands) and consolidated root agent docs into `AGENTS.md`. Git history here is a **short squash-style log**; use `git log` and file contents as the source of truth.

## What has been built

### Tooling and export

- `.cursorignore`, `.repomixignore`, `.gitignore` — limit indexing / packing noise; repomix output paths ignored as configured.
- `repomix-compressed.txt` — large compressed codebase export (~110K+ lines) for documentation and AI context; **matches HEAD** until you regenerate the pack (then commit if it should stay in sync).

### Memory Bank — `docs/memory/`

| File              | Note                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `projectbrief.md` | Monorepo scope, delivery shapes, layout                              |
| `systemPatterns.md` | Architecture, layering, state, tests, errors, CI/CD; `#cicd-pipeline` anchor |
| `techContext.md`  | Tooling, commands, path aliases                                      |
| `productContext.md` | Users, journeys, product boundaries                                |
| `decisionLog.md`  | Doc decisions (A); B/C indexes + links to technical files            |
| `activeContext.md` | Session focus, repo state, next steps                               |
| `progress.md`     | This file                                                            |

### Product docs — `docs/product/`

| File                 | Description                          |
| -------------------- | ------------------------------------ |
| `domain-glossary.md` | Canonical terminology              |
| `PRD.md`             | Reverse-engineered product requirements |

### Technical docs — `docs/technical/`

| File                    | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `architecture.md`       | Editor data flow, ownership, file index            |
| `dev-setup.md`          | Environment, commands, troubleshooting             |
| `code-behavior-gaps.md` | Section B detail — doc vs implementation         |
| `implicit-invariants.md` | Section C detail — invariants, hazards, comments |

### Day 2 homework artifacts (`docs/`)

| File               | Description |
| ------------------ | ----------- |
| `ab-validation.md` | A/B validation of `.cursor/rules/security.mdc` (prompt, scorecard, rule OFF vs ON, conclusion). CodeRabbit reviews it via `.coderabbit.yaml` (`path: docs/ab-validation.md`). |

### Agent guidance (repo root and `.cursor/`)

- `AGENTS.md` — canonical AI-agent onboarding: overview, stack, layout, commands, architecture summary, conventions, do-not-touch table, constraints; links into `docs/memory/`.
- `.cursor/rules/*.mdc` — topic rules: `architecture`, `conventions`, `do-not-touch`, `lower-layers`, `security`, `testing` (no longer a single always-apply `memory-bank.mdc`; see `decisionLog.md` §10). **`security.mdc`** includes explicit new-`fetch` URL validation (`new URL()`, protocol `https:` / `http:` in dev only) and a broader NEVER clause for unvalidated `fetch` targets — see `decisionLog.md` §11.
- `.cursor/skills/*/SKILL.md` — repeatable workflows (`build-verify`, `codebase-explore`, `memory-bank-update`, `repomix-reference`).
- `.cursor/commands/*.md` — command templates (e.g. `create-component`, `review-code`).

### Removed / not in tree

- `docs/technical/agent-sharp-edges.md` — superseded by `decisionLog.md` and the B/C technical files (content lives there conceptually).
- `CLAUDE.md` — removed in `1381548`; use `AGENTS.md` and `.cursor/` assets instead.
- `.cursor/rules/memory-bank.mdc` — removed in `1381548`; Memory Bank update workflow: `.cursor/skills/memory-bank-update/SKILL.md` (see `decisionLog.md` §10).

## What works (application baseline — unchanged)

Inherited from upstream Excalidraw:

- Full editor canvas and tools; embeddable `@excalidraw/excalidraw` API.
- Hosted app: collab (`excalidraw-app/collab/`), share flows, PWA, local-first recovery.
- Localization, export formats, tests and CI as in upstream.

## Known issues

- **Firebase / collab env:** Not in repo; see `docs/technical/dev-setup.md`.
- **`architecture.md` dependency diagram:** `decisionLog.md` Section A notes a possible mismatch: diagram may still show `utils → common` while `packages/utils/package.json` has no `@excalidraw/common` — verify when editing architecture docs.
- **Repomix drift:** Regenerate and commit `repomix-compressed.txt` when documentation should reflect the latest packed tree.

## Resolved / stable in current tree

- Memory Bank describes `packages/utils` layering consistently with `packages/utils/package.json` in `systemPatterns.md` (verify after any package.json edits).
- Prettier on docs: if `yarn test:other` fails, run `yarn fix:other` per `docs/technical/dev-setup.md`.

## What's left

1. Complete day-2 homework goals; refresh `activeContext.md` / this file when milestones change.
2. Regenerate and commit `repomix-compressed.txt` when the export should match HEAD.

## Commit log (this clone, oldest first)

| Commit    | Date       | Description   |
| --------- | ---------- | ------------- |
| `21bf0a6` | 2026-03-26 | Initial       |
| `70259e8` | 2026-03-26 | checker       |
| `d69f395` | 2026-03-31 | day 2 init    |
| `1381548` | 2026-04-01 | add AGENTS.md, rules, skills, commands |
