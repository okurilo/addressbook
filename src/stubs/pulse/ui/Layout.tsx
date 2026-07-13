import type { HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

const ContentRoot = styled.div({
  minHeight: '100vh',
  padding: '32px 40px',
});

export type ContentProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export const Content = ({ children, ...props }: ContentProps): JSX.Element => (
  <ContentRoot {...props}>{children}</ContentRoot>
);
