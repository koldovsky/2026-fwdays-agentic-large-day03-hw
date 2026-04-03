# Excalidraw — контекст проєкту

## Що це

Монорепозиторій **Excalidraw**: бібліотека редактора (`@excalidraw/excalidraw`) і повноцінний веб-додаток (`excalidraw-app/`). Малювання сцени — **Canvas 2D**, не React DOM. Стан редактора змінюється через **action pipeline** (`actionManager.dispatch()`), без сторонніх глобальних state-менеджерів.

## Структура (скорочено)

| Шлях | Роль |
|------|------|
| `packages/excalidraw/` | UI, actions, дані, інтеграція з бібліотекою |
| `packages/element/` | Типи елементів, bounds, колізії, **рендер елементів на canvas** (`renderElement.ts`) |
| `packages/common/` | Константи, кольори, `normalizeLink`, теми |
| `packages/math/` | Геометрія, точки, кути |
| `excalidraw-app/` | Vite-додаток, колаборація, хостинг |

## Текстові елементи (орієнтир)

- Модель: `ExcalidrawTextElement` — `text`, `originalText`, шрифт, вирівнювання, опційно **`link`** (URL або внутрішнє посилання на елемент).
- Редагування: WYSIWYG у DOM; на canvas текст малюється в `@excalidraw/element` (`renderElement`).
- Експорт SVG: `packages/excalidraw/renderer/staticSvgScene.ts`.

## Якість і команди

- `yarn test` / `yarn test:update` — тести (Vitest).
- `yarn test:typecheck` — TypeScript.
- `yarn build` — збірка пакетів і застосунку.

## Документація в репозиторії

- Операційний контекст: `docs/memory/*`, `AGENTS.md`, `CLAUDE.md`.
- Специфікації фіч: `docs/specs/` (наприклад markdown-посилання — #11024).

## Обмеження для змін (важливо)

- Не чіпати захищені файли без явного схвалення (`packages/excalidraw/scene/renderer.ts`, `data/restore.ts`, `actions/manager.ts`, `types.ts`).
- Не додавати залежності без погодження.
- Без `eval`, без необґрунтованого `any` / `@ts-ignore`.
