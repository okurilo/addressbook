import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { EmptyState } from '../../stubs/pulse/ui/EmptyState';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import {
  fetchDepartmentChildren,
  fetchDepartmentDetails,
  fetchEmployeesByDepartment,
} from '../../api/directory/departmentsClient';
import { DirectoryApiError } from '../../api/directory/client';
import type {
  DepartmentDetails,
  DepartmentNode,
  DepartmentPath,
} from '../../api/directory/departments';
import type { Employee } from '../../api/directory/types';
import { EmployeeTable } from '../../components/EmployeeTable';
import { RetryState } from '../../components/RetryState';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { useNavigate } from '@reach/router';
import { routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import {
  Page,
  Sidebar,
  SidebarButton,
  Content,
  Breadcrumbs,
  BreadcrumbButton,
  SummaryLine,
  Divider,
  CenteredState,
} from './styled';

type StructureDepartmentPageProps = RouteComponentProps & {
  departmentId?: string;
};

const statusLabelMap: Record<string, string> = {
  available: 'На месте',
  busy: 'Занят',
  offline: 'Не в сети',
  vacation: 'В отпуске',
};

export const StructureDepartmentPage = ({
  departmentId,
}: StructureDepartmentPageProps): JSX.Element => {
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const [details, setDetails] = useState<DepartmentDetails | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [navItems, setNavItems] = useState<DepartmentNode[]>([]);
  const [viewState, setViewState] = useState<'loading' | 'success' | 'notFound' | 'error'>('loading');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;

    if (departmentId === undefined) {
      setViewState('notFound');
      return undefined;
    }

    const loadDepartment = async (): Promise<void> => {
      setViewState('loading');

      try {
        const [nextDetails, nextChildren, nextEmployees] = await Promise.all([
          fetchDepartmentDetails(departmentId),
          fetchDepartmentChildren(departmentId),
          fetchEmployeesByDepartment(departmentId),
        ]);

        if (!isActive) {
          return;
        }

        setDetails(nextDetails);
        setEmployees(nextEmployees);

        const nextNavItems =
          nextChildren.length > 0
            ? nextChildren
            : nextDetails.parentId === null
              ? []
              : [];

        setNavItems(nextNavItems);
        setViewState('success');
      } catch (error: unknown) {
        if (!isActive) {
          return;
        }

        setDetails(null);
        setEmployees([]);
        setNavItems([]);

        if (error instanceof DirectoryApiError && error.status === 404) {
          setViewState('notFound');
          return;
        }

        setViewState('error');
      }
    };

    void loadDepartment();

    return () => {
      isActive = false;
    };
  }, [departmentId, retryToken]);

  const openDepartment = (targetDepartmentId: string): void => {
    ignorePromise(navigate(routePaths.structureDepartment.replace(':departmentId', targetDepartmentId)));
  };

  if (viewState === 'loading') {
    return (
      <CenteredState>
        <Loader />
      </CenteredState>
    );
  }

  if (viewState === 'notFound') {
    return (
      <EmptyState
        title="Подразделение не найдено"
        description="Проверьте ссылку или вернитесь к корневой структуре."
      />
    );
  }

  if (viewState === 'error' || details === null) {
    return (
      <RetryState
        title="Не удалось загрузить подразделение"
        description="Попробуйте переключить mock-сценарий или открыть подразделение позже."
        onRetry={() => {
          setRetryToken((currentValue) => currentValue + 1);
        }}
      />
    );
  }

  const currentPath: DepartmentPath[] = details.path;

  return (
    <Page>
      <Sidebar>
        <SidebarButton
          type="button"
          $active
          onClick={() => {
            if (details.parentId === null) {
              ignorePromise(navigate(routePaths.structure));
              return;
            }

            openDepartment(details.parentId);
          }}
        >
          ↑ Наверх
        </SidebarButton>
        <SidebarButton type="button" $active>
          {details.name}
        </SidebarButton>
        {navItems.map((item) => (
          <SidebarButton
            key={item.id}
            type="button"
            $active={item.id === details.id}
            onClick={() => {
              if (item.id === details.id) {
                return;
              }

              openDepartment(item.id);
            }}
          >
            {item.name}
          </SidebarButton>
        ))}
      </Sidebar>

      <Content>
        <Breadcrumbs>
          <BreadcrumbButton
            type="button"
            onClick={() => {
              ignorePromise(navigate(routePaths.structure));
            }
          >
            Структура
          </BreadcrumbButton>
          {currentPath.map((item, index) => (
            <div key={item.id}>
              <Text variant="body2Regular">
                /
              </Text>{' '}
              {index === currentPath.length - 1 ? (
                <Text variant="body2Regular">
                  {item.name}
                </Text>
              ) : (
                <BreadcrumbButton
                  type="button"
                  onClick={() => {
                    openDepartment(item.id);
                  }
                >
                  {item.name}
                </BreadcrumbButton>
              )}
            </div>
          ))}
        </Breadcrumbs>

        <Text variant="h2Semibold">
          {details.name}
        </Text>

        <SummaryLine>
          <Text variant="body1Regular">В структуре</Text>
          <Text variant="body1Semibold">
            {details.employeeCount}
          </Text>
          <Text variant="body1Regular">сотрудников</Text>
        </SummaryLine>

        <Divider />

        <div>
          <Text variant="body1Regular">Номер организационной единицы</Text>
          <Text variant="body1Semibold">{details.orgUnitNumber}</Text>
        </div>

        <Divider />

        {employees.length === 0 ? (
          <EmptyState
            title="Сотрудники не найдены"
            description="Для выбранного подразделения в текущем mock-наборе сотрудники отсутствуют."
          />
        ) : (
          <EmployeeTable
            employees={employees}
            favoriteIds={favoriteIds}
            onToggleFavorite={(employeeId) => {
              ignorePromise(toggleFavorite(employeeId));
            }}
            onOpenEmployee={(employee) => {
              ignorePromise(navigate(`/employee/${employee.id}`));
            }}
          />
        )}
      </Content>
    </Page>
  );
};


