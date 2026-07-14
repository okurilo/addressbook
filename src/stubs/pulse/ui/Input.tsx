import type { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export type Suggestion = {
  key: string;
  value: string;
  [key: string]: unknown;
};

const StyledInput = styled.input(({ theme }) => ({
  width: '100%',
  minHeight: 44,
  padding: '0 16px',
  borderRadius: theme.radii.md,
  border: `1px solid ${theme.tokens.current.core.border.gentle}`,
  background: theme.tokens.current.core.layer['01'],
  color: theme.tokens.current.core.text.primary,
}));

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  suggestions?: string[] | Suggestion[];
  onSuggestionSelect?: (value: string | Suggestion) => void;
  placeWhereUsed?: 'body' | 'modal';
};

export const Input = ({
  suggestions: _suggestions,
  onSuggestionSelect: _onSuggestionSelect,
  placeWhereUsed: _placeWhereUsed,
  ...props
}: InputProps): JSX.Element => <StyledInput {...props} />;
