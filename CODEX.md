# CODEX

## Инженерные договорённости проекта

- Базовый стек проекта: React 18, TypeScript, Vite, styled-components, `@reach/router`.
- UI-поверхность PoC строится через локальные типизированные stubs `@pulse/ui/*` до появления необходимости в более точной эмуляции Pulse.
- В новом и редактируемом коде используются только именованные импорты, кроме обязательного default import `styled` для styled-components v5; модуль `src/apps/AddressBook/**` изменяется только по явным продуктовым запросам.
- Использование `any` запрещено.
- Собственный backend не добавляется; реальные API подключаются только по явному продуктовому запросу через общий `src/http-requests/http.ts`.
- Изменения должны оставаться в границах текущей итерации плана.
- После каждой завершённой задачи или итерации должен обновляться `ROADMAP.md` с актуальными отметками выполнения.
- После каждой завершённой итерации обязательны `npm run typecheck` и `npm run build`.

## Локальные решения

- Итерация 0 поднимает автономную Vite-песочницу без backend и без реальных зависимостей на Pulse UI.
- Специфичный alias `@pulse/ui/components/*` направлен в `src/stubs/pulse/ui/*`, общий `@pulse/*` — в `src/stubs/pulse/*`; одинаковые правила разрешения поддерживаются в Vite и TypeScript.
- Переключение mock-сценариев хранится в `localStorage` и применяется через перехват `window.fetch` только для запросов `/api/*`.
- Итерация 1 держит `DirectoryLayout` выше `Router`, чтобы общий header и навигация не перемонтировались при переходах между дочерними страницами.
- Итерация 2 использует глобальную строку поиска как источник `q` в URL, а сами запросы на экран контактов запускаются с debounce `280ms`.
- Итерация 4 переводит избранное на mock API `/api/directory/favorites` с хранением списка id в `localStorage`, чтобы состояние было общим для всех экранов.
- Итерация 3 расширяет mock-сотрудников до единой модели для списка и визитки, а endpoint `/api/directory/employees/:employeeId` возвращает `404` для неизвестного id.
- Возврат из визитки сначала использует browser history, а при прямом открытии URL возвращает на `/` с сохранением `location.search`, чтобы не терять поисковый запрос.
- Общий `FavoriteEmployeesProvider` загружается над `Router` и синхронизирует звезды между таблицей контактов, визиткой сотрудника и страницей избранного.
- Итерация 5 вводит отдельный контракт `/api/directory/departments/root` для корневого экрана структуры; он возвращает только крупные подразделения и общее число сотрудников, без загрузки полного дерева.
- Итерация 6 использует отдельные контракты details/children/employees-by-department и кэширует уже загруженные узлы прямо в состоянии страницы подразделения, чтобы повторный переход не делал лишние запросы.
- Итерация 7 выносит справочные телефоны в отдельные контракты категорий и служб; активная категория хранится в query-параметре `categoryId` маршрута `/reference-phones`.
- Итерация 8 вводит единый `RetryState`, helper `ignorePromise`, глобальные focus-styles и клавиатурную активацию строк сотрудников, чтобы стабилизировать PoC без изменения композиции экранов.
- Актуальная версия приложения была встроена в `src/apps/AddressBook` как дословный baseline из контекстного снимка; последующие точечные изменения фиксируются отдельными итерациями.
- Отсутствующее host-окружение эмулируется только снаружи: через Vite/TypeScript aliases, `src/host`, локальные Pulse-stubs, `SettingsProvider` и host theme.
- Неиспользуемый дублирующий каталог `pages/StuctureDepartmentPage` сохранён побайтово, но исключён из локальной TypeScript-компиляции из-за незавершённого синтаксиса исходного снимка.
- Корневой URL декларативно перенаправляется на `/platform/globalsearch/addressbook` через Reach `Redirect`.
- `src/apps/AddressBook/**` остаётся защищённой границей baseline: интеграционные несовместимости исправляются в host-обвязке, а изменения внутри модуля допускаются только по явному продуктовому запросу.
- `ThemeProvider` подключается на host-уровне в `src/main.tsx`, а `DefaultTheme` типизируется внешней декларацией `src/host/styled.d.ts` через `HostTheme`.
- `HostTheme` повторяет Pulse-совместимый контракт `tokens.current.core`; уровень `core` обязателен в приложении и stubs, сплющённые пути признаны ошибочными.
- Локальные Pulse-stubs повторяют подтверждённый публичный API оригинальных компонентов: `Avatar` использует `$type/$text/$size`, `Button` — `$type/$size/$state`, а `Loader` — `isOnColor/size/wrapped/children`.
- Vite aliases и TypeScript paths поддерживаются синхронно; host-сервисы подключаются по исходным import-path через типизированные внешние адаптеры.
- Пустые состояния используют подтверждённый DS-компонент `@pulse/ui/components/Empty`; ошибочный `EmptyState`, его локальные stubs и prop `illustration` удалены.
- Переход в сотрудника использует единый канонический путь `/platform/globalsearch/addressbook/employee/:employeeId` из контактов, избранного и кадровой структуры.
- По выгрузке Pulse theme обвязка расширена полями `borderWidths`, `breakpoints`, `layout`, `mediaQueries`, `radii`, `screenSize`, deprecated `space`, полной typography и `zIndices`.
- Typography в Pulse является набором style-объектов, поэтому stubs используют `theme.typography[variant]`, а глобальный font-family — `theme.typography.body1Regular.fontFamily`.
- Для целевой совместимости со styled-components v5 новые styled-декларации обвязки используют default import и синтаксис `styled.element(...)`.
- Самописный `AppRouterProvider` и ручное управление `window.history` удалены; экраны объявлены дочерними маршрутами Reach `Router`.
- Общий `DirectoryLayout` находится внутри `LocationProvider`, но выше `Router`, поэтому header, поиск и навигация используют `useLocation/useNavigate` и не перемонтируются при смене экрана.
- `routePaths` хранит полные публичные URL с host-base; динамические employee/department URL создаются типизированными builders с `encodeURIComponent`.
- Из-за подтверждённой несовместимости `@reach/router@1.3.4` с React 18 `StrictMode` локальная точка входа работает без `StrictMode`; с `createRoot` и без StrictMode реактивная навигация проверена в браузере.
- Справочные телефоны используют вертикальный tablist «Служба поддержки услуг и сервисов» / «Вспомогательные службы»; активная вкладка синхронизирована с `categoryId`, а смена query не перезагружает список категорий.
- Активные использования Pulse `Text` задают семантический `variant` явно; вторичные подписи используют `text.secondary`, малозначимые значения — `text.tertiary`, статусы — подходящие `support.*`, а локальный Text-stub принимает полный `TypographyVariant` host theme.
- Элементы хлебных крошек группируются через `inline-flex`: блочный рендер Pulse `Text` не должен разносить разделитель и название подразделения по разным строкам.
- Клик по сотруднику в общей таблице не меняет маршрут: карточка раскрывается следующей строкой того же `tbody`; одновременно открыта одна карточка, повторный клик или крестик закрывают её.
- Прямой маршрут `/employee/:employeeId` сохранён для deep-link, но таблицы контактов, избранного и подразделений его не используют для открытия карточки.
- Полная выгрузка типов `@pulse/ui` является источником истины для DS-обвязки; вымышленные `Text.tone`, `Text.weight` и `Avatar.$initials` удалены.
- Выгрузка `@pulse/ui` подтверждает `Empty` с обязательными `type/description`; `EmptyState` отсутствует и не поддерживается локальными aliases.
- Повторный аудит оставил в `src/stubs/pulse/ui` только реально используемые `Avatar`, `Button`, `Empty`, `Input`, `Layout`, `Loader`, `Text`; неподтверждённые или несовместимые исторические stubs удалены.
- `src/host/pulseUiContractAudit.ts` компиляционно проверяет DS unions, обязательные props, отсутствие вымышленных Text props и разрешение всех активных Pulse import-path.
- Общий запросник восстановлен в исходном пути `src/http-requests/http.ts`: `HttpRequest('/api-web/', httpRequestOptions)` задаёт обработку ошибок и системные device headers.
- Поиск сотрудников выполняется функцией `getSearchData` из `src/apps/AddressBook/api/directory/search.ts` через внешний общий `http`, без глобального перехвата `window.fetch`.
- `orgFilter` имеет тип `string | null`: при текущем значении `null` в URL явно передаётся `orgFilter=null`, а после выбора структуры передаётся её UUID.
- Ответ `multiSearch` читается из `data.PERSONADDRESSBOOK.data.content` и типобезопасно нормализуется в контракт `Employee`; запрос получает `AbortSignal` и отменяется при смене query.
- В локальной среде `@hrplatform/utils` и `@pulse/ui/theme` эмулируются host-stubs через одинаковые Vite/TypeScript aliases; в целевом окружении используются реальные пакеты.
- Локальный Vite dev-server проксирует `/api-web` на `https://hr-dev.sberbank.ru`; в host-окружении используется тот же относительный API path.
- Правило общего запросника закреплено в `CODEX-RULES.MD`, `README.md` и `docs/HTTP-REQUESTS.md`: feature-код импортирует готовый `http`, не создаёт собственный `HttpRequest`, не дублирует device headers и не использует прямой `fetch` для продуктовых API.
- Обе полные выгрузки типизации Pulse UI добавлены без изменений в `docs/pulse-ui-types/raw`; их SHA-256 фиксируется генерируемым индексом.
- Для экономии контекста LLM команда `npm run docs:pulse-types` разбивает 264 исходных секции на отдельные `generated/src/**` документы, строит индекс компонентов, обратный индекс экспортов и JSON-манифест зависимостей.
- Обязательный маршрут работы с DS: краткая памятка `docs/PULSE-UI.md` → поиск в `docs/pulse-ui-types/INDEX.md`/`EXPORTS.md` → чтение только точных generated-файлов и необходимых импортов; полные raw-файлы не загружаются без необходимости.
- Для встраивания в host Reach Router AddressBook подключается как `path="/addressbook/*"`; wildcard удерживает модуль на дочерних URL, а внутренний `Router basepath="/"` не допускает удвоения `/platform/globalsearch/addressbook` у абсолютных routePaths.
- До подключения `getGroupHierarchy` корневой экран кадровой структуры показывает сотрудников из `multiSearch`; `query` берётся из URL-параметра `q`, синхронизированного с верхним поиском, а в запросе явно передаётся `orgFilter=null`.
- Весь продуктовый API-код AddressBook хранится внутри `src/apps/AddressBook/**` и переносится вместе с модулем; внешний `src/http-requests/http.ts`, host-stubs, proxy и прочая обвязка относятся только к локальной имитации окружения.
