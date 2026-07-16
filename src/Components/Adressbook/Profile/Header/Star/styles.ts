import styled from 'styled-components';

export const PopoverContainer = styled('div')<{ $visible: boolean }>(({ $visible, theme }) => ({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  background: theme.tokens.current.core.background.default,
  border: `1px solid ${theme.tokens.current.core.border.gentle}`,
  borderRadius: '6px',
  padding: '8px 0',
  minWidth: 180,
  zIndex: 1000,
  display: $visible ? 'block' : 'none',
  boxShadow: theme.tokens.current.shadows.small,
  cursor: 'pointer',
}));

export const PopoverItem = styled('div')<{ $added?: boolean }>(({ theme, $added }) => ({
  padding: '8px 16px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  ...(!!$added && {
    color: theme.tokens.current.core.accent.primary,
  }),
}));

export const NoGroups = styled('div')(({ theme }) => ({
  padding: '12px 16px',
  color: theme.tokens.current.colors.grey.solid['70'],
}));

export const AddedText = styled('span')(() => ({
  fontSize: '12px',
}));
