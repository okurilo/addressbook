import { fireEvent, render, screen, waitFor } from '../../../../test-utils/test-utils';
import { useLocation, useNavigate } from '@reach/router';
import { fetchSearchSuggestions } from '../../api/directory/client';
import { createEmployee } from '../../test-utils/employee';
import { getDepartmentPath, getEmployeePath, routePaths } from '../../routes/routePaths';
import { DirectorySearch } from './index';

jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock('../../api/directory/client', () => ({ fetchSearchSuggestions: jest.fn() }));
jest.mock('../useDebouncedValue', () => ({ useDebouncedValue: (value: string) => value }));

const locationMock = useLocation as jest.MockedFunction<typeof useLocation>;
const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>;
const suggestionsMock = fetchSearchSuggestions as jest.MockedFunction<
  typeof fetchSearchSuggestions
>;
const navigateMock = jest.fn() as jest.MockedFunction<ReturnType<typeof useNavigate>>;

const createLocation = (pathname: string, search = ''): ReturnType<typeof useLocation> => ({
  ...window.location,
  pathname,
  search,
  state: null,
  key: 'search-location',
});

const emptyResult = {
  items: [],
  organizations: [],
  query: '',
  page: 0,
  pageSize: 20,
  totalElements: 0,
  totalPages: 0,
  isLastPage: true,
};

describe('DirectorySearch', () => {
  beforeEach(() => {
    locationMock.mockReset();
    useNavigateMock.mockReset();
    suggestionsMock.mockReset();
    navigateMock.mockReset();
    navigateMock.mockResolvedValue(undefined);
    useNavigateMock.mockReturnValue(navigateMock);
    locationMock.mockReturnValue(createLocation(routePaths.contacts));
    suggestionsMock.mockResolvedValue(emptyResult);
  });

  test('загружает подсказки людей и открывает выбранного сотрудника', async () => {
    const employee = createEmployee('person-1', 'Иван Петров');
    suggestionsMock.mockResolvedValueOnce({ ...emptyResult, items: [employee] });
    render(<DirectorySearch />);

    const input = screen.getByRole('textbox', { name: 'поиск' });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: ' Иван ' } });
    expect(screen.getByText('Ищем сотрудников…')).toBeTruthy();

    const option = await screen.findByRole('option', { name: /Иван Петров/ });
    fireEvent.mouseDown(option);
    fireEvent.click(option);

    expect(suggestionsMock).toHaveBeenCalledWith('Иван', expect.any(AbortSignal), 'people');
    expect(navigateMock).toHaveBeenCalledWith(getEmployeePath('person-1'), {
      state: { employee },
    });
  });

  test('показывает оргструктуру и открывает выбранное подразделение', async () => {
    locationMock.mockReturnValue(createLocation(routePaths.structure));
    suggestionsMock.mockResolvedValueOnce({
      ...emptyResult,
      organizations: [
        { id: 'unit/1', fullName: 'Платформа', typeName: 'Департамент', layerName: 'Блок' },
      ],
    });
    render(<DirectorySearch />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'плат' } });
    expect(screen.getByText('Ищем в кадровой структуре…')).toBeTruthy();
    const option = await screen.findByRole('option', { name: /Платформа/ });
    expect(screen.getByText('Найдено в кадровой структуре')).toBeTruthy();
    expect(screen.getByText('Департамент · Блок')).toBeTruthy();
    fireEvent.click(option);

    expect(suggestionsMock).toHaveBeenCalledWith('плат', expect.any(AbortSignal), 'organizations');
    expect(navigateMock).toHaveBeenCalledWith(getDepartmentPath('unit/1'), { state: undefined });
  });

  test('отправляет Enter с текущего раздела и возвращает employee route к контактам', () => {
    locationMock.mockReturnValue(
      createLocation(`${routePaths.contacts}/employee/person-1`, '?categoryId=main')
    );
    render(<DirectorySearch />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  Петров  ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(navigateMock).toHaveBeenCalledWith(
      `${routePaths.contacts}?categoryId=main&q=%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B2`,
      { replace: true }
    );
  });

  test('очищает q, сохраняет остальные параметры и открывает избранное', () => {
    locationMock.mockReturnValue(createLocation(routePaths.contacts, '?q=Иван&categoryId=main'));
    render(<DirectorySearch />);

    const clearButton = screen.getByRole('button', { name: 'Очистить поиск' });
    fireEvent.mouseDown(clearButton);
    fireEvent.click(clearButton);
    expect(navigateMock).toHaveBeenCalledWith(`${routePaths.contacts}?categoryId=main`, {
      replace: true,
    });

    fireEvent.click(screen.getByRole('button', { name: 'избранное' }));
    expect(navigateMock).toHaveBeenCalledWith(`${routePaths.favorites}?q=Иван&categoryId=main`);
  });

  test('показывает пустое состояние после ошибки и закрывает dropdown по blur', async () => {
    suggestionsMock.mockRejectedValueOnce(new Error('network'));
    render(<DirectorySearch />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'нет' } });
    await waitFor(() => expect(screen.getByText('Ничего не найдено')).toBeTruthy());
    fireEvent.blur(input);
    expect(screen.queryByRole('listbox')).toBeNull();
  });
});
