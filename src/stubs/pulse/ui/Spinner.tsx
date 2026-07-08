import { css, keyframes, styled } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const animations = {
  spin: css`
    animation: ${rotate} 0.9s linear infinite;
  `,
};

const Circle = styled('span')(
  ({ theme }) => ({
    width: 20,
    height: 20,
    borderRadius: theme.radius.pill,
    border: `2px solid ${theme.colors.border}`,
    borderTopColor: theme.colors.accent,
    display: 'inline-block',
  }),
  animations.spin,
);

export const Spinner = (): JSX.Element => <Circle aria-label="Загрузка" />;
