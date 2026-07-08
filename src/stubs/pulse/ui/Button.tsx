import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const StyledButton = styled('button')<{
  $appearance: 'primary' | 'secondary' | 'ghost';
}>(({ theme, $appearance }) => ({
  minHeight: 40,
  padding: `0 ${theme.spacing.md}px`,
  borderRadius: theme.radius.md,
  border: `1px solid ${
    $appearance === 'primary' ? theme.colors.accent : theme.colors.border
  }`,
  background:
    $appearance === 'primary'
      ? theme.colors.accent
      : $appearance === 'secondary'
        ? theme.colors.surface
        : 'transparent',
  color: $appearance === 'primary' ? '#ffffff' : theme.colors.textPrimary,
  cursor: 'pointer',
}));

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    appearance?: 'primary' | 'secondary' | 'ghost';
  }
>;

export const Button = ({
  appearance = 'secondary',
  children,
  ...props
}: ButtonProps): JSX.Element => (
  <StyledButton type="button" $appearance={appearance} {...props}>
    {children}
  </StyledButton>
);
