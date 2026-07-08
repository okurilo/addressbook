import { styled } from 'styled-components';
import { Text } from '@pulse/ui/Text';
import type { Employee } from '../api/directory/types';
import { EmployeeActions } from './EmployeeActions';
import { EmployeeAvatar } from './EmployeeAvatar';

const Row = styled('tr')(({ theme }) => ({
  borderBottom: `1px solid ${theme.colors.border}`,
  cursor: 'pointer',
}));

const Cell = styled('td')(({ theme }) => ({
  padding: `${theme.spacing.md}px 0`,
  verticalAlign: 'top',
}));

const NameCell = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '40px minmax(0, 1fr)',
  gap: theme.spacing.md,
  alignItems: 'start',
}));

const PositionCell = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
}));

type EmployeeRowProps = {
  employee: Employee;
  isFavorite: boolean;
  onToggleFavorite: (employeeId: string) => void;
  onOpen: (employee: Employee) => void;
};

export const EmployeeRow = ({
  employee,
  isFavorite,
  onToggleFavorite,
  onOpen,
}: EmployeeRowProps): JSX.Element => (
  <Row
    onClick={() => {
      onOpen(employee);
    }}
  >
    <Cell>
      <NameCell>
        <EmployeeAvatar initials={employee.avatarInitials} status={employee.status} />
        <div>
          <Text weight="semibold">{employee.fullName}</Text>
          <Text tone="secondary">{employee.subtitle}</Text>
        </div>
      </NameCell>
    </Cell>
    <Cell>
      <Text weight="medium">{employee.shortStructure}</Text>
    </Cell>
    <Cell>
      <PositionCell>
        <Text>{employee.position}</Text>
        <Text tone="secondary">{employee.departmentName}</Text>
      </PositionCell>
    </Cell>
    <Cell>
      <EmployeeActions
        phone={employee.phone}
        email={employee.email}
        isFavorite={isFavorite}
        onToggleFavorite={() => {
          onToggleFavorite(employee.id);
        }}
      />
    </Cell>
  </Row>
);
