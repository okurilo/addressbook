import { styled } from 'styled-components';
import { Text } from '@pulse/ui/Text';

const Wrapper = styled('section')(({ theme }) => ({
  minHeight: 360,
  padding: theme.spacing.xl,
  borderTop: `1px dashed ${theme.colors.border}`,
  background: theme.colors.surface,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
  justifyContent: 'center',
}));

type PagePlaceholderProps = {
  title: string;
  description: string;
};

export const PagePlaceholder = ({
  title,
  description,
}: PagePlaceholderProps): JSX.Element => (
  <Wrapper>
    <Text size="xl" weight="semibold">
      {title}
    </Text>
    <Text tone="secondary">{description}</Text>
  </Wrapper>
);
