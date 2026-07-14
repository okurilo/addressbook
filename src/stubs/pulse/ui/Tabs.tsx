import type { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';

export type Type = 'primary' | 'secondary' | 'tertiary' | 'description';
export type States = 'active' | 'hover' | 'focus' | 'selected' | 'pressed';

type BaseTabsProps = PropsWithChildren<{
  $type: Type;
  selectedIndex?: number;
  onTabChange?: (event: MouseEvent<HTMLElement>, selectedId: number) => void;
}>;

export type TabsProps =
  | (BaseTabsProps & { $type: 'tertiary'; isVerticalMode?: boolean })
  | (BaseTabsProps & { $type: 'primary' | 'secondary' | 'description'; isVerticalMode?: never });

type TabBaseProps = {
  $isActive?: boolean;
  $type?: Type;
  $state?: States;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
};

export type TabProps = TabBaseProps &
  ({ description?: never; $badge?: boolean } | { description: string; $badge?: never });

const TabsRoot = styled.div<{ $vertical: boolean }>(({ $vertical }) => ({
  display: 'flex',
  flexDirection: $vertical ? 'column' : 'row',
  gap: 8,
}));

const TabButton = styled.button<{ $active: boolean }>(({ theme, $active }) => ({
  minHeight: 36,
  padding: '0 16px',
  border: 0,
  borderRadius: theme.radii.pill,
  background: $active
    ? theme.tokens.current.core.text.primary
    : theme.tokens.current.core.layer['02'],
  color: $active
    ? theme.tokens.current.core.text.onColor
    : theme.tokens.current.core.text.primary,
  cursor: 'pointer',
  ...theme.typography.body2Semibold,
}));

export const Tabs = (props: TabsProps): JSX.Element => {
  const isVerticalMode = 'isVerticalMode' in props ? props.isVerticalMode ?? false : false;

  return (
    <TabsRoot $vertical={isVerticalMode} role="tablist">
      {props.children}
    </TabsRoot>
  );
};

export const Tab = ({ $isActive = false, children, onClick }: TabProps): JSX.Element => (
  <TabButton $active={$isActive} aria-selected={$isActive} onClick={onClick} role="tab" type="button">
    {children}
  </TabButton>
);
