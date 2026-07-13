# ADR-002. Штатная маршрутизация через Reach Router

## Статус

Принято.

## Контекст

Приложение использовало собственный React context, `pushState`, `replaceState`, обработчик `popstate` и ручной выбор страницы по `pathname`. Этот слой дублировал `@reach/router`, смешивал query с pathname и создавал несколько источников истины для URL.

## Решение

- `LocationProvider` оборачивает общий layout и route tree.
- `Router` декларативно сопоставляет URL с экраном.
- Динамические параметры `employeeId` и `departmentId` передаются страницам как route props.
- Компоненты читают URL через `useLocation` и переходят через `useNavigate`.
- Корневой URL обслуживается `Redirect`.
- `routePaths.ts` содержит полные публичные URL с `/platform/globalsearch` и builders динамических URL.
- Прямые вызовы browser history и собственный router context запрещены.

## Совместимость

Установлен `@reach/router@1.3.4`, peer contract которого рассчитан на старые версии React. В React 18 `StrictMode` URL обновляется, но `LocationProvider` может не опубликовать новое состояние. Поэтому локальная точка входа временно работает без `StrictMode`.

Долгосрочно библиотеку следует заменить на React Router 6+ отдельной миграцией. В рамках текущей итерации сохраняется явно заданный стек `@reach/router`.

## Последствия

- URL является единственным источником состояния маршрута.
- Query, pathname и hash обрабатываются библиотекой раздельно.
- Browser back/forward работает через history Reach Router.
- Общий header и навигация не перемонтируются между страницами.
