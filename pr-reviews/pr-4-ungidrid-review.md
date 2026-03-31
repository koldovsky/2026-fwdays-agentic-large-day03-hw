# Огляд PR #4 — ungidrid

**PR:** [Day 3/ungidrid](https://github.com/koldovsky/2026-fwdays-agentic-large-day03-hw/pull/4)  
**Підхід SDD:** ❌ не зазначено  
**Issue:** не вказаний

---

## 📋 Загальне резюме

Реалізація keyboard shortcut Alt+W для toggle bind/unbind тексту в container елементах Excalidraw. Код якісний, тести присутні — але **SDD підхід повністю відсутній**: немає специфікації, немає обґрунтування підходу, немає self-review checklist. Це **основна вимога Дня 3 воркшопу**, яка не виконана.

---

## ✅ Checks: Pre-merge критерії

### SDD-підхід обраний і обґрунтований
❌ **Ні**

PR опис описує що зроблено (`Adds Ctrl+Shift+W shortcut...`), але **не зазначає жодного SDD підходу** (Simple Markdown, OpenSpec, або BMAD). Обґрунтування вибору підходу відсутнє. Це основна вимога Дня 3.

> **Що необхідно:** Додати в PR опис розділ з зазначенням підходу та 1-3 реченнями обґрунтування, наприклад:
> "Обрав Simple Markdown (docs/specs/...) — одна focused зміна (keyboard shortcut), Markdown template дозволяє чітко зафіксувати AC та non-goals."

### Специфікаційні артефакти присутні
❌ **Ні**

У PR **відсутні** будь-які специфікаційні файли:
- ❌ `docs/specs/` — немає файлів  
- ❌ `openspec/` — немає файлів  
- ❌ `_bmad-output/` — немає файлів

Це порушення головної вимоги воркшопу. Специфікація — це контракт між AI-агентом та розробником; без неї неможливо верифікувати коректність реалізації.

**Мінімально необхідно** (Simple Markdown підхід) — файл `docs/specs/<issue-number>.md` з:
1. **Goal** — одне речення
2. **Context** — issue URL, current vs expected behavior  
3. **Component / Module** — конкретні файли
4. **Changes Required** — що змінити
5. **Non-goals** — мінімум 2 пункти
6. **Acceptance Criteria** — мінімум 3 тестованих критерії

### Код реалізації присутній
✅ **Ок**

6 файлів змінено:
- `packages/excalidraw/actions/actionBoundText.tsx` — нова `actionToggleContainerBinding`
- `packages/excalidraw/actions/shortcuts.ts` — Alt+W shortcut
- `packages/excalidraw/actions/types.ts` — ActionName type
- `packages/excalidraw/components/HelpDialog.tsx` — shortcut в help dialog
- `packages/excalidraw/locales/en.json` — i18n labels
- `packages/excalidraw/tests/actionToggleContainerBinding.test.tsx` — тести

### Self-review checklist
❌ **Ні**

PR опис **не містить** self-review checklist. Потрібно ≥8 пунктів у форматі `- [x]` / `- [ ]`.

### Blast radius та відповідність spec
⚠️ **Частково**

6 файлів — blast radius прийнятний. Але оскільки специфікація відсутня, неможливо верифікувати відповідність spec. Non-goals не визначені.

---

## 🔍 Технічний аналіз реалізації

### `actionToggleContainerBinding`

```typescript
predicate: (elements, appState, _, app) => {
  const selectedElements = app.scene.getSelectedElements(appState);
  return selectedElements.some((el) => isTextElement(el));
},
```

⚠️ **Потенційна проблема:** `predicate` повертає `true` тільки якщо серед виділених є **text element**. Але другий тест очікує що при виборі **container** (`selectedElementIds: { [container.id]: true }`) — unbind спрацює.

Якщо predicate використовується для gating keyboard shortcuts (а не тільки для UI menu), то shortcut **не спрацює** при виборі container без прямо виділеного text елемента.

**Рекомендація:** Перевірити, чи predicate впливає на keyboard trigger. Якщо так — потрібно додати перевірку для containers з bound text:

```typescript
predicate: (elements, appState, _, app) => {
  const selectedElements = app.scene.getSelectedElements(appState);
  return selectedElements.some(
    (el) => isTextElement(el) || hasBoundTextElement(el)
  );
},
```

### Описання дії (PR body vs код)

PR body: "Adds Ctrl+Shift+W shortcut"  
Код: `event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.key === KEYS.W`  
CodeRabbit summary: "Added Alt+W keyboard shortcut"

⚠️ **Невідповідність** у PR описі — `Ctrl+Shift+W` vs фактичний `Alt+W`. Треба виправити PR опис для ясності.

### `perform` функція

```typescript
perform: (elements, appState, formData, app) => {
  const selectedElements = app.scene.getSelectedElements(appState);
  const hasUnboundText = selectedElements.some(
    (el) => isTextElement(el) && !isBoundToContainer(el),
  );
  if (hasUnboundText) {
    return actionWrapTextInContainer.perform(elements, appState, formData, app);
  }
  return actionUnbindText.perform(elements, appState, formData, app);
},
```

✅ Логіка toggle: є unbound text → wrap; інакше → unbind  
⚠️ Якщо виділений тільки container (без text), `hasUnboundText = false`, і буде викликаний `actionUnbindText` — що коректно, тільки якщо `actionUnbindText` сам знаходить bound text. Варто перевірити.

### Tests (`actionToggleContainerBinding.test.tsx`)
✅ 3 тести: wrap, unbind, no-op for non-text  
✅ Behavioral tests (не mock)  
⚠️ Тест 2: `selectedElementIds: { [container.id]: true }` — container selected, але predicate перевіряє `isTextElement`. Потрібно переконатись, що цей test case проходить у реальних умовах.

### `en.json`
✅ `labels.toggleContainerBinding` та `helpDialog.toggleContainerBinding` — обидва ключі додані  
⚠️ Відсутня локалізація для `uk-UA.json` — чи є fallback до `en`? Добавити для повноти.

### HelpDialog
✅ Shortcut показується в Help Dialog — ✅ discoverability

---

## 📌 PR Title

❌ "Day 3/ungidrid" — не відповідає формату.  
Очікуваний формат: **"Day 3: <ім'я учасника> — SDD Assignment"**

---

## 🎯 Підсумок оцінки

| Критерій | Статус |
|---|---|
| SDD підхід зазначений | ❌ |
| Обґрунтування підходу | ❌ |
| Специфікація присутня | ❌ |
| Goal / Context / AC | ❌ (немає spec) |
| Non-goals | ❌ (немає spec) |
| Реалізація присутня | ✅ |
| Tests присутні | ✅ |
| Self-review checklist 8+ | ❌ |
| Blast radius прийнятний | ✅ (6 файлів) |
| PR title format | ❌ |
| predicate logic | ⚠️ потенційний bug |
| PR body accuracy | ⚠️ Ctrl+Shift+W vs Alt+W |

**Загальний висновок:** ❌ Реалізація технічно виглядає непогано, але **не виконані ключові вимоги Дня 3**: немає специфікації (Simple Markdown / OpenSpec / BMAD), немає self-review checklist, PR title неправильний. Перед merge необхідно:

1. ❌ **Обов'язково:** Додати специфікацію (`docs/specs/<issue>.md` або аналог)
2. ❌ **Обов'язково:** Додати self-review checklist (≥8 пунктів)
3. ❌ **Обов'язково:** Виправити PR title
4. ⚠️ **Рекомендовано:** Виправити predicate (включити `hasBoundTextElement`)
5. ⚠️ **Рекомендовано:** Виправити опис shortcut у PR body (Alt+W, не Ctrl+Shift+W)
6. ⚠️ **Рекомендовано:** Додати локалізацію у `uk-UA.json`
