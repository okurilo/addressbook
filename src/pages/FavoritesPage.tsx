import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { useLocation, useNavigate } from '@reach/router';
import { styled } from 'styled-components';
import { EmptyState } from '@pulse/ui/EmptyState';
import { Spinner } from '@pulse/ui/Spinner';
import { Text } from '@pulse/ui/Text';
import { fetchFavoriteEmployees } from '../api/directory/client';
import type { Employee } from '../api/directory/types';
import { EmployeeTable } from '../components/EmployeeTable';
import { useFavoriteEmployees } from '../components/useFavoriteEmployees';

const Page = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.lg,
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.md,
}));

const FilterChip = styled('div')(({ theme }) => ({
  minHeight: 32,
  width: 'fit-content',
  padding: `0 ${theme.spacing.md}px`,
  borderRadius: theme.radius.pill,
  background: theme.colors.accentSoft,
  color: theme.colors.accent,
  display: 'inline-flex',
  alignItems: 'center',
  fontWeight: 600,
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

const EmptyIllustration = styled('div')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.radius.lg,
  background:
    'linear-gradient(135deg, rgba(31,143,88,0.08) 0%, rgba(31,143,88,0.18) 100%)',
  display: 'grid',
  placeItems: 'center',
  color: theme.colors.accent,
  fontSize: 42,
  fontWeight: 700,
}));

type ViewState = 'loading' | 'success' | 'empty' | 'error';

export const FavoritesPage = (_props: RouteComponentProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite, isReady } = useFavoriteEmployees();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewState, setViewState] = useState<ViewState>('loading');

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
  }, [favoriteIds, isReady]);

  return (
    <Page>
      <Header>
        <Text as="h2" size="lg" weight="semibold">
          Избранное
        </Text>
        <FilterChip>Все</FilterChip>
      </Header>
      <Surface>
        {viewState === 'loading' ? (
          <CenteredState>
            <Spinner />
          </CenteredState>
        ) : null}
        {viewState === 'error' ? (
          <EmptyState
            title="Не удалось загрузить избранное"
            description="Попробуйте переключить mock-сценарий или открыть страницу позже."
          />
        ) : null}
        {viewState === 'empty' ? (
          <EmptyState
            illustration={<EmptyIllustration>★</EmptyIllustration>}
            title="Тут пока пусто"
            description="Добавляйте полезные контакты в избранное"
          />
        ) : null}
        {viewState === 'success' ? (
          <EmployeeTable
            employees={employees}
            favoriteIds={favoriteIds}
            onToggleFavorite={(employeeId) => {
              void toggleFavorite(employeeId);
            }}
            onOpenEmployee={(employee) => {
              void navigate(`/employee/${employee.id}${location.search}`);
            }}
          />
        ) : null}
      </Surface>
    </Page>
  );
};
