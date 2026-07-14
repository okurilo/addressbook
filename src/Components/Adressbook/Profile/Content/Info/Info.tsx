// TODO(addressbook-host): типизировать props Info после стабилизации Profile API.
// @ts-nocheck
import { useTheme } from 'styled-components';
import { MainContainerStyled } from '../../../People/styled';
import { Body1Regular, Body2Regular } from '../../../common/typography';
import { RowStyled } from './styled';

const MONTHS_RU = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const Info = ({ profile }) => {
  const theme = useTheme();
  const { birthDate } = profile;

  let formattedBday: string | undefined;
  if (birthDate?.day && birthDate?.month) {
    formattedBday = `${birthDate.day} ${MONTHS_RU[birthDate.month - 1]}`;
  }

  return (
    <MainContainerStyled>
      {formattedBday && (
        <RowStyled>
          <Body1Regular>день рождения: </Body1Regular>
          <Body2Regular color={theme.tokens.current.colors.grey.solid['70']}>
            {formattedBday}
          </Body2Regular>
        </RowStyled>
      )}
    </MainContainerStyled>
  );
};
