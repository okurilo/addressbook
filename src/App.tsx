import { LocationProvider, Router } from '@reach/router';
import { ThemeProvider, styled } from 'styled-components';
import { routePaths } from './routes/routePaths';
import { theme } from './theme';
import { GlobalStyles } from './styles/globalStyles';
import { AppShell } from './components/AppShell';
import { DirectoryLayout } from './components/DirectoryLayout';
import { ProductViewport } from './components/ProductViewport';
import { MockScenarioPanel } from './components/MockScenarioPanel';
import { ContactsPage } from './pages/ContactsPage';
import { EmployeePage } from './pages/EmployeePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ReferencePhonesPage } from './pages/ReferencePhonesPage';
import { StructureDepartmentPage } from './pages/StructureDepartmentPage';
import { StructureRootPage } from './pages/StructureRootPage';

const RouterContainer = styled('div')({
  minHeight: '100%',
});

export const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <LocationProvider>
      <AppShell>
        <MockScenarioPanel />
        <ProductViewport>
          <DirectoryLayout>
            <RouterContainer>
              <Router primary={false}>
                <ContactsPage path={routePaths.contacts} />
                <EmployeePage path={routePaths.employee} />
                <StructureRootPage path={routePaths.structure} />
                <StructureDepartmentPage path={routePaths.structureDepartment} />
                <ReferencePhonesPage path={routePaths.referencePhones} />
                <FavoritesPage path={routePaths.favorites} />
              </Router>
            </RouterContainer>
          </DirectoryLayout>
        </ProductViewport>
      </AppShell>
    </LocationProvider>
  </ThemeProvider>
);
