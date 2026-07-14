import { createRowData } from './utils';
import type { AdressbookPerson } from '../../types';

export const useGetPeople = (people: AdressbookPerson[], isLoading = false) => ({
  people: createRowData(people),
  isLoading,
});
