import styled from 'styled-components';

export const Section = styled.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));

export const SectionHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
}));

export const Surface = styled.div(({ theme }) => ({
  background: theme.tokens.current.core.layer['01'],
  borderRadius: 20,
}));

export const CenteredState = styled.div(({ theme }) => ({
  minHeight: 220,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 32,
}));

export const HistoryList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 0',
});

export const HistoryItemButton = styled.button(({ theme }) => ({
  width: '100%',
  minHeight: 64,
  padding: '12px 24px',
  border: 'none',
  borderBottom: `1px solid ${theme.tokens.current.core.border.gentle}`,
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: 4,
  textAlign: 'left',
  color: theme.tokens.current.core.text.primary,
  cursor: 'pointer',
  '&:last-child': {
    borderBottom: 'none',
  },
  '&:hover, &:focus-visible': {
    background: theme.tokens.current.core.layer['02'],
    outline: 'none',
  },
}));
