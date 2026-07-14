import type { Employee } from '../../../apps/AddressBook/api/directory/types';

export type PersonProfile = {
  name: string;
  photo: string;
  employeeNumber: string;
  position: string;
  initials: string;
  internalPhone?: string;
  personalPhone?: string;
  internalMail?: string;
  externalEmail?: string;
  absence?: unknown;
};

export type PersonRow = {
  nameCell: {
    name: string;
    photo: string;
    absence?: unknown;
    initials: string;
  };
  position: string;
  block: string;
  unit: string;
  pid: string;
  phone: string | null;
  email: string;
  isFavorite: boolean;
  _profile: PersonProfile;
};

export const createPersonRows = (
  employees: Employee[],
  favoriteIds: string[]
): PersonRow[] =>
  employees.map((employee) => ({
    nameCell: {
      name: employee.fullName,
      photo: '',
      initials: employee.avatarInitials,
    },
    position: employee.position,
    block: employee.departmentName,
    unit: employee.shortStructure,
    pid: employee.id,
    phone: employee.phone,
    email: employee.email,
    isFavorite: favoriteIds.includes(employee.id),
    _profile: {
      name: employee.fullName,
      photo: '',
      employeeNumber: employee.employeeNumber,
      position: employee.position,
      initials: employee.avatarInitials,
      internalPhone: employee.phone ?? undefined,
      personalPhone: employee.mobilePhone ?? undefined,
      internalMail: employee.email,
      externalEmail: employee.email,
    },
  }));
