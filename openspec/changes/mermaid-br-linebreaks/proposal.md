# Proposal: Mermaid `<br>` → line breaks in imported labels

## Why

GitHub issue: https://github.com/excalidraw/excalidraw/issues/10952

Users paste or type Mermaid diagrams whose node labels use `<br>` for multi-line text (valid in Mermaid). Today the imported Excalidraw elements show the literal substring `<br>` instead of line breaks, which breaks readability and matches neither Mermaid rendering nor user expectation.

## What

Normalize Mermaid-derived label/text content so that **HTML line-break tokens used in Mermaid node labels** (at minimum `<br>` and common variants such as `<br/>`, case-insensitive) become **newline characters** in the data passed into `convertToExcalidrawElements` / displayed text, **before** final elements are shown in both:

1. Clipboard paste-as-Mermaid (`App.tsx` path).
2. Text-to-diagram Mermaid flow (`TTDDialog/common.ts` path, including preview and insert).

Exact normalization rules are specified in the delta spec (`specs/mermaid-text/spec.md`).

## Impact

| Area | Files / modules (expected) |
|------|------------------------------|
| Paste | `packages/excalidraw/components/App.tsx` — after `parseMermaidToExcalidraw`, before or within conversion to excalidraw elements |
| TTD | `packages/excalidraw/components/TTDDialog/common.ts` — same stage in the pipeline for preview/insert |
| Shared logic | New or existing helper under `packages/excalidraw/` (e.g. small util + unit tests) to avoid duplicating normalization |
| Dependency | `@excalidraw/mermaid-to-excalidraw` may remain unchanged if we post-process skeleton elements in-app; upgrading the library is optional and out of scope unless required |

## Risks

| Risk | Mitigation |
|------|------------|
| Over-aggressive replacement breaks legitimate text that should show angle brackets | Limit replacement to known break patterns; document in spec; add scenarios for literal `<br>` as content if product decision differs |
| Divergence between paste and TTD | Single shared normalizer used by both call sites |
| i18n / RTL | Only affects diagram label strings from Mermaid; no new user-facing strings unless we add error copy (avoid unless needed) |
