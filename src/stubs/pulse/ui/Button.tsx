import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from 'react';
import styled from 'styled-components';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'mono'
  | 'monoSecondary';
export type ButtonSize = 'l' | 'm' | 'm-alt' | 's' | 'xs';
export type ButtonState = 'focus' | 'hover' | 'pressed';

type ButtonStyleProps = {
  $type?: ButtonType;
  $size?: ButtonSize;
  $state?: ButtonState;
  $containsOnlyIcon?: boolean;
  $fullWidth?: boolean;
  $isLoading?: boolean;
};

const sizeMap: Record<ButtonSize, { minHeight: number; padding: string }> = {
  l: { minHeight: 48, padding: '0 20px' },
  m: { minHeight: 40, padding: '0 16px' },
  'm-alt': { minHeight: 40, padding: '0 16px' },
  s: { minHeight: 32, padding: '0 12px' },
  xs: { minHeight: 24, padding: '0 8px' },
};

const buttonStyles = ({
  theme,
  $buttonType,
  $buttonSize,
  $containsOnlyIcon,
  $fullWidth,
}: {
  theme: import('styled-components').DefaultTheme;
  $buttonType: ButtonType;
  $buttonSize: ButtonSize;
  $containsOnlyIcon: boolean;
  $fullWidth: boolean;
}) => {
  const isPrimary = $buttonType === 'primary';
  const isSecondary = $buttonType === 'secondary';
  const isMonoSecondary = $buttonType === 'monoSecondary';

  return {
    minHeight: sizeMap[$buttonSize].minHeight,
    minWidth: $containsOnlyIcon ? sizeMap[$buttonSize].minHeight : undefined,
    width: $fullWidth ? '100%' : undefined,
    padding: $containsOnlyIcon ? 0 : sizeMap[$buttonSize].padding,
    borderRadius: theme.radii.md,
    border: `1px solid ${
      isPrimary
        ? theme.tokens.current.accent.primary
        : isSecondary
        ? theme.tokens.current.border.gentle
        : 'transparent'
    }`,
    background: isPrimary
      ? theme.tokens.current.accent.primary
      : isSecondary
      ? theme.tokens.current.layer['01']
      : 'transparent',
    color: isPrimary
      ? theme.tokens.current.text.onColor
      : isMonoSecondary
      ? theme.tokens.current.text.secondary
      : theme.tokens.current.text.primary,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    ...theme.typography.body1Semibold,
  };
};

type InternalStyleProps = {
  $buttonType: ButtonType;
  $buttonSize: ButtonSize;
  $containsOnlyIcon: boolean;
  $fullWidth: boolean;
};

const StyledButton = styled.button<InternalStyleProps>(buttonStyles);
const StyledLink = styled.a<InternalStyleProps>(buttonStyles);

type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyleProps & {
    as?: 'button';
    href?: never;
  };

type LinkElementProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonStyleProps & {
    as: 'a';
    href: string;
  };

export type ButtonProps = PropsWithChildren<ButtonElementProps | LinkElementProps>;

export const Button = ({
  $type = 'primary',
  $size = 'm',
  $state: _state,
  $containsOnlyIcon = false,
  $fullWidth = false,
  $isLoading = false,
  as,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  const styleProps: InternalStyleProps = {
    $buttonType: $type,
    $buttonSize: $size,
    $containsOnlyIcon,
    $fullWidth,
  };

  if (as === 'a') {
    const linkProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <StyledLink {...styleProps} {...linkProps}>
        {$isLoading ? '…' : children}
      </StyledLink>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <StyledButton
      type="button"
      {...styleProps}
      {...buttonProps}
      disabled={$isLoading || buttonProps.disabled}
    >
      {$isLoading ? '…' : children}
    </StyledButton>
  );
};
