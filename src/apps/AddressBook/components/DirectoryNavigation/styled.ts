import styled from 'styled-components';

export const Nav = styled.nav(({ theme }) => ({
  display: 'flex',
  gap: 32,
  borderBottom: `1px solid ${theme.tokens.current.core.border.gentle}`,
}));

export const NavButton = styled.button<{ $active: boolean }>(({ theme, $active }) => ({
  minHeight: 52,
  padding: 0,
  border: 'none',
  borderBottom: `4px solid ${$active ? theme.tokens.current.core.accent.primary : 'transparent'}`,
  background: 'transparent',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
}));

