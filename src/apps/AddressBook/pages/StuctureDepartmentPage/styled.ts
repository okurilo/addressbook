import styled from 'styled-components';

export const Page = styled.section(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '280px minmax(0, 1fr)',
  gap: 32,
  alignItems: 'start',
}));

export const Sidebar = styled.aside(({ theme }) => ({
  background: theme.tokens.current.core.background.default,
  borderRadius: 20,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

export const SidebarButton = styled.button<{ $active?: boolean }>(
  ({ theme, $active = false }) => ({
    border: 'none',
    background: 'transparent',
    padding: 0,
    textAlign: 'left',
    cursor: 'pointer',
    color: $active ? theme.tokens.current.core.text.primary : theme.tokens.current.core.text.secondary,
    fontWeight: $active ? 600 : 400,
    lineHeight: 1.45,
  })
);

export const Content = styled.section(({ theme }) => ({
  background: theme.tokens.current.core.background.default,
  borderRadius: 20,
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));

export const Breadcrumbs = styled.div(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  alignItems: 'center',
}));

export const BreadcrumbButton = styled.button(({ theme }) => ({
  border: 'none',
  background: 'transparent',
  padding: 0,
  color: theme.tokens.current.core.text.secondary,
  cursor: 'pointer',
}));

export const SummaryLine = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: 4,
}));

export const Divider = styled.div(({ theme }) => ({
  borderTop: `1px solid ${theme.tokens.current.core.border.gentle}`,
}));

export const CenteredState = styled.div(({ theme }) => ({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.tokens.current.core.background.default,
  borderRadius: 20,
  padding: 32,
}));

