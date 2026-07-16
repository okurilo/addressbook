import { Fragment, useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { useLocation, useNavigate } from '@reach/router';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { Empty } from '@pulse/ui/components/Empty/Page';
import { useTheme } from 'styled-components';
import { fetchEmployees } from '../../api/directory/client';
import type { Employee } from '../../api/directory/types';
import { EmployeeTable } from '../../components/EmployeeTable';
import { RetryState } from '../../components/RetryState';
import { Pagination } from '../../components/Pagination';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { getDepartmentPath, routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import { fetchGroups, getGroupPath, getVisibleGroups } from '../../api/directory/groups';
import type { GroupNode } from '../../api/directory/groups';
import {
  Breadcrumbs,
  BreadcrumbButton,
  CenteredState,
  Content,
  HierarchyCard,
  HierarchyGrid,
  HierarchyHeader,
  HierarchyRoot,
  Page,
  Sidebar,
  SidebarButton,
} from './styled';

type StructureDepartmentPageProps = RouteComponentProps & {
  departmentId?: string;
};

type ViewState = 'loading' | 'success' | 'error';

export const StructureDepartmentPage = ({
  departmentId,
}: StructureDepartmentPageProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const query = new URLSearchParams(location.search).get('q') ?? '';
  const pageFromUrl = Number.parseInt(new URLSearchParams(location.search).get('page') ?? '1', 10);
  const page = Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  const [group, setGroup] = useState<GroupNode | null>(null);
  const [navItems, setNavItems] = useState<GroupNode[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLastPage, setIsLastPage] = useState(true);
  const [totalElements, setTotalElements] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadDepartment = async (): Promise<void> => {
      setViewState('loading');

      try {
        const isGlobalSearch = query.trim() !== '';
        const nextGroup = await fetchGroups(
          isGlobalSearch ? undefined : departmentId,
          controller.signal
        );
        const isHierarchyRoot = nextGroup.parentTree?.id === nextGroup.id;
        const employeeResponse =
          !isGlobalSearch && isHierarchyRoot
            ? null
            : await fetchEmployees(
                isGlobalSearch ? query : '',
                controller.signal,
                isGlobalSearch ? null : nextGroup.id,
                page
              );
        const nextEmployees = employeeResponse?.items ?? [];

        if (!isActive) {
          return;
        }

        setGroup(nextGroup);
        setNavItems(isGlobalSearch ? getVisibleGroups(nextGroup) : nextGroup.children);
        setEmployees(nextEmployees);
        setTotalPages(employeeResponse?.totalPages ?? null);
        setTotalElements(employeeResponse?.totalElements ?? null);
        setIsLastPage(employeeResponse?.isLastPage ?? true);
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
  }, [departmentId, page, query, retryToken]);

  const openGroup = (targetGroupId: string): void => {
    ignorePromise(navigate(getDepartmentPath(targetGroupId)));
  };

  const openPage = (nextPage: number): void => {
    const nextParams = new URLSearchParams(location.search);
    nextParams.set('page', `${nextPage + 1}`);
    ignorePromise(navigate(`${location.pathname}?${nextParams.toString()}`));
  };

  if (viewState === 'loading') {
    return (
      <CenteredState>
        <Loader />
      </CenteredState>
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
  const isHierarchyRoot = !isGlobalSearch && group.parentTree?.id === group.id;
  const groupPath = isGlobalSearch ? [] : getGroupPath(group);
  const parentGroup = groupPath.length > 1 ? groupPath[groupPath.length - 2] : null;

  if (isHierarchyRoot) {
    return (
      <HierarchyRoot>
        <HierarchyHeader>
          <Text variant="h2Semibold">Кадровая структура</Text>
          <Text variant="body1Regular" color={theme.tokens.current.core.text.secondary}>
            {group.name}
          </Text>
        </HierarchyHeader>
        {group.children.length === 0 ? (
          <Empty
            type="noData"
            title="Структура пока пуста"
            description="Вложенные подразделения не найдены."
          />
        ) : (
          <HierarchyGrid>
            {group.children.map((child) => (
              <HierarchyCard key={child.id} type="button" onClick={() => openGroup(child.id)}>
                <Text variant="body1Semibold">{child.name}</Text>
              </HierarchyCard>
            ))}
          </HierarchyGrid>
        )}
      </HierarchyRoot>
    );
  }

  return (
    <Page>
      <Sidebar>
        {!isGlobalSearch && parentGroup !== null ? (
          <SidebarButton type="button" onClick={() => openGroup(parentGroup.id)}>
            ↑ Наверх
          </SidebarButton>
        ) : null}
        {!isGlobalSearch ? (
          <SidebarButton type="button" $active>
            {group.name}
          </SidebarButton>
        ) : (
          <Text variant="body1Semibold">кадровая структура</Text>
        )}
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

        <Text variant="h2Semibold">{isGlobalSearch ? 'результаты поиска' : group.name}</Text>
        {isGlobalSearch ? (
          <Text variant="body2Regular" color={theme.tokens.current.core.text.secondary}>
            {totalElements === null ? 'Найдено сотрудников' : `Найдено ${totalElements} сотрудников`}{' '}
            по запросу <strong>{query}</strong> в кадровой структуре
          </Text>
        ) : null}

        {employees.length === 0 ? (
          <Empty
            type="noResults"
            title="Сотрудники не найдены"
            description="Попробуйте изменить поисковый запрос или выбрать другое подразделение."
          />
        ) : (
          <>
            <EmployeeTable
              employees={employees}
              favoriteIds={favoriteIds}
              onToggleFavorite={(employeeId) => {
                ignorePromise(toggleFavorite(employeeId));
              }}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              isLastPage={isLastPage}
              onChange={openPage}
            />
          </>
        )}
      </Content>
    </Page>
  );
};
