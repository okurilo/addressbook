import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  addFavoriteEmployee,
  fetchFavoriteEmployees,
  removeFavoriteEmployee,
} from '../api/directory/client';

type FavoriteEmployeesContextValue = {
  favoriteIds: string[];
  isReady: boolean;
  toggleFavorite: (employeeId: string) => Promise<void>;
};

const FavoriteEmployeesContext = createContext<FavoriteEmployeesContextValue | null>(null);

export const FavoriteEmployeesProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadFavorites = async (): Promise<void> => {
      try {
        const favorites = await fetchFavoriteEmployees();

        if (!isActive) {
          return;
        }

        setFavoriteIds(favorites.map((employee) => employee.id));
      } catch {
        if (!isActive) {
          return;
        }

        setFavoriteIds([]);
      } finally {
        if (isActive) {
          setIsReady(true);
        }
      }
    };

    void loadFavorites();

    return () => {
      isActive = false;
    };
  }, []);

  const value = useMemo<FavoriteEmployeesContextValue>(
    () => ({
      favoriteIds,
      isReady,
      toggleFavorite: async (employeeId: string): Promise<void> => {
        const isFavorite = favoriteIds.includes(employeeId);

        if (isFavorite) {
          setFavoriteIds((currentValue) => currentValue.filter((item) => item !== employeeId));

          try {
            await removeFavoriteEmployee(employeeId);
          } catch (error) {
            setFavoriteIds((currentValue) =>
              currentValue.includes(employeeId) ? currentValue : [...currentValue, employeeId]
            );
            throw error;
          }

          return;
        }

        setFavoriteIds((currentValue) =>
          currentValue.includes(employeeId) ? currentValue : [...currentValue, employeeId]
        );

        try {
          await addFavoriteEmployee(employeeId);
        } catch (error) {
          setFavoriteIds((currentValue) => currentValue.filter((item) => item !== employeeId));
          throw error;
        }
      },
    }),
    [favoriteIds, isReady]
  );

  return (
    <FavoriteEmployeesContext.Provider value={value}>{children}</FavoriteEmployeesContext.Provider>
  );
};

export const useFavoriteEmployees = (): FavoriteEmployeesContextValue => {
  const context = useContext(FavoriteEmployeesContext);

  if (context === null) {
    throw new Error('useFavoriteEmployees must be used within FavoriteEmployeesProvider');
  }

  return context;
};

