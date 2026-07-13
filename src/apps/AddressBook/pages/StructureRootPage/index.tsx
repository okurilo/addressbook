import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import styled, { useTheme } from 'styled-components';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { Empty } from '@pulse/ui/components/Empty';
import { fetchRootDepartments } from '../../api/directory/departmentsClient';
import type { DepartmentSummary } from '../../api/directory/departments';
import { RetryState } from '../../components/RetryState';
import { useNavigate } from '@reach/router';
import { getDepartmentPath } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';

const Page = styled.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}));

const Header = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

const SummaryLine = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: 4,
  color: theme.tokens.current.text.secondary,
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
  border: `1px solid ${theme.tokens.current.border.gentle}`,
  background: '#edf1ed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  textAlign: 'left',
  cursor: 'pointer',
}));

const CenteredState = styled.div(({ theme }) => ({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.tokens.current.background.default,
  borderRadius: 20,
  padding: 32,
}));

type ViewState = 'loading' | 'success' | 'empty' | 'error';

export const StructureRootPage = (_props: RouteComponentProps): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [items, setItems] = useState<DepartmentSummary[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadDepartments = async (): Promise<void> => {
      setViewState('loading');

      try {
        const response = await fetchRootDepartments();

        if (!isActive) {
          return;
        }

        setItems(response.items);
        setTotalEmployees(response.totalEmployees);
        setViewState(response.items.length === 0 ? 'empty' : 'success');
      } catch {
        if (!isActive) {
          return;
        }

        setItems([]);
        setTotalEmployees(0);
        setViewState('error');
      }
    };

    void loadDepartments();

    return () => {
      isActive = false;
    };
  }, [retryToken]);

  return (
    <Page>
      <Header>
        <Text variant="h2Semibold">Кадровая структура</Text>
        <Text variant="body1Regular" color={theme.tokens.current.text.secondary}>
          Организационно-штатная структура Банка
        </Text>
        <SummaryLine>
          <Text variant="body1Regular" color={theme.tokens.current.text.secondary}>
            В структуре
          </Text>
          <Text variant="body1Semibold">{totalEmployees}</Text>
          <Text variant="body1Regular" color={theme.tokens.current.text.secondary}>
            сотрудников
          </Text>
        </SummaryLine>
      </Header>

      {viewState === 'loading' ? (
        <CenteredState>
          <Loader />
        </CenteredState>
      ) : null}

      {viewState === 'error' ? (
        <RetryState
          title="Не удалось загрузить структуру"
          description="Попробуйте переключить mock-сценарий или открыть экран позже."
          onRetry={() => {
            setRetryToken((currentValue) => currentValue + 1);
          }}
        />
      ) : null}

      {viewState === 'empty' ? (
        <Empty
          type="noData"
          title="Структура пока пуста"
          description="Для текущего mock-сценария крупные подразделения не найдены."
        />
      ) : null}

      {viewState === 'success' ? (
        <Grid>
          {items.map((department) => (
            <CardButton
              key={department.id}
              type="button"
              onClick={() => {
                ignorePromise(
                  navigate(getDepartmentPath(department.id))
                );
              }}
            >
              <Text variant="body1Semibold">{department.name}</Text>
              <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
                {department.employeeCount} сотрудников
              </Text>
            </CardButton>
          ))}
        </Grid>
      ) : null}
    </Page>
  );
};
