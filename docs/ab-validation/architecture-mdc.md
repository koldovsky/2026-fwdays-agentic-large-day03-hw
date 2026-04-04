# A/B validation: `architecture.mdc`

**Rule tested:** `.cursor/rules/architecture.mdc`

Section labels match CodeRabbit `pre_merge_checks`: **Result A** = without the rule; **Result B** = with the rule applied.

## Test scenario (prompt)

**"Create a new component for displaying element coordinates"**

---

## Result A — without the rule (rule OFF)

- **`ElementCoordinates`** is a thin layout wrapper: one **`StatsRow` with `columns={2}`** with two **`Position`** instances (editable X/Y); **no** extra read-only row, **no** new util/test/locale in the snapshot; same mutation path as the rest of stats (`**StatsDragInput**` → **`scene`**).

---

## Result B — with the rule (rule ON)

- Read-only **Coordinates** row (`stats.coordinates`) showing a single `x, y` string; uses shared **`getDisplayedXYForStats`** in `utils.ts` and **`round`** + **`getCommonBounds`** for multi-select; **`Position`** updated to consume the same helper; adds **`ElementCoordinates.test.tsx`** and **`en.json`** entry; still mutates via existing **`Scene`** / **`moveElement`** paths inside **`Position`**, not a new global store.

---

## Comparison

### State management

- **With rule:** Highlights **derived UI** from `element` + `AppState` for the summary line; editor state remains the established **`App` / `AppState` + scene** model (rule-aligned: no Redux/Zustand).
- **Without rule:** No separate summary state; coordinates **are** the existing draggable inputs—still **no** third-party store.
- **Delta:** For this prompt both stay within Excalidraw’s architecture. The rule’s “actionManager / AppState” framing **does not** surface as a different *library*, but the **with-rule** run **adds** explicit **shared derivation** (`getDisplayedXYForStats`) used by both display and **`Position`**.

### Export style

- **With rule:** **`export const ElementCoordinates`** (named). **`Position`** remains **`export default`** (legacy file unchanged in pattern).
- **Without rule:** Same **named** export for **`ElementCoordinates`**; **`Position`** still default-imported.
- **Delta:** **No material difference** on the new component—both use a **named export**. The rule does not, by itself, flip default exports in surrounding code.

### Type safety

- **With rule:** Centralizes coordinate math in **`getDisplayedXYForStats(element, appState)`** with concrete **`ExcalidrawElement` / `AppState`** types; **`ElementCoordinates`** props are **`NonDeletedExcalidrawElement | null`** and multi-select arrays—**no `any`** on the new API. **`ElementPropertiesPanel`** still uses existing **`Component<any, AppState>`** for `setAppState` (pre-existing looseness).
- **Without rule:** **`ElementCoordinatesProps`** threads **`ElementsMap`**, **`Scene`**, **`ExcalidrawElement`**, **`AppState`** into **`Position`**—also strict on the new surface.
- **Delta:** Both are **strict** for the new component. The **with-rule** run **additionally** tightens **reuse** of coordinate logic via a **typed helper** shared with **`Position`**.

### Conventions

- **With rule:** Adds **i18n** (`stats.coordinates`), **colocated test**, and **utils extraction**—matches “prefer existing patterns / internal helpers” spirit in `architecture.mdc`.
- **Without rule:** **Minimal diff**: composition only, **fewer files**, **no** duplicate read-only coordinates line beside X/Y editors.
- **Delta:** **With rule** is **more complete** artifact-wise; **without rule** is **smaller UX change** (combined row of editors only).

---

## Conclusion

- **Template note:** The **without-rule** outcome **did not** adopt `useState` for document state, **default export** for `ElementCoordinates`, or **loose types** on that component in the recorded run—those bullets would misrepresent this A/B.
- **Actual takeaway:** With the rule **on**, the assistant produced a **read-only coordinates summary**, **refactored shared math**, **tests**, and **locale**—consistent with keeping **Scene + `AppState`** and avoiding new global stores. With the rule **off**, the outcome stayed **minimal and localized** (two **`Position`**s in one row). For **`architecture.mdc`** specifically, the clearest win is **anchoring mental model** (no Redux/Zustand/MobX) and **nudging** toward **helpers + i18n + tests**; for this prompt, **neither branch needed** an external store, so the rule’s **anti–Zustand/Redux** effect shows up as **guardrails and thoroughness**, not as a second implementation with a different store.
