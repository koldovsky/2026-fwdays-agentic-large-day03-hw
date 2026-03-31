# Progress — стан робіт (пам’ять)

> Не дублюй GitHub Issues; тут — **короткий зріз** для людей і агентів: що вже є в документації й інфраструктурі форку.

## Документація та контекст (локально в цьому worktree)

- [x] Memory Bank: `projectbrief`, `techContext`, `systemPatterns`
- [x] Розширений Memory Bank: `productContext`, `activeContext`, `progress`, `decisionLog`
- [x] SSD-навігатор: `docs/spec/SSD.md`
- [x] Продукт: `docs/product/PRD.md`, `domain-glossary.md`
- [x] Техніка: `docs/technical/architecture.md`
- [x] Дев-онбординг (коротко): `docs/development/get-started.md`
- [x] Contributing (коротко): `docs/development/contributing.md`
- [x] Інтеграція пакета (шпаргалка): `docs/integration/excalidraw.md`
- [x] Індекс/мапінг док: `docs/README.md`
- [x] `AGENTS.md` для Cursor
- [x] `.cursorignore` (патерни для великого monorepo)
- [x] Налаштовано `.coderabbit.yaml` для Day 2 авто-оцінювання
- [x] Розширено `AGENTS.md` під формальні секції перевірки N2
- [x] Rule-set у `.cursor/rules/` доведено до 6+ з секціями "How to verify"
- [x] Додано security rule для SVG/import/collaboration контексту
- [x] Додано 2 custom commands у `.cursor/commands/`
- [x] Додано A/B validation документ: `docs/ab-validation.md`
- [x] Agent Skills (бонус): `build-verify`, `memory-bank-update`, `codebase-explore` у `.cursor/skills/*/SKILL.md`
- [x] Бонус Repomix: reference skill `.cursor/skills/repomix-generated-docs/` (`npx repomix --skill-generate … --skill-output`)

## Що ще має сенс (за потреби роботи)

- [ ] Оновлювати `activeContext.md` під кожну серйозну задачу
- [ ] Заносити архітектурні рішення в `decisionLog.md`
- [ ] Підтримувати PRD/архітектуру в синхроні з поведінкою після великих змін upstream

## Воркшоп vs повсякденна робота

- Вимоги **CodeRabbit** у `.coderabbit.yaml` покривають мінімум (3 файли Memory Bank + тех/продукт доки).
- Повний набір у `docs/memory/` — **для зручної щоденної роботи**; перевірка може не вимагати всіх файлів, але вони корисні команді.
- Для Day 2 зібрано мінімальний "прохідний" пакет артефактів: rules + commands + A/B + оновлений `AGENTS.md`.
- Repomix reference-pack згенеровано вручну командою з кореня; не входить у обов’язковий мінімум CodeRabbit (чеклист PR: бонус-пункт можна відмітити).
