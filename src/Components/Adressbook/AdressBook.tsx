import { People } from './People';
import { useAdressbookContext } from './provider';
import { MainContainerStyled } from './styled';

export const AdressBook = () => {
  const { enabled } = useAdressbookContext();

  if (enabled)
    return (
      <MainContainerStyled>
        <People />
      </MainContainerStyled>
    );

  return null;
};

