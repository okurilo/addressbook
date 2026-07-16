import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { PageButton, PaginationRoot } from './styled';

type PaginationProps = {
  currentPage: number;
  totalPages: number | null;
  isLastPage: boolean;
  onChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  isLastPage,
  onChange,
}: PaginationProps): JSX.Element | null => {
  const theme = useTheme();
  const canGoBackward = currentPage > 0;
  const canGoForward =
    totalPages === null ? !isLastPage : currentPage + 1 < Math.max(totalPages, 1);

  if (!canGoBackward && !canGoForward) {
    return null;
  }

  return (
    <PaginationRoot aria-label="Пагинация">
      <PageButton
        type="button"
        disabled={!canGoBackward}
        onClick={() => onChange(currentPage - 1)}
      >
        Назад
      </PageButton>
      <Text variant="body2Regular" color={theme.tokens.current.core.text.secondary}>
        Страница {currentPage + 1}
        {totalPages === null ? '' : ` из ${Math.max(totalPages, 1)}`}
      </Text>
      <PageButton
        type="button"
        disabled={!canGoForward}
        onClick={() => onChange(currentPage + 1)}
      >
        Вперёд
      </PageButton>
    </PaginationRoot>
  );
};
