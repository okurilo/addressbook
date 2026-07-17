import { fireEvent, render, screen, waitFor } from '../../../../Components/Adressbook/test-utils';
import { useLocation, useNavigate } from '@reach/router';
import { fetchEmployees } from '../../api/directory/client';
import { fetchGroups, fetchRootGroups } from '../../api/directory/groups';
import type { GroupNode } from '../../api/directory/groups';
import { useFavoriteEmployees } from '../../components/useFavoriteEmployees';
import { createEmployee } from '../../test-utils/employee';
import { getDepartmentPath, routePaths } from '../../routes/routePaths';
import { StructureDepartmentPage } from './index';

jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock('../../api/directory/client', () => ({ fetchEmployees: jest.fn() }));
jest.mock('../../api/directory/groups', () => ({
  ...jest.requireActual('../../api/directory/groups'),
  fetchGroups: jest.fn(),
  fetchRootGroups: jest.fn(),
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
const employeesMock = fetchEmployees as jest.MockedFunction<typeof fetchEmployees>;
const groupsMock = fetchGroups as jest.MockedFunction<typeof fetchGroups>;
const rootGroupsMock = fetchRootGroups as jest.MockedFunction<typeof fetchRootGroups>;
const favoritesMock = useFavoriteEmployees as jest.MockedFunction<typeof useFavoriteEmployees>;
const navigateMock = jest.fn() as jest.MockedFunction<ReturnType<typeof useNavigate>>;
const toggleFavorite = jest.fn<Promise<void>, [string]>();

const createLocation = (search = ''): ReturnType<typeof useLocation> => ({
  ...window.location,
  pathname: routePaths.structure,
  search,
  state: null,
  key: 'structure-location',
});

const node = (id: string, name = id, children: GroupNode[] = []): GroupNode => ({
  id,
  name,
  type: 'unit',
  hasChild: children.length > 0,
  children,
});

const searchResponse = (
  items: ReturnType<typeof createEmployee>[],
  isLastPage = true,
  totalElements = items.length
) => ({
  items,
  query: '',
  page: 0,
  pageSize: 20,
  totalElements,
  totalPages: 1,
  isLastPage,
});

describe('StructureDepartmentPage', () => {
  beforeEach(() => {
    locationMock.mockReset();
    useNavigateMock.mockReset();
    employeesMock.mockReset();
    groupsMock.mockReset();
    rootGroupsMock.mockReset();
    favoritesMock.mockReset();
    navigateMock.mockReset();
    toggleFavorite.mockReset();
    navigateMock.mockResolvedValue(undefined);
    toggleFavorite.mockResolvedValue(undefined);
    useNavigateMock.mockReturnValue(navigateMock);
    locationMock.mockReturnValue(createLocation());
    favoritesMock.mockReturnValue({ favoriteIds: [], toggleFavorite, isReady: true });
  });

  test('показывает корень и открывает дочернюю структуру без загрузки сотрудников', async () => {
    const child = node('child', 'Дочерняя структура');
    const root = node('root', 'Корневая структура', [child]);
    root.parentTree = root;
    groupsMock.mockResolvedValueOnce(root);

    render(<StructureDepartmentPage />);
    await waitFor(() => expect(screen.getByText('Дочерняя структура')).toBeTruthy());
    expect(employeesMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText('Дочерняя структура'));
    expect(navigateMock).toHaveBeenCalledWith(getDepartmentPath('child'));
  });

  test('показывает пустой корень и восстанавливается после ошибки структуры', async () => {
    const root = node('root', 'Корневая структура');
    root.parentTree = root;
    groupsMock.mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce(root);
    render(<StructureDepartmentPage />);

    await waitFor(() => expect(screen.getByText('Не удалось загрузить подразделение')).toBeTruthy());
    fireEvent.click(screen.getByText('Не удалось загрузить подразделение'));
    await waitFor(() => expect(screen.getByText('Структура пока пуста')).toBeTruthy());
  });

  test('загружает подразделение, навигацию, сотрудников и следующую страницу', async () => {
    const sibling = node('sibling', 'Соседнее подразделение');
    const child = node('child', 'Дочернее подразделение');
    const root = node('root', 'Компания', [sibling]);
    const current = node('current', 'Платформа', [child]);
    root.children.push(current);
    current.parentTree = root;
    groupsMock.mockResolvedValueOnce(current);
    employeesMock
      .mockResolvedValueOnce(searchResponse([createEmployee('person-1', 'Иван Петров')], false, 2))
      .mockResolvedValueOnce(searchResponse([
        createEmployee('person-1', 'Иван Петров'),
        createEmployee('person-2', 'Анна Смирнова'),
      ]));

    render(<StructureDepartmentPage departmentId="current" />);
    await waitFor(() => expect(screen.getByText('Иван Петров')).toBeTruthy());
    expect(employeesMock).toHaveBeenCalledWith('', expect.any(AbortSignal), 'current', 0);
    fireEvent.click(screen.getByText('Иван Петров'));
    expect(toggleFavorite).toHaveBeenCalledWith('person-1');

    fireEvent.click(screen.getByText('Дочернее подразделение'));
    expect(navigateMock).toHaveBeenCalledWith(getDepartmentPath('child'));
    fireEvent.click(screen.getByText('↑ Наверх'));
    expect(navigateMock).toHaveBeenCalledWith(getDepartmentPath('root'));
    fireEvent.click(screen.getByRole('button', { name: 'Структура' }));
    expect(navigateMock).toHaveBeenCalledWith(routePaths.structure);

    fireEvent.click(screen.getByText('Показать ещё'));
    await waitFor(() => expect(screen.getByText('Анна Смирнова')).toBeTruthy());
    expect(screen.getAllByText('Иван Петров')).toHaveLength(1);
  });

  test('повторяет неуспешную дозагрузку сотрудников', async () => {
    const current = node('current', 'Платформа');
    groupsMock.mockResolvedValueOnce(current);
    employeesMock
      .mockResolvedValueOnce(searchResponse([createEmployee('person-1')], false))
      .mockRejectedValueOnce(new Error('page failed'))
      .mockResolvedValueOnce(searchResponse([createEmployee('person-2')]));
    render(<StructureDepartmentPage departmentId="current" />);

    await waitFor(() => expect(screen.getByText('Показать ещё')).toBeTruthy());
    fireEvent.click(screen.getByText('Показать ещё'));
    await waitFor(() => expect(employeesMock).toHaveBeenCalledTimes(2));
    fireEvent.click(screen.getByText('Показать ещё'));
    await waitFor(() => expect(screen.getByText('person-2')).toBeTruthy());
  });

  test('в глобальном поиске загружает корни и людей без orgFilter', async () => {
    locationMock.mockReturnValue(createLocation('?q=Иван'));
    rootGroupsMock.mockResolvedValueOnce([node('root-1', 'Корневая группа')]);
    employeesMock.mockResolvedValueOnce(searchResponse([createEmployee('person-1', 'Иван')], true, 7));
    render(<StructureDepartmentPage />);

    await waitFor(() => expect(screen.getByText(/Найдено 7 сотрудников/)).toBeTruthy());
    expect(rootGroupsMock).toHaveBeenCalledWith(expect.any(AbortSignal));
    expect(employeesMock).toHaveBeenCalledWith('Иван', expect.any(AbortSignal), null, 0);
    fireEvent.click(screen.getByText('Корневая группа'));
    expect(navigateMock).toHaveBeenCalledWith(`${getDepartmentPath('root-1')}?q=Иван`);
  });

  test('показывает empty глобального поиска', async () => {
    locationMock.mockReturnValue(createLocation('?q=Нет'));
    rootGroupsMock.mockResolvedValueOnce([]);
    employeesMock.mockResolvedValueOnce(searchResponse([]));
    render(<StructureDepartmentPage />);
    await waitFor(() => expect(screen.getByText('Сотрудники не найдены')).toBeTruthy());
  });
});
