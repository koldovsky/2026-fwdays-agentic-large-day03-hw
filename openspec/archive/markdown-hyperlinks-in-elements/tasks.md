## 1. Parsing and URL validation

- [x] 1.1 Add a small module to parse `[label](url)` spans from a string, returning ordered plain/link segments with line-break awareness (document v1 grammar and edge cases).
- [x] 1.2 Implement URL validation with an allowlist (e.g., `http`, `https`, optional `mailto`) and explicit rejection of dangerous schemes; expose helpers for both render and export paths.
- [x] 1.3 Add unit tests for parser and validator covering valid links, malformed input, nested edge cases, and blocked schemes.

## 2. Canvas rendering and layout

- [x] 2.1 Extend text line layout so each line is split into measured segments (plain vs. link) using shared font metrics APIs.
- [x] 2.2 Update `drawElementOnCanvas` text branch to draw segments with link color, underline, and correct alignment for LTR/RTL and text alignment modes.
- [x] 2.3 Ensure bound text on containers reuses the same segmentation/layout path where applicable.

## 3. Pointer interaction

- [x] 3.1 Compute scene-coordinate bounding regions for each link span on text elements for hit-testing.
- [x] 3.2 Wire pointer up/down so that outside text editing, activating a valid link opens `window.open` with `noopener,noreferrer`; clicks outside links preserve existing selection behavior.
- [x] 3.3 Define interaction when text editor is active (caret vs. link follow per `design.md` open questions); implement and document.

## 4. Editing (WYSIWYG)

- [x] 4.1 Ensure `textWysiwyg` preserves `[label](url)` verbatim when editing plain text sources; avoid breaking spans on trivial edits where possible.
- [x] 4.2 Add pointer cursor style (e.g., `pointer`) when hovering a link region in non-edit mode if technically feasible without regressing performance.

## 5. Export

- [x] 5.1 Update SVG text rendering to wrap link segments in `<a>` with validated `href` where allowed; fall back to styled text only when disallowed.
- [x] 5.2 Confirm PNG/raster export shows link styling via existing canvas path; no click map required.

## 6. Verification

- [x] 6.1 Add integration or E2E tests for click-to-open and blocked `javascript:` URLs.
- [x] 6.2 Run `yarn test:typecheck` and relevant test suites; fix regressions.
