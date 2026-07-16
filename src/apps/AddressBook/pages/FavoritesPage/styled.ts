import styled from 'styled-components';

export const Page = styled.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));

export const Header = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

export const GroupTabs = styled.div(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
}));

export const GroupTab = styled.button<{ $active: boolean }>(({ theme, $active }) => ({
  minHeight: 32,
  width: 'fit-content',
  padding: `0 ${16}px`,
  borderRadius: 16,
  border: `1px solid ${
    $active ? theme.tokens.current.core.accent.primary : theme.tokens.current.core.border.gentle
  }`,
  background: 'none',
  color: $active
    ? theme.tokens.current.core.accent.primary
    : theme.tokens.current.core.text.secondary,
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  ...theme.typography.body2Semibold,
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

