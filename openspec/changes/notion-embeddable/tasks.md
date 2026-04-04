## 1. URL Recognition

- [x] 1.1 Add `RE_NOTION` regex constant to match `*.notion.site` page URLs (with and without title slugs) in `packages/element/src/embeddable.ts`
- [x] 1.2 Add `toNotionEmbedURL()` helper function that parses a Notion page URL and returns the embed URL in the format `https://{hostname}/ebd/{pageId}`

## 2. Domain Allowlisting

- [x] 2.1 Add `*.notion.site` to the `ALLOWED_DOMAINS` set in `packages/element/src/embeddable.ts`
- [x] 2.2 Add `*.notion.site` to the `ALLOW_SAME_ORIGIN` set in `packages/element/src/embeddable.ts`

## 3. Embed Link Integration

- [x] 3.1 Add a Notion branch in `getEmbedLink()` that matches `RE_NOTION`, calls `toNotionEmbedURL()`, sets type `"generic"` with portrait aspect ratio, enables `allowSameOrigin`, and caches the result

## 4. Tests

- [x] 4.1 Add test cases in `packages/element/tests/embeddable.test.ts` covering: standard Notion URL recognition, URL without title slug, embed URL transformation, and non-Notion URL rejection
