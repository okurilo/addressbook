import { styled } from 'styled-components';
import { Button } from '@pulse/ui/Button';
import { EmptyState } from '@pulse/ui/EmptyState';

const Actions = styled('div')(({ theme }) => ({
  marginTop: theme.spacing.md,
}));

type RetryStateProps = {
  title: string;
  description: string;
  onRetry: () => void;
};

export const RetryState = ({
  title,
  description,
  onRetry,
}: RetryStateProps): JSX.Element => (
  <EmptyState
    title={title}
    description={description}
    illustration={
      <Actions>
        <Button onClick={onRetry}>Повторить</Button>
      </Actions>
    }
  />
);
