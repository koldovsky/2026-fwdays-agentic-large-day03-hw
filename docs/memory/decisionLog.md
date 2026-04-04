# Decision Log

This file records two categories of decisions and observations:

- **Section A — Documentation decisions:** Choices made during the `day-1` documentation effort (since `b9f16d4`, 2026-03-26).
- **Section B — Code behavior: doc vs implementation gaps:** Mismatches between written documentation/comments and actual runtime behavior. → Full details in [`code-behavior-gaps.md`](../technical/code-behavior-gaps.md).
- **Section C — Code behavior: implicit invariants and refactor hazards:** Under-documented contracts that break when surrounding code is changed. → Full details in [`implicit-invariants.md`](../technical/implicit-invariants.md).

Sections B and C complement [`architecture.md`](../technical/architecture.md) (happy-path data flow). Statements are tied to the current TypeScript sources in this workspace unless noted.

---

## A. Documentation decisions (this branch)

**Homework branch note:** Branch `day-3/brainboost721` incorporated all Day 2 work in commit `0d5fed56` ("day 3 initial"). **Recorded** hashes in items 1–9 below come from an earlier branch history; they will not resolve with `git show` on this clone — treat the decision text and dates as authoritative.

### 1. Memory Bank structure and conventions

**Decision:** All reverse-engineered documentation follows a "source-verified only" policy. Every factual assertion cites specific file paths. Anything inferred but not directly proven by code is explicitly labeled as "Inferred."

**Context:** Documentation was generated from `repomix-compressed.txt` (~110K lines, committed in `785c979`) and direct source inspection. No external roadmap, issue tracker, or team input was available.

**Recorded:** 2026-03-29 (`02477fe` and subsequent commits).

---

### 2. `agent-sharp-edges.md` superseded by `decisionLog.md`

**Decision:** The standalone `docs/technical/agent-sharp-edges.md` (created in `a7e3804`) was deleted in `1a1b065`. Its content — implicit invariants and refactor hazards — was folded into this file (Section C), alongside new documentation/implementation gap analysis (Section B).

**Rationale:** A single decision log in the Memory Bank is easier to maintain and discover than a separate technical doc. The Memory Bank is the canonical place for "things that are easy to get wrong."

**Recorded:** 2026-03-29 (`1a1b065`).

---

### 3. Separate directories for different doc audiences

**Decision:** `docs/memory/` holds the Memory Bank (AI/contributor working context). `docs/product/` holds product-facing docs (`PRD.md`, `domain-glossary.md`). `docs/technical/` holds developer-facing docs (`architecture.md`, `dev-setup.md`).

**Rationale:** Different update cadences and audiences. Memory Bank files change with every work session; product and technical docs change with the codebase.

**Recorded:** 2026-03-29 (`02477fe`).

---

### 4. Root-level `decisionLog.md` redirect (superseded)

**Decision:** A one-line file at the repo root (`decisionLog.md`) pointed to `docs/memory/decisionLog.md`.

**Context:** Created in `1a1b065` as a convenience pointer. **Removed** in `649e956` (root file deleted). Canonical location remains `docs/memory/decisionLog.md`.

**Recorded:** 2026-03-29 (`1a1b065`); removal `649e956`.

---

### 5. Cursor rule: Memory Bank read/update protocol

**Decision:** Add `.cursor/rules/memory-bank.mdc` with `alwaysApply: true` so agents read `docs/memory/*` in a fixed order at task start and update `activeContext.md` / `progress.md` / `decisionLog.md` when project context changes.

**Rationale:** Reduces drift between sessions and keeps homework/repo context consistent without relying on chat history.

**Recorded:** 2026-03-29 (`649e956`).

---

### 6. Stable fragment IDs for Memory Bank deep links

**Decision:** When a subsection heading would produce an ambiguous or renderer-dependent URL fragment (for example text containing `/`), insert an explicit HTML anchor immediately before the heading — e.g. `<a id="cicd-pipeline"></a>` before `## CI/CD pipeline` in [`systemPatterns.md`](./systemPatterns.md). Consumers link with `#cicd-pipeline` (e.g. [`techContext.md`](./techContext.md)).

**Rationale:** Heading-based slugs differ across GitHub, VS Code, and other Markdown viewers; a fixed `id` keeps deep links reliable.

**Recorded:** 2026-03-30 (`34efb2b`).

---

### 7. Split Sections B/C into technical docs

**Decision:** The full-text entries for Section B (doc vs implementation gaps) and Section C (implicit invariants and refactor hazards) were extracted from this file into `docs/technical/code-behavior-gaps.md` and `docs/technical/implicit-invariants.md`, respectively. This file retains concise summaries and links.

**Rationale:** `decisionLog.md` exceeded the 200-line Memory Bank file limit. Sections B and C are developer-facing reference material with a different update cadence from the decision records in Section A; `docs/technical/` is the appropriate home.

**Recorded:** 2026-03-30 (`34efb2b`).

---

### 8. Anti-churn: Memory Bank and Cursor rule meta-edits

**Decision:** Extend `.cursor/rules/memory-bank.mdc` with (1) an explicit note that the Memory Bank reading list does not include this rule file, so there is no circular read dependency, and (2) a **single-pass** policy for tasks that only edit `docs/memory/*` and/or the rule: one `activeContext.md` update at the end, no repeated “context changed” loops, and `progress.md` / `decisionLog.md` only when something material changed (including a protocol change to the rule itself, recorded once in Section A).

**Rationale:** With `alwaysApply: true`, the rule and Memory Bank files that describe the rule are often in scope together. Without a stop condition, agents can over-update `activeContext.md`, `progress.md`, and `decisionLog.md` for bookkeeping that does not add new project context.

**Recorded:** 2026-03-30 (`34efb2b`).

---

### 9. Layering bullets must match `packages/*/package.json`

**Decision:** The "Layering pattern" bullets in [`systemPatterns.md`](./systemPatterns.md) describe internal and external dependencies. They must be checked against each package’s `package.json` — not inferred from import usage alone.

**Context:** `packages/utils` was documented as depending on `common`; `packages/utils/package.json` declares no `@excalidraw/common` (only external npm deps such as `@braintree/sanitize-url`, `@excalidraw/laser-pointer`, `browser-fs-access`, `roughjs`, `pako`, `perfect-freehand`, PNG chunk packages). The Memory Bank line was corrected to match.

**Follow-up:** [`architecture.md`](../technical/architecture.md) “Dependency graph (packages only, from declared `dependencies`)” still draws `utils --> common`; remove that edge when editing that diagram so it matches `packages/utils/package.json`.

**Recorded:** 2026-03-30 (`06d3176`).

---

### 10. Cursor agent assets: rules, skills, commands; retire `memory-bank.mdc` and `CLAUDE.md`

**Decision:** Expand **`.cursor/`** for agents: add topic **`.cursor/rules/*.mdc`** (`architecture`, `conventions`, `do-not-touch`, `lower-layers`, `security`, `testing`), **`.cursor/skills/*/SKILL.md`** (including `memory-bank-update`, `build-verify`, `codebase-explore`), and **`.cursor/commands/*.md`**. Refresh root **`AGENTS.md`** as the single canonical onboarding doc. **Remove** **`.cursor/rules/memory-bank.mdc`** (previously `alwaysApply: true`) and root **`CLAUDE.md`**.

**Context:** Prior Memory Bank read/update and anti-churn behavior lived in `memory-bank.mdc` (§§5 and 8). That enforcement path is gone; the **intent** — keep `docs/memory/` accurate and avoid meta-edit loops — is carried by [`.cursor/skills/memory-bank-update/SKILL.md`](../../.cursor/skills/memory-bank-update/SKILL.md) and cross-links from `AGENTS.md`.

**Recorded:** 2026-04-01 (bundled into `0d5fed56` "day 3 initial" on `day-3/brainboost721`).

---

### 11. Security rule: actionable URL validation for new `fetch` endpoints

**Decision:** Extend [`.cursor/rules/security.mdc`](../../.cursor/rules/security.mdc) with an explicit requirement that **new fetch endpoints** validate URLs using `new URL()` and protocol checks (`https:` in production; `http:` allowed in dev only), and broaden the **NEVER** clause so `fetch` to **any** URL without protocol/origin validation is disallowed (not only URLs derived from raw `location` / `document`).

**Context:** Makes agent-facing security guidance actionable; methodology and scored outcomes are recorded in [`docs/ab-validation.md`](../ab-validation.md).

**Recorded:** 2026-04-02.

---

### 12. Spec-Driven Development workflow with `openspec/`

**Decision:** Introduce an `openspec/` directory at repo root for Spec-Driven Development (SDD) artifacts. Each change gets a subdirectory under `openspec/changes/<change-slug>/` containing `proposal.md`, `design.md`, `tasks.md`, and per-capability specs under `specs/<capability>/spec.md`.

**Context:** Day 3 homework requires writing specs before implementation. The first SDD change is `add-hex-color-validation-feedback` (excalidraw#9527). Specs capture problem statement, scope, blast radius, risks, design decisions, and detailed component-level behavior before code is written.

**Recorded:** 2026-04-04 (`f58538af` on `day-3/brainboost721`).

---

### 13. Hex color validation feedback in ColorInput

**Decision:** Add visual and accessible validation feedback to the `ColorInput` hex code field. On blur, if the typed value does not resolve via `normalizeInputColor`, show a red border (`.is-invalid`) and an inline error message (`colorPicker.invalidColor` i18n key) with `role="alert"`, `aria-invalid`, and `aria-describedby`. Error clears when a valid color is entered or when the color prop changes externally.

**Context:** Addresses [excalidraw#9527](https://github.com/excalidraw/excalidraw/issues/9527) — previously invalid input was silently ignored. Change is leaf-level (one component, styles, locales, tests); no global state, API, or do-not-touch files affected. Design documented in `openspec/changes/add-hex-color-validation-feedback/`.

**Recorded:** 2026-04-04 (`3a942d20` on `day-3/brainboost721`).

---

## B. Code behavior: documentation vs implementation gaps

> Full details with code references: [`code-behavior-gaps.md`](../technical/code-behavior-gaps.md)

| # | Topic | Key mismatch |
| --- | --- | --- |
| 1 | `updateScene` / `captureUpdate` | JSDoc `@default EVENTUALLY` but omitting the option means "no capture," not `EVENTUALLY` |
| 2 | `syncActionResult` / `setState` | Branch also fires when `this.state.contextMenu` is truthy, not just `actionResult.appState` |
| 3 | `updateFrameRendering` | Four independent flags; comment implies a single "disable rendering + clipping" switch |
| 4 | `syncActionResult` / files-only | Files-only updates skip `didUpdate` and fall through to `triggerUpdate()` — not truly "nothing changed" |
| 5 | `restore` / `deleteInvisibleElements` | Silently sets `isDeleted: true` and bumps version; may conflict with collab delta expectations |

---

## C. Code behavior: implicit invariants and refactor hazards

> Full details with code references: [`implicit-invariants.md`](../technical/implicit-invariants.md)

| Topic | Risk summary |
| --- | --- |
| Scene updates / full `App` render | `triggerUpdate` → `setState({})` drives render; bypassing it leaves stale memoized state |
| `componentDidUpdate` ordering | `_initialized` gate → `flush` → `commit` → `onChange`; reordering breaks history/observers |
| Pointer / touch / double-click | Manual state machine with `lastPointerUpIsDoubleClick`; consolidating handlers breaks mobile |
| `Excalidraw` wrapper / `React.memo` | FIXME: unstable defaults defeat memo comparator |
| Mobile linear-element handles | HACK disables transform handles on mobile; "fixing" parity re-enables broken UX |
| `Store.scheduleCapture` / undo | Called in many places (TODO: error-prone); new paths must follow same capture conventions |
| `Scene.mutateElement` / batching | Must run in React event handler or `unstable_batchedUpdates`; async calls cause extra renders |
| Comment inventory (high-signal) | `HACK`, `FIXME`, `TODO` clusters — see [`implicit-invariants.md`](../technical/implicit-invariants.md#comment-inventory-high-signal) for table |

---

## Related documentation

- [`architecture.md`](../technical/architecture.md) — end-to-end editor architecture and file index.
- [`code-behavior-gaps.md`](../technical/code-behavior-gaps.md) — full Section B entries.
- [`implicit-invariants.md`](../technical/implicit-invariants.md) — full Section C entries.
- [`systemPatterns.md`](./systemPatterns.md) — monorepo and composition patterns at a glance.

_Last updated: 2026-04-04 — Section A §§12–13 added for Day 3 SDD workflow and hex color validation; HEAD `3a942d20` on `day-3/brainboost721`._
