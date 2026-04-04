## 1. Markdown Link Parser

- [x] 1.1 Create `packages/element/src/markdownLinks.ts` with `TextSegment` type (`{ type: "text"; content: string } | { type: "link"; label: string; url: string; rawLength: number }`) and `parseMarkdownLinks(line: string): TextSegment[]` function using a regex to extract `[label](url)` patterns
- [x] 1.2 Integrate `normalizeLink` from `@excalidraw/common` to sanitize every extracted URL before storing it in the link segment
- [x] 1.3 Add version-keyed parse cache (`Map<string, TextSegment[][]>` keyed by `${element.id}_${element.version}`) with a public `getParsedTextSegments(element): TextSegment[][]` function that returns cached per-line segments
- [x] 1.4 Write unit tests for `parseMarkdownLinks`: single link, multiple links, no links, full-line link, malformed/nested brackets, `javascript:` URL sanitization, and `rawLength` correctness

## 2. Text Wrapping Integration

- [x] 2.1 Create a helper `getDisplayText(text: string): string` in `markdownLinks.ts` that replaces every `[label](url)` occurrence in the raw text with just the `label`, for use in width measurement
- [x] 2.2 Update `wrapText` / `getWrappedTextLines` in `packages/element/src/textWrapping.ts` to call `getDisplayText` on each hard line before tokenizing, so wrapping uses label widths instead of raw syntax widths
- [x] 2.3 Write tests verifying that text wrapping with markdown links produces line breaks based on label width, not raw markdown width

## 3. Canvas Rendering

- [x] 3.1 Refactor the text rendering block in `drawElementOnCanvas` (`packages/element/src/renderElement.ts`) to iterate over parsed segments per line instead of a single `fillText` call per line
- [x] 3.2 For link segments, switch `fillStyle` to `#1971c2` (apply `applyDarkModeFilter` in dark mode), draw the label with `fillText`, then draw an underline via `context.beginPath`/`lineTo`/`stroke` at the baseline
- [x] 3.3 For plain text segments, draw with the existing element `strokeColor` as before
- [x] 3.4 Compute and store link hit boxes (`{ x, y, width, height, url }` in element-local coords) in a module-level `Map<string, LinkHitBox[]>` during rendering for use by the hit-testing system

## 4. Hit Testing and Click Handling

- [x] 4.1 Export a `getInlineLinkAtPoint(elementId: string, localPoint: [number, number]): string | null` function from `markdownLinks.ts` that checks the stored link hit boxes and returns the URL if a link span was hit
- [x] 4.2 Extend `isPointHittingLink` in `packages/excalidraw/components/hyperlink/helpers.ts` to also check inline link hit boxes for text elements (after the existing element-level link check)
- [x] 4.3 Update pointer event handling so that clicking an inline link in view mode opens the URL via `window.open(url, "_blank", "noreferrer")` and hovering shows a `pointer` cursor
- [x] 4.4 Write tests for hit-testing: click on link span triggers navigation, click on plain text does not, element-level link and inline links coexist independently

## 5. SVG Export

- [x] 5.1 Update the text rendering path in `packages/excalidraw/renderer/staticSvgScene.ts` to split each text line into parsed segments
- [x] 5.2 For link segments, wrap the `<tspan>` in an `<a>` element with `href` set to the sanitized URL, `fill="#1971c2"`, and `text-decoration="underline"`
- [x] 5.3 For plain text segments, emit `<tspan>` nodes as currently done
- [x] 5.4 Write tests verifying SVG export produces correct `<a>` wrappers for inline links and unchanged output for text without links

## 6. Integration and Regression

- [x] 6.1 Run `yarn test:typecheck` to verify no TypeScript errors across all packages
- [x] 6.2 Run `yarn test:update` to ensure all existing tests pass and snapshots are updated
- [x] 6.3 Manually verify end-to-end: create a text element with `[label](url)`, confirm styled rendering, click opens link, SVG export contains `<a>` tag
