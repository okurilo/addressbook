import { Empty } from '@pulse/ui/components/Empty/Page';

type RetryStateProps = {
  title: string;
  description: string;
  onRetry: () => void;
};

export const RetryState = ({ title, description, onRetry }: RetryStateProps): JSX.Element => (
  <Empty
    type="wait"
    title={title}
    description={description}
    buttonLabel="Повторить"
    onClick={onRetry}
  />
);

