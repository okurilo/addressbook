import type { HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';
import type { TypographyVariant } from '../../../host/theme';

type ResponsiveValue<T> =
  | T
  | readonly (T | null)[]
  | Readonly<Record<string, T | null>>;

type SpaceValue = number | string;

type SpaceProps = {
  m?: ResponsiveValue<SpaceValue>;
  margin?: ResponsiveValue<SpaceValue>;
  mt?: ResponsiveValue<SpaceValue>;
  marginTop?: ResponsiveValue<SpaceValue>;
  mr?: ResponsiveValue<SpaceValue>;
  marginRight?: ResponsiveValue<SpaceValue>;
  mb?: ResponsiveValue<SpaceValue>;
  marginBottom?: ResponsiveValue<SpaceValue>;
  ml?: ResponsiveValue<SpaceValue>;
  marginLeft?: ResponsiveValue<SpaceValue>;
  mx?: ResponsiveValue<SpaceValue>;
  my?: ResponsiveValue<SpaceValue>;
  p?: ResponsiveValue<SpaceValue>;
  padding?: ResponsiveValue<SpaceValue>;
  pt?: ResponsiveValue<SpaceValue>;
  paddingTop?: ResponsiveValue<SpaceValue>;
  pr?: ResponsiveValue<SpaceValue>;
  paddingRight?: ResponsiveValue<SpaceValue>;
  pb?: ResponsiveValue<SpaceValue>;
  paddingBottom?: ResponsiveValue<SpaceValue>;
  pl?: ResponsiveValue<SpaceValue>;
  paddingLeft?: ResponsiveValue<SpaceValue>;
  px?: ResponsiveValue<SpaceValue>;
  py?: ResponsiveValue<SpaceValue>;
};

type ColorProps = {
  color?: ResponsiveValue<string>;
  bg?: ResponsiveValue<string>;
  backgroundColor?: ResponsiveValue<string>;
  opacity?: ResponsiveValue<number>;
};

type TextStyleProps = SpaceProps & ColorProps;

const firstResponsiveValue = <T extends string | number>(
  value: ResponsiveValue<T> | undefined
): T | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.find((item): item is T => item !== null);
  }

  if (typeof value === 'object') {
    return Object.values(value).find((item): item is T => item !== null);
  }

  return value as T;
};

const StyledText = styled.span<{
  $variant: TypographyVariant;
  $textStyles: TextStyleProps;
}>(({ theme, $variant, $textStyles }) => {
  const resolveSpace = (value: ResponsiveValue<SpaceValue> | undefined): SpaceValue | undefined => {
    const resolved = firstResponsiveValue(value);

    if (typeof resolved !== 'number') {
      return resolved;
    }

    return theme.space[resolved] ?? resolved;
  };
  const margin = resolveSpace($textStyles.margin ?? $textStyles.m);
  const marginX = resolveSpace($textStyles.mx);
  const marginY = resolveSpace($textStyles.my);
  const padding = resolveSpace($textStyles.padding ?? $textStyles.p);
  const paddingX = resolveSpace($textStyles.px);
  const paddingY = resolveSpace($textStyles.py);

  return {
    display: 'block',
    ...theme.typography[$variant],
    color: firstResponsiveValue($textStyles.color) ?? theme.tokens.current.text.primary,
    backgroundColor: firstResponsiveValue(
      $textStyles.backgroundColor ?? $textStyles.bg
    ),
    opacity: firstResponsiveValue($textStyles.opacity),
    margin,
    marginTop: resolveSpace($textStyles.marginTop ?? $textStyles.mt) ?? marginY,
    marginRight: resolveSpace($textStyles.marginRight ?? $textStyles.mr) ?? marginX,
    marginBottom: resolveSpace($textStyles.marginBottom ?? $textStyles.mb) ?? marginY,
    marginLeft: resolveSpace($textStyles.marginLeft ?? $textStyles.ml) ?? marginX,
    padding,
    paddingTop: resolveSpace($textStyles.paddingTop ?? $textStyles.pt) ?? paddingY,
    paddingRight: resolveSpace($textStyles.paddingRight ?? $textStyles.pr) ?? paddingX,
    paddingBottom: resolveSpace($textStyles.paddingBottom ?? $textStyles.pb) ?? paddingY,
    paddingLeft: resolveSpace($textStyles.paddingLeft ?? $textStyles.pl) ?? paddingX,
  };
});

export type TextProps = PropsWithChildren<
  Omit<HTMLAttributes<HTMLElement>, 'color'> &
    TextStyleProps & {
      variant: ResponsiveValue<TypographyVariant>;
    }
>;

export const Text = ({
  variant,
  color,
  bg,
  backgroundColor,
  opacity,
  m,
  margin,
  mt,
  marginTop,
  mr,
  marginRight,
  mb,
  marginBottom,
  ml,
  marginLeft,
  mx,
  my,
  p,
  padding,
  pt,
  paddingTop,
  pr,
  paddingRight,
  pb,
  paddingBottom,
  pl,
  paddingLeft,
  px,
  py,
  children,
  ...props
}: TextProps): JSX.Element => {
  const resolvedVariant = firstResponsiveValue(variant) ?? 'body1Regular';
  const textStyles: TextStyleProps = {
    color,
    bg,
    backgroundColor,
    opacity,
    m,
    margin,
    mt,
    marginTop,
    mr,
    marginRight,
    mb,
    marginBottom,
    ml,
    marginLeft,
    mx,
    my,
    p,
    padding,
    pt,
    paddingTop,
    pr,
    paddingRight,
    pb,
    paddingBottom,
    pl,
    paddingLeft,
    px,
    py,
  };

  return (
    <StyledText $variant={resolvedVariant} $textStyles={textStyles} {...props}>
      {children}
    </StyledText>
  );
};
