import { styled } from 'styled-components';
import type { Employee } from '../api/directory/types';
import { EmployeeRow } from './EmployeeRow';

const Table = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
});

const HeadCell = styled('th')(({ theme }) => ({
  padding: `${theme.spacing.sm}px 0 ${theme.spacing.md}px`,
  textAlign: 'left',
  color: theme.colors.textSecondary,
  fontWeight: 500,
  borderBottom: `1px solid ${theme.colors.border}`,
}));

type EmployeeTableProps = {
  employees: Employee[];
  favoriteIds: string[];
  onToggleFavorite: (employeeId: string) => void;
  onOpenEmployee: (employee: Employee) => void;
};

export const EmployeeTable = ({
  employees,
  favoriteIds,
  onToggleFavorite,
  onOpenEmployee,
}: EmployeeTableProps): JSX.Element => (
  <Table>
    <colgroup>
      <col style={{ width: '34%' }} />
      <col style={{ width: '12%' }} />
      <col style={{ width: '30%' }} />
      <col style={{ width: '24%' }} />
    </colgroup>
    <thead>
      <tr>
        <HeadCell>ФИО сотрудника</HeadCell>
        <HeadCell>Структура</HeadCell>
        <HeadCell>Должность</HeadCell>
        <HeadCell>Связаться</HeadCell>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee) => (
        <EmployeeRow
          key={employee.id}
          employee={employee}
          isFavorite={favoriteIds.includes(employee.id)}
          onToggleFavorite={onToggleFavorite}
          onOpen={onOpenEmployee}
        />
      ))}
    </tbody>
  </Table>
);
