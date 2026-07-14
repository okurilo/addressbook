import type { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';

export type TabsType = 'primary' | 'secondary' | 'tertiary' | 'description';
export type TabState = 'active' | 'hover' | 'focus' | 'selected' | 'pressed';

type BaseTabsProps = {
  $type: TabsType;
  selectedIndex?: number;
  onTabChange?: (event: MouseEvent<HTMLElement>, selectedId: number) => void;
  children?: ReactNode;
};

export type TabsProps =
  | (BaseTabsProps & { $type: 'tertiary'; isVerticalMode?: boolean })
  | (BaseTabsProps & {
      $type: 'primary' | 'secondary' | 'description';
      isVerticalMode?: never;
    });

type TabBaseProps = {
  $isActive?: boolean;
  $type?: TabsType;
  $state?: TabState;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
};

export type TabProps = TabBaseProps &
  ({ description?: never; $badge?: boolean } | { description: string; $badge?: never });

const TabsRoot = styled.div<{ $vertical: boolean }>(({ $vertical }) => ({
  display: 'flex',
  flexDirection: $vertical ? 'column' : 'row',
  alignItems: $vertical ? 'stretch' : 'center',
  gap: 8,
}));

const TabButton = styled.button<{ $active: boolean }>(({ theme, $active }) => ({
  minHeight: 36,
  padding: '0 16px',
  border: 'none',
  borderBottom: `2px solid ${
    $active ? theme.tokens.current.core.accent.primary : 'transparent'
  }`,
  background: 'transparent',
  color: $active
    ? theme.tokens.current.core.text.primary
    : theme.tokens.current.core.text.secondary,
  ...theme.typography.body2Semibold,
  cursor: 'pointer',
}));

export const Tabs = ({
  $type = 'primary',
  isVerticalMode = false,
  children,
}: TabsProps): JSX.Element => (
  <TabsRoot $vertical={$type === 'tertiary' && isVerticalMode === true}>{children}</TabsRoot>
);

export const Tab = ({
  $isActive = false,
  onClick,
  children,
  description,
}: TabProps): JSX.Element => (
  <TabButton type="button" $active={$isActive} onClick={onClick}>
    {children}
    {description === undefined ? null : <span>{description}</span>}
  </TabButton>
);
