import type { CSSProperties } from 'react';
import styled, { css, keyframes } from 'styled-components';

type ResponsiveSize = CSSProperties['width'] | CSSProperties['width'][];

export interface SkeletonProps {
  width?: ResponsiveSize;
  height?: ResponsiveSize;
  color?: string;
}

export type SkeletonRectProps = SkeletonProps;
export type SkeletonCircleProps = SkeletonProps;

export interface SkeletonTextProps extends SkeletonProps {
  firstLineHeight?: string;
  lineHeight?: string;
  lines?: number;
}

const pulse = keyframes({
  '0%, 100%': { opacity: 0.45 },
  '50%': { opacity: 0.9 },
});

const Rect = styled.div<{ $height?: CSSProperties['height']; $width?: CSSProperties['width'] }>(
  ({ theme, $height, $width }) => ({
    width: $width,
    height: $height,
    borderRadius: theme.radii.sm,
    background: theme.tokens.current.core.layer['03'],
  }),
  css`
    animation: ${pulse} 1.3s ease-in-out infinite;
  `
);

const firstSize = (value: ResponsiveSize | undefined): CSSProperties['width'] =>
  Array.isArray(value) ? value.find((item) => item !== null) : value;

export const SkeletonRect = ({ width, height }: SkeletonRectProps): JSX.Element => (
  <Rect $height={firstSize(height)} $width={firstSize(width)} aria-hidden="true" />
);

export const SkeletonCircle = ({ width, height }: SkeletonCircleProps): JSX.Element => (
  <Rect
    $height={firstSize(height)}
    $width={firstSize(width)}
    aria-hidden="true"
    style={{ borderRadius: '50%' }}
  />
);

export const SkeletonText = ({ width, height }: SkeletonTextProps): JSX.Element => (
  <SkeletonRect height={height} width={width} />
);
