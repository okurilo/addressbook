import styled, { DefaultTheme } from 'styled-components';

interface ITypographyProps {
  theme: DefaultTheme;
  ellipsis?: boolean;
  clamp?: string;
  color?: string;
  lineHeight?: string;
}

const ELLIPSIS = {
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
};

export const Base = styled('p')<ITypographyProps>(({ ellipsis, clamp, color, lineHeight }) => ({
  lineHeight: lineHeight || 'initial',
  margin: 0,
  color: color || 'initial',
  ...(ellipsis && {
    ...ELLIPSIS,
    '-webkit-line-clamp': clamp || '1',
  }),
}));

// Semibold

export const Body1Semibold = styled(Base)<ITypographyProps>(({ theme }) => ({
  ...theme.typography.body1Semibold,
}));

export const Body2Semibold = styled(Base)<ITypographyProps>(({ theme }) => ({
  ...theme.typography.body2Semibold,
}));

export const Header4Semibold = styled(Base)<ITypographyProps>(({ theme }) => ({
  ...theme.typography.h4Semibold,
}));

// Regular

export const Body1Regular = styled(Base)<ITypographyProps>(({ theme }) => ({
  ...theme.typography.body1Regular,
}));

export const Body2Regular = styled(Base)<ITypographyProps>(({ theme }) => ({
  ...theme.typography.body2Regular,
}));

