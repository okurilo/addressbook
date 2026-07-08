# PoC Справочника

Локальная frontend-песочница для разработки PoC интерфейса справочника без доступа к внутреннему окружению, реальной Pulse UI и backend.

## Стек

- React 18
- TypeScript
- Vite
- styled-components
- `@reach/router`
- локальные stubs для `@pulse/ui/*`

## Запуск

```bash
npm install
npm run dev
```

## Правила разработки

- Используются только именованные импорты.
- `any` запрещён.
- Backend и реальные интеграции в PoC не добавляются.
- Изменения вносятся только в рамках активной итерации.
- После каждой итерации обязательны `npm run typecheck` и `npm run build`.

## Доступные маршруты

- `/`
- `/employee/:employeeId`
- `/structure`
- `/structure/:departmentId`
- `/reference-phones`
- `/favorites`

## Mock-сценарии

Слева доступна служебная панель переключения сценариев:

- `success`
- `loading`
- `empty`
- `error`

Панель намеренно визуально отделена от продуктовой области.
# addressbook
