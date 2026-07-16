import styled from 'styled-components';

export const MainContainerStyled = styled('div')(({ isSmall }) => ({
  marginTop: isSmall ? 0 : 16,
}));
