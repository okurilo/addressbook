import styled from 'styled-components';

export const Wrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  padding: 32,
  textAlign: 'center',
  minHeight: 220,
}));

