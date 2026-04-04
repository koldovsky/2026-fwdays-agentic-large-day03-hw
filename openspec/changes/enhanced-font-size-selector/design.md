## Context

The font size control in the Excalidraw properties panel currently renders as a `RadioSelection` with 4 options (S=16, M=20, L=28, XL=36) inside a `<fieldset>`. It lives in `actionChangeFontSize.PanelComponent` (actionProperties.tsx:774). The action system uses `perform()` + `updateData()` to apply font size changes to selected elements.

The properties panel already has a proven pattern for "compact presets + popover detail" — the `ColorPicker` component uses `TopPicks` (inline swatches) → `ButtonSeparator` → trigger button → `PropertiesPopover` with full picker. This design replicates that pattern for font sizes.

Key constraints:
- The `fontSize` field on `ExcalidrawTextElement` stores a raw numeric value (always px internally).
- `FONT_SIZES` in `packages/common/src/constants.ts` currently has `sm: 16, md: 20, lg: 28, xl: 36`.
- The `openPopup` state in `AppState` manages which popover is visible (one at a time).
- Both full and compact (`CompactShapeActions`) layout modes must be handled.

## Goals / Non-Goals

**Goals:**
- Provide quick access to common sizes (S through 2XL) in the inline bar.
- Provide a popover with extended sizes (2XL–10XL), a numeric preset dropdown, and a unit display selector.
- Follow the ColorPicker TopPicks + Popover pattern for visual consistency.
- Reuse existing components: `RadioSelection` (or compact button variants), `ButtonSeparator`, `PropertiesPopover`, Radix `Popover`.
- Keep existing S/M/L/XL values and keyboard shortcuts (Ctrl+Shift+</>`) fully backward-compatible.

**Non-Goals:**
- Free-text arbitrary font size input (only predefined numeric values in dropdown).
- Actual unit conversion logic (pt/px toggle is display-only; internal storage remains px).
- Changes to `actionIncreaseFontSize` / `actionDecreaseFontSize` keyboard shortcuts.
- Mobile-specific layout changes beyond what the compact mode already handles.

## Decisions

### D1: Follow the ColorPicker pattern for component structure

**Choice:** Create a `FontSizePicker` component directory mirroring `ColorPicker/` structure.

**Rationale:** The ColorPicker already solves the same UX problem — compact inline presets with a detailed popover. Reusing this pattern:
- Ensures visual consistency across the properties panel.
- Leverages proven Radix Popover integration with `openPopup` state management.
- Follows the same `PropertiesPopover` wrapper used by `CombinedShapeProperties`.

**Alternatives considered:**
- Extend the existing `RadioSelection` with a "more" button — rejected because `RadioSelection` is a simple stateless component not designed for popovers.
- Use a standalone dropdown — rejected because it doesn't match the panel's visual language.

### D2: Extended size values

**Choice:** Add named sizes to `FONT_SIZES` — both smaller and larger than existing:

| Name | Value (px) |
|------|-----------|
| 2xs | 10 |
| xs | 12 |
| sm | 16 (existing) |
| md | 20 (existing) |
| lg | 28 (existing) |
| xl | 36 (existing) |
| 2xl | 48 |
| 3xl | 60 |
| 4xl | 72 |
| 5xl | 84 |
| 6xl | 96 |
| 7xl | 108 |
| 8xl | 120 |
| 9xl | 132 |
| 10xl | 144 |

**Rationale:** Values roughly follow a progression similar to Tailwind CSS text scale. Smaller sizes (2XS=10, XS=12) cover annotation and fine-label use cases. Each step above 2XL increases by ~12px for consistent visual jumps. The inline bar shows S/M/L/XL/2XL; the popover shows smaller (2XS, XS) and larger (2XL–10XL) presets.

**Alternatives considered:**
- Exponential scaling (×1.25) — rejected, produces awkward numbers at larger sizes.
- CSS-named sizes (xx-large, etc.) — rejected, Excalidraw stores raw px numbers.

### D3: Numeric dropdown with predefined values

**Choice:** The popover includes a dropdown list with common numeric sizes: 8, 10, 12, 14, 16, 20, 24, 28, 36, 48, 64, 72, 96, 128.

**Rationale:** These match standard typographic sizes familiar to users from word processors and design tools. The dropdown allows precise size selection without requiring free-text input (which would need validation, parsing, and edge case handling).

### D4: Unit type selector is display-only

**Choice:** The unit selector (px / pt) converts the displayed value but the internal `fontSize` always remains in px. pt→px uses the standard 1pt = 1.333px ratio.

**Rationale:** Excalidraw's rendering pipeline uses px throughout. Adding true unit support would require changes across the element model, rendering, and serialization — far beyond the scope of this change.

### D5: New `openPopup` value `"fontSize"`

**Choice:** Add `"fontSize"` to the `openPopup` union type in `types.ts`.

**Rationale:** The existing popup management system ensures only one popover is open at a time. This is the standard integration point used by all property popovers.

### D6: Inline bar layout

**Choice:** The inline bar renders as:
```
[S] [M] [L] [XL] [2XL] | [current value trigger]
```
Where `|` is a `ButtonSeparator` and the current value trigger shows the **actual** numeric fontSize of the selected element (e.g., "36") and opens the popover on click. The trigger is reactive — it reads from `getFormValue()` on every render, so it updates immediately when the size changes by any means (preset click, keyboard shortcut, popover selection, or external API call).

**Rationale:** This matches the ColorPicker layout: `[swatch] [swatch] ... | [active-color-trigger]`. The numeric display gives users immediate feedback about the precise value regardless of how it was set.

## Risks / Trade-offs

- **Panel width increase** → The inline bar with 5 presets + separator + trigger is wider than the current 4-button `RadioSelection`. Mitigated by making preset buttons smaller (matching compact color swatch sizing) and relying on the existing panel scroll.

- **Popover complexity** → Adding a dropdown inside a popover increases z-index and focus management concerns. Mitigated by using `PropertiesPopover` which already handles viewport fitting and focus trapping.

- **i18n surface area** → New labels for 2XL–10XL sizes and unit names. Low risk — these are short, largely numeric strings.

- **Snapshot test breakage** → The font size panel DOM changes significantly. Tests in `packages/excalidraw/tests/` that snapshot the properties panel will need updates. Mitigated by running `yarn test:update`.

- **`updateData()` dual-purpose hazard** (DISCOVERED DURING IMPLEMENTATION) → The `PanelComponent.updateData()` callback routes through `action.perform()`. The ColorPicker pattern passes both actual values (color strings) and state-management objects (`{ openPopup: type }`) through the same `updateData()`. For `actionChangeStrokeColor`, this works because `perform` spreads `...value` into appState. However, `actionChangeFontSize.perform` originally expected only a numeric value and passed it to `changeFontSize()`, which caused a React crash when `{ openPopup: "fontSize" }` was received. **Fix:** `perform` now discriminates `typeof value === "object" && "openPopup" in value` before dispatching. **Mitigation:** Dedicated test in `fontSizePicker.test.tsx` ("opening popover does not crash or change fontSize") guards this invariant.
