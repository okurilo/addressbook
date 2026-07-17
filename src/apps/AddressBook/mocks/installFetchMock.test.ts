import { act } from '../../../test-utils/test-utils';
import { employeesFixture } from './fixtures/employees';
import { installFetchMock } from './installFetchMock';

class JsonResponse {
  public readonly ok: boolean;

  public constructor(
    private readonly body: string,
    public readonly init: ResponseInit
  ) {
    this.ok = (init.status ?? 200) >= 200 && (init.status ?? 200) < 300;
  }

  public get status(): number {
    return this.init.status ?? 200;
  }

  public json(): Promise<unknown> {
    return Promise.resolve(JSON.parse(this.body) as unknown);
  }
}

const originalFetch = jest.fn<Promise<Response>, [RequestInfo | URL, RequestInit?]>();
const initialResponse = global.Response;
const initialWindowFetch = window.fetch;

const request = async (path: string, init?: RequestInit): Promise<JsonResponse> => {
  const promise = window.fetch(path, init) as unknown as Promise<JsonResponse>;
  await act(async () => {
    jest.runOnlyPendingTimers();
  });
  return promise;
};

describe('installFetchMock', () => {
  beforeAll(() => {
    global.Response = JsonResponse as unknown as typeof Response;
  });

  beforeEach(() => {
    originalFetch.mockReset();
    jest.useFakeTimers();
    window.localStorage.clear();
    window.fetch = originalFetch;
    installFetchMock();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    global.Response = initialResponse;
    window.fetch = initialWindowFetch;
  });

  test('пропускает запросы вне /api/ в исходный fetch', async () => {
    const response = new JsonResponse('{}', { status: 204 }) as unknown as Response;
    originalFetch.mockResolvedValueOnce(response);

    await expect(window.fetch('/api-web/test')).resolves.toBe(response);
    expect(originalFetch).toHaveBeenCalledWith('/api-web/test', undefined);
  });

  test('возвращает 404 для неизвестного mock-маршрута', async () => {
    const response = await request('/api/unknown');
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ message: 'Mock route not found' });
  });

  test('обслуживает поиск, recent и справочные телефоны в success-сценарии', async () => {
    const searchResponse = await request('/api/directory/employees?q=инженер');
    const searchBody = (await searchResponse.json()) as { items: unknown[]; query: string };
    expect(searchBody.query).toBe('инженер');
    expect(searchBody.items.length).toBeGreaterThan(0);

    const emptySearch = await request('/api/directory/employees?q=');
    await expect(emptySearch.json()).resolves.toMatchObject({ items: [], totalElements: 0 });

    const recent = await request('/api/directory/recent');
    await expect(recent.json()).resolves.toEqual({ items: expect.any(Array) });

    const phones = await request('/api/directory/reference-phones?categoryId=support');
    await expect(phones.json()).resolves.toEqual({ items: expect.any(Array) });

    const categories = await request('/api/directory/reference-phone-categories');
    await expect(categories.json()).resolves.toEqual({ items: expect.any(Array) });
  });

  test('обслуживает дерево подразделений и сотрудников подразделения', async () => {
    const root = await request('/api/directory/departments/root');
    await expect(root.json()).resolves.toMatchObject({ items: expect.any(Array) });

    const employee = employeesFixture[0];
    const details = await request(`/api/directory/departments/${employee.departmentId}`);
    expect(details.status).toBe(200);

    const children = await request(
      `/api/directory/departments/${employee.departmentId}/children`
    );
    await expect(children.json()).resolves.toEqual(expect.any(Array));

    const employees = await request(
      `/api/directory/employees?departmentId=${employee.departmentId}`
    );
    await expect(employees.json()).resolves.toEqual({ items: expect.any(Array) });

    const missing = await request('/api/directory/departments/missing');
    expect(missing.status).toBe(404);
  });

  test('добавляет и удаляет избранное с защитой от дублей', async () => {
    const employeeId = employeesFixture[0]?.id ?? '';

    expect((await request(`/api/directory/favorites/${employeeId}`, { method: 'POST' })).status).toBe(
      200
    );
    await request(`/api/directory/favorites/${employeeId}`, { method: 'POST' });
    const favorites = await request('/api/directory/favorites');
    const favoritesBody = (await favorites.json()) as { items: unknown[] };
    expect(favoritesBody.items).toHaveLength(1);

    await request(`/api/directory/favorites/${employeeId}`, { method: 'DELETE' });
    const emptyFavorites = await request('/api/directory/favorites');
    await expect(emptyFavorites.json()).resolves.toEqual({ items: [] });

    const missing = await request('/api/directory/favorites/missing', { method: 'POST' });
    expect(missing.status).toBe(404);
  });

  test('возвращает пустые payload в empty-сценарии', async () => {
    window.localStorage.setItem('addressbook-mock-scenario', 'empty');

    expect((await request('/api/directory/departments/missing')).status).toBe(404);
    expect((await request('/api/directory/employees/missing')).status).toBe(404);
    await expect((await request('/api/directory/favorites')).json()).resolves.toEqual({ items: [] });
    await expect(
      (await request('/api/directory/employees?departmentId=unit')).json()
    ).resolves.toEqual({ items: [] });
    await expect((await request('/api/directory/employees?q=test')).json()).resolves.toEqual({
      items: [],
      query: 'test',
    });
  });

  test('возвращает 500 в error-сценарии', async () => {
    window.localStorage.setItem('addressbook-mock-scenario', 'error');
    const response = await request('/api/directory/recent');
    expect(response.status).toBe(500);
  });
});
