import styled from 'styled-components';

export const ButtonStyled = styled('button')(({ theme, color }) => ({
  padding: 4,
  background: theme.tokens.current.colors.grey.solid['10'],
  borderRadius: 4,
  cursor: 'pointer',
  width: 'fit-content',
  boxSizing: 'border-box',
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  border: 'none',
  color: color || 'initial',
}));
