import { MainContainerStyled } from './styled';
import { useAdressbookContext } from '../../provider';

export const ConnectCell = ({
  personId,
  isFavorite,
  personalPhone,
}: {
  personId: string;
  isFavorite?: boolean;
  personalPhone?: string;
}) => {
  const { renderActions, favoritePersons, favoriteGroupId } = useAdressbookContext();
  return (
    <MainContainerStyled>
      {renderActions?.(personId, isFavorite, favoritePersons, favoriteGroupId, personalPhone)}
    </MainContainerStyled>
  );
};

