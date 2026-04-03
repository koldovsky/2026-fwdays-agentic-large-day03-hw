# Notes

## Goal
See whether `.cursor/rules/excalidraw-architecture.mdc` steers solutions toward Excalidraw’s real state model (AppState, existing hooks, no parallel global stores, action pipeline for mutations) when the prompt asks for “state management” for selection coordinates.

## Signals in A (OFF)
- Frames the problem as generic React `useState` updated from `onExcalidrawAPI` / `onChange` and reading `getAppState().selectedElementIds`.
- Suggests host-level component names like `SelectedElementCoordinatesPanel.tsx` rather than a path inside `packages/excalidraw/components/Stats/`.
- Does not mention `actionManager.dispatch()` or the constraint to avoid Redux/MobX/Zustand for editor state.
- Includes a sketch with a small gap (`onChange` left as a stub / imperative `ExcalidrawImperativeAPI` type not imported).

## Signals in B (ON)
- Explicitly ties selection to `AppState.selectedElementIds` and recommends `useAppStateValue("selectedElementIds")` + `useExcalidrawAPI()` for targeted re-renders.
- States architecture constraints: no new global store for editor state; mutations should go through `actionManager.dispatch()`; no new npm deps.
- Points to colocated Stats UI and concrete repo paths: `packages/excalidraw/components/Stats/SelectedElementCoordinates.tsx` and matching `.test.tsx`.
- References an existing test pattern (`ExcalidrawAPIContext` + `AppStateObserver` mock).

## Comparison
- what changed: Result B documents Excalidraw-specific integration (hooks, file location, action pipeline) instead of only generic React state.
- what improved: Clearer fit to this monorepo’s state boundaries and a more reviewable testing approach; avoids implying a second store is appropriate.
- what stayed wrong: Neither run is a drop-in production patch; both remain illustrative sketches.
- whether the rule had a visible effect: Yes—the ON answer is materially more aligned with documented Excalidraw architecture than the OFF answer.

## Verdict
effective

## Next step
- If Python is available in CI, wire `init_ab_test.py` / `update_rule_validation.py` so future runs do not require hand-maintaining `rule-validation.md` sections.
- Re-run the same prompt after editing the rule (e.g. clarify “read-only UI may subscribe via hooks; mutations use actions”) to see if guidance gets even sharper.
