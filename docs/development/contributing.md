## Contributing (короткий гайд для цього репо)

Це стислий перенос із `dev-docs/docs/introduction/contributing.mdx`, з акцентом на практику роботи в цьому монорепо та SSD.

### Перед тим як почати

- Для **великих** змін зафіксуйте намір у специфікації: `docs/product/PRD.md` / `docs/technical/architecture.md` (див. `docs/spec/SSD.md`).
- Не плануйте зміни, що ламають публічні контракти, без узгодження і тестів.

### Локальний старт

Див. `docs/development/get-started.md`.

### Гілка для PR

```bash
git checkout -b your-branch-name
```

### Якість перед PR

Мінімум:

```bash
yarn test:typecheck
yarn test
```

Якщо зміни торкаються форматування/стилю або CI скаржиться:

```bash
yarn fix
yarn test:update
```

### Title / тип змін (конвенція)

Орієнтир (upstream):

- `feat`: нова фіча
- `fix`: багфікс
- `docs`: тільки документація
- `refactor`: рефактор без зміни поведінки
- `perf`: оптимізація
- `test`: тести
- `build` / `ci` / `chore`: інфраструктура

### Ручне тестування

Після змін в UI/UX бажано руками перевірити в браузері:

- базове малювання (shape/arrow/text)
- undo/redo
- експорт (PNG/SVG) якщо зачеплено
- paste/clipboard якщо зачеплено

### Переклади (i18n)

Upstream використовує Crowdin і має поріг готовності перекладів. Якщо додаєте нові строки, тримайте в голові:

- ключі — в `packages/excalidraw/locales/*.json`
- перевірка повноти — через скрипти coverage локалей (див. `docs/technical/architecture.md` та `docs/memory/techContext.md`)

