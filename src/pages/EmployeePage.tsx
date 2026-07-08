import type { RouteComponentProps } from '@reach/router';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '@pulse/ui/Button';
import { EmptyState } from '@pulse/ui/EmptyState';
import { Spinner } from '@pulse/ui/Spinner';
import { Text } from '@pulse/ui/Text';
import { DirectoryApiError, fetchEmployeeById } from '../api/directory/client';
import type { Employee, EmployeeStatus } from '../api/directory/types';
import { EmployeeActions } from '../components/EmployeeActions';
import { EmployeeAvatar } from '../components/EmployeeAvatar';
import { RetryState } from '../components/RetryState';
import { useFavoriteEmployees } from '../components/useFavoriteEmployees';
import { useAppLocation, useAppNavigate } from '../routes/appRouter';
import { ignorePromise } from '../utils/ignorePromise';

type EmployeePageProps = RouteComponentProps & {
  employeeId?: string;
};

const statusLabelMap: Record<EmployeeStatus, string> = {
  available: 'На месте',
  busy: 'Занят',
  offline: 'Не в сети',
  vacation: 'В отпуске',
};

const Page = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.lg,
}));

const Card = styled('div')(({ theme }) => ({
  background: theme.colors.surface,
  borderRadius: theme.radius.lg,
  padding: theme.spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.lg,
}));

const Hero = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '64px minmax(0, 1fr)',
  gap: theme.spacing.lg,
  alignItems: 'start',
}));

const StatusLine = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
}));

const DefinitionList = styled('dl')(({ theme }) => ({
  margin: 0,
  display: 'grid',
  gridTemplateColumns: '220px minmax(0, 1fr)',
  rowGap: theme.spacing.md,
  columnGap: theme.spacing.lg,
}));

const DefinitionTerm = styled('dt')(({ theme }) => ({
  color: theme.colors.textSecondary,
}));

const DefinitionDescription = styled('dd')({
  margin: 0,
});

const CenteredState = styled('div')(({ theme }) => ({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.colors.surface,
  borderRadius: theme.radius.lg,
  padding: theme.spacing.xl,
}));

type ViewState = 'loading' | 'success' | 'notFound' | 'error';

const copyValue = async (value: string): Promise<void> => {
  if (navigator.clipboard !== undefined) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const element = document.createElement('textarea');
  element.value = value;
  element.setAttribute('readonly', 'true');
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
};

export const EmployeePage = ({ employeeId }: EmployeePageProps): JSX.Element => {
  const navigate = useAppNavigate();
  const location = useAppLocation();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;

    if (employeeId === undefined) {
      setEmployee(null);
      setViewState('notFound');
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
  }, [employeeId, retryToken]);

  const handleBack = (): void => {
    if (window.history.length > 1) {
      ignorePromise(navigate(-1));
      return;
    }

    ignorePromise(navigate(`/${location.search}`));
  };

  if (viewState === 'loading') {
    return (
      <CenteredState>
        <Spinner />
      </CenteredState>
    );
  }

  if (viewState === 'notFound') {
    return (
      <EmptyState
        title="Сотрудник не найден"
        description="Проверьте ссылку или вернитесь к поиску сотрудников."
      />
    );
  }

  if (viewState === 'error' || employee === null) {
    return (
      <RetryState
        title="Не удалось загрузить визитку"
        description="Переключите mock-сценарий или попробуйте открыть сотрудника позже."
        onRetry={() => {
          setRetryToken((currentValue) => currentValue + 1);
        }}
      />
    );
  }

  const phone = employee.phone;
  const extraActions =
    phone === null
      ? [
          {
            label: 'Скопировать email',
            onClick: () => {
              void copyValue(employee.email);
            },
          },
          {
            label: 'Показать в структуре',
            onClick: () => {
              ignorePromise(navigate(`/structure/${employee.departmentId}`));
            },
          },
        ]
      : [
          {
            label: 'Скопировать телефон',
            onClick: () => {
              void copyValue(phone);
            },
          },
          {
            label: 'Скопировать email',
            onClick: () => {
              void copyValue(employee.email);
            },
          },
          {
            label: 'Показать в структуре',
            onClick: () => {
              ignorePromise(navigate(`/structure/${employee.departmentId}`));
            },
          },
        ];

  return (
    <Page>
      <div>
        <Button appearance="ghost" onClick={handleBack}>
          Назад
        </Button>
      </div>
      <Card>
        <Hero>
          <EmployeeAvatar initials={employee.avatarInitials} status={employee.status} />
          <div>
            <Text as="h2" size="xl" weight="semibold">
              {employee.fullName}
            </Text>
            <StatusLine>
              <Text tone="secondary">{statusLabelMap[employee.status]}</Text>
              <Text tone="secondary">{employee.subtitle}</Text>
            </StatusLine>
          </div>
        </Hero>
        <EmployeeActions
          phone={phone}
          email={employee.email}
          emailLabel={employee.email}
          isFavorite={favoriteIds.includes(employee.id)}
          onToggleFavorite={() => {
            ignorePromise(toggleFavorite(employee.id));
          }}
          extraActions={extraActions}
        />
        <DefinitionList>
          <DefinitionTerm>Должность</DefinitionTerm>
          <DefinitionDescription>{employee.position}</DefinitionDescription>
          <DefinitionTerm>Подразделение</DefinitionTerm>
          <DefinitionDescription>{employee.departmentName}</DefinitionDescription>
          <DefinitionTerm>Табельный номер</DefinitionTerm>
          <DefinitionDescription>{employee.employeeNumber}</DefinitionDescription>
          <DefinitionTerm>Телефон</DefinitionTerm>
          <DefinitionDescription>{employee.phone ?? 'не указан'}</DefinitionDescription>
          <DefinitionTerm>Мобильный телефон</DefinitionTerm>
          <DefinitionDescription>{employee.mobilePhone ?? 'не указан'}</DefinitionDescription>
          <DefinitionTerm>Email</DefinitionTerm>
          <DefinitionDescription>{employee.email}</DefinitionDescription>
          <DefinitionTerm>Рабочее место</DefinitionTerm>
          <DefinitionDescription>{employee.workplace}</DefinitionDescription>
          <DefinitionTerm>Руководитель</DefinitionTerm>
          <DefinitionDescription>{employee.managerName}</DefinitionDescription>
        </DefinitionList>
      </Card>
    </Page>
  );
};
