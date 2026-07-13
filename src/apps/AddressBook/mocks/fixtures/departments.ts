import type { DepartmentSummary } from '../../api/directory/departments';

export const rootDepartmentsFixture: DepartmentSummary[] = [
  {
    id: 'central-office',
    name: 'Центральный аппарат',
    employeeCount: 1842,
  },
  {
    id: 'direct-subordination',
    name: 'Подразделения прямого подчинения',
    employeeCount: 624,
  },
  {
    id: 'territorial-banks',
    name: 'Территориальные банки',
    employeeCount: 4318,
  },
  {
    id: 'subsidiaries',
    name: 'Дочерние организации',
    employeeCount: 913,
  },
  {
    id: 'representative-offices',
    name: 'Представительства',
    employeeCount: 147,
  },
  {
    id: 'ecosystem',
    name: 'Экосистема',
    employeeCount: 1286,
  },
];

