import { createTestWrapper, renderHook } from '../../test-utils';
import type { AdressbookPerson } from '../../types';
import { useGetPeople } from './useGetPeople';

describe('useGetPeople', () => {
  test('возвращает подготовленные строки и состояние загрузки', () => {
    const people: AdressbookPerson[] = [
      { personUuid: 'person-1', pbasic: { fullName: 'Иван Петров' } },
    ];
    const wrapper = createTestWrapper({ addressbook: { people, isLoading: true } });
    const { result } = renderHook(() => useGetPeople(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.people).toEqual([
      expect.objectContaining({ pid: 'person-1', nameCell: expect.objectContaining({ name: 'Иван Петров' }) }),
    ]);
  });
});
