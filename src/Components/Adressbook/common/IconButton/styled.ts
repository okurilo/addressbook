import styled from 'styled-components';

export const ButtonStyled = styled('button')(({ theme, color }) => ({
  padding: 0,
  background: theme.tokens.current.colors.grey.solid['10'],
  borderRadius: 4,
  cursor: 'pointer',
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  color: color || 'initial',
}));

