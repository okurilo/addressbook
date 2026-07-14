import { FC, PropsWithChildren } from 'react';
import { useTheme } from 'styled-components';
import { ButtonStyled } from './styled';
import { Body2Regular } from '../typography';

interface IIconButtonProps {
  onClick: () => void;
  text: string;
}

export const Chip: FC<PropsWithChildren<IIconButtonProps>> = ({ onClick, text, children }) => {
  const theme = useTheme();
  return (
    <ButtonStyled onClick={onClick}>
      {children}
      <Body2Regular color={theme.tokens.current.colors.grey.solid['70']}>{text}</Body2Regular>
    </ButtonStyled>
  );
};

