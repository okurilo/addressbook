import { createRowData } from './utils';
import type { AdressbookPerson } from '../../types';
import type { PersonRow } from '../types';

type UseGetPeopleResult = {
  people: PersonRow[];
  isLoading: boolean;
};

export const useGetPeople = (
  people: AdressbookPerson[],
  isLoading = false,
  favoritePersonIds: string[] = []
): UseGetPeopleResult => ({
  people: createRowData(people, favoritePersonIds),
  isLoading,
});
