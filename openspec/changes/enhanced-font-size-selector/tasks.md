## 1. Constants & Types

- [x] 1.1 Extend `FONT_SIZES` in `packages/common/src/constants.ts` with smaller keys `"2xs"`(10), `"xs"`(12) and larger keys `"2xl"`(48), `"3xl"`(60), `"4xl"`(72), `"5xl"`(84), `"8xl"`(120), `"10xl"`(144) — 12 sizes total (6xl, 7xl, 9xl intentionally omitted)
- [x] 1.2 Add `"fontSize"` to the `openPopup` union type in `packages/excalidraw/types.ts`
- [x] 1.3 Add i18n translation keys in `packages/excalidraw/locales/en.json` for popover section labels (`labels.fontSizePresets`, `labels.fontSizeCustom`, `labels.currentSize`). Size abbreviations (2XS, XL, etc.) and unit names (px, pt) are hardcoded as universal abbreviations

## 2. Icons

- [x] 2.1 Create `FontSize2XLIcon` in `packages/excalidraw/components/icons.tsx` following the style of existing `FontSizeExtraLargeIcon`
- [x] 2.2 Create a `FontSizeIndicatorIcon` or current-value trigger style (may reuse text/number display instead of SVG icon)

## 3. FontSizePicker Component

- [x] 3.1 Create `packages/excalidraw/components/FontSizePicker/` directory with `FontSizePicker.tsx` and `FontSizePicker.scss`
- [x] 3.2 Implement `FontSizeTopPicks` sub-component — renders 4 compact SVG icon preset buttons (S, M, L, XL) with active state highlighting, following `ColorPicker/TopPicks.tsx` pattern
- [x] 3.3 Implement `FontSizeTrigger` sub-component — shows actual numeric fontSize from `getFormValue()` (reactive to all change sources: presets, keyboard, popover, API), acts as Radix `Popover.Trigger`, follows `ColorPickerTrigger` pattern
- [x] 3.4 Implement `FontSizePopoverContent` sub-component — wraps in `PropertiesPopover`, contains extended preset grid + numeric dropdown + unit selector
- [x] 3.5 Implement preset grid inside popover — 3 rows × 4 buttons covering all 12 FONT_SIZES, with section label "Presets" and active state highlighting
- [x] 3.6 Implement numeric size dropdown — `<select>` with all FONT_SIZES values + extra-large (160, 180, 200, 240), highlights current value. Section label "Custom size" above the row
- [x] 3.7 Implement unit type selector (px/pt toggle) — display-only conversion using 1pt = 1.333px ratio, persisted in component local state
- [x] 3.8 Compose `FontSizePicker` main component — combines TopPicks + `ButtonSeparator` + Radix Popover (Trigger + Content), manages `openPopup` state via `updateData`

## 4. Integrate into Action System

- [x] 4.1 Rewrite `actionChangeFontSize.PanelComponent` in `packages/excalidraw/actions/actionProperties.tsx` to render `FontSizePicker` instead of plain `RadioSelection`
- [x] 4.2 Pass required props to `FontSizePicker`: `elements`, `appState`, `updateData`, `app`, `data` (for `onPreventClose`), matching existing PanelComponent contract
- [x] 4.3 Ensure `getFormValue` logic for font size (including bound text elements) is passed through correctly

## 5. Layout Integration

- [x] 5.1 Verify `SelectedShapeActions` (full mode) renders the new font size control correctly within the existing `<fieldset>` wrapper
- [x] 5.2 Update `CompactShapeActions` / `CombinedTextProperties` in `packages/excalidraw/components/Actions.tsx` to handle the compact variant (trigger-only or reduced presets)
- [x] 5.3 Verify `MobileShapeActions` renders correctly

## 6. Styling

- [x] 6.1 Style `FontSizeTopPicks` compact buttons to match `color-picker__top-picks` button sizing and density
- [x] 6.2 Style the trigger button to match `color-picker__button active-color properties-trigger` pattern
- [x] 6.3 Style the popover preset grid (two rows, consistent spacing) to match existing PropertiesPopover content
- [x] 6.4 Style the numeric dropdown and unit selector to fit within the `14rem` max-width popover constraint
- [x] 6.5 Ensure dark mode and RTL compatibility

## 7. Testing

- [x] 7.1 Run `yarn test:update` to update snapshots affected by the new font size panel DOM
- [x] 7.2 Run `yarn test:typecheck` to verify no TypeScript errors from type changes
- [x] 7.3 Verify existing font size tests in `packages/excalidraw/tests/` still pass (may need adjustment for new DOM structure)
- [x] 7.4 Manual test: select text element → verify inline presets (S/M/L/XL/2XL) work
- [x] 7.5 Manual test: click trigger → verify popover opens with extended presets, dropdown, unit selector
- [x] 7.6 Manual test: verify Ctrl+Shift+< / > keyboard shortcuts still work for incremental size change
- [x] 7.7 Manual test: verify compact and mobile modes
