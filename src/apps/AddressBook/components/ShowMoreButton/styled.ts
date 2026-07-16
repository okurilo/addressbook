import styled from 'styled-components';

export const Button = styled.button(({ theme }) => ({
  minHeight: 44,
  margin: '20px auto',
  padding: '0 24px',
  border: `1px solid ${theme.tokens.current.core.border.gentle}`,
  borderRadius: theme.radii.pill,
  background: theme.tokens.current.core.background.default,
  color: theme.tokens.current.core.text.primary,
  display: 'block',
  cursor: 'pointer',
  ...theme.typography.body2Semibold,
  '&:disabled': {
    color: theme.tokens.current.core.text.tertiary,
    cursor: 'default',
    opacity: 0.7,
  },
}));

