import type { Employee, EmployeeSearchResponse } from './types';

export class DirectoryApiError extends Error {
  public readonly status: number;

  public constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const fetchJson = async <T>(input: string): Promise<T> => {
  const response = await fetch(input);

  if (!response.ok) {
    throw new DirectoryApiError(response.status, `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

export const fetchRecentEmployees = async (): Promise<Employee[]> => {
  const response = await fetchJson<{ items: Employee[] }>('/api/directory/recent');
  return response.items;
};

export const fetchEmployees = async (query: string): Promise<EmployeeSearchResponse> =>
  fetchJson<EmployeeSearchResponse>(`/api/directory/employees?q=${encodeURIComponent(query)}`);

export const fetchEmployeeById = async (employeeId: string): Promise<Employee> =>
  fetchJson<Employee>(`/api/directory/employees/${encodeURIComponent(employeeId)}`);
