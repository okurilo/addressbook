import type { FC } from 'react';
import { Body2Regular } from '../typography';
import { MainContainerStyled } from './styled';

interface IStructureCellProps {
  structure: string;
}
export const StructureCell: FC<IStructureCellProps> = ({ structure }) => {
  return (
    <MainContainerStyled>
      <Body2Regular>{structure}</Body2Regular>
    </MainContainerStyled>
  );
};
