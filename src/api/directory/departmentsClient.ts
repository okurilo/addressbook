import type {
  DepartmentDetails,
  DepartmentNode,
  DepartmentRootResponse,
} from './departments';
import { DirectoryApiError } from './client';
import type { Employee } from './types';

const fetchJson = async <T,>(input: string): Promise<T> => {
  const response = await fetch(input);

  if (!response.ok) {
    throw new DirectoryApiError(response.status, `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

export const fetchRootDepartments = async (): Promise<DepartmentRootResponse> =>
  fetchJson<DepartmentRootResponse>('/api/directory/departments/root');

export const fetchDepartmentDetails = async (departmentId: string): Promise<DepartmentDetails> =>
  fetchJson<DepartmentDetails>(`/api/directory/departments/${encodeURIComponent(departmentId)}`);

export const fetchDepartmentChildren = async (departmentId: string): Promise<DepartmentNode[]> =>
  fetchJson<DepartmentNode[]>(
    `/api/directory/departments/${encodeURIComponent(departmentId)}/children`,
  );

export const fetchEmployeesByDepartment = async (departmentId: string): Promise<Employee[]> => {
  const response = await fetchJson<{ items: Employee[] }>(
    `/api/directory/employees?departmentId=${encodeURIComponent(departmentId)}`,
  );

  return response.items;
};
