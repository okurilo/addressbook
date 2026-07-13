import { Button } from '@pulse/ui/components/Button';
import { EmptyState } from '@pulse/ui/components/EmptyState';
import { Actions } from './styled';

type RetryStateProps = {
  title: string;
  description: string;
  onRetry: () => void;
};

export const RetryState = ({ title, description, onRetry }: RetryStateProps): JSX.Element => (
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
