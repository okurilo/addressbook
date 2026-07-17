import styled from 'styled-components';

export const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export const Header = styled.h1(({ theme }) => ({
  ...theme.typography.h1Bold,
  marginTop: 0,
  marginBottom: 24,

  // [`@media ${theme.mediaQueries.min320}`]: {
  //   marginBottom: 40,
  // },
  // [`@media ${theme.mediaQueries.min480}`]: {
  //   marginBottom: 80,
  // },
}));
