import { useTheme } from 'styled-components';
import { FC } from 'react';
import { Body2Regular } from '../typography';
import { MainContainerStyled } from './styled';

interface IPositionCellProps {
  position: string;
  block: string;
}

export const PositionCell: FC<IPositionCellProps> = ({ position, block }) => {
  const theme = useTheme();
  return (
    <MainContainerStyled>
      <Body2Regular>{position}</Body2Regular>
      <Body2Regular color={theme.tokens?.current.core.text.secondary}>{block}</Body2Regular>
    </MainContainerStyled>
  );
};

