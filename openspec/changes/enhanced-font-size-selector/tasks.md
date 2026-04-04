## 1. Constants & Types

- [ ] 1.1 Extend `FONT_SIZES` in `packages/common/src/constants.ts` with smaller keys `"2xs"`(10), `"xs"`(12) and larger keys `"2xl"` through `"10xl"` (values: 48, 60, 72, 84, 96, 108, 120, 132, 144)
- [ ] 1.2 Add `"fontSize"` to the `openPopup` union type in `packages/excalidraw/types.ts`
- [ ] 1.3 Add i18n translation keys in `packages/excalidraw/locales/en.json` for new size labels (`labels.2xs`, `labels.xs`, `labels.2xl` through `labels.10xl`, `labels.fontSizeUnits`, `labels.pt`, `labels.px`, `labels.currentSize`)

## 2. Icons

- [ ] 2.1 Create `FontSize2XLIcon` in `packages/excalidraw/components/icons.tsx` following the style of existing `FontSizeExtraLargeIcon`
- [ ] 2.2 Create a `FontSizeIndicatorIcon` or current-value trigger style (may reuse text/number display instead of SVG icon)

## 3. FontSizePicker Component

- [ ] 3.1 Create `packages/excalidraw/components/FontSizePicker/` directory with `FontSizePicker.tsx` and `FontSizePicker.scss`
- [ ] 3.2 Implement `FontSizeTopPicks` sub-component — renders compact preset buttons (S, M, L, XL, 2XL) with active state highlighting, following `ColorPicker/TopPicks.tsx` pattern
- [ ] 3.3 Implement `FontSizeTrigger` sub-component — shows actual numeric fontSize from `getFormValue()` (reactive to all change sources: presets, keyboard, popover, API), acts as Radix `Popover.Trigger`, follows `ColorPickerTrigger` pattern
- [ ] 3.4 Implement `FontSizePopoverContent` sub-component — wraps in `PropertiesPopover`, contains extended preset grid + numeric dropdown + unit selector
- [ ] 3.5 Implement preset grid inside popover — smaller sizes row (2XS, XS), larger sizes rows (2XL–5XL, 6XL–10XL), all with active state highlighting
- [ ] 3.6 Implement numeric size dropdown — `<select>` or custom dropdown with values [8, 10, 12, 14, 16, 20, 24, 28, 36, 48, 64, 72, 96, 128], highlights current value
- [ ] 3.7 Implement unit type selector (px/pt toggle) — display-only conversion using 1pt = 1.333px ratio, persisted in component local state
- [ ] 3.8 Compose `FontSizePicker` main component — combines TopPicks + `ButtonSeparator` + Radix Popover (Trigger + Content), manages `openPopup` state via `updateData`

## 4. Integrate into Action System

- [ ] 4.1 Rewrite `actionChangeFontSize.PanelComponent` in `packages/excalidraw/actions/actionProperties.tsx` to render `FontSizePicker` instead of plain `RadioSelection`
- [ ] 4.2 Pass required props to `FontSizePicker`: `elements`, `appState`, `updateData`, `app`, `data` (for `onPreventClose`), matching existing PanelComponent contract
- [ ] 4.3 Ensure `getFormValue` logic for font size (including bound text elements) is passed through correctly

## 5. Layout Integration

- [ ] 5.1 Verify `SelectedShapeActions` (full mode) renders the new font size control correctly within the existing `<fieldset>` wrapper
- [ ] 5.2 Update `CompactShapeActions` / `CombinedTextProperties` in `packages/excalidraw/components/Actions.tsx` to handle the compact variant (trigger-only or reduced presets)
- [ ] 5.3 Verify `MobileShapeActions` renders correctly

## 6. Styling

- [ ] 6.1 Style `FontSizeTopPicks` compact buttons to match `color-picker__top-picks` button sizing and density
- [ ] 6.2 Style the trigger button to match `color-picker__button active-color properties-trigger` pattern
- [ ] 6.3 Style the popover preset grid (two rows, consistent spacing) to match existing PropertiesPopover content
- [ ] 6.4 Style the numeric dropdown and unit selector to fit within the `13rem` max-width popover constraint
- [ ] 6.5 Ensure dark mode and RTL compatibility

## 7. Testing

- [ ] 7.1 Run `yarn test:update` to update snapshots affected by the new font size panel DOM
- [ ] 7.2 Run `yarn test:typecheck` to verify no TypeScript errors from type changes
- [ ] 7.3 Verify existing font size tests in `packages/excalidraw/tests/` still pass (may need adjustment for new DOM structure)
- [ ] 7.4 Manual test: select text element → verify inline presets (S/M/L/XL/2XL) work
- [ ] 7.5 Manual test: click trigger → verify popover opens with extended presets, dropdown, unit selector
- [ ] 7.6 Manual test: verify Ctrl+Shift+< / > keyboard shortcuts still work for incremental size change
- [ ] 7.7 Manual test: verify compact and mobile modes
