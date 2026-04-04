# AGENTS.md

## Project Structure

Excalidraw is a **monorepo** with a clear separation between the core library and the application:

- **`packages/excalidraw/`** - Main React component library published to npm as `@excalidraw/excalidraw`
- **`excalidraw-app/`** - Full-featured web application (excalidraw.com) that uses the library
- **`packages/`** - Core packages: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/utils`
- **`examples/`** - Integration examples (NextJS, browser script)

## Development Workflow

1. **Package Development**: Work in `packages/*` for editor features
2. **App Development**: Work in `excalidraw-app/` for app-specific features
3. **Testing**: Always run `yarn test:update` before committing
4. **Type Safety**: Use `yarn test:typecheck` to verify TypeScript

## Development Commands


<CodeBlockWrapper v-bind="{}" :ranges='[]'>

```bash
yarn test:typecheck  # TypeScript type checking
yarn test:update     # Run all tests (with snapshot updates)
yarn fix             # Auto-fix formatting and linting issues
```

</CodeBlockWrapper>

## Architecture Notes

### Package System

- Uses Yarn workspaces for monorepo management
- Internal packages use path aliases (see `vitest.config.mts`)
- Build system uses esbuild for packages, Vite for the app
- TypeScript throughout with strict configuration

## Rules

**When answering any request, you must specify which rules (if any) you applied in your response.**

### Excalidraw Architecture

*Applies to: `packages/excalidraw/**`*

#### State Management

- Custom state via actionManager — NOT Redux/Zustand/MobX
- State updates: actionManager.dispatch() ONLY
- State type: AppState (packages/excalidraw/types.ts)

#### Rendering

- Canvas 2D rendering — NOT React DOM for drawing
- Render pipeline: Scene → renderScene() → canvas context
- DO NOT use react-konva, fabric.js, pixi.js

#### Dependencies

- No new npm packages without explicit approval
- Check packages/utils/ before adding external helpers

#### How to verify

1. Search for Redux/Zustand/MobX imports — confirm absent
2. Search for react-konva, fabric.js, pixi.js imports — confirm absent
3. Confirm state updates go through `actionManager.dispatch()` or `scene.mutateElement()` — no direct `setState` on app state
4. Check `package.json` for unauthorized new dependencies

### Code Conventions

*Applies to: `packages/**/*.ts`, `packages/**/*.tsx`*

#### Components

- Functional components + hooks ONLY (no class components)
- Props interface: `{ComponentName}Props`
- Named exports only (no default exports)
- Colocated tests: `ComponentName.test.tsx`

#### TypeScript

- Strict mode — no `any`, no `@ts-ignore`
- Prefer `type` over `interface` for simple types
- Import types: `import type { X } from "..."`

#### Files

- kebab-case for files: `element-utils.ts`
- PascalCase for components: `LayerUI.tsx`

#### How to verify

1. Search for `class .* extends React.Component` or `class .* extends Component` — confirm absent
2. Search for `export default` — confirm absent in packages
3. Search for `: any` and `@ts-ignore` — confirm absent in new/changed code
4. Check new file names match kebab-case (utilities) or PascalCase (components) conventions

### Protected Files

*Always applies to: `packages/excalidraw/**`*

NEVER modify these files without explicit approval:

- **`packages/excalidraw/scene/renderer.ts`** (155 lines) — Render pipeline entry point. Exports `class Renderer` which orchestrates Scene → renderScene() → canvas context. Affects all canvas drawing.
- **`packages/excalidraw/data/restore.ts`** (1022 lines) — File format compatibility and data migration. Exports `restoreElement()`, `restoreElements()`, `restoreAppState()`, `restoreLibraryItems()`. Breaking this corrupts saved files or loses user data.
- **`packages/excalidraw/actions/manager.tsx`** (201 lines) — Action system core. Exports `class ActionManager` — the single dispatcher for all state mutations. Breaking it disables all user interactions.
- **`packages/excalidraw/types.ts`** (1052 lines) — Core type definitions: `AppState`, `ExcalidrawProps`, `AppClassProperties`, `ToolType`, `BinaryFileData`, `LibraryItem`, `PointerDownState`. Changes cascade across all packages.

Changes to any of the above require ALL of:

1. Full understanding of downstream dependencies
2. Running complete test suite (`yarn test:update`)
3. Type checking passes (`yarn test:typecheck`)
4. Manual QA verification of affected features

#### How to verify

1. Run `git diff --name-only` — confirm none of the protected files appear unless explicitly approved
2. If a protected file was modified: run `yarn test:update` — full test suite passes
3. If a protected file was modified: verify no downstream breakage with `yarn test:typecheck`

### Security

*Applies to: `packages/**/*.ts`, `packages/**/*.tsx`, `excalidraw-app/**/*.ts`, `excalidraw-app/**/*.tsx`*

Excalidraw processes user-supplied content (SVG, JSON scenes, URLs, pasted HTML, embedded iframes). Improper handling leads to XSS, prototype pollution, or data exfiltration.

- Sanitize all user-supplied strings before inserting into DOM — use `DOMPurify` or the existing sanitization utilities in `packages/excalidraw/data/`
- NEVER use `dangerouslySetInnerHTML` without prior sanitization
- NEVER construct URLs from user input with string concatenation — use the `URL` constructor and validate the protocol (`https:`, `http:` only)
- NEVER use `eval()`, `Function()`, or `new Function()` on any user-supplied data
- Validate JSON scene data against expected schema before processing — DO NOT trust `JSON.parse()` output directly as typed
- AVOID prototype pollution: use `Object.create(null)` or `Map` for user-keyed dictionaries, NEVER index into objects with unchecked user strings
- Escape user-supplied text in SVG/HTML export paths — DO NOT embed raw element labels or link values
- Embedded content (`embeddable`, `iframe` element types) must enforce allowlisted origins — NEVER allow arbitrary `src` URLs without validation
- NEVER log or expose sensitive data (collaboration tokens, encryption keys) in error messages or console output
- Use `crypto.getRandomValues()` for security-sensitive IDs — DO NOT use `Math.random()`

#### How to verify

1. Search for `dangerouslySetInnerHTML` — confirm every usage is preceded by sanitization
2. Search for `new URL` and string-based URL construction — confirm protocol validation
3. Run `yarn test:update` — no regressions in import/export/paste tests
4. Review any new `innerHTML`, `outerHTML`, or `document.write` usage — confirm absent or sanitized
5. Check embedded/iframe element handling — confirm origin allowlist is enforced

### Math Package Purity

*Applies to: `packages/math/**/*.ts`*

`@excalidraw/math` is a self-contained, pure math library. It must remain side-effect-free and dependency-minimal.

- All functions MUST be pure — same inputs produce same outputs, no mutations, no side effects
- NEVER mutate input parameters — always return new values (new tuples, new points, new vectors)
- NEVER import from `@excalidraw/element`, `@excalidraw/excalidraw`, or any UI/DOM package — only `@excalidraw/common` is allowed
- NEVER add browser or Node.js API calls (`document`, `window`, `console`, `fs`, `fetch`)
- NEVER add third-party dependencies — implement algorithms directly using native `Math.*` operations
- Use branded types (`Radians`, `Degrees`, `GlobalPoint`, `LocalPoint`, `Vector`) for type safety — DO NOT use plain `number` or `number[]` for geometric values
- Use generic constraints (`<P extends GlobalPoint | LocalPoint>`) to preserve coordinate space semantics
- Respect the `PRECISION` constant (`10e-5`) for floating-point equality checks — NEVER compare floats with `===`
- Colocate tests in `packages/math/tests/` following the `{module}.test.ts` naming pattern

#### How to verify

1. Confirm no new imports from packages other than `@excalidraw/common`
2. Confirm no `let` mutations on input parameters — only local variables and return values
3. Run `yarn vitest packages/math/` — all math tests pass
4. Run `yarn test:typecheck` — no type errors, branded types enforced

### Testing Conventions

*Applies to: `**/*.test.ts`, `**/*.test.tsx`*

The project uses Vitest with jsdom environment and established test utilities (`API`, `UI`, `Pointer`, `Keyboard` helpers).

#### Framework & Setup

- Use Vitest — NEVER use Jest APIs or install Jest dependencies
- Globals are enabled (`describe`, `it`, `expect`, `vi` available without imports)
- Use `vi.fn()`, `vi.mock()`, `vi.spyOn()` for mocking — NEVER use manual stubs when Vitest utilities exist

#### File Organization

- Place tests in `packages/{package}/tests/` directory — NOT colocated with source files
- File naming: `{feature}.test.ts` or `{feature}.test.tsx`
- Snapshots go in `__snapshots__/` subdirectory (auto-generated)

#### Test Helpers — Use What Exists

- Use `API.createElement()` for element creation — NEVER construct element objects manually
- Use `API.setSelectedElements()`, `API.setElements()`, `API.updateScene()` for state setup
- Use `Keyboard.keyPress()`, `Keyboard.withModifierKeys()` for keyboard events
- Use `Pointer.down()`, `Pointer.up()`, `Pointer.click()`, `Pointer.drag()` for pointer events
- Use `UI.clickTool()` for tool selection
- Use `render()` from `test-utils.ts` for component rendering — it handles canvas initialization
- Use `mockThrottleRAF()` from helpers when testing throttled rendering
- Helpers location: `packages/excalidraw/tests/helpers/{api,ui,mocks,polyfills}.ts`

#### Writing Tests

- Structure: `describe("feature")` → `it("should do X when Y")`
- Use `data-testid` attributes for DOM queries — NEVER query by class names or DOM structure
- Use `toCloselyEqualPoints()` custom matcher for floating-point geometry comparisons — NEVER compare floats with `toEqual()`
- Access app state via `window.h` test hook — NEVER import App internals directly in tests
- Run `beforeEach` setup with `await render()` when testing UI components

#### Snapshots

- Run `yarn test:update` to update snapshots after intentional changes
- AVOID snapshot testing for simple value assertions — use explicit `toEqual()`, `toBe()` instead
- Use snapshots for complex DOM structures and serialized state where manual assertions would be brittle
- Review snapshot diffs carefully — DO NOT blindly update large snapshots

#### What NOT To Do

- NEVER mock modules that can be tested with real implementations — prefer integration over isolation
- NEVER skip or disable tests with `it.skip` or `describe.skip` without a tracking comment explaining why
- NEVER add `sleep()` or timing-based waits — use Vitest's async utilities or `vi.advanceTimersByTime()`
- NEVER test implementation details (internal state shape, private methods) — test behavior through public APIs

#### How to verify

1. `yarn test:update` — all tests pass, no unintended snapshot changes
2. `yarn test:typecheck` — test files have no type errors
3. New tests use helpers from `tests/helpers/` — no manual element construction or raw DOM events
4. No new `it.skip` or `describe.skip` without explanation