## 1. Add keyTest to action

- [x] 1.1 Add `keyTest` function to `actionWrapTextInContainer` in `packages/excalidraw/actions/actionBoundText.tsx` that returns `true` when `event.altKey && event.shiftKey && !event[KEYS.CTRL_OR_CMD] && event.key.toLocaleLowerCase() === KEYS.W`

## 2. Register display shortcut

- [x] 2.1 Add `"wrapTextInContainer"` to the `ShortcutName` type union in `packages/excalidraw/actions/shortcuts.ts`
- [x] 2.2 Add `wrapTextInContainer: [getShortcutKey("Shift+Alt+W")]` entry to `shortcutMap` in `packages/excalidraw/actions/shortcuts.ts`

## 3. Verify

- [x] 3.1 Run `yarn test:typecheck` to confirm no type errors
- [x] 3.2 Run relevant tests with `yarn test:update` to ensure no regressions
