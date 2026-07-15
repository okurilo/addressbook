import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { useLocation, useNavigate } from '@reach/router';
import styled, { useTheme } from 'styled-components';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { Empty } from '@pulse/ui/components/Empty/Page';
import { fetchEmployees } from '../../api/directory/client';
import type { Employee } from '../../api/directory/types';
import { EmployeeTable } from '../../components/EmployeeTable';
import { RetryState } from '../../components/RetryState';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { getDepartmentPath } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import { fetchGroups, getVisibleGroups } from '../../api/directory/groups';
import type { GroupNode } from '../../api/directory/groups';

const Page = styled.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}));

const SearchLayout = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '280px minmax(0, 1fr)',
  gap: 32,
  alignItems: 'start',
}));

const Surface = styled.section(({ theme }) => ({
  background: theme.tokens.current.core.layer['01'],
  borderRadius: 20,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const GroupButton = styled.button(({ theme }) => ({
  border: 'none',
  background: 'transparent',
  padding: 0,
  textAlign: 'left',
  cursor: 'pointer',
  color: theme.tokens.current.core.text.secondary,
  lineHeight: 1.45,
}));

const Header = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

const Grid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 24,
}));

const CardButton = styled.button(({ theme }) => ({
  minHeight: 136,
  padding: 32,
  borderRadius: 20,
  border: `1px solid ${theme.tokens.current.core.border.gentle}`,
  background: theme.tokens.current.core.layer['02'],
  display: 'flex',
  alignItems: 'flex-start',
  textAlign: 'left',
  cursor: 'pointer',
}));

const CenteredState = styled.div(({ theme }) => ({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.tokens.current.core.layer['01'],
  borderRadius: 20,
  padding: 32,
}));

type ViewState = 'loading' | 'success' | 'empty' | 'error';

export const StructureRootPage = (_props: RouteComponentProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const query = new URLSearchParams(location.search).get('q') ?? '';
  const [groups, setGroups] = useState<GroupNode[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadData = async (): Promise<void> => {
      setViewState('loading');

      try {
        const root = await fetchGroups(undefined, controller.signal);
        const nextGroups = getVisibleGroups(root);
        const nextEmployees =
          query.trim() === '' ? [] : (await fetchEmployees(query, controller.signal, null)).items;

        if (!isActive) {
          return;
        }

        setGroups(nextGroups);
        setEmployees(nextEmployees);
        setViewState(nextGroups.length === 0 && nextEmployees.length === 0 ? 'empty' : 'success');
      } catch {
        if (isActive && !controller.signal.aborted) {
          setGroups([]);
          setEmployees([]);
          setViewState('error');
        }
      }
    };

    void loadData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [query, retryToken]);

  const openGroup = (groupId: string): void => {
    ignorePromise(navigate(getDepartmentPath(groupId)));
  };

  if (viewState === 'loading') {
    return (
      <CenteredState>
        <Loader />
      </CenteredState>
    );
  }

  if (viewState === 'error') {
    return (
      <RetryState
        title="Не удалось загрузить структуру"
        description="Попробуйте открыть экран позже."
        onRetry={() => {
          setRetryToken((currentValue) => currentValue + 1);
        }}
      />
    );
  }

  if (viewState === 'empty') {
    return (
      <Empty
        type="noData"
        title="Структура пока пуста"
        description="Подразделения и сотрудники не найдены."
      />
    );
  }

  if (query.trim() !== '') {
    return (
      <Page>
        <Header>
          <Text variant="h2Semibold">результаты поиска</Text>
          <Text variant="body2Regular" color={theme.tokens.current.core.text.secondary}>
            по запросу: {query}
          </Text>
        </Header>
        <SearchLayout>
          <Surface aria-label="Подразделения">
            <Text variant="body1Semibold">кадровая структура</Text>
            {groups.map((group) => (
              <GroupButton key={group.id} type="button" onClick={() => openGroup(group.id)}>
                {group.name}
              </GroupButton>
            ))}
          </Surface>
          <Surface>
            {employees.length === 0 ? (
              <Empty
                type="noResults"
                title="Сотрудники не найдены"
                description="Попробуйте изменить поисковый запрос."
              />
            ) : (
              <EmployeeTable
                employees={employees}
                favoriteIds={favoriteIds}
                onToggleFavorite={(employeeId) => {
                  ignorePromise(toggleFavorite(employeeId));
                }}
              />
            )}
          </Surface>
        </SearchLayout>
      </Page>
    );
  }

  return (
    <Page>
      <Header>
        <Text variant="h2Semibold">Кадровая структура</Text>
        <Text variant="body1Regular" color={theme.tokens.current.core.text.secondary}>
          Организационно-штатная структура Банка
        </Text>
      </Header>
      <Grid>
        {groups.map((group) => (
          <CardButton key={group.id} type="button" onClick={() => openGroup(group.id)}>
            <Text variant="body1Semibold">{group.name}</Text>
          </CardButton>
        ))}
      </Grid>
    </Page>
  );
};

