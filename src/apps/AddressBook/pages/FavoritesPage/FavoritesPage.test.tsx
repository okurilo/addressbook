import { fireEvent, render, screen, waitFor } from '../../../../Components/Adressbook/test-utils';
import { useLocation, useNavigate } from '@reach/router';
import {
  fetchAllCustomPeopleGroupEmployees,
  fetchCustomPeopleGroupPage,
  fetchCustomPeopleGroups,
} from '../../api/directory/client';
import type { CustomPeopleGroup } from '../../api/directory/favorites';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { createEmployee } from '../../test-utils/employee';
import { routePaths } from '../../routes/routePaths';
import { FavoritesPage } from './index';

jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock('../../api/directory/client', () => ({
  fetchAllCustomPeopleGroupEmployees: jest.fn(),
  fetchCustomPeopleGroupPage: jest.fn(),
  fetchCustomPeopleGroups: jest.fn(),
}));
jest.mock('../../components/useFavoriteEmployees', () => ({ useFavoriteEmployees: jest.fn() }));
jest.mock('../../components/EmployeeTable', () => ({
  EmployeeTable: ({
    employees,
    onToggleFavorite,
  }: {
    employees: Array<{ id: string; fullName: string }>;
    onToggleFavorite: (id: string) => void;
  }) => (
    <div>
      {employees.map((employee) => (
        <button key={employee.id} type="button" onClick={() => onToggleFavorite(employee.id)}>
          {employee.fullName}
        </button>
      ))}
    </div>
  ),
}));
jest.mock('../../components/GroupActions', () => ({
  GroupActions: ({
    loadAllEmployees,
  }: {
    loadAllEmployees: () => Promise<Array<{ id: string }>>;
  }) => (
    <button
      type="button"
      onClick={() => {
        void loadAllEmployees().then((employees) => {
          document.body.dataset.loadedEmployees = employees.map(({ id }) => id).join(',');
        });
      }}
    >
      Загрузить всех для действия
    </button>
  ),
}));
jest.mock('../../components/RetryState', () => ({
  RetryState: ({ title, onRetry }: { title: string; onRetry: () => void }) => (
    <button type="button" onClick={onRetry}>{title}</button>
  ),
}));
jest.mock('../../components/ShowMoreButton', () => ({
  ShowMoreButton: ({ onClick }: { onClick: () => void }) => (
    <button type="button" onClick={onClick}>Показать ещё</button>
  ),
}));

const locationMock = useLocation as jest.MockedFunction<typeof useLocation>;
const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>;
const groupsMock = fetchCustomPeopleGroups as jest.MockedFunction<typeof fetchCustomPeopleGroups>;
const pageMock = fetchCustomPeopleGroupPage as jest.MockedFunction<
  typeof fetchCustomPeopleGroupPage
>;
const allEmployeesMock = fetchAllCustomPeopleGroupEmployees as jest.MockedFunction<
  typeof fetchAllCustomPeopleGroupEmployees
>;
const favoritesMock = useFavoriteEmployees as jest.MockedFunction<typeof useFavoriteEmployees>;
const navigateMock = jest.fn() as jest.MockedFunction<ReturnType<typeof useNavigate>>;
const toggleFavorite = jest.fn<Promise<void>, [string]>();

const createLocation = (search = ''): ReturnType<typeof useLocation> => ({
  ...window.location,
  pathname: routePaths.favorites,
  search,
  state: null,
  key: 'favorites-location',
});

const group = (
  id: string,
  employees: ReturnType<typeof createEmployee>[],
  isLastPage = true
): CustomPeopleGroup => ({
  id,
  name: `Группа ${id}`,
  employees,
  nextPage: 1,
  isLastPage,
  lastPageSignature: employees.map((employee) => employee.id).join('|'),
});

describe('FavoritesPage', () => {
  beforeEach(() => {
    locationMock.mockReset();
    useNavigateMock.mockReset();
    groupsMock.mockReset();
    pageMock.mockReset();
    allEmployeesMock.mockReset();
    favoritesMock.mockReset();
    navigateMock.mockReset();
    toggleFavorite.mockReset();
    navigateMock.mockResolvedValue(undefined);
    toggleFavorite.mockResolvedValue(undefined);
    useNavigateMock.mockReturnValue(navigateMock);
    locationMock.mockReturnValue(createLocation('?q=Иван'));
    favoritesMock.mockReturnValue({ favoriteIds: [], toggleFavorite, isReady: true });
    Reflect.deleteProperty(document.body.dataset, 'loadedEmployees');
  });

  test('объединяет группы, дедуплицирует сотрудников и переключает tab', async () => {
    groupsMock.mockResolvedValueOnce([
      group('one', [createEmployee('person-1', 'Иван Петров')]),
      group('two', [createEmployee('person-1', 'Иван Петров'), createEmployee('person-2', 'Анна')]),
    ]);
    render(<FavoritesPage />);

    await waitFor(() => expect(screen.getByText('Анна')).toBeTruthy());
    expect(screen.getAllByText('Иван Петров')).toHaveLength(1);
    fireEvent.click(screen.getByText('Иван Петров'));
    expect(toggleFavorite).toHaveBeenCalledWith('person-1');

    fireEvent.click(screen.getByRole('tab', { name: 'Группа one' }));
    expect(navigateMock).toHaveBeenCalledWith(
      `${routePaths.favorites}?q=%D0%98%D0%B2%D0%B0%D0%BD&groupId=one`,
      { replace: true }
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Все' }));
    expect(navigateMock).toHaveBeenLastCalledWith(`${routePaths.favorites}?q=%D0%98%D0%B2%D0%B0%D0%BD`, {
      replace: true,
    });
  });

  test('дозагружает незавершённые группы и объединяет страницы', async () => {
    groupsMock.mockResolvedValueOnce([
      group('one', [createEmployee('person-1', 'Иван Петров')], false),
    ]);
    pageMock.mockResolvedValueOnce({
      employees: [createEmployee('person-1', 'Иван Петров'), createEmployee('person-2', 'Анна')],
      nextPage: 2,
      isLastPage: true,
    });
    render(<FavoritesPage />);

    await waitFor(() => expect(screen.getByText('Показать ещё')).toBeTruthy());
    fireEvent.click(screen.getByText('Показать ещё'));
    await waitFor(() => expect(screen.getByText('Анна')).toBeTruthy());
    expect(pageMock).toHaveBeenCalledWith('one', 1);
  });

  test('повторяет неуспешную дозагрузку', async () => {
    groupsMock.mockResolvedValueOnce([group('one', [createEmployee('person-1')], false)]);
    pageMock
      .mockRejectedValueOnce(new Error('page failed'))
      .mockResolvedValueOnce({ employees: [], nextPage: 2, isLastPage: false });
    render(<FavoritesPage />);

    await waitFor(() => expect(screen.getByText('Показать ещё')).toBeTruthy());
    fireEvent.click(screen.getByText('Показать ещё'));
    await waitFor(() => expect(pageMock).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByText('Показать ещё'));
    await waitFor(() => expect(pageMock).toHaveBeenCalledTimes(2));
  });

  test('дочитывает участников перед групповым действием', async () => {
    const first = group('one', [createEmployee('person-1')], false);
    groupsMock.mockResolvedValueOnce([first]);
    allEmployeesMock.mockResolvedValueOnce([
      createEmployee('person-1'),
      createEmployee('person-2'),
    ]);
    render(<FavoritesPage />);

    await waitFor(() => expect(screen.getByText('Загрузить всех для действия')).toBeTruthy());
    fireEvent.click(screen.getByText('Загрузить всех для действия'));
    await waitFor(() => expect(document.body.dataset.loadedEmployees).toBe('person-1,person-2'));
    expect(allEmployeesMock).toHaveBeenCalledWith(first);
  });

  test('показывает empty активной группы и восстанавливается после ошибки', async () => {
    locationMock.mockReturnValue(createLocation('?groupId=empty'));
    groupsMock
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce([group('empty', [])]);
    render(<FavoritesPage />);

    await waitFor(() => expect(screen.getByText('Не удалось загрузить избранное')).toBeTruthy());
    fireEvent.click(screen.getByText('Не удалось загрузить избранное'));
    await waitFor(() => expect(screen.getByText('В группе «Группа empty» пока нет сотрудников.')).toBeTruthy());
  });
});
