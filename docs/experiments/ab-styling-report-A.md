# A/B test — styling rule (variant A)

## Мета та промпт P

**Мета:** перевірити, наскільки модель дотримується правила `.cursor/rules/styling.mdc` при реалізації невеликої UI-зміни в `excalidraw-app` (colocated SCSS, без нового стеку стилів).

**Промпт P (дослівно):**

> У цьому репозиторії (Excalidraw monorepo, Yarn workspaces) зроби невелику зміну в excalidraw-app:
>
> 1) Додай dev-only підказку в UI: короткий текст на кшталт «Coursework / dev build», який видно лише коли import.meta.env.DEV === true (у production збірці не показувати).
>
> 2) Винеси стилі в colocated *.scss поруч із React-компонентом (import "./Something.scss" з того ж каталогу). Не додавай нових npm-пакетів і не використовуй CSS-in-JS для цієї фічі.
>
> 3) Не змінюй: packages/excalidraw/scene/renderer.ts, packages/excalidraw/data/restore.ts, packages/excalidraw/actions/manager.ts, packages/excalidraw/types.ts.
>
> 4) Наприкінці коротко переліч змінені файли та як перевірити (yarn start).

---

## Нові / змінені файли (під час виконання P)

| Шлях | Роль |
|------|------|
| `excalidraw-app/components/DevBuildHint.tsx` | Компонент з `import.meta.env.DEV` |
| `excalidraw-app/components/DevBuildHint.scss` | Colocated стилі |
| `excalidraw-app/App.tsx` | Імпорт і рендер `<DevBuildHint />` |

---

## Фрагменти коду (styling: SCSS, colocation)

**Імпорт colocated SCSS і умова dev (без CSS-in-JS):**

```1:13:excalidraw-app/components/DevBuildHint.tsx
import "./DevBuildHint.scss";

export const DevBuildHint = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="dev-build-hint" role="status" aria-hidden="true">
      Coursework / dev build
    </div>
  );
};
```

**Стилі в сусідньому `*.scss`, вкладеність під `.excalidraw-app` (узгоджено з обгорткою в `App.tsx`):**

```1:17:excalidraw-app/components/DevBuildHint.scss
.excalidraw-app {
  .dev-build-hint {
    position: fixed;
    bottom: 0.5rem;
    left: 0.5rem;
    z-index: 10;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    line-height: 1.2;
    opacity: 0.65;
    pointer-events: none;
    color: var(--color-on-surface, #1b1b1f);
    background: var(--color-surface-low, rgba(255, 255, 255, 0.85));
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  }
}
```

**Підключення в оболонці додатка:**

- Імпорт: `import { DevBuildHint } from "./components/DevBuildHint";`
- JSX: `<DevBuildHint />` одразу після кореневого `<div className={clsx("excalidraw-app", ...)}>`.

---

## Відповідність очікуванням з `styling.mdc`

| Очікування з правила | Результат |
|----------------------|-----------|
| Colocated `*.scss` поруч із `.tsx`, імпорт `import "./Foo.scss"` | Так: `DevBuildHint.scss` поруч із `DevBuildHint.tsx`. |
| Не додавати другий стек (CSS-in-JS) для UI | Так: лише SCSS + класи. |
| Токени / змінні замість «магічних» кольорів де доречно | Частково: використано `var(--color-on-surface, …)` та `var(--color-surface-low, …)` з fallback. |
| Не засмічувати глобальні entry-стилі фічею | Так: не чіпали `excalidraw-app/index.scss` для цієї підказки. |

**Висновок:** реалізація узгоджена з ключовими пунктами `styling.mdc` (colocation, SCSS, без CSS-in-JS для фічі).

---

## Підсумок змін (`git diff` / перелік)

**Відстежувані файли (diff):**

```text
 excalidraw-app/App.tsx | 2 ++
 1 file changed, 2 insertions(+)
```

Додатково (untracked під час сесії): `excalidraw-app/components/DevBuildHint.tsx`, `excalidraw-app/components/DevBuildHint.scss`.

**Перевірка:** `yarn start` — у dev з’являється підказка «Coursework / dev build»; після `yarn build` / production — компонент не рендериться (`import.meta.env.DEV === false`).

---

## Примітка після кроку 3 (baseline)

Код фічі P відкочено (`git restore` для змінених tracked-файлів; нові компонентні файли видалено). Цей звіт збережено в репозиторії як артефакт експерименту.
