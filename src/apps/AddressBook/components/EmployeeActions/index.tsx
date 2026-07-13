import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { StarIcon } from '../icons';
import { Actions, ActionLink, ActionButton } from './styled';

type ExtraAction = {
  label: string;
  onClick: () => void;
};

type EmployeeActionsProps = {
  phone: string | null;
  email: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  emailLabel?: string;
  extraActions?: ExtraAction[];
};

export const EmployeeActions = ({
  phone,
  email,
  isFavorite,
  onToggleFavorite,
  emailLabel = 'email',
  extraActions = [],
}: EmployeeActionsProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Actions
    onClick={(event) => {
      event.stopPropagation();
    }}
  >
    {phone === null ? (
      <Text variant="body2Regular" color={theme.tokens.current.text.tertiary}>
        не указан
      </Text>
    ) : (
      <ActionLink href={`tel:${phone}`}>{phone}</ActionLink>
    )}
    <ActionLink href={`mailto:${email}`}>{emailLabel}</ActionLink>
    <ActionButton
      type="button"
      $active={isFavorite}
      aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
      onClick={onToggleFavorite}
    >
      <StarIcon />
    </ActionButton>
    {extraActions.map((action) => (
      <ActionButton
        key={action.label}
        type="button"
        onClick={() => {
          action.onClick();
        }}
      >
        {action.label}
      </ActionButton>
    ))}
    </Actions>
  );
};
