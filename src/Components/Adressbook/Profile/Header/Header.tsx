import { Avatar } from '@pulse/ui/components/Avatar';
import { useTheme } from 'styled-components';
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
import {
  Body1Regular,
  Body1Semibold,
  Body2Regular,
  Header4Semibold,
} from '../../common/typography';
import { ReactComponent as QRIcon } from '../assets/qr.svg';
import { ReactComponent as ShareIcon } from '../assets/share.svg';
import { ReactComponent as StarIcon } from '../assets/star.svg';
import { IconButton } from '../../common/IconButton';

export const Header = ({
  name,
  position,
  employeeNumber,
  photo,
  initials,
  absence,
  pid,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const { tokens } = useTheme();
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
        <IconButton color={tokens.current.colors.grey.solid['60']}>
          <QRIcon />
        </IconButton>
        <IconButton color={tokens.current.colors.grey.solid['60']}>
          <ShareIcon />
        </IconButton>
        <IconButton
          color={
            isFavorite
              ? tokens.current.core.accent.primary
              : tokens.current.colors.grey.solid['60']
          }
          onClick={() => onToggleFavorite?.(pid)}
        >
          <StarIcon />
        </IconButton>
      </ButtonsSectionStyled>
    </MainContainerStyled>
  );
};
