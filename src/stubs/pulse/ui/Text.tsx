import type { HTMLAttributes, PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const sizeMap = {
  sm: 13,
  md: 15,
  lg: 18,
  xl: 28,
} as const;

const weightMap = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

const StyledText = styled('span')<{
  $size: keyof typeof sizeMap;
  $weight: keyof typeof weightMap;
  $tone: 'primary' | 'secondary';
}>(({ theme, $size, $weight, $tone }) => ({
  display: 'block',
  fontSize: sizeMap[$size],
  lineHeight: 1.4,
  fontWeight: weightMap[$weight],
  color: $tone === 'primary' ? theme.colors.textPrimary : theme.colors.textSecondary,
}));

export type TextProps = PropsWithChildren<
  HTMLAttributes<HTMLElement> & {
    as?: keyof JSX.IntrinsicElements;
    size?: keyof typeof sizeMap;
    weight?: keyof typeof weightMap;
    tone?: 'primary' | 'secondary';
  }
>;

export const Text = ({
  as = 'span',
  size = 'md',
  weight = 'regular',
  tone = 'primary',
  children,
  ...props
}: TextProps): JSX.Element => (
  <StyledText as={as} $size={size} $weight={weight} $tone={tone} {...props}>
    {children}
  </StyledText>
);
