import { FC, PropsWithChildren } from 'react';
import { ButtonStyled } from './styled';

interface IIconButtonProps {
  onClick?: () => void;
  color?: string;
}

export const IconButton: FC<PropsWithChildren<IIconButtonProps>> = ({
  onClick,
  color,
  children,
}) => {
  return (
    <ButtonStyled color={color} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

