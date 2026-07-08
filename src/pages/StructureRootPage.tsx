import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { useNavigate } from '@reach/router';
import { styled } from 'styled-components';
import { EmptyState } from '@pulse/ui/EmptyState';
import { Spinner } from '@pulse/ui/Spinner';
import { Text } from '@pulse/ui/Text';
import { fetchRootDepartments } from '../api/directory/departmentsClient';
import type { DepartmentSummary } from '../api/directory/departments';

const Page = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xl,
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
}));

const SummaryLine = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: theme.spacing.xs,
  color: theme.colors.textSecondary,
}));

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: theme.spacing.lg,
}));

const CardButton = styled('button')(({ theme }) => ({
  minHeight: 136,
  padding: theme.spacing.xl,
  borderRadius: theme.radius.lg,
  border: `1px solid ${theme.colors.border}`,
  background: '#edf1ed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  textAlign: 'left',
  cursor: 'pointer',
}));

const CenteredState = styled('div')(({ theme }) => ({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.colors.surface,
  borderRadius: theme.radius.lg,
  padding: theme.spacing.xl,
}));

type ViewState = 'loading' | 'success' | 'empty' | 'error';

export const StructureRootPage = (_props: RouteComponentProps): JSX.Element => {
  const navigate = useNavigate();
  const [items, setItems] = useState<DepartmentSummary[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [viewState, setViewState] = useState<ViewState>('loading');

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
  }, []);

  return (
    <Page>
      <Header>
        <Text as="h2" size="lg" weight="semibold">
          Кадровая структура
        </Text>
        <Text tone="secondary">Организационно-штатная структура Банка</Text>
        <SummaryLine>
          <Text tone="secondary">В структуре</Text>
          <Text as="span" weight="semibold">
            {totalEmployees}
          </Text>
          <Text tone="secondary">сотрудников</Text>
        </SummaryLine>
      </Header>

      {viewState === 'loading' ? (
        <CenteredState>
          <Spinner />
        </CenteredState>
      ) : null}

      {viewState === 'error' ? (
        <EmptyState
          title="Не удалось загрузить структуру"
          description="Попробуйте переключить mock-сценарий или открыть экран позже."
        />
      ) : null}

      {viewState === 'empty' ? (
        <EmptyState
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
                void navigate(`/structure/${department.id}`);
              }}
            >
              <Text size="lg" weight="semibold">
                {department.name}
              </Text>
              <Text tone="secondary">{department.employeeCount} сотрудников</Text>
            </CardButton>
          ))}
        </Grid>
      ) : null}
    </Page>
  );
};
