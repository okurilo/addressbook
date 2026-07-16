import { useTheme, CSSProperties } from 'styled-components';
import { FC, useState, useCallback } from 'react';
import type { PropsWithChildren } from 'react';
import { Content, Text } from '@pulse/ui/components/Snackbar';
import { Success, Error } from '@pulse/ui/components/Snackbar/icons';
import { toast } from 'react-toastify';
import { ReactComponent as PhoneIcon } from './assets/phone.svg';
import { ReactComponent as CopyIcon } from './assets/copy.svg';
import { ButtonStyled } from './styled';

interface TablePhoneProps {
  phone: string;
  pid?: string;
  noCalls?: boolean;
}

export const cleanPhoneForCall = (phone: string) => phone.replaceAll(/[^0-9]/g, '');

const makePhoneCall = (pid: string, callTo: string, callFrom: string) =>
  fetch(`/api-mobile/smart-profile/contacts/phoneCall?userId=${pid}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callFrom: cleanPhoneForCall(callFrom),
      callTo: cleanPhoneForCall(callTo),
    }),
  });

export const TablePhone: FC<PropsWithChildren<TablePhoneProps>> = ({ phone, pid, noCalls }) => {
  const { tokens } = useTheme();
  const [hoverArea, setHoverArea] = useState<'main' | 'copy' | null>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(phone);
    toast(
      <Content compact>
        <Text>Номер скопирован</Text>
      </Content>,
      { icon: <Success />, closeOnClick: true }
    );
  }, [phone]);

  const handleCall = useCallback(() => {
    if (noCalls) {
      toast(
        <Content compact>
          <Text>Звонки в службы временно недоступны</Text>
        </Content>,
        {
          icon: <Error />,
          closeOnClick: true,
        }
      );
      return;
    }
    fetch(`/api-web/smart-profile/web/widgets/data?widgets=contacts`)
      .then((res) => res.json())
      .then((data) => {
        const personalPhone = data.data?.[0]?.data?.contactsV2?.phones?.personal?.phone;
        if (personalPhone && pid) {
          makePhoneCall(pid, phone, personalPhone);
        }
      });
  }, [noCalls, pid, phone]);

  const mainColor = tokens.current.colors.grey.solid['60'];
  const dangerColor = tokens.current.core.accent.primary;

  const buttonColor =
    hoverArea === 'copy'
      ? tokens.current.colors.grey.solid['60']
      : hoverArea === 'main'
      ? dangerColor
      : mainColor;

  const buttonStyle: CSSProperties = {
    border: 'none',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    flexShrink: 0,
    cursor: 'pointer',
    color:
      hoverArea === 'main'
        ? tokens.current.core.accent.primary
        : tokens.current.colors.grey.solid['60'],
  };

  const copyStyle: CSSProperties = {
    border: 'none',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    fontSize: 12,
    color:
      hoverArea === 'copy'
        ? tokens.current.core.accent.primary
        : tokens.current.colors.grey.solid['60'],
  };

  return (
    <ButtonStyled color={buttonColor}>
      <PhoneIcon />
      <button
        type="button"
        style={buttonStyle}
        onClick={handleCall}
        onMouseEnter={() => setHoverArea('main')}
        onMouseLeave={() => setHoverArea(null)}
      >
        {phone}
      </button>
      <button
        type="button"
        style={copyStyle}
        onClick={handleCopy}
        onMouseEnter={() => setHoverArea('copy')}
        onMouseLeave={() => setHoverArea(null)}
        title="Скопировать"
      >
        <CopyIcon />
      </button>
    </ButtonStyled>
  );
};
