import { http } from '../../../../http-requests/http';
import {
  fetchDirectoryEmployees,
  fetchDirectorySuggestions,
  getSearchData,
} from './search';

jest.mock('../../../../http-requests/http', () => ({
  http: { get: jest.fn(), post: jest.fn() },
}));

type GetMock = jest.Mock<Promise<unknown>, [string, { input?: { signal?: AbortSignal } }?]>;

const getMock = http.get as unknown as GetMock;

const person = {
  personUuid: 'person-1',
  pbasic: {
    firstName: 'Иван',
    lastName: 'Петров',
    midName: 'Сергеевич',
    fullName: 'Иван Петров',
    status: 'ignored',
  },
  jbasic: { employeeId: '123', status: 'АКТИВНЫЙ' },
  junit: {
    unit: [{ unitId: 'unit-1', fullName: 'Департамент', balanceUnitName: 'Блок', city: 'Москва' }],
  },
  jposition: { position: [{ fullName: 'Разработчик', funcBlock: 'ИТ' }] },
  jcontactsinterofficetel: { value: '1234' },
  jcontactsmobile: { value: '+79990000000', phoneHide: true },
  jcontactsinterofficeemail: { value: 'ivan@example.test' },
  pbasicphoto: { url: '/photo.png' },
  absence: { badge: 'Отпуск', period: 'до 20 июля' },
};

describe('directory search API', () => {
  beforeEach(() => {
    getMock.mockReset();
  });

  test('формирует URL поиска с категориями, пагинацией и orgFilter', async () => {
    const signal = new AbortController().signal;
    getMock.mockResolvedValueOnce({});

    await getSearchData({
      query: 'Иван Петров',
      page: 2,
      size: 10,
      categories: ['personaddressbook'],
      orgFilter: 'unit/1',
      signal,
    });

    expect(getMock).toHaveBeenCalledWith(
      '/globalsearch/api/v3/multiSearch?query=%D0%98%D0%B2%D0%B0%D0%BD%20%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B2&page=2&size=10&category=PERSONADDRESSBOOK&orgFilter=unit%2F1',
      { input: { signal } }
    );
  });

  test('нормализует сотрудника и серверные метаданные страницы', async () => {
    getMock.mockResolvedValueOnce({
      PERSONADDRESSBOOK: {
        data: {
          content: [person, null, { personUuid: '', pbasic: { fullName: 'Без id' } }],
          number: 3,
          size: 20,
          totalElements: 61,
          totalPages: 4,
          last: false,
        },
      },
    });

    const result = await fetchDirectoryEmployees('Иван', undefined, null, 3, 20);

    expect(result).toMatchObject({
      query: 'Иван',
      page: 3,
      pageSize: 20,
      totalElements: 61,
      totalPages: 4,
      isLastPage: false,
    });
    expect(result.items).toEqual([
      expect.objectContaining({
        id: 'person-1',
        fullName: 'Иван Петров',
        avatarInitials: 'ИП',
        status: 'available',
        phone: '1234',
        mobilePhone: null,
        email: 'ivan@example.test',
        position: 'Разработчик',
        functionalBlock: 'ИТ',
        workplace: 'Москва',
        absence: expect.objectContaining({ badge: 'Отпуск', period: 'до 20 июля' }),
      }),
    ]);
  });

  test('определяет отпуск, увольнение и запасные значения контактов', async () => {
    getMock.mockResolvedValueOnce({
      PERSONADDRESSBOOK: {
        data: {
          content: [
            {
              personUuid: 'vacation',
              pbasic: { fullName: 'Анна Смирнова' },
              jbasic: { status: 'АКТИВНЫЙ' },
              jbadgeabsencevacation: {},
              pcontactsmobile: '+70000000001',
              pcontactsexternalemail: 'anna@example.test',
            },
            {
              personUuid: 'offline',
              pbasic: { fullName: 'Пётр Сидоров' },
              jbasic: { status: 'НЕАКТИВНЫЙ' },
            },
          ],
        },
      },
    });

    const result = await fetchDirectoryEmployees('');

    expect(result.items[0]).toMatchObject({
      avatarInitials: 'АС',
      status: 'vacation',
      mobilePhone: '+70000000001',
      email: 'anna@example.test',
    });
    expect(result.items[1]).toMatchObject({ status: 'offline', avatarInitials: 'ПС' });
    expect(result.isLastPage).toBe(true);
  });

  test('нормализует плоские подсказки оргструктуры и отбрасывает невалидные', async () => {
    getMock.mockResolvedValueOnce({
      ORGSTRUCTURE: {
        data: {
          content: [
            { id: 'org-1', fullName: 'Платформа', typeName: 'Департамент', layer: '3' },
            { id: '', fullName: 'Без id' },
          ],
        },
      },
    });

    const result = await fetchDirectorySuggestions('плат', undefined, 'organizations');

    expect(result.items).toEqual([]);
    expect(result.organizations).toEqual([
      { id: 'org-1', fullName: 'Платформа', typeName: 'Департамент', layer: '3' },
    ]);
    expect(getMock.mock.calls[0]?.[0]).toContain('category=ORGSTRUCTURE');
  });

  test('сообщает об отсутствии обязательного content', async () => {
    getMock.mockResolvedValueOnce({ PERSONADDRESSBOOK: { data: {} } });

    await expect(fetchDirectoryEmployees('test')).rejects.toThrow(
      'MultiSearch response does not contain PERSONADDRESSBOOK content'
    );

    getMock.mockResolvedValueOnce({});
    await expect(fetchDirectorySuggestions('test')).rejects.toThrow(
      'MultiSearch response does not contain directory search content'
    );
  });
});
