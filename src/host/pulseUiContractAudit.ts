import type { ComponentProps, ReactNode } from 'react';
import { Avatar } from '@pulse/ui/components/Avatar';
import { Button } from '@pulse/ui/components/Button';
import { Empty } from '@pulse/ui/components/Empty';
import type {
  EmptyType as PulseEmptyType,
  Orientation as EmptyOrientation,
  Size as EmptySize,
} from '@pulse/ui/components/Empty';
import { Input } from '@pulse/ui/components/Input';
import { Content as LayoutContent } from '@pulse/ui/components/Layout';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import type { TypographyVariant } from './theme';

type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends
  (<Value>() => Value extends Right ? 1 : 2)
    ? true
    : false;

type Assert<Condition extends true> = Condition;
type IsOptional<Props, Key extends keyof Props> = object extends Pick<Props, Key>
  ? true
  : false;

type AvatarProps = ComponentProps<typeof Avatar>;
type _AvatarSize = Assert<
  Equal<NonNullable<AvatarProps['$size']>, 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'>
>;
type _AvatarType = Assert<
  Equal<
    NonNullable<AvatarProps['$type']>,
    'default' | 'initials' | 'empty' | 'noCandidate' | 'grade-long' | 'grade-short'
  >
>;
type _AvatarText = Assert<Equal<AvatarProps['$text'], ReactNode | undefined>>;

type ButtonProps = ComponentProps<typeof Button>;
type _ButtonType = Assert<
  Equal<
    NonNullable<ButtonProps['$type']>,
    'primary' | 'secondary' | 'tertiary' | 'mono' | 'monoSecondary'
  >
>;
type _ButtonSize = Assert<
  Equal<NonNullable<ButtonProps['$size']>, 'l' | 'm' | 'm-alt' | 's' | 'xs'>
>;
type _ButtonState = Assert<
  Equal<NonNullable<ButtonProps['$state']>, 'focus' | 'hover' | 'pressed'>
>;

type LoaderProps = ComponentProps<typeof Loader>;
type _LoaderSize = Assert<Equal<NonNullable<LoaderProps['size']>, 'm' | 'l'>>;
type _LoaderChildren = Assert<Equal<LoaderProps['children'], ReactNode>>;
type _LoaderWrapped = Assert<Equal<LoaderProps['wrapped'], boolean | undefined>>;
type _LoaderOnColor = Assert<Equal<LoaderProps['isOnColor'], boolean | undefined>>;

type InputProps = ComponentProps<typeof Input>;
type _InputPlace = Assert<
  Equal<NonNullable<InputProps['placeWhereUsed']>, 'body' | 'modal'>
>;
type _InputSuggestions = Assert<
  InputProps['suggestions'] extends string[] | Array<{ key: string; value: string }> | undefined
    ? true
    : false
>;

type TextProps = ComponentProps<typeof Text>;
type _TextVariantIsRequired = Assert<Equal<IsOptional<TextProps, 'variant'>, false>>;
type _TextIncludesEveryThemeVariant = Assert<
  TypographyVariant extends NonNullable<TextProps['variant']> ? true : false
>;
type _TextHasNoTone = Assert<Equal<'tone' extends keyof TextProps ? true : false, false>>;
type _TextHasNoWeight = Assert<Equal<'weight' extends keyof TextProps ? true : false, false>>;

type LayoutContentProps = ComponentProps<typeof LayoutContent>;
type _LayoutAcceptsChildren = Assert<ReactNode extends LayoutContentProps['children'] ? true : false>;

type EmptyProps = ComponentProps<typeof Empty>;
type _EmptyTypeExport = Assert<
  Equal<PulseEmptyType, 'start' | 'noResults' | 'wait' | 'create' | 'noData'>
>;
type _EmptySizeExport = Assert<Equal<EmptySize, 'default' | 'small'>>;
type _EmptyOrientationExport = Assert<Equal<EmptyOrientation, 'horizontal' | 'vertical'>>;
type _EmptyType = Assert<
  Equal<EmptyProps['type'], 'start' | 'noResults' | 'wait' | 'create' | 'noData'>
>;
type _EmptyDescriptionIsRequired = Assert<Equal<IsOptional<EmptyProps, 'description'>, false>>;
type _EmptyTitleIsOptional = Assert<Equal<IsOptional<EmptyProps, 'title'>, true>>;
type _EmptyHasNoIllustration = Assert<
  Equal<'illustration' extends keyof EmptyProps ? true : false, false>
>;
