import styled from 'styled-components';

export const Panel = styled.aside(({ theme }) => ({
  width: 240,
  padding: 24,
  borderRight: `1px solid ${theme.tokens.current.border.gentle}`,
  background: theme.tokens.current.layer['02'],
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

export const ButtonList = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

