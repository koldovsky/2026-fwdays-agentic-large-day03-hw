---
name: excalidraw-documentation
description: >
  Reference pack цього monorepo (Excalidraw форк): структура, повний злитий код у references/files.md,
  tech stack. Використовуй для навігації по кодовій базі, пошуку реалізацій і узгодження документації
  з кодом. Тригери: "де це в коді", "як влаштовано", "онови доки під зміни", "repomix reference".
---

# Excalidraw monorepo — Repomix reference skill

Згенеровано [Repomix](https://github.com/yamadashy/repomix) (`npx repomix --skill-generate`).
Орієнтир: **937 файлів** у пакеті; детальна статистика — у `references/summary.md`.

## Коли використовувати

- Потрібно швидко знайти файл або фрагмент коду без повного обходу дерева в IDE.
- Треба простежити залежності між `packages/*` та `excalidraw-app/`.
- Оновлюєш `docs/spec/`, `docs/product/`, `docs/technical/`, `docs/memory/` і треба звірити з фактичним кодом.

## Документація в цьому форку (живі джерела правди)

| Шлях | Призначення |
|------|-------------|
| `docs/spec/SSD.md` | SSD/process |
| `docs/product/PRD.md`, `docs/product/domain-glossary.md` | продукт |
| `docs/technical/architecture.md` | технічна архітектура |
| `docs/memory/*` | operational memory |
| `AGENTS.md` | вхідний контекст для агентів |

## Файли в цьому скілі

| Файл | Зміст |
|------|--------|
| `references/summary.md` | **Почни звідси** — формат, статистика, мови |
| `references/project-structure.md` | дерево каталогів з підрахунком рядків |
| `references/files.md` | увесь включений текст репо (шукай `## File: <path>`) |
| `references/tech-stack.md` | мови, фреймворки, залежності |

## Як користуватися

### 1. Знайти розташування

Відкрий `references/project-structure.md` і звузь область (наприклад `packages/excalidraw/`, `excalidraw-app/`).

### 2. Прочитати вміст файлу

У `references/files.md` шукай маркер:

```text
## File: packages/excalidraw/actions/manager.tsx
```

### 3. Пошук по коду

Grep по `references/files.md` за символом, рядком помилки або назвою фічі.

### 4. Документація vs код

1. Визнач змінену зону в `project-structure.md`.
2. Витягни релевантні шматки з `files.md`.
3. Оновлюй лише відповідні файли в `docs/*`, без дублювання повної архітектури в Memory Bank.

## Обмеження

- Це **зліпок для читання**; правки завжди вносити в **реальні файли репозиторію**, не в `references/*`.
- Дуже великі файли та бінарники можуть бути скорочені або виключені — див. `summary.md`.

## Відтворити генерацію

З кореня репозиторію:

```bash
npx repomix --skill-generate excalidraw-documentation --skill-output ".cursor/skills/repomix-generated-docs" --force
```
