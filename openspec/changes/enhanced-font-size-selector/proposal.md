## Why

The current font size control offers only four presets (S=16, M=20, L=28, XL=36), which is insufficient for users who need large-format text for headings, posters, or presentation-style diagrams. GitHub issue [#10506](https://github.com/excalidraw/excalidraw/issues/10506) requests additional sizes (2XL–10XL). The existing control also lacks a way to enter an arbitrary numeric size or specify units, limiting precision for power users.

## What Changes

- **Compact the existing font size radio buttons** (S/M/L/XL) to match the visual density of color swatches in the properties panel.
- **Add a "2XL" preset** button (value ~48px) directly in the inline bar, providing one extra large size without opening a popover.
- **Add a vertical separator + "current style" indicator** after the preset buttons, showing the current numeric font size. This mirrors the ColorPicker pattern (TopPicks → separator → active indicator/trigger).
- **Add a font size popover** (opens on clicking the current style indicator) containing:
  - Smaller size presets (2XS, XS) for fine labels and annotations, and larger size presets (2XL through 10XL, mapping to ~48–144px).
  - A dropdown with predefined numeric font size values (8, 10, 12, 14, 16, 20, 24, 28, 36, 48, 64, 72, 96, 128).
  - A unit type selector (px, pt) for the numeric input — internally stored as px, converted on display.
- **Extend `FONT_SIZES` constant** in `packages/common/src/constants.ts` with smaller sizes (2XS=10, XS=12) and larger named sizes (2XL–10XL).
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
- **i18n** — new translation keys for size labels (2XL–10XL, unit names).
- **No breaking changes** — existing S/M/L/XL values and behavior are preserved.
