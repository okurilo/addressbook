# HTTP-запросы

## Единая точка входа

Продуктовые API-запросы выполняются через общий экземпляр `http` из `src/http-requests/http.ts`:

```ts
import { HttpRequest } from '@hrplatform/utils';

export const httpRequestOptions = {
  errorCodeQuery: 'error.code',
  errorMessageQuery: 'error.message',
  headers: {
    'HRP-Device-Type': 'web',
    'X-HRP-Device-Type': 'web',
  },
};

export const http = new HttpRequest('/api-web/', httpRequestOptions);
```

Напрямую вызывать `fetch` для реального API или глобально перехватывать `window.fetch` нельзя. Локальный fetch-mock остаётся только для PoC endpoints `/api/*`.

`httpRequestOptions` добавляет обязательные host-заголовки:

- `HRP-Device-Type: web`;
- `X-HRP-Device-Type: web`.

В целевом окружении `HttpRequest` импортируется из `@hrplatform/utils`. Локальная песочница разрешает тот же import-path в типизированный `src/host/hrplatformUtils.ts`; продуктовый файл при этом не меняется.

## Обязательный способ использования

API-функция импортирует готовый экземпляр `http` и передаёт ему только путь относительно `/api-web/`:

```ts
import { http } from './http';

export const loadData = async (signal?: AbortSignal): Promise<Response> =>
  http.get<Response>('/service/api/v1/data', {
    input: { signal },
  });
```

## Разбор ответа всех методов http.*

Правило одинаково для `http.get`, `http.post`, `http.put`, `http.patch`, `http.delete` и остальных методов общего запросника. Сетевой ответ приходит в транспортной форме:

```ts
type NetworkEnvelope<T> = {
  data: T;
  success?: boolean;
};
```

Запросник извлекает только внешнее `data` до завершения `await`. Поэтому generic описывает внутренний результат:

```ts
type EmployeeResponse = {
  items: Employee[];
};

const response = await http.get<EmployeeResponse>('/employees');

response.items;
```

Feature-код не должен описывать тип как `{ data: EmployeeResponse }` и не должен читать `response.data.items`.

Если внутри бизнес-контракта тоже есть поле `data`, оно сохраняется:

```text
сеть:    { data: { PERSONADDRESSBOOK: { data: { content: [...] } } } }
http.*:  { PERSONADDRESSBOOK: { data: { content: [...] } } }
```

Нельзя добавлять рекурсивный поиск `data`, `body`, `response`, `result` или другие fallback-обёртки без подтверждённого исключения конкретной ручки.

Обязательные правила:

- не создавать новый `HttpRequest` в feature-коде;
- не дублировать `httpRequestOptions` и системные заголовки;
- не добавлять `/api-web/` повторно в путь, передаваемый `http.get`;
- не использовать прямой `fetch`, axios или второй HTTP-клиент для продуктовых API;
- не подменять `window.fetch` ради реальной интеграции;
- передавать `AbortSignal`, если запрос может устареть при вводе, навигации или размонтировании;
- тип ответа задавать generic-параметром `http.get<TResponse>` и не использовать `any`;
- generic-параметром описывать результат после извлечения внешнего `data`, а не сетевой envelope;
- разбирать ответ каждого нового `http.*`-запроса согласно этому разделу и фиксировать подтверждённую внутреннюю структуру рядом с API-функцией.

Прямой `fetch` допустим только внутри локального stub реализации `HttpRequest` и существующей PoC mock-инфраструктуры `/api/*`.

## Поиск сотрудников

`src/apps/AddressBook/api/directory/search.ts` формирует запрос через `http.get`:

```text
/api-web/globalsearch/api/v3/multiSearch
  ?query={query}
  &page=0
  &size=20
  &category=PERSONADDRESSBOOK
```

`orgFilter` имеет тип `string | null`. При `null` параметр отсутствует в URL; после выбора структуры передаётся её UUID.

Запрос принимает `AbortSignal`, поэтому предыдущий поиск отменяется при изменении строки или размонтировании экрана. Общий `http.get` снимает внешнее поле `data`, поэтому feature-код читает `PERSONADDRESSBOOK.data.content` и нормализует его в текущий контракт `Employee` без `any`.

Фактический вызов поиска должен сохранять форму проектного запросника:

```ts
return http.get<MultiSearchResponse>(
  `/globalsearch/api/v3/multiSearch?query=${encodeURIComponent(query)}&${searchParams}`,
  {
    input: { signal },
  }
);
```

## История поиска

Раздел «Все контакты» при пустом `q` загружает недавние записи через:

```text
/api-web/globalsearch/api/v3/history?paths=persons&size=4
```

`paths=persons` ограничивает историю поиском людей. Дополнительно feature-код отбрасывает известные неперсональные контексты, чтобы курсы, сервисы и оргструктуры не попадали в «Недавние», даже если backend вернёт смешанный массив. `http.get<SearchHistoryItem[]>` уже извлекает внешнее транспортное поле `data`, поэтому feature-код получает массив напрямую. При выборе записи вызывается `POST /globalsearch/api/v3/history/{id}?path=globalsearch:all`.
