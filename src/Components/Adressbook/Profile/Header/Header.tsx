import styled, { useTheme } from 'styled-components';
import { Content, Text } from '@pulse/ui/components/Snackbar';
import { Success } from '@pulse/ui/components/Snackbar/icons';
import { toast } from 'react-toastify';
import { Modal } from '@pulse/ui/components/ModalNew';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { ComponentType, PropsWithChildren } from 'react';
import { SkeletonRect } from '@pulse/ui/components/Skeleton';
import {
  AvatarSectionStyled,
  ButtonsSectionStyled,
  EmployeeNumberContainerStyled,
  EmployeeNumberStyled,
  InfoSectionStyled,
  MainContainerStyled,
  NameSectionStyled,
} from './styled';
import { ProfileImage } from '../../common/ProfileImage';
import { Body1Regular, Body2Regular, Header4Semibold } from '../../common/typography';
import { ReactComponent as QRIcon } from '../assets/qr.svg';
import { ReactComponent as ShareIcon } from '../assets/share.svg';
import { ReactComponent as StarIcon } from '../assets/star.svg';
import { IconButton } from '../../common/IconButton';
import { QRCodeCore } from './QRCodeCore';
import { Star } from './Star';

interface ICustomGroup {
  id: string;
  type: string;
  typeOrder: number;
  name: string;
  isCustom: boolean;
  structureLink?: string;
}

type HeaderProps = {
  name: string;
  position: string;
  employeeNumber?: string;
  photo: string;
  initials: string;
  absence?: { badge?: string; period?: string; icon_dark?: string; icon_light?: string };
  pid: string;
  isLoading?: boolean;
};

const LegacyModal = Modal as ComponentType<
  PropsWithChildren<{ type?: 'default'; onClose: () => void }>
>;

export const Header = ({
  name,
  position,
  employeeNumber,
  photo,
  initials,
  absence,
  pid,
  isLoading,
}: HeaderProps) => {
  const { tokens } = useTheme();
  const [isOpenQRModal, setIsOpenQRModal] = useState(false);

  const profileUrl = pid ? `${window.location.origin}/platform/profile/${pid}` : '';

  return (
    <MainContainerStyled>
      <AvatarSectionStyled>
        <ProfileImage size="xl" photo={photo} initials={initials} absence={absence} pid={pid} />
      </AvatarSectionStyled>
      <InfoSectionStyled>
        <NameSectionStyled>
          <Header4Semibold>{name}</Header4Semibold>
          {!position && isLoading ? (
            <SkeletonRect height={20} width="70%" />
          ) : (
            <Body1Regular color={tokens.current.core.text.secondary}>{position}</Body1Regular>
          )}
        </NameSectionStyled>
        <EmployeeNumberContainerStyled>
          <EmployeeNumberStyled>
            {!employeeNumber && isLoading ? (
              <SkeletonRect height={20} width="70%" />
            ) : (
              <>
                <Body2Regular color={tokens.current.core.text.secondary}>
                  Табельный номер:{` `}
                </Body2Regular>
                <Body2Regular> {employeeNumber}</Body2Regular>
              </>
            )}
          </EmployeeNumberStyled>
        </EmployeeNumberContainerStyled>
        <EmployeeNumberContainerStyled>
          <EmployeeNumberStyled>
            <Body2Regular color={tokens.current.core.text.secondary}>{`${absence?.badge || ''} ${
              absence?.period || ''
            }`}</Body2Regular>
          </EmployeeNumberStyled>
        </EmployeeNumberContainerStyled>
      </InfoSectionStyled>
      <ButtonsSectionStyled>
        <IconButton
          color={tokens.current.colors.grey.solid['60']}
          onClick={() => setIsOpenQRModal(true)}
        >
          <QRIcon />
        </IconButton>
        <IconButton
          color={tokens.current.colors.grey.solid['60']}
          onClick={() => {
            navigator.clipboard.writeText(profileUrl);
            toast(
              <Content compact>
                <Text>Ссылка скопирована</Text>
              </Content>,
              { icon: <Success />, closeOnClick: true }
            );
          }}
        >
          <ShareIcon />
        </IconButton>
        <Star pid={pid} />
      </ButtonsSectionStyled>
      {isOpenQRModal && (
        <LegacyModal type="default" onClose={() => setIsOpenQRModal(false)}>
          <QRCodeCore value={profileUrl} size={300} />
        </LegacyModal>
      )}
    </MainContainerStyled>
  );
};

