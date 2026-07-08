import type { ReactNode } from 'react';
import { styled } from 'styled-components';
import { Text } from './Text';

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing.xl,
  borderRadius: theme.radius.lg,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.surface,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
  alignItems: 'center',
  textAlign: 'center',
}));

type EmptyStateProps = {
  title: string;
  description: string;
  illustration?: ReactNode;
};

export const EmptyState = ({
  title,
  description,
  illustration,
}: EmptyStateProps): JSX.Element => (
  <Wrapper>
    {illustration ?? null}
    <Text size="lg" weight="semibold">
      {title}
    </Text>
    <Text tone="secondary">{description}</Text>
  </Wrapper>
);
