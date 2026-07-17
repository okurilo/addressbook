import type { PropsWithChildren } from 'react';
import { renderHook } from '../../test-utils/test-utils';
import { AdressbookProvider, useAdressbookContext } from './provider';
import type { AdressbookPerson } from './types';

const people: AdressbookPerson[] = [{ personUuid: 'person-1' }];

describe('AdressbookProvider', () => {
  test('передаёт данные и значения по умолчанию через контекст', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <AdressbookProvider people={people}>{children}</AdressbookProvider>
    );
    const { result } = renderHook(() => useAdressbookContext(), { wrapper });

    expect(result.current.enabled).toBe(true);
    expect(result.current.people).toBe(people);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.favoritePersons).toBeUndefined();
  });

  test('выбрасывает понятную ошибку вне провайдера', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      expect(() => renderHook(() => useAdressbookContext())).toThrow(
        'AdressBook must be rendered inside AdressbookProvider'
      );
    } finally {
      consoleError.mockRestore();
    }
  });
});
