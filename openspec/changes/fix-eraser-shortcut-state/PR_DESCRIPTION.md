# Draft PR (заповни title/нік під себе)

**Suggested title:** `Day 3: <your-name> — SDD Assignment` (або узгоджено з воркшопом)

## Контекст

- **Upstream issue:** https://github.com/excalidraw/excalidraw/issues/9852  
- **SDD підхід:** **OpenSpec** у `openspec/changes/fix-eraser-shortcut-state/`  
- **Чому OpenSpec:** формальні SHALL/MUST + GIVEN/WHEN/THEN краще ловлять регресії інтеграції shortcut vs UI і зручні для перевірки відповідності імплементації.

## Що зроблено

- Узгоджено `actionToggleEraserTool` (`E`) з тим самим пакетом скидань `AppState`, що застосовує `App.setActiveTool` для цільового інструмента (`multiElement`, `editingGroupId`, snap hints, `selectedLinearElement` тощо).
- Додано behavior-тести: `packages/excalidraw/tests/eraserShortcutState.test.tsx`.

## Traceability (AC ↔ код)

| Вимога (OpenSpec scenario) | Код / тест |
| --- | --- |
| Після `E` під час multi-point arrow: eraser + `multiElement === null` | `packages/excalidraw/actions/actionCanvas.tsx` + тест «pressing E clears…» |
| Паритет полів стану з кліком eraser у тулбарі | Тест «toolbar eraser matches E…» |

## Self-review checklist (10+)

- [x] SDD approach (OpenSpec) обрано та коротко обґрунтовано вище
- [x] Імплементація відповідає delta spec (паритет з `setActiveTool`)
- [x] Дотримано конвенцій репозиторію (TypeScript, без правок protected `manager.tsx` / `types.ts`)
- [x] Edge case: незавершена лінія/стрілка — `multiElement` скидається разом із переходом на eraser
- [x] Blast radius вузький (основна логіка в одному action-файлі + тести)
- [x] `yarn test:typecheck` пройшов
- [x] Додані тести пройшли (`eraserShortcutState.test.tsx`)
- [x] `yarn build` пройшов
- [x] Без очевидних security змін (немає нових небезпечних DOM/string шляхів)
- [x] i18n: нових user-facing рядків не додавалось
- [x] Код читабельний іншому розробнику (коментарі лише де потрібно)
