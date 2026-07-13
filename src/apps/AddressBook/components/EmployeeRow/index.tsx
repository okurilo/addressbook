import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import type { Employee } from '../../api/directory/types';
import { EmployeeActions } from '../EmployeeActions';
import { EmployeeAvatar } from '../EmployeeAvatar';
import { Row, Cell, NameCell, PositionCell } from './styled';

type EmployeeRowProps = {
  employee: Employee;
  isFavorite: boolean;
  isExpanded: boolean;
  onToggleFavorite: (employeeId: string) => void;
  onOpen: (employee: Employee) => void;
};

export const EmployeeRow = ({
  employee,
  isFavorite,
  isExpanded,
  onToggleFavorite,
  onOpen,
}: EmployeeRowProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Row
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls={`employee-details-${employee.id}`}
      $expanded={isExpanded}
      onClick={() => {
        onOpen(employee);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(employee);
        }
      }}
    >
      <Cell>
        <NameCell>
          <EmployeeAvatar initials={employee.avatarInitials} status={employee.status} />
          <div>
            <Text variant="body1Semibold">{employee.fullName}</Text>
            <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
              {employee.subtitle}
            </Text>
          </div>
        </NameCell>
      </Cell>
      <Cell>
        <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
          {employee.shortStructure}
        </Text>
      </Cell>
      <Cell>
        <PositionCell>
          <Text variant="body1Regular">{employee.position}</Text>
          <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
            {employee.departmentName}
          </Text>
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
};
