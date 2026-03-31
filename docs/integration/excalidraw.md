## Інтеграція `@excalidraw/excalidraw` (шпаргалка)

Це **high-level** конспект по інтеграції. Канонічна довідка з повним переліком props/API живе в `dev-docs/docs/@excalidraw/excalidraw/*`.

### Базове підключення

```ts
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
```

Рендеріть компонент у контейнері з **фіксованою висотою** (наприклад, `height: 500px`).

### SSR / Next.js

Excalidraw не підтримує SSR, тому для Next.js використовуйте dynamic import з `ssr: false`.

Орієнтир з прикладами: `dev-docs/docs/@excalidraw/excalidraw/integration.mdx`.

### Ключові “точки розширення”

- **`initialData`**: початкові елементи/стан/файли.
- **`onChange(elements, appState, files)`**: реагувати на зміни (збереження у своє сховище, аналітика тощо).
- **`excalidrawAPI` callback**: отримати “handle” на API після mount.
- **UI кастомізація**: через “children components” (Sidebar/MainMenu/Footer/WelcomeScreen) — див. `dev-docs/.../api/children-components/*`.

### `excalidrawAPI` — що зазвичай потрібно

Типові сценарії (повний список див. `dev-docs/docs/@excalidraw/excalidraw/api/props/excalidraw-api.mdx`):

- **`updateScene(sceneData)`**: оновити `elements`/`appState`, керувати undo через `captureUpdate`.
- **`getSceneElements()`** / **`getAppState()`**: читання поточного стану.
- **`updateLibrary(...)`**: керувати бібліотекою.
- **`addFiles(...)`** / **`getFiles()`**: робота з файлами (зображеннями) в кеші.
- **`scrollToContent(...)`**: фокус на елементах.
- **`refresh()`**: якщо контейнер змінив позицію нестандартним способом (не page scroll/resize).

### “Source of truth” інтегратора

Для embed-інтеграцій бажано трактувати:

- `elements` + `appState` як дані, що ви зберігаєте/відновлюєте,
- `excalidrawAPI.updateScene()` як контрольований спосіб застосування оновлень,
- `onChange` як “стрім” змін, який треба дебаунсити/буферизувати на вашій стороні.

### Де читати детальніше

- Інтеграція: `dev-docs/docs/@excalidraw/excalidraw/integration.mdx`
- API intro: `dev-docs/docs/@excalidraw/excalidraw/api/api-intro.mdx`
- Props: `dev-docs/docs/@excalidraw/excalidraw/api/props/props.mdx`
- `excalidrawAPI`: `dev-docs/docs/@excalidraw/excalidraw/api/props/excalidraw-api.mdx`

