# Proposal: узгодження стану при перемиканні eraser клавішею E

## Why

У [excalidraw/excalidraw#9852](https://github.com/excalidraw/excalidraw/issues/9852) описано, що шорткат **`toggleEraserTool` (`E`)** може оновлювати `activeTool` без того ж набору скидань `AppState`, що й вибір інструмента через **`App.setActiveTool`** (наприклад, залишається `multiElement` під час багатоточкового малювання лінії/стрілки). Це дає неконсистентний стан і відмінну поведінку порівняно з кліком по гумці в панелі.

## What

Оновити `perform` для **`actionToggleEraserTool`** так, щоб при зміні активного інструмента застосовувався **той самий логічний пакет полів**, що й у `setActiveTool` для відповідного **цільового** `activeTool` (snap lines, `originSnapOffset`, `activeEmbeddable`, `selectedLinearElement`, `multiElement`, `editingGroupId`, виділення — згідно з гілками selection / lasso / інше).

## Impact

- **Файли:** [`packages/excalidraw/actions/actionCanvas.tsx`](../../../packages/excalidraw/actions/actionCanvas.tsx) (імплементація)
- **Тести:** новий або розширений файл під [`packages/excalidraw/tests/`](../../../packages/excalidraw/tests/)
- **OpenSpec:** цей change-set

## Risks

- **Втрата незавершеного малювання:** як і при перемиканні на eraser через UI, незавершений `multiElement` буде скинуто — це **свідомий паритет** з `setActiveTool`, не regression для UI-шляху.
- **Подвійне застосування `selectedElementIds`:** залишаємо існуючу семантику action (очищення виділення при toggle eraser), додаємо лише відсутні поля стану.

## Policy (зафіксовано)

Обрано **паритет з `setActiveTool`** для переходів стану (не no-op блокування `E`), після порівняння гілок у [`App.tsx`](../../../packages/excalidraw/components/App.tsx) `setActiveTool` і поточного `perform` у `actionToggleEraserTool`.
