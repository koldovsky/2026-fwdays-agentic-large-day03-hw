## Why

The current font size control offers only four presets (S=16, M=20, L=28, XL=36), which is insufficient for users who need large-format text for headings, posters, or presentation-style diagrams. GitHub issue [#10506](https://github.com/excalidraw/excalidraw/issues/10506) requests additional sizes (2XL–10XL). The existing control also lacks a way to enter an arbitrary numeric size or specify units, limiting precision for power users.

## What Changes

- **Compact the existing font size radio buttons** (S/M/L/XL) into 4 SVG icon preset buttons to match the visual density of color swatches in the properties panel.
- **Add a vertical separator + "current style" indicator** after the 4 preset buttons, showing the current numeric font size. This mirrors the ColorPicker pattern (TopPicks → separator → active indicator/trigger).
- **Add a font size popover** (opens on clicking the current style indicator) containing:
  - A "Presets" section with all 12 named sizes in a 3×4 grid (2XS through 10XL, including the 4 inline sizes).
  - A "Custom size" section with a `<select>` dropdown containing all FONT_SIZES values plus extra-large (160, 180, 200, 240).
  - A unit type selector (px, pt) inline with the dropdown — internally stored as px, converted on display.
- **Extend `FONT_SIZES` constant** in `packages/common/src/constants.ts` with smaller sizes (2XS=10, XS=12) and larger named sizes (2xl, 3xl, 4xl, 5xl, 8xl, 10xl) — 12 sizes total.
- **Extend `openPopup` type** in `packages/excalidraw/types.ts` to include `"fontSize"` popup identifier.

## Capabilities

### New Capabilities
- `font-size-popover`: Extended font size picker with popover containing preset grid, numeric dropdown, and unit selector.

### Modified Capabilities
<!-- No existing specs are being modified — this is a pure addition to the font size UI -->

## Impact

- **`packages/common/src/constants.ts`** — new entries in `FONT_SIZES` object.
- **`packages/excalidraw/actions/actionProperties.tsx`** — rewrite `actionChangeFontSize` PanelComponent to use compact presets + popover pattern.
- **`packages/excalidraw/components/`** — new `FontSizePicker/` component directory (following ColorPicker structure).
- **`packages/excalidraw/components/icons.tsx`** — new icon for 2XL preset and possibly a generic "font size indicator" icon.
- **`packages/excalidraw/types.ts`** — extend `openPopup` union type.
- **`packages/excalidraw/components/Actions.tsx`** — may need minor layout adjustment in `SelectedShapeActions` and `CompactShapeActions` for the new font size control width.
- **i18n** — new translation keys for popover section labels (`fontSizePresets`, `fontSizeCustom`). Size abbreviations and unit names are hardcoded.
- **No breaking changes** — existing S/M/L/XL values and behavior are preserved.
