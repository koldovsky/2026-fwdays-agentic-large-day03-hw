# Memory Bank (`docs/memory`)

This folder holds the **Memory Bank**: durable, human- and agent-oriented context about the project so work can continue without re-deriving facts from the whole codebase.

## Keep the Memory Bank current

**After each material project change**, update the relevant files here. That includes:

- Features and behavior changes
- Bug fixes that affect architecture, setup, or known limitations
- Refactors that move responsibilities or change patterns
- Documentation elsewhere that should be reflected in “living” context (or add a pointer here)

If nothing in a given file applies, you can skip that file—but **always consider** whether `activeContext.md` and `progress.md` still describe reality.

## Files and roles

| File | Purpose |
|------|---------|
| [`projectbrief.md`](./projectbrief.md) | What the project is, scope, repo structure at a glance. |
| [`activeContext.md`](./activeContext.md) | Current focus, immediate goals, where to look in code. |
| [`progress.md`](./progress.md) | Status of work, checklists, notable verification. |
| [`decisionLog.md`](./decisionLog.md) | Decisions, alternatives rejected, rationale. |
| [`techContext.md`](./techContext.md) | Stack, tooling, versions, commands, constraints. |
| [`systemPatterns.md`](./systemPatterns.md) | Architecture patterns, layers, key flows. |
| [`productContext.md`](./productContext.md) | Product/UX goals and scenarios tied to the app. |

Related docs outside this folder: [`docs/technical/`](../technical/), [`docs/product/`](../product/).

## For agents

1. Read `activeContext.md` and `projectbrief.md` first when onboarding to a task.
2. After completing work, patch the Memory Bank files that your change invalidates or extends.
3. Prefer small, factual edits over long essays; link to code paths or other docs when useful.
