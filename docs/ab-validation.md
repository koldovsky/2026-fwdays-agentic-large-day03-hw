# A/B validation (workshop)

CodeRabbit expects at least one document under **`docs/ab-validation/`** or this file **`docs/ab-validation.md`** (see `.coderabbit.yaml` `path_filters` and `pre_merge_checks` → *A/B validation document*).

| Document | Rule | Description |
|----------|------|-------------|
| [`ab-validation/testing-mdc.md`](ab-validation/testing-mdc.md) | `.cursor/rules/testing.mdc` | Vitest vs `@jest/globals` on a colocated `StatsLayout` smoke test |
| [`ab-validation/architecture-mdc.md`](ab-validation/architecture-mdc.md) | `.cursor/rules/architecture.mdc` | Coordinates UI: minimal row vs read-only summary + shared helper + i18n + test |

In each file, **Result A** is **without** the rule (or old behavior), **Result B** is **with** the rule applied — matching the checklist in `.coderabbit.yaml`.
