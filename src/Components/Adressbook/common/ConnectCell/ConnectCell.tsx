import { MainContainerStyled } from './styled';
import { useAdressbookContext } from '../../provider';

export const ConnectCell = ({ personId }: { personId: string }) => {
  const { renderActions } = useAdressbookContext();

  return <MainContainerStyled>{renderActions?.(personId)}</MainContainerStyled>;
};

