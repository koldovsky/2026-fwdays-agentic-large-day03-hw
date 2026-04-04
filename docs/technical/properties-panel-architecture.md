# Properties Panel Architecture

> Technical reference for the Excalidraw properties/settings panel that appears when a visual element is selected.

## Overview

When a user selects an element on the canvas, a **properties panel** (also called "shape actions") appears with controls for adjusting visual attributes: stroke color, background, font, opacity, layers, etc. The panel is built on top of the same **Action system** used by context menus and keyboard shortcuts, specifically leveraging the `PanelComponent` field of each `Action`.

## Key Files

| File | Role |
|---|---|
| `packages/excalidraw/components/Actions.tsx` | `SelectedShapeActions`, `CompactShapeActions`, `MobileShapeActions` — three layout variants |
| `packages/excalidraw/components/LayerUI.tsx` | Decides which variant to render based on `stylesPanelMode` |
| `packages/excalidraw/actions/actionProperties.tsx` | All property-changing actions with `PanelComponent` UI |
| `packages/excalidraw/actions/manager.tsx` | `ActionManager.renderAction()` — renders a `PanelComponent` by action name |
| `packages/excalidraw/actions/types.ts` | `Action` interface with `PanelComponent` and `PanelComponentProps` |
| `packages/excalidraw/actions/register.ts` | `register()` — adds actions to global pool |
| `packages/excalidraw/components/PropertiesPopover.tsx` | Radix Popover wrapper used in compact mode for collapsible groups |

## Core Mechanism: Action + PanelComponent

Every property control is a registered `Action` with a `PanelComponent`:

```typescript
// Action interface (types.ts:163)
export interface Action<TData = any> {
  name: ActionName;
  label: string | ((...) => string);
  PanelComponent?: React.FC<PanelComponentProps>;  // ← The UI control
  perform: ActionFn<TData>;                        // ← State mutation
  predicate?: (...) => boolean;                    // ← Visibility
  // ...
}

// PanelComponentProps (types.ts:150)
export type PanelComponentProps = {
  elements: readonly ExcalidrawElement[];
  appState: AppState;
  updateData: <T = any>(formData?: T) => void;     // ← Triggers perform()
  appProps: ExcalidrawProps;
  data?: Record<string, any>;
  app: AppClassProperties;
  renderAction: (name: ActionName, data?) => JSX.Element | null;  // ← Nest other actions
};
```

### How `renderAction()` works

`ActionManager.renderAction(name)` (manager.tsx:148):

1. Looks up the action by name in `this.actions`
2. Checks `UIOptions.canvasActions` for permission
3. Creates an `updateData` callback that:
   - Tracks the event
   - Calls `action.perform(elements, appState, formData, app)`
   - Feeds result into `this.updater` to apply state changes
4. Returns `<PanelComponent elements={...} appState={...} updateData={updateData} ... />`

## Concrete Example: Stroke Width

```typescript
// actionProperties.tsx:547
export const actionChangeStrokeWidth = register<ExcalidrawElement["strokeWidth"]>({
  name: "changeStrokeWidth",
  label: "labels.strokeWidth",
  trackEvent: false,
  
  perform: (elements, appState, value) => {
    return {
      elements: changeProperty(elements, appState, (el) =>
        newElementWith(el, { strokeWidth: value }),
      ),
      appState: { ...appState, currentItemStrokeWidth: value },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
  
  PanelComponent: ({ elements, appState, updateData, app }) => (
    <fieldset>
      <legend>{t("labels.strokeWidth")}</legend>
      <div className="buttonList">
        <RadioSelection
          group="stroke-width"
          options={[
            { value: STROKE_WIDTH.thin, text: t("labels.thin"), icon: StrokeWidthBaseIcon },
            { value: STROKE_WIDTH.bold, text: t("labels.bold"), icon: StrokeWidthBoldIcon },
            { value: STROKE_WIDTH.extraBold, text: t("labels.extraBold"), icon: StrokeWidthExtraBoldIcon },
          ]}
          value={getFormValue(elements, app, (el) => el.strokeWidth, ...)}
          onChange={(value) => updateData(value)}
        />
      </div>
    </fieldset>
  ),
});
```

## All Registered Property Actions

| Action Name | Control Type | When Visible |
|---|---|---|
| `changeStrokeColor` | `ColorPicker` | Element has stroke color |
| `changeBackgroundColor` | `ColorPicker` | Element has background |
| `changeFillStyle` | `RadioSelection` (hachure/cross-hatch/solid) | Background is not transparent |
| `changeStrokeWidth` | `RadioSelection` (thin/bold/extra-bold) | Element has stroke width |
| `changeStrokeShape` | `RadioSelection` | Freedraw elements |
| `changeStrokeStyle` | `RadioSelection` (solid/dashed/dotted) | Element has stroke style |
| `changeSloppiness` | `RadioSelection` (architect/artist/cartoonist) | Element has stroke style |
| `changeRoundness` | `RadioSelection` (sharp/round) | Element supports roundness |
| `changeOpacity` | Range slider | Always (all elements) |
| `changeFontFamily` | `FontPicker` dropdown | Text elements |
| `changeFontSize` | `RadioSelection` (S/M/L/XL) | Text elements |
| `changeTextAlign` | `RadioSelection` (left/center/right) | Text with horizontal align |
| `changeVerticalAlign` | `RadioSelection` (top/middle/bottom) | Bound text in container |
| `changeArrowType` | `RadioSelection` (sharp/round/elbow) | Arrow elements |
| `changeArrowhead` | `RadioSelection` (various heads) | Arrow elements |
| `changeArrowProperties` | Composite (type + heads + binding) | Arrow elements (compact mode) |

## Panel Layout Variants

The panel has three rendering modes, determined by `useStylesPanelMode()`:

### 1. Full Mode — `SelectedShapeActions` (Actions.tsx:137)

Used on wide desktop viewports. All controls visible at once in a vertical sidebar:

```
┌─────────────────────────┐
│ [Stroke Color]          │  ← ColorPicker
│ [Background Color]      │  ← ColorPicker
│ [Fill Style]            │  ← RadioSelection
│ [Stroke Width]          │  ← RadioSelection
│ [Stroke Style]          │  ← RadioSelection
│ [Sloppiness]            │  ← RadioSelection
│ [Roundness]             │  ← RadioSelection
│ [Arrow Type]            │  ← RadioSelection (arrows only)
│ [Font Family]           │  ← FontPicker (text only)
│ [Font Size]             │  ← RadioSelection (text only)
│ [Text Align]            │  ← RadioSelection (text only)
│ [Vertical Align]        │  ← RadioSelection (text only)
│ [Arrowhead]             │  ← RadioSelection (arrows only)
│ [Opacity]               │  ← Range slider
│ ═══ Layers ════════════ │
│ [Back][↓][↑][Front]     │  ← Layer buttons
│ ═══ Align ═════════════ │  (multiple selection only)
│ [L][C][R] [Distribute]  │
│ [T][M][B] [Distribute]  │
│ ═══ Actions ═══════════ │
│ [Dup][Del][Group]...    │
└─────────────────────────┘
```

### 2. Compact Mode — `CompactShapeActions` (Actions.tsx:787)

Used on narrower viewports. Uses Radix `Popover` for collapsible groups:

```
┌──────────────────────────────────────────┐
│ [Color] [BgColor] [⚙] [→] [✏] [Aa] [🔧]│
└──────────────────────────────────────────┘
         ↓ click ⚙
    ┌──────────────┐
    │ Fill Style   │
    │ Stroke Width │   ← PropertiesPopover
    │ Stroke Style │
    │ Opacity      │
    └──────────────┘
```

Compact groups:
- `CombinedShapeProperties` — fill, stroke width, stroke style, sloppiness, roundness, opacity
- `CombinedArrowProperties` — arrow type, arrowheads
- `CombinedTextProperties` — font size, text align, vertical align
- `CombinedExtraActions` — group, ungroup, link, lock, etc.

### 3. Mobile Mode — `MobileShapeActions` (Actions.tsx:896)

Similar to compact but optimized for phone viewports.

## Element-Type Visibility Logic

Controls are shown/hidden based on the selected element type. This is done via **conditional rendering** in `SelectedShapeActions`, using helper functions:

```typescript
// Helper functions from packages/excalidraw/scene/
canChangeStrokeColor(appState, targetElements)  // has stroke?
canChangeBackgroundColor(appState, targetElements)  // has background?
hasStrokeWidth(type)  // rectangle, ellipse, arrow, etc.
hasStrokeStyle(type)  // supports dashed/dotted?
canChangeRoundness(type)  // rectangle, diamond, etc.
canHaveArrowheads(type)  // arrow only
isTextElement(element)  // text only
shouldAllowVerticalAlign(elements, map)  // text bound to container

// Usage in SelectedShapeActions:
{canChangeStrokeColor(appState, targetElements) &&
  renderAction("changeStrokeColor")}

{(appState.activeTool.type === "text" ||
  targetElements.some(isTextElement)) && (
  <>
    <fieldset>{renderAction("changeFontFamily")}</fieldset>
    {renderAction("changeFontSize")}
  </>
)}
```

### Element Type → Visible Controls Matrix

| Control | Rect | Ellipse | Diamond | Arrow | Line | Freedraw | Text | Image | Frame |
|---|---|---|---|---|---|---|---|---|---|
| Stroke Color | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - | - |
| Background | ✓ | ✓ | ✓ | - | ✓* | - | - | - | - |
| Fill Style | ✓ | ✓ | ✓ | - | ✓* | - | - | - | - |
| Stroke Width | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - | - | - |
| Stroke Style | ✓ | ✓ | ✓ | ✓ | ✓ | - | - | - | - |
| Sloppiness | ✓ | ✓ | ✓ | ✓ | ✓ | - | - | - | - |
| Roundness | ✓ | - | ✓ | - | - | - | - | - | - |
| Arrow Type | - | - | - | ✓ | - | - | - | - | - |
| Arrowheads | - | - | - | ✓ | - | - | - | - | - |
| Font Family | - | - | - | - | - | - | ✓ | - | - |
| Font Size | - | - | - | - | - | - | ✓ | - | - |
| Text Align | - | - | - | - | - | - | ✓ | - | - |
| Opacity | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Layers | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

*Line supports background/fill when closed or used as a filled shape.

## Nesting & Grouping

### Fieldset Grouping (Full Mode)

Controls are grouped visually with `<fieldset>` + `<legend>`:

```tsx
<fieldset>
  <legend>{t("labels.layers")}</legend>
  <div className="buttonList">
    {renderAction("sendToBack")}
    {renderAction("sendBackward")}
    {renderAction("bringForward")}
    {renderAction("bringToFront")}
  </div>
</fieldset>
```

### Collapsible Popovers (Compact Mode)

Each `Combined*Properties` component wraps related controls in a Radix `Popover`:

```tsx
<Popover.Root open={isOpen} onOpenChange={...}>
  <Popover.Trigger asChild>
    <button className="compact-action-button properties-trigger">
      {icon}
    </button>
  </Popover.Trigger>
  {isOpen && (
    <PropertiesPopover container={container} style={{ maxWidth: "13rem" }}>
      <div className="selected-shape-actions">
        {renderAction("changeFillStyle")}
        {renderAction("changeStrokeWidth")}
        ...
      </div>
    </PropertiesPopover>
  )}
</Popover.Root>
```

### Nested Actions

A `PanelComponent` can render other actions via the `renderAction` prop:

```tsx
PanelComponent: ({ renderAction }) => (
  <div>
    {renderAction("changeArrowType")}      // embeds another action's UI
    {renderAction("changeArrowhead")}
  </div>
)
```

This is used by `changeArrowProperties` in compact mode to combine arrow type + arrowheads into a single popover.

## How to Add a New Property Control

### Step 1: Add `ActionName` to the union type

```typescript
// actions/types.ts
export type ActionName =
  | "copy"
  | "cut"
  // ... existing names ...
  | "myNewProperty";  // ← add here
```

### Step 2: Create the action with `PanelComponent`

```typescript
// actions/actionProperties.tsx (or a new file)
export const actionChangeMyProperty = register<string>({
  name: "myNewProperty",
  label: "labels.myNewProperty",
  trackEvent: false,
  
  perform: (elements, appState, value) => {
    return {
      elements: changeProperty(elements, appState, (el) =>
        newElementWith(el, { myProperty: value }),
      ),
      appState: { ...appState, currentItemMyProperty: value },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
  
  PanelComponent: ({ elements, appState, updateData, app }) => (
    <fieldset>
      <legend>{t("labels.myNewProperty")}</legend>
      <RadioSelection
        group="my-property"
        options={[
          { value: "optionA", text: "Option A", icon: iconA },
          { value: "optionB", text: "Option B", icon: iconB },
        ]}
        value={getFormValue(
          elements, app,
          (el) => el.myProperty,
          (el) => el.hasOwnProperty("myProperty"),
          (hasSelection) => hasSelection ? null : appState.currentItemMyProperty,
        )}
        onChange={(value) => updateData(value)}
      />
    </fieldset>
  ),
});
```

### Step 3: Add to `SelectedShapeActions` rendering

```typescript
// components/Actions.tsx — in SelectedShapeActions
{targetElements.some((el) => el.type === "myType") &&
  renderAction("myNewProperty")}
```

### Step 4 (optional): Add to compact mode

Create a `Combined*Properties` wrapper or add to an existing one.

### Step 5: Export from actions index

```typescript
// actions/index.ts
export { actionChangeMyProperty } from "./actionProperties";
```

## Reusable UI Components for Controls

| Component | Path | Used For |
|---|---|---|
| `ColorPicker` | `components/ColorPicker/ColorPicker.tsx` | Stroke & background color |
| `RadioSelection` | `components/RadioSelection.tsx` | Discrete options (width, style, size) |
| `Range` | `components/Range.tsx` | Continuous values (opacity) |
| `FontPicker` | `components/FontPicker/FontPicker.tsx` | Font family dropdown |
| `IconPicker` | `components/IconPicker.tsx` | Icon-based selection |
| `PropertiesPopover` | `components/PropertiesPopover.tsx` | Popover wrapper for compact mode |

## Rendering Flow

```
User selects element → appState.selectedElementIds updated
          │
          ▼
LayerUI.tsx → renderSelectedShapeActions()
          │
          ├── showSelectedShapeActions(appState, elements) → true?
          │
          ├── useStylesPanelMode() → "full" | "compact"
          │
          ▼
┌─────────────────────┐    ┌──────────────────────┐
│ SelectedShapeActions │ or │ CompactShapeActions   │
│   (full sidebar)     │    │ (toolbar + popovers) │
└──────────┬──────────┘    └──────────┬───────────┘
           │                          │
           ▼                          ▼
getTargetElements(elementsMap, appState)
           │
           ▼
Conditional renders based on element types:
  canChangeStrokeColor? → renderAction("changeStrokeColor")
  isTextElement?        → renderAction("changeFontFamily")
  canHaveArrowheads?    → renderAction("changeArrowhead")
  always                → renderAction("changeOpacity")
           │
           ▼
ActionManager.renderAction(name)
           │
           ├── looks up Action by name
           ├── creates updateData callback → action.perform()
           ├── returns <PanelComponent ... />
           │
           ▼
User interacts with control
           │
           ▼
updateData(value) → action.perform(elements, appState, value, app)
           │
           ▼
Returns ActionResult { elements, appState, captureUpdate }
           │
           ▼
State applied → canvas re-renders
```

## Key Design Points

1. **Single Action system** — property panels, context menu, keyboard shortcuts, and command palette all use the same `Action` objects. A `PanelComponent` is just the visual part.

2. **No dynamic registry for panels** — unlike the context menu which builds items dynamically, the properties panel is **hardcoded** in `SelectedShapeActions` and `CompactShapeActions`. Adding a new control requires editing these components.

3. **Element-type filtering is in the view layer** — each control's visibility is determined by conditional `{condition && renderAction(...)}` in the component, not by the `predicate` field on the action.

4. **`getFormValue()` handles mixed selections** — when multiple elements are selected with different values, `getFormValue()` returns `null` (showing a "mixed" state in the UI).

5. **Compact mode uses Radix Popover** — `PropertiesPopover` wraps groups of controls in popovers that open on click, keeping the toolbar compact.
