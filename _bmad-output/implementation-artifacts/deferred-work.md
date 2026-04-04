# Deferred work tracker

## Deferred from: code review of 1-1-text-element-schema-and-defaults-for-fill-and-outline.md (2026-04-03)

- **newElementWith vs mutateElement for text paint:** `mergeTextPaintNormalization` runs only in `mutateElement`. If any code path updates text elements via `newElementWith` with paint fields, fields could diverge from the legacy `strokeColor` bridge. Defer: audit `newElementWith` call sites for `type: "text"` (or `ExcalidrawTextElement`) before Story 1.2 / 2.1.

- **Full test suite:** Full `yarn test:update` was not run in the dev session; run before merge to upstream if required by team policy.

## Deferred from: code review of 1-2-text-only-property-controls-for-fill-and-stroke-outline.md (2026-04-03)

- ~~**Text outline toggle a11y:**~~ **Resolved in Story 1.4** — `CheckboxItem` uses `aria-labelledby` to the visible label.

## Deferred from: code review of 1-3-theme-aware-resolved-colors-for-text-paint.md (2026-04-03)

- **Wysiwyg outline vs canvas:** Story 1.5 added `WebkitTextFillColor` and `paint-order` where supported; Firefox/non-WebKit may still differ slightly from canvas — monitor in Epic 2 if needed.

## Deferred from: code review of 1-4 / 1-5 batch (2026-04-04)

- **Non-English locales:** New keys `textOutlineStroke`, `textOutlineWidth` exist in `en.json` only; other locale files fall back to English until translators add strings.

## Deferred from: Epic 2 closure (2026-04-04)

- **NFR2 full baseline:** Story 2.4 adds a resolver perf smoke test only; recording pre/post SVG export wall-clock for large outlined-text scenes remains optional manual or CI benchmark work if the team wants hard numbers.

## Deferred from: Epic 3 closure (2026-04-04)

- **Explicit file-format / semver bump:** Compatibility is documented in `text-paint-serialization.md` and CHANGELOG; bumping `VERSIONS.excalidraw` or similar is a product/release decision if stricter versioning is required.

## Deferred from: Epic 4 closure (2026-04-04)

- **Published npm doc bundle:** `text-paint-serialization.md` lives in the monorepo (not in the published `@excalidraw/element` tarball); README links to GitHub. Duplicating a short embedder appendix on docs.excalidraw.com is optional.
