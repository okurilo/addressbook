import { useEffect, useState } from 'react';

const FAVORITES_STORAGE_KEY = 'addressbook-favorite-employee-ids';

const readFavoriteIds = (): string[] => {
  const storedValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (storedValue === null) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(storedValue) as unknown;
    if (Array.isArray(parsedValue) && parsedValue.every((item) => typeof item === 'string')) {
      return parsedValue;
    }
  } catch {
    return [];
  }

  return [];
};

export const useFavoriteEmployees = (): {
  favoriteIds: string[];
  toggleFavorite: (employeeId: string) => void;
} => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(readFavoriteIds);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (employeeId: string): void => {
    setFavoriteIds((currentValue) =>
      currentValue.includes(employeeId)
        ? currentValue.filter((item) => item !== employeeId)
        : [...currentValue, employeeId],
    );
  };

  return {
    favoriteIds,
    toggleFavorite,
  };
};
