import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { Empty } from '@pulse/ui/components/Empty';
import { fetchEmployees } from '../../api/directory/client';
import type { Employee } from '../../api/directory/types';
import { getSearchHistory, selectSearchHistory } from '../../api/history/history';
import { SearchContextEnum } from '../../api/history/types';
import type { SearchHistoryItem, SearchHistoryPath } from '../../api/history/types';
import { EmployeeTable } from '../../components/EmployeeTable';
import { RetryState } from '../../components/RetryState';
import { useDebouncedValue } from '../../components/useDebouncedValue';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { useLocation, useNavigate } from '@reach/router';
import { getEmployeePath, routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import {
  Section,
  SectionHeader,
  Surface,
  CenteredState,
  HistoryList,
  HistoryItemButton,
} from './styled';

type ViewState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

const personHistoryContexts: SearchHistoryPath[] = [
  SearchContextEnum.persons,
  SearchContextEnum.employee,
  SearchContextEnum.sberpeople,
];

const isPersonHistoryContext = (context: SearchHistoryPath): boolean =>
  personHistoryContexts.includes(context);

export const ContactsPage = (_props: RouteComponentProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const query = new URLSearchParams(location.search).get('q') ?? '';
  const debouncedQuery = useDebouncedValue(query, 500);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [historyItems, setHistoryItems] = useState<SearchHistoryItem[]>([]);
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

          if (!isActive) {
            return;
          }

          setEmployees([]);
          setHistoryItems(nextHistoryItems);
          setViewState(nextHistoryItems.length === 0 ? 'empty' : 'success');
          return;
        }

        const nextEmployees = (await fetchEmployees(debouncedQuery, controller.signal)).items;

        if (!isActive) {
          return;
        }

        setEmployees(nextEmployees);
        setHistoryItems([]);
        setViewState(nextEmployees.length === 0 ? 'empty' : 'success');
      } catch {
        if (!isActive) {
          return;
        }

        setEmployees([]);
        setHistoryItems([]);
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

  const openHistoryItem = async (item: SearchHistoryItem): Promise<void> => {
    await selectSearchHistory(item.id);

    if (!isPersonHistoryContext(item.key.context)) {
      await navigate(routePaths.contacts);
      return;
    }

    const response = await fetchEmployees(item.text);
    const employee = response.items.find((itemEmployee) => itemEmployee.id === item.key.id);

    if (employee === undefined) {
      await navigate(routePaths.contacts);
      return;
    }

    await navigate(getEmployeePath(employee.id), { state: { employee } });
  };

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
            title={isHistoryMode ? 'Не удалось загрузить недавние' : 'Не удалось загрузить сотрудников'}
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
        {viewState === 'success' && isHistoryMode ? (
          <HistoryList>
            {historyItems.map((item) => (
              <HistoryItemButton
                key={item.id}
                type="button"
                onClick={() => {
                  ignorePromise(openHistoryItem(item));
                }}
              >
                <Text variant="body1Semibold">{item.text}</Text>
                <Text variant="caption1Regular" color={theme.tokens.current.core.text.secondary}>
                  {isPersonHistoryContext(item.key.context)
                    ? 'Недавний контакт'
                    : 'Недавний запрос'}
                </Text>
              </HistoryItemButton>
            ))}
          </HistoryList>
        ) : null}
        {viewState === 'success' && !isHistoryMode ? (
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
