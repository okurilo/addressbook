import type { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';
import { Text } from './Text';

const Wrapper = styled.div(({ theme }) => ({
  padding: 32,
  borderRadius: theme.radii.lg,
  border: `1px solid ${theme.tokens.current.border.gentle}`,
  background: theme.tokens.current.background.default,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  alignItems: 'center',
  textAlign: 'center',
}));

export type EmptyStateProps = {
  title: string;
  description: string;
  illustration?: ReactNode;
};

export const EmptyState = ({
  title,
  description,
  illustration,
}: EmptyStateProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Wrapper>
      {illustration ?? null}
      <Text variant="body1Semibold">{title}</Text>
      <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
        {description}
      </Text>
    </Wrapper>
  );
};
