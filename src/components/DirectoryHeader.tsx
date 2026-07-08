import { styled } from 'styled-components';
import { Text } from '@pulse/ui/Text';
import { AppMarkIcon } from './icons';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.md,
}));

export const DirectoryHeader = (): JSX.Element => (
  <Wrapper>
    <AppMarkIcon />
    <Text as="h1" size="xl" weight="bold">
      Справочник
    </Text>
  </Wrapper>
);
