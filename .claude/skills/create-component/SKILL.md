---
name: create-component
description: Scaffolds a new React component following Excalidraw conventions — creates component file, SCSS, test, and integrates into the parent module. Use when the user asks to create, add, or scaffold a new component.
---

# Skill: Create Component

## When to use

When the user asks to create a new UI component.
Triggered by: "create component", "add component", "scaffold component", "new component".

## Inputs

- Component name (e.g., "ElementPropertiesPanel")
- Target location (default: `packages/excalidraw/components/`)
- Brief description of what it does

## Steps

### 1. Research

Before writing any code:
- Check if a similar component already exists — search `packages/excalidraw/components/`
- Identify existing utilities, hooks, and sub-components to reuse
- Check `packages/utils/` for helpers before creating new ones
- Review the closest existing component as a reference pattern

### 2. Create component directory

```
packages/excalidraw/components/{ComponentName}/
  index.tsx
  {ComponentName}.scss
```

### 3. Write component file (`index.tsx`)

Follow these conventions strictly:

```typescript
// Imports: external packages first, then @excalidraw/*, then relative
import clsx from "clsx";
import { memo } from "react";

import type { SomeType } from "@excalidraw/element/types";

import { useExcalidrawAppState } from "../App";

import "./{ComponentName}.scss";

// Props: type (not interface), named {ComponentName}Props
type {ComponentName}Props = {
  app: AppClassProperties;
};

// Named export only — NEVER use default export
// Functional component + hooks — NEVER use class components
export const {ComponentName} = ({ app }: {ComponentName}Props) => {
  const appState = useExcalidrawAppState();
  // ...
};
```

Rules enforced:
- Strict TypeScript — no `any`, no `@ts-ignore`
- `type` over `interface` for props
- `import type` for type-only imports
- Named exports only
- Functional components + hooks only
- State access via `useExcalidrawAppState()` / `useExcalidrawSetAppState()`
- State mutations via `actionManager.dispatch()` or `scene.mutateElement()`
- Wrap in `Island` component if it's a floating panel
- Use `memo()` with custom comparator if the component receives frequently changing props
- Use `t()` from `../../i18n` for all user-facing strings
- Add `data-testid` attributes on key elements

### 4. Write styles (`.scss`)

```scss
.exc-{component-name} {
  // BEM naming: .exc-{component-name}__{element}--{modifier}
  // Use CSS variables for theming: --text-primary-color, --island-bg-color
  // Scope everything under .exc-{component-name}
}
```

### 5. Write test file

Create `packages/excalidraw/tests/{component-name}.test.tsx`:

```typescript
import { render } from "./test-utils";
import { API } from "./helpers/api";
import { UI } from "./helpers/ui";

describe("{ComponentName}", () => {
  beforeEach(async () => {
    await render(<Excalidraw />);
  });

  it("should render when conditions are met", () => {
    // Use API.createElement(), API.setSelectedElements()
    // Query via data-testid
  });

  it("should not render when conditions are not met", () => {
    // ...
  });
});
```

Rules enforced:
- Use existing helpers: `API`, `Keyboard`, `Pointer`, `UI`
- Use `data-testid` for queries — never class names
- No manual element construction — use `API.createElement()`
- No `it.skip` without explanation

### 6. Add i18n keys

Add translation keys to `packages/excalidraw/locales/en.json`. Every new component MUST have these i18n keys:

#### Required keys

| Key | Purpose | Example |
|-----|---------|---------|
| `{section}.title` | Panel/section heading | `"stats.visualProperties": "Visual properties"` |
| `labels.{componentName}` | Component label for UI references | `"labels.elementCoordinates": "Element coordinates"` |
| `toolBar.{componentName}` | Tooltip if component has a toolbar trigger | `"toolBar.elementProps": "Element properties"` |

#### Per-property keys (if the component displays element properties)

| Key | Purpose | Example |
|-----|---------|---------|
| `labels.{property}` | Property label | `"labels.strokeWidth": "Stroke width"` |
| `labels.{property}_{value}` | Enum value display | `"labels.fillStyle_hachure": "Hachure"` |

#### Reusable existing keys (check before adding new ones)

```json
"labels.stroke"        — Stroke color
"labels.background"    — Background color
"labels.fill"          — Fill style
"labels.strokeWidth"   — Stroke width
"labels.strokeStyle"   — Stroke style
"labels.sloppiness"    — Roughness/sloppiness
"labels.opacity"       — Opacity
"labels.locked"        — Locked state
"stats.width"          — Width
"stats.height"         — Height
"stats.angle"          — Angle
```

#### Example: adding keys for a new ElementPropertiesPanel

```json
{
  "stats": {
    "visualProperties": "Visual properties"
  },
  "labels": {
    "fillStyle_solid": "Solid",
    "fillStyle_hachure": "Hachure",
    "fillStyle_crossHatch": "Cross-hatch",
    "fillStyle_zigzag": "Zigzag",
    "strokeStyle_solid": "Solid",
    "strokeStyle_dashed": "Dashed",
    "strokeStyle_dotted": "Dotted"
  }
}
```

#### Validation checklist

1. Every user-visible string uses `t("key")` — NO hardcoded strings
2. All new keys are added to `packages/excalidraw/locales/en.json`
3. Existing keys from `labels.*` / `stats.*` are reused where applicable
4. Key names follow the `{section}.{camelCaseName}` convention

### 7. Integrate

- Import and render the component in the appropriate parent (`LayerUI.tsx`, `Stats/index.tsx`, or other)
- Add conditional rendering logic (selection state, mode checks, etc.)

### 8. Verify

Run all three checks:
```bash
yarn test:typecheck
yarn test:update
yarn fix
```

## Outputs

- Component directory with `index.tsx` and `.scss`
- Test file in `packages/excalidraw/tests/`
- i18n keys added to `en.json`
- Integration in parent component
- All checks passing

## Safety

- NEVER modify protected files (`renderer.ts`, `restore.ts`, `manager.ts`, `types.ts`) without explicit approval
- NEVER add new npm packages — use existing utilities
- NEVER use `dangerouslySetInnerHTML`, `eval()`, or `any`
- If the component is similar to an existing one, ask the user whether to extend the existing component instead
