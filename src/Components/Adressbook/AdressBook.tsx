import { People } from './People';
import { MainContainerStyled } from './styled';
import type { AdressbookPerson } from './types';

type AdressBookProps = {
  people: AdressbookPerson[];
  isLoading?: boolean;
  initialExpandedPersonId?: string | null;
};

export const AdressBook = ({
  people,
  isLoading = false,
  initialExpandedPersonId,
}: AdressBookProps) => {
  return (
    <MainContainerStyled>
      <People
        people={people}
        isLoading={isLoading}
        initialExpandedPersonId={initialExpandedPersonId}
      />
    </MainContainerStyled>
  );
};
