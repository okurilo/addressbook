import styled from 'styled-components';

export const MainContainerStyled = styled('div')({
  position: 'relative',
});

export const ButtonStyled = styled('button')(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 6,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: theme.tokens.current.core.icon.secondary,
}));

