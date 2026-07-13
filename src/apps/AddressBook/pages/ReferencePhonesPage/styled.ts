import styled from 'styled-components';

export const Page = styled.section(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '248px minmax(0, 1fr)',
  gap: 24,
  alignItems: 'start',
}));

export const Sidebar = styled.aside(({ theme }) => ({
  background: theme.tokens.current.layer['01'],
  borderRadius: theme.radii.lg,
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

export const SidebarButton = styled.button<{ $active: boolean }>(({ theme, $active }) => ({
  minHeight: 48,
  border: `1px solid ${
    $active ? theme.tokens.current.border.interactive : 'transparent'
  }`,
  borderRadius: theme.radii.md,
  background: $active
    ? theme.tokens.current.accent.secondary
    : 'transparent',
  padding: '12px 16px',
  textAlign: 'left',
  cursor: 'pointer',
  color: $active
    ? theme.tokens.current.text.primary
    : theme.tokens.current.text.secondary,
  ...theme.typography.body1Regular,
  fontWeight: $active
    ? theme.typography.body1Semibold.fontWeight
    : theme.typography.body1Regular.fontWeight,
}));

export const Content = styled.section(({ theme }) => ({
  background: theme.tokens.current.layer['01'],
  borderRadius: theme.radii.lg,
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));

export const Table = styled.table({
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
});

export const HeadCell = styled.th(({ theme }) => ({
  padding: `${8}px 0 ${16}px`,
  textAlign: 'left',
  color: theme.tokens.current.text.secondary,
  fontWeight: 500,
  borderBottom: `1px solid ${theme.tokens.current.border.gentle}`,
}));

export const Row = styled.tr(({ theme }) => ({
  borderBottom: `1px solid ${theme.tokens.current.border.gentle}`,
}));

export const Cell = styled.td(({ theme }) => ({
  padding: `${16}px 0`,
  verticalAlign: 'top',
}));

export const ServiceCell = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '40px minmax(0, 1fr)',
  gap: 16,
  alignItems: 'start',
}));

export const ServiceAvatar = styled.div<{ $accentColor: string }>(({ theme, $accentColor }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.radii.pill,
  background: $accentColor,
  color: theme.tokens.current.text.onColor,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
}));

export const ActionCell = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 8,
  flexWrap: 'wrap',
}));

export const ActionLink = styled.a(({ theme }) => ({
  minHeight: 32,
  padding: `0 ${16}px`,
  borderRadius: theme.radii.pill,
  border: `1px solid ${theme.tokens.current.border.gentle}`,
  background: theme.tokens.current.layer['01'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.tokens.current.text.primary,
}));

export const ActionButton = styled.button(({ theme }) => ({
  minHeight: 32,
  padding: `0 ${16}px`,
  borderRadius: theme.radii.pill,
  border: `1px solid ${theme.tokens.current.border.gentle}`,
  background: theme.tokens.current.layer['01'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.tokens.current.text.secondary,
  cursor: 'pointer',
}));

export const CenteredState = styled.div(({ theme }) => ({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.tokens.current.layer['01'],
  borderRadius: theme.radii.lg,
  padding: 32,
}));
