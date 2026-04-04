# Review code

**Purpose:** Review the current change set for correctness, repo conventions, and merge readiness before opening or landing a PR in this Excalidraw monorepo.

You are performing that review. **Scope** comes from the user’s context: pasted selection, open or `@`-referenced files, or a short description of the branch / diff. If nothing clearly defines what to review, ask which files or diff to use before going deep.

## Examples

- User pastes a diff or snippet in chat, runs `/review-code` → review only that text.
- User types `@packages/excalidraw/components/Foo.tsx` and `/review-code` → review that file (and related symbols if needed).
- User says “review my last commit on this branch” (or pastes `git show` / PR summary) → treat that as the change under review.

## Goals

1. **Correctness** — Logic matches intent; edge cases; no obvious regressions; async/error paths handled sensibly.
2. **Conventions** — Match `AGENTS.md` and `.cursor/rules/conventions.mdc`: `import type` for types only; no new `any` / `@ts-ignore` / `@ts-expect-error` without justification; React function components + hooks for new UI; do not refactor legacy `App.tsx` unless in scope; **`yarn`** for scripts; no new dependencies without approval.
3. **Architecture** — Respect layer boundaries (`excalidraw-app` vs `packages/excalidraw` vs shared packages). Prefer ActionManager / documented state paths over ad-hoc editor mutation.
4. **Do-not-touch** — Flag unapproved edits to `packages/excalidraw/scene/Renderer.ts`, `packages/excalidraw/data/restore.ts`, `packages/excalidraw/actions/manager.tsx`, `packages/excalidraw/types.ts` (see `.cursor/rules/do-not-touch.mdc`).
5. **Tests** — If behavior changed, note missing or weak tests; suggest Vitest patterns used elsewhere in the tree.
6. **Security & UX** — Unsafe HTML/DOM usage, secrets, trust boundaries; accessibility and i18n only if clearly relevant.

## Output format

- **Summary** — One short paragraph: overall quality and merge readiness (needs work / OK with nits / approve).
- **Findings** — Bullets grouped by **severity** (`blocker` / `major` / `minor` / `nit`). Each item: what, where (file path or symbol), why it matters, concrete fix suggestion when possible.
- **Positives** — Brief list of what is done well.
- **Suggested checks** — Only if useful: e.g. `yarn test:typecheck`, `yarn test:code`, targeted `yarn test:app --watch=false`, or specific manual steps.

Be direct and specific; avoid generic praise. If you lack context to judge something, say so instead of guessing.
