import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { EmptyState } from '@pulse/ui/components/EmptyState';
import { fetchEmployees, fetchRecentEmployees } from '../../api/directory/client';
import type { Employee } from '../../api/directory/types';
import { EmployeeTable } from '../../components/EmployeeTable';
import { RetryState } from '../../components/RetryState';
import { useDebouncedValue } from '../../components/useDebouncedValue';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { useLocation } from '@reach/router';
import { ignorePromise } from '../../utils/ignorePromise';
import { Section, SectionHeader, Surface, CenteredState } from './styled';

type ViewState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export const ContactsPage = (_props: RouteComponentProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const query = new URLSearchParams(location.search).get('q') ?? '';
  const debouncedQuery = useDebouncedValue(query, 280);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewState, setViewState] = useState<ViewState>('idle');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadData = async (): Promise<void> => {
      setViewState('loading');

      try {
        const nextEmployees =
          debouncedQuery.trim() === ''
            ? await fetchRecentEmployees()
            : (await fetchEmployees(debouncedQuery, controller.signal)).items;

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

    void loadData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [debouncedQuery, retryToken]);

  const title = query.trim() === '' ? 'недавние' : 'результаты поиска';

  return (
    <Section>
      <SectionHeader>
        <Text variant="h2Semibold">{title}</Text>
        {query.trim() === '' ? null : (
          <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
            по запросу: {query}
          </Text>
        )}
      </SectionHeader>
      <Surface>
        {viewState === 'loading' || viewState === 'idle' ? (
          <CenteredState>
            <Loader />
          </CenteredState>
        ) : null}
        {viewState === 'error' ? (
          <RetryState
            title="Не удалось загрузить сотрудников"
            description="Попробуйте изменить запрос или переключить mock-сценарий."
            onRetry={() => {
              setRetryToken((currentValue) => currentValue + 1);
            }}
          />
        ) : null}
        {viewState === 'empty' ? (
          <EmptyState
            title="Ничего не найдено"
            description={
              query.trim() === ''
                ? 'Для текущего сценария недавние контакты отсутствуют.'
                : 'Попробуйте уточнить фамилию, должность или подразделение.'
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
    </Section>
  );
};
