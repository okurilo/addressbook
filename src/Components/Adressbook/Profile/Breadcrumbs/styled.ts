import styled from 'styled-components';

export const MainContainerStyled = styled('div')<{ isSmall?: boolean }>(({ isSmall }) => ({
  paddingTop: isSmall ? 0 : 32,
}));

