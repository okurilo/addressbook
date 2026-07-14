import { useTheme } from 'styled-components';
import { MainContainerStyled } from './styled';
import { Body1Regular } from '../../common/typography';

export const Breadcrumbs = ({ profile, structureType }) => {
  const theme = useTheme();
  const { agile, linear } = profile;

  const isLinear = structureType === 'linear';
  const items = isLinear ? linear?.orgPath || [] : agile?.orgPath || [];
  const position = isLinear ? (linear?.position as string) : (agile?.position as string);

  if (!position) return null;

  return (
    <MainContainerStyled>
      <Body1Regular color={theme.tokens.current.colors.grey.solid['70']}>
        {position} • {items.map((item) => item.title).join(' / ')}
      </Body1Regular>
    </MainContainerStyled>
  );
};

