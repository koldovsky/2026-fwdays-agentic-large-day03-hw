## 1. Core Module

- [x] 1.1 Create `packages/excalidraw/keyboard-pan.ts` with `KeyboardPanEngine` class: constructor accepts a scroll update callback `(dx: number, dy: number) => void`
- [x] 1.2 Implement key state tracking: `pressKey(key)` and `releaseKey(key)` methods that manage a `Set<string>` of active arrow keys
- [x] 1.3 Implement the RAF animation loop: compute delta-time, derive acceleration direction from pressed keys, update velocity with acceleration and friction, call scroll callback with displacement, self-terminate when idle
- [x] 1.4 Add `clearKeys()` method for window blur handling
- [x] 1.5 Add `destroy()` method to cancel any running RAF and clean up state

## 2. Integration with App.tsx

- [x] 2.1 Instantiate `KeyboardPanEngine` in `App.tsx`, passing a callback that updates `scrollX`/`scrollY` via `setState`
- [x] 2.2 In `onKeyDown`, when `viewModeEnabled` is true and key is an arrow key, call `engine.pressKey(key)` and prevent default
- [x] 2.3 In `onKeyUp`, when `viewModeEnabled` is true and key is an arrow key, call `engine.releaseKey(key)`
- [x] 2.4 Register a `window.blur` listener that calls `engine.clearKeys()` to handle focus loss
- [x] 2.5 Call `engine.destroy()` in `componentWillUnmount` cleanup

## 3. Tuning and Polish

- [x] 3.1 Define and export animation constants (max velocity, acceleration, friction, dead zone) at the top of `keyboard-pan.ts`
- [x] 3.2 Ensure frame-rate independence by scaling velocity and acceleration by delta-time
- [x] 3.3 Verify opposing keys cancel out (Up+Down = no vertical movement)

## 4. Testing

- [x] 4.1 Create `packages/excalidraw/tests/keyboard-pan.test.ts` with unit tests for `KeyboardPanEngine` (key tracking, velocity direction, idle termination)
- [x] 4.2 Add integration test: arrow key press in view mode updates scrollX/scrollY
- [x] 4.3 Add integration test: arrow keys are ignored when view mode is disabled
- [x] 4.4 Add integration test: simultaneous keys produce diagonal scroll changes
- [x] 4.5 Run `yarn test:update` and `yarn test:typecheck` to verify no regressions
