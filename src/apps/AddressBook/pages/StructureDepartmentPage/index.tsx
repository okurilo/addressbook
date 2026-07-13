import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import styled, { useTheme } from 'styled-components';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { EmptyState } from '@pulse/ui/components/EmptyState';
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
import { getDepartmentPath, routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';

type StructureDepartmentPageProps = RouteComponentProps & {
  departmentId?: string;
};

const Page = styled.section(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '280px minmax(0, 1fr)',
  gap: 32,
  alignItems: 'start',
}));

const Sidebar = styled.aside(({ theme }) => ({
  background: theme.tokens.current.background.default,
  borderRadius: 20,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const SidebarButton = styled.button<{ $active?: boolean }>(({ theme, $active = false }) => ({
  border: 'none',
  background: 'transparent',
  padding: 0,
  textAlign: 'left',
  cursor: 'pointer',
  color: $active ? theme.tokens.current.text.primary : theme.tokens.current.text.secondary,
  fontWeight: $active ? 600 : 400,
  lineHeight: 1.45,
}));

const Content = styled.section(({ theme }) => ({
  background: theme.tokens.current.background.default,
  borderRadius: 20,
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));

const Breadcrumbs = styled.div(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  alignItems: 'center',
}));

const BreadcrumbItem = styled.span(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
}));

const BreadcrumbButton = styled.button(({ theme }) => ({
  border: 'none',
  background: 'transparent',
  padding: 0,
  ...theme.typography.caption1Regular,
  color: theme.tokens.current.text.secondary,
  cursor: 'pointer',
}));

const SummaryLine = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: 4,
}));

const Divider = styled.div(({ theme }) => ({
  borderTop: `1px solid ${theme.tokens.current.border.gentle}`,
}));

const CenteredState = styled.div(({ theme }) => ({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.tokens.current.background.default,
  borderRadius: 20,
  padding: 32,
}));

type ViewState = 'loading' | 'success' | 'notFound' | 'error';

export const StructureDepartmentPage = ({
  departmentId,
}: StructureDepartmentPageProps): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const [detailsCache, setDetailsCache] = useState<Record<string, DepartmentDetails>>({});
  const [childrenCache, setChildrenCache] = useState<Record<string, DepartmentNode[]>>({});
  const [employeesCache, setEmployeesCache] = useState<Record<string, Employee[]>>({});
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [navItems, setNavItems] = useState<DepartmentNode[]>([]);
  const [details, setDetails] = useState<DepartmentDetails | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;

    if (departmentId === undefined) {
      setViewState('notFound');
      setDetails(null);
      setEmployees([]);
      setNavItems([]);
      return undefined;
    }

    const ensureDetails = async (targetDepartmentId: string): Promise<DepartmentDetails> => {
      const cachedDetails = detailsCache[targetDepartmentId];

      if (cachedDetails !== undefined) {
        return cachedDetails;
      }

      const nextDetails = await fetchDepartmentDetails(targetDepartmentId);

      if (isActive) {
        setDetailsCache((currentValue) => ({
          ...currentValue,
          [targetDepartmentId]: nextDetails,
        }));
      }

      return nextDetails;
    };

    const ensureChildren = async (targetDepartmentId: string): Promise<DepartmentNode[]> => {
      const cachedChildren = childrenCache[targetDepartmentId];

      if (cachedChildren !== undefined) {
        return cachedChildren;
      }

      const nextChildren = await fetchDepartmentChildren(targetDepartmentId);

      if (isActive) {
        setChildrenCache((currentValue) => ({
          ...currentValue,
          [targetDepartmentId]: nextChildren,
        }));
      }

      return nextChildren;
    };

    const ensureEmployees = async (targetDepartmentId: string): Promise<Employee[]> => {
      const cachedEmployees = employeesCache[targetDepartmentId];

      if (cachedEmployees !== undefined) {
        return cachedEmployees;
      }

      const nextEmployees = await fetchEmployeesByDepartment(targetDepartmentId);

      if (isActive) {
        setEmployeesCache((currentValue) => ({
          ...currentValue,
          [targetDepartmentId]: nextEmployees,
        }));
      }

      return nextEmployees;
    };

    const loadDepartment = async (): Promise<void> => {
      setViewState('loading');

      try {
        const nextDetails = await ensureDetails(departmentId);
        const [nextChildren, nextEmployees] = await Promise.all([
          ensureChildren(departmentId),
          ensureEmployees(departmentId),
        ]);

        const nextNavItems =
          nextChildren.length > 0
            ? nextChildren
            : nextDetails.parentId === null
            ? []
            : (await ensureChildren(nextDetails.parentId)).filter(
                (item) => item.id !== nextDetails.id
              );

        if (!isActive) {
          return;
        }

        setDetails(nextDetails);
        setEmployees(nextEmployees);
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
  }, [childrenCache, departmentId, detailsCache, employeesCache, retryToken]);

  const openDepartment = (targetDepartmentId: string): void => {
    ignorePromise(
      navigate(getDepartmentPath(targetDepartmentId))
    );
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
            }}
          >
            Структура
          </BreadcrumbButton>
          {currentPath.map((item, index) => (
            <BreadcrumbItem key={item.id}>
              <Text variant="caption1Regular" color={theme.tokens.current.text.tertiary}>
                /
              </Text>
              {index === currentPath.length - 1 ? (
                <Text variant="caption1Semibold" color={theme.tokens.current.text.primary}>
                  {item.name}
                </Text>
              ) : (
                <BreadcrumbButton
                  type="button"
                  onClick={() => {
                    openDepartment(item.id);
                  }}
                >
                  {item.name}
                </BreadcrumbButton>
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>

        <Text variant="h2Semibold">{details.name}</Text>

        <SummaryLine>
          <Text variant="body1Regular" color={theme.tokens.current.text.secondary}>
            В структуре
          </Text>
          <Text variant="body1Semibold">{details.employeeCount}</Text>
          <Text variant="body1Regular" color={theme.tokens.current.text.secondary}>
            сотрудников
          </Text>
        </SummaryLine>

        <Divider />

        <div>
          <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
            Номер организационной единицы
          </Text>
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
          />
        )}
      </Content>
    </Page>
  );
};
