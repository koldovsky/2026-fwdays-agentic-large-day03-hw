## Summary

Fixes [excalidraw/excalidraw#10952](https://github.com/excalidraw/excalidraw/issues/10952): Mermaid node labels using `<br>` import as real line breaks instead of literal `<br>` text.

**Spec-driven approach:** OpenSpec — see `openspec/changes/mermaid-br-linebreaks/` (`proposal.md`, delta `specs/mermaid-text/spec.md`, `tasks.md`).

## Self-review checklist

- [x] SDD approach: **OpenSpec** (proposal + delta spec + tasks)
- [x] Implementation matches specification
- [x] Project conventions (shared util, two call sites, tests)
- [x] Edge cases: `<br>`, `<br/>`, `<br />`, case-insensitive, multiple/adjacent breaks, no-br labels; unit + clipboard integration test
- [x] Blast radius: `mermaidBrNormalize.ts`, `App.tsx` (paste), `TTDDialog/common.ts` (TTD) only
- [x] `yarn test:typecheck` and `yarn test:app --watch=false` pass
- [x] No security concerns (string replace on parsed skeleton only)
- [x] i18n: no new translated UI strings
- [x] No duplicated BR regex; single `MERMAID_BR_TAG_RE` in `mermaidBrNormalize.ts`
