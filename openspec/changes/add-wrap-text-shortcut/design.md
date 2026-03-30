## Context

Excalidraw's `actionWrapTextInContainer` action wraps selected unbound text elements in rectangle containers. It is currently only reachable through the right-click context menu. The action system supports keyboard shortcuts via an optional `keyTest` function on each action, dispatched centrally through `ActionManager.handleKeyDown`. A separate `shortcutMap` in `shortcuts.ts` provides display strings for the help dialog and context menu `<kbd>` labels.

## Goals / Non-Goals

**Goals:**
- Bind Alt+Shift+W (Option+Shift+W on macOS) to `actionWrapTextInContainer`
- Display the shortcut in the context menu next to the action label
- Follow existing codebase patterns exactly

**Non-Goals:**
- Changing the wrap-text behavior itself (container type, sizing, binding logic)
- Adding the shortcut to the properties panel or toolbar
- Making the shortcut user-configurable

## Decisions

### 1. Shortcut choice: Alt+Shift+W

**Rationale:** "W" is mnemonic for "Wrap". Alt+Shift is the same modifier pattern used by `toggleTheme` (Shift+Alt+D) and avoids collision with Ctrl/Cmd combos reserved for system/browser actions. Grep of the codebase confirms no existing action uses Alt+Shift+W.

**Alternatives considered:**
- Ctrl+Shift+W — conflicts with browser "close window" shortcut
- Ctrl+W — conflicts with browser "close tab"
- Single key (like `F` for frame tool) — too easy to trigger accidentally during text editing

### 2. Implementation via `keyTest` function

**Rationale:** This is the established pattern for keyboard shortcuts in Excalidraw's action system. `keyTest` receives the keyboard event and returns a boolean. `ActionManager.handleKeyDown` iterates actions sorted by `keyPriority`, finds the single matching action, and calls its `perform`.

**Alternatives considered:**
- Adding a declarative `shortcut` property — would require refactoring the entire action system; not warranted for a single binding

### 3. Display shortcut via `shortcutMap` in `shortcuts.ts`

**Rationale:** The `ShortcutName` type and `shortcutMap` drive context menu `<kbd>` labels. Adding an entry here ensures the shortcut is visible to users without changing any rendering logic. The context menu already calls `getShortcutFromShortcutName(action.name)` for each action.

## Risks / Trade-offs

- **[Low] Shortcut collision** — Alt+Shift+W is unused in the codebase today, but browser extensions or OS-level shortcuts could shadow it on some platforms. → Mitigation: This is the same risk all Excalidraw shortcuts face; no special handling needed.
- **[Low] Multi-action match warning** — If `keyTest` accidentally matches multiple actions, `handleKeyDown` logs a warning and cancels. → Mitigation: The `keyTest` is narrowly scoped (checks all three modifiers + key).
