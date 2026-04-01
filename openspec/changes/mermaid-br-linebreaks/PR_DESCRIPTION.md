## GitHub PR metadata (copy when opening / editing the PR)

**Recommended PR title** (per `.coderabbit.yaml` `pre_merge_checks.title`):

`Day 3: Artem Bidniarskyi — SDD Assignment`

Put the issue link and any fork-specific tracker in the description body — do not concatenate the title with issue numbers.

**Upstream issue (canonical):** [excalidraw/excalidraw#10952](https://github.com/excalidraw/excalidraw/issues/10952)

---

## Summary

Fixes [excalidraw/excalidraw#10952](https://github.com/excalidraw/excalidraw/issues/10952): Mermaid node labels using `<br>` import as real line breaks instead of literal `<br>` text.

**Spec-driven approach:** OpenSpec — see `openspec/changes/mermaid-br-linebreaks/` (`proposal.md`, delta `specs/mermaid-text/spec.md`, `tasks.md`).

**Why OpenSpec (1–3 sentences):** We use OpenSpec so the change has a clear proposal, a formal delta spec with scenarios, and a tasks checklist that maps to implementation and tests. That keeps review aligned with the issue and both paste and TTD flows.

---

## Self-review checklist

Canonical items from [`.coderabbit.yaml`](../../../.coderabbit.yaml) (custom check: at least **8** of these; all **11** listed below for clarity):

- [x] SDD approach chosen and justified
- [x] Implementation matches specification
- [x] Project conventions followed
- [x] Edge cases handled
- [x] Blast radius acceptable
- [x] Existing tests pass
- [x] New tests added (if needed)
- [x] No security concerns
- [x] i18n handled
- [x] No hardcoded values
- [x] Code understandable by another developer
