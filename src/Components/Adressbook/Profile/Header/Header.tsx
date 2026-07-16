import styled, { useTheme } from 'styled-components';
import { Content, Text } from '@pulse/ui/components/Snackbar';
import { Success } from '@pulse/ui/components/Snackbar/icons';
import { toast } from 'react-toastify';
import { Modal } from '@pulse/ui/components/ModalNew';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { ComponentType, PropsWithChildren } from 'react';
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
};

const LegacyModal = Modal as ComponentType<
  PropsWithChildren<{ type?: 'default'; onClose: () => void }>
>;

const PopoverContainer = styled('div')<{ $visible: boolean; $top?: boolean }>(
  ({ $visible, $top, theme }) => ({
    position: 'absolute',
    top: $top ? 'calc(100% + 8px)' : 'auto',
    bottom: $top ? 'auto' : 'calc(100% + 8px)',
    right: 0,
    background: theme.tokens.current.core.background.default,
    border: `1px solid ${theme.tokens.current.core.border.gentle}`,
    borderRadius: '6px',
    padding: '8px 0',
    minWidth: 180,
    zIndex: 1000,
    display: $visible ? 'block' : 'none',
    boxShadow: theme.tokens.current.shadows.small,
    cursor: 'pointer',
  })
);

const PopoverItem = styled('div')(({ theme }) => ({
  padding: '8px 16px',
  cursor: 'pointer',
}));

const NoGroups = styled('div')(({ theme }) => ({
  padding: '12px 16px',
  color: theme.tokens.current.colors.grey.solid['70'],
}));

export const Header = ({
  name,
  position,
  employeeNumber,
  photo,
  initials,
  absence,
  pid,
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
          <Body1Regular color={tokens.current.core.text.secondary}>{position}</Body1Regular>
        </NameSectionStyled>
        <EmployeeNumberContainerStyled>
          <EmployeeNumberStyled>
            <Body2Regular color={tokens.current.core.text.secondary}>
              Табельный номер:{` `}
            </Body2Regular>
            <Body2Regular> {employeeNumber}</Body2Regular>
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

