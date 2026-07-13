import styled from 'styled-components';

export const Table = styled.table({
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
});

export const HeadCell = styled.th(({ theme }) => ({
  padding: `${8}px 0 ${16}px`,
  textAlign: 'left',
  color: theme.tokens.current.core.text.secondary,
  fontWeight: 500,
  borderBottom: `1px solid ${theme.tokens.current.core.border.gentle}`,
}));

export const DetailsRow = styled.tr(({ theme }) => ({
  background: theme.tokens.current.core.layer['02'],
  borderBottom: `1px solid ${theme.tokens.current.core.border.gentle}`,
}));

export const DetailsCell = styled.td({
  padding: 0,
});

export const DetailsPanel = styled.section(({ theme }) => ({
  position: 'relative',
  padding: '24px 32px 32px',
  borderTop: `1px solid ${theme.tokens.current.core.border.gentle}`,
}));

export const DetailsBreadcrumbs = styled.div(({ theme }) => ({
  maxWidth: 'calc(100% - 48px)',
  marginBottom: 24,
  ...theme.typography.caption1Regular,
  color: theme.tokens.current.core.text.secondary,
}));

export const CloseButton = styled.button(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 24,
  width: 32,
  height: 32,
  border: 'none',
  borderRadius: theme.radii.pill,
  background: 'transparent',
  color: theme.tokens.current.core.icon.secondary,
  ...theme.typography.h4Semibold,
  lineHeight: '32px',
  cursor: 'pointer',
}));

export const Profile = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 16,
});

export const ProfileContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

export const StatusLine = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginTop: 6,
});

export const StatusMarker = styled.span<{ $color: string }>(({ $color }) => ({
  width: 8,
  height: 8,
  borderRadius: 999,
  background: $color,
  flexShrink: 0,
}));

export const Tabs = styled.div({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  margin: '24px 0',
});

export const Tab = styled.button<{ $active?: boolean }>(({ theme, $active = false }) => ({
  minHeight: 32,
  padding: '0 16px',
  borderRadius: theme.radii.pill,
  border: `1px solid ${
    $active ? theme.tokens.current.core.text.primary : theme.tokens.current.core.border.gentle
  }`,
  background: $active ? theme.tokens.current.core.text.primary : theme.tokens.current.core.layer['01'],
  color: $active ? theme.tokens.current.core.text.onColor : theme.tokens.current.core.text.primary,
  ...theme.typography.body2Semibold,
  cursor: 'default',
}));

export const DetailsGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '24px 48px',
  maxWidth: 760,
});

export const DetailsSection = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const DefinitionList = styled.dl({
  display: 'grid',
  gridTemplateColumns: '120px minmax(0, 1fr)',
  gap: '10px 16px',
  margin: 0,
});

export const DefinitionTerm = styled.dt(({ theme }) => ({
  ...theme.typography.body2Regular,
  color: theme.tokens.current.core.text.secondary,
}));

export const DefinitionDescription = styled.dd(({ theme }) => ({
  margin: 0,
  ...theme.typography.body2Semibold,
  color: theme.tokens.current.core.text.primary,
}));

export const ContactLink = styled.a(({ theme }) => ({
  color: theme.tokens.current.core.text.primary,
  textDecoration: 'none',
}));
