import { Fragment, useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { useLocation, useNavigate } from '@reach/router';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { Empty } from '@pulse/ui/components/Empty';
import { useTheme } from 'styled-components';
import { fetchEmployees } from '../../api/directory/client';
import type { Employee } from '../../api/directory/types';
import { EmployeeTable } from '../../components/EmployeeTable';
import { RetryState } from '../../components/RetryState';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { getDepartmentPath, routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import {
  fetchGroups,
  getGroupPath,
  getVisibleGroups,
} from '../../api/directory/groups';
import type { GroupNode } from '../../api/directory/groups';
import {
  Breadcrumbs,
  BreadcrumbButton,
  CenteredState,
  Content,
  Page,
  Sidebar,
  SidebarButton,
} from './styled';

type StructureDepartmentPageProps = RouteComponentProps & {
  departmentId?: string;
};

type ViewState = 'loading' | 'success' | 'notFound' | 'error';

export const StructureDepartmentPage = ({
  departmentId,
}: StructureDepartmentPageProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const query = new URLSearchParams(location.search).get('q') ?? '';
  const [group, setGroup] = useState<GroupNode | null>(null);
  const [navItems, setNavItems] = useState<GroupNode[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    if (departmentId === undefined) {
      setViewState('notFound');
      setGroup(null);
      setEmployees([]);
      setNavItems([]);
      return () => controller.abort();
    }

    const loadDepartment = async (): Promise<void> => {
      setViewState('loading');

      try {
        const isGlobalSearch = query.trim() !== '';
        const nextGroup = await fetchGroups(
          isGlobalSearch ? undefined : departmentId,
          controller.signal
        );
        const nextEmployees = (
          await fetchEmployees(
            isGlobalSearch ? query : '',
            controller.signal,
            isGlobalSearch ? null : departmentId
          )
        ).items;

        if (!isActive) {
          return;
        }

        setGroup(nextGroup);
        setNavItems(isGlobalSearch ? getVisibleGroups(nextGroup) : nextGroup.children);
        setEmployees(nextEmployees);
        setViewState('success');
      } catch {
        if (isActive && !controller.signal.aborted) {
          setGroup(null);
          setEmployees([]);
          setNavItems([]);
          setViewState('error');
        }
      }
    };

    void loadDepartment();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [departmentId, query, retryToken]);

  const openGroup = (targetGroupId: string): void => {
    ignorePromise(navigate(getDepartmentPath(targetGroupId)));
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
      <Empty
        type="noResults"
        title="Подразделение не найдено"
        description="Проверьте ссылку или вернитесь к корневой структуре."
      />
    );
  }

  if (viewState === 'error' || group === null) {
    return (
      <RetryState
        title="Не удалось загрузить подразделение"
        description="Попробуйте открыть подразделение позже."
        onRetry={() => {
          setRetryToken((currentValue) => currentValue + 1);
        }}
      />
    );
  }

  const isGlobalSearch = query.trim() !== '';
  const groupPath = isGlobalSearch ? [] : getGroupPath(group);
  const parentGroup = groupPath.length > 1 ? groupPath[groupPath.length - 2] : null;

  return (
    <Page>
      <Sidebar>
        <SidebarButton
          type="button"
          onClick={() => {
            if (isGlobalSearch || parentGroup === null) {
              ignorePromise(navigate(routePaths.structure + location.search));
              return;
            }

            openGroup(parentGroup.id);
          }}
        >
          ↑ Наверх
        </SidebarButton>
        {!isGlobalSearch ? (
          <SidebarButton type="button" $active>
            {group.name}
          </SidebarButton>
        ) : null}
        {navItems.map((item) => (
          <SidebarButton key={item.id} type="button" onClick={() => openGroup(item.id)}>
            {item.name}
          </SidebarButton>
        ))}
      </Sidebar>

      <Content>
        {!isGlobalSearch ? (
          <Breadcrumbs>
            <BreadcrumbButton
              type="button"
              onClick={() => {
                ignorePromise(navigate(routePaths.structure));
              }}
            >
              Структура
            </BreadcrumbButton>
            {groupPath.map((item, index) => (
              <Fragment key={item.id}>
                <Text variant="caption1Regular" color={theme.tokens.current.core.text.tertiary}>
                  /
                </Text>
                {index === groupPath.length - 1 ? (
                  <Text variant="caption1Semibold" color={theme.tokens.current.core.text.primary}>
                    {item.name}
                  </Text>
                ) : (
                  <BreadcrumbButton type="button" onClick={() => openGroup(item.id)}>
                    {item.name}
                  </BreadcrumbButton>
                )}
              </Fragment>
            ))}
          </Breadcrumbs>
        ) : null}

        <Text variant="h2Semibold">
          {isGlobalSearch ? 'результаты поиска' : group.name}
        </Text>
        {isGlobalSearch ? (
          <Text variant="body2Regular" color={theme.tokens.current.core.text.secondary}>
            по запросу: {query}
          </Text>
        ) : null}

        {employees.length === 0 ? (
          <Empty
            type="noResults"
            title="Сотрудники не найдены"
            description="Попробуйте изменить поисковый запрос или выбрать другое подразделение."
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
