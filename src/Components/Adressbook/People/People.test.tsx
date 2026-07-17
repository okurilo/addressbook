import { fireEvent, render, screen, waitFor } from '../test-utils';
import type { Column } from '../common/Table';
import type { PersonRow } from '../types';
import { useGetColumns } from './hooks/useGetColumns';
import { useGetPeople } from './hooks/useGetPeople';
import { People } from './People';
import { useAdressbookContext } from '../provider';

jest.mock('./hooks/useGetColumns');
jest.mock('./hooks/useGetPeople');
jest.mock('../Profile/Profile', () => ({
  Profile: ({ onClose }: { onClose?: () => void }) => (
    <section>
      <span>Профиль сотрудника</span>
      <button onClick={onClose} type="button">
        Закрыть профиль
      </button>
    </section>
  ),
}));

type FetchMock = jest.Mock<Promise<{ json: () => Promise<unknown> }>, [RequestInfo | URL, RequestInit?]>;

const getPeopleMock = useGetPeople as jest.MockedFunction<typeof useGetPeople>;
const getColumnsMock = useGetColumns as jest.MockedFunction<typeof useGetColumns>;
const fetchMock = jest.fn() as FetchMock;
const initialFetch = global.fetch;

const person: PersonRow = {
  nameCell: { name: 'Иван Петров', photo: '', initials: 'ИП' },
  position: 'Инженер',
  block: 'ИТ',
  unit: 'Платформа',
  pid: 'person-1',
  _profile: { name: 'Иван Петров', photo: '', position: 'Инженер', initials: 'ИП' },
};

const columns: Column<PersonRow>[] = [
  { key: 'name', header: 'Сотрудник', render: (row) => row.nameCell.name },
];

const response = (body: unknown) => Promise.resolve({ json: () => Promise.resolve(body) });

const FavoritesState = (): JSX.Element => {
  const { favoriteGroupId, favoritePersons } = useAdressbookContext();
  return (
    <output>
      {favoriteGroupId ?? 'no-group'}:{favoritePersons?.size ?? 'not-loaded'}
    </output>
  );
};

describe('People', () => {
  beforeAll(() => {
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  beforeEach(() => {
    fetchMock.mockReset();
    getPeopleMock.mockReset();
    getColumnsMock.mockReset();
    getColumnsMock.mockReturnValue(columns);
    getPeopleMock.mockReturnValue({ people: [person], isLoading: false });
    fetchMock.mockImplementation(() => new Promise(() => undefined));
  });

  afterAll(() => {
    global.fetch = initialFetch;
  });

  test('скрывает таблицу во время загрузки', () => {
    getPeopleMock.mockReturnValue({ people: [], isLoading: true });
    render(<People />, { providerOptions: { addressbook: { people: [] } } });
    expect(screen.queryByRole('table')).toBeNull();
  });

  test('раскрывает Profile по клику и закрывает через callback', async () => {
    render(<People />, { providerOptions: { addressbook: { people: [] } } });

    fireEvent.click(screen.getByText('Иван Петров'));
    expect(screen.getByText('Профиль сотрудника')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Закрыть профиль' }));
    expect(screen.queryByText('Профиль сотрудника')).toBeNull();

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  });

  test('загружает участников найденной группы избранного', async () => {
    fetchMock
      .mockImplementationOnce(() =>
        response({
          data: [{ id: 'favorites-1', isCustom: true, type: 'группа', name: 'Избранное' }],
        })
      )
      .mockImplementationOnce(() =>
        response({ data: { content: [{ personId: 'person-1' }, { personId: 'person-2' }] } })
      );

    render(
      <>
        <People />
        <FavoritesState />
      </>,
      { providerOptions: { addressbook: { people: [] } } }
    );

    await waitFor(() => expect(screen.getByText('favorites-1:2')).toBeTruthy());
    expect(fetchMock.mock.calls[1]?.[0]).toBe(
      '/api-web/srv/v7/people/teams/favorites-1?page=0&size=60&isCustom=true'
    );
  });

  test('сохраняет пустое состояние, если группа избранного отсутствует', async () => {
    fetchMock.mockImplementationOnce(() => response({ data: [] }));
    render(
      <>
        <People />
        <FavoritesState />
      </>,
      { providerOptions: { addressbook: { people: [] } } }
    );

    await waitFor(() => expect(screen.getByText('no-group:0')).toBeTruthy());
  });

  test('обрабатывает ошибку загрузки избранного', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    fetchMock.mockRejectedValueOnce(new Error('network'));

    try {
      render(
        <>
          <People />
          <FavoritesState />
        </>,
        { providerOptions: { addressbook: { people: [] } } }
      );
      await waitFor(() => expect(screen.getByText('no-group:0')).toBeTruthy());
      expect(consoleError).toHaveBeenCalledWith('fetchFavorites error', expect.any(Error));
    } finally {
      consoleError.mockRestore();
    }
  });
});
