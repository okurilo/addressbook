import { styled } from 'styled-components';

export const ProductViewport = styled('main')(({ theme }) => ({
  padding: `${theme.spacing.xl}px ${theme.spacing.xl + theme.spacing.sm}px`,
}));
