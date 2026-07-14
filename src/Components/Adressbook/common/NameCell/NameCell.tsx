import { MainContainerStyled } from './styled';
import { Body2Regular } from '../typography';
import { ProfileImage } from '../ProfileImage';

type NameCellProps = {
  data: {
    name: string;
    photo: string;
    absence?: unknown;
    initials: string;
  };
  pid: string;
};

export const NameCell = ({ data, pid }: NameCellProps): JSX.Element => {
  const { name, photo, absence, initials } = data;
  // const { tokens } = useTheme();

  return (
    <MainContainerStyled>
      <ProfileImage size="m" absence={absence} photo={photo} initials={initials} pid={pid} />
      <Body2Regular>{name}</Body2Regular>
      <div />
      {/* <Body2Regular color={tokens?.current.core.text.secondary}>Сберджайл mock </Body2Regular> */}
    </MainContainerStyled>
  );
};
