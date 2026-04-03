## Context

Issue `#9541` reports ambiguity after users press `Esc` while a shape tool is active. In current behavior, `Esc` resets the tool to selection in `packages/excalidraw/components/App.tsx`, and pointer drag then performs box selection. This is technically correct, but users who expect immediate shape creation may interpret the result as "nothing happened".

The implementation must keep existing interaction semantics intact (selection drag, cursor updates, keyboard shortcuts), while improving mode transition clarity with minimal UX noise. Existing notification infrastructure (`AppState.toast`, `setToast`, `Toast` rendering in `LayerUI`) should be reused.

## Goals / Non-Goals

**Goals:**
- Provide explicit feedback when users attempt draw-like interaction right after deactivating a drawing tool via `Esc`.
- Keep feedback low-friction and non-blocking (no modal, no interruption of selection drag).
- Minimize blast radius by localizing logic to tool-transition and pointer-handling code paths.
- Add automated tests for the feedback trigger and anti-spam behavior.

**Non-Goals:**
- Redesigning toolbars, cursor styles, or broad onboarding UX.
- Changing core selection/drag semantics.
- Introducing persistent banners or global notification systems.

## Decisions

1. **Use toast feedback, not a new visual surface**
   - Reuse `setToast` in `App.tsx` and existing `Toast` component lifecycle.
   - Rationale: lowest implementation overhead and consistent with other transient feedback.
   - Alternative considered: hint text mutation in `HintViewer`; rejected because hints are passive and less discoverable during active drag attempts.

2. **Trigger feedback only on a narrow transient state**
   - Track whether the active tool was switched to selection via `Esc` from a draw-capable tool.
   - On next pointer-down/drag attempt on canvas under selection mode, show one short toast and clear the transient flag.
   - Rationale: prevents showing feedback during normal selection workflows unrelated to tool deactivation.

3. **Rate-limit duplicate feedback**
   - Guard with a short cool-down timestamp or one-shot transient state reset.
   - Rationale: avoids repeated toasts while user keeps dragging.
   - Alternative considered: always show on selection drag with empty selection; rejected due to high false-positive noise.

4. **Localization-first string additions**
   - Add new key(s) to `packages/excalidraw/locales/en.json`, then rely on existing translation flow for other locales.
   - Rationale: follows existing i18n pattern in `t("toast.*")`.

## Risks / Trade-offs

- **[Risk] Feedback may still feel unnecessary to experienced users** -> **Mitigation:** one-shot trigger only after `Esc` deactivation from draw tool, short duration.
- **[Risk] Incorrect trigger conditions could fire during valid selection workflows** -> **Mitigation:** strictly couple state to `Esc`-origin transition and reset after first eligible interaction.
- **[Trade-off] Toast visibility over subtle hint changes** -> Better explicitness, but introduces transient UI noise.

