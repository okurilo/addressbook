import { forwardRef } from 'react';
import type { PropsWithChildren } from 'react';
import { ButtonStyled } from './styled';

interface IIconButtonProps {
  onClick?: () => void;
  color?: string;
}

export const IconButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<IIconButtonProps>
>(({ onClick, color, children }, ref) => {
  return (
    <ButtonStyled ref={ref} color={color} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
});
