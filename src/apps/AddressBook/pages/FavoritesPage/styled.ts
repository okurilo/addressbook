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

export const FilterChip = styled.div(({ theme }) => ({
  minHeight: 32,
  width: 'fit-content',
  padding: `0 ${16}px`,
  borderRadius: 999,
  background: theme.tokens.current.core.accent.secondary,
  color: theme.tokens.current.core.accent.primary,
  display: 'inline-flex',
  alignItems: 'center',
  fontWeight: 600,
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

