import { useEffect, useState } from 'react';
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

export const FavoritesPage = (_props: RouteComponentProps): JSX.Element => {
  const { favoriteIds, toggleFavorite, isReady } = useFavoriteEmployees();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;

    if (!isReady) {
      setViewState('loading');
      return undefined;
    }

    const loadFavorites = async (): Promise<void> => {
      setViewState('loading');

      try {
        const nextEmployees = await fetchFavoriteEmployees();

        if (!isActive) {
          return;
        }

        setEmployees(nextEmployees);
        setViewState(nextEmployees.length === 0 ? 'empty' : 'success');
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
  }, [favoriteIds, isReady, retryToken]);

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
            description="Попробуйте переключить mock-сценарий или открыть страницу позже."
            onRetry={() => {
              setRetryToken((currentValue) => currentValue + 1);
            }}
          />
        ) : null}
        {viewState === 'empty' ? (
          <Empty
            type="noData"
            title="Тут пока пусто"
            description="Добавляйте полезные контакты в избранное"
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
