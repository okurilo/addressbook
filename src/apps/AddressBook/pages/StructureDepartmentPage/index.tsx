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
import { ShowMoreButton } from '../../components/ShowMoreButton';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { getDepartmentPath, routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import { fetchGroups, fetchRootGroups, getGroupPath } from '../../api/directory/groups';
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
  const isGlobalSearch = query.trim() !== '';
  const structureRequestKey = `${isGlobalSearch ? 'search' : 'browse'}:${departmentId ?? ''}`;
  const [page, setPage] = useState(0);
  const [group, setGroup] = useState<GroupNode | null>(null);
  const [navItems, setNavItems] = useState<GroupNode[]>([]);
  const [loadedStructureKey, setLoadedStructureKey] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);
  const [employeeRetryToken, setEmployeeRetryToken] = useState(0);
  const [isLastPage, setIsLastPage] = useState(true);
  const [totalElements, setTotalElements] = useState<number | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadMoreFailed, setIsLoadMoreFailed] = useState(false);

  useEffect(() => {
    setPage(0);
    setGroup(null);
    setNavItems([]);
    setLoadedStructureKey(null);
    setEmployees([]);
    setIsLastPage(true);
    setIsLoadMoreFailed(false);
  }, [departmentId, query]);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadDepartment = async (): Promise<void> => {
      setViewState('loading');

      try {
        if (isGlobalSearch && departmentId === undefined) {
          const rootGroups = await fetchRootGroups(controller.signal);

          if (!isActive) {
            return;
          }

          setGroup(null);
          setNavItems(rootGroups);
          setLoadedStructureKey(structureRequestKey);
          return;
        }

        const nextGroup = await fetchGroups(departmentId, controller.signal);

        if (!isActive) {
          return;
        }

        setGroup(nextGroup);
        setNavItems(nextGroup.children);
        setLoadedStructureKey(structureRequestKey);
        if (!isGlobalSearch && nextGroup.parentTree?.id === nextGroup.id) {
          setEmployees([]);
          setIsLastPage(true);
          setViewState('success');
        }
      } catch {
        if (isActive && !controller.signal.aborted) {
          setGroup(null);
          setEmployees([]);
          setNavItems([]);
          setLoadedStructureKey(null);
          setViewState('error');
        }
      }
    };

    void loadDepartment();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [departmentId, isGlobalSearch, query, retryToken, structureRequestKey]);

  useEffect(() => {
    if (loadedStructureKey !== structureRequestKey || (!isGlobalSearch && group === null)) {
      return;
    }

    const isHierarchyRoot =
      !isGlobalSearch && group !== null && group.parentTree?.id === group.id;

    if (isHierarchyRoot) {
      return;
    }

    const controller = new AbortController();
    let isActive = true;

    const loadEmployees = async (): Promise<void> => {
      if (page === 0) {
        setViewState('loading');
      } else {
        setIsLoadingMore(true);
      }
      setIsLoadMoreFailed(false);

      try {
        const response = await fetchEmployees(
          isGlobalSearch ? query : '',
          controller.signal,
          isGlobalSearch ? departmentId ?? null : group?.id ?? null,
          page
        );

        if (!isActive) {
          return;
        }

        setEmployees((currentEmployees) => {
          if (page === 0) {
            return response.items;
          }

          const employeesById = new Map(
            [...currentEmployees, ...response.items].map((employee) => [employee.id, employee])
          );

          return Array.from(employeesById.values());
        });
        setTotalElements(response.totalElements);
        setIsLastPage(response.isLastPage);
        setViewState('success');
      } catch {
        if (!isActive || controller.signal.aborted) {
          return;
        }

        if (page === 0) {
          setEmployees([]);
          setViewState('error');
        } else {
          setIsLoadMoreFailed(true);
        }
      } finally {
        if (isActive) {
          setIsLoadingMore(false);
        }
      }
    };

    void loadEmployees();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [
    departmentId,
    employeeRetryToken,
    group,
    isGlobalSearch,
    loadedStructureKey,
    page,
    query,
    structureRequestKey,
  ]);

  const openGroup = (targetGroupId: string): void => {
    const targetPath = getDepartmentPath(targetGroupId);
    ignorePromise(navigate(isGlobalSearch ? `${targetPath}${location.search}` : targetPath));
  };

  if (viewState === 'loading') {
    return (
      <CenteredState>
        <Loader />
      </CenteredState>
    );
  }

  if (viewState === 'error' || (!isGlobalSearch && group === null)) {
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

  const isHierarchyRoot =
    !isGlobalSearch && group !== null && group.parentTree?.id === group.id;
  const groupPath = group === null ? [] : getGroupPath(group);
  const parentGroup = groupPath.length > 1 ? groupPath[groupPath.length - 2] : null;

  if (isHierarchyRoot && group !== null) {
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
        {parentGroup !== null ? (
          <SidebarButton type="button" onClick={() => openGroup(parentGroup.id)}>
            ↑ Наверх
          </SidebarButton>
        ) : null}
        {group !== null ? (
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
        {!isGlobalSearch && group !== null ? (
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
          {isGlobalSearch ? 'результаты поиска' : group?.name ?? ''}
        </Text>
        {isGlobalSearch ? (
          <Text variant="body2Regular" color={theme.tokens.current.core.text.secondary}>
            {totalElements === null
              ? 'Найдено сотрудников'
              : `Найдено ${totalElements} сотрудников`}{' '}
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
            {!isLastPage || isLoadMoreFailed ? (
              <ShowMoreButton
                isLoading={isLoadingMore}
                onClick={() => {
                  if (isLoadMoreFailed) {
                    setEmployeeRetryToken((currentValue) => currentValue + 1);
                    return;
                  }

                  setPage((currentPage) => currentPage + 1);
                }}
              />
            ) : null}
          </>
        )}
      </Content>
    </Page>
  );
};
