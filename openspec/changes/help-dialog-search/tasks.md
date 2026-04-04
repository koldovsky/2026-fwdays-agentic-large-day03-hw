## 1. Localization

- [ ] 1.1 Add `helpDialog.searchPlaceholder` key to `packages/excalidraw/locales/en.json` with value `"Search shortcuts…"`
- [ ] 1.2 Add `helpDialog.searchShortcuts` key to `packages/excalidraw/locales/en.json` with value `"Search shortcuts"` (used as `aria-label` on the icon button)

## 2. Search State & Toggle

- [ ] 2.1 Add `searchActive` state (`useState<boolean>(false)`) and `searchQuery` state (`useState<string>("")`) to `HelpDialog`
- [ ] 2.2 Add a `useRef<HTMLInputElement>` for the search input to enable programmatic focus
- [ ] 2.3 Render a magnifying glass icon `<button>` in the upper-right of the dialog title bar (using an existing SVG icon from the Excalidraw icon set) when `searchActive` is `false`; button click sets `searchActive = true` and focuses the input
- [ ] 2.4 When `searchActive` is `true`, replace the icon button with a controlled `<input>` bound to `searchQuery`, using `aria-label={t("helpDialog.searchPlaceholder")}`
- [ ] 2.5 Attach a `keydown` listener on the dialog root: when a single printable key is pressed (`e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey`) and `!searchActive`, set `searchActive = true`, append the character to `searchQuery`, and focus the input — do NOT swallow `Escape`

## 3. Input Styling

- [ ] 3.1 Style the search input in `HelpDialog.scss`: `border: none`, `outline: none`, `border-bottom: 1px solid var(--color-border)` (or closest design token), `background: transparent`, width fills available header space
- [ ] 3.2 Position the icon button and input in the upper-right of the title bar using flexbox on the existing header row; ensure consistent vertical alignment with the dialog title text
- [ ] 3.3 Style the magnifying glass button to be visually consistent with other icon buttons in the dialog (size, color, hover state)

## 4. Fixed Dialog Size During Filtering

- [ ] 4.1 Identify the scrollable shortcuts container element in `HelpDialog.tsx`
- [ ] 4.2 Set a `min-height` on that container in `HelpDialog.scss` that matches the fully-populated list height, so the dialog does not shrink when shortcuts are filtered out
- [ ] 4.3 Ensure filtered-out `<Shortcut>` rows use `display: none` (not `visibility: hidden`) so no blank gaps appear within sections

## 5. Filtering Logic in ShortcutIsland

- [ ] 5.1 Accept an optional `searchQuery` prop in the `ShortcutIsland` component
- [ ] 5.2 Filter `React.Children` inside `ShortcutIsland` to keep only `<Shortcut>` children whose `label` prop contains the query string (case-insensitive); guard with `child.props?.label` check
- [ ] 5.3 Return `null` from `ShortcutIsland` when the filtered children list is empty (hides section header and container)
- [ ] 5.4 Pass `searchQuery` from `HelpDialog` to every `ShortcutIsland` instance

## 6. Match Highlighting in Shortcut

- [ ] 6.1 Accept an optional `searchQuery` prop in the `Shortcut` component
- [ ] 6.2 When `searchQuery` is non-empty and matches the label, split the label string on the first case-insensitive match and wrap the matching substring in `<mark>`
- [ ] 6.3 Add `.help-dialog mark` styles in `HelpDialog.scss` (background highlight color using a design token, no border-radius needed)
- [ ] 6.4 Pass `searchQuery` from `HelpDialog` down through `ShortcutIsland` to every `<Shortcut>` instance

## 7. Testing & Cleanup

- [ ] 7.1 Run `yarn test:typecheck` and fix any TypeScript errors
- [ ] 7.2 Run `yarn test:update` and update snapshots if HelpDialog snapshots exist
- [ ] 7.3 Manual smoke-test: open help dialog → magnifying glass icon visible; click icon → input appears with underline only; type "zoom" → only zoom shortcuts visible, dialog size unchanged; clear → all restored
- [ ] 7.4 Manual smoke-test: open help dialog → start typing "sel" without clicking icon → search activates immediately with "sel" in the input and shortcuts filtered
