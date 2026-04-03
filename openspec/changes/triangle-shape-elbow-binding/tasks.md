## 1. Discovery and guardrails

- [ ] 1.1 Trace current binding / elbow code paths for `diamond` vs `rectangle` in `packages/element` and note where `triangle` / `triangle_outline` fall through to AABB
- [ ] 1.2 Confirm toolbar registration pattern in `packages/excalidraw/components/shapes.tsx` and audit `KEYS` for a conflict-free triangle shortcut
- [ ] 1.3 Verify no change is required in protected files (`Renderer.ts`, `restore.ts`, `manager.tsx`, `types.ts`); if any edit is unavoidable, stop for explicit approval before proceeding

## 2. Element geometry and binding

- [ ] 2.1 Implement or extend polygon-based binding / snap for `triangle` and `triangle_outline` (parity with diamond-style handling)
- [ ] 2.2 Ensure sharp and round arrow modes use the same attachment resolution for triangles
- [ ] 2.3 Ensure elbow (`currentItemArrowType: "elbow"`) routing respects triangle outline, not bounding-box frame
- [ ] 2.4 Cover **rotated** triangles in binding math (scene-space transform)

## 3. Toolbar and creation flow

- [ ] 3.1 Add triangle to the shape picker with icon/i18n consistent with sibling shapes
- [ ] 3.2 Wire creation so fill/stroke UI selects `triangle` vs `triangle_outline` like rectangle
- [ ] 3.3 Manual smoke: create, bind arrows (sharp / round / elbow), rotate, save/reload if restore path is touched

## 4. Tests and quality gates

- [ ] 4.1 Add Vitest coverage that would fail on AABB-only binding (include at least one rotated case)
- [ ] 4.2 Run `yarn test:typecheck` and fix any new errors
- [ ] 4.3 Run `yarn test:all` (or project PR gate); update snapshots only if UI tests require it
