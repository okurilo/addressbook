import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

export interface ContentProps {
  compact?: boolean;
}

const SnackbarContent = styled.div<{ $compact: boolean }>(({ theme, $compact }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: $compact ? '8px 12px' : '12px 16px',
  borderRadius: theme.radii.md,
  background: theme.tokens.current.core.text.primary,
  color: theme.tokens.current.core.text.onColor,
}));

export const Content = ({ compact = false, children }: PropsWithChildren<ContentProps>): JSX.Element => (
  <SnackbarContent $compact={compact}>{children}</SnackbarContent>
);

export const Text = ({ children }: PropsWithChildren): JSX.Element => <span>{children}</span>;
