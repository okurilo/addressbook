import { FC } from 'react';
import { useTheme } from 'styled-components';
import { Body1Regular, Body2Regular } from '../../../common/typography';
import { Breadcrumbs } from '../../Breadcrumbs';
import { ColumnStyled, MainContainerStyled, RowStyled } from './styled';
import type { ProfileViewData } from '../../hooks/types';

const formatManagerName = (manager: any) =>
  `${manager.lastName} ${manager.firstName} ${manager.secondName}`;

interface ISbergileProps {
  profile: ProfileViewData;
}

export const Sbergile: FC<ISbergileProps> = ({ profile }) => {
  const { tokens } = useTheme();
  const { managers, agile } = profile;

  const lastOrgPathTitle = agile?.orgPath?.[agile.orgPath.length - 1]?.title;

  return (
    <MainContainerStyled>
      {agile?.orgPath?.length > 0 && (
        <ColumnStyled>
          <Body1Regular>структура:</Body1Regular>
          <Breadcrumbs profile={profile} structureType="agile" style="small" />
        </ColumnStyled>
      )}
      {lastOrgPathTitle && (
        <ColumnStyled>
          <Body1Regular>роли:</Body1Regular>
          <Body1Regular>
            {agile?.position}: {lastOrgPathTitle}
          </Body1Regular>
        </ColumnStyled>
      )}
      {managers?.length > 0 && (
        <ColumnStyled>
          <Body1Regular>менеджеры:</Body1Regular>
          {managers?.map((manager) => (
            <Body1Regular key={manager.userId}>
              <RowStyled>
                {manager.position && `${manager.position}: `}
                <a href={manager.userId}>
                  <Body2Regular color={tokens.current.core.link.default}>
                    {formatManagerName(manager)}
                  </Body2Regular>
                </a>
              </RowStyled>
            </Body1Regular>
          ))}
        </ColumnStyled>
      )}
    </MainContainerStyled>
  );
};
