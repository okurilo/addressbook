import type { Employee, EmployeeSearchResponse } from './types';
import { fetchDirectoryEmployees } from './search';

export { addFavoriteEmployee, fetchFavoriteEmployees, removeFavoriteEmployee } from './favorites';

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
  orgFilter: string | null = null
): Promise<EmployeeSearchResponse> => fetchDirectoryEmployees(query, signal, orgFilter);

export const fetchEmployeeById = async (employeeId: string): Promise<Employee> =>
  fetchJson<Employee>(`/api/directory/employees/${encodeURIComponent(employeeId)}`);

