import type { RouteComponentProps } from '@reach/router';
import { useLocation } from '@reach/router';
import { useEffect, useState } from 'react';
import { Button } from '@pulse/ui/components/Button';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { Empty } from '@pulse/ui/components/Empty/Page';
import { DirectoryApiError, fetchEmployeeById } from '../../api/directory/client';
import type { Employee, EmployeeStatus } from '../../api/directory/types';
import { EmployeeAvatar } from '../../components/EmployeeAvatar';
import { RetryState } from '../../components/RetryState';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import {
  Page,
  Card,
  Hero,
  StatusLine,
  DefinitionList,
  DefinitionTerm,
  DefinitionDescription,
  CenteredState,
} from './styled';

const statusLabelMap: Record<EmployeeStatus, string> = {
  available: 'На месте',
  busy: 'Занят',
  offline: 'Не в сети',
  vacation: 'В отпуске',
};

type EmployeePageProps = RouteComponentProps & {
  employeeId?: string;
};

const getEmployeeFromLocationState = (state: unknown): Employee | null => {
  if (typeof state !== 'object' || state === null || !('employee' in state)) {
    return null;
  }

  const { employee } = state;
  return typeof employee === 'object' && employee !== null && 'id' in employee
    ? (employee as Employee)
    : null;
};

export const EmployeePage = ({ employeeId }: EmployeePageProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const locationEmployee = getEmployeeFromLocationState(location.state);
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [viewState, setViewState] = useState<'loading' | 'success' | 'notFound' | 'error'>(
    'loading'
  );
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;

    if (employeeId === undefined) {
      setViewState('notFound');
      return undefined;
    }

    if (locationEmployee?.id === employeeId) {
      setEmployee(locationEmployee);
      setViewState('success');
      return undefined;
    }

    const loadEmployee = async (): Promise<void> => {
      setViewState('loading');

      try {
        const nextEmployee = await fetchEmployeeById(employeeId);

        if (!isActive) {
          return;
        }

        setEmployee(nextEmployee);
        setViewState('success');
      } catch (error: unknown) {
        if (!isActive) {
          return;
        }

        setEmployee(null);

        if (error instanceof DirectoryApiError && error.status === 404) {
          setViewState('notFound');
          return;
        }

        setViewState('error');
      }
    };

    void loadEmployee();

    return () => {
      isActive = false;
    };
  }, [employeeId, locationEmployee, retryToken]);

  if (viewState === 'loading') {
    return (
      <CenteredState>
        <Loader />
      </CenteredState>
    );
  }

  if (viewState === 'notFound') {
    return (
      <Empty
        type="noResults"
        title="Сотрудник не найден"
        description="Проверьте, что код сотрудника указан верно."
      />
    );
  }

  if (viewState === 'error' || employee === null) {
    return (
      <RetryState
        title="Не удалось загрузить данные сотрудника"
        description="Попробуйте переключить mock-сценарий или обновить страницу."
        onRetry={() => {
          setRetryToken((currentValue) => currentValue + 1);
        }}
      />
    );
  }

  const statusColorMap: Record<EmployeeStatus, string> = {
    available: theme.tokens.current.core.support.success,
    busy: theme.tokens.current.core.support.attention,
    offline: theme.tokens.current.core.text.tertiary,
    vacation: theme.tokens.current.core.support.info,
  };

  return (
    <Page>
      <Card>
        <Hero>
          <EmployeeAvatar initials={employee.avatarInitials} status={employee.status} />
          <div>
            <Text variant="h4Semibold">{employee.fullName}</Text>
            <StatusLine>
              <Text variant="body2Regular" color={theme.tokens.current.core.text.secondary}>
                {employee.position}
              </Text>
              <Text variant="body2Regular" color={theme.tokens.current.core.text.tertiary}>
                ·
              </Text>
              <Text variant="body2Semibold" color={statusColorMap[employee.status]}>
                {statusLabelMap[employee.status]}
              </Text>
            </StatusLine>
          </div>
        </Hero>
        <DefinitionList>
          <DefinitionTerm>Телефон</DefinitionTerm>
          <DefinitionDescription>
            {employee.phone === null ? (
              <Text variant="body2Regular" color={theme.tokens.current.core.text.tertiary}>
                не указан
              </Text>
            ) : (
              <Button as="a" href={`tel:${employee.phone}`}>
                {employee.phone}
              </Button>
            )}
          </DefinitionDescription>
          <DefinitionTerm>Email</DefinitionTerm>
          <DefinitionDescription>{employee.email}</DefinitionDescription>
          <DefinitionTerm>Отдел</DefinitionTerm>
          <DefinitionDescription>{employee.departmentName}</DefinitionDescription>
          <DefinitionTerm>Руководитель</DefinitionTerm>
          <DefinitionDescription>{employee.managerName}</DefinitionDescription>
          <DefinitionTerm>Рабочий</DefinitionTerm>
          <DefinitionDescription>{employee.workplace}</DefinitionDescription>
        </DefinitionList>
      </Card>
    </Page>
  );
};

