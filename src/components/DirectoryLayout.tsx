import type { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { DirectoryHeader } from './DirectoryHeader';
import { DirectoryNavigation } from './DirectoryNavigation';
import { DirectorySearch } from './DirectorySearch';

const LayoutRoot = styled('div')(({ theme }) => ({
  maxWidth: 1600,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xl,
}));

const Content = styled('section')({
  minHeight: 420,
});

export const DirectoryLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <LayoutRoot>
    <DirectoryHeader />
    <DirectorySearch />
    <DirectoryNavigation />
    <Content>{children}</Content>
  </LayoutRoot>
);
