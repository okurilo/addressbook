import { css, keyframes, styled } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.55; }
  50% { opacity: 1; }
  100% { opacity: 0.55; }
`;

const animations = {
  pulse: css`
    animation: ${pulse} 1.2s ease-in-out infinite;
  `,
};

const Block = styled('div')<{ $height: number }>(
  ({ theme, $height }) => ({
    width: '100%',
    height: $height,
    borderRadius: theme.radius.md,
    background: theme.colors.surfaceMuted,
  }),
  animations.pulse,
);

type SkeletonProps = {
  height?: number;
};

export const Skeleton = ({ height = 20 }: SkeletonProps): JSX.Element => <Block $height={height} />;
