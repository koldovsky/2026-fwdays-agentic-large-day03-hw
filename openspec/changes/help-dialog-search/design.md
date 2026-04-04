## Context

The help dialog (`HelpDialog.tsx`) is a static list of ~70 keyboard shortcuts organized into three `ShortcutIsland` sections (Tools, View, Editor). Each shortcut is a `<Shortcut>` component with a `label` prop and one or more key bindings. Currently there is no way to filter or search the list. Users looking for a specific shortcut must visually scan all three sections.

The codebase already has a `QuickSearch.tsx` component and command palette search with fuzzy matching as reference patterns, but the help dialog search only needs simple substring/case-insensitive matching since shortcut labels are short and well-known.

## Goals / Non-Goals

**Goals:**
- Add a controlled text input in the **upper right corner of the dialog title bar**, inline with the dialog heading
- Hide shortcut entries whose labels do not contain the search string (case-insensitive substring match)
- Hide a `ShortcutIsland` section header when none of its shortcuts match
- Highlight the matching substring within displayed labels
- Auto-focus the input when the dialog opens

**Non-Goals:**
- Fuzzy/partial-word matching (simple `includes` is sufficient)
- Searching by key binding characters (e.g., typing "Ctrl" to find shortcuts)
- Persisting the search query across dialog open/close cycles
- Any backend or network changes

## Decisions

### 1. Placement: search input in the dialog title bar (upper right corner)

**Decision:** Place the search input inline in the `Dialog` title bar by passing a React fragment as the `title` prop — containing both the heading text and the `<input>`. Override `.HelpDialog .Dialog__title` in `HelpDialog.scss` to `display: flex; align-items: center; justify-content: space-between;` so the input floats to the right.

**Rationale:** The `Dialog` component accepts `title: React.ReactNode`, making this a zero-change extension point. The `Dialog__title` h2 already has a bottom border that visually separates the title bar from the content — putting the search there is the natural "upper right corner" position. No changes to `Dialog.tsx` needed.

**Alternative considered:** Position the input absolutely (`position: absolute; top: ...; right: 0`) relative to `Dialog__content`. Rejected — fragile to title bar height changes and requires negative `top` values.

**Alternative considered:** Add a new `titleRight` prop to `Dialog.tsx`. Rejected — unnecessary API surface change for a single use case.

**Styling:** The input SHALL use existing CSS variables (`--color-surface-mid`, `--border-radius-lg`, `--text-primary-color`, `--dialog-border-color`) to match the `HelpDialog__btn` aesthetic — same border-radius, same muted background, consistent font size.

---

### 2. State location: local `useState` in `HelpDialog`

**Decision:** Add a single `useState<string>` (`searchQuery`) inside the `HelpDialog` component.

**Rationale:** The search is purely UI-local with no cross-component effect. Lifting it to app state (`appState`) would add unnecessary noise to the global state shape. React context is overkill for a single string shared within one component tree.

**Alternative considered:** Store in `appState.openDialog` — rejected because it couples a transient UI concern to persistent app state and would require wiring through action handlers.

---

### 2. Filtering strategy: prop-level filtering in `ShortcutIsland`

**Decision:** Pass `searchQuery` down to `ShortcutIsland`, which filters its `children` (the `<Shortcut>` elements) and returns `null` when no children match.

**Rationale:** `Shortcut` components are already rendered as JSX children of `ShortcutIsland`. The cleanest approach is to filter `React.Children` inside `ShortcutIsland` based on each child's `label` prop, keeping the change contained.

**Alternative considered:** Lift all shortcut data into an array structure and derive JSX — this would require a larger refactor of the static JSX in `HelpDialog.tsx` (500+ lines) and is out of scope.

---

### 3. Match highlighting: wrap matching substring in `<mark>`

**Decision:** In the `Shortcut` component, when a `searchQuery` is active, split the label on the matching substring and wrap the match in a `<mark>` element styled via `HelpDialog.scss`.

**Rationale:** `<mark>` is semantically correct for highlighted search matches and requires minimal CSS. No third-party library needed.

---

### 4. Localization: add a single key to `en.json`

**Decision:** Add `helpDialog.searchPlaceholder` to `en.json` for the input placeholder text; no new label string is needed because the input's purpose is self-evident from its position.

**Rationale:** Consistent with how other dialog input strings are handled in the codebase.

## Risks / Trade-offs

- **React.Children filtering fragility** → If `ShortcutIsland` children are ever wrapped in fragments or non-`Shortcut` elements, the `label` prop lookup will silently fail to filter them. Mitigation: add a defensive `child.props?.label` check.
- **Performance with 70+ shortcuts** → Filtering on every keystroke is O(n) over a tiny fixed list; no debouncing needed.
- **Accessibility** → The `<input>` must have an accessible label (`aria-label` or associated `<label>`). Use `aria-label={t("helpDialog.searchPlaceholder")}`.
