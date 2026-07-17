import styled from 'styled-components';

export const ButtonStyled = styled.button(({ theme }) => ({
  background: theme.tokens.current.colors.grey.solid['10'],
  borderRadius: 4,
  cursor: 'pointer',
  width: 'fit-content',
  height: 24,
  padding: 4,
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  color: theme.tokens.current.colors.grey.solid['50'],
  gap: 4,
}));
