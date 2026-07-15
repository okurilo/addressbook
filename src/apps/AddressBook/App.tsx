import { LocationProvider, Redirect, Router } from '@reach/router';
import { GlobalStyles } from './styles/globalStyles';
import { RouterContainer } from './styled';
import { DirectoryLayout } from './components/DirectoryLayout';
import { FavoriteEmployeesProvider } from './components/useFavoriteEmployees';
import { ContactsPage } from './pages/ContactsPage';
import { EmployeePage } from './pages/EmployeePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ReferencePhonesPage } from './pages/ReferencePhonesPage';
import { StructureDepartmentPage } from './pages/StructureDepartmentPage';
import { StructureRootPage } from './pages/StructureRootPage';
import { routePaths } from './routes/routePaths';

export const App = (): JSX.Element => (
  <>
    <GlobalStyles />
    <LocationProvider>
      <FavoriteEmployeesProvider>
        <DirectoryLayout>
          <RouterContainer>
            <Router basepath="/" primary={false}>
              <Redirect noThrow from="/" to={routePaths.contacts} />
              <ContactsPage path={routePaths.contacts} />
              <EmployeePage path={routePaths.employee} />
              <FavoritesPage path={routePaths.favorites} />
              <ReferencePhonesPage path={routePaths.referencePhones} />
              <StructureRootPage path={routePaths.structure} />
              <StructureDepartmentPage path={routePaths.structureDepartment} />
              <ContactsPage default />
            </Router>
          </RouterContainer>
        </DirectoryLayout>
      </FavoriteEmployeesProvider>
    </LocationProvider>
  </>
);

