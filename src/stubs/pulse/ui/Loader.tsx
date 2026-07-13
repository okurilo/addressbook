import type { ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  to { transform: rotate(360deg); }
`;

export type LoaderSize = 'm' | 'l';

const LoaderCircle = styled.span<{ $isOnColor: boolean; $size: LoaderSize }>(
  ({ theme, $isOnColor, $size }) => ({
    display: 'inline-block',
    width: $size === 'l' ? 40 : 28,
    height: $size === 'l' ? 40 : 28,
    borderRadius: theme.radii.pill,
    border: `3px solid ${
      $isOnColor ? theme.tokens.current.core.icon.onColor : theme.tokens.current.core.border.gentle
    }`,
    borderTopColor: $isOnColor ? 'transparent' : theme.tokens.current.core.accent.primary,
  }),
  css`
    animation: ${rotate} 0.8s linear infinite;
  `,
);

const Center = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Overlay = styled.div({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Content = styled.div({
  position: 'relative',
});

export type LoaderProps = {
  isOnColor?: boolean;
  size?: LoaderSize;
  wrapped?: boolean;
  children?: ReactNode;
};

const Indicator = ({
  isOnColor,
  size,
}: Required<Pick<LoaderProps, 'isOnColor' | 'size'>>): JSX.Element => (
  <LoaderCircle
    role="status"
    aria-label="Загрузка"
    $isOnColor={isOnColor}
    $size={size}
  />
);

export const Loader = ({
  isOnColor = false,
  size = 'm',
  wrapped = false,
  children,
}: LoaderProps): JSX.Element => {
  if (children !== undefined) {
    return (
      <Content>
        {children}
        <Overlay>
          <Indicator isOnColor={isOnColor} size={size} />
        </Overlay>
      </Content>
    );
  }

  const indicator = <Indicator isOnColor={isOnColor} size={size} />;

  return wrapped ? <Center>{indicator}</Center> : indicator;
};
