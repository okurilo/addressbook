import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { styled } from 'styled-components';
import { EmptyState } from '@pulse/ui/EmptyState';
import { Spinner } from '@pulse/ui/Spinner';
import { Text } from '@pulse/ui/Text';
import { fetchEmployees, fetchRecentEmployees } from '../api/directory/client';
import type { Employee } from '../api/directory/types';
import { EmployeeTable } from '../components/EmployeeTable';
import { RetryState } from '../components/RetryState';
import { useDebouncedValue } from '../components/useDebouncedValue';
import { useFavoriteEmployees } from '../components/useFavoriteEmployees';
import { useAppLocation, useAppNavigate } from '../routes/appRouter';
import { ignorePromise } from '../utils/ignorePromise';

const Section = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.lg,
}));

const SectionHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing.md,
}));

const Surface = styled('div')(({ theme }) => ({
  background: theme.colors.surface,
  borderRadius: theme.radius.lg,
}));

const CenteredState = styled('div')(({ theme }) => ({
  minHeight: 220,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing.xl,
}));

type ViewState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export const ContactsPage = (_props: RouteComponentProps): JSX.Element => {
  const location = useAppLocation();
  const navigate = useAppNavigate();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const query = new URLSearchParams(location.search).get('q') ?? '';
  const debouncedQuery = useDebouncedValue(query, 280);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewState, setViewState] = useState<ViewState>('idle');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadData = async (): Promise<void> => {
      setViewState('loading');

      try {
        const nextEmployees =
          debouncedQuery.trim() === ''
            ? await fetchRecentEmployees()
            : (await fetchEmployees(debouncedQuery)).items;

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
    };
  }, [debouncedQuery, retryToken]);

  const title = query.trim() === '' ? 'Недавние' : 'Результаты поиска';

  return (
    <Section>
      <SectionHeader>
        <Text as="h2" size="lg" weight="semibold">
          {title}
        </Text>
        {query.trim() === '' ? null : <Text tone="secondary">По запросу: {query}</Text>}
      </SectionHeader>
      <Surface>
        {viewState === 'loading' || viewState === 'idle' ? (
          <CenteredState>
            <Spinner />
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
            onOpenEmployee={(employee) => {
              ignorePromise(navigate(`/employee/${employee.id}${location.search}`));
            }}
          />
        ) : null}
      </Surface>
    </Section>
  );
};
