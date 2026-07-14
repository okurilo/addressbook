import type { ReactNode } from 'react';
import styled from 'styled-components';

const sizeMap = {
  xs: 24,
  s: 32,
  m: 40,
  l: 56,
  xl: 80,
  xxl: 112,
} as const;

export type AvatarSize = keyof typeof sizeMap;
export type AvatarType =
  | 'default'
  | 'initials'
  | 'empty'
  | 'noCandidate'
  | 'grade-long'
  | 'grade-short';
export type AvatarShape = 'circle' | 'square';
export type VerificationStatus = 'accept' | 'decline' | 'no_result';

const Circle = styled.span<{
  $avatarSize: AvatarSize;
  $avatarShape: AvatarShape;
}>(({ theme, $avatarSize, $avatarShape }) => ({
  position: 'relative',
  width: sizeMap[$avatarSize],
  height: sizeMap[$avatarSize],
  borderRadius: $avatarShape === 'circle' ? theme.radii.pill : theme.radii.md,
  background: theme.tokens.current.core.accent.secondary,
  color: theme.tokens.current.core.accent.primary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  overflow: 'hidden',
  ...theme.typography.body1Semibold,
}));

const Status = styled.span({
  position: 'absolute',
  right: 0,
  bottom: 0,
});

const Image = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export type AvatarProps = {
  $type?: AvatarType;
  $icon?: ReactNode | string;
  $size?: AvatarSize;
  $shape?: AvatarShape;
  $text?: ReactNode;
  $label?: ReactNode;
  $hasBadge?: boolean;
  $status?: ReactNode;
  $verificationStatus?: VerificationStatus;
  $fallbackType?: Omit<AvatarType, 'default'>;
};

type ImportedRuntimeAvatarProps = AvatarProps & {
  $src?: unknown;
  $initials?: unknown;
};

export const Avatar = (props: AvatarProps): JSX.Element => {
  const runtimeProps = props as ImportedRuntimeAvatarProps;
  const {
    $type = 'default',
    $icon,
    $size = 'l',
    $shape = 'circle',
    $text,
    $status,
  } = props;
  const legacyInitials =
    typeof runtimeProps.$initials === 'string' ? runtimeProps.$initials : undefined;
  const content = $type === 'initials' ? $text : $icon ?? $text ?? legacyInitials;
  const source = typeof runtimeProps.$src === 'string' ? runtimeProps.$src : undefined;

  return (
    <Circle $avatarSize={$size} $avatarShape={$shape}>
      {source === undefined ? content : <Image src={source} alt="" />}
      {$status === undefined ? null : <Status>{$status}</Status>}
    </Circle>
  );
};
