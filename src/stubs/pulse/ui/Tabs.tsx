import type { PropsWithChildren, ReactNode } from 'react';
import { styled } from 'styled-components';

const TabsRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.sm,
}));

const TabItem = styled('button')<{
  $active: boolean;
}>(({ theme, $active }) => ({
  minHeight: 36,
  padding: `0 ${theme.spacing.md}px`,
  border: 'none',
  borderBottom: `3px solid ${$active ? theme.colors.accent : 'transparent'}`,
  background: 'transparent',
  color: $active ? theme.colors.textPrimary : theme.colors.textSecondary,
  cursor: 'pointer',
}));

export type TabOption = {
  key: string;
  label: ReactNode;
};

export type TabsProps = PropsWithChildren<{
  items: TabOption[];
  activeKey: string;
  onChange: (key: string) => void;
}>;

export const Tabs = ({ items, activeKey, onChange }: TabsProps): JSX.Element => (
  <TabsRoot>
    {items.map((item) => (
      <TabItem
        key={item.key}
        type="button"
        $active={item.key === activeKey}
        onClick={() => {
          onChange(item.key);
        }}
      >
        {item.label}
      </TabItem>
    ))}
  </TabsRoot>
);
