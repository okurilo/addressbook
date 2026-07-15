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
  const [customGroups, setCustomGroups] = useState<ICustomGroup[]>([]);
  const [showPopover, setShowPopover] = useState(false);
  const starBtnRef = useRef<HTMLDivElement>(null);

  const profileUrl = pid ? `${window.location.origin}/platform/profile/${pid}` : '';

  const fetchCustomGroups = useCallback(async () => {
    try {
      const res = await fetch('/api-web/srv/v7/people/teams', {
        headers: { Accept: 'application/json' },
      });
      const payload = (await res.json()) as ICustomGroup[] | { data?: ICustomGroup[] };
      const data = Array.isArray(payload) ? payload : payload.data ?? [];
      const filtered = data.filter((group) => group.isCustom && group.type === 'группа');
      setCustomGroups(filtered);
    } catch (err) {
      console.error('star error', err);
    }
  }, []);

  const handleStarClick = useCallback(() => {
    setShowPopover((prev) => {
      if (!prev) fetchCustomGroups();
      return !prev;
    });
  }, [fetchCustomGroups]);

  const closePopover = useCallback(() => {
    setShowPopover(false);
  }, []);

  useEffect(() => {
    if (!showPopover) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (starBtnRef.current && !starBtnRef.current.contains(e.target as Node)) {
        closePopover();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopover, closePopover]);

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
          {/* <Body2Regular color={tokens.current.core.text.secondary}>Сберджайл mock</Body2Regular> */}
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
        <div ref={starBtnRef} style={{ position: 'relative' }}>
          <IconButton
            color={tokens.current.colors.grey.solid['60']}
            onClick={handleStarClick}
          >
            <StarIcon />
          </IconButton>
          {/* <PopoverContainer $visible={showPopover}>
            {customGroups.length > 0 ? (
              customGroups.map((group) => (
                <PopoverItem key={group.id} onClick={closePopover}>
                  <Body2Regular>{group.name}</Body2Regular>
                </PopoverItem>
              ))
            ) : (
              <NoGroups>Нет групп</NoGroups>
            )}
          </PopoverContainer> */}
        </div>
      </ButtonsSectionStyled>
      {isOpenQRModal && (
        <LegacyModal type="default" onClose={() => setIsOpenQRModal(false)}>
          <QRCodeCore value={profileUrl} size={300} />
        </LegacyModal>
      )}
    </MainContainerStyled>
  );
};
