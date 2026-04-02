## 1. Core panning logic in App

- [x] 1.1 Add view-mode-only state for arrow-key pan (held keys set, velocity, rAF handle) and cleanup on unmount / when leaving view mode.
- [x] 1.2 In `onKeyDown` / `onKeyUp`, when `viewModeEnabled`, not laser (if consistent with pointer pan), not `editingTextElement`, and `!isInputLike(target)`, track ArrowLeft/Right/Up/Down; `preventDefault` when handling.
- [x] 1.3 Run an rAF loop: compute direction from held keys (support diagonal), apply acceleration toward target speed and friction/decay when keys released; call `translateCanvas` each frame with scene deltas.
- [x] 1.4 Tune constants (max speed, accel, friction) for a short ease-in and ease-out similar to Miro-style feel.

## 2. Tests and verification

- [x] 2.1 Extend `packages/excalidraw/tests/viewMode.test.tsx` (or add a focused test file): view mode + arrow key causes `scrollX`/`scrollY` to change after time/rAF (use `act` + fake timers if needed).
- [x] 2.2 Add coverage for diagonal pan (two keys) and for no pan when simulating input focus / `isInputLike` if feasible in harness.
- [x] 2.3 Run `yarn test:update` or targeted vitest for the new tests and fix failures.
