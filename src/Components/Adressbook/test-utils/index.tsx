import type { PropsWithChildren, ReactNode } from 'react';
import { AdressbookProvider } from '../provider';
import type { AdressbookPerson } from '../types';

export type AddressbookTestProviderProps = PropsWithChildren<{
  enabled?: boolean;
  people?: AdressbookPerson[];
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

export const AddressbookTestProvider = ({
  children,
  people = [],
  ...providerProps
}: AddressbookTestProviderProps): JSX.Element => (
  <AdressbookProvider people={people} {...providerProps}>
    {children}
  </AdressbookProvider>
);
