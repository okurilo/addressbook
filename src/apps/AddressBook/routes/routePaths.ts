const hostBasePath = '/platform/globalsearch';
const addressBookBasePath = `${hostBasePath}/addressbook`;

export const routePaths = {
  contacts: addressBookBasePath,
  employee: `${addressBookBasePath}/employee/:employeeId`,
  structure: `${addressBookBasePath}/structure`,
  structureDepartment: `${addressBookBasePath}/structure/:departmentId`,
  referencePhones: `${addressBookBasePath}/reference-phones`,
  favorites: `${addressBookBasePath}/favorites`,
} as const;

export const getEmployeePath = (employeeId: string): string =>
  routePaths.employee.replace(':employeeId', encodeURIComponent(employeeId));

export const getDepartmentPath = (departmentId: string): string =>
  routePaths.structureDepartment.replace(':departmentId', encodeURIComponent(departmentId));

