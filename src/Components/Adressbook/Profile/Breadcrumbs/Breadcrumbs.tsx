import { useTheme } from 'styled-components';
import { SkeletonRect } from '@pulse/ui/components/Skeleton';
import { MainContainerStyled } from './styled';
import { Body1Regular, Body2Regular } from '../../common/typography';
import type { ProfileViewData } from '../hooks/types';

type BreadcrumbsProps = {
  profile: ProfileViewData;
  structureType: 'linear' | 'agile';
  style?: 'small';
};

export const Breadcrumbs = ({ profile, structureType, style }: BreadcrumbsProps) => {
  const theme = useTheme();
  const { agile, linear, isLoading } = profile;

  const isLinear = structureType === 'linear';
  const items = isLinear ? linear?.orgPath || [] : agile?.orgPath || [];
  const position = isLinear ? (linear?.position as string) : (agile?.position as string);

  return (
    <MainContainerStyled isSmall={style === 'small'}>
      {isLoading ? (
        <SkeletonRect height={20} width="70%" />
      ) : (
        position &&
        (() =>
          style === 'small' ? (
            <Body2Regular color={theme.tokens.current.colors.grey.solid['70']}>
              {items.map((item) => item.title).join(' > ')}
            </Body2Regular>
          ) : (
            <Body1Regular color={theme.tokens.current.colors.grey.solid['70']}>
              {items.map((item) => item.title).join(' / ')}
            </Body1Regular>
          ))()
      )}
    </MainContainerStyled>
  );
};

