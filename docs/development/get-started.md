## Get started (локальна розробка)

Це “коротка версія” `dev-docs/docs/introduction/development.mdx`, адаптована під **цей** monorepo і підхід SSD.

### Вимоги

- Node.js (див. `package.json` → `engines`, очікувано `>=18`)
- Yarn 1 (workspaces)
- Git

### Встановлення

```bash
yarn
```

### Запуск дев-сервера

```bash
yarn start
```

### Корисні команди якості

```bash
yarn fix
yarn test
yarn test:update
yarn test:typecheck
```

### Collaboration (локально)

Оригінальна документація очікує окремий collab server (upstream-проєкт). У цьому репо код клієнта колаборації живе в `excalidraw-app/`, але сервер **не** є частиною цієї кодової бази.

Орієнтир: `dev-docs/docs/introduction/development.mdx` (секція “Collaboration”).

### Self-hosting (Docker)

Upstream згадує Docker-образ клієнта. Важливе застереження з оригіналу:

- self-hosted інстанс клієнта може **не підтримувати sharing/collaboration** без окремої інфраструктури.

Орієнтир: `dev-docs/docs/introduction/development.mdx` (секція “Self-hosting”).

### SSD-процес (коли що правити)

Якщо зміна впливає на:

- **користувацьку поведінку/фічу** → оновіть `docs/product/PRD.md`
- **термінологію/контракти** → оновіть `docs/product/domain-glossary.md`
- **потоки/межі пакетів/API** → оновіть `docs/technical/architecture.md`
- **контекст поточної роботи/рішення** → оновіть `docs/memory/*`

