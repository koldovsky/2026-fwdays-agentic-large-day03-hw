# Decision Log

## 2026-04-04: Shortcut `Alt+D` instead of key `9` for stroke style toggle

**Context:** Issue #11095 proposes key `9` for stroke style cycling, but `9` is already bound to the Image tool in `SHAPES` array.

**Decision:** Use `Alt+D` (Alt + letter pattern) with `keyTest` on the existing `actionChangeStrokeStyle` action.

**Consequences:**
- No conflict with existing shortcuts (`Alt+Shift+D` is theme toggle — different binding)
- Follows established `Alt+<letter>` convention (`Alt+Z`, `Alt+S`, `Alt+R`)
- "D" mnemonic for Dash/Dotted
- Action manager intercepts before tool-switching pipeline — zero changes to tool selection code
