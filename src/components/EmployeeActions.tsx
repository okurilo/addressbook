import { styled } from 'styled-components';
import { Text } from '@pulse/ui/Text';
import { StarIcon } from './icons';

const Actions = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
}));

const ActionLink = styled('a')(({ theme }) => ({
  minHeight: 32,
  padding: `0 ${theme.spacing.md}px`,
  borderRadius: theme.radius.pill,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.surface,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.textPrimary,
}));

const ActionButton = styled('button')<{ $active?: boolean }>(({ theme, $active = false }) => ({
  minHeight: 32,
  minWidth: 32,
  padding: `0 ${theme.spacing.md}px`,
  borderRadius: theme.radius.pill,
  border: `1px solid ${$active ? theme.colors.accent : theme.colors.border}`,
  background: $active ? theme.colors.accentSoft : theme.colors.surface,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: $active ? theme.colors.accent : theme.colors.textSecondary,
  cursor: 'pointer',
}));

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
}: EmployeeActionsProps): JSX.Element => (
  <Actions
    onClick={(event) => {
      event.stopPropagation();
    }}
  >
    {phone === null ? (
      <Text tone="secondary">не указан</Text>
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
