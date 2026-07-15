import { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';
import type { AdressbookPerson } from './types';

type AdressbookContextValue = {
  enabled: boolean;
  people: AdressbookPerson[];
  isLoading: boolean;
  renderActions?: (personId: string) => ReactNode;
};

type AdressbookProviderProps = PropsWithChildren<{
  enabled?: boolean;
  people: AdressbookPerson[];
  isLoading?: boolean;
  renderActions?: (personId: string) => ReactNode;
}>;

const AdressbookContext = createContext<AdressbookContextValue | null>(null);

export const AdressbookProvider = ({
  children,
  enabled = true,
  people,
  isLoading = false,
  renderActions,
}: AdressbookProviderProps): JSX.Element => {
  const value = useMemo<AdressbookContextValue>(
    () => ({ enabled, people, isLoading, renderActions }),
    [enabled, people, isLoading, renderActions]
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
