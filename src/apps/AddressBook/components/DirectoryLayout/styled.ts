import styled from 'styled-components';

export const LayoutRoot = styled.div(({ theme }) => ({
  maxWidth: 1600,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}));

export const Content = styled.section({
  minHeight: 420,
});

