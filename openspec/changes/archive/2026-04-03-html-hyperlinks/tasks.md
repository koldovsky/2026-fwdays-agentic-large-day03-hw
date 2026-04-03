# Tasks: HTML Hyperlinks in Text Elements

## 1. Core Parser

- [x] 1.1 Create `packages/excalidraw/utils/markdownLink.ts` with `parseMarkdownLinks(text)` pure function
- [x] 1.2 Implement regex extraction for `[label](url)` with balanced-parentheses support
- [x] 1.3 Integrate `normalizeLink` from `@excalidraw/common` for URL sanitisation
- [x] 1.4 Handle edge cases: empty label (fall back to URL), empty URL (no-op), mixed safe/unsafe links

## 2. Integration

- [x] 2.1 Call `parseMarkdownLinks` in `handleTextWysiwygForTextElement` onSubmit callback in App.tsx
- [x] 2.2 Pass resolved text to `updateElement` and set `element.link` to first valid URL

## 3. Tests

- [x] 3.1 Write unit tests for `parseMarkdownLinks` in `packages/excalidraw/tests/markdownLink.test.ts`
- [x] 3.2 Cover: standalone link, inline links, multiple links, edge cases, security rejection, mixed links

## 4. Verification

- [x] 4.1 Run `yarn test:typecheck` — no new type errors
- [x] 4.2 Run `yarn test:update` — all existing tests pass
