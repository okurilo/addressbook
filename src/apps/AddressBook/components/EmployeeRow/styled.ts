import styled from 'styled-components';

export const Row = styled.tr<{ $expanded: boolean }>(({ theme, $expanded }) => ({
  borderBottom: `1px solid ${theme.tokens.current.core.border.gentle}`,
  background: $expanded ? theme.tokens.current.core.layer['02'] : 'transparent',
  cursor: 'pointer',
}));

export const Cell = styled.td({
  padding: `${16}px 0`,
  verticalAlign: 'top',
});

export const NameCell = styled.div({
  display: 'grid',
  gridTemplateColumns: '40px minmax(0, 1fr)',
  gap: 16,
  alignItems: 'start',
});

export const PositionCell = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});
