import { People } from './People';
import { MainContainerStyled } from './styled';
import type { AdressbookPerson } from './types';

type AdressBookProps = {
  people: AdressbookPerson[];
  isLoading?: boolean;
  initialExpandedPersonId?: string | null;
  favoritePersonIds?: string[];
  onToggleFavorite?: (personId: string) => void;
};

export const AdressBook = ({
  people,
  isLoading = false,
  initialExpandedPersonId,
  favoritePersonIds = [],
  onToggleFavorite,
}: AdressBookProps) => {
  return (
    <MainContainerStyled>
      <People
        people={people}
        isLoading={isLoading}
        initialExpandedPersonId={initialExpandedPersonId}
        favoritePersonIds={favoritePersonIds}
        onToggleFavorite={onToggleFavorite}
      />
    </MainContainerStyled>
  );
};
