import type { Employee, EmployeeSearchResponse } from './types';
import type { DirectorySearchResponse } from './types';
import { fetchDirectoryEmployees, fetchDirectorySuggestions } from './search';

export {
  addFavoriteEmployee,
  fetchCustomPeopleGroups,
  fetchFavoriteEmployees,
  removeFavoriteEmployee,
} from './favorites';

export class DirectoryApiError extends Error {
  public readonly status: number;

  public constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const fetchJson = async <T>(input: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new DirectoryApiError(response.status, `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

export const fetchEmployees = async (
  query: string,
  signal?: AbortSignal,
  orgFilter: string | null = null,
  page = 0,
  size = 20
): Promise<EmployeeSearchResponse> => fetchDirectoryEmployees(query, signal, orgFilter, page, size);

export const fetchSearchSuggestions = async (
  query: string,
  signal?: AbortSignal,
  category: 'people' | 'organizations' = 'people'
): Promise<DirectorySearchResponse> =>
  fetchDirectorySuggestions(query, signal, category);

export const fetchEmployeeById = async (employeeId: string): Promise<Employee> =>
  fetchJson<Employee>(`/api/directory/employees/${encodeURIComponent(employeeId)}`);
