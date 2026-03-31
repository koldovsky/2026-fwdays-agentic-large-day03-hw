# Tasks: mermaid-br-linebreaks

## Specification (this change)

- [x] Read `proposal.md` and delta `specs/mermaid-text/spec.md`; confirm scope vs issue #10952
- [x] Implement shared normalizer for skeleton/parsed text (replace `<br>` / `<br/>` / `<br />` with `\n` on relevant fields: `text`, nested `label.text` as returned by `@excalidraw/mermaid-to-excalidraw`)
- [x] Wire normalizer in `packages/excalidraw/components/App.tsx` after `parseMermaidToExcalidraw`, before `convertToExcalidrawElements`
- [x] Wire the same normalizer in `packages/excalidraw/components/TTDDialog/common.ts` on the successful parse path used for preview and insert
- [x] Add unit tests for the normalizer (plain text, multiple breaks, variants, labels without breaks)
- [x] Add or extend integration-style test: paste Mermaid with `<br>` in `clipboard.test.tsx` or `MermaidToExcalidraw.test.tsx` as appropriate
- [x] Run `yarn test` for affected packages / full suite as per project habit
- [x] Run `yarn build` and fix any regressions
- [x] PR description: state **OpenSpec** approach, link `openspec/changes/mermaid-br-linebreaks/`, include self-review checklist (per CodeRabbit / course) — **template:** [`PR_DESCRIPTION.md`](./PR_DESCRIPTION.md) (paste into GitHub when opening the PR)

## Self-review / quality gates (course & CodeRabbit)

Verified 2026-03-31: `yarn test:typecheck` + `yarn test:app --watch=false` green (1330 tests passed); `yarn build` succeeded.

- [x] **Edge cases covered:** Delta spec scenarios covered by tests; added adjacent `<br><br>` case in `mermaidBrNormalize.test.ts` (empty line between segments).
- [x] **Blast radius acceptable:** Changes limited to `mermaidBrNormalize.ts` and call sites in `App.tsx` (paste) and `TTDDialog/common.ts` (TTD); no unrelated refactors.
- [x] **Existing tests passed:** `yarn test:typecheck` and `yarn test:app --watch=false` succeed on this branch.
- [x] **No security concerns:** String replace only on parsed skeleton strings; no new DOM HTML APIs, network, or secrets.
- [x] **Correct i18n:** No new `t()` / locale strings for this fix; diagram label text remains user-authored Mermaid.
- [x] **No inappropriate hardcoded values:** Single `MERMAID_BR_TAG_RE` in `mermaidBrNormalize.ts`; no duplicated regex elsewhere.
