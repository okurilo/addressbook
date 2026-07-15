import { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import type { RouteComponentProps } from '@reach/router';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { Empty } from '@pulse/ui/components/Empty';
import { fetchFavoriteEmployees } from '../../api/directory/client';
import type { Employee } from '../../api/directory/types';
import { EmployeeTable } from '../../components/EmployeeTable';
import { RetryState } from '../../components/RetryState';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { ignorePromise } from '../../utils/ignorePromise';
import { Page, Header, FilterChip, Surface, CenteredState } from './styled';

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
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const query = new URLSearchParams(location.search).get('q') ?? '';
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadFavorites = async (): Promise<void> => {
      setViewState('loading');

      try {
        const nextEmployees = await fetchFavoriteEmployees();

        if (!isActive) {
          return;
        }

        const filteredEmployees = nextEmployees.filter((employee) => matchesQuery(employee, query));

        setEmployees(filteredEmployees);
        setViewState(filteredEmployees.length === 0 ? 'empty' : 'success');
      } catch {
        if (!isActive) {
          return;
        }

        setEmployees([]);
        setViewState('error');
      }
    };

    void loadFavorites();

    return () => {
      isActive = false;
    };
  }, [favoriteIds, query, retryToken]);

  return (
    <Page>
      <Header>
        <Text variant="h2Semibold">Избранное</Text>
        <FilterChip>Все</FilterChip>
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
        {viewState === 'empty' ? (
          <Empty
            type={query.trim() === '' ? 'noData' : 'noResults'}
            title={query.trim() === '' ? 'Тут пока пусто' : 'Ничего не найдено'}
            description={
              query.trim() === ''
                ? 'Добавляйте полезные контакты в избранное'
                : 'В избранном нет сотрудников, подходящих под глобальный фильтр.'
            }
          />
        ) : null}
        {viewState === 'success' ? (
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
