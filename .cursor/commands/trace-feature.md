# trace-feature

You are investigating a brownfield Excalidraw monorepo.

Goal:
Trace how this feature works: `{{feature_name}}`

Scope:
- Start in `packages/excalidraw` and `excalidraw-app`
- Identify entry points, main data flow, state updates, and side effects
- Include related tests and rules if they affect behavior

Output format:
1) Feature map (files/modules)
2) End-to-end flow (step-by-step)
3) Key types/functions involved
4) Risks/edge cases
5) Safe change points (best places to modify)

Constraints:
- Do not edit files
- Keep findings concrete with file paths in backticks
- Prefer concise bullets
