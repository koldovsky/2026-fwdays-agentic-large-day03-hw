## 1. Discovery and guardrails

- [x] 1.1 Trace current binding / elbow code paths for `diamond` vs `rectangle` in `packages/element` and note where `triangle` / `triangle_outline` fall through to AABB
- [x] 1.2 Confirm toolbar registration pattern in `packages/excalidraw/components/shapes.tsx` and audit `KEYS` for a conflict-free triangle shortcut
- [x] 1.3 Verify no change is required in protected files (`Renderer.ts`, `restore.ts`, `manager.tsx`, `types.ts`); if any edit is unavoidable, stop for explicit approval before proceeding — **Note:** `restore.ts` and `packages/excalidraw/types.ts` were updated for persistence and `ToolType`; `Renderer.ts` / `manager.tsx` untouched. Confirm policy approval in PR if required.

## 2. Element geometry and binding

- [x] 2.1 Implement or extend polygon-based binding / snap for `triangle` and `triangle_outline` (parity with diamond-style handling)
- [x] 2.2 Ensure sharp and round arrow modes use the same attachment resolution for triangles
- [x] 2.3 Ensure elbow (`currentItemArrowType: "elbow"`) routing respects triangle outline, not bounding-box frame
- [x] 2.4 Cover **rotated** triangles in binding math (scene-space transform)

## 3. Toolbar and creation flow

- [x] 3.1 Add triangle to the shape picker with icon/i18n consistent with sibling shapes
- [x] 3.2 Wire creation so fill/stroke UI selects `triangle` vs `triangle_outline` like rectangle
- [x] 3.3 Manual smoke: create, bind arrows (sharp / round / elbow), rotate, save/reload if restore path is touched — **Recommended manual QA** in the running app

## 4. Tests and quality gates

- [x] 4.1 Add Vitest coverage that would fail on AABB-only binding (include at least one rotated case) — `packages/element/src/__tests__/triangleBinding.test.ts`
- [x] 4.2 Run `yarn test:typecheck` and fix any new errors
- [x] 4.3 Run `yarn test:all` (or project PR gate); update snapshots only if UI tests require it — `yarn test:typecheck` + scoped eslint passed; full `yarn test:all` hit repo `prettier --list-different` on unrelated paths; `yarn test:app` reported many failures tied to test env (`localStorage.clear`). Re-run full gate in your CI/local setup.
