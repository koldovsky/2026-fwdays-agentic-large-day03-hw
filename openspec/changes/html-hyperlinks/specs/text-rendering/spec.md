# Delta: text-rendering — ADDED requirements

**Change:** `html-hyperlinks`  
**Проти baseline:** `openspec/specs/text-rendering/spec.md`

Нижче лише **нові або змінені** вимоги. Усе, що не згадано, залишається як у baseline.

## ADDED Requirements

Контекст: після сабміту з `[label](url)` у сцені зберігаються `element.text === label` і truthy `element.link`. До сабміту стилізація можлива, якщо весь видимий вміст — один валідний markdown-посилання (див. baseline «Markdown Link Detection»).

### REQ-TR-LINK-001 — Колір посилання

- **GIVEN** `isTextElement(element)` і вирішений URL гіперпосилання (`getTextHyperlinkUrl`: `element.link` або одиночний валідний `[label](url)` у `element.text`)
- **WHEN** текст малюється на canvas
- **THEN** колір заливки MUST відрізнятися від `strokeColor`; MUST застосовуватися той самий dark-mode фільтр до кольору посилання, що й для іншого hyperlink UI

### REQ-TR-LINK-002 — Підкреслення

- **GIVEN** той самий випадок, що в REQ-TR-LINK-001
- **WHEN** кожен непорожній рядок рендериться
- **THEN** під базовою лінією рядка MUST бути візуальне підкреслення; порожні рядки MUST NOT підкреслюватися

### REQ-TR-LINK-003 — Без посилання

- **GIVEN** URL гіперпосилання не вирішено
- **WHEN** текст рендериться
- **THEN** вигляд MUST збігатися з baseline (`strokeColor`, без підкреслення з цієї фічі)

### REQ-TR-LINK-004 — SVG експорт

- **GIVEN** текстовий елемент з вирішеним URL
- **WHEN** експортується SVG
- **THEN** підпис MUST мати вигляд гіперпосилання (`fill` як у REQ-TR-LINK-001, `text-decoration: underline` на `<text>`); зовнішній або внутрішній `<a>` MUST уникати дублювання, якщо `element.link` вже дає обгортку

### REQ-TR-LINK-005 — Hit-test по тексту

- **GIVEN** `isTextElement` з вирішеним URL і елемент не вибраний
- **WHEN** pointer у межах bounding box тексту
- **THEN** hit MUST трактуватися як посилання для відкриття URL через `normalizeLink` / `onLinkOpen` / `handleElementLinkClick`

### REQ-TR-LINK-006 — Не-текст та інші гілки

- **GIVEN** не-текстовий елемент з `link`
- **WHEN** обчислюється hit-test
- **THEN** MUST зберігатися baseline (іконка / view mode); для тексту bbox MUST застосовуватися незалежно від `isMobile` у цій гілці

## Non-goals (без змін)

- Повний markdown у тексті.
- Зміна UX **редагування** тексту в wysiwyg.
- Зміна моделі embeddable або загальної семантики `link` для не-текстових елементів понад необхідне для сумісності.
