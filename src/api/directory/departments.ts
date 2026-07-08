export type Department = {
  id: string;
  name: string;
  employeeCount: number;
};

export type DepartmentSummary = Department;

export type DepartmentNode = Department & {
  parentId: string | null;
  orgUnitNumber: string;
};

export type DepartmentPath = {
  id: string;
  name: string;
};

export type DepartmentDetails = DepartmentNode & {
  path: DepartmentPath[];
};

export type DepartmentRootResponse = {
  items: DepartmentSummary[];
  totalEmployees: number;
};
