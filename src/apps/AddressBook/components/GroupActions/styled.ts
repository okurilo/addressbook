import styled from 'styled-components';

export const Actions = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
});

export const ActionButton = styled.button(({ theme }) => ({
  minHeight: 36,
  padding: '0 16px',
  border: `1px solid ${theme.tokens.current.core.border.gentle}`,
  borderRadius: theme.radii.pill,
  background: theme.tokens.current.core.background.default,
  color: theme.tokens.current.core.text.primary,
  cursor: 'pointer',
  ...theme.typography.body2Semibold,
  '&:disabled': {
    color: theme.tokens.current.core.text.tertiary,
    cursor: 'default',
    opacity: 0.6,
  },
}));

export const Hint = styled.span(({ theme }) => ({
  color: theme.tokens.current.core.text.secondary,
}));

