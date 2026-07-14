/// <reference types="vite/client" />

import type { ComponentType } from 'react';
import type { MultiSearchPerson } from '../../api/directory/search';

type ImportedAdressbookModule = {
  AdressBook: ComponentType<{
    people: MultiSearchPerson[];
    isLoading?: boolean;
    initialExpandedPersonId?: string | null;
    favoritePersonIds?: string[];
    onToggleFavorite?: (personId: string) => void;
  }>;
};

type ImportedAdressbookProps = {
  people: MultiSearchPerson[];
  isLoading?: boolean;
  initialExpandedEmployeeId?: string | null;
  favoritePersonIds?: string[];
  onToggleFavorite?: (personId: string) => void;
};

const importedModules = import.meta.glob<ImportedAdressbookModule>(
  '../../../../Components/Adressbook/index.ts',
  { eager: true }
);
const ImportedAdressbookComponent = Object.values(importedModules)[0]?.AdressBook;

if (ImportedAdressbookComponent === undefined) {
  throw new Error('Imported Adressbook component was not found');
}

export const ImportedAdressbook = ({
  people,
  isLoading = false,
  initialExpandedEmployeeId,
  favoritePersonIds = [],
  onToggleFavorite,
}: ImportedAdressbookProps): JSX.Element => (
  <ImportedAdressbookComponent
    people={people}
    isLoading={isLoading}
    initialExpandedPersonId={initialExpandedEmployeeId}
    favoritePersonIds={favoritePersonIds}
    onToggleFavorite={onToggleFavorite}
  />
);
