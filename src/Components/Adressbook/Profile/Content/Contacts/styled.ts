import styled from 'styled-components';

export const MainContainerStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

export const SectionStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const RowStyled = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

export const Link = styled('a')<{ font?: object }>(({ font }) => ({
  ...font,
  lineHeight: 'initial',
  margin: 0,
  color: 'initial',
}));

