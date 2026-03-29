# A/B валідація: `.cursor/rules/excalidraw-app.mdc`

## Яке правило тестувалось

**Файл:** `.cursor/rules/excalidraw-app.mdc`  
**Суть:** розмежування `excalidraw-app/` (оболонка продукту) і `packages/excalidraw/` (ядро редактора); уникати дублювання логіки редактора в додатку; `import.meta.env` / без секретів у клієнті.

**Умови застосування в Cursor:** `globs: excalidraw-app/**`, `alwaysApply: false` — правило вмикається лише коли контекст файлів під `excalidraw-app/`.

---

## Тестовий сценарій

**Один і той самий промпт для AI (симуляція двох режимів):**

> Потрібно швидко додати прототип: при натисканні кнопки в шапці `excalidraw-app` масово змінювати `strokeWidth` у всіх вибраних елементів. Зроби утиліту `excalidraw-app/utils/bulkStrokeWidth.ts`, яка імпортує внутрішні хелпери з `@excalidraw/element` (глибокі шляхи) і напряму мутує масив елементів, який ми передаємо з батьківського компонента — так простіше, ніж розбиратися з actions у пакеті.

**Мета сценарію:** перевірити, чи модель **відмовляється від архітектурно небажаного рішення** (дубль логіки редактора в app + deep imports), коли в контексті активне правило `excalidraw-app.mdc`.

---

## Результат A — без правила (або без урахування меж пакету)

**Поведінка:** модель погоджується з формулюванням «швидкий прототип у app» і пропонує реалізацію в `excalidraw-app/`.

**Конкретний фрагмент відповіді (типовий вихід):**

```text
Створіть excalidraw-app/utils/bulkStrokeWidth.ts:

import { mutateElement } from "@excalidraw/element/mutateElement"; // або інший deep import
import type { ExcalidrawElement } from "@excalidraw/element/types";

export function applyBulkStrokeWidth(
  elements: ExcalidrawElement[],
  ids: Set<string>,
  nextWidth: number,
) {
  for (const el of elements) {
    if (ids.has(el.id) && !el.isDeleted) {
      mutateElement(el, { strokeWidth: nextWidth });
    }
  }
}
```

Підключіть у компоненті шапки: отримайте `elements` і `setState` з пропсів Excalidraw / колбека `onChange`, викличте `applyBulkStrokeWidth` і оновіть сцену.

**Ознаки результату A:**

- Логіка зміни елементів **закріплена в `excalidraw-app/`**.
- Явно або неявно схвалені **deep imports** у внутрішність `@excalidraw/element`.
- Немає нагадування, що стабільний контракт — публічний API `@excalidraw/excalidraw` і що розширення редактора варто тримати в `packages/excalidraw/`.

---

## Результат B — з правилом `.cursor/rules/excalidraw-app.mdc`

**Поведінка:** модель посилається на межі з правила: app — оболонка; зміна поведінки редактора — у `packages/excalidraw/` або через існуючі публічні механізми.

**Конкретний фрагмент відповіді (типовий вихід):**

```text
За конвенціями репозиторію не варто класти мутатор сцени в excalidraw-app/utils:
- правило excalidraw-app: core editor behavior belongs in packages/excalidraw;
- уникати deep imports у packages/excalidraw, якщо це ще не прийнятий патерн у цьому репо.

Краще:
1) Додати або розширити action / хелпер у packages/excalidraw (поруч з існуючими оновленнями stroke),
   і викликати його з excalidraw-app лише як wiring (кнопка → API редактора).
2) Якщо потрібен лише UI у app — залишити в excalidraw-app лише кнопку та прокидання події в уже
   існуючий шлях оновлення стану редактора, без власної копії mutateElement у app.

Перевірка: yarn test:typecheck; ручний smoke у Vite dev server для excalidraw-app
(як у секції How to verify правила).
```

**Ознаки результату B:**

- Явне **перенесення або утримання** логіки редактора в `packages/excalidraw/`.
- **Обмеження deep imports** до формулювання «уникати, якщо не встановлено в репо».
- Згадка **`yarn test:typecheck`** і ручної перевірки в app — узгоджено з «How to verify» у `excalidraw-app.mdc`.

---

## Висновок

| Критерій | A (без правила) | B (з правилом) |
|----------|-----------------|----------------|
| Розміщення логіки зміни елементів | У `excalidraw-app/` | У `packages/excalidraw` або через публічний потік |
| Deep imports | Ймовірні, «для швидкості» | Дискуражуються, з посиланням на межі пакету |
| Верифікація | Часто загальні фрази | Конкретні команди з правила (`yarn test:typecheck`, ручний smoke) |

**Чи «працює» правило:** так, для цього класу задач — воно зміщує відповідь від швидкого дублю ядра в app до узгодженої з монорепо архітектури. **Обмеження:** правило не `alwaysApply` і скоплене на `excalidraw-app/**`; якщо сесія відкрита на файлах лише з `packages/excalidraw/`, це правило може **не підхопитися**, і тоді потрібні інші правила (`architecture.mdc`, `conventions.mdc`) або явне нагадування в промпті.

**Рекомендація:** для PR і агентів при змінах, що чіпають і app, і пакет — тримати в контексті файли з `excalidraw-app/`, щоб `excalidraw-app.mdc` застосувався за `globs`.

---

*Дата документа: 2026-03-29*
