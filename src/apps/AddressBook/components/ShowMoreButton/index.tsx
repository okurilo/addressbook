import { Button } from './styled';

type ShowMoreButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

export const ShowMoreButton = ({
  isLoading,
  onClick,
}: ShowMoreButtonProps): JSX.Element => (
  <Button type="button" disabled={isLoading} onClick={onClick}>
    {isLoading ? 'Загружаем…' : 'Показать ещё'}
  </Button>
);
