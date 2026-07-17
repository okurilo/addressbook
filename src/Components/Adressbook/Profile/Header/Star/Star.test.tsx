import { fireEvent, render, screen, waitFor } from '../../../../../test-utils/test-utils';
import { toast } from 'react-toastify';
import { Star } from './Star';

jest.mock('react-toastify', () => ({ toast: jest.fn() }));

type FetchMock = jest.Mock<Promise<{ json: () => Promise<unknown> }>, [RequestInfo | URL, RequestInit?]>;

const toastMock = toast as jest.MockedFunction<typeof toast>;
const fetchMock = jest.fn() as FetchMock;
const initialFetch = global.fetch;

const response = (body: unknown) => Promise.resolve({ json: () => Promise.resolve(body) });
const favoriteGroup = {
  id: 'favorites-1',
  name: 'Избранное',
  type: 'группа',
  typeOrder: 1,
  isCustom: true,
};

describe('Profile Star', () => {
  beforeAll(() => {
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  beforeEach(() => {
    fetchMock.mockReset();
    toastMock.mockReset();
  });

  afterAll(() => {
    global.fetch = initialFetch;
  });

  test('проверяет участие и добавляет сотрудника в существующую группу', async () => {
    fetchMock
      .mockImplementationOnce(() => response({ data: [favoriteGroup] }))
      .mockImplementationOnce(() => response({ data: { content: [] } }))
      .mockImplementationOnce(() => response({ data: [favoriteGroup] }))
      .mockImplementationOnce(() => response({ data: { content: [] } }))
      .mockImplementationOnce(() => response({}));

    render(<Star pid="person-1" />);
    await waitFor(() => expect(screen.getByRole('button')).toBeTruthy());
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(5));
    expect(fetchMock.mock.calls[4]?.[1]?.body).toContain('personsToAdd');
    expect(toastMock).toHaveBeenCalledTimes(1);
  });

  test('удаляет сотрудника, если он уже состоит в избранном', async () => {
    fetchMock
      .mockImplementationOnce(() => response({ data: [favoriteGroup] }))
      .mockImplementationOnce(() => response({ data: { content: [{ personId: 'person-1' }] } }))
      .mockImplementationOnce(() => response({ data: [favoriteGroup] }))
      .mockImplementationOnce(() => response({ data: { content: [{ personId: 'person-1' }] } }))
      .mockImplementationOnce(() => response({}));

    render(<Star pid="person-1" />);
    await waitFor(() => expect(screen.getByRole('button')).toBeTruthy());
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(5));
    expect(fetchMock.mock.calls[4]?.[1]?.body).toContain('personsToDelete');
  });

  test('создаёт отсутствующую группу и устойчив к ошибке загрузки', async () => {
    fetchMock
      .mockImplementationOnce(() => response({ data: [] }))
      .mockImplementationOnce(() => response(favoriteGroup));
    const { unmount } = render(<Star pid="person-1" />);
    await waitFor(() => expect(screen.getByRole('button')).toBeTruthy());
    expect(fetchMock.mock.calls[1]?.[0]).toBe('/api-web/srv/v7/people/custom-groups');
    unmount();

    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    fetchMock.mockReset();
    fetchMock.mockRejectedValueOnce(new Error('network'));
    render(<Star pid="person-2" />);
    await waitFor(() => expect(screen.getByRole('button')).toBeTruthy());
    expect(consoleError).toHaveBeenCalledWith('ensureFavouriteGroup error', expect.any(Error));
    consoleError.mockRestore();
  });
});
