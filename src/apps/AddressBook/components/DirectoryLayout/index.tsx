import type { PropsWithChildren } from 'react';
import { DirectoryHeader } from '../DirectoryHeader';
import { DirectoryNavigation } from '../DirectoryNavigation';
import { DirectorySearch } from '../DirectorySearch';
import { LayoutRoot, Content } from './styled';

export const DirectoryLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <LayoutRoot>
    <DirectoryHeader />
    <DirectorySearch />
    <DirectoryNavigation />
    <Content>{children}</Content>
  </LayoutRoot>
);

