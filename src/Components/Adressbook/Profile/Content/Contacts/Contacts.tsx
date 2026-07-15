import { FC } from 'react';
import { useTheme } from 'styled-components';
import { SkeletonRect } from '@pulse/ui/components/Skeleton';
import { Chip } from '../../../common/Chip';
import { Body1Regular, Body2Regular, Header4Semibold } from '../../../common/typography';
import { MainContainerStyled, RowStyled, SectionStyled } from './styled';
import { ReactComponent as PhoneIcon } from '../../assets/phone.svg';
import { ReactComponent as MailIcon } from '../../assets/mail.svg';
import { ReactComponent as SberchatIcon } from '../../assets/sberchat.svg';
import type { ProfileViewData } from '../../hooks/types';


interface IContactsProps {
  internalPhone: string | undefined;
  personalPhone: string | undefined;
  pid: string;
  profile: ProfileViewData;
}
export const Contacts: FC<IContactsProps> = ({ internalPhone, personalPhone, profile }) => {
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
  };

  const { workAddress, mailSigma, mailAlpha, sberchat, timezone, linearManager, isLoading } =
    profile;
  const { tokens } = useTheme();

  return (
    <MainContainerStyled>
      <SectionStyled>
        {(internalPhone || personalPhone) && (
          <>
            <Header4Semibold>телефоны</Header4Semibold>
            {internalPhone && (
              <RowStyled>
                <Body1Regular>внутренний:</Body1Regular>
                <Chip text={internalPhone} onClick={() => handleCopyPhone(internalPhone)}>
                  <PhoneIcon />
                </Chip>
              </RowStyled>
            )}

            {personalPhone && (
              <RowStyled>
                <Body1Regular>мобильный:</Body1Regular>
                <Chip text={personalPhone} onClick={() => handleCopyPhone(personalPhone)}>
                  <PhoneIcon />
                </Chip>
              </RowStyled>
            )}
          </>
        )}
      </SectionStyled>
      {isLoading ? (
        <SkeletonRect height={64} width={400} />
      ) : (
        <>
          <SectionStyled>
            {(mailAlpha || mailSigma) && (
              <>
                <Header4Semibold>почта</Header4Semibold>
                {mailSigma && (
                  <RowStyled>
                    <Body1Regular>sigma:</Body1Regular>
                    <Chip text={mailSigma} onClick={() => handleCopyPhone(mailSigma)}>
                      <MailIcon />
                    </Chip>
                  </RowStyled>
                )}
                {mailAlpha && (
                  <RowStyled>
                    <Body1Regular>omega:</Body1Regular>
                    <Chip text={mailAlpha} onClick={() => handleCopyPhone(mailAlpha)}>
                      <MailIcon />
                    </Chip>
                  </RowStyled>
                )}
              </>
            )}
          </SectionStyled>
          <SectionStyled>
            {sberchat && (
              <>
                <Header4Semibold>мессенджеры</Header4Semibold>
                <RowStyled>
                  <Body1Regular>сберчат:</Body1Regular>
                  <Chip text={sberchat} onClick={() => handleCopyPhone(sberchat)}>
                    <SberchatIcon />
                  </Chip>
                </RowStyled>
              </>
            )}
            {workAddress && (
              <RowStyled>
                <Body1Regular>адрес:</Body1Regular>
                <Body2Regular>{workAddress}</Body2Regular>
              </RowStyled>
            )}
            {timezone && (
              <RowStyled>
                <Body1Regular>{timezone}</Body1Regular>
              </RowStyled>
            )}
            {linearManager?.name && (
              <RowStyled>
                <Body1Regular>линейный руководитель:</Body1Regular>
                <a href={linearManager.url}>
                  <Body2Regular color={tokens.current.core.link.default}>
                    {linearManager.name}
                  </Body2Regular>
                </a>
              </RowStyled>
            )}
          </SectionStyled>
        </>
      )}
    </MainContainerStyled>
  );
};
