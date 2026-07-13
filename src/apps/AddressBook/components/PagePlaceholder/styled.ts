import styled from 'styled-components';

export const Wrapper = styled.section(({ theme }) => ({
  minHeight: 360,
  padding: 32,
  borderTop: `1px dashed ${theme.tokens.current.border.gentle}`,
  background: theme.tokens.current.layer['01'],
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  justifyContent: 'center',
}));

