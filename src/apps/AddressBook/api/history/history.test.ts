import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { getSearchHistory, selectSearchHistory } from './history';
import { SearchContextEnum } from './types';

test('загружает и выбирает запись истории через общий http', async (context) => {
  const originalFetch = globalThis.fetch;
  const requests: Array<{ body: string | null; method: string; url: string }> = [];

  context.after(() => {
    globalThis.fetch = originalFetch;
  });

  globalThis.fetch = async (input, init) => {
    const method = init?.method ?? (input instanceof Request ? input.method : 'GET');
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
        ? input.toString()
        : input.url;
    const body = method === 'GET' || typeof init?.body !== 'string' ? null : init.body;
    requests.push({ body, method, url });

    if (method === 'GET') {
      return new Response(
        JSON.stringify({
          data: [
            {
              id: 'history-1',
              path: 'globalsearch:all',
              text: 'Иванов Иван',
              key: {
                context: SearchContextEnum.employee,
                id: 'person-1',
              },
            },
          ],
          success: true,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    return new Response(JSON.stringify({ data: null, success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  };

  const history = await getSearchHistory();
  await selectSearchHistory(history[0].id);

  assert.equal(history[0].key.id, 'person-1');
  assert.deepEqual(requests, [
    {
      body: null,
      method: 'GET',
      url: '/api-web/globalsearch/api/v3/history?paths=all&size=4',
    },
    {
      body: '{}',
      method: 'POST',
      url: '/api-web/globalsearch/api/v3/history/history-1?path=globalsearch:all',
    },
  ]);
});
