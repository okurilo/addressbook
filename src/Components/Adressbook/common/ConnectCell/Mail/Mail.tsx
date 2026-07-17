import { useTheme } from 'styled-components';
import type { FC } from 'react';
import { IconButton } from '../../IconButton';
import { ReactComponent as MailIcon } from './assets/mail.svg';

export const TableMail: FC = () => {
  const { tokens } = useTheme();

  return (
    <IconButton color={tokens.current.colors.grey.solid['60']}>
      <MailIcon />
    </IconButton>
  );
};
