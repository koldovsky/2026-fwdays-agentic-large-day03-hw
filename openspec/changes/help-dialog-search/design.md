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

**Decision:** Render a magnifying glass `<button>` (using an existing SVG icon from the Excalidraw icon set) in the upper-right of the dialog header. On click, set `searchActive = true`. Also attach a `keydown` listener on the content wrapper div: any printable character keypress (`e.key.length === 1 && !ctrlKey && !metaKey && !altKey`) while `!searchActive` sets `searchActive = true`, prepends the character to `searchQuery`, and triggers focus. Focus on the input is handled via `useEffect(() => { if (searchActive) inputRef.current?.focus() }, [searchActive])` — this guarantees the input is in the DOM before focus is attempted.

**Rationale:** Matches the "click icon or just start typing" UX. No tag-based guards (`tag !== "BUTTON"` etc.) are used on the keydown handler, because the Dialog component auto-focuses the first focusable element (the search button) on open — blocking keypresses from button/link elements would silently prevent activation for the most common case.

**Alternative considered:** `setTimeout(() => ref.focus(), 0)` — rejected because it fires before React finishes rendering the input, leaving `ref.current` as `null` and the input unfocused.

---

### 3. Input visual style: frameless with bottom underline

**Decision:** The `<input>` has `border: none`, `outline: none`, `border-bottom: 1px solid var(--color-border)` (or equivalent design token). Background is transparent. Width expands to fill available space in the header row when active.

**Rationale:** Matches the product's minimal aesthetic (same pattern used in the command palette's inline search).

---

### 4. Fixed dialog size during filtering

**Decision:** Set `height: 80vh` on `.HelpDialog .Modal__content` in `HelpDialog.scss`. The `Modal__content` already has `overflow-y: auto`, so content scrolls when needed. Filtered-out `<Shortcut>` rows and empty `ShortcutIsland` sections use `display: none` (via returning `null`), but the outer modal container is fixed at `80vh` regardless of content height.

**Rationale:** Setting a fixed height on the outermost scrollable container is the simplest and most robust approach — it guarantees stable dialog dimensions without any JS measurement or hard-coded pixel values tied to the shortcuts list length. `80vh` caps naturally via the existing `max-height: 100%` on `.Modal__content` for small viewports.

**Alternative considered:** `min-height` on the inner shortcuts container — rejected because `ShortcutIsland` returning `null` collapses the CSS grid, so even a correct `min-height` couldn't prevent layout shifts as islands disappear.

---

### 5. Match highlighting: `<mark>` element

**Decision:** In the `Shortcut` component, when `searchQuery` is active, split the label on the first case-insensitive match and wrap the match in `<mark>`. Style via `.help-dialog mark` in `HelpDialog.scss`.

**Rationale:** `<mark>` is semantically correct and requires minimal CSS. No third-party library needed.

---

### 6. Localization

**Decision:** Add `helpDialog.searchPlaceholder` to `en.json` for the input placeholder text and `helpDialog.searchShortcuts` for the icon button `aria-label`.

## Risks / Trade-offs

- **React.Children filtering fragility** → Guard with `child.props?.label` check; log a warning in dev mode for children without labels.
- **Keypress capture conflicts** → The keydown handler checks `e.key.length === 1 && !ctrlKey && !metaKey && !altKey` to only act on printable characters. Escape (`e.key = "Escape"`, length 6) is never swallowed, so the Dialog's own close-on-Escape behavior is unaffected.
- **Fixed height viewport dependency** → `height: 80vh` means the dialog is always 80% of viewport height. On very small screens this may feel large; on very tall screens the shortcuts list will have significant empty space after filtering. Acceptable trade-off given the target desktop use case.
- **Accessibility** → The icon button needs `aria-label`. When input is active, it should have `aria-label={t("helpDialog.searchPlaceholder")}`. Focus must return to the icon button when search is dismissed.
