# Pull request description (Day 3) — copy into GitHub

**Рекомендований заголовок PR (один рядок, без `##`):**  
`Day 3 SDD: #11024 markdown text hyperlinks — Vitalii Yurkov`

Скопіюйте вміст нижче в опис PR (base: `koldovsky/2026-fwdays-agentic-large-day03-hw` → `master`, head: ваш форк).

---

## Day 3: SDD Assignment

**Учасник:** Віталій Юрков

### Обраний SDD-підхід

**Основний:** **OpenSpec** — `openspec/changes/html-hyperlinks/` (сценарії поведінки, delta spec, tasks).

**Додатковий артефакт (не окремий підхід):** коротка markdown-спека issue — `docs/specs/11024.md` (Goal, Changes Required, шляхи файлів), щоб швидко звірятися з `.coderabbit.yaml` для `docs/specs/*.md`.

### Issue

- **Issue URL:** https://github.com/excalidraw/excalidraw/issues/11024
- **Опис:** Текстові елементи з markdown-посиланням мають виглядати та відкриватися як гіперпосилання (підпис клікабельний), узгоджено з існуючою моделлю `link` і санітизацією URL.

### Зроблено

- Парсинг `[label](url)` у `@excalidraw/common` (`parseMarkdownLink`) з відхиленням небезпечних схем; тести в `packages/common/tests/markdownLink.test.ts`.
- Після сабміту тексту: збереження **видимого** `label` у `element.text`, URL у `element.link` (toast у `App.tsx`).
- Canvas / SVG / hit-test — як у комітах `feat(text): …` (див. diff).

### Self-Review Checklist

- [x] SDD: основний артефакт — OpenSpec; `docs/specs/11024.md` узгоджений з реальними шляхами в монорепо
- [x] Реалізація відповідає оновленим спекам (у т.ч. trade-off вибору vs bbox link)
- [x] Дотримані конвенції проєкту
- [x] Edge cases для парсера покриті unit-тестами
- [ ] **Blast radius:** у PR є великий шар workshop-доків (`docs/**`, memory bank тощо) — окремо від фічі; ментору видно в diff; за потреби можна винести фічу в окрему гілку без scaffold (обговорення)
- [ ] `yarn test:typecheck` / `yarn build` / `yarn test` — прогнати локально або підтвердити зелений CI
- [x] Нові unit-тести: `parseMarkdownLink`
- [x] Security: відхилення небезпечних URL у парсері + `normalizeLink`
- [x] i18n: toast у `en.json`
- [x] Колір посилання: одна константа `TEXT_HYPERLINK_COLOR` (у т.ч. data-URI іконок у `helpers.ts`)

### Нотатки

Найскладніше — `getPlainTextForMeasurement` / `getTextHyperlinkRenderState` для стану до і після сабміту. Після review: виправлено `docs/specs/11024.md` (шляхи, Changes Required, Non-goals), mojibake у `decisionLog.md`, дубль hex у SVG іконок.

---

**Локальна перевірка:** `yarn test:typecheck`, `yarn build`, `yarn test`.
