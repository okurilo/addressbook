import type { Employee } from '../api/directory/types';

export const createEmployee = (id: string, fullName = id): Employee => ({
  id,
  fullName,
  subtitle: '',
  avatarInitials: '',
  status: 'available',
  shortStructure: 'Платформа',
  departmentId: 'unit-1',
  departmentName: 'Платформа',
  position: 'Инженер',
  employeeNumber: '',
  phone: null,
  mobilePhone: null,
  email: `${id}@example.test`,
  workplace: '',
  managerName: '',
  contacts: [],
});
