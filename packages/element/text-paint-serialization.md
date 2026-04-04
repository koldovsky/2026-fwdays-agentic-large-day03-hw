# Text paint: serialization and backward compatibility

Optional fields on `ExcalidrawTextElement` (see `packages/element/src/types.ts`):

| Field | Meaning |
| ----- | ------- |
| `textFillColor?` | Glyph fill. |
| `textStrokeColor?` | Outline color when outline is enabled. |
| `textStrokeWidth?` | Outline width in scene units; `0` or omitted means outline off. |

## Legacy documents (no new fields)

Older `.excalidraw` JSON often has only `strokeColor` for standalone text. **Renderers** use `getResolvedTextPaint` (`textPaintResolve.ts`): fill is `textFillColor ?? strokeColor`; outline is off when width is missing or not a positive finite number.

**Restore** (`packages/excalidraw/data/restore.ts`) does **not** copy `strokeColor` into `textFillColor` on load, so untouched legacy files stay free of new keys until something mutates the element (e.g. user edit or `mutateElement` with paint fields).

## Normalization on restore

After JSON parse, text elements are passed through `normalizeRestoredTextElementPaint`:

- `textFillColor` / `textStrokeColor` equal to `""` are removed (treated as absent).
- `textStrokeWidth`: `null` removes the property; non-finite or negative numbers become `0`.

## New clients / round-trip

Saving includes any set optional fields via `JSON.stringify` on the element list. Reloading restores them unchanged (subject to normalization above). `mergeTextPaintNormalization` (on `mutateElement`) keeps `strokeColor` and `textFillColor` aligned when either is updated.

## Older clients

Unknown JSON keys are typically ignored. Consumers that strip unknown keys should preserve these fields if they round-trip scene JSON through a newer editor.

## Compatible viewers (shared scenes)

Two parties see the **same** fill and outline when they run a **compatible** build: the same `getResolvedTextPaint` + the same render paths (interactive canvas, SVG export, inline editor) consume the element JSON. If one side strips `textFillColor` / `textStrokeColor` / `textStrokeWidth` when persisting, outline or explicit fill can be lost—hosts should round-trip unknown keys.

## Automated checks (canvas ↔ SVG contract)

The interactive canvas draws text using `getResolvedTextPaint` in `packages/element/src/renderElement.ts`; SVG export uses the same helper in `packages/excalidraw/renderer/staticSvgScene.ts`. CI covers the shared contract via `packages/excalidraw/tests/textPaintCrossSurface.test.tsx` (exported `<text>` attributes vs resolver), including a **legacy-shaped** text element after `restoreElements`.
