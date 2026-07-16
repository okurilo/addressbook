import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from '@reach/router';
import type { RouteComponentProps } from '@reach/router';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { Empty } from '@pulse/ui/components/Empty/Page';
import {
  fetchAllCustomPeopleGroupEmployees,
  fetchCustomPeopleGroupPage,
  fetchCustomPeopleGroups,
} from '../../api/directory/client';
import type { CustomPeopleGroup } from '../../api/directory/favorites';
import type { Employee } from '../../api/directory/types';
import { EmployeeTable } from '../../components/EmployeeTable';
import { GroupActions } from '../../components/GroupActions';
import { ShowMoreButton } from '../../components/ShowMoreButton';
import { RetryState } from '../../components/RetryState';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import { Page, Header, GroupTabs, GroupTab, Surface, CenteredState } from './styled';

type ViewState = 'loading' | 'success' | 'empty' | 'error';

const mergeEmployees = (currentEmployees: Employee[], nextEmployees: Employee[]): Employee[] =>
  Array.from(
    new Map(
      [...currentEmployees, ...nextEmployees].map((employee) => [employee.id, employee])
    ).values()
  );

export const FavoritesPage = (_props: RouteComponentProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const searchParams = new URLSearchParams(location.search);
  const groupIdFromUrl = searchParams.get('groupId') ?? 'all';
  const [groups, setGroups] = useState<CustomPeopleGroup[]>([]);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadMoreFailed, setIsLoadMoreFailed] = useState(false);

  const activeGroup = groups.find((group) => group.id === groupIdFromUrl) ?? null;
  const activeGroupId = activeGroup?.id ?? 'all';
  const sourceEmployees =
    activeGroup === null
      ? Array.from(
          groups
            .flatMap((group) => group.employees)
            .reduce((employeesById, employee) => {
              if (!employeesById.has(employee.id)) {
                employeesById.set(employee.id, employee);
              }

              return employeesById;
            }, new Map<string, Employee>())
            .values()
        )
      : activeGroup.employees;
  const employees = sourceEmployees;
  const hasMore =
    activeGroup === null ? groups.some((group) => !group.isLastPage) : !activeGroup.isLastPage;

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadFavorites = async (): Promise<void> => {
      setViewState('loading');

      try {
        const nextGroups = await fetchCustomPeopleGroups(controller.signal);

        if (!isActive) {
          return;
        }

        setGroups(nextGroups);
        setViewState('success');
      } catch {
        if (!isActive || controller.signal.aborted) {
          return;
        }

        setGroups([]);
        setViewState('error');
      }
    };

    void loadFavorites();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [retryToken]);

  const openGroup = (groupId: string): void => {
    const nextParams = new URLSearchParams(location.search);

    if (groupId === 'all') {
      nextParams.delete('groupId');
    } else {
      nextParams.set('groupId', groupId);
    }

    const nextSearch = nextParams.toString();
    ignorePromise(
      navigate(`${routePaths.favorites}${nextSearch === '' ? '' : `?${nextSearch}`}`, {
        replace: true,
      })
    );
  };

  const loadMore = async (): Promise<void> => {
    const targetIds = new Set(
      (activeGroup === null ? groups : [activeGroup])
        .filter((group) => !group.isLastPage)
        .map((group) => group.id)
    );

    if (targetIds.size === 0) {
      return;
    }

    setIsLoadingMore(true);
    setIsLoadMoreFailed(false);

    try {
      const pages = await Promise.all(
        groups
          .filter((group) => targetIds.has(group.id))
          .map(async (group) => ({
            groupId: group.id,
            page: await fetchCustomPeopleGroupPage(group.id, group.nextPage),
          }))
      );
      const pagesByGroupId = new Map(pages.map((item) => [item.groupId, item.page]));

      setGroups((currentGroups) =>
        currentGroups.map((group) => {
          const page = pagesByGroupId.get(group.id);
          const pageSignature = page?.employees.map((employee) => employee.id).join('|') ?? '';
          const isRepeatedPage = pageSignature !== '' && pageSignature === group.lastPageSignature;

          return page === undefined
            ? group
            : {
                ...group,
                employees: mergeEmployees(group.employees, page.employees),
                nextPage: page.nextPage,
                isLastPage: page.isLastPage || page.employees.length === 0 || isRepeatedPage,
                lastPageSignature: pageSignature,
              };
        })
      );
    } catch {
      setIsLoadMoreFailed(true);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const loadAllActionEmployees = async (): Promise<Employee[]> => {
    const targetGroups = activeGroup === null ? groups : [activeGroup];
    const completedGroups = await Promise.all(
      targetGroups.map(async (group) => ({
        groupId: group.id,
        employees: await fetchAllCustomPeopleGroupEmployees(group),
      }))
    );
    const employeesById = new Map<string, Employee>();

    completedGroups.forEach((group) => {
      group.employees.forEach((employee) => {
        employeesById.set(employee.id, employee);
      });
    });

    return Array.from(employeesById.values());
  };

  return (
    <Page>
      <Header>
        <Text variant="h2Semibold">избранное</Text>
        <GroupTabs role="tablist" aria-label="Пользовательские группы">
          <GroupTab
            type="button"
            role="tab"
            $active={activeGroupId === 'all'}
            aria-selected={activeGroupId === 'all'}
            onClick={() => openGroup('all')}
          >
            Все
          </GroupTab>
          {groups.map((group) => (
            <GroupTab
              key={group.id}
              type="button"
              role="tab"
              $active={activeGroupId === group.id}
              aria-selected={activeGroupId === group.id}
              onClick={() => openGroup(group.id)}
            >
              {group.name}
            </GroupTab>
          ))}
        </GroupTabs>
        {viewState === 'success' && sourceEmployees.length > 0 ? (
          <GroupActions
            key={activeGroupId}
            employees={sourceEmployees}
            hasUnloadedEmployees={hasMore}
            loadAllEmployees={loadAllActionEmployees}
          />
        ) : null}
      </Header>
      <Surface>
        {viewState === 'loading' ? (
          <CenteredState>
            <Loader />
          </CenteredState>
        ) : null}
        {viewState === 'error' ? (
          <RetryState
            title="Не удалось загрузить избранное"
            description="Попробуйте повторить запрос или открыть раздел позже."
            onRetry={() => {
              setRetryToken((currentValue) => currentValue + 1);
            }}
          />
        ) : null}
        {viewState === 'success' && employees.length === 0 ? (
          <Empty
            type="noData"
            title="Тут пока пусто"
            description={
              activeGroup === null
                ? 'В пользовательских группах пока нет сотрудников.'
                : `В группе «${activeGroup.name}» пока нет сотрудников.`
            }
          />
        ) : null}
        {viewState === 'success' && employees.length > 0 ? (
          <>
            <EmployeeTable
              employees={employees}
              favoriteIds={favoriteIds}
              onToggleFavorite={(employeeId) => {
                ignorePromise(toggleFavorite(employeeId));
              }}
            />
          </>
        ) : null}
        {viewState === 'success' && (hasMore || isLoadMoreFailed) ? (
          <ShowMoreButton
            isLoading={isLoadingMore}
            onClick={() => {
              void loadMore();
            }}
          />
        ) : null}
      </Surface>
    </Page>
  );
};
