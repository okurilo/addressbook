import type { Employee, EmployeeSearchResponse } from '../api/directory/types';
import { employeesFixture, recentEmployeeIds } from './fixtures/employees';
import { mockRoutes } from './fixtures/routes';
import type { MockScenario } from './types';

const SCENARIO_STORAGE_KEY = 'addressbook-mock-scenario';
const LOADING_DELAY_MS = 1200;
const DEFAULT_DELAY_MS = 280;

const createJsonResponse = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const wait = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const getScenario = (): MockScenario => {
  const storedValue = window.localStorage.getItem(SCENARIO_STORAGE_KEY);

  if (
    storedValue === 'success' ||
    storedValue === 'loading' ||
    storedValue === 'empty' ||
    storedValue === 'error'
  ) {
    return storedValue;
  }

  return 'success';
};

const normalizeSearchValue = (value: string): string => value.trim().toLocaleLowerCase('ru');

const matchEmployees = (query: string): Employee[] => {
  const normalizedQuery = normalizeSearchValue(query);

  return employeesFixture.filter((employee) => {
    const haystack = [
      employee.fullName,
      employee.position,
      employee.departmentName,
      employee.shortStructure,
      employee.subtitle,
    ]
      .join(' ')
      .toLocaleLowerCase('ru');

    return haystack.includes(normalizedQuery);
  });
};

const getSuccessPayload = (url: URL): unknown => {
  if (url.pathname.startsWith('/api/directory/employees/')) {
    const employeeId = decodeURIComponent(url.pathname.replace('/api/directory/employees/', ''));
    const employee = employeesFixture.find((item) => item.id === employeeId);

    if (employee === undefined) {
      return { message: 'Employee not found' };
    }

    return employee;
  }

  if (url.pathname === '/api/directory/recent') {
    return {
      items: recentEmployeeIds
        .map((employeeId) => employeesFixture.find((employee) => employee.id === employeeId))
        .filter((employee): employee is Employee => employee !== undefined),
    };
  }

  if (url.pathname === '/api/directory/employees') {
    const query = url.searchParams.get('q') ?? '';
    const response: EmployeeSearchResponse = {
      items: query.trim() === '' ? [] : matchEmployees(query),
      query,
    };

    return response;
  }

  if (url.pathname === '/api/directory/favorites') {
    return { items: [] };
  }

  if (url.pathname === '/api/directory/departments/root') {
    return { items: [] };
  }

  if (url.pathname === '/api/directory/reference-phones') {
    return { items: [] };
  }

  return { message: 'Mock route not found' };
};

export const installFetchMock = (): void => {
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const requestUrl =
      typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

    const url = new URL(requestUrl, window.location.origin);

    if (!url.pathname.startsWith('/api/')) {
      return originalFetch(input, init);
    }

    const scenario = getScenario();
    const isKnownRoute = mockRoutes.some((route) => url.pathname.startsWith(route));

    if (!isKnownRoute) {
      return createJsonResponse(404, { message: 'Mock route not found' });
    }

    if (scenario === 'error') {
      await wait(DEFAULT_DELAY_MS);
      return createJsonResponse(500, { message: 'Mock error' });
    }

    if (scenario === 'loading') {
      await wait(LOADING_DELAY_MS);
    } else {
      await wait(DEFAULT_DELAY_MS);
    }

    if (scenario === 'empty') {
      if (url.pathname.startsWith('/api/directory/employees/')) {
        return createJsonResponse(404, { message: 'Employee not found' });
      }

      if (url.pathname === '/api/directory/employees') {
        const query = url.searchParams.get('q') ?? '';
        return createJsonResponse(200, { items: [], query });
      }

      return createJsonResponse(200, { items: [] });
    }

    if (url.pathname.startsWith('/api/directory/employees/')) {
      const employeeId = decodeURIComponent(url.pathname.replace('/api/directory/employees/', ''));
      const employee = employeesFixture.find((item) => item.id === employeeId);

      if (employee === undefined) {
        return createJsonResponse(404, { message: 'Employee not found' });
      }
    }

    return createJsonResponse(200, getSuccessPayload(url));
  };
};
