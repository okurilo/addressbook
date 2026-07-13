import styled from 'styled-components';

export const Actions = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
}));

export const ActionLink = styled.a(({ theme }) => ({
  minHeight: 32,
  padding: `0 ${16}px`,
  borderRadius: 999,
  border: `1px solid ${theme.tokens.current.border.gentle}`,
  background: theme.tokens.current.layer['01'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.tokens.current.text.primary,
}));

export const ActionButton = styled.button<{ $active?: boolean }>(({ theme, $active = false }) => ({
  minHeight: 32,
  minWidth: 32,
  padding: `0 ${16}px`,
  borderRadius: 999,
  border: `1px solid ${
    $active ? theme.tokens.current.accent.primary : theme.tokens.current.border.gentle
  }`,
  background: $active
    ? theme.tokens.current.accent.secondary
    : theme.tokens.current.layer['01'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: $active
    ? theme.tokens.current.accent.primary
    : theme.tokens.current.text.secondary,
  cursor: 'pointer',
}));

