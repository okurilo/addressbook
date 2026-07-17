import { act, renderHook, waitFor } from '../../../test-utils/test-utils';
import type { PropsWithChildren } from 'react';
import {
  FavoriteEmployeesProvider,
  useFavoriteEmployees,
} from './useFavoriteEmployees';
import {
  addFavoriteEmployee,
  fetchFavoriteEmployees,
  removeFavoriteEmployee,
} from '../api/directory/client';
import type { Employee } from '../api/directory/types';

jest.mock('../api/directory/client', () => ({
  addFavoriteEmployee: jest.fn(),
  fetchFavoriteEmployees: jest.fn(),
  removeFavoriteEmployee: jest.fn(),
}));

const fetchFavoritesMock = fetchFavoriteEmployees as jest.MockedFunction<
  typeof fetchFavoriteEmployees
>;
const addFavoriteMock = addFavoriteEmployee as jest.MockedFunction<typeof addFavoriteEmployee>;
const removeFavoriteMock = removeFavoriteEmployee as jest.MockedFunction<
  typeof removeFavoriteEmployee
>;
const wrapper = ({ children }: PropsWithChildren) => (
  <FavoriteEmployeesProvider>{children}</FavoriteEmployeesProvider>
);
const employee = (id: string): Employee => ({
  id,
  fullName: id,
  subtitle: '',
  avatarInitials: '',
  status: 'available',
  shortStructure: '',
  departmentId: '',
  departmentName: '',
  position: '',
  employeeNumber: '',
  phone: null,
  mobilePhone: null,
  email: '',
  workplace: '',
  managerName: '',
  contacts: [],
});

describe('FavoriteEmployeesProvider', () => {
  beforeEach(() => {
    fetchFavoritesMock.mockReset();
    addFavoriteMock.mockReset();
    removeFavoriteMock.mockReset();
  });

  test('загружает начальное избранное', async () => {
    fetchFavoritesMock.mockResolvedValueOnce([employee('person-1')]);
    const { result } = renderHook(() => useFavoriteEmployees(), { wrapper });

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.favoriteIds).toEqual(['person-1']);
  });

  test('сохраняет пустой список при ошибке загрузки', async () => {
    fetchFavoritesMock.mockRejectedValueOnce(new Error('network'));
    const { result } = renderHook(() => useFavoriteEmployees(), { wrapper });

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.favoriteIds).toEqual([]);
  });

  test('оптимистично добавляет и удаляет сотрудника', async () => {
    fetchFavoritesMock.mockResolvedValueOnce([]);
    addFavoriteMock.mockResolvedValueOnce(undefined);
    removeFavoriteMock.mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useFavoriteEmployees(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    await act(async () => result.current.toggleFavorite('person-1'));
    expect(result.current.favoriteIds).toEqual(['person-1']);
    expect(addFavoriteMock).toHaveBeenCalledWith('person-1');

    await act(async () => result.current.toggleFavorite('person-1'));
    expect(result.current.favoriteIds).toEqual([]);
    expect(removeFavoriteMock).toHaveBeenCalledWith('person-1');
  });

  test('откатывает состояние при ошибках мутаций', async () => {
    fetchFavoritesMock.mockResolvedValueOnce([]);
    addFavoriteMock.mockRejectedValueOnce(new Error('add failed'));
    const { result } = renderHook(() => useFavoriteEmployees(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    await act(async () => {
      await expect(result.current.toggleFavorite('person-1')).rejects.toThrow('add failed');
    });
    expect(result.current.favoriteIds).toEqual([]);

    addFavoriteMock.mockResolvedValueOnce(undefined);
    await act(async () => result.current.toggleFavorite('person-1'));
    removeFavoriteMock.mockRejectedValueOnce(new Error('remove failed'));
    await act(async () => {
      await expect(result.current.toggleFavorite('person-1')).rejects.toThrow('remove failed');
    });
    expect(result.current.favoriteIds).toEqual(['person-1']);
  });

  test('требует провайдер', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      expect(() => renderHook(() => useFavoriteEmployees())).toThrow(
        'useFavoriteEmployees must be used within FavoriteEmployeesProvider'
      );
    } finally {
      consoleError.mockRestore();
    }
  });
});
