# System Patterns

This file is intentionally compact.
Detailed architecture, package internals, and risky invariants are documented in `docs/technical/*`.

## Architecture Snapshot
- The repo is a layered monorepo: `@excalidraw/common`, `@excalidraw/math`, `@excalidraw/element`, `@excalidraw/excalidraw`, `@excalidraw/utils`, `excalidraw-app`, `examples/*`.
- `@excalidraw/excalidraw` is the core editor runtime and API surface; `excalidraw-app` hosts product-specific integrations.
- Runtime correctness depends on restore/reconcile pipeline behavior, store capture semantics, and collaboration merge rules.

## Key Patterns
- **Properties panel popover pattern:** Inline presets (compact buttons/swatches) → `ButtonSeparator` → trigger button → `PropertiesPopover` with detailed picker. Used by `ColorPicker` and `FontSizePicker`. New property controls should follow this pattern. See [properties-panel-architecture.md](../technical/properties-panel-architecture.md).

## Source Of Detail
- Technical overview and data/state/render flow: [architecture.md](../technical/architecture.md)
- Package-level internals (`packages/*`): [packages-architecture.md](../technical/packages-architecture.md)
- i18n/multilanguage system: [i18n-architecture.md](../technical/i18n-architecture.md)
- High-risk behavior and hidden constraints: [hidden-invariants.md](../technical/hidden-invariants.md)
- Tooling and command index: [techContext.md](./techContext.md)
- Durable architectural decisions: [decisinLog.md](./decisinLog.md)
