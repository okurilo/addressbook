import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';
import type { AdressbookPerson } from './types';

type AdressbookContextValue = {
  enabled: boolean;
  people: AdressbookPerson[];
  isLoading: boolean;
  renderActions?: (
    personId: string,
    isFavorite?: boolean,
    favoritePersons?: Set<string>,
    favoriteGroupId?: string,
    personalPhone?: string
  ) => ReactNode;
  favoritePersons: Set<string> | undefined;
  favoriteGroupId: string | undefined;
  setFavoritePersons: (s: Set<string> | undefined) => void;
  setFavoriteGroupId: (id: string | undefined) => void;
  onPersonOpen?: (personId: string) => void;
};

type AdressbookProviderProps = PropsWithChildren<{
  enabled?: boolean;
  people: AdressbookPerson[];
  isLoading?: boolean;
  onPersonOpen?: (personId: string) => void;
  renderActions?: (
    personId: string,
    isFavorite?: boolean,
    favoritePersons?: Set<string>,
    favoriteGroupId?: string,
    personalPhone?: string
  ) => ReactNode;
}>;

const AdressbookContext = createContext<AdressbookContextValue | null>(null);

export const AdressbookProvider = ({
  children,
  enabled = true,
  people,
  isLoading = false,
  onPersonOpen,
  renderActions,
}: AdressbookProviderProps): JSX.Element => {
  const [favoritePersons, setFavoritePersons] = useState<Set<string> | undefined>(undefined);
  const [favoriteGroupId, setFavoriteGroupId] = useState<string | undefined>(undefined);

  const value = useMemo<AdressbookContextValue>(
    () => ({
      enabled,
      people,
      isLoading,
      onPersonOpen,
      renderActions,
      favoritePersons,
      favoriteGroupId,
      setFavoritePersons,
      setFavoriteGroupId,
    }),
    [
      enabled,
      people,
      isLoading,
      onPersonOpen,
      renderActions,
      favoritePersons,
      favoriteGroupId,
      setFavoritePersons,
      setFavoriteGroupId,
    ]
  );

  return <AdressbookContext.Provider value={value}>{children}</AdressbookContext.Provider>;
};

export const useAdressbookContext = (): AdressbookContextValue => {
  const context = useContext(AdressbookContext);

  if (context === null) {
    throw new Error('AdressBook must be rendered inside AdressbookProvider');
  }

  return context;
};
