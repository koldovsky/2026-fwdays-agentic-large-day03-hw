## Документація цього репозиторію (SSD + Memory Bank)

Ця `docs/` — **робоча документація форку/worktree**, оптимізована під **SSD (Spec-Driven Development)** і короткі сесії з агентами/людьми.

Паралельно в репозиторії є `dev-docs/` — **оригінальна dev-документація** (Docusaurus) з фокусом на **інтеграцію** та **довідку по API**.

### Як читати (швидка навігація)

- **SSD процес**: `docs/spec/SSD.md`
- **Продукт (що/навіщо)**: `docs/product/PRD.md`
- **Домен (терміни/контракти)**: `docs/product/domain-glossary.md`
- **Техніка (як влаштовано)**: `docs/technical/architecture.md`
- **Memory Bank (живий контекст)**: `docs/memory/*`
- **Dev onboarding (локальний старт, команди)**: `docs/development/get-started.md`
- **Contributing (практичні гайдлайни)**: `docs/development/contributing.md`
- **Інтеграція `@excalidraw/excalidraw` (коротко + посилання)**: `docs/integration/excalidraw.md`

### Мапінг `dev-docs/` → `docs/` (що де живе)

| Тема | `dev-docs/` (оригінал) | `docs/` (цей репо) |
| --- | --- | --- |
| Перший старт | `dev-docs/docs/introduction/get-started.mdx` | `docs/development/get-started.md` |
| Розробка/команди | `dev-docs/docs/introduction/development.mdx` | `docs/development/get-started.md` + `docs/memory/techContext.md` |
| Contributing | `dev-docs/docs/introduction/contributing.mdx` | `docs/development/contributing.md` |
| Інтеграція пакета | `dev-docs/docs/@excalidraw/excalidraw/integration.mdx` | `docs/integration/excalidraw.md` |
| API довідка (props/api/utils) | `dev-docs/docs/@excalidraw/excalidraw/api/*` | `docs/integration/excalidraw.md` (high-level) + посилання на `dev-docs/` |
| Внутрішні деталі редактора | (частково/IN PROGRESS в `dev-docs/`) | `docs/technical/architecture.md` + `docs/memory/systemPatterns.md` |

### Принцип

- `dev-docs/` — **canonical** для “як інтегрувати пакет / які пропси та API”.
- `docs/` — **canonical** для “як ми працюємо (SSD), що очікуємо (PRD), як влаштовано в цьому монорепо (архітектура), і що зараз робимо (memory)”.

