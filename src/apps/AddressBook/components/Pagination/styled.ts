import styled from 'styled-components';

export const PaginationRoot = styled.nav({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  padding: 20,
});

export const PageButton = styled.button(({ theme }) => ({
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
