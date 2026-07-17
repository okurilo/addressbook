import { act, renderHook, waitFor } from '../../../../test-utils/test-utils';
import { http } from '../../../../http-requests/http';
import { useProfile } from './useProfile';

jest.mock('../../../../http-requests/http', () => ({
  http: { get: jest.fn() },
}));

type GetMock = jest.Mock<Promise<unknown>, [string, { input: { signal: AbortSignal } }]>;

const getMock = http.get as unknown as GetMock;

describe('useProfile', () => {
  beforeEach(() => {
    getMock.mockReset();
  });

  test('загружает и нормализует данные основных виджетов', async () => {
    getMock.mockResolvedValueOnce([
      {
        code: 'mainInfo_v1',
        data: {
          contactsV2: {
            workAddress: 'Москва, Кутузовский проспект',
            mails: {
              sigma: { mail: 'sigma@example.test' },
              alpha: { mail: 'alpha@example.test' },
            },
          },
          schedule: { timezone: 'UTC+3' },
          linear: { position: 'Инженер', orgPath: [{ title: 'Платформа' }] },
          birthDate: { day: 17, month: 7 },
          tabNumber: '12345',
        },
      },
      { code: 'about', data: { socialNets: { sberchat: 'user@ivan.petrov' } } },
      {
        code: 'manager',
        data: {
          managers: [
            {
              isLinear: true,
              lastName: 'Сидоров',
              firstName: 'Пётр',
              secondName: 'Иванович',
              userId: 'manager-1',
            },
          ],
        },
      },
    ]);

    const { result } = renderHook(() => useProfile('person/1'));

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current).toMatchObject({
      workAddress: 'Москва, Кутузовский проспект',
      mailSigma: 'sigma@example.test',
      mailAlpha: 'alpha@example.test',
      sberchat: '@ivan.petrov',
      timezone: 'UTC+3',
      tabNumber: '12345',
      linearManager: {
        name: 'Сидоров Пётр Иванович',
        url: '/platform/profile/manager-1/',
      },
    });
    expect(getMock.mock.calls[0]?.[0]).toContain('&userId=person/1');
    expect(getMock.mock.calls[0]?.[1].input.signal).toBeInstanceOf(AbortSignal);
  });

  test('поддерживает legacy-контакты и отсутствие pid', async () => {
    getMock.mockResolvedValueOnce([
      {
        code: 'mainInfo_v1',
        data: {
          contacts: {
            workAddress: 'Санкт-Петербург',
            mails: { sigma: 'legacy-sigma@example.test', alpha: 'legacy-alpha@example.test' },
          },
        },
      },
      { code: 'about', data: { socialNets: { sberchat: '' } } },
    ]);

    const { result } = renderHook(() => useProfile());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current).toMatchObject({
      workAddress: 'Санкт-Петербург',
      mailSigma: 'legacy-sigma@example.test',
      mailAlpha: 'legacy-alpha@example.test',
      sberchat: undefined,
    });
    expect(getMock.mock.calls[0]?.[0]).not.toContain('userId=');
  });

  test('возвращает пустой профиль при ошибке и отменяет запрос при размонтировании', async () => {
    let rejectRequest: (reason: Error) => void = () => undefined;
    getMock.mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          rejectRequest = reject;
        })
    );

    const { result, unmount } = renderHook(() => useProfile('person-1'));
    const signal = getMock.mock.calls[0]?.[1].input.signal;
    unmount();
    expect(signal?.aborted).toBe(true);

    await act(async () => {
      rejectRequest(new Error('network'));
      await Promise.resolve();
    });
    expect(result.current.isLoading).toBe(true);

    getMock.mockRejectedValueOnce(new Error('network'));
    const failed = renderHook(() => useProfile('person-2'));
    await waitFor(() => expect(failed.result.current.isLoading).toBe(false));
    expect(failed.result.current).toEqual({ isLoading: false });
  });
});
