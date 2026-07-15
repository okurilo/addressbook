import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { Empty } from '@pulse/ui/components/Empty/Page';
import { useLocation } from '@reach/router';
import { fetchEmployees } from '../../api/directory/client';
import type { Employee } from '../../api/directory/types';
import { getSearchHistory, selectSearchHistory } from '../../api/history/history';
import { EmployeeTable } from '../../components/EmployeeTable';
import { RetryState } from '../../components/RetryState';
import { useDebouncedValue } from '../../components/useDebouncedValue';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { ignorePromise } from '../../utils/ignorePromise';
import { Section, SectionHeader, Surface, CenteredState } from './styled';

type ViewState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export const ContactsPage = (_props: RouteComponentProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const query = new URLSearchParams(location.search).get('q') ?? '';
  const debouncedQuery = useDebouncedValue(query, 500);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [historyIdsByEmployeeId, setHistoryIdsByEmployeeId] = useState<Record<string, string>>({});
  const [viewState, setViewState] = useState<ViewState>('idle');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadData = async (): Promise<void> => {
      setViewState('loading');

      try {
        if (debouncedQuery.trim() === '') {
          const nextHistoryItems = await getSearchHistory({ signal: controller.signal });
          const employeeResults = await Promise.allSettled(
            nextHistoryItems.map(async (historyItem) => {
              const response = await fetchEmployees(historyItem.text, controller.signal);
              const employee = response.items.find((item) => item.id === historyItem.key.id);

              return employee === undefined ? null : { employee, historyId: historyItem.id };
            })
          );

          if (!isActive) {
            return;
          }

          const recentEmployeesById = new Map<string, Employee>();
          const nextHistoryIdsByEmployeeId: Record<string, string> = {};

          employeeResults.forEach((result) => {
            if (result.status !== 'fulfilled' || result.value === null) {
              return;
            }

            const { employee, historyId } = result.value;

            if (!recentEmployeesById.has(employee.id)) {
              recentEmployeesById.set(employee.id, employee);
              nextHistoryIdsByEmployeeId[employee.id] = historyId;
            }
          });

          const nextEmployees = Array.from(recentEmployeesById.values());
          setEmployees(nextEmployees);
          setHistoryIdsByEmployeeId(nextHistoryIdsByEmployeeId);
          setViewState(nextEmployees.length === 0 ? 'empty' : 'success');
          return;
        }

        const nextEmployees = (await fetchEmployees(debouncedQuery, controller.signal)).items;

        if (!isActive) {
          return;
        }

        setEmployees(nextEmployees);
        setHistoryIdsByEmployeeId({});
        setViewState(nextEmployees.length === 0 ? 'empty' : 'success');
      } catch {
        if (!isActive) {
          return;
        }

        setEmployees([]);
        setHistoryIdsByEmployeeId({});
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
  const isHistoryMode = query.trim() === '';

  return (
    <Section>
      <SectionHeader>
        <Text variant="h2Semibold">{title}</Text>
        {query.trim() === '' ? null : (
          <Text variant="body2Regular" color={theme.tokens.current.core.text.secondary}>
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
            title={
              isHistoryMode ? 'Не удалось загрузить недавние' : 'Не удалось загрузить сотрудников'
            }
            description="Попробуйте повторить запрос или открыть раздел позже."
            onRetry={() => {
              setRetryToken((currentValue) => currentValue + 1);
            }}
          />
        ) : null}
        {viewState === 'empty' ? (
          <Empty
            type={query.trim() === '' ? 'noData' : 'noResults'}
            title="Ничего не найдено"
            description={
              query.trim() === ''
                ? 'История поиска пока пуста.'
                : 'Попробуйте уточнить фамилию, должность или подразделение.'
            }
          />
        ) : null}
        {viewState === 'success' ? (
          <EmployeeTable
            employees={employees}
            favoriteIds={favoriteIds}
            onEmployeeOpen={
              isHistoryMode
                ? (employeeId) => {
                    const historyId = historyIdsByEmployeeId[employeeId];

                    if (historyId !== undefined) {
                      ignorePromise(selectSearchHistory(historyId));
                    }
                  }
                : undefined
            }
            onToggleFavorite={(employeeId) => {
              ignorePromise(toggleFavorite(employeeId));
            }}
          />
        ) : null}
      </Surface>
    </Section>
  );
};
