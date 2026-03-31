# Огляд PR #3 — Alex Popkov (alex-popkov)

**PR:** [fix(editor): convert `<br>` tags to newlines in Mermaid imports (#10952)](https://github.com/koldovsky/2026-fwdays-agentic-large-day03-hw/pull/3)  
**Підхід SDD:** BMAD  
**Issue:** [excalidraw/excalidraw#10952 — `<br>` tags in Mermaid](https://github.com/excalidraw/excalidraw/issues/10952)

---

## 📋 Загальне резюме

Виправлення bug: `<br>` HTML-теги у Mermaid-діаграмах відображались як літеральний текст замість переносів рядків. Реалізація через BMAD Method: PRD → Architecture → Readiness Check → Implementation → Code Review. PRD (`_bmad-output/planning-artifacts/prd.md`) — зразковий документ. Код focused та якісний.

---

## ✅ Checks: Pre-merge критерії

### SDD-підхід обраний і обґрунтований
✅ **Ок**

BMAD підхід чітко зазначений. Обґрунтування присутнє і чесне: "Using the full BMad Method workflow for a scoped bug fix like this is admittedly over-engineering. It was chosen intentionally for learning purposes — to explore the end-to-end agentic workflow (PRD → Architecture → Readiness Check → Implementation → Code Review) on a real codebase with a well-defined issue." ✅

### Специфікаційні артефакти присутні
✅ **Ок** (з зауваженнями)

`_bmad-output/planning-artifacts/prd.md` — ✅ зразковий PRD:
- ✅ Product Purpose / Executive Summary
- ✅ User Stories (Journeys 1-4)
- ✅ Acceptance Criteria (Success Criteria + Measurable Outcomes)
- ✅ Non-functional Requirements (Performance)
- ✅ Out of Scope (Post-MVP)
- ✅ Risk Mitigation

`_bmad-output/planning-artifacts/architecture.md` — ✅ присутній  
`_bmad-output/planning-artifacts/implementation-readiness-report-*.md` — ✅ бонус, 100% FR coverage  

⚠️ **Відсутні Stories/Epics** (`_bmad-output/planning-artifacts/epics/`) — для скопованого bug fix це прийнятно, але варто відзначити.

**Назва файлу:** `prd.md` (lowercase) vs очікуваного `PRD.md` у документації — незначне, але варто уточнити конвенцію.

### Код реалізації присутній
✅ **Ок**

9 файлів змінено — focused blast radius:
- `packages/common/src/sanitizeMermaid.ts` — нові утиліти
- `packages/common/src/sanitizeMermaid.test.ts` — unit tests (18 tests)
- `packages/excalidraw/components/TTDDialog/common.ts` — integration
- `packages/excalidraw/components/TTDDialog/common.test.ts` — integration tests
- `packages/excalidraw/App.tsx` — clipboard paste path
- `_bmad-output/` — артефакти BMAD

### Self-review checklist
❌ **Ні**

PR опис **не містить** self-review checklist. Це обов'язкова вимога воркшопу (мінімум 8 пунктів). PR опис добре написаний, але checklist з ≥8 пунктів у форматі `- [x]` / `- [ ]` відсутній.

**Необхідно додати:**
```markdown
## Self-review checklist
- [x] SDD підхід обраний і обґрунтований (BMAD)
- [x] Реалізація відповідає специфікації (FR1-FR10)
- [x] Конвенції проєкту дотримані (TypeScript, functional)
- [x] Edge cases оброблені (всі <br> варіанти, case-insensitive)
- [x] Blast radius прийнятний (9 файлів, scope: Mermaid import pipeline)
- [x] Існуючі тести проходять (no regressions)
- [x] Нові тести додані (18 unit + integration)
- [x] Відсутні security concerns
- [x] i18n: не змінено (text-level sanitization, no user-facing strings)
- [x] Без hardcoded значень
```

### Blast radius та відповідність spec
✅ **Ок**

9 файлів — відповідає BMAD артефактам та PRD scope. Sanitization scoped до Mermaid import pipeline (FR5, FR6). Відповідність spec: всі FR1-FR10 мають code changes. Non-MVP items (HTML entity handling, rich text) — ✅ не реалізовані (правильно).

---

## 📝 Деталі перевірки BMAD артефактів

### `prd.md`
✅ Executive Summary — чіткий, 2-3 речення про фічу (bug fix scope)  
✅ User Stories (Journeys 1-4) — конкретні персони, сценарії  
✅ Success Criteria — user, business, technical, measurable outcomes  
✅ Functional Requirements (FR1-FR10) — повний перелік  
✅ Non-Functional Requirements (Performance)  
✅ Out of Scope (Post-MVP / Phase 2, 3)  
✅ Risk Mitigation — таблиця ризиків з мітигацією  
✅ Факти відповідають реальному Excalidraw проєкту  

### `architecture.md`
✅ Компоненти, що змінюються, описані  
✅ Sanitization placement strategy (ADR)  
✅ Impact mapping  

### Консистентність артефактів
✅ PRD ↔ Architecture ↔ Implementation — консистентні

---

## 🔍 Реалізація — деталі

### `sanitizeMermaid.ts`
✅ Regex `/<br\s*\/?>/gi` — покриває всі варіанти (<br>, <br/>, <br />)  
✅ Case-insensitive (`i` flag)  
✅ Окремий модуль у `@excalidraw/common` — ✅ правильне місце для unit testing

### Unit Tests (18 tests)
✅ Покривають: всі `<br>` варіанти, case sensitivity, mixed HTML, edge cases  
✅ Behavioral tests (не mock-based)

### Integration (`TTDDialog/common.test.ts`)
✅ End-to-end sanitization verification

### Blast radius
✅ `App.tsx` і `TTDDialog/common.ts` — тільки 2 entry points sanitization  
✅ Жодних змін поза Mermaid import pipeline

---

## 📌 PR Title

❌ "fix(editor): convert `<br>` tags to newlines in Mermaid imports (#10952)"

Це технічно коректний conventional commits формат, але **не відповідає вимогам воркшопу**. Очікуваний формат:
**"Day 3: Alex Popkov — SDD Assignment"** або подібний з іменем учасника.

---

## 🎯 Підсумок оцінки

| Критерій | Статус |
|---|---|
| SDD підхід зазначений | ✅ |
| Обґрунтування підходу | ✅ (чесне, з поясненням over-engineering) |
| PRD присутній і якісний | ✅ зразковий |
| User Stories / Journeys | ✅ (4 journeys) |
| Acceptance Criteria | ✅ |
| Out of Scope | ✅ |
| Architecture doc | ✅ |
| Epics/Stories | ⚠️ відсутні (прийнятно для bug fix) |
| Реалізація присутня | ✅ |
| Tests (unit + integration) | ✅ (18 unit + integration) |
| Self-review checklist 8+ | ❌ відсутній |
| Blast radius ≤15 файлів | ✅ (9 файлів) |
| Відповідність spec (FR1-FR10) | ✅ |
| PR title format | ❌ |

**Загальний висновок:** ⚠️ Відмінна технічна робота та BMAD артефакти, але **не вистачає self-review checklist** та PR title не відповідає формату воркшопу. Додай checklist — і PR буде готовий до merge.
