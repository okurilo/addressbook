import { FC } from 'react';
import { QRCode } from 'react-qrcode-logo';

import { QRCodeCoreContainer } from './styled';
import { IQRCodeCoreProps } from './types';

export const QRCodeCore: FC<IQRCodeCoreProps> = ({
  value,
  size,
  level = 'M',
  bgColor = '#ffffff',
  fgColor = '#000000',
  qrStyle = 'dots',
  removeQrCodeBehindLogo = true,
  imageSettings,
}) => {
  const { src, width, height, padding, paddingStyle } = imageSettings || {};

  return (
    <QRCodeCoreContainer data-testid="qr-code-canvas">
      <QRCode
        bgColor={bgColor}
        fgColor={fgColor}
        ecLevel={level}
        size={size}
        value={value}
        logoImage={src}
        logoWidth={width}
        logoHeight={height}
        logoPadding={padding}
        qrStyle={qrStyle}
        logoPaddingStyle={paddingStyle}
        removeQrCodeBehindLogo={removeQrCodeBehindLogo}
      />
    </QRCodeCoreContainer>
  );
};

