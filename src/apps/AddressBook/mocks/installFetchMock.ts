import type {
  DepartmentDetails,
  DepartmentNode,
  DepartmentRootResponse,
} from '../api/directory/departments';
import type {
  ReferencePhone,
  ReferencePhoneCategory,
  ReferencePhoneResponse,
} from '../api/directory/referencePhones';
import type { Employee, EmployeeSearchResponse } from '../api/directory/types';
import { departmentDetailsFixture, getDepartmentChildrenFixture } from './fixtures/departmentTree';
import { rootDepartmentsFixture } from './fixtures/departments';
import { employeesFixture, recentEmployeeIds } from './fixtures/employees';
import {
  referencePhoneCategoriesFixture,
  referencePhonesFixture,
} from './fixtures/referencePhones';
import { mockRoutes } from './fixtures/routes';
import type { MockScenario } from './types';

const SCENARIO_STORAGE_KEY = 'addressbook-mock-scenario';
const FAVORITES_STORAGE_KEY = 'addressbook-favorite-employee-ids';
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

const readFavoriteIds = (): string[] => {
  const storedValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (storedValue === null) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(storedValue) as unknown;

    if (Array.isArray(parsedValue) && parsedValue.every((item) => typeof item === 'string')) {
      return parsedValue;
    }
  } catch {
    return [];
  }

  return [];
};

const writeFavoriteIds = (favoriteIds: string[]): void => {
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
};

const getFavoriteEmployees = (): Employee[] => {
  const favoriteIds = readFavoriteIds();

  return favoriteIds
    .map((employeeId) => employeesFixture.find((employee) => employee.id === employeeId))
    .filter((employee): employee is Employee => employee !== undefined);
};

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

const matchEmployeesByDepartment = (departmentId: string): Employee[] =>
  employeesFixture.filter((employee) => employee.departmentId === departmentId);

const getSuccessPayload = (url: URL): unknown => {
  if (url.pathname === '/api/directory/departments/root') {
    const response: DepartmentRootResponse = {
      items: rootDepartmentsFixture,
      totalEmployees: rootDepartmentsFixture.reduce(
        (total, department) => total + department.employeeCount,
        0
      ),
    };

    return response;
  }

  if (url.pathname.startsWith('/api/directory/departments/')) {
    const departmentPath = decodeURIComponent(
      url.pathname.replace('/api/directory/departments/', '')
    );

    if (departmentPath.endsWith('/children')) {
      const departmentId = departmentPath.replace('/children', '');
      const children: DepartmentNode[] = getDepartmentChildrenFixture(departmentId);
      return children;
    }

    const details: DepartmentDetails | undefined = departmentDetailsFixture[departmentPath];

    if (details === undefined) {
      return { message: 'Department not found' };
    }

    return details;
  }

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
    const departmentId = url.searchParams.get('departmentId');
    const query = url.searchParams.get('q') ?? '';

    if (departmentId !== null) {
      return {
        items: matchEmployeesByDepartment(departmentId),
      };
    }

    const response: EmployeeSearchResponse = {
      items: query.trim() === '' ? [] : matchEmployees(query),
      query,
      page: 0,
      pageSize: 20,
      totalElements: query.trim() === '' ? 0 : matchEmployees(query).length,
      totalPages: query.trim() === '' ? 0 : 1,
      isLastPage: true,
    };

    return response;
  }

  if (url.pathname === '/api/directory/favorites') {
    return { items: getFavoriteEmployees() };
  }

  if (url.pathname === '/api/directory/reference-phones') {
    const categoryId = url.searchParams.get('categoryId');
    const items: ReferencePhone[] =
      categoryId === null
        ? referencePhonesFixture
        : referencePhonesFixture.filter((item) => item.categoryId === categoryId);
    const response: ReferencePhoneResponse = {
      items,
    };

    return response;
  }

  if (url.pathname === '/api/directory/reference-phone-categories') {
    return {
      items: referencePhoneCategoriesFixture as ReferencePhoneCategory[],
    };
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
    const method =
      init?.method ?? (typeof input === 'string' || input instanceof URL ? 'GET' : input.method);

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
      if (url.pathname === '/api/directory/departments/root') {
        return createJsonResponse(200, { items: [], totalEmployees: 0 });
      }

      if (url.pathname.startsWith('/api/directory/departments/')) {
        return createJsonResponse(404, { message: 'Department not found' });
      }

      if (url.pathname === '/api/directory/favorites' && method === 'GET') {
        return createJsonResponse(200, { items: [] });
      }

      if (url.pathname === '/api/directory/reference-phone-categories') {
        return createJsonResponse(200, { items: [] });
      }

      if (url.pathname === '/api/directory/reference-phones') {
        return createJsonResponse(200, { items: [] });
      }

      if (url.pathname.startsWith('/api/directory/employees/')) {
        return createJsonResponse(404, { message: 'Employee not found' });
      }

      if (url.pathname === '/api/directory/employees') {
        const departmentId = url.searchParams.get('departmentId');

        if (departmentId !== null) {
          return createJsonResponse(200, { items: [] });
        }

        const query = url.searchParams.get('q') ?? '';
        return createJsonResponse(200, { items: [], query });
      }

      return createJsonResponse(200, { items: [] });
    }

    if (url.pathname.startsWith('/api/directory/favorites/')) {
      const employeeId = decodeURIComponent(url.pathname.replace('/api/directory/favorites/', ''));
      const employee = employeesFixture.find((item) => item.id === employeeId);

      if (employee === undefined) {
        return createJsonResponse(404, { message: 'Employee not found' });
      }

      const favoriteIds = readFavoriteIds();

      if (method === 'POST') {
        writeFavoriteIds(
          favoriteIds.includes(employeeId) ? favoriteIds : [...favoriteIds, employeeId]
        );

        return createJsonResponse(200, { success: true });
      }

      if (method === 'DELETE') {
        writeFavoriteIds(favoriteIds.filter((item) => item !== employeeId));
        return createJsonResponse(200, { success: true });
      }
    }

    if (url.pathname.startsWith('/api/directory/employees/')) {
      const employeeId = decodeURIComponent(url.pathname.replace('/api/directory/employees/', ''));
      const employee = employeesFixture.find((item) => item.id === employeeId);

      if (employee === undefined) {
        return createJsonResponse(404, { message: 'Employee not found' });
      }
    }

    if (
      url.pathname.startsWith('/api/directory/departments/') &&
      url.pathname !== '/api/directory/departments/root'
    ) {
      const departmentPath = decodeURIComponent(
        url.pathname.replace('/api/directory/departments/', '')
      );
      const departmentId = departmentPath.endsWith('/children')
        ? departmentPath.replace('/children', '')
        : departmentPath;

      if (departmentDetailsFixture[departmentId] === undefined) {
        return createJsonResponse(404, { message: 'Department not found' });
      }
    }

    return createJsonResponse(200, getSuccessPayload(url));
  };
};
