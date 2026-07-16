import styled from 'styled-components';

export const LayoutRoot = styled.div(({ theme }) => ({
  maxWidth: 1600,
  height: 'calc(100vh - 64px)',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  overflow: 'hidden',
}));

export const Content = styled.section({
  minHeight: 0,
  flex: 1,
  overflowY: 'auto',
  paddingBottom: 24,
});

