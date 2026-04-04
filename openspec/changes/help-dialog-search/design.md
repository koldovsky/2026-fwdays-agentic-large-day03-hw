## Context

The help dialog (`HelpDialog.tsx`) is a static list of ~70 keyboard shortcuts organized into three `ShortcutIsland` sections (Tools, View, Editor). Each shortcut is a `<Shortcut>` component with a `label` prop and one or more key bindings. Currently there is no way to filter or search the list. Users looking for a specific shortcut must visually scan all three sections.

The codebase already has a `QuickSearch.tsx` component and command palette search with fuzzy matching as reference patterns, but the help dialog search only needs simple substring/case-insensitive matching since shortcut labels are short and well-known.

## Goals / Non-Goals

**Goals:**
- Add a search toggle in the upper-right corner of the dialog title bar — initially rendered as a magnifying glass icon button
- When the icon is clicked, or when the user starts typing while the dialog is open, the input expands and receives focus
- Filter shortcuts in real-time (case-insensitive substring match) as the user types
- Hide a `ShortcutIsland` section header when none of its shortcuts match
- Highlight the matching substring within displayed labels using `<mark>`
- The dialog outer dimensions MUST NOT change during filtering — the shortcut list area maintains a fixed height/min-height; filtered-out items are hidden but layout space is preserved
- Frameless input style: no visible border box, only a bottom underline (`border-bottom`), matching Excalidraw's minimal aesthetic

**Non-Goals:**
- Fuzzy/partial-word matching (`includes` is sufficient)
- Searching by key binding characters (e.g., typing "Ctrl")
- Persisting the search query across dialog open/close cycles
- Any backend or network changes

## Decisions

### 1. State location: local component state in `HelpDialog`

**Decision:** Two pieces of local state: `searchActive: boolean` (controls icon-vs-input toggle) and `searchQuery: string` (the filter value).

**Rationale:** Both are purely UI-local. Lifting to `appState` would pollute global state with transient UI concerns. A single `ref` on the input handles programmatic focus.

**Alternative considered:** Single nullable string (`null` = inactive, `""` = active empty) — rejected as less readable than two explicit booleans.

---

### 2. Search trigger: icon button in title bar, or keypress while dialog is open

**Decision:** Render a magnifying glass `<button>` (using an existing SVG icon from the Excalidraw icon set) in the upper-right of the dialog header (alongside or replacing the close button area). On click, set `searchActive = true` and focus the input. Also attach a `keydown` listener on the dialog root: any printable character keypress while `!searchActive` sets `searchActive = true`, appends the character to `searchQuery`, and focuses the input.

**Rationale:** Matches the "click icon or just start typing" UX described in requirements. The dialog is already a modal so capturing keypresses within it is safe and expected.

**Alternative considered:** Auto-focus a hidden input on dialog mount — rejected because an invisible focused input is confusing for screen readers and users.

---

### 3. Input visual style: frameless with bottom underline

**Decision:** The `<input>` has `border: none`, `outline: none`, `border-bottom: 1px solid var(--color-border)` (or equivalent design token). Background is transparent. Width expands to fill available space in the header row when active.

**Rationale:** Matches the product's minimal aesthetic (same pattern used in the command palette's inline search).

---

### 4. Fixed dialog size during filtering

**Decision:** The scrollable shortcuts container (`.help-dialog-content` or equivalent wrapper) is given a fixed `height` equal to its natural height when all shortcuts are visible, set via CSS `min-height` on the container. Filtered-out `<Shortcut>` rows use `display: none` (removed from flow) but the container's `min-height` prevents the dialog from shrinking.

**Rationale:** `display: none` on non-matches is cleaner than `visibility: hidden` (which leaves visual gaps). A `min-height` on the container achieves stable dialog size without JS measurement. The dialog already has a `max-width: 960px` and auto height — adding a fixed height on the inner scroll area is the least-invasive change.

**Alternative considered:** `visibility: hidden` on non-matching rows — rejected because it leaves large blank gaps within sections, which looks broken.

---

### 5. Match highlighting: `<mark>` element

**Decision:** In the `Shortcut` component, when `searchQuery` is active, split the label on the first case-insensitive match and wrap the match in `<mark>`. Style via `.help-dialog mark` in `HelpDialog.scss`.

**Rationale:** `<mark>` is semantically correct and requires minimal CSS. No third-party library needed.

---

### 6. Localization

**Decision:** Add `helpDialog.searchPlaceholder` to `en.json` for the input placeholder text and `helpDialog.searchShortcuts` for the icon button `aria-label`.

## Risks / Trade-offs

- **React.Children filtering fragility** → Guard with `child.props?.label` check; log a warning in dev mode for children without labels.
- **Keypress capture conflicts** → The dialog's keydown listener must not swallow Escape (which closes the dialog) or other dialog-level shortcuts. Check `e.key` carefully; only act on single printable characters (`e.key.length === 1 && !e.ctrlKey && !e.metaKey`).
- **Fixed height brittleness** → If the shortcuts list grows substantially, the hardcoded `min-height` may need updating. Use a CSS custom property or derive from a known reference height so it's easy to adjust.
- **Accessibility** → The icon button needs `aria-label`. When input is active, it should have `aria-label={t("helpDialog.searchPlaceholder")}`. Focus must return to the icon button when search is dismissed.
