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

Обязательные правила:

- не создавать новый `HttpRequest` в feature-коде;
- не дублировать `httpRequestOptions` и системные заголовки;
- не добавлять `/api-web/` повторно в путь, передаваемый `http.get`;
- не использовать прямой `fetch`, axios или второй HTTP-клиент для продуктовых API;
- не подменять `window.fetch` ради реальной интеграции;
- передавать `AbortSignal`, если запрос может устареть при вводе, навигации или размонтировании;
- тип ответа задавать generic-параметром `http.get<TResponse>` и не использовать `any`.

Прямой `fetch` допустим только внутри локального stub реализации `HttpRequest` и существующей PoC mock-инфраструктуры `/api/*`.

## Поиск сотрудников

`src/http-requests/directorySearch.ts` формирует запрос через `http.get`:

```text
/api-web/globalsearch/api/v3/multiSearch
  ?query={query}
  &page=0
  &size=20
  &category=PERSONADDRESSBOOK
```

`orgFilter` имеет тип `string | null`. При `null` параметр отсутствует в URL; UUID добавляется только при реально выбранной структуре.

Запрос принимает `AbortSignal`, поэтому предыдущий поиск отменяется при изменении строки или размонтировании экрана. Ответ читается из `data.PERSONADDRESSBOOK.data.content` и нормализуется в текущий контракт `Employee` без `any`.

Фактический вызов поиска должен сохранять форму проектного запросника:

```ts
return http.get<MultiSearchResponse>(
  `/globalsearch/api/v3/multiSearch?query=${encodeURIComponent(query)}&${searchParams}`,
  {
    input: { signal },
  }
);
```
