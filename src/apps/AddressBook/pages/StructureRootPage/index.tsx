import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from '@reach/router';
import type { RouteComponentProps } from '@reach/router';
import styled, { useTheme } from 'styled-components';
import { Empty } from '@pulse/ui/components/Empty';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { fetchStructureEmployees } from '../../api/directory/client';
import { getGroupHierarchy } from '../../api/directory/groupHierarchy';
import type { GroupHierarchy } from '../../api/directory/groupHierarchy';
import type { Employee } from '../../api/directory/types';
import { EmployeeTable } from '../../components/EmployeeTable';
import { RetryState } from '../../components/RetryState';
import { useDebouncedValue } from '../../components/useDebouncedValue';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { ignorePromise } from '../../utils/ignorePromise';
import { getDepartmentPath } from '../../routes/routePaths';

type StructureRootPageProps = RouteComponentProps & {
  departmentId?: string;
};

const Page = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

const Header = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const SummaryLine = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: 4,
  color: theme.tokens.current.core.text.secondary,
}));

const Surface = styled.div(({ theme }) => ({
  padding: 32,
  borderRadius: 20,
  background: theme.tokens.current.core.background.default,
}));

const CenteredState = styled.div({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 32,
});

const SearchResultsLayout = styled.div({
  display: 'grid',
  gridTemplateColumns: '260px minmax(0, 1fr)',
  gap: 32,
  alignItems: 'start',
});

const StructureList = styled.aside(({ theme }) => ({
  padding: 24,
  borderRadius: 20,
  background: theme.tokens.current.core.background.default,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const StructureItem = styled.div(({ theme }) => ({
  paddingTop: 12,
  borderTop: `1px solid ${theme.tokens.current.core.border.gentle}`,
  color: theme.tokens.current.core.text.secondary,
  '&:first-of-type': {
    paddingTop: 0,
    borderTop: 'none',
  },
}));

const StructureButton = styled.button<{ $active?: boolean }>(({ theme, $active = false }) => ({
  border: 'none',
  background: 'transparent',
  padding: 0,
  textAlign: 'left',
  cursor: 'pointer',
  color: $active
    ? theme.tokens.current.core.text.primary
    : theme.tokens.current.core.text.secondary,
  ...($active ? theme.typography.body2Semibold : theme.typography.body2Regular),
  '&:disabled': {
    cursor: 'default',
    color: theme.tokens.current.core.text.tertiary,
  },
}));

type ViewState = 'loading' | 'success' | 'empty' | 'error';

export const StructureRootPage = ({ departmentId }: StructureRootPageProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavoriteEmployees();
  const query = new URLSearchParams(location.search).get('q') ?? '';
  const debouncedQuery = useDebouncedValue(query, 280);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupHierarchy | null>(null);
  const [childGroups, setChildGroups] = useState<GroupHierarchy[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);
  const isSearchMode = query.trim() !== '';

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadEmployees = async (): Promise<void> => {
      setViewState('loading');

      try {
        if (isSearchMode) {
          const response = await fetchStructureEmployees(debouncedQuery, controller.signal);

          if (!isActive) {
            return;
          }

          setSelectedGroup(null);
          setChildGroups([]);
          setEmployees(response.items);
          setTotalEmployees(response.total);
          setViewState(response.items.length === 0 ? 'empty' : 'success');
          return;
        }

        const group = await getGroupHierarchy(departmentId, controller.signal);
        const [children, response] = await Promise.all([
          Promise.all(
            group.children.map((childId) => getGroupHierarchy(childId, controller.signal))
          ),
          fetchStructureEmployees('', controller.signal, group.id),
        ]);

        if (!isActive) {
          return;
        }

        setSelectedGroup(group);
        setChildGroups(children);
        setEmployees(response.items);
        setTotalEmployees(response.total);
        setViewState(response.items.length === 0 ? 'empty' : 'success');
      } catch {
        if (!isActive) {
          return;
        }

        setEmployees([]);
        setSelectedGroup(null);
        setChildGroups([]);
        setTotalEmployees(0);
        setViewState('error');
      }
    };

    void loadEmployees();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [debouncedQuery, departmentId, isSearchMode, retryToken]);

  const resultStructures = Array.from(
    employees.reduce<Map<string, string>>((structures, employee) => {
      const structureName = employee.departmentName || employee.shortStructure;

      if (structureName !== '') {
        structures.set(employee.departmentId || structureName, structureName);
      }

      return structures;
    }, new Map<string, string>())
  );

  const resultsSurface = (
    <Surface>
      {viewState === 'loading' ? (
        <CenteredState>
          <Loader />
        </CenteredState>
      ) : null}

      {viewState === 'error' ? (
        <RetryState
          title="Не удалось загрузить сотрудников"
          description="Попробуйте повторить запрос или открыть экран позже."
          onRetry={() => {
            setRetryToken((currentValue) => currentValue + 1);
          }}
        />
      ) : null}

      {viewState === 'empty' ? (
        <Empty
          type={isSearchMode ? 'noResults' : 'noData'}
          title="Сотрудники не найдены"
          description={
            isSearchMode
              ? 'Попробуйте уточнить поисковый запрос.'
              : 'В выбранной структуре сотрудники отсутствуют.'
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
  );

  const openGroup = (groupId: string): void => {
    ignorePromise(navigate(getDepartmentPath(groupId)));
  };

  return (
    <Page>
      <Header>
        <Text variant="h2Semibold">
          {isSearchMode ? 'Результаты поиска' : 'Кадровая структура'}
        </Text>
        {isSearchMode ? (
          <Text variant="body1Regular" color={theme.tokens.current.core.text.secondary}>
            Найдено {totalEmployees} результатов по запросу «{query}»
          </Text>
        ) : (
          <>
            <Text variant="body1Regular" color={theme.tokens.current.core.text.secondary}>
              {selectedGroup?.name ?? 'Сотрудники организационной структуры'}
            </Text>
            <SummaryLine>
              <Text variant="body1Regular" color={theme.tokens.current.core.text.secondary}>
                В структуре
              </Text>
              <Text variant="body1Semibold">{totalEmployees}</Text>
              <Text variant="body1Regular" color={theme.tokens.current.core.text.secondary}>
                сотрудников
              </Text>
            </SummaryLine>
          </>
        )}
      </Header>

      {isSearchMode ? (
        <SearchResultsLayout>
          <StructureList>
            <Text variant="body1Semibold">Структуры в результатах</Text>
            {resultStructures.length === 0 ? (
              <Text variant="body2Regular" color={theme.tokens.current.core.text.tertiary}>
                Структуры не найдены
              </Text>
            ) : (
              resultStructures.map(([structureId, structureName]) => (
                <StructureItem key={structureId}>
                  <Text variant="body2Regular">{structureName}</Text>
                </StructureItem>
              ))
            )}
          </StructureList>
          {resultsSurface}
        </SearchResultsLayout>
      ) : (
        <SearchResultsLayout>
          <StructureList>
            <StructureButton
              type="button"
              disabled={selectedGroup === null || selectedGroup.parentTree === ''}
              onClick={() => {
                if (selectedGroup === null || selectedGroup.parentTree === '') {
                  return;
                }

                openGroup(selectedGroup.parentTree);
              }}
            >
              ↑ Наверх
            </StructureButton>
            {selectedGroup !== null ? (
              <StructureButton type="button" $active disabled>
                {selectedGroup.name}
              </StructureButton>
            ) : null}
            {childGroups.map((group) => (
              <StructureButton
                key={group.id}
                type="button"
                onClick={() => {
                  openGroup(group.id);
                }}
              >
                {group.name}
              </StructureButton>
            ))}
            {selectedGroup !== null && childGroups.length === 0 ? (
              <Text variant="body2Regular" color={theme.tokens.current.core.text.tertiary}>
                Дочерних структур нет
              </Text>
            ) : null}
          </StructureList>
          {resultsSurface}
        </SearchResultsLayout>
      )}
    </Page>
  );
};
