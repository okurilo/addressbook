export type EmployeeStatus = 'available' | 'busy' | 'offline' | 'vacation';

export type EmployeeContact = {
  type: 'phone' | 'email';
  value: string;
  label: string;
};

export type Employee = {
  id: string;
  fullName: string;
  subtitle: string;
  avatarInitials: string;
  status: EmployeeStatus;
  shortStructure: string;
  departmentId: string;
  departmentName: string;
  position: string;
  employeeNumber: string;
  phone: string | null;
  mobilePhone: string | null;
  email: string;
  workplace: string;
  managerName: string;
  contacts: EmployeeContact[];
};

export type EmployeeSearchResponse = {
  items: Employee[];
  query: string;
};

