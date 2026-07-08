import { ThemeProvider, styled } from 'styled-components';
import { routePaths } from './routes/routePaths';
import { theme } from './theme';
import { GlobalStyles } from './styles/globalStyles';
import { AppShell } from './components/AppShell';
import { DirectoryLayout } from './components/DirectoryLayout';
import { ProductViewport } from './components/ProductViewport';
import { MockScenarioPanel } from './components/MockScenarioPanel';
import { FavoriteEmployeesProvider } from './components/useFavoriteEmployees';
import { ContactsPage } from './pages/ContactsPage';
import { EmployeePage } from './pages/EmployeePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ReferencePhonesPage } from './pages/ReferencePhonesPage';
import { StructureDepartmentPage } from './pages/StructureDepartmentPage';
import { StructureRootPage } from './pages/StructureRootPage';
import { AppRouterProvider, useAppLocation } from './routes/appRouter';

const RouterContainer = styled('div')({
  minHeight: '100%',
});

const renderRoute = (pathname: string): JSX.Element => {
  if (pathname === routePaths.contacts) {
    return <ContactsPage />;
  }

  if (pathname === routePaths.favorites) {
    return <FavoritesPage />;
  }

  if (pathname === routePaths.structure) {
    return <StructureRootPage />;
  }

  if (pathname === routePaths.referencePhones) {
    return <ReferencePhonesPage />;
  }

  const employeeMatch = pathname.match(/^\/employee\/([^/]+)$/);

  if (employeeMatch !== null) {
    return <EmployeePage employeeId={decodeURIComponent(employeeMatch[1])} />;
  }

  const structureMatch = pathname.match(/^\/structure\/([^/]+)$/);

  if (structureMatch !== null) {
    return <StructureDepartmentPage departmentId={decodeURIComponent(structureMatch[1])} />;
  }

  return <ContactsPage />;
};

const AppRoutes = (): JSX.Element => {
  const location = useAppLocation();

  return (
    <DirectoryLayout>
      <RouterContainer>{renderRoute(location.pathname)}</RouterContainer>
    </DirectoryLayout>
  );
};

export const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <AppRouterProvider>
      <FavoriteEmployeesProvider>
        <AppShell>
          <MockScenarioPanel />
          <ProductViewport>
            <AppRoutes />
          </ProductViewport>
        </AppShell>
      </FavoriteEmployeesProvider>
    </AppRouterProvider>
  </ThemeProvider>
);
