import { fireEvent, render, screen, waitFor } from '../../../../test-utils/test-utils';
import { useLocation } from '@reach/router';
import { fetchEmployees } from '../../api/directory/client';
import { getSearchHistory, selectSearchHistory } from '../../api/history/history';
import { SearchContextEnum } from '../../api/history/types';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { createEmployee } from '../../test-utils/employee';
import { ContactsPage } from './index';

jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useLocation: jest.fn(),
}));
jest.mock('../../api/directory/client', () => ({ fetchEmployees: jest.fn() }));
jest.mock('../../api/history/history', () => ({
  getSearchHistory: jest.fn(),
  selectSearchHistory: jest.fn(),
}));
jest.mock('../../components/useDebouncedValue', () => ({
  useDebouncedValue: (value: string) => value,
}));
jest.mock('../../components/useFavoriteEmployees', () => ({ useFavoriteEmployees: jest.fn() }));
jest.mock('../../components/EmployeeTable', () => ({
  EmployeeTable: ({
    employees,
    onEmployeeOpen,
    onToggleFavorite,
  }: {
    employees: Array<{ id: string; fullName: string }>;
    onEmployeeOpen?: (id: string) => void;
    onToggleFavorite: (id: string) => void;
  }) => (
    <div>
      {employees.map((employee) => (
        <div key={employee.id}>
          <button type="button" onClick={() => onEmployeeOpen?.(employee.id)}>
            {employee.fullName}
          </button>
          <button type="button" onClick={() => onToggleFavorite(employee.id)}>
            Избранное {employee.id}
          </button>
        </div>
      ))}
    </div>
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
const fetchEmployeesMock = fetchEmployees as jest.MockedFunction<typeof fetchEmployees>;
const historyMock = getSearchHistory as jest.MockedFunction<typeof getSearchHistory>;
const selectHistoryMock = selectSearchHistory as jest.MockedFunction<typeof selectSearchHistory>;
const favoritesMock = useFavoriteEmployees as jest.MockedFunction<typeof useFavoriteEmployees>;
const toggleFavorite = jest.fn<Promise<void>, [string]>();
const createLocation = (pathname: string, search: string): ReturnType<typeof useLocation> => ({
  ...window.location,
  pathname,
  search,
  state: null,
  key: 'test-location',
});

const searchResponse = (items: ReturnType<typeof createEmployee>[], isLastPage = true) => ({
  items,
  query: 'Иван',
  page: 0,
  pageSize: 20,
  totalElements: items.length,
  totalPages: 1,
  isLastPage,
});

describe('ContactsPage', () => {
  beforeEach(() => {
    locationMock.mockReset();
    fetchEmployeesMock.mockReset();
    historyMock.mockReset();
    selectHistoryMock.mockReset();
    favoritesMock.mockReset();
    toggleFavorite.mockReset();
    toggleFavorite.mockResolvedValue(undefined);
    selectHistoryMock.mockResolvedValue(undefined);
    favoritesMock.mockReturnValue({ favoriteIds: [], toggleFavorite, isReady: true });
  });

  test('показывает недавних, пропускает неуспешные записи и отмечает открытие', async () => {
    locationMock.mockReturnValue(createLocation('/contacts', ''));
    historyMock.mockResolvedValueOnce([
      { id: 'history-1', path: 'persons', text: 'Иван', key: { context: SearchContextEnum.persons, id: 'person-1' } },
      { id: 'history-2', path: 'persons', text: 'Нет', key: { context: SearchContextEnum.persons, id: 'missing' } },
    ]);
    fetchEmployeesMock
      .mockResolvedValueOnce(searchResponse([createEmployee('person-1', 'Иван Петров')]))
      .mockRejectedValueOnce(new Error('missing'));

    render(<ContactsPage />);
    await waitFor(() => expect(screen.getByText('Иван Петров')).toBeTruthy());
    fireEvent.click(screen.getByText('Иван Петров'));
    fireEvent.click(screen.getByText('Избранное person-1'));

    expect(selectHistoryMock).toHaveBeenCalledWith('history-1');
    expect(toggleFavorite).toHaveBeenCalledWith('person-1');
  });

  test('дозагружает поиск и дедуплицирует сотрудников', async () => {
    locationMock.mockReturnValue(createLocation('/contacts', '?q=Иван'));
    fetchEmployeesMock
      .mockResolvedValueOnce(searchResponse([createEmployee('person-1', 'Иван Петров')], false))
      .mockResolvedValueOnce(searchResponse([
        createEmployee('person-1', 'Иван Петров'),
        createEmployee('person-2', 'Иван Сидоров'),
      ]));

    render(<ContactsPage />);
    await waitFor(() => expect(screen.getByText('Показать ещё')).toBeTruthy());
    fireEvent.click(screen.getByText('Показать ещё'));
    await waitFor(() => expect(screen.getByText('Иван Сидоров')).toBeTruthy());
    expect(screen.getAllByText('Иван Петров')).toHaveLength(1);
  });

  test('показывает empty и повторяет первоначальный запрос после ошибки', async () => {
    locationMock.mockReturnValue(createLocation('/contacts', '?q=Нет'));
    fetchEmployeesMock
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce(searchResponse([]));

    render(<ContactsPage />);
    await waitFor(() => expect(screen.getByText('Не удалось загрузить сотрудников')).toBeTruthy());
    fireEvent.click(screen.getByText('Не удалось загрузить сотрудников'));
    await waitFor(() => expect(screen.getByText('Ничего не найдено')).toBeTruthy());
  });

  test('повторяет неуспешную дозагрузку', async () => {
    locationMock.mockReturnValue(createLocation('/contacts', '?q=Иван'));
    fetchEmployeesMock
      .mockResolvedValueOnce(searchResponse([createEmployee('person-1', 'Иван Петров')], false))
      .mockRejectedValueOnce(new Error('page failed'))
      .mockResolvedValueOnce(searchResponse([createEmployee('person-2', 'Иван Сидоров')]));

    render(<ContactsPage />);
    await waitFor(() => expect(screen.getByText('Показать ещё')).toBeTruthy());
    fireEvent.click(screen.getByText('Показать ещё'));
    await waitFor(() => expect(fetchEmployeesMock).toHaveBeenCalledTimes(2));
    fireEvent.click(screen.getByText('Показать ещё'));
    await waitFor(() => expect(screen.getByText('Иван Сидоров')).toBeTruthy());
  });
});
