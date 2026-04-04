# Markdown-style hyperlinks in text elements

## Goal

When a text element’s entire content is a single markdown link `[label](url)`, Excalidraw should show only the label, attach the sanitized URL to `element.link`, and notify the user.

## Context

- **Issue:** [excalidraw/excalidraw#11024](https://github.com/excalidraw/excalidraw/issues/11024) — support creating hyperlinks from markdown-style `[label](url)` in text elements.
- **Branch / task:** `task/LM-3990-alw-missed-form-data-request-handle` (workshop Day 3).
- **Current behavior (before change):** Submitting WYSIWYG text keeps the raw string `[label](url)` as visible text; the user must set a link manually (e.g. via the hyperlink UI).
- **Expected behavior:** If the trimmed text matches exactly one inline link pattern, replace visible text with `label`, set `link` to the normalized URL, show a toast, and rely on existing hyperlink rendering and export.

## Component / Module

| Area | Path |
|------|------|
| WYSIWYG submit handler | [`packages/excalidraw/components/App.tsx`](../../packages/excalidraw/components/App.tsx) — `handleTextWysiwyg` → `onSubmit` |
| Parser + URL safety | [`packages/excalidraw/utils/markdownLink.ts`](../../packages/excalidraw/utils/markdownLink.ts) — `parseMarkdownLink`, `normalizeLink` from `@excalidraw/common` |
| Unit tests | [`packages/excalidraw/tests/markdownLink.test.ts`](../../packages/excalidraw/tests/markdownLink.test.ts) |
| User-facing copy | [`packages/excalidraw/locales/*.json`](../../packages/excalidraw/locales/) — `toast.markdownLinkDetected` |

## Changes Required

1. **`markdownLink.ts`:** Export `parseMarkdownLink` that accepts only a *whole-string* match `[label](url)` after trim; return `null` for partial matches, empty URL, or URLs that sanitize to empty / `about:blank`.
2. **`App.tsx`:** On WYSIWYG `onSubmit`, if `parseMarkdownLink(nextOriginalText)` succeeds, set element text to `label`, `mutateElement` with `link: url`, and show toast `t("toast.markdownLinkDetected")`.
3. **`markdownLink.test.ts`:** Cover valid links, whitespace, empty label, relative URLs, rejection of partial/plain/malicious input.
4. **Locales:** Add `toast.markdownLinkDetected` (English baseline; other locale files aligned for key parity).

## Non-goals

- Inline markdown inside longer sentences (e.g. `See [here](url) for details`) — no rich-text engine; only the full string may be a single link.
- Changing `.excalidraw` file format, collaboration protocol, or adding a new element property beyond existing `link`.
- Auto-detecting bare URLs without markdown syntax.

## Acceptance Criteria

1. Given trimmed text is exactly `[Label](https://example.com)`, after submit the element’s visible text is `Label`, `element.link` is the normalized HTTPS URL, and a non-empty localized toast is shown.
2. Given text is `[x](javascript:alert(1))` or `[x](data:text/html,...)`, `parseMarkdownLink` returns `null`, visible text stays unchanged, and no `link` is set from this path.
3. Given `toast.markdownLinkDetected` exists in `en.json` (and other locale files as required by the repo), the app does not show a missing i18n key when the toast appears.

## Edge Cases

- **Empty label:** `[](https://a.com)` — label falls back to the URL string (parser behavior).
- **Partial match:** Text like `Hi [a](https://b.com)` — returns `null`; no silent truncation.
- **Two links in one string:** Returns `null`.
- **Bound text:** Same submit path applies; container selection behavior unchanged from existing WYSIWYG logic.

## Constraints

- Whole-line regex only; no changes to text layout engine.
- URLs must pass existing `normalizeLink` / sanitize-url rules used elsewhere in Excalidraw.
