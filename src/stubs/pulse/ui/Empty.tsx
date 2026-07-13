import styled, { useTheme } from 'styled-components';
import { Button } from './Button';
import { Text } from './Text';

export type EmptyType = 'start' | 'noResults' | 'wait' | 'create' | 'noData';
type NoData = Extract<EmptyType, 'noData'>;
type SimpleTypes = Extract<EmptyType, 'start' | 'noResults'>;
export type Size = 'default' | 'small';
export type Orientation = 'horizontal' | 'vertical';

interface BaseProps {
  type: EmptyType;
  description: string;
  title?: string;
  buttonLabel?: string;
  onClick?: () => void;
  buttonSecondaryLabel?: string;
  onSecondaryBtnClick?: () => void;
}

interface PropsStartNoResults extends BaseProps {
  type: SimpleTypes;
  size?: Extract<Size, 'default'>;
}

interface PropsNoData extends BaseProps {
  type: NoData;
  size?: Extract<Size, 'default'>;
  buttonLabel?: never;
  onClick?: never;
  buttonSecondaryLabel?: never;
  onSecondaryBtnClick?: never;
}

interface PropsRestTypes extends BaseProps {
  type: Exclude<EmptyType, SimpleTypes>;
  size?: Size;
}

export type EmptyProps = PropsStartNoResults | PropsRestTypes | PropsNoData;

const Wrapper = styled.div<{ $size: Size }>(({ theme, $size }) => ({
  minHeight: $size === 'small' ? 160 : 220,
  padding: $size === 'small' ? 24 : 32,
  borderRadius: theme.radii.lg,
  background: theme.tokens.current.background.default,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 8,
  alignItems: 'center',
  textAlign: 'center',
}));

const Marker = styled.div(({ theme }) => ({
  width: 56,
  height: 56,
  marginBottom: 8,
  borderRadius: theme.radii.pill,
  background: theme.tokens.current.layer['02'],
  color: theme.tokens.current.icon.secondary,
  display: 'grid',
  placeItems: 'center',
  ...theme.typography.h4Semibold,
}));

const Actions = styled.div({
  display: 'flex',
  gap: 8,
  marginTop: 16,
});

const markerByType: Record<EmptyType, string> = {
  start: '→',
  noResults: '⌕',
  wait: '…',
  create: '+',
  noData: '—',
};

export const Empty = ({
  type,
  description,
  title,
  buttonLabel,
  onClick,
  buttonSecondaryLabel,
  onSecondaryBtnClick,
  size = 'default',
}: EmptyProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Wrapper $size={size}>
      <Marker aria-hidden="true">{markerByType[type]}</Marker>
      {title === undefined ? null : <Text variant="body1Semibold">{title}</Text>}
      <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
        {description}
      </Text>
      {buttonLabel === undefined && buttonSecondaryLabel === undefined ? null : (
        <Actions>
          {buttonLabel === undefined ? null : (
            <Button $type="primary" onClick={onClick}>
              {buttonLabel}
            </Button>
          )}
          {buttonSecondaryLabel === undefined ? null : (
            <Button $type="secondary" onClick={onSecondaryBtnClick}>
              {buttonSecondaryLabel}
            </Button>
          )}
        </Actions>
      )}
    </Wrapper>
  );
};
