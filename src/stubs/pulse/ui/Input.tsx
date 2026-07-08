import type { InputHTMLAttributes } from 'react';
import { styled } from 'styled-components';

const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  minHeight: 44,
  padding: `0 ${theme.spacing.md}px`,
  borderRadius: theme.radius.md,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.surface,
}));

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps): JSX.Element => <StyledInput {...props} />;
