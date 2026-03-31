## Context

The Excalidraw toolbar renders tool icons via the `ShapesSwitcher` component in `packages/excalidraw/components/Actions.tsx`. Each tool in the `SHAPES` array (defined in `shapes.tsx`) has a `key` (keyboard shortcut) and `numericKey` (number row shortcut). The `ShapesSwitcher` computes a `keybindingLabel` for each tool and passes it to `ToolButton`, which renders it as a small superscript overlay via the `.ToolIcon__keybinding` CSS class.

Currently, line ~1104 of `Actions.tsx` explicitly sets `keybindingLabel` to `undefined` when `value === "hand"`, preventing the "H" label from appearing. All other tools display their shortcut. The hand tool has `key: KEYS.H` and `numericKey: null` in `SHAPES`, so removing the exclusion would naturally produce `letter` ("H") as the label.

A separate `HandButton` component exists in `HandButton.tsx` and already passes `keyBindingLabel={!props.isMobile ? KEYS.H.toLocaleUpperCase() : undefined}`, but it is only used in the mobile toolbar (always with `isMobile=true`). The desktop toolbar uses `ShapesSwitcher` exclusively.

## Goals / Non-Goals

**Goals:**
- Display the "H" keyboard shortcut label on the hand tool icon in the desktop toolbar, matching the pattern of all other tools
- Maintain the existing behavior of hiding shortcut labels on mobile

**Non-Goals:**
- Changing `HandButton` or mobile toolbar behavior
- Adding a numeric key shortcut to the hand tool
- Redesigning the toolbar shortcut label system

## Decisions

### Decision 1: Remove the hand-tool exclusion in `ShapesSwitcher`

**Approach**: Change the `keybindingLabel` computation in `Actions.tsx` from:
```
const keybindingLabel = value === "hand" ? undefined : numericKey || letter;
```
to:
```
const keybindingLabel = numericKey || letter;
```

**Rationale**: The hand tool already has `key: KEYS.H` in `SHAPES`, so the generic formula `numericKey || letter` naturally produces `"H"` for it. No special handling is needed. This is the simplest, most consistent fix — it treats hand like every other tool.

**Alternatives considered**:
- *Use `HandButton` on desktop*: Would require refactoring `ShapesSwitcher` to special-case the hand tool rendering. Unnecessary complexity for a one-line fix.
- *Add `numericKey` to hand tool*: Not desirable — the hand tool intentionally has no number-row shortcut since it's not a drawing tool.

## Risks / Trade-offs

- **[Low risk] Intentional omission**: The original exclusion may have been intentional (perhaps to visually distinguish the hand tool from drawing tools). However, the GitHub issue confirms this is perceived as a bug by users, and the `HandButton` component already supports showing "H" on non-mobile, suggesting the label was always intended.
- **Mitigation**: The change is trivial to revert if the original exclusion was intentional.
