import { fireEvent, render, screen, waitFor } from '../../test-utils';
import { toast } from 'react-toastify';
import { TableMail } from './Mail';
import { cleanPhoneForCall, TablePhone } from './Phone';
import { TableStar } from './TableStar/TableStar';

jest.mock('react-toastify', () => ({ toast: jest.fn() }));

type FetchMock = jest.Mock<Promise<{ json: () => Promise<unknown> }>, [RequestInfo | URL, RequestInit?]>;

const toastMock = toast as jest.MockedFunction<typeof toast>;
const fetchMock = jest.fn() as FetchMock;
const writeTextMock = jest.fn<Promise<void>, [string]>();
const initialFetch = global.fetch;
const initialClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

const response = (body: unknown = {}) => Promise.resolve({ json: () => Promise.resolve(body) });

describe('интерактивные ячейки контактов', () => {
  let consoleError: jest.SpyInstance<void, Parameters<typeof console.error>>;

  beforeAll(() => {
    global.fetch = fetchMock as unknown as typeof fetch;
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeTextMock },
    });
  });

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    fetchMock.mockReset();
    toastMock.mockReset();
    writeTextMock.mockReset();
    writeTextMock.mockResolvedValue(undefined);
    fetchMock.mockImplementation(() => response());
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  afterAll(() => {
    global.fetch = initialFetch;
    if (initialClipboard === undefined) {
      Reflect.deleteProperty(navigator, 'clipboard');
    } else {
      Object.defineProperty(navigator, 'clipboard', initialClipboard);
    }
  });

  test('очищает номер и копирует его в clipboard', () => {
    expect(cleanPhoneForCall('+7 (999) 000-00-00')).toBe('79990000000');
    render(<TablePhone phone="+7 (999) 000-00-00" pid="person-1" />);

    const phoneButton = screen.getAllByRole('button', { name: '+7 (999) 000-00-00' })[1];
    if (phoneButton === undefined) throw new Error('Кнопка номера не найдена');
    fireEvent.mouseEnter(phoneButton);
    fireEvent.mouseLeave(phoneButton);
    fireEvent.mouseEnter(screen.getByTitle('Скопировать'));
    fireEvent.click(screen.getByTitle('Скопировать'));
    fireEvent.mouseLeave(screen.getByTitle('Скопировать'));

    expect(writeTextMock).toHaveBeenCalledWith('+7 (999) 000-00-00');
    expect(toastMock).toHaveBeenCalledTimes(1);
  });

  test('не выполняет звонок для служебного номера', () => {
    render(<TablePhone phone="900" noCalls />);
    const phoneButton = screen.getAllByRole('button', { name: '900' })[1];
    if (phoneButton === undefined) throw new Error('Кнопка номера не найдена');
    fireEvent.click(phoneButton);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalledTimes(1);
  });

  test('получает личный номер и инициирует звонок сотруднику', async () => {
    fetchMock
      .mockImplementationOnce(() =>
        response({ data: [{ data: { contactsV2: { phones: { personal: { phone: '+7 111' } } } } }] })
      )
      .mockImplementationOnce(() => response());

    render(<TablePhone phone="1234" pid="person-1" />);
    const phoneButton = screen.getAllByRole('button', { name: '1234' })[1];
    if (phoneButton === undefined) throw new Error('Кнопка номера не найдена');
    fireEvent.click(phoneButton);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(fetchMock.mock.calls[1]).toEqual([
      '/api-mobile/smart-profile/contacts/phoneCall?userId=person-1',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ callFrom: '7111', callTo: '1234' }),
      }),
    ]);
  });

  test('TableStar добавляет и удаляет сотрудника с оптимистичным состоянием', async () => {
    const { rerender } = render(
      <TableStar pid="person-1" groupId="favorites-1" isFavorite={false} />
    );
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock.mock.calls[0]?.[1]?.body).toContain('personsToAdd');

    rerender(<TableStar pid="person-1" groupId="favorites-1" isFavorite />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(fetchMock.mock.calls[1]?.[1]?.body).toContain('personsToDelete');
    expect(toastMock).toHaveBeenCalledTimes(2);
  });

  test('TableStar показывает загрузку, игнорирует отсутствие группы и откатывает ошибку', async () => {
    const { container, rerender } = render(
      <TableStar pid="person-1" isFavoriteLoading />
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();

    rerender(<TableStar pid="person-1" isFavorite={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(fetchMock).not.toHaveBeenCalled();

    fetchMock.mockRejectedValueOnce(new Error('network'));
    rerender(<TableStar pid="person-1" groupId="favorites-1" isFavorite={false} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(consoleError).toHaveBeenCalled());
  });

  test('рендерит почтовое действие', () => {
    render(<TableMail />);
    expect(screen.getByRole('button')).toBeTruthy();
  });
});
