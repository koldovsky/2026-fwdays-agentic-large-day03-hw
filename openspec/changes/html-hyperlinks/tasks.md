# Tasks: html-hyperlinks

Чеклист реалізації (можна відмічати по мірі виконання).

## Реалізація

- [x] **Canvas**: у `packages/element/src/renderElement.ts` для тексту з вирішеним URL (`element.link` або одиночний markdown у рядку до сабміту) — колір `TEXT_HYPERLINK_COLOR` з dark-mode фільтром і підкреслення під непорожніми рядками (`getTextHyperlinkRenderState`, `measureText`, `textAlign`).
- [x] **Hit-test**: у `packages/excalidraw/components/hyperlink/helpers.ts` у `isPointHittingLink` — гілка для `isTextElement` + `getTextHyperlinkUrl` + `hitElementBoundingBox`, якщо елемент не вибраний (іконка / view mode для інших типів без змін).
- [x] **SVG**: у `packages/excalidraw/renderer/staticSvgScene.ts` — `fill`, `text-decoration: underline`, внутрішній `<a>` для markdown-only тексту без `element.link`.
- [x] **Без регресій**: текст без посилання рендериться як раніше (`strokeColor`, без підкреслення з цієї фічі).

## Дані / UX (вже частково в коді)

- [x] Сабміт тексту з `[label](url)` у `App.tsx` через `parseMarkdownLink`: `text = label`, `link` = нормалізований URL + toast.

## Перевірка

- [ ] `yarn test:typecheck` (запустити локально)
- [ ] `yarn build` (запустити локально)
- [ ] `yarn test` (або `yarn test:update` лише якщо снапшоти очікувано змінились)
- [ ] Ручна перевірка: клік по підпису відкриває URL; вибраний елемент не відкриває посилання з першого кліку по тексту.

## Документація (за потреби)

- [x] Оновити `docs/memory/decisionLog.md` та `docs/memory/systemPatterns.md` для UX bbox тексту з посиланням.
- [ ] Після merge: позначити change `html-hyperlinks` як застосований або архівувати в `openspec/changes/archive/` (якщо заведете такий процес).
