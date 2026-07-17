import {
  DirectoryApiError,
  fetchEmployeeById,
  fetchEmployees,
  fetchSearchSuggestions,
} from './client';
import {
  fetchDepartmentChildren,
  fetchDepartmentDetails,
  fetchEmployeesByDepartment,
  fetchRootDepartments,
} from './departmentsClient';
import {
  fetchReferencePhoneCategories,
  fetchReferencePhones,
} from './referencePhonesClient';
import { fetchDirectoryEmployees, fetchDirectorySuggestions } from './search';

jest.mock('./search', () => ({
  fetchDirectoryEmployees: jest.fn(),
  fetchDirectorySuggestions: jest.fn(),
}));

type FetchMock = jest.Mock<
  Promise<{ ok: boolean; status: number; json: () => Promise<unknown> }>,
  [RequestInfo | URL, RequestInit?]
>;

const fetchMock = jest.fn() as FetchMock;
const initialFetch = global.fetch;
const employeesMock = fetchDirectoryEmployees as jest.MockedFunction<
  typeof fetchDirectoryEmployees
>;
const suggestionsMock = fetchDirectorySuggestions as jest.MockedFunction<
  typeof fetchDirectorySuggestions
>;

const respond = (body: unknown, status = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });

beforeAll(() => {
  global.fetch = fetchMock as unknown as typeof fetch;
});

beforeEach(() => {
  fetchMock.mockReset();
  employeesMock.mockReset();
  suggestionsMock.mockReset();
});

afterAll(() => {
  global.fetch = initialFetch;
});

describe('directory clients', () => {
  test('делегирует поиск новым функциям multiSearch', async () => {
    const signal = new AbortController().signal;
    const response = {
      items: [],
      query: 'Иван',
      page: 2,
      pageSize: 5,
      totalElements: 0,
      totalPages: 0,
      isLastPage: true,
    };
    employeesMock.mockResolvedValueOnce(response);
    suggestionsMock.mockResolvedValueOnce({ ...response, organizations: [] });

    await expect(fetchEmployees('Иван', signal, 'unit-1', 2, 5)).resolves.toBe(response);
    await fetchSearchSuggestions('Иван', signal, 'organizations');

    expect(employeesMock).toHaveBeenCalledWith('Иван', signal, 'unit-1', 2, 5);
    expect(suggestionsMock).toHaveBeenCalledWith('Иван', signal, 'organizations');
  });

  test('загружает сотрудника по закодированному id', async () => {
    const employee = { id: 'person/1', fullName: 'Иван' };
    fetchMock.mockImplementationOnce(() => respond(employee));

    await expect(fetchEmployeeById('person/1')).resolves.toBe(employee);
    expect(fetchMock).toHaveBeenCalledWith('/api/directory/employees/person%2F1', undefined);
  });

  test('возвращает типизированную ошибку HTTP', async () => {
    fetchMock.mockImplementationOnce(() => respond({}, 404));

    await expect(fetchEmployeeById('missing')).rejects.toMatchObject<DirectoryApiError>({
      name: 'Error',
      status: 404,
      message: 'Request failed with status 404',
    });
  });

  test('вызывает все endpoints подразделений', async () => {
    fetchMock
      .mockImplementationOnce(() => respond({ items: [], totalEmployees: 0 }))
      .mockImplementationOnce(() => respond({ id: 'unit/1' }))
      .mockImplementationOnce(() => respond([{ id: 'child' }]))
      .mockImplementationOnce(() => respond({ items: [{ id: 'person-1' }] }));

    await fetchRootDepartments();
    await fetchDepartmentDetails('unit/1');
    await fetchDepartmentChildren('unit/1');
    await expect(fetchEmployeesByDepartment('unit/1')).resolves.toEqual([{ id: 'person-1' }]);

    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
      '/api/directory/departments/root',
      '/api/directory/departments/unit%2F1',
      '/api/directory/departments/unit%2F1/children',
      '/api/directory/employees?departmentId=unit%2F1',
    ]);
  });

  test('вызывает endpoints справочных телефонов и обрабатывает ошибку', async () => {
    fetchMock
      .mockImplementationOnce(() => respond({ items: [{ id: 'support', title: 'Поддержка' }] }))
      .mockImplementationOnce(() => respond({ items: [{ id: 'phone-1' }] }))
      .mockImplementationOnce(() => respond({}, 500));

    await expect(fetchReferencePhoneCategories()).resolves.toEqual([
      { id: 'support', title: 'Поддержка' },
    ]);
    await expect(fetchReferencePhones('category/1')).resolves.toEqual([{ id: 'phone-1' }]);
    await expect(fetchReferencePhones('broken')).rejects.toMatchObject({ status: 500 });
    expect(fetchMock.mock.calls[1]?.[0]).toBe(
      '/api/directory/reference-phones?categoryId=category%2F1'
    );
  });
});
