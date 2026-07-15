export type EmployeeStatus = 'available' | 'busy' | 'offline' | 'vacation';

export type EmployeeContact = {
  type: 'phone' | 'email';
  value: string;
  label: string;
};

export type Employee = {
  id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  subtitle: string;
  avatarInitials: string;
  status: EmployeeStatus;
  shortStructure: string;
  departmentId: string;
  departmentName: string;
  position: string;
  functionalBlock?: string;
  employeeNumber: string;
  phone: string | null;
  mobilePhone: string | null;
  email: string;
  absence?: {
    badge?: string;
    period?: string;
    icon_dark?: string;
    icon_light?: string;
  };
  workplace: string;
  managerName: string;
  contacts: EmployeeContact[];
};

export type EmployeeSearchResponse = {
  items: Employee[];
  query: string;
};

export type OrganizationSearchResult = {
  id: string;
  fullName: string;
  typeName?: string;
  layer?: string;
  layerName?: string;
};

export type DirectorySearchResponse = EmployeeSearchResponse & {
  organizations: OrganizationSearchResult[];
};
