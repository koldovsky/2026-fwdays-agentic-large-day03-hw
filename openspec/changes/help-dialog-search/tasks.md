## 1. Localization

- [ ] 1.1 Add `helpDialog.searchPlaceholder` key to `packages/excalidraw/locales/en.json` with value `"Search shortcuts…"`

## 2. Search State & Input

- [ ] 2.1 Add `searchQuery` state (`useState<string>("")`) to the `HelpDialog` component in `HelpDialog.tsx`
- [ ] 2.2 Change the `Dialog` `title` prop in `HelpDialog` from a plain string to a React fragment containing both the title text and a controlled `<input className="HelpDialog__search">` bound to `searchQuery`, with `autoFocus` and `aria-label`
- [ ] 2.3 Override `.HelpDialog .Dialog__title` in `HelpDialog.scss` to `display: flex; align-items: center; justify-content: space-between` so the input floats to the upper right
- [ ] 2.4 Style `.HelpDialog__search` using existing CSS variables (`--color-surface-mid`, `--border-radius-lg`, `--text-primary-color`, `--dialog-border-color`) to match the `HelpDialog__btn` aesthetic (same border-radius, muted background, consistent font size ~0.75rem)

## 3. Filtering Logic in ShortcutIsland

- [ ] 3.1 Accept an optional `searchQuery` prop in the `ShortcutIsland` component
- [ ] 3.2 Filter `React.Children` inside `ShortcutIsland` to keep only `<Shortcut>` children whose `label` prop contains the query (case-insensitive, guard with `child.props?.label`)
- [ ] 3.3 Return `null` from `ShortcutIsland` when the filtered children list is empty (hides section header and container)
- [ ] 3.4 Pass `searchQuery` from `HelpDialog` to every `ShortcutIsland` instance

## 4. Match Highlighting in Shortcut

- [ ] 4.1 Accept an optional `searchQuery` prop in the `Shortcut` component
- [ ] 4.2 When `searchQuery` is non-empty and matches the label, split the label string and wrap the matching substring in `<mark>` element
- [ ] 4.3 Add minimal `.help-dialog mark` styles in `HelpDialog.scss` (e.g., background highlight color, no border-radius needed)
- [ ] 4.4 Pass `searchQuery` from `HelpDialog` (or via `ShortcutIsland`) to every `<Shortcut>` instance

## 5. Testing & Cleanup

- [ ] 5.1 Run `yarn test:typecheck` and fix any TypeScript errors
- [ ] 5.2 Run `yarn test:update` and update snapshots if HelpDialog snapshots exist
- [ ] 5.3 Manual smoke-test: open help dialog, verify search input is in upper right of title bar; type "zoom" → only zoom shortcuts visible; type "ZOOM" → same results (case-insensitive); clear → all restored
