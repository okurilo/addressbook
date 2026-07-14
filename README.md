# PoC Справочника

Локальная frontend-песочница для разработки PoC интерфейса справочника без реальной Pulse UI и собственного backend.

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
npm run typecheck
npm run build
```

## Правила разработки

- Используются только именованные импорты.
- `any` запрещён.
- Собственный backend не добавляется; реальные frontend API подключаются через общий `src/http-requests/http.ts`.
- Изменения вносятся только в рамках активной итерации.
- После каждой итерации обязательны `npm run typecheck` и `npm run build`.
- Полный контракт host theme и доступные Pulse tokens описаны в [`docs/THEME.md`](docs/THEME.md).
- Проверенные контракты компонентов Pulse UI, aliases и исключения описаны в [`docs/PULSE-UI.md`](docs/PULSE-UI.md).
- Полная типизация Pulse UI, файловый индекс и инструкция для точечного чтения LLM находятся в [`docs/pulse-ui-types/README.md`](docs/pulse-ui-types/README.md).
- Контракт общего запросника и поиск сотрудников описаны в [`docs/HTTP-REQUESTS.md`](docs/HTTP-REQUESTS.md).
- Продуктовые переходы верхнего поиска зафиксированы в [`docs/SEARCH-SCENARIOS.md`](docs/SEARCH-SCENARIOS.md).

Пустые состояния реализуются компонентом `@pulse/ui/components/Empty`. `EmptyState` в используемой версии DS отсутствует и локально не эмулируется.

Перед изменением любого Pulse-компонента используйте `docs/pulse-ui-types/INDEX.md` или `EXPORTS.md` и открывайте только нужные generated-файлы. Обе raw-части целиком по умолчанию не читаются. Каталог обновляется командой `npm run docs:pulse-types`.

## Доступные маршруты

Локальная host-обвязка использует базовый путь `/platform/globalsearch`:

- `/platform/globalsearch/addressbook`
- `/platform/globalsearch/addressbook/employee/:employeeId`
- `/platform/globalsearch/addressbook/structure`
- `/platform/globalsearch/addressbook/structure/:departmentId`
- `/platform/globalsearch/addressbook/reference-phones`
- `/platform/globalsearch/addressbook/favorites`

Маршруты объявлены через `@reach/router`: общий layout обёрнут в `LocationProvider`, экраны выбираются `Router`, а переходы выполняются через `useNavigate`/`Redirect`. Прямое управление `window.history` в приложении не используется.

При встраивании в существующий Reach Router модуль подключается с wildcard, чтобы внешний `default`-маршрут не перехватывал дочерние URL:

```tsx
<Router primary={false}>
  <Layout default />
  <AddressBook path="/addressbook/*" />
</Router>
```

Родительский router уже находится под `/platform/globalsearch`, поэтому этот route соответствует полному публичному префиксу `/platform/globalsearch/addressbook`. Внутренний Router AddressBook имеет `basepath="/"`: его `routePaths` уже абсолютные и не должны повторно получать внешний basepath.

`@reach/router@1.3.4` является legacy-библиотекой и не публикует location-обновления в React 18 `StrictMode`, поэтому локальная точка входа работает без `StrictMode` до отдельной миграции роутера.

## Mock-сценарии

Доступны сценарии локального fetch-mock:

- `success`
- `loading`
- `empty`
- `error`

Активный сценарий хранится в `localStorage` под ключом `addressbook-mock-scenario`.

Mock-сценарии продолжают обслуживать недавние контакты, избранное, структуру и справочные телефоны. Поиск сотрудников с непустым `q` направляется в реальный `multiSearch` и не зависит от mock-сценария.

## API поиска

Поиск использует общий `http = new HttpRequest('/api-web/', httpRequestOptions)` и вызывает `http.get`:

Продуктовая реализация запроса находится в `src/apps/AddressBook/api/directory/search.ts`; внешний `src/http-requests/http.ts` предоставляет только общий клиент окружения.

```text
/api-web/globalsearch/api/v3/multiSearch
  ?query={query}
  &page=0
  &size=20
  &category=PERSONADDRESSBOOK
```

Общий запросник добавляет заголовки `HRP-Device-Type` и `X-HRP-Device-Type` и извлекает внешнее поле `data`. Feature-код читает `PERSONADDRESSBOOK.data.content`. До выбора структуры `orgFilter` в запрос не добавляется.

Это правило действует для всех методов `http.*`: generic описывает уже извлечённое внутреннее значение, повторно читать `response.data` в feature-коде нельзя. Вложенные бизнес-поля `data` сохраняются.

## Реализованный scope

- Общий layout справочника с поисковой строкой, избранным и верхней навигацией.
- Экран `Все контакты` с недавними контактами, поиском, query-параметром `q` и таблицей сотрудников.
- Inline-карточка сотрудника, раскрывающаяся непосредственно под выбранной строкой таблицы без смены URL.
- Единое избранное с сохранением mock-состояния в `localStorage`.
- Корневой и вложенный экраны кадровой структуры.
- Раздел справочных телефонов с категориями, звонком и копированием номера.

## Исключённый scope

- SberAgile.
- ФОС.
- Рабочие группы и пользовательские папки.
- Реальные интеграции, кроме явно подключённого поиска сотрудников.
- Мобильная версия.
- Администрирование групп.

## Ограничения PoC

- Все данные и состояния, кроме поиска сотрудников, работают через локальные typed mocks.
- Исходный модуль находится в `src/apps/AddressBook`; изменения внутри него выполняются только по отдельному явному продуктовому запросу.
- `@pulse/ui/components/*`, i18n, breadcrumbs, Settings и host theme замещены внешней обвязкой.
- Pulse-stubs создаются только для реально используемых imports и проверяются compile-time контрактом.
- Mock-сценарии `success/loading/empty/error` влияют только на локальные `/api/*` запросы; реальный поиск идёт через `/api-web/*`.
