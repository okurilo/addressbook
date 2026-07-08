import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const StyledButton = styled('button')(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.radius.pill,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.surface,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

export type IconButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export const IconButton = ({ children, ...props }: IconButtonProps): JSX.Element => (
  <StyledButton type="button" {...props}>
    {children}
  </StyledButton>
);
