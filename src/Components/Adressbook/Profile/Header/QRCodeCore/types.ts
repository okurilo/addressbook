export type QRCodeLevelType = 'L' | 'M' | 'Q' | 'H';

export type QRCodePaddingType = 'circle' | 'square' | undefined;

export type QRCodeStyleType = 'dots' | 'squares' | 'fluid' | undefined;

export interface IQRCodeCoreProps {
  value: string;
  size: number;
  level?: QRCodeLevelType;
  bgColor?: string;
  fgColor?: string;
  qrStyle?: QRCodeStyleType;
  removeQrCodeBehindLogo?: boolean;
  imageSettings?: {
    src: string;
    height: number;
    width: number;
    padding?: number;
    paddingStyle?: QRCodePaddingType;
  };
}

