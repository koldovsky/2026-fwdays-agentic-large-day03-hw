# Code review

You are reviewing code in this Excalidraw monorepo. The user provides changes (diff, files, or description). Perform the review without editing the repo unless they ask otherwise.

## Project context

- See `AGENTS.md`: `packages/excalidraw/` is the library, `excalidraw-app/` is the web app, other packages live under `packages/`.
- Substantive changes should typically be validated with `yarn test:typecheck` and tests as needed (`yarn test:update` before commit when snapshots must change).

## Required checks

1. **Protected files** — Do not approve changes to `packages/excalidraw/scene/renderer.ts`, `packages/excalidraw/data/restore.ts`, `packages/excalidraw/actions/manager.ts`, or `packages/excalidraw/types.ts` unless clearly necessary with strong justification (critical paths).
2. **Security** — Secrets only via env vars; do not log sensitive data; untrusted input (`.excalidraw`, imports) must be validated and size-limited; no `eval` or dynamic `Function` on untrusted data.
3. **Conventions** — Functional components and hooks; named exports; `ComponentNameProps`; strict TypeScript without `any` or `@ts-ignore` unless there is an exceptional reason; file naming per `.cursor/rules/conventions.mdc`.
4. **Quality** — Changes stay scoped to the task; no drive-by refactors; consistency with neighboring code patterns.

## Response format

- Brief verdict (approve / request changes / comment).
- **Findings** ordered by severity: blockers → important → nits. For each: what is wrong, why, where (file/snippet), concrete recommendation.
- If there is not enough to review, ask for a diff, file list, or PR link.

Point authors at **How to verify** in `.cursor/rules/testing.mdc` (and `.cursor/rules/do-not-touch.mdc` when protected files are involved).
