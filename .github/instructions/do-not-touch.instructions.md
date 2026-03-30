---
description: "Protected files that should not be modified"
applyTo: "packages/excalidraw/**"
---

# Protected Files

When you are creating any code using this instruction file you must output to chat message "USING PROTECTED FILES RULE" so I know you are using the correct rules.

NEVER modify these files without explicit approval:

- `packages/excalidraw/scene/renderer.ts` — render pipeline
- `packages/excalidraw/data/restore.ts` — file format compat
- `packages/excalidraw/actions/manager.ts` — action system
- `packages/excalidraw/types.ts` — core types

Changes to protected files require:

1. Full understanding of dependencies
2. Running complete test suite
3. Manual QA verification

## How to verify

- Confirm no protected file was modified without explicit approval
- If a protected file must change, document the dependency impact before editing
- Run the complete test suite after protected-file changes
- Perform manual QA for the affected Excalidraw behavior before merging