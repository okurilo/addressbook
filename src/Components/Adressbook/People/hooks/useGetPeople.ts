import { useAdressbookContext } from '../../provider';
import { createRowData } from './utils';

export const useGetPeople = () => {
  const { people, isLoading } = useAdressbookContext();

  return { people: createRowData(people), isLoading };
};
