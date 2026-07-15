import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from '@reach/router';
import type { RouteComponentProps } from '@reach/router';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { Empty } from '@pulse/ui/components/Empty/Page';
import { fetchCustomPeopleGroups } from '../../api/directory/client';
import type { CustomPeopleGroup } from '../../api/directory/favorites';
import type { Employee } from '../../api/directory/types';
import { EmployeeTable } from '../../components/EmployeeTable';
import { RetryState } from '../../components/RetryState';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import { Page, Header, GroupTabs, GroupTab, Surface, CenteredState } from './styled';

type ViewState = 'loading' | 'success' | 'empty' | 'error';

const matchesQuery = (employee: Employee, query: string): boolean => {
  const normalizedQuery = query.trim().toLocaleLowerCase('ru');

  if (normalizedQuery === '') {
    return true;
  }

  return [
    employee.fullName,
    employee.position,
    employee.departmentName,
    employee.shortStructure,
    employee.subtitle,
  ].some((value) => value.toLocaleLowerCase('ru').includes(normalizedQuery));
};

export const FavoritesPage = (_props: RouteComponentProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') ?? '';
  const groupIdFromUrl = searchParams.get('groupId') ?? 'all';
  const [groups, setGroups] = useState<CustomPeopleGroup[]>([]);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);

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
  const employees = sourceEmployees.filter((employee) => matchesQuery(employee, query));

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
  }, [favoriteIds, retryToken]);

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
            type={query.trim() === '' ? 'noData' : 'noResults'}
            title={query.trim() === '' ? 'Тут пока пусто' : 'Ничего не найдено'}
            description={
              query.trim() === ''
                ? activeGroup === null
                  ? 'В пользовательских группах пока нет сотрудников.'
                  : `В группе «${activeGroup.name}» пока нет сотрудников.`
                : 'В выбранных группах нет сотрудников, подходящих под глобальный фильтр.'
            }
          />
        ) : null}
        {viewState === 'success' && employees.length > 0 ? (
          <EmployeeTable
            employees={employees}
            favoriteIds={favoriteIds}
            onToggleFavorite={(employeeId) => {
              ignorePromise(toggleFavorite(employeeId));
            }}
          />
        ) : null}
      </Surface>
    </Page>
  );
};
