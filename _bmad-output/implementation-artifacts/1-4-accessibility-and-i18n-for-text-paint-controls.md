# Story 1.4: Accessibility and i18n for text paint controls

Status: done

## Story

As a **keyboard and assistive-tech user**,
I want **text paint controls to match the editor’s existing picker baseline**,
So that **I can adjust text styling without confusion**.

## Acceptance Criteria

1. **Given** text-only selection and paint controls visible **when** navigating with keyboard **then** Fill and outline-related controls are focusable with visible focus (FR13, NFR3).
2. **Given** assistive technologies query control names **when** they read the text paint controls **then** names align with visible labels and glyph fill is not announced as generic “Stroke” (FR14, NFR4, UX-DR1).
3. **Given** locale files **when** strings ship **then** `en.json` includes distinct labels for text fill vs outline stroke/width (NFR4).

## Tasks / Subtasks

- [x] Wire **checkbox** accessible name to visible “Outline” label (`aria-labelledby` / stable id).
- [x] Use **non-conflicting** i18n for outline color picker and width group (not reusing `labels.stroke` for outline color).
- [x] **Fieldset / legend** for outline group where helpful for screen readers.
- [x] Tests: existing `actionProperties` suite still passes.

### Review Findings

- [x] [Review][Defer] Локалі окрім `en.json` поки без нових ключів — fallback на англійську (політика репозиторію).

## Dev Notes

- Touchpoints: `CheckboxItem.tsx`, `actionProperties.tsx` (standalone text outline block), `locales/en.json`.
- Color picker trigger uses `aria-label={label}` — outline color uses `labels.textOutlineStroke`.

## Dev Agent Record

### Agent Model Used

Cursor agent (Claude) — create + dev + review batch

### Completion Notes List

- `CheckboxItem`: `useId` + `aria-labelledby` на видимий підпис.
- Окремі ключі `textOutlineStroke`, `textOutlineWidth`; прихований `<legend>` для fieldset з чекбоксом outline.

### File List

- `packages/excalidraw/components/CheckboxItem.tsx`
- `packages/excalidraw/actions/actionProperties.tsx`
- `packages/excalidraw/locales/en.json`

## Story completion status

- **Status:** done  
- **Note:** Code review (self) завершено; повний ручний аудит з screen reader — за бажанням.
