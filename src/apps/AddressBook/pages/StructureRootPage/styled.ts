import styled from 'styled-components';

export const Page = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

export const Header = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const SummaryLine = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: 4,
  color: theme.tokens.current.core.text.secondary,
}));

export const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 24,
});

export const CardButton = styled.button(({ theme }) => ({
  minHeight: 136,
  padding: 32,
  borderRadius: 20,
  border: `1px solid ${theme.tokens.current.core.border.gentle}`,
  background: '#edf1ed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  textAlign: 'left',
  cursor: 'pointer',
}));

export const CenteredState = styled.div(({ theme }) => ({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.tokens.current.core.layer['01'],
  borderRadius: 20,
  padding: 32,
}));
