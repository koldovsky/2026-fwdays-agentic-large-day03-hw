# Context Menu Architecture

> Technical reference for the Excalidraw context menu system: rendering, item registration, filtering, and extension points.

## Overview

The context menu is a flat, action-based menu rendered on right-click. Items are drawn from the same `Action` pool used by keyboard shortcuts, toolbar, and command palette. There is **no native support for nested/sub-menus** in the context menu — only a flat list with visual separators.

A separate `DropdownMenu` component system exists (with full sub-menu support), but it is **not** used for the context menu.

## Key Files

| File | Role |
|---|---|
| `packages/excalidraw/components/ContextMenu.tsx` | React component — renders the menu |
| `packages/excalidraw/components/ContextMenu.scss` | Styling |
| `packages/excalidraw/actions/types.ts` | `Action` interface, `ActionName` union type |
| `packages/excalidraw/actions/register.ts` | `register()` helper — adds actions to global pool |
| `packages/excalidraw/actions/manager.tsx` | `ActionManager` — stores and executes actions |
| `packages/excalidraw/components/App.tsx` | `handleCanvasContextMenu()` + `getContextMenuItems()` |
| `packages/excalidraw/actions/actionBoundText.tsx` | Text-specific actions (bind/unbind/wrap/autoResize) |

## Types

```typescript
// An item is either a separator or an Action
export type ContextMenuItem = typeof CONTEXT_MENU_SEPARATOR | Action;
export type ContextMenuItems = (ContextMenuItem | false | null | undefined)[];
export const CONTEXT_MENU_SEPARATOR = "separator";

// Stored in AppState
contextMenu: {
  items: ContextMenuItems;
  top: number;
  left: number;
} | null;
```

## How the Menu Opens

1. Right-click on canvas triggers `handleCanvasContextMenu` (App.tsx:12198)
2. Hit-tests the click point to determine if an element or empty canvas was clicked
3. Determines menu type: `"canvas"` or `"element"`
4. If clicking an unselected element, selects it first
5. Calls `getContextMenuItems(type)` to build the item list
6. Sets `contextMenu` in appState with position and items

```typescript
// App.tsx:12238
this.setState(
  { /* select element if needed */ },
  () => {
    this.setState({
      contextMenu: { top, left, items: this.getContextMenuItems(type) },
    });
  },
);
```

## How Items Are Assembled

`getContextMenuItems()` (App.tsx:12610) builds two distinct menus:

### Canvas Context Menu (right-click on empty space)

```
actionPaste
────────────────
actionCopyAsPng, actionCopyAsSvg, copyText
────────────────
actionSelectAll, actionUnlockAllElements
────────────────
actionToggleGridMode, actionToggleObjectsSnapMode,
actionToggleArrowBinding, actionToggleMidpointSnapping,
actionToggleZenMode, actionToggleViewMode, actionToggleStats
```

### Element Context Menu (right-click on element)

```
actionCut, actionCopy, actionPaste
────────────────
actionSelectAllElementsInFrame, actionRemoveAllElementsFromFrame, actionWrapSelectionInFrame
────────────────
actionToggleCropEditor
────────────────
actionCopyAsPng, actionCopyAsSvg, copyText
────────────────
actionCopyStyles, actionPasteStyles
────────────────
actionGroup, actionTextAutoResize, actionUnbindText,
actionBindText, actionWrapTextInContainer, actionUngroup
────────────────
actionAddToLibrary
actionSendBackward, actionBringForward, actionSendToBack, actionBringToFront  (desktop only)
────────────────
actionFlipHorizontal, actionFlipVertical
────────────────
actionToggleLinearEditor
────────────────
actionLink, actionCopyElementLink
────────────────
actionDuplicateSelection, actionToggleElementLock
────────────────
actionDeleteSelected
```

## Item Filtering (Predicate System)

Before rendering, items are filtered by their `predicate` function:

```typescript
// ContextMenu.tsx:38
const filteredItems = items.reduce((acc, item) => {
  if (
    item &&
    (item === CONTEXT_MENU_SEPARATOR ||
      !item.predicate ||
      item.predicate(elements, appState, actionManager.app.props, actionManager.app))
  ) {
    acc.push(item);
  }
  return acc;
}, []);
```

- Items without a `predicate` are **always shown**
- Items with a `predicate` are shown only when it returns `true`
- Consecutive/leading separators are automatically hidden

## Rendering

The `ContextMenu` component (ContextMenu.tsx):
- Wraps in `<Popover>` for positioning and viewport fitting
- Renders `<ul class="context-menu">` with `<li>` buttons
- Shows keyboard shortcuts via `getShortcutFromShortcutName()`
- Shows checkmarks for toggle actions via `item.checked?.(appState)`
- Applies `dangerous` CSS class for delete action (red text)
- On click: closes menu first, then executes action via `actionManager.executeAction(item, "contextMenu")`

## Text Element Context Menu Actions

Four text-specific actions appear in the element context menu, controlled by predicates:

### `actionUnbindText`
- **Shows when:** selected element has bound text (`hasBoundTextElement(element)`)
- **Does:** detaches text from container, recalculates dimensions

### `actionBindText`
- **Shows when:** exactly 2 elements selected — one text + one bindable container with no existing bound text
- **Does:** binds text into container, centers it

### `actionWrapTextInContainer`
- **Shows when:** selected text element(s) not already bound to a container
- **Does:** creates a new rectangle container around each text element

### `actionTextAutoResize`
- **Shows when:** single text element with `autoResize === false`
- **Does:** toggles auto-resize behavior

## Adding Custom Context Menu Items

### Method 1: Internal — `register()` + hardcode in `getContextMenuItems()`

This is how all built-in items work:

```typescript
// 1. Define the action
export const actionMyFeature = register({
  name: "myFeature",       // must be added to ActionName union type
  label: "labels.myFeature",
  trackEvent: { category: "element" },
  predicate: (elements, appState, _, app) => {
    // Return true to show in context menu
    const selected = app.scene.getSelectedElements(appState);
    return selected.some((el) => isTextElement(el));
  },
  perform: (elements, appState, _, app) => {
    // Execute action
    return { elements, appState, captureUpdate: CaptureUpdateAction.IMMEDIATELY };
  },
});

// 2. Add to getContextMenuItems() in App.tsx
return [
  ...existingItems,
  actionMyFeature,  // Add here
  ...moreItems,
];
```

### Method 2: External — `registerAction()` via Imperative API

For consumers of the `@excalidraw/excalidraw` package:

```typescript
const excalidrawAPI = useExcalidrawAPI();

excalidrawAPI.registerAction({
  name: "myCustomAction",
  label: "My Custom Action",
  perform: (elements, appState, value, app) => {
    return { elements, appState, captureUpdate: CaptureUpdateAction.IMMEDIATELY };
  },
  predicate: (elements, appState, appProps, app) => true,
  trackEvent: { category: "element" },
});
```

**Limitation:** `registerAction()` adds the action to `ActionManager` but does **not** automatically add it to the context menu item list. The action becomes available for keyboard shortcuts and command palette, but to appear in the context menu, it must be explicitly included in the `getContextMenuItems()` return array.

## Nested Menus — Not Supported

The context menu renders a **flat `<ul>` list**. There is no concept of children, sub-items, or expandable groups in `ContextMenuItem` or the rendering logic.

The codebase does have a `DropdownMenu` component system (`packages/excalidraw/components/dropdownMenu/`) with full sub-menu support via `DropdownMenuSub`, `DropdownMenuSubTrigger`, and `DropdownMenuSubContent`. However, this system is used for the main app menu (hamburger), **not** for the canvas context menu.

### To add nested menus, you would need to:

1. **Extend `ContextMenuItem` type** to support a `children` or `submenu` property
2. **Modify `ContextMenu.tsx`** rendering to detect sub-items and render nested `<ul>` or integrate the existing `DropdownMenuSub` component
3. **Add CSS** for submenu positioning (flyout to the right, viewport boundary handling)
4. **Update `getContextMenuItems()`** to return nested structures

Alternatively, refactor the context menu to use the existing `DropdownMenu` component system, which already handles sub-menus.

## Sequence Diagram

```
Right-click on canvas
       │
       ▼
handleCanvasContextMenu()
       │
       ├── hit-test: element or empty canvas?
       │
       ├── select element (if not already selected)
       │
       ▼
getContextMenuItems("canvas" | "element")
       │
       ├── builds flat array of Actions + separators
       │
       ▼
setState({ contextMenu: { top, left, items } })
       │
       ▼
ContextMenu component renders
       │
       ├── filters items via predicate()
       ├── hides invalid separators
       ├── renders <Popover> → <ul> → <li> buttons
       │
       ▼
User clicks item
       │
       ├── onClose() clears contextMenu state
       ├── actionManager.executeAction(item, "contextMenu")
       │
       ▼
Action.perform() executes → returns new state
```
