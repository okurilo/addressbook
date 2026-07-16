import type { RouteComponentProps } from '@reach/router';
import { useLocation } from '@reach/router';
import { useEffect, useState } from 'react';
import { Loader } from '@pulse/ui/components/Loader';
import { Empty } from '@pulse/ui/components/Empty/Page';
import { Profile } from '../../../../Components/Adressbook/Profile';
import { DirectoryApiError, fetchEmployeeById } from '../../api/directory/client';
import type { Employee } from '../../api/directory/types';
import { RetryState } from '../../components/RetryState';
import { Page, CenteredState } from './styled';

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
  const location = useLocation();
  const locationEmployee = getEmployeeFromLocationState(location.state);
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

  return (
    <Page>
      <Profile
        pid={employee.id}
        person={{
          name: employee.fullName,
          photo: employee.photoUrl ?? '',
          employeeNumber: employee.employeeNumber,
          position: employee.position,
          initials: employee.avatarInitials,
          internalPhone: employee.phone ?? undefined,
          personalPhone: employee.mobilePhone ?? undefined,
          absence: employee.absence,
        }}
      />
    </Page>
  );
};

